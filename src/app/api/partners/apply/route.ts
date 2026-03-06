import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CRM_URL = process.env.CRM_API_URL || "https://mynewstaff.ai/command-api/api/v1/leads";

// ─── Partner Welcome Email HTML ─────────────────────────────

function buildWelcomeEmail(data: {
  name: string;
  instagram: string;
  tier: string;
  bundle: string;
  bundleDetail: string;
}) {
  const igHandle = data.instagram.replace("@", "");
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">

<!-- Header -->
<tr><td style="padding:40px 40px 0;text-align:center">
  <div style="display:inline-block;background:#fff;border-radius:10px;padding:8px 16px;margin-bottom:24px">
    <span style="color:#000;font-weight:800;font-size:14px;letter-spacing:-0.5px">MNS</span>
  </div>
  <h1 style="color:#fff;font-size:28px;font-weight:800;margin:0 0 8px;letter-spacing:-0.5px">Welcome to the Partner Program</h1>
  <p style="color:#a1a1aa;font-size:14px;margin:0">Your application has been received, ${data.name}.</p>
</td></tr>

<!-- Status Card -->
<tr><td style="padding:32px 40px">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:24px">
  <tr><td>
    <p style="color:rgba(139,92,246,0.6);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 12px">Application Status</p>
    <p style="color:#a78bfa;font-size:20px;font-weight:700;margin:0 0 16px">Under Review</p>
    <table cellpadding="0" cellspacing="0">
      <tr><td style="color:#71717a;font-size:12px;padding:4px 0;width:120px">Instagram</td><td style="color:#fff;font-size:12px;padding:4px 0">@${igHandle}</td></tr>
      <tr><td style="color:#71717a;font-size:12px;padding:4px 0">Tier</td><td style="color:#fbbf24;font-size:12px;font-weight:700;padding:4px 0">${data.tier}</td></tr>
      <tr><td style="color:#71717a;font-size:12px;padding:4px 0">Package</td><td style="color:#fff;font-size:12px;padding:4px 0">${data.bundle}</td></tr>
      ${data.bundleDetail ? `<tr><td style="color:#71717a;font-size:12px;padding:4px 0">Includes</td><td style="color:#a1a1aa;font-size:11px;padding:4px 0">${data.bundleDetail}</td></tr>` : ""}
    </table>
  </td></tr>
  </table>
</td></tr>

<!-- What Happens Next -->
<tr><td style="padding:0 40px 32px">
  <h2 style="color:#fff;font-size:16px;font-weight:700;margin:0 0 16px">What Happens Next</h2>
  <table cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="width:32px;vertical-align:top;padding:8px 0">
        <div style="width:24px;height:24px;border-radius:50%;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);text-align:center;line-height:24px;color:#a78bfa;font-size:11px;font-weight:700">1</div>
      </td>
      <td style="padding:8px 0 8px 12px">
        <p style="color:#fff;font-size:13px;font-weight:600;margin:0">Profile Review (24-48h)</p>
        <p style="color:#71717a;font-size:12px;margin:4px 0 0">We'll review your Instagram profile, engagement, and audience fit.</p>
      </td>
    </tr>
    <tr>
      <td style="width:32px;vertical-align:top;padding:8px 0">
        <div style="width:24px;height:24px;border-radius:50%;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);text-align:center;line-height:24px;color:#a78bfa;font-size:11px;font-weight:700">2</div>
      </td>
      <td style="padding:8px 0 8px 12px">
        <p style="color:#fff;font-size:13px;font-weight:600;margin:0">Free ScaleX Audit</p>
        <p style="color:#71717a;font-size:12px;margin:4px 0 0">While reviewing, we'll run a complimentary AI scalability audit on your brand — you'll get a full report regardless of the outcome.</p>
      </td>
    </tr>
    <tr>
      <td style="width:32px;vertical-align:top;padding:8px 0">
        <div style="width:24px;height:24px;border-radius:50%;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);text-align:center;line-height:24px;color:#a78bfa;font-size:11px;font-weight:700">3</div>
      </td>
      <td style="padding:8px 0 8px 12px">
        <p style="color:#fff;font-size:13px;font-weight:600;margin:0">Decision & Onboarding</p>
        <p style="color:#71717a;font-size:12px;margin:4px 0 0">If approved, we'll DM you the partnership agreement and content calendar to get started.</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- Speed Up CTA -->
<tr><td style="padding:0 40px 32px">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.15);border-radius:12px;padding:20px 24px">
  <tr><td>
    <p style="color:rgba(251,191,36,0.7);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">Speed Up Your Review</p>
    <p style="color:#a1a1aa;font-size:12px;margin:0 0 16px;line-height:1.6">DM us your best-performing content on Instagram. Profiles with portfolio examples get reviewed 3x faster.</p>
    <a href="https://ig.me/m/mynewstaff" style="display:inline-block;background:#fff;color:#000;padding:10px 24px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;text-decoration:none;border-radius:6px">DM @mynewstaff</a>
  </td></tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
  <p style="color:#3f3f46;font-size:11px;margin:0">MyNewStaff.ai Partner Program</p>
  <p style="color:#27272a;font-size:10px;margin:8px 0 0">You received this because you applied at mynewstaff.ai/partners</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Internal Notification Email ────────────────────────────

function buildNotificationEmail(data: {
  name: string;
  email: string;
  instagram: string;
  followers: string;
  niche: string;
  tier: string;
  bundle: string;
  avgStoryViews?: string;
  avgReelViews?: string;
  engagementRate?: string;
  whyPartner?: string;
  screenshotCount: number;
}) {
  return `New Partner Application

Name: ${data.name}
Email: ${data.email}
Instagram: @${data.instagram.replace("@", "")}
Followers: ${data.followers}
Niche: ${data.niche}
Tier: ${data.tier}
Bundle: ${data.bundle}
Story Views: ${data.avgStoryViews || "N/A"}
Reel Views: ${data.avgReelViews || "N/A"}
Engagement: ${data.engagementRate || "N/A"}
Screenshots: ${data.screenshotCount}
Why: ${data.whyPartner || "N/A"}

Review at: https://mynewstaff.ai/admin (Partner Applications tab)`;
}

// ─── Route Handler ──────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, email, instagram, followers, niche,
      avgStoryViews, avgReelViews, engagementRate,
      whyPartner, tier, tierValue, bundle, bundleDetail,
      screenshotCount,
    } = body;

    if (!name || !email || !instagram) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // 1. Save to CRM
    const crmRes = await fetch(CRM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        company_name: instagram,
        contact_name: name,
        contact_email: email,
        status: "new",
        notes: JSON.stringify(payload, null, 2),
        tags: ["source:partner_application"],
      }),
    });

    if (!crmRes.ok) {
      console.error("CRM save failed:", crmRes.status, await crmRes.text());
    }

    // 2. Send welcome email to applicant
    const igHandle = instagram.replace("@", "");
    try {
      await resend.emails.send({
        from: "MyNewStaff Partners <partners@mynewstaff.ai>",
        to: [email],
        subject: `Welcome @${igHandle} — Your Partner Application is Under Review`,
        html: buildWelcomeEmail({ name, instagram, tier, bundle, bundleDetail: bundleDetail || "" }),
      });
    } catch (emailErr) {
      console.error("Welcome email failed:", emailErr);
    }

    // 3. Send internal notification
    try {
      await resend.emails.send({
        from: "MNS System <system@mynewstaff.ai>",
        to: ["contact@mynewstaff.ai"],
        subject: `[Partner App] @${igHandle} — ${followers} — ${tier}`,
        text: buildNotificationEmail({
          name, email, instagram, followers, niche,
          avgStoryViews, avgReelViews, engagementRate,
          whyPartner, tier, bundle, screenshotCount: screenshotCount || 0,
        }),
      });
    } catch (notifErr) {
      console.error("Notification email failed:", notifErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Partner apply error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
