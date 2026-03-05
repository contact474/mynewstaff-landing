import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { AIToolType } from "@/lib/ai/types";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tool: string }> }
) {
  try {
    const { tool } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { scanId, title, content } = await request.json();

    const { data: playbook, error } = await supabase
      .from("playbooks")
      .insert({
        user_id: user.id,
        scan_id: scanId || null,
        type: tool as AIToolType,
        title: title || `${tool.replace(/_/g, " ")} — ${new Date().toLocaleDateString()}`,
        content: { markdown: content },
        locale: "en",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Save playbook error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ id: playbook.id });
  } catch (err) {
    console.error("Save playbook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
