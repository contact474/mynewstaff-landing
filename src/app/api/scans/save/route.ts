import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check scan quota
    const { data: quota } = await supabase.rpc("check_scan_quota", { p_user_id: user.id });
    if (quota && !quota.can_scan) {
      return NextResponse.json(
        { error: "Scan limit reached", quota },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { url, companyName, domain, overallScore, scores, findings, funnel, offer, positioning, adIntel, recommendations, answers, meta, locale } = body;

    const { data: scan, error } = await supabase
      .from("scans")
      .insert({
        user_id: user.id,
        url,
        company_name: companyName,
        domain,
        overall_score: overallScore,
        scores,
        findings,
        funnel,
        offer,
        positioning,
        ad_intel: adIntel,
        recommendations,
        answers,
        meta,
        locale: locale || "en",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Save scan error:", error);
      return NextResponse.json({ error: "Failed to save scan" }, { status: 500 });
    }

    return NextResponse.json({ id: scan.id });
  } catch (err) {
    console.error("Save scan error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
