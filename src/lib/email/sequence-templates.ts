/**
 * Email templates for MNS SaaS behavioral sequences.
 * Dark theme matching the existing partner notification emails.
 * All text in English (MNS is English-first).
 */

// ─── Shared Layout ─────────────────────────────────────────────

function wrap(content: string, footerNote?: string) {
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
  <p style="color:#3f3f46;font-size:11px;margin:0">MyNewStaff.ai — AI-Powered Marketing</p>
  <p style="color:#27272a;font-size:10px;margin:8px 0 0">${footerNote || "You received this because you signed up at mynewstaff.ai"}</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function ctaButton(href: string, text: string) {
  return `<a href="${href}" style="display:inline-block;background:#fff;color:#000;padding:12px 28px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;text-decoration:none;border-radius:6px">${text}</a>`;
}

function divider() {
  return `<div style="height:1px;background:rgba(255,255,255,0.06);margin:24px 0"></div>`;
}

function highlight(text: string) {
  return `<strong style="color:#fff">${text}</strong>`;
}

function goldText(text: string) {
  return `<strong style="color:#fbbf24">${text}</strong>`;
}

// ─── ONBOARDING SEQUENCE ────────────────────────────────────────

export function onboardingWelcomeEmail(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Your AI marketing secret weapon is ready",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Welcome to MyNewStaff, ${firstName}!</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">Your AI-powered marketing team is ready to go.</p>

      <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:24px;margin-bottom:24px">
        <p style="color:rgba(139,92,246,0.6);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">What You Get</p>
        <p style="color:#fff;font-size:14px;line-height:1.8;margin:0">
          ${goldText("EscalaX Scanner")} — Full AI diagnostic of your business<br>
          ${goldText("7 AI Marketing Tools")} — From ad copy to email sequences<br>
          ${goldText("AI CMO Advisor")} — Chat with your personal marketing strategist
        </p>
      </div>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        The fastest way to see value? ${highlight("Run your first EscalaX scan")} — it takes 60 seconds and gives you a complete marketing diagnostic with actionable recommendations.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/dashboard", "Go to Your Dashboard")}
      </div>
    `),
  };
}

export function onboardingDay1Email(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Run your first EscalaX scan in 60 seconds",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Your First Scan Awaits</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">Hey ${firstName}, ready to see what AI reveals about your marketing?</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        The ${goldText("EscalaX Scanner")} analyzes your business across 5 critical pillars:
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:2;margin:0 0 24px">
        1. ${highlight("Digital Presence")} — website, SEO, social media footprint<br>
        2. ${highlight("Content Strategy")} — quality, consistency, engagement<br>
        3. ${highlight("Lead Generation")} — funnels, conversion paths, CTAs<br>
        4. ${highlight("Brand Positioning")} — differentiation, messaging clarity<br>
        5. ${highlight("Growth Readiness")} — scalability, automation, infrastructure
      </p>

      ${divider()}

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Just enter your website URL and our AI does the rest. You'll get a detailed score, specific findings, and ${highlight("actionable quick wins")} you can implement today.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/escalax", "Run My Free Scan")}
      </div>

      <p style="color:#52525b;font-size:12px;text-align:center;margin:0">Takes less than 60 seconds. No credit card required.</p>
    `),
  };
}

export function onboardingDay3Email(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Your 7 AI marketing tools — quick start guide",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">7 AI Tools at Your Fingertips</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, here's your quick start guide to every tool in your arsenal.</p>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);border-radius:12px">
        <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 4px">OFFER BUILDER</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Craft irresistible offers with AI-optimized value stacks and pricing psychology.</p>
      </div>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);border-radius:12px">
        <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 4px">AD COPY GENERATOR</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Generate high-converting ad copy for Meta, Google, and LinkedIn in seconds.</p>
      </div>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);border-radius:12px">
        <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 4px">EMAIL SEQUENCE WRITER</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Complete email sequences with behavioral triggers and smart segmentation.</p>
      </div>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);border-radius:12px">
        <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 4px">FUNNEL BLUEPRINT</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Design complete marketing funnels with conversion-optimized landing pages.</p>
      </div>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:16px 0 24px">
        ...plus ${highlight("Marketing Plays, Positioning Workshop, and Value Stack")} generators. Each tool uses your scan data to give ${highlight("personalized, actionable output")}.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/ai-tools", "Explore AI Tools")}
      </div>
    `),
  };
}

export function onboardingDay7Email(
  firstName: string,
  isFree: boolean
): { subject: string; html: string } {
  const upsellBlock = isFree
    ? `
      ${divider()}
      <div style="background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.15);border-radius:12px;padding:24px;margin-bottom:24px">
        <p style="color:rgba(251,191,36,0.7);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">Unlock More</p>
        <p style="color:#fff;font-size:14px;font-weight:600;margin:0 0 8px">See what Growth plan users unlock</p>
        <p style="color:#a1a1aa;font-size:12px;line-height:1.6;margin:0 0 16px">
          Unlimited scans, all 7 AI tools, funnel blueprints, email sequences, and positioning workshops.
          Everything you need to scale your marketing.
        </p>
        ${ctaButton("https://mynewstaff.ai/pricing", "View Plans")}
      </div>
    `
    : `
      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/ai-tools", "Use Your AI Tools")}
      </div>
    `;

  return {
    subject: `${firstName}, see what Growth plan users unlock`,
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Your First Week in Review</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, you've had access to AI-powered marketing for 7 days now.</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        Most users who actively use the platform in their first week report:
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:2;margin:0 0 24px">
        ${highlight("Clearer marketing strategy")} — knowing exactly where to focus<br>
        ${highlight("Better ad performance")} — AI-optimized copy that converts<br>
        ${highlight("Time savings")} — what used to take hours now takes minutes
      </p>
      ${upsellBlock}
    `),
  };
}

// ─── SCAN FOLLOWUP SEQUENCE ─────────────────────────────────────

export function scanResultsEmail(
  firstName: string,
  overallScore: number,
  weakestPillar: string
): { subject: string; html: string } {
  return {
    subject: "Your diagnostic results + top 3 quick wins",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Your EscalaX Results Are In</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, here's what our AI found.</p>

      <div style="text-align:center;margin:24px 0">
        <div style="display:inline-block;padding:24px 40px;border:1px solid rgba(255,255,255,0.06);border-radius:16px">
          <p style="font-size:48px;color:#fbbf24;margin:0;font-weight:800">${overallScore}</p>
          <p style="font-size:12px;color:#71717a;margin:4px 0 0;text-transform:uppercase;letter-spacing:1px">Overall Score</p>
        </div>
      </div>

      ${divider()}

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        Your ${highlight("biggest opportunity")} is in ${goldText(weakestPillar)}. This is where you'll see the fastest ROI by making improvements.
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Log in to see your full report with specific findings and AI-generated quick wins for each pillar.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/scans", "View Full Report")}
      </div>
    `),
  };
}

export function scanPillarEmail(
  firstName: string,
  weakestPillar: string
): { subject: string; html: string } {
  return {
    subject: `Here's what fixing ${weakestPillar} means for your revenue`,
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Your Biggest Growth Lever</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, let's talk about your ${goldText(weakestPillar)} score.</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        Our data shows that businesses who improve their weakest marketing pillar by just ${highlight("20%")} typically see:
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:2;margin:0 0 24px">
        ${goldText("2-3x")} more qualified leads<br>
        ${goldText("40%")} better ad conversion rates<br>
        ${goldText("60%")} improvement in customer acquisition cost
      </p>

      ${divider()}

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Use our ${highlight("AI tools")} to fix the issues we found — the Ad Copy Generator and Funnel Blueprint tools are especially powerful for improving ${weakestPillar.toLowerCase()}.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/ai-tools", "Start Fixing It Now")}
      </div>
    `),
  };
}

export function scanSocialProofEmail(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Companies like yours improved their scores by 35%+",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Real Results from Real Businesses</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, see what others achieved with the same tools you have.</p>

      <div style="border-left:3px solid #fbbf24;padding-left:16px;margin:20px 0">
        <p style="color:#a1a1aa;font-size:13px;font-style:italic;line-height:1.6;margin:0 0 4px">"After implementing the AI-generated funnel blueprint, our conversion rate went from 1.2% to 4.8% in just 3 weeks."</p>
        <p style="color:#fbbf24;font-size:12px;margin:0">— SaaS Founder, Growth Plan</p>
      </div>

      <div style="border-left:3px solid #fbbf24;padding-left:16px;margin:20px 0">
        <p style="color:#a1a1aa;font-size:13px;font-style:italic;line-height:1.6;margin:0 0 4px">"The EscalaX scan revealed 3 critical issues we had no idea about. Fixing them doubled our organic traffic."</p>
        <p style="color:#fbbf24;font-size:12px;margin:0">— Marketing Agency, Scale Plan</p>
      </div>

      <div style="border-left:3px solid #fbbf24;padding-left:16px;margin:20px 0">
        <p style="color:#a1a1aa;font-size:13px;font-style:italic;line-height:1.6;margin:0 0 4px">"I replaced my entire freelance copywriter with the AI ad copy tool. Better results at a fraction of the cost."</p>
        <p style="color:#fbbf24;font-size:12px;margin:0">— E-commerce Owner, Starter Plan</p>
      </div>

      ${divider()}

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Your tools are ready. Your scan data is loaded. ${highlight("The only thing missing is action.")}
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/dashboard", "Take Action Now")}
      </div>
    `),
  };
}

// ─── RE-ENGAGEMENT SEQUENCE ─────────────────────────────────────

export function reengagementDay7Email(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Your marketing diagnostic is waiting",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">We Miss You, ${firstName}</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">It's been a week since you last logged in.</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        Your AI marketing tools are still here, ready to help you:
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:2;margin:0 0 24px">
        ${highlight("Run a fresh scan")} to see what changed in your digital presence<br>
        ${highlight("Generate ad copy")} that converts in minutes, not hours<br>
        ${highlight("Build a funnel")} with AI-optimized conversion paths
      </p>

      ${divider()}

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Your competitors are evolving their marketing every day. ${highlight("Stay ahead with AI.")}
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/dashboard", "Return to Dashboard")}
      </div>
    `),
  };
}

export function reengagementDay14Email(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: `${firstName}, new features just launched`,
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">What's New at MNS</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, we've been busy building new tools for you.</p>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(139,92,246,0.2);border-radius:12px;background:rgba(139,92,246,0.05)">
        <p style="color:#a78bfa;font-size:12px;font-weight:700;margin:0 0 4px">IMPROVED AI ADVISOR</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Smarter, more actionable marketing recommendations tailored to your business.</p>
      </div>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(139,92,246,0.2);border-radius:12px;background:rgba(139,92,246,0.05)">
        <p style="color:#a78bfa;font-size:12px;font-weight:700;margin:0 0 4px">ENHANCED SCAN ENGINE</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Deeper analysis with more actionable quick wins and competitive benchmarks.</p>
      </div>

      <div style="margin-bottom:24px;padding:16px;border:1px solid rgba(139,92,246,0.2);border-radius:12px;background:rgba(139,92,246,0.05)">
        <p style="color:#a78bfa;font-size:12px;font-weight:700;margin:0 0 4px">BETTER PLAYBOOKS</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Save and revisit AI-generated playbooks to track your marketing progress over time.</p>
      </div>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/dashboard", "See What's New")}
      </div>
    `),
  };
}

export function reengagementDay30Email(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "We miss you — run a free scan to see what changed",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">A Lot Can Change in a Month</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, it's been 30 days. Let's catch up.</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        In the last month, your market has evolved. Your competitors have adapted. Search algorithms have updated. Social media trends have shifted.
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Run a ${highlight("fresh EscalaX scan")} to see where you stand now and what new opportunities have appeared.
      </p>

      <div style="background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.15);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center">
        <p style="color:rgba(251,191,36,0.7);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 12px">Free Diagnostic</p>
        <p style="color:#fff;font-size:16px;font-weight:700;margin:0 0 16px">Your complimentary scan is waiting</p>
        ${ctaButton("https://mynewstaff.ai/escalax", "Run Free Scan")}
      </div>
    `),
  };
}

// ─── UPSELL SEQUENCE ────────────────────────────────────────────

export function upsellLimitHitEmail(
  firstName: string,
  tier: string
): { subject: string; html: string } {
  return {
    subject: `You've hit your ${tier} plan limit — here's what Growth unlocks`,
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">You're Outgrowing Your Plan</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, you've reached the limits of your ${goldText(tier)} plan. That's actually great news.</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        It means you're actively using AI to grow your marketing. Here's what ${goldText("Growth ($39/mo)")} unlocks:
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:2;margin:0 0 24px">
        ${highlight("50 scans/month")} instead of ${tier === "free" ? "1" : "10"}<br>
        ${highlight("Funnel Blueprint")} — complete conversion funnels<br>
        ${highlight("Email Sequence Writer")} — behavioral email campaigns<br>
        ${highlight("Ad Copy Generator")} — high-converting ad copy<br>
        ${highlight("Positioning Workshop")} — brand differentiation strategy
      </p>

      ${divider()}

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/pricing", "Upgrade to Growth")}
      </div>
    `),
  };
}

export function upsellCaseStudyEmail(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Case study: How businesses grow 3x with Growth plan tools",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">From Good to Unstoppable</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, here's what Growth plan users consistently achieve.</p>

      <div style="border-left:3px solid #fbbf24;padding-left:16px;margin:20px 0">
        <p style="color:#a1a1aa;font-size:13px;font-style:italic;line-height:1.6;margin:0 0 4px">"The funnel blueprint tool saved me $3,000 in consulting fees and produced a better result than my last agency."</p>
        <p style="color:#fbbf24;font-size:12px;margin:0">— Growth Plan User, 4 months</p>
      </div>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        ${goldText("Average Growth plan user results:")}
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:2;margin:0 0 24px">
        ${highlight("3.2x")} more marketing output per week<br>
        ${highlight("67%")} reduction in time spent on copywriting<br>
        ${highlight("$2,400/mo")} saved vs. hiring freelancers
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/pricing", "See Growth Plan Details")}
      </div>
    `),
  };
}

export function upsellDiscountEmail(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: `${firstName}, special: 30% off your first month of Growth`,
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Exclusive Offer for You</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, because your engagement shows you're serious about growth:</p>

      <div style="text-align:center;margin:24px 0;padding:24px;border:1px solid rgba(251,191,36,0.3);border-radius:16px">
        <p style="font-size:14px;color:#fbbf24;text-transform:uppercase;letter-spacing:2px;margin:0">Exclusive Offer</p>
        <p style="font-size:36px;color:#fff;font-weight:800;margin:8px 0">30% OFF</p>
        <p style="font-size:14px;color:#a1a1aa;margin:0">Your first month of Growth — just $27.30</p>
      </div>

      ${divider()}

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        This offer is exclusive to you and expires in ${highlight("48 hours")}. Cancel anytime — no lock-in.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/pricing", "Claim My 30% Discount")}
      </div>

      <p style="color:#52525b;font-size:12px;text-align:center;margin:0">Cancel anytime. No questions asked.</p>
    `),
  };
}

// ─── PARTNER NURTURE SEQUENCE ───────────────────────────────────

export function partnerWelcomeEmail(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Your partner application is confirmed",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Welcome to the MNS Partner Program</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, your application has been received and is under review.</p>

      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:24px;margin-bottom:24px">
        <p style="color:rgba(16,185,129,0.6);font-size:10px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">What's Next</p>
        <p style="color:#a1a1aa;font-size:13px;line-height:1.8;margin:0">
          1. Our team reviews your profile (24-48h)<br>
          2. You'll receive a complimentary ScaleX AI Audit<br>
          3. If approved, we'll send your partnership agreement
        </p>
      </div>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Want to speed up your review? DM us your best-performing content on Instagram — profiles with portfolio examples get reviewed ${highlight("3x faster")}.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://ig.me/m/mynewstaff", "DM @mynewstaff")}
      </div>
    `, "You received this because you applied to the MNS Partner Program"),
  };
}

export function partnerEarningsEmail(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "How our top partners earn $5K+/month",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">The Partner Playbook</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, here's how our most successful partners earn $5K+ per month.</p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        ${goldText("Step 1:")} Share your unique referral link with your audience<br>
        ${goldText("Step 2:")} Earn 30% recurring commission on every signup<br>
        ${goldText("Step 3:")} Get AI-generated content to promote MNS effortlessly
      </p>

      ${divider()}

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 16px">
        ${highlight("The math is simple:")} Just 34 Growth plan referrals = $5,000/month in recurring commissions. Our top partners achieve this within 60 days.
      </p>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        Plus, your audience gets access to AI-powered marketing tools they'll love — it's a win-win.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/partners", "Learn More About Partners")}
      </div>
    `, "You received this because you applied to the MNS Partner Program"),
  };
}

export function partnerToolkitEmail(
  firstName: string
): { subject: string; html: string } {
  return {
    subject: "Your partner toolkit is ready",
    html: wrap(`
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px">Your Toolkit is Ready</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 32px">${firstName}, everything you need to start promoting MNS is ready.</p>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);border-radius:12px">
        <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 4px">REFERRAL LINK</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Your unique tracking link with built-in attribution. Share anywhere.</p>
      </div>

      <div style="margin-bottom:16px;padding:16px;border:1px solid rgba(255,255,255,0.06);border-radius:12px">
        <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 4px">CONTENT TEMPLATES</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Pre-written posts, stories, and captions you can customize and publish.</p>
      </div>

      <div style="margin-bottom:24px;padding:16px;border:1px solid rgba(255,255,255,0.06);border-radius:12px">
        <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 4px">EARNINGS DASHBOARD</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0">Real-time tracking of your referrals, signups, and commissions.</p>
      </div>

      <p style="color:#a1a1aa;font-size:13px;line-height:1.7;margin:0 0 24px">
        ${highlight("Pro tip:")} Partners who share a personal experience with the EscalaX scanner convert ${goldText("4x better")} than those who just share a link.
      </p>

      <div style="text-align:center;margin:28px 0">
        ${ctaButton("https://mynewstaff.ai/app/dashboard", "Access Your Toolkit")}
      </div>
    `, "You received this because you're an MNS partner"),
  };
}
