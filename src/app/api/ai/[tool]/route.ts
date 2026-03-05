import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { streamWithClaude } from "@/lib/ai/claude";
import { getSystemPrompt, getUserPrompt } from "@/lib/ai/prompts";
import { hasAccess, type Feature } from "@/lib/tiers";
import type { AIToolType } from "@/lib/ai/types";
import type { Tier } from "@/lib/tiers";

const VALID_TOOLS: AIToolType[] = [
  "offer_builder",
  "value_stack",
  "marketing_play",
  "funnel_blueprint",
  "ad_copy",
  "email_sequence",
  "positioning_workshop",
];

// Map tool types to their required feature
const TOOL_FEATURE: Record<AIToolType, Feature> = {
  offer_builder: "offer_builder",
  value_stack: "value_stack",
  marketing_play: "marketing_plays",
  funnel_blueprint: "funnel_blueprint",
  ad_copy: "ad_copy",
  email_sequence: "email_sequence",
  positioning_workshop: "positioning_workshop",
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tool: string }> }
) {
  try {
    const { tool } = await params;

    if (!VALID_TOOLS.includes(tool as AIToolType)) {
      return NextResponse.json({ error: "Invalid tool" }, { status: 400 });
    }

    const toolType = tool as AIToolType;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check subscription tier
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("tier")
      .eq("user_id", user.id)
      .single();

    const tier = (sub?.tier || "free") as Tier;
    const requiredFeature = TOOL_FEATURE[toolType];

    if (!hasAccess(tier, requiredFeature)) {
      return NextResponse.json(
        { error: "Upgrade required", requiredTier: requiredFeature },
        { status: 403 }
      );
    }

    const { scanId } = await request.json();
    if (!scanId) {
      return NextResponse.json({ error: "Scan ID required" }, { status: 400 });
    }

    // Fetch the scan data
    const { data: scan, error: scanErr } = await supabase
      .from("scans")
      .select("*")
      .eq("id", scanId)
      .eq("user_id", user.id)
      .single();

    if (scanErr || !scan) {
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

    // Generate with Claude (streaming)
    const systemPrompt = getSystemPrompt(toolType);
    const userPrompt = getUserPrompt(toolType, scan);

    const stream = await streamWithClaude(
      systemPrompt,
      [{ role: "user", content: userPrompt }],
      { maxTokens: 4096, temperature: 0.7 }
    );

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("AI tool error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
