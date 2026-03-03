/* ─── EscalaX Ad Intelligence Module ───────────────────────────────── */

import type { CrawledPage, AdIntelligence, AdPlatformIntel, TrackedTool } from "./types";

// Analyze per-platform ad maturity
function analyzeAdPlatforms(trackedTools: TrackedTool[], allHtml: string): AdPlatformIntel[] {
  const platforms: AdPlatformIntel[] = [];

  // Meta / Facebook
  const metaPixel = trackedTools.find(t => t.tool === "Meta Pixel");
  const metaEvents: string[] = [];
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]Lead['"]/i.test(allHtml)) metaEvents.push("Lead");
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]Purchase['"]/i.test(allHtml)) metaEvents.push("Purchase");
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]AddToCart['"]/i.test(allHtml)) metaEvents.push("AddToCart");
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]CompleteRegistration['"]/i.test(allHtml)) metaEvents.push("Registration");
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]ViewContent['"]/i.test(allHtml)) metaEvents.push("ViewContent");
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]InitiateCheckout['"]/i.test(allHtml)) metaEvents.push("InitiateCheckout");
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]Search['"]/i.test(allHtml)) metaEvents.push("Search");
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]Schedule['"]/i.test(allHtml)) metaEvents.push("Schedule");
  if (/fbq\s*\(\s*['"]trackCustom/i.test(allHtml)) metaEvents.push("Custom Events");
  platforms.push({
    platform: "Meta (Facebook/Instagram)",
    pixelDetected: !!metaPixel,
    pixelId: metaPixel?.id || null,
    conversionEvents: metaEvents,
    maturity: !metaPixel ? "not_detected" : metaEvents.length >= 3 ? "full_funnel" : metaEvents.length > 0 ? "tracking_events" : "pixel_only",
  });

  // Google Ads
  const gAds = trackedTools.find(t => t.tool === "Google Ads");
  const gEvents: string[] = [];
  if (/gtag\s*\(\s*['"]event['"]\s*,\s*['"]purchase['"]/i.test(allHtml)) gEvents.push("Purchase");
  if (/gtag\s*\(\s*['"]event['"]\s*,\s*['"]generate_lead['"]/i.test(allHtml)) gEvents.push("Lead");
  if (/gtag\s*\(\s*['"]event['"]\s*,\s*['"]sign_up['"]/i.test(allHtml)) gEvents.push("SignUp");
  if (/gtag\s*\(\s*['"]event['"]\s*,\s*['"]begin_checkout['"]/i.test(allHtml)) gEvents.push("Checkout");
  if (/gtag\s*\(\s*['"]event['"]\s*,\s*['"]add_to_cart['"]/i.test(allHtml)) gEvents.push("AddToCart");
  if (/gtag\s*\(\s*['"]event['"]\s*,\s*['"]page_view['"]/i.test(allHtml)) gEvents.push("PageView");
  if (/google_conversion/i.test(allHtml)) gEvents.push("Legacy Conversion");
  platforms.push({
    platform: "Google Ads",
    pixelDetected: !!gAds,
    pixelId: gAds?.id || null,
    conversionEvents: gEvents,
    maturity: !gAds ? "not_detected" : gEvents.length >= 3 ? "full_funnel" : gEvents.length > 0 ? "tracking_events" : "pixel_only",
  });

  // LinkedIn
  const liAds = trackedTools.find(t => t.tool === "LinkedIn Insight");
  const liEvents: string[] = [];
  if (/lintrk\s*\(\s*['"]track['"]/i.test(allHtml)) liEvents.push("Conversion tracking");
  if (/linkedin.*conversion/i.test(allHtml)) liEvents.push("Conversion pixel");
  platforms.push({
    platform: "LinkedIn Ads",
    pixelDetected: !!liAds,
    pixelId: liAds?.id || null,
    conversionEvents: liEvents,
    maturity: !liAds ? "not_detected" : liEvents.length > 0 ? "tracking_events" : "pixel_only",
  });

  // TikTok
  const ttAds = trackedTools.find(t => t.tool === "TikTok Pixel");
  const ttEvents: string[] = [];
  if (/ttq\s*\.\s*track\s*\(/i.test(allHtml)) ttEvents.push("Event tracking");
  if (/ttq\s*\.\s*page\s*\(/i.test(allHtml)) ttEvents.push("Page tracking");
  platforms.push({
    platform: "TikTok Ads",
    pixelDetected: !!ttAds,
    pixelId: ttAds?.id || null,
    conversionEvents: ttEvents,
    maturity: !ttAds ? "not_detected" : ttEvents.length > 0 ? "tracking_events" : "pixel_only",
  });

  // Twitter/X
  const twAds = trackedTools.find(t => t.tool === "Twitter/X Pixel");
  const twEvents: string[] = [];
  if (/twq\s*\(\s*['"]track['"]/i.test(allHtml)) twEvents.push("Event tracking");
  platforms.push({
    platform: "Twitter/X Ads",
    pixelDetected: !!twAds,
    pixelId: twAds?.id || null,
    conversionEvents: twEvents,
    maturity: !twAds ? "not_detected" : twEvents.length > 0 ? "tracking_events" : "pixel_only",
  });

  // Snapchat
  const snapAds = trackedTools.find(t => t.tool === "Snapchat Pixel");
  platforms.push({
    platform: "Snapchat Ads",
    pixelDetected: !!snapAds,
    pixelId: null,
    conversionEvents: [],
    maturity: !snapAds ? "not_detected" : "pixel_only",
  });

  // Pinterest
  const pinAds = trackedTools.find(t => t.tool === "Pinterest Tag");
  platforms.push({
    platform: "Pinterest Ads",
    pixelDetected: !!pinAds,
    pixelId: null,
    conversionEvents: [],
    maturity: !pinAds ? "not_detected" : "pixel_only",
  });

  return platforms;
}

// Detect landing page indicators
function detectLandingPages(pages: CrawledPage[], allHtml: string): string[] {
  const indicators: string[] = [];

  // Pages with minimal navigation (landing page signature)
  for (const page of pages) {
    const navCount = (page.html.match(/<nav/gi) || []).length;
    const linkCount = (page.html.match(/<a\s+href/gi) || []).length;
    if (page.type !== "home" && navCount === 0 && linkCount < 10) {
      indicators.push(`Dedicated LP detected: ${page.url}`);
    }
  }

  // Funnel builder indicators
  if (/clickfunnels|leadpages|unbounce|instapage/i.test(allHtml)) {
    indicators.push("Funnel builder platform detected");
  }

  // UTM parameter handling
  if (/utm_source|utm_medium|utm_campaign/i.test(allHtml)) {
    indicators.push("UTM parameter handling");
  }

  // A/B testing on landing pages
  if (/optimizely|vwo|google.*optimize|ab.*test/i.test(allHtml)) {
    indicators.push("A/B testing on landing pages");
  }

  // Dynamic keyword insertion
  if (/\{keyword\}|\{loc_physical_ms\}/i.test(allHtml)) {
    indicators.push("Dynamic keyword insertion");
  }

  return indicators;
}

// Estimate ad sophistication and spend
function estimateAdMaturity(
  platforms: AdPlatformIntel[],
  retargetingTools: string[],
  hasGTM: boolean,
): { level: AdIntelligence["maturityLevel"]; spend: string | null; sophistication: number } {
  const activePlatforms = platforms.filter(p => p.pixelDetected);
  const fullFunnel = platforms.filter(p => p.maturity === "full_funnel");
  const withEvents = platforms.filter(p => p.maturity === "tracking_events" || p.maturity === "full_funnel");

  let sophistication = 0;
  sophistication += activePlatforms.length * 1.5;
  sophistication += fullFunnel.length * 2;
  sophistication += withEvents.length * 1;
  if (retargetingTools.length > 0) sophistication += 1.5;
  if (hasGTM) sophistication += 1;

  let level: AdIntelligence["maturityLevel"];
  let spend: string | null;

  if (activePlatforms.length === 0) {
    level = "none";
    spend = null;
  } else if (activePlatforms.length === 1 && fullFunnel.length === 0) {
    level = "basic";
    spend = "$100–$1,000/mo";
  } else if (activePlatforms.length <= 2 && withEvents.length >= 1) {
    level = "intermediate";
    spend = "$1,000–$5,000/mo";
  } else if (activePlatforms.length >= 3 || fullFunnel.length >= 2) {
    level = "advanced";
    spend = "$5,000–$25,000/mo";
  } else {
    level = "enterprise";
    spend = "$25,000+/mo";
  }

  return { level, spend, sophistication: Math.min(10, Math.round(sophistication * 10) / 10) };
}

export function analyzeAdIntelligence(
  pages: CrawledPage[],
  trackedTools: TrackedTool[],
  retargetingTools: string[],
  dnsVerifications: string[],
): AdIntelligence {
  const allHtml = pages.map(p => p.html).join("\n");
  const platforms = analyzeAdPlatforms(trackedTools, allHtml);
  const hasGTM = trackedTools.some(t => t.tool === "Google Tag Manager");
  const { level, spend, sophistication } = estimateAdMaturity(platforms, retargetingTools, hasGTM);
  const landingPageIndicators = detectLandingPages(pages, allHtml);

  const adVerifications: string[] = [];
  if (dnsVerifications.includes("Facebook Domain Verification")) adVerifications.push("Meta domain verified");
  if (dnsVerifications.includes("Google Search Console")) adVerifications.push("Google verified");
  if (/google-site-verification/i.test(allHtml)) adVerifications.push("Google site verification tag");

  const activePlatforms = platforms.filter(p => p.pixelDetected);
  const withConversions = platforms.filter(p => p.conversionEvents.length > 0);

  let pixelHealth: AdIntelligence["pixelHealth"];
  if (activePlatforms.length === 0) pixelHealth = "none";
  else if (withConversions.length === 0) pixelHealth = "partial";
  else if (withConversions.length >= 2) pixelHealth = "advanced";
  else pixelHealth = "healthy";

  return {
    platforms,
    maturityLevel: level,
    estimatedMonthlySpend: spend,
    trackingSophistication: sophistication,
    hasRetargeting: retargetingTools.length > 0,
    hasConversionTracking: withConversions.length > 0,
    hasLandingPages: landingPageIndicators.length > 0,
    landingPageIndicators,
    adRelatedVerifications: adVerifications,
    pixelHealth,
  };
}
