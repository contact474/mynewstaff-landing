import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MNS_COMMAND_URL = process.env.MNS_COMMAND_URL || "https://82.25.92.135:8002";
const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "qZs6GgZjmIC39OaF3Sfw";

/* ─── Score-based nurture sequence routing ───────────────────────── */

function getNurtureSequence(score: number): {
  path: "critical" | "growth" | "optimization";
  workflowTag: string;
  description: string;
} {
  if (score < 50) {
    return {
      path: "critical",
      workflowTag: "scalex_nurture_critical",
      description: "Critical path: urgency-based, push toward DFY call",
    };
  }
  if (score < 70) {
    return {
      path: "growth",
      workflowTag: "scalex_nurture_growth",
      description: "Growth path: education-based, push toward paid tiers",
    };
  }
  return {
    path: "optimization",
    workflowTag: "scalex_nurture_optimization",
    description: "Optimization path: NEPQ sequence, push toward scale/agency",
  };
}

/**
 * Estimate monthly revenue loss for email copy personalization.
 */
function estimateRevenueLoss(score: number): string {
  if (score < 30) return "$8,000-$15,000";
  if (score < 50) return "$4,000-$8,000";
  if (score < 70) return "$2,000-$5,000";
  return "$500-$2,000";
}

/**
 * Capture a lead from ScaleX AI advisor conversation.
 * Routes to score-based nurture sequences:
 *   - Below 50: Critical path (urgency, DFY)
 *   - 50-70: Growth path (education, paid tiers)
 *   - 70+: Optimization path (NEPQ, scale tools)
 *
 * Pushes to:
 *   1. GHL — contact creation + score-based workflow trigger
 *   2. MNS Command DB — lead record for tracking
 */
export async function POST(req: NextRequest) {
  try {
    const { email, company, score, source, gaps, industry } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const normalizedScore = Math.round(score || 50);
    const nurture = getNurtureSequence(normalizedScore);
    const revenueLoss = estimateRevenueLoss(normalizedScore);
    const results: Record<string, string> = {};

    // 1. Push to GHL as a contact with score-based nurture routing
    if (GHL_API_KEY) {
      try {
        const ghlResp = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${GHL_API_KEY}`,
            "Content-Type": "application/json",
            "Version": "2021-07-28",
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            email,
            companyName: company || "",
            source: source || "scalex_advisor",
            tags: [
              "source_scalex",
              "scalex_advisor_lead",
              `scalex_score_${normalizedScore}`,
              `scalex_path_${nurture.path}`,
              nurture.workflowTag,
              ...(industry ? [`industry_${industry}`] : []),
              ...(gaps || []).slice(0, 3).map((g: string) => `gap_${g.toLowerCase().replace(/\s+/g, "_")}`),
            ].filter(Boolean),
            customFields: [
              { key: "scalex_score", field_value: String(normalizedScore) },
              { key: "lead_score", field_value: String(Math.min(100, normalizedScore * 1.5)) },
              { key: "scalex_nurture_path", field_value: nurture.path },
              { key: "scalex_revenue_loss", field_value: revenueLoss },
              { key: "scalex_top_gaps", field_value: (gaps || []).slice(0, 3).join(", ") },
              ...(industry ? [{ key: "scalex_industry", field_value: industry }] : []),
            ],
          }),
        });
        const ghlData = await ghlResp.json();
        results.ghl = ghlData.contact?.id ? "created" : "upserted";
        results.nurture_path = nurture.path;
      } catch (e) {
        console.error("GHL push failed:", e);
        results.ghl = "failed";
      }
    }

    // 2. Push to MNS Command DB as a lead
    try {
      const mnsResp = await fetch(`${MNS_COMMAND_URL}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: company || "ScaleX Lead",
          contact_email: email,
          source: "scalex_advisor",
          score: normalizedScore,
          tags: [
            "client:mns",
            "source:scalex_advisor",
            `scalex_score:${normalizedScore}`,
            `nurture:${nurture.path}`,
            ...(industry ? [`industry:${industry}`] : []),
            `scraped:${new Date().toISOString().split("T")[0]}`,
          ],
          notes: [
            `ScaleX AI advisor lead. Score: ${normalizedScore}/100.`,
            `Nurture path: ${nurture.path} (${nurture.description}).`,
            `Est. revenue loss: ${revenueLoss}/month.`,
            `Top gaps: ${(gaps || []).join(", ") || "unknown"}.`,
            industry ? `Industry: ${industry}.` : "",
          ].filter(Boolean).join(" "),
        }),
      });
      results.mns = mnsResp.ok ? "created" : "failed";
    } catch (e) {
      console.error("MNS Command push failed:", e);
      results.mns = "failed";
    }

    return NextResponse.json({
      ok: true,
      results,
      nurture: {
        path: nurture.path,
        revenueLoss,
        score: normalizedScore,
      },
    });
  } catch (error) {
    console.error("ScaleX lead capture error:", error);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
