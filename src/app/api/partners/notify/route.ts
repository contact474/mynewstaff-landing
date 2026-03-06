import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Email Templates ────────────────────────────────────────

function reviewedEmail(p: { name: string; instagram: string; tier: string }) {
  const ig = p.instagram.replace("@", "");
  return {
    subject: `@${ig} — We're reviewing your application`,
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Your Application is Being Reviewed</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">Hey ${p.name}, great news — your profile caught our eye.</p>

      <div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:12px;padding:24px;margin-bottom:24px">
        <p style="color:rgba(251,191,36,0.7);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">Status Update</p>
        <p style="color:#fbbf24;font-size:18px;font-weight:700;margin:0">Actively Reviewing</p>
      </div>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Our team is currently evaluating your Instagram profile, engagement metrics, and audience alignment. We're also preparing your <strong style="color:#fff">complimentary ScaleX AI Audit</strong> — a full scalability analysis of your brand that you'll receive regardless of the partnership outcome.
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Want to boost your chances? Send us your top 3 performing posts or reels via DM — profiles with portfolio examples get prioritized.
      </p>

      ${ctaButton("https://ig.me/m/mynewstaff", "DM Your Best Content")}
    `),
  };
}

function approvedEmail(p: { name: string; instagram: string; tier: string; bundle: string; bundleDetail: string }) {
  const ig = p.instagram.replace("@", "");
  return {
    subject: `You're In, @${ig} — Welcome to the MNS Partner Program`,
    html: wrap(`
      <div style="text-align:center;margin-bottom:32px">
        <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:50%;background:rgba(16,185,129,0.1);border:2px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center">
          <span style="color:#10b981;font-size:28px;line-height:64px">&#10003;</span>
        </div>
        <h1 style="color:#fff;font-size:28px;font-weight:800;margin:0 0 8px">You're Approved!</h1>
        <p style="color:#a1a1aa;font-size:14px;margin:0">Welcome to the MNS Partner Program, ${p.name}.</p>
      </div>

      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:24px;margin-bottom:24px">
        <p style="color:rgba(16,185,129,0.6);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 12px">Your Partnership</p>
        <table cellpadding="0" cellspacing="0" style="width:100%">
          <tr><td style="color:#71717a;font-size:12px;padding:4px 0;width:100px">Instagram</td><td style="color:#fff;font-size:12px;padding:4px 0">@${ig}</td></tr>
          <tr><td style="color:#71717a;font-size:12px;padding:4px 0">Tier</td><td style="color:#fbbf24;font-size:12px;font-weight:700;padding:4px 0">${p.tier}</td></tr>
          <tr><td style="color:#71717a;font-size:12px;padding:4px 0">Package</td><td style="color:#fff;font-size:12px;padding:4px 0">${p.bundle}</td></tr>
          ${p.bundleDetail ? `<tr><td style="color:#71717a;font-size:12px;padding:4px 0">Deliverables</td><td style="color:#a1a1aa;font-size:11px;padding:4px 0">${p.bundleDetail}</td></tr>` : ""}
        </table>
      </div>

      <h2 style="color:#fff;font-size:16px;font-weight:700;margin:0 0 16px">Your Next Steps</h2>

      ${step(1, "Partnership Agreement", "We'll DM you the partnership terms on Instagram. Quick digital sign — takes 2 minutes.")}
      ${step(2, "Content Calendar", "You'll receive your personalized content calendar with posting schedule, content briefs, and brand guidelines.")}
      ${step(3, "Asset Delivery", "We'll deliver your first batch of AI-generated content within 48 hours of signing.")}
      ${step(4, "Go Live", "Start posting, track your results, and watch your engagement grow with AI-optimized content.")}

      <div style="margin:32px 0">
        ${ctaButton("https://ig.me/m/mynewstaff", "DM Us to Get Started")}
      </div>

      <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.15);border-radius:12px;padding:20px;margin-bottom:24px">
        <p style="color:rgba(139,92,246,0.6);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">Bonus</p>
        <p style="color:#a1a1aa;font-size:12px;line-height:1.6;margin:0">Your <strong style="color:#fff">ScaleX AI Audit</strong> is ready. Check your inbox for the full report — it includes growth recommendations you can implement immediately, whether through our partnership or on your own.</p>
      </div>
    `),
  };
}

function rejectedEmail(p: { name: string; instagram: string }) {
  const ig = p.instagram.replace("@", "");
  return {
    subject: `Update on your application, @${ig}`,
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Application Update</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">Hey ${p.name}, thank you for your interest in the MNS Partner Program.</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 20px">
        After reviewing your profile, we're unable to offer a barter partnership at this time. This doesn't reflect on your content quality — we're currently focused on specific niches and audience sizes that align with our current campaign needs.
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        <strong style="color:#fff">But here's the good news:</strong> We prepared a complimentary <strong style="color:#a78bfa">ScaleX AI Audit</strong> for your brand. It's a full AI-powered scalability analysis with actionable growth recommendations — completely free, no strings attached.
      </p>

      <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:24px;margin-bottom:24px">
        <p style="color:rgba(139,92,246,0.6);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">Your Free Report</p>
        <p style="color:#fff;font-size:16px;font-weight:700;margin:0 0 8px">ScaleX AI Scalability Audit</p>
        <p style="color:#71717a;font-size:12px;line-height:1.6;margin:0 0 16px">Deep analysis of your brand's growth potential, digital presence, and AI-ready infrastructure — with specific recommendations.</p>
        ${ctaButton("https://mynewstaff.ai/scalex", "Get Your Free ScaleX Audit")}
      </div>

      <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;margin-top:24px">
        <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
          <strong style="color:#fff">Want to work with us differently?</strong> Many of our best clients started as partner applicants. If you're looking to scale your brand with AI-powered marketing, content, and automation — we'd love to chat.
        </p>
        ${ctaButton("https://mynewstaff.ai/scale", "Explore Our Services")}
      </div>

      <p style="color:#52525b;font-size:12px;margin:24px 0 0;line-height:1.6">
        You're welcome to reapply in 90 days if your audience grows or your niche shifts. We review all applications fresh.
      </p>
    `),
  };
}

// ─── Shared Components ──────────────────────────────────────

function wrap(content: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">
<tr><td style="padding:40px 40px 0;text-align:center">
  <div style="display:inline-block;background:#fff;border-radius:10px;padding:8px 16px;margin-bottom:24px">
    <span style="color:#000;font-weight:800;font-size:14px;letter-spacing:-0.5px">MNS</span>
  </div>
</td></tr>
<tr><td style="padding:0 40px 40px">${content}</td></tr>
<tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
  <p style="color:#3f3f46;font-size:11px;margin:0">MyNewStaff.ai Partner Program</p>
  <p style="color:#27272a;font-size:10px;margin:8px 0 0">You received this because you applied at mynewstaff.ai/partners</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function ctaButton(href: string, text: string) {
  return `<a href="${href}" style="display:inline-block;background:#fff;color:#000;padding:12px 28px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;text-decoration:none;border-radius:6px">${text}</a>`;
}

function step(n: number, title: string, desc: string) {
  return `<table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px">
    <tr>
      <td style="width:32px;vertical-align:top;padding:4px 0">
        <div style="width:24px;height:24px;border-radius:50%;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);text-align:center;line-height:24px;color:#a78bfa;font-size:11px;font-weight:700">${n}</div>
      </td>
      <td style="padding:4px 0 4px 12px">
        <p style="color:#fff;font-size:13px;font-weight:600;margin:0">${title}</p>
        <p style="color:#71717a;font-size:12px;margin:4px 0 0">${desc}</p>
      </td>
    </tr>
  </table>`;
}

// ─── Route Handler ──────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { email, name, instagram, status, tier, bundle, bundleDetail } = await req.json();

    if (!email || !status) {
      return NextResponse.json({ error: "Missing email or status" }, { status: 400 });
    }

    let emailData: { subject: string; html: string } | null = null;

    switch (status) {
      case "reviewed":
        emailData = reviewedEmail({ name, instagram, tier });
        break;
      case "approved":
        emailData = approvedEmail({ name, instagram, tier, bundle, bundleDetail: bundleDetail || "" });
        break;
      case "rejected":
        emailData = rejectedEmail({ name, instagram });
        break;
      default:
        return NextResponse.json({ ok: true, sent: false, reason: "No email for this status" });
    }

    await resend.emails.send({
      from: "MyNewStaff Partners <partners@mynewstaff.ai>",
      to: [email],
      subject: emailData.subject,
      html: emailData.html,
    });

    return NextResponse.json({ ok: true, sent: true, status });
  } catch (err: any) {
    console.error("Partner notify error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
