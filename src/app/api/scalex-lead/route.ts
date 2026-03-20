import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MNS_COMMAND_URL = process.env.MNS_COMMAND_URL || "https://82.25.92.135:8002";
const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "qZs6GgZjmIC39OaF3Sfw";

/**
 * Capture a lead from ScaleX AI advisor conversation.
 * Pushes to:
 *   1. GHL — contact creation + nurture workflow trigger
 *   2. MNS Command DB — lead record for tracking
 *   3. Instantly — cold nurture campaign (if applicable)
 */
export async function POST(req: NextRequest) {
  try {
    const { email, company, score, source, gaps } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const results: Record<string, string> = {};

    // 1. Push to GHL as a contact
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
              score ? `scalex_score_${Math.round(score)}` : "",
              ...(gaps || []).slice(0, 3).map((g: string) => `gap_${g.toLowerCase().replace(/\s+/g, "_")}`),
            ].filter(Boolean),
            customFields: [
              { key: "scalex_score", field_value: String(score || 0) },
              { key: "lead_score", field_value: String(Math.min(100, (score || 0) * 1.5)) },
            ],
          }),
        });
        const ghlData = await ghlResp.json();
        results.ghl = ghlData.contact?.id ? "created" : "upserted";
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
          score: score || 50,
          tags: [
            "client:mns",
            "source:scalex_advisor",
            `scalex_score:${Math.round(score || 0)}`,
            `scraped:${new Date().toISOString().split("T")[0]}`,
          ],
          notes: `Captured via ScaleX AI advisor chat. Score: ${score || "unknown"}. Gaps: ${(gaps || []).join(", ") || "unknown"}.`,
        }),
      });
      results.mns = mnsResp.ok ? "created" : "failed";
    } catch (e) {
      console.error("MNS Command push failed:", e);
      results.mns = "failed";
    }

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    console.error("ScaleX lead capture error:", error);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
