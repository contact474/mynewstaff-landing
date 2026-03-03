/* ─── EscalaX Deep Intelligence Engine ──────────────────────────────
   POST /api/escalax/analyze
   Accepts { url: string }. Performs multi-source intelligence gathering:
   1. Deep HTML parsing (100+ tool signatures, pixel IDs, conversion events)
   2. Response header security analysis
   3. DNS probing (MX, SPF, DMARC — email infrastructure)
   4. robots.txt & sitemap.xml analysis
   5. External script domain mapping
   6. Structured data (JSON-LD) extraction
   Returns real pillar scores + comprehensive intelligence findings.
   ─────────────────────────────────────────────────────────────────── */

import dns from "node:dns/promises";

export const runtime = "nodejs";
export const maxDuration = 25; // seconds — allow time for parallel probes

/* ─── Types ────────────────────────────────────────────────────────── */

interface TrackedTool { tool: string; id: string | null; category: string }
interface SocialProfile { platform: string; url: string }
interface SecurityHeader { header: string; present: boolean; value: string | null }

/* ─── Helpers ──────────────────────────────────────────────────────── */

function extractDomain(url: string): string {
  try { return new URL(url).hostname; } catch { return url.replace(/^https?:\/\//, "").split("/")[0]; }
}

function extractBaseDomain(hostname: string): string {
  const parts = hostname.split(".");
  return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
}

async function fetchSafe(url: string, timeoutMs = 5000): Promise<{ text: string; ok: boolean } | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "EscalaX-Bot/1.0 (+https://mynewstaff.ai/escalax)" },
      redirect: "follow",
    });
    clearTimeout(timer);
    const text = await res.text();
    return { text, ok: res.ok };
  } catch { return null; }
}

async function safeDns<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

/* ─── Main Handler ─────────────────────────────────────────────────── */

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url) return Response.json({ error: "URL is required" }, { status: 400 });

  const normalized = url.startsWith("http") ? url : `https://${url}`;
  const domain = extractDomain(normalized);
  const baseDomain = extractBaseDomain(domain);
  const baseUrl = `${new URL(normalized).protocol}//${domain}`;

  try {
    const start = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(normalized, {
      signal: controller.signal,
      headers: { "User-Agent": "EscalaX-Bot/1.0 (+https://mynewstaff.ai/escalax)" },
      redirect: "follow",
    });
    clearTimeout(timeout);

    const loadTime = Date.now() - start;
    const html = await res.text();
    const headers = res.headers;

    // ── Parallel intelligence probes ──────────────────────────────
    const [robotsData, sitemapData, dnsData] = await Promise.all([
      fetchSafe(`${baseUrl}/robots.txt`),
      fetchSafe(`${baseUrl}/sitemap.xml`),
      probeDNS(baseDomain),
    ]);

    // ── Parse everything ─────────────────────────────────────────
    const htmlFindings = parseHTML(html, normalized, loadTime);
    const headerFindings = parseHeaders(headers);
    const robotsFindings = parseRobots(robotsData?.ok ? robotsData.text : null);
    const sitemapFindings = parseSitemap(sitemapData?.ok ? sitemapData.text : null);

    // ── Merge into unified findings object ───────────────────────
    const findings = {
      ...htmlFindings,
      ...headerFindings,
      ...dnsData,
      ...robotsFindings,
      ...sitemapFindings,
      domain: baseDomain,
      totalSignals: 0, // calculated below
    };

    // Count total signals detected
    findings.totalSignals = countSignals(findings);

    const scores = calculateScores(findings);

    return Response.json({
      scores,
      findings,
      meta: { url: normalized, status: res.status, loadTime, domain: baseDomain },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return Response.json({
      scores: { digital_presence: 1, website_conversion: 0, content_strategy: 1, lead_generation: 0, marketing_automation: 0, advertising: 0, sales_process: 0, customer_journey: 0, tech_ai_readiness: 0, revenue_operations: 0 },
      findings: { title: "", description: "", loadTime: 99999, ssl: false, socialLinks: [], analytics: [], trackedTools: [], formCount: 0, totalSignals: 0, error: msg },
      meta: { url: normalized, status: 0, loadTime: 0, domain: extractDomain(normalized) },
    });
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   DEEP HTML PARSER — 100+ detection patterns
   ═══════════════════════════════════════════════════════════════════════ */

function parseHTML(html: string, url: string, loadTime: number) {
  const grab = (re: RegExp) => { const m = html.match(re); return m ? m[1]?.trim() ?? "" : ""; };
  const grabAll = (re: RegExp) => { const matches: string[] = []; let m; const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g"); while ((m = r.exec(html)) !== null) { if (m[1]) matches.push(m[1].trim()); } return matches; };
  const test = (re: RegExp) => re.test(html);
  const count = (re: RegExp) => (html.match(re) || []).length;

  // ── Identity ───────────────────────────────────────────────────
  const title = grab(/<title[^>]*>([^<]*)<\/title>/i);
  const description =
    grab(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    grab(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const ogImage = grab(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i) || null;
  const language = grab(/<html[^>]*lang=["']([^"']*)["']/i) || null;
  const generator = grab(/<meta[^>]*name=["']generator["'][^>]*content=["']([^"']*)["']/i) || null;
  const themeColor = grab(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']*)["']/i) || null;

  // ── Social Profiles (with full URLs) ──────────────────────────
  const socialPatterns: [string, RegExp][] = [
    ["Instagram", /href=["'](https?:\/\/(www\.)?instagram\.com\/[a-z0-9._]+\/?)/i],
    ["LinkedIn", /href=["'](https?:\/\/(www\.)?linkedin\.com\/(company|in)\/[a-z0-9-]+\/?)/i],
    ["Twitter/X", /href=["'](https?:\/\/(www\.)?(twitter|x)\.com\/[a-z0-9_]+\/?)/i],
    ["Facebook", /href=["'](https?:\/\/(www\.)?facebook\.com\/[a-z0-9.]+\/?)/i],
    ["YouTube", /href=["'](https?:\/\/(www\.)?youtube\.com\/(c\/|channel\/|@)[a-z0-9-]+\/?)/i],
    ["TikTok", /href=["'](https?:\/\/(www\.)?tiktok\.com\/@[a-z0-9._]+\/?)/i],
    ["Pinterest", /href=["'](https?:\/\/(www\.)?pinterest\.com\/[a-z0-9._]+\/?)/i],
    ["GitHub", /href=["'](https?:\/\/(www\.)?github\.com\/[a-z0-9-]+\/?)/i],
  ];
  const socialLinks: SocialProfile[] = [];
  for (const [platform, re] of socialPatterns) {
    const m = html.match(re);
    if (m) socialLinks.push({ platform, url: m[1] });
  }
  // Fallback: detect platform mentions without href
  const socialFallbacks: [string, RegExp][] = [
    ["Instagram", /instagram\.com\/([a-z0-9._]+)/i],
    ["LinkedIn", /linkedin\.com\/(company|in)\/([a-z0-9-]+)/i],
    ["Twitter/X", /(twitter|x)\.com\/([a-z0-9_]+)/i],
    ["Facebook", /facebook\.com\/([a-z0-9.]+)/i],
    ["YouTube", /youtube\.com\/(c\/|channel\/|@)([a-z0-9-]+)/i],
    ["TikTok", /tiktok\.com\/@([a-z0-9._]+)/i],
  ];
  for (const [platform, re] of socialFallbacks) {
    if (!socialLinks.find(s => s.platform === platform) && re.test(html)) {
      const m = html.match(re);
      if (m) socialLinks.push({ platform, url: m[0] });
    }
  }

  // ── Analytics & Tracking (with IDs) ───────────────────────────
  const trackedTools: TrackedTool[] = [];

  // Google Analytics
  const gaId = grab(/["'](G-[A-Z0-9]+)["']/i) || grab(/["'](UA-\d+-\d+)["']/i) || null;
  if (gaId || test(/google-analytics|gtag|googletagmanager.*G-|UA-/i)) {
    trackedTools.push({ tool: "Google Analytics", id: gaId, category: "analytics" });
  }

  // Google Tag Manager
  const gtmId = grab(/["'](GTM-[A-Z0-9]+)["']/i) || null;
  if (gtmId || test(/googletagmanager|GTM-/i)) {
    trackedTools.push({ tool: "Google Tag Manager", id: gtmId, category: "analytics" });
  }

  // Meta Pixel
  const fbPixelId = grab(/fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d+)['"]/i) || null;
  if (fbPixelId || test(/fbq\(|facebook.*pixel|connect\.facebook\.net/i)) {
    trackedTools.push({ tool: "Meta Pixel", id: fbPixelId, category: "pixel" });
  }

  // Google Ads
  const gadsId = grab(/["'](AW-[A-Z0-9]+)["']/i) || null;
  if (gadsId || test(/google.*ads|conversion.*google|AW-\d/i)) {
    trackedTools.push({ tool: "Google Ads", id: gadsId, category: "pixel" });
  }

  // LinkedIn Insight
  const liPartnerId = grab(/_linkedin_partner_id\s*=\s*["'](\d+)["']/i) || grab(/partner-id=["'](\d+)["']/i) || null;
  if (liPartnerId || test(/snap\.licdn|linkedin.*insight|_linkedin_partner_id/i)) {
    trackedTools.push({ tool: "LinkedIn Insight", id: liPartnerId, category: "pixel" });
  }

  // TikTok Pixel
  const ttPixelId = grab(/ttq\.load\s*\(\s*['"]([A-Z0-9]+)['"]/i) || null;
  if (ttPixelId || test(/tiktok.*pixel|analytics\.tiktok/i)) {
    trackedTools.push({ tool: "TikTok Pixel", id: ttPixelId, category: "pixel" });
  }

  // Twitter/X Pixel
  const twPixelId = grab(/twq\s*\(\s*['"]init['"]\s*,\s*['"]([a-z0-9]+)['"]/i) || null;
  if (twPixelId || test(/static\.ads-twitter|twq\(/i)) {
    trackedTools.push({ tool: "Twitter/X Pixel", id: twPixelId, category: "pixel" });
  }

  // Snapchat Pixel
  if (test(/sc-static\.net\/scevent|snaptr\(/i)) {
    trackedTools.push({ tool: "Snapchat Pixel", id: null, category: "pixel" });
  }

  // Pinterest Tag
  if (test(/pintrk\(|s\.pinimg\.com\/ct/i)) {
    trackedTools.push({ tool: "Pinterest Tag", id: null, category: "pixel" });
  }

  // Hotjar
  const hotjarId = grab(/h\._hjSettings\s*=\s*\{[^}]*hjid\s*:\s*(\d+)/i) || grab(/hotjar-(\d+)/i) || null;
  if (hotjarId || test(/hotjar/i)) {
    trackedTools.push({ tool: "Hotjar", id: hotjarId, category: "heatmap" });
  }

  // Microsoft Clarity
  const clarityId = grab(/clarity\.ms\/tag\/([a-z0-9]+)/i) || null;
  if (clarityId || test(/clarity\.ms/i)) {
    trackedTools.push({ tool: "Microsoft Clarity", id: clarityId, category: "heatmap" });
  }

  // Crazy Egg
  if (test(/crazyegg|crazy-egg/i)) trackedTools.push({ tool: "Crazy Egg", id: null, category: "heatmap" });

  // FullStory
  const fullStoryId = grab(/['"]fs_org['"]\s*:\s*['"]([A-Z0-9]+)['"]/i) || null;
  if (fullStoryId || test(/fullstory/i)) trackedTools.push({ tool: "FullStory", id: fullStoryId, category: "heatmap" });

  // Lucky Orange
  if (test(/luckyorange|lucky-orange/i)) trackedTools.push({ tool: "Lucky Orange", id: null, category: "heatmap" });

  // Mouseflow
  if (test(/mouseflow/i)) trackedTools.push({ tool: "Mouseflow", id: null, category: "heatmap" });

  // Mixpanel
  if (test(/mixpanel/i)) trackedTools.push({ tool: "Mixpanel", id: null, category: "analytics" });

  // Segment
  if (test(/segment\.com|cdn\.segment|analytics\.js/i)) trackedTools.push({ tool: "Segment", id: null, category: "cdp" });

  // mParticle
  if (test(/mparticle/i)) trackedTools.push({ tool: "mParticle", id: null, category: "cdp" });

  // Rudderstack
  if (test(/rudderstack|rudder-analytics/i)) trackedTools.push({ tool: "RudderStack", id: null, category: "cdp" });

  // Tealium
  if (test(/tealium/i)) trackedTools.push({ tool: "Tealium", id: null, category: "cdp" });

  // Amplitude
  if (test(/amplitude/i)) trackedTools.push({ tool: "Amplitude", id: null, category: "analytics" });

  // Heap
  if (test(/heap.*analytics|heapanalytics/i)) trackedTools.push({ tool: "Heap", id: null, category: "analytics" });

  // PostHog
  if (test(/posthog/i)) trackedTools.push({ tool: "PostHog", id: null, category: "analytics" });

  // Plausible
  if (test(/plausible\.io/i)) trackedTools.push({ tool: "Plausible", id: null, category: "analytics" });

  // Fathom
  if (test(/usefathom|cdn\.usefathom/i)) trackedTools.push({ tool: "Fathom", id: null, category: "analytics" });

  // ── CRM ────────────────────────────────────────────────────────
  let crm: string | null = null;
  const hubspotId = grab(/\/\/js\.hs-scripts\.com\/(\d+)/i) || grab(/hsFormPortalId.*?["'](\d+)["']/i) || null;
  if (test(/hubspot|hs-scripts|hbspt/i)) crm = "HubSpot";
  else if (test(/salesforce|pardot|sfdc/i)) crm = "Salesforce";
  else if (test(/zoho/i)) crm = "Zoho";
  else if (test(/pipedrive/i)) crm = "Pipedrive";
  else if (test(/freshsales|freshworks/i)) crm = "Freshworks";
  else if (test(/close\.com|close\.io/i)) crm = "Close";
  else if (test(/copper\.com|prosperworks/i)) crm = "Copper";
  else if (test(/monday\.com/i)) crm = "Monday.com";
  if (crm) trackedTools.push({ tool: crm, id: crm === "HubSpot" ? hubspotId : null, category: "crm" });

  // ── Chat & Support ─────────────────────────────────────────────
  let chat: string | null = null;
  if (test(/intercom/i)) chat = "Intercom";
  else if (test(/drift\.com/i)) chat = "Drift";
  else if (test(/zendesk/i)) chat = "Zendesk";
  else if (test(/crisp\.chat/i)) chat = "Crisp";
  else if (test(/tidio/i)) chat = "Tidio";
  else if (test(/tawk\.to/i)) chat = "Tawk.to";
  else if (test(/livechat/i)) chat = "LiveChat";
  else if (test(/freshdesk|freshchat/i)) chat = "Freshchat";
  else if (test(/olark/i)) chat = "Olark";
  else if (test(/chatwoot/i)) chat = "Chatwoot";
  else if (test(/helpscout|help-scout/i)) chat = "Help Scout";
  else if (test(/gorgias/i)) chat = "Gorgias";
  else if (test(/manychat/i)) chat = "ManyChat";
  if (chat) trackedTools.push({ tool: chat, id: null, category: "chat" });

  // ── Marketing Automation ───────────────────────────────────────
  const marketingTools: string[] = [];
  const mktPatterns: [string, RegExp][] = [
    ["Mailchimp", /mailchimp/i],
    ["ActiveCampaign", /activecampaign/i],
    ["Klaviyo", /klaviyo/i],
    ["SendGrid", /sendgrid/i],
    ["ConvertKit", /convertkit/i],
    ["Drip", /getdrip\.com/i],
    ["Brevo", /brevo|sendinblue/i],
    ["Constant Contact", /constantcontact/i],
    ["GetResponse", /getresponse/i],
    ["MailerLite", /mailerlite/i],
    ["Omnisend", /omnisend/i],
    ["Customer.io", /customer\.io/i],
    ["Iterable", /iterable/i],
  ];
  for (const [name, re] of mktPatterns) {
    if (test(re)) {
      marketingTools.push(name);
      trackedTools.push({ tool: name, id: null, category: "email_marketing" });
    }
  }

  // ── Retargeting & Personalization ──────────────────────────────
  const retargetingTools: string[] = [];
  if (test(/adroll/i)) retargetingTools.push("AdRoll");
  if (test(/criteo/i)) retargetingTools.push("Criteo");
  if (test(/perfect-audience|perfectaudience/i)) retargetingTools.push("Perfect Audience");
  if (test(/outbrain/i)) retargetingTools.push("Outbrain");
  if (test(/taboola/i)) retargetingTools.push("Taboola");

  const abTestingTools: string[] = [];
  if (test(/optimizely/i)) abTestingTools.push("Optimizely");
  if (test(/vwo\.com|visualwebsiteoptimizer/i)) abTestingTools.push("VWO");
  if (test(/abtasty|ab-tasty/i)) abTestingTools.push("AB Tasty");
  if (test(/google.*optimize/i)) abTestingTools.push("Google Optimize");
  if (test(/launchdarkly/i)) abTestingTools.push("LaunchDarkly");
  if (test(/split\.io/i)) abTestingTools.push("Split.io");

  // ── Popups & Lead Capture ──────────────────────────────────────
  const popupTools: string[] = [];
  if (test(/optinmonster/i)) popupTools.push("OptinMonster");
  if (test(/sumo\.com|sumome/i)) popupTools.push("Sumo");
  if (test(/hellobar|hello-bar/i)) popupTools.push("Hello Bar");
  if (test(/privy/i)) popupTools.push("Privy");
  if (test(/justuno/i)) popupTools.push("Justuno");
  if (test(/wisepops/i)) popupTools.push("WisePops");
  if (test(/poptin/i)) popupTools.push("Poptin");
  if (test(/typeform/i)) popupTools.push("Typeform");
  if (test(/jotform/i)) popupTools.push("JotForm");

  // ── Booking & Scheduling ───────────────────────────────────────
  const bookingTools: string[] = [];
  if (test(/calendly/i)) bookingTools.push("Calendly");
  if (test(/cal\.com/i)) bookingTools.push("Cal.com");
  if (test(/acuity/i)) bookingTools.push("Acuity Scheduling");
  if (test(/booksy/i)) bookingTools.push("Booksy");
  if (test(/simplybook/i)) bookingTools.push("SimplyBook");
  if (test(/hubspot.*meetings|meetings\.hubspot/i)) bookingTools.push("HubSpot Meetings");

  // ── E-commerce & Payments ──────────────────────────────────────
  let ecommerce: string | null = null;
  if (test(/shopify/i)) ecommerce = "Shopify";
  else if (test(/woocommerce|wp-content.*wc/i)) ecommerce = "WooCommerce";
  else if (test(/magento/i)) ecommerce = "Magento";
  else if (test(/bigcommerce/i)) ecommerce = "BigCommerce";
  else if (test(/prestashop/i)) ecommerce = "PrestaShop";
  else if (test(/tiendanube/i)) ecommerce = "Tiendanube";
  else if (test(/vtex/i)) ecommerce = "VTEX";
  else if (test(/ecwid/i)) ecommerce = "Ecwid";

  const paymentGateways: string[] = [];
  if (test(/stripe/i)) paymentGateways.push("Stripe");
  if (test(/paypal/i)) paymentGateways.push("PayPal");
  if (test(/square/i)) paymentGateways.push("Square");
  if (test(/mercadopago|mercado-pago/i)) paymentGateways.push("Mercado Pago");
  if (test(/klarna/i)) paymentGateways.push("Klarna");
  if (test(/afterpay|clearpay/i)) paymentGateways.push("Afterpay");
  if (test(/shopify.*pay/i)) paymentGateways.push("Shop Pay");
  if (test(/apple.*pay/i)) paymentGateways.push("Apple Pay");
  if (test(/google.*pay/i)) paymentGateways.push("Google Pay");

  // ── Social Proof & Reviews ─────────────────────────────────────
  const reviewPlatforms: string[] = [];
  if (test(/trustpilot/i)) reviewPlatforms.push("Trustpilot");
  if (test(/g2\.com|g2crowd/i)) reviewPlatforms.push("G2");
  if (test(/capterra/i)) reviewPlatforms.push("Capterra");
  if (test(/yelp/i)) reviewPlatforms.push("Yelp");
  if (test(/tripadvisor/i)) reviewPlatforms.push("TripAdvisor");
  if (test(/google.*review|gstatic.*review/i)) reviewPlatforms.push("Google Reviews");
  if (test(/judge\.me/i)) reviewPlatforms.push("Judge.me");
  if (test(/yotpo/i)) reviewPlatforms.push("Yotpo");
  if (test(/stamped\.io/i)) reviewPlatforms.push("Stamped");
  const hasTestimonials = test(/testimonial|review|rating|stars/i) && test(/<blockquote|class=["'][^"']*testimonial/i);

  // ── Cookie Consent / Privacy ───────────────────────────────────
  const privacyTools: string[] = [];
  if (test(/cookiebot/i)) privacyTools.push("Cookiebot");
  if (test(/onetrust|optanon/i)) privacyTools.push("OneTrust");
  if (test(/cookieyes/i)) privacyTools.push("CookieYes");
  if (test(/osano/i)) privacyTools.push("Osano");
  if (test(/iubenda/i)) privacyTools.push("Iubenda");
  if (test(/termly/i)) privacyTools.push("Termly");
  if (test(/gdpr|cookie-consent|cookie-banner|cookie-notice/i) && privacyTools.length === 0) privacyTools.push("Generic Cookie Banner");

  // ── SEO Tools ──────────────────────────────────────────────────
  const seoTools: string[] = [];
  if (test(/yoast/i)) seoTools.push("Yoast SEO");
  if (test(/rank-math|rankmath/i)) seoTools.push("Rank Math");
  if (test(/all-in-one-seo|aioseo/i)) seoTools.push("All in One SEO");
  if (test(/seopress/i)) seoTools.push("SEOPress");

  // ── Tech Stack (enhanced) ──────────────────────────────────────
  const techStack: string[] = [];
  // Frameworks
  if (test(/__next|_next\/static/i)) techStack.push("Next.js");
  else if (test(/wp-content|wordpress/i)) techStack.push(generator && /wordpress/i.test(generator) ? generator : "WordPress");
  else if (test(/sites\/default\/files|drupal/i)) techStack.push("Drupal");
  else if (test(/joomla/i)) techStack.push("Joomla");
  else if (test(/wix\.com/i)) techStack.push("Wix");
  else if (test(/squarespace/i)) techStack.push("Squarespace");
  else if (test(/webflow/i)) techStack.push("Webflow");
  else if (test(/ghost\.io|ghost\.org/i)) techStack.push("Ghost");
  else if (test(/gatsby/i)) techStack.push("Gatsby");
  else if (test(/nuxt/i)) techStack.push("Nuxt.js");
  else if (test(/svelte|sveltekit/i)) techStack.push("SvelteKit");
  else if (test(/astro/i)) techStack.push("Astro");
  else if (test(/framer\.com|framerusercontent/i)) techStack.push("Framer");
  else if (test(/carrd\.co/i)) techStack.push("Carrd");
  else if (test(/hubspot.*cos|hs-scripts.*hubspot/i)) techStack.push("HubSpot CMS");

  // JS frameworks
  if (test(/react/i) && !techStack.includes("Next.js")) techStack.push("React");
  if (test(/vue\.js|vuejs/i) && !techStack.includes("Nuxt.js")) techStack.push("Vue.js");
  if (test(/angular/i)) techStack.push("Angular");

  // Infrastructure
  if (test(/cloudflare/i)) techStack.push("Cloudflare");
  if (test(/vercel/i)) techStack.push("Vercel");
  if (test(/netlify/i)) techStack.push("Netlify");
  if (test(/amazonaws|aws/i)) techStack.push("AWS");
  if (test(/recaptcha/i)) techStack.push("reCAPTCHA");
  if (test(/hcaptcha/i)) techStack.push("hCaptcha");
  if (test(/turnstile/i)) techStack.push("Cloudflare Turnstile");

  // Fonts
  const fonts: string[] = [];
  if (test(/fonts\.googleapis\.com|fonts\.gstatic\.com/i)) fonts.push("Google Fonts");
  if (test(/use\.typekit\.net/i)) fonts.push("Adobe Fonts");
  if (test(/fonts\.shopify\.com/i)) fonts.push("Shopify Fonts");

  // Media
  if (test(/cloudinary/i)) techStack.push("Cloudinary");
  if (test(/imgix/i)) techStack.push("Imgix");

  // ── Structured Data Extraction ─────────────────────────────────
  const jsonLdBlocks = grabAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const structuredDataTypes: string[] = [];
  let businessName: string | null = null;
  let businessType: string | null = null;
  let businessPhone: string | null = null;
  let businessAddress: string | null = null;
  let businessRating: string | null = null;

  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@type"]) {
          const types = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];
          structuredDataTypes.push(...types);
        }
        if (item.name && !businessName) businessName = item.name;
        if (item["@type"] && !businessType) businessType = Array.isArray(item["@type"]) ? item["@type"][0] : item["@type"];
        if (item.telephone && !businessPhone) businessPhone = item.telephone;
        if (item.address) {
          const addr = typeof item.address === "string" ? item.address : [item.address.streetAddress, item.address.addressLocality, item.address.addressRegion, item.address.postalCode].filter(Boolean).join(", ");
          if (!businessAddress) businessAddress = addr;
        }
        if (item.aggregateRating?.ratingValue) {
          businessRating = `${item.aggregateRating.ratingValue}/5 (${item.aggregateRating.reviewCount || "?"} reviews)`;
        }
      }
    } catch { /* malformed JSON-LD */ }
  }

  // ── Conversion Events Detected ─────────────────────────────────
  const conversionEvents: string[] = [];
  if (test(/gtag\s*\(\s*['"]event['"]\s*,\s*['"]purchase['"]/i)) conversionEvents.push("Google: Purchase");
  if (test(/gtag\s*\(\s*['"]event['"]\s*,\s*['"]generate_lead['"]/i)) conversionEvents.push("Google: Lead");
  if (test(/gtag\s*\(\s*['"]event['"]\s*,\s*['"]sign_up['"]/i)) conversionEvents.push("Google: Sign Up");
  if (test(/gtag\s*\(\s*['"]event['"]\s*,\s*['"]begin_checkout['"]/i)) conversionEvents.push("Google: Checkout");
  if (test(/fbq\s*\(\s*['"]track['"]\s*,\s*['"]Lead['"]/i)) conversionEvents.push("Meta: Lead");
  if (test(/fbq\s*\(\s*['"]track['"]\s*,\s*['"]Purchase['"]/i)) conversionEvents.push("Meta: Purchase");
  if (test(/fbq\s*\(\s*['"]track['"]\s*,\s*['"]AddToCart['"]/i)) conversionEvents.push("Meta: Add to Cart");
  if (test(/fbq\s*\(\s*['"]track['"]\s*,\s*['"]CompleteRegistration['"]/i)) conversionEvents.push("Meta: Registration");
  if (test(/fbq\s*\(\s*['"]track['"]\s*,\s*['"]ViewContent['"]/i)) conversionEvents.push("Meta: View Content");
  if (test(/dataLayer\.push/i)) conversionEvents.push("GTM DataLayer Push");

  // ── Form Destinations ──────────────────────────────────────────
  const formActions = grabAll(/<form[^>]*action=["']([^"']+)["']/gi);
  const formDestinations: string[] = [];
  for (const action of formActions) {
    if (/hubspot/i.test(action)) formDestinations.push("HubSpot Forms");
    else if (/mailchimp/i.test(action)) formDestinations.push("Mailchimp");
    else if (/zapier/i.test(action)) formDestinations.push("Zapier");
    else if (/formspree/i.test(action)) formDestinations.push("Formspree");
    else if (/netlify/i.test(action)) formDestinations.push("Netlify Forms");
    else if (/getform/i.test(action)) formDestinations.push("Getform");
    else if (/typeform/i.test(action)) formDestinations.push("Typeform");
    else if (/google/i.test(action)) formDestinations.push("Google Forms");
    else if (action.startsWith("http")) formDestinations.push("Custom Endpoint");
  }

  // ── External Scripts (all third-party domains) ─────────────────
  const scriptSrcs = grabAll(/<script[^>]*src=["']([^"']+)["']/gi);
  const externalScriptDomains: string[] = [];
  const siteDomain = extractDomain(url);
  for (const src of scriptSrcs) {
    try {
      const scriptDomain = extractDomain(src.startsWith("http") ? src : `https:${src}`);
      if (scriptDomain && scriptDomain !== siteDomain && !externalScriptDomains.includes(scriptDomain)) {
        externalScriptDomains.push(scriptDomain);
      }
    } catch { /* relative or malformed URL */ }
  }

  // ── Accessibility Quick Audit ──────────────────────────────────
  const imgTotal = count(/<img/gi);
  const imgWithAlt = count(/<img[^>]*alt=["'][^"']+["']/gi);
  const imgWithoutAlt = imgTotal - imgWithAlt;
  const ariaCount = count(/aria-/gi);
  const h1Count = count(/<h1/gi);
  const h2Count = count(/<h2/gi);
  const h3Count = count(/<h3/gi);
  const headingStructure = `H1:${h1Count} H2:${h2Count} H3:${h3Count}`;

  // ── Performance Indicators ─────────────────────────────────────
  const scriptCount = count(/<script/gi);
  const stylesheetCount = count(/<link[^>]*stylesheet/gi) + count(/<style/gi);
  const hasLazyLoading = test(/loading=["']lazy["']/i);
  const hasWebP = test(/\.webp/i);
  const hasPWA = test(/<link[^>]*rel=["']manifest["']/i);
  const hasMultiLang = test(/hreflang/i);
  const hasAMP = test(/⚡|amphtml/i);

  // Legacy analytics array for backward compatibility
  const analytics = trackedTools.filter(t => t.category === "analytics").map(t => t.tool);
  const pixels = trackedTools.filter(t => t.category === "pixel").map(t => t.tool);

  return {
    // Identity
    title,
    description,
    ogImage,
    language,
    generator,
    themeColor,
    hasOG: test(/property=["']og:/i),
    hasTwitterCard: test(/name=["']twitter:card["']/i),

    // Social
    socialLinks,

    // Tools (comprehensive)
    trackedTools,
    analytics,
    pixels,
    crm,
    chat,
    marketingTools,
    retargetingTools,
    abTestingTools,
    popupTools,
    bookingTools,
    privacyTools,
    seoTools,
    reviewPlatforms,
    hasTestimonials,

    // E-commerce
    ecommerce,
    paymentGateways,

    // Conversion Intelligence
    conversionEvents,
    formCount: count(/<form/gi),
    formDestinations: [...new Set(formDestinations)],
    hasCTAs: test(/(contact|get.?started|sign.?up|free.?trial|demo|quote|book|schedule|subscribe|download)/i),

    // Content
    hasBlog: test(/<a[^>]*href[^>]*(blog|article|post|news)/i),
    hasVideo: test(/(youtube\.com|vimeo\.com|wistia|vidyard|<video)/i),
    hasPodcast: test(/podcast|anchor\.fm|spotify.*show|apple.*podcast/i),
    imageCount: imgTotal,

    // Tech
    techStack,
    fonts,
    externalScriptDomains,

    // Business Intelligence (JSON-LD)
    businessName,
    businessType,
    businessPhone,
    businessAddress,
    businessRating,
    structuredDataTypes: [...new Set(structuredDataTypes)],

    // SEO
    hasCanonical: test(/<link[^>]*rel=["']canonical["']/i),
    hasSchema: jsonLdBlocks.length > 0 || test(/itemscope/i),
    hasMobileViewport: test(/viewport.*width=device-width/i),
    hasMultiLang,
    hasAMP,

    // Performance
    ssl: url.startsWith("https"),
    loadTime,
    scriptCount,
    stylesheetCount,
    hasLazyLoading,
    hasWebP,
    hasPWA,

    // Accessibility
    h1Count,
    headingStructure,
    imgWithoutAlt,
    ariaCount,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   RESPONSE HEADER ANALYSIS — Security & Infrastructure
   ═══════════════════════════════════════════════════════════════════════ */

function parseHeaders(headers: Headers) {
  const securityHeaders: SecurityHeader[] = [
    { header: "Strict-Transport-Security", present: false, value: null },
    { header: "Content-Security-Policy", present: false, value: null },
    { header: "X-Frame-Options", present: false, value: null },
    { header: "X-Content-Type-Options", present: false, value: null },
    { header: "Referrer-Policy", present: false, value: null },
    { header: "Permissions-Policy", present: false, value: null },
    { header: "X-XSS-Protection", present: false, value: null },
  ];

  for (const sh of securityHeaders) {
    const val = headers.get(sh.header.toLowerCase());
    if (val) { sh.present = true; sh.value = val.substring(0, 100); }
  }

  // CDN detection from headers
  let cdnProvider: string | null = null;
  if (headers.get("cf-ray")) cdnProvider = "Cloudflare";
  else if (headers.get("x-vercel-id")) cdnProvider = "Vercel Edge";
  else if (headers.get("x-amz-cf-id")) cdnProvider = "AWS CloudFront";
  else if (headers.get("x-fastly-request-id")) cdnProvider = "Fastly";
  else if (headers.get("x-akamai-request-id")) cdnProvider = "Akamai";
  else if (headers.get("x-netlify-request-id")) cdnProvider = "Netlify";

  const serverHeader = headers.get("server") || null;
  const poweredBy = headers.get("x-powered-by") || null;
  const contentEncoding = headers.get("content-encoding") || null;

  return {
    securityHeaders,
    cdnProvider,
    serverHeader,
    poweredBy,
    hasCompression: contentEncoding !== null,
    compressionType: contentEncoding,
    securityScore: securityHeaders.filter(h => h.present).length,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   DNS INTELLIGENCE — Email Infrastructure
   ═══════════════════════════════════════════════════════════════════════ */

async function probeDNS(domain: string) {
  const [mxResult, txtResult, dmarcResult] = await Promise.all([
    safeDns(() => dns.resolveMx(domain), []),
    safeDns(() => dns.resolveTxt(domain), []),
    safeDns(() => dns.resolveTxt(`_dmarc.${domain}`), []),
  ]);

  // MX Records — identify email provider
  const mxRecords = mxResult.map(r => r.exchange.toLowerCase()).sort((a, b) => a.localeCompare(b));
  let emailProvider: string | null = null;
  const mxStr = mxRecords.join(" ");
  if (/google|gmail|aspmx/i.test(mxStr)) emailProvider = "Google Workspace";
  else if (/outlook|microsoft|protection\.outlook/i.test(mxStr)) emailProvider = "Microsoft 365";
  else if (/zoho/i.test(mxStr)) emailProvider = "Zoho Mail";
  else if (/protonmail|proton/i.test(mxStr)) emailProvider = "ProtonMail";
  else if (/mimecast/i.test(mxStr)) emailProvider = "Mimecast";
  else if (/barracuda/i.test(mxStr)) emailProvider = "Barracuda";
  else if (/mailgun/i.test(mxStr)) emailProvider = "Mailgun";
  else if (/sendgrid/i.test(mxStr)) emailProvider = "SendGrid";
  else if (mxRecords.length > 0) emailProvider = "Custom Mail Server";

  // SPF
  const allTxt = txtResult.flat();
  const spfRecord = allTxt.find(r => r.startsWith("v=spf1")) || null;
  const hasSPF = spfRecord !== null;

  // SPF authorized senders
  const spfSenders: string[] = [];
  if (spfRecord) {
    if (/include:.*google/i.test(spfRecord)) spfSenders.push("Google");
    if (/include:.*outlook|include:.*microsoft/i.test(spfRecord)) spfSenders.push("Microsoft");
    if (/include:.*sendgrid/i.test(spfRecord)) spfSenders.push("SendGrid");
    if (/include:.*mailchimp|include:.*mandrillapp/i.test(spfRecord)) spfSenders.push("Mailchimp/Mandrill");
    if (/include:.*amazonses/i.test(spfRecord)) spfSenders.push("Amazon SES");
    if (/include:.*mailgun/i.test(spfRecord)) spfSenders.push("Mailgun");
    if (/include:.*hubspot/i.test(spfRecord)) spfSenders.push("HubSpot");
    if (/include:.*freshdesk/i.test(spfRecord)) spfSenders.push("Freshworks");
    if (/include:.*zendesk/i.test(spfRecord)) spfSenders.push("Zendesk");
    if (/include:.*zoho/i.test(spfRecord)) spfSenders.push("Zoho");
    if (/include:.*activecampaign/i.test(spfRecord)) spfSenders.push("ActiveCampaign");
    if (/include:.*brevo|include:.*sendinblue/i.test(spfRecord)) spfSenders.push("Brevo");
    if (/include:.*klaviyo/i.test(spfRecord)) spfSenders.push("Klaviyo");
    if (/include:.*postmark/i.test(spfRecord)) spfSenders.push("Postmark");
    if (/include:.*intercom/i.test(spfRecord)) spfSenders.push("Intercom");
    if (/include:.*helpscout/i.test(spfRecord)) spfSenders.push("Help Scout");
  }

  // DMARC
  const dmarcTxt = dmarcResult.flat();
  const dmarcRecord = dmarcTxt.find(r => r.startsWith("v=DMARC1")) || null;
  const hasDMARC = dmarcRecord !== null;
  let dmarcPolicy: string | null = null;
  if (dmarcRecord) {
    const pMatch = dmarcRecord.match(/p=(none|quarantine|reject)/i);
    dmarcPolicy = pMatch ? pMatch[1] : null;
  }

  // Other TXT records of interest
  const hasGoogleVerification = allTxt.some(r => r.startsWith("google-site-verification="));
  const hasFacebookVerification = allTxt.some(r => r.startsWith("facebook-domain-verification="));
  const hasAppleVerification = allTxt.some(r => r.includes("apple-domain-verification"));
  const dnsVerifications: string[] = [];
  if (hasGoogleVerification) dnsVerifications.push("Google Search Console");
  if (hasFacebookVerification) dnsVerifications.push("Facebook Domain Verification");
  if (hasAppleVerification) dnsVerifications.push("Apple Domain Verification");

  return {
    mxRecords: mxRecords.slice(0, 5), // top 5
    emailProvider,
    hasSPF,
    spfSenders,
    hasDMARC,
    dmarcPolicy,
    dnsVerifications,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   ROBOTS.TXT ANALYSIS
   ═══════════════════════════════════════════════════════════════════════ */

function parseRobots(content: string | null) {
  if (!content) return { hasRobotsTxt: false, robotsDirectives: [] as string[], sitemapUrls: [] as string[] };

  const directives: string[] = [];
  const sitemapUrls: string[] = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("Disallow:")) {
      const path = trimmed.replace("Disallow:", "").trim();
      if (path) directives.push(`Disallow: ${path}`);
    }
    if (trimmed.toLowerCase().startsWith("sitemap:")) {
      sitemapUrls.push(trimmed.replace(/sitemap:\s*/i, "").trim());
    }
  }

  return { hasRobotsTxt: true, robotsDirectives: directives.slice(0, 15), sitemapUrls };
}

/* ═══════════════════════════════════════════════════════════════════════
   SITEMAP ANALYSIS
   ═══════════════════════════════════════════════════════════════════════ */

function parseSitemap(content: string | null) {
  if (!content) return { hasSitemap: false, sitemapPageCount: 0, sitemapSections: [] as string[] };

  const urlCount = (content.match(/<url>/gi) || []).length;
  const sitemapIndexCount = (content.match(/<sitemap>/gi) || []).length;

  // Extract unique path sections (first segment after domain)
  const locMatches = content.match(/<loc>([^<]+)<\/loc>/gi) || [];
  const sections = new Set<string>();
  for (const loc of locMatches.slice(0, 200)) {
    try {
      const urlStr = loc.replace(/<\/?loc>/gi, "");
      const pathname = new URL(urlStr).pathname;
      const firstSegment = pathname.split("/").filter(Boolean)[0];
      if (firstSegment && firstSegment.length < 30) sections.add(firstSegment);
    } catch { /* skip */ }
  }

  return {
    hasSitemap: true,
    sitemapPageCount: urlCount || sitemapIndexCount * 50, // estimate if index
    sitemapSections: [...sections].slice(0, 20),
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   SIGNAL COUNTER
   ═══════════════════════════════════════════════════════════════════════ */

function countSignals(f: ReturnType<typeof parseHTML> & ReturnType<typeof parseHeaders> & Awaited<ReturnType<typeof probeDNS>> & ReturnType<typeof parseRobots> & ReturnType<typeof parseSitemap>) {
  let count = 0;
  // Identity
  if (f.title) count++;
  if (f.description) count++;
  if (f.ogImage) count++;
  if (f.language) count++;
  if (f.generator) count++;
  if (f.themeColor) count++;
  if (f.hasOG) count++;
  if (f.hasTwitterCard) count++;

  // Social
  count += f.socialLinks.length;

  // Tools
  count += f.trackedTools.length;

  // CRM, Chat
  if (f.crm) count++;
  if (f.chat) count++;

  // Marketing
  count += f.marketingTools.length;
  count += f.retargetingTools.length;
  count += f.abTestingTools.length;
  count += f.popupTools.length;
  count += f.bookingTools.length;
  count += f.privacyTools.length;
  count += f.seoTools.length;
  count += f.reviewPlatforms.length;

  // E-commerce
  if (f.ecommerce) count++;
  count += f.paymentGateways.length;

  // Conversion
  count += f.conversionEvents.length;
  count += f.formDestinations.length;
  if (f.hasCTAs) count++;

  // Content
  if (f.hasBlog) count++;
  if (f.hasVideo) count++;
  if (f.hasPodcast) count++;

  // Tech
  count += f.techStack.length;
  count += f.fonts.length;
  count += f.externalScriptDomains.length;

  // Business Intelligence
  if (f.businessName) count++;
  if (f.businessPhone) count++;
  if (f.businessAddress) count++;
  if (f.businessRating) count++;
  count += f.structuredDataTypes.length;

  // SEO
  if (f.hasCanonical) count++;
  if (f.hasSchema) count++;
  if (f.hasMultiLang) count++;

  // Security
  count += f.securityHeaders.filter(h => h.present).length;
  if (f.cdnProvider) count++;

  // DNS
  count += f.mxRecords.length;
  if (f.emailProvider) count++;
  if (f.hasSPF) count++;
  if (f.hasDMARC) count++;
  count += f.spfSenders.length;
  count += f.dnsVerifications.length;

  // Sitemap
  if (f.hasSitemap) count++;
  if (f.hasRobotsTxt) count++;
  count += f.sitemapSections.length;

  // Performance
  if (f.hasLazyLoading) count++;
  if (f.hasWebP) count++;
  if (f.hasPWA) count++;
  if (f.hasCompression) count++;

  return count;
}

/* ═══════════════════════════════════════════════════════════════════════
   PILLAR SCORING (0-10 each, evidence-based, enhanced)
   ═══════════════════════════════════════════════════════════════════════ */

function clamp(v: number) { return Math.round(Math.min(10, Math.max(0, v)) * 10) / 10; }

type AllFindings = ReturnType<typeof parseHTML> & ReturnType<typeof parseHeaders> & Awaited<ReturnType<typeof probeDNS>> & ReturnType<typeof parseRobots> & ReturnType<typeof parseSitemap>;

function calculateScores(f: AllFindings) {
  // ── Digital Presence ───────────────────────────────────────────
  let dp = 0;
  if (f.title) dp += 1;
  if (f.description) dp += 0.8;
  if (f.hasOG) dp += 0.7;
  if (f.hasTwitterCard) dp += 0.3;
  dp += Math.min(f.socialLinks.length * 0.7, 3.5);
  if (f.hasSchema) dp += 0.8;
  if (f.hasCanonical) dp += 0.4;
  if (f.businessName) dp += 0.5;
  if (f.structuredDataTypes.length > 2) dp += 0.5;
  if (f.hasMultiLang) dp += 0.5;
  dp += Math.min(f.dnsVerifications.length * 0.3, 0.9);

  // ── Website Conversion ─────────────────────────────────────────
  let wc = 0;
  if (f.loadTime < 1500) wc += 2.5; else if (f.loadTime < 3000) wc += 2; else if (f.loadTime < 5000) wc += 1; else if (f.loadTime < 8000) wc += 0.5;
  if (f.ssl) wc += 0.7;
  if (f.formCount > 0) wc += 1;
  if (f.hasCTAs) wc += 1;
  if (f.hasMobileViewport) wc += 0.7;
  if (f.h1Count === 1) wc += 0.3;
  if (f.hasLazyLoading) wc += 0.3;
  if (f.hasWebP) wc += 0.3;
  if (f.hasCompression) wc += 0.3;
  wc += Math.min(f.securityScore * 0.15, 1);
  if (f.chat) wc += 0.5;
  if (f.bookingTools.length > 0) wc += 0.5;
  if (f.popupTools.length > 0) wc += 0.4;
  if (f.abTestingTools.length > 0) wc += 0.5;

  // ── Content Strategy ───────────────────────────────────────────
  let cs = 1.5;
  if (f.hasBlog) cs += 2;
  if (f.hasVideo) cs += 1.5;
  if (f.hasPodcast) cs += 1;
  cs += Math.min(f.socialLinks.length * 0.4, 1.6);
  if (f.imageCount > 5) cs += 0.5;
  if (f.sitemapPageCount > 50) cs += 1; else if (f.sitemapPageCount > 20) cs += 0.5;
  if (f.sitemapSections.length > 5) cs += 0.5;
  if (f.hasMultiLang) cs += 0.5;
  if (f.seoTools.length > 0) cs += 0.4;

  // ── Lead Generation ────────────────────────────────────────────
  let lg = 0;
  lg += Math.min(f.formCount * 1, 2.5);
  if (f.hasCTAs) lg += 1.5;
  if (f.chat) lg += 1.5;
  if (f.hasBlog) lg += 0.8;
  lg += Math.min(f.socialLinks.length * 0.2, 1);
  lg += Math.min(f.bookingTools.length * 1, 2);
  lg += Math.min(f.popupTools.length * 0.8, 1.5);
  if (f.hasTestimonials) lg += 0.5;
  if (f.reviewPlatforms.length > 0) lg += 0.5;

  // ── Marketing Automation ───────────────────────────────────────
  let ma = 0;
  if (f.crm) ma += 2;
  ma += Math.min(f.marketingTools.length * 1.5, 3);
  if (f.chat) ma += 1;
  if (f.trackedTools.find(t => t.tool === "Google Tag Manager")) ma += 1;
  if (f.conversionEvents.length > 0) ma += 0.8;
  if (f.formDestinations.length > 0) ma += 0.5;
  ma += Math.min(f.spfSenders.filter(s => !["Google", "Microsoft"].includes(s)).length * 0.5, 1.5);

  // ── Advertising ────────────────────────────────────────────────
  let ad = 0.5;
  const pixelCount = f.trackedTools.filter(t => t.category === "pixel").length;
  ad += Math.min(pixelCount * 1.8, 5.4);
  if (f.trackedTools.find(t => t.tool === "Google Tag Manager")) ad += 1;
  ad += Math.min(f.retargetingTools.length * 1, 2);
  if (f.conversionEvents.length > 2) ad += 0.8;
  if (f.dnsVerifications.includes("Facebook Domain Verification")) ad += 0.5;

  // ── Sales Process ──────────────────────────────────────────────
  let sp = 0.5;
  if (f.crm) sp += 2.5;
  if (f.formCount > 0) sp += 1.5;
  if (f.chat) sp += 1.5;
  if (f.hasCTAs) sp += 1;
  if (f.bookingTools.length > 0) sp += 1.5;
  if (f.paymentGateways.length > 0) sp += 1;
  if (f.ecommerce) sp += 0.5;

  // ── Customer Journey ───────────────────────────────────────────
  let cj = 1;
  if (f.hasBlog) cj += 1;
  if (f.chat) cj += 1.5;
  if (f.formCount > 1) cj += 0.7;
  if (f.hasVideo) cj += 1;
  cj += Math.min(f.socialLinks.length * 0.2, 1);
  if (f.abTestingTools.length > 0) cj += 1;
  if (f.reviewPlatforms.length > 0) cj += 0.8;
  if (f.privacyTools.length > 0) cj += 0.5;
  if (f.hasPWA) cj += 0.5;
  if (f.hasTestimonials) cj += 0.5;

  // ── Tech & AI Readiness ────────────────────────────────────────
  let ta = 0;
  if (f.ssl) ta += 0.7;
  ta += Math.min(f.techStack.length * 0.5, 2);
  ta += Math.min(f.trackedTools.length * 0.2, 2);
  if (f.chat) ta += 1;
  if (f.crm) ta += 0.8;
  if (f.cdnProvider) ta += 0.5;
  ta += Math.min(f.securityScore * 0.2, 1.4);
  if (f.hasCompression) ta += 0.3;
  if (f.hasPWA) ta += 0.5;
  if (f.hasLazyLoading) ta += 0.3;
  if (f.abTestingTools.length > 0) ta += 0.5;

  // ── Revenue Operations ─────────────────────────────────────────
  let ro = 0.5;
  if (f.trackedTools.filter(t => t.category === "analytics").length > 0) ro += 1.5;
  if (f.crm) ro += 2;
  if (f.marketingTools.length > 0) ro += 1.5;
  if (f.trackedTools.filter(t => t.category === "pixel").length > 0) ro += 1;
  if (f.trackedTools.filter(t => t.category === "cdp").length > 0) ro += 1.5;
  if (f.paymentGateways.length > 0) ro += 0.8;
  if (f.hasSPF && f.hasDMARC) ro += 0.5;
  if (f.conversionEvents.length > 0) ro += 0.7;

  return {
    digital_presence: clamp(dp),
    website_conversion: clamp(wc),
    content_strategy: clamp(cs),
    lead_generation: clamp(lg),
    marketing_automation: clamp(ma),
    advertising: clamp(ad),
    sales_process: clamp(sp),
    customer_journey: clamp(cj),
    tech_ai_readiness: clamp(ta),
    revenue_operations: clamp(ro),
  };
}
