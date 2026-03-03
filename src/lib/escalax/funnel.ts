/* ─── EscalaX Funnel Analyzer ──────────────────────────────────────── */

import type { CrawledPage, FunnelAnalysis, FunnelStage } from "./types";

// Detect funnel builder platforms
function detectFunnelBuilder(allHtml: string): string | null {
  const builders: [string, RegExp][] = [
    ["ClickFunnels", /clickfunnels/i],
    ["Leadpages", /leadpages/i],
    ["Unbounce", /unbounce/i],
    ["Instapage", /instapage/i],
    ["Kajabi", /kajabi/i],
    ["Kartra", /kartra/i],
    ["Systeme.io", /systeme\.io/i],
    ["GoHighLevel", /gohighlevel|highlevel|leadconnector/i],
    ["Funnelytics", /funnelytics/i],
    ["HubSpot Landing", /hubspot.*landing/i],
    ["Webflow", /webflow/i],
    ["Carrd", /carrd\.co/i],
  ];
  for (const [name, re] of builders) {
    if (re.test(allHtml)) return name;
  }
  return null;
}

// Detect lead magnets from page content
function detectLeadMagnets(allHtml: string): string[] {
  const magnets: string[] = [];
  const patterns: [string, RegExp][] = [
    ["Free Ebook/Guide", /free\s+(ebook|guide|pdf|whitepaper|e-book|guía|libro)/i],
    ["Free Consultation", /free\s+(consultation|consult|assessment|evaluación|consulta)/i],
    ["Free Trial", /free\s+trial|prueba\s+gratis|prueba\s+gratuita/i],
    ["Webinar/Masterclass", /webinar|masterclass|master\s*class|clase\s+gratis/i],
    ["Template/Toolkit", /free\s+(template|toolkit|checklist|plantilla|herramienta)/i],
    ["Newsletter", /newsletter|suscríbete|subscribe\s+to\s+our/i],
    ["Course/Training", /free\s+(course|training|workshop|curso|entrenamiento)/i],
    ["Calculator/Quiz", /calculator|quiz|assessment|calculadora|cuestionario/i],
    ["Demo", /request.*demo|book.*demo|schedule.*demo|solicitar.*demo/i],
    ["Case Study", /download.*case\s+study|get.*case\s+study|caso\s+de\s+éxito/i],
    ["Discount/Coupon", /discount|coupon|off|descuento|cupón|% off/i],
  ];
  for (const [name, re] of patterns) {
    if (re.test(allHtml) && !magnets.includes(name)) magnets.push(name);
  }
  return magnets;
}

// Analyze each funnel stage
function analyzeStages(pages: CrawledPage[], allHtml: string): FunnelStage[] {
  const stages: FunnelStage[] = [];

  // AWARENESS — Top of funnel
  const awarenessSignals: string[] = [];
  if (/blog|article|post|news|insight/i.test(allHtml)) awarenessSignals.push("Blog content");
  if (/podcast|apple.*podcast|spotify/i.test(allHtml)) awarenessSignals.push("Podcast");
  if (/youtube|vimeo|video/i.test(allHtml)) awarenessSignals.push("Video content");
  if (/instagram|facebook|twitter|tiktok|linkedin/i.test(allHtml)) awarenessSignals.push("Social media links");
  if (/seo|sitemap|canonical/i.test(allHtml)) awarenessSignals.push("SEO optimization");
  if (/google.*ads|meta.*pixel|fbq|gtag.*ads/i.test(allHtml)) awarenessSignals.push("Paid advertising");
  stages.push({
    stage: "awareness",
    label: "Awareness",
    detected: awarenessSignals.length >= 2,
    signals: awarenessSignals,
    score: Math.min(10, awarenessSignals.length * 2),
  });

  // INTEREST — Lead capture
  const interestSignals: string[] = [];
  if (/<form/i.test(allHtml)) interestSignals.push("Lead capture forms");
  if (/newsletter|suscri|subscribe/i.test(allHtml)) interestSignals.push("Email subscription");
  if (/popup|modal|overlay.*form/i.test(allHtml)) interestSignals.push("Popup/modal forms");
  if (/lead.*magnet|ebook|whitepaper|free.*guide/i.test(allHtml)) interestSignals.push("Lead magnets");
  if (/exit.*intent|scroll.*trigger/i.test(allHtml)) interestSignals.push("Exit-intent capture");
  if (/webinar|masterclass|event/i.test(allHtml)) interestSignals.push("Events/webinars");
  if (/quiz|assessment|calculator/i.test(allHtml)) interestSignals.push("Interactive tools");
  stages.push({
    stage: "interest",
    label: "Interest/Capture",
    detected: interestSignals.length >= 2,
    signals: interestSignals,
    score: Math.min(10, interestSignals.length * 1.8),
  });

  // CONSIDERATION — Nurturing
  const considerationSignals: string[] = [];
  if (/case.?stud|success.?stor|caso.*éxito/i.test(allHtml)) considerationSignals.push("Case studies");
  if (/testimonial|review|rating|estrella|calificación/i.test(allHtml)) considerationSignals.push("Social proof");
  if (/comparison|vs\b|versus|comparación/i.test(allHtml)) considerationSignals.push("Comparison content");
  if (/faq|frequently.*asked|preguntas.*frecuentes/i.test(allHtml)) considerationSignals.push("FAQ section");
  if (/demo|product.*tour|recorrido/i.test(allHtml)) considerationSignals.push("Product demo");
  if (/email.*sequence|drip|nurtur|activecampaign|mailchimp|klaviyo/i.test(allHtml)) considerationSignals.push("Email nurturing");
  if (/trust.*badge|guarantee|certificat|garanti/i.test(allHtml)) considerationSignals.push("Trust signals");
  const hasPricingPage = pages.some(p => p.type === "pricing");
  if (hasPricingPage) considerationSignals.push("Pricing page");
  stages.push({
    stage: "consideration",
    label: "Consideration",
    detected: considerationSignals.length >= 2,
    signals: considerationSignals,
    score: Math.min(10, considerationSignals.length * 1.5),
  });

  // DECISION — Conversion
  const decisionSignals: string[] = [];
  if (/pricing|precios|planes|plans/i.test(allHtml)) decisionSignals.push("Pricing/plans");
  if (/checkout|cart|carrito|buy.*now|comprar/i.test(allHtml)) decisionSignals.push("Checkout flow");
  if (/book.*call|schedule|agendar|reservar/i.test(allHtml)) decisionSignals.push("Booking/scheduling");
  if (/free.*trial|prueba.*gratis/i.test(allHtml)) decisionSignals.push("Free trial");
  if (/sign.*up|registr|crear.*cuenta/i.test(allHtml)) decisionSignals.push("Sign up flow");
  if (/money.*back|risk.*free|satisfaction.*guarantee|devolución|sin.*riesgo/i.test(allHtml)) decisionSignals.push("Risk reversal");
  if (/limited.*time|offer.*expires|spots.*left|últimas.*plazas|tiempo.*limitado/i.test(allHtml)) decisionSignals.push("Urgency triggers");
  if (/stripe|paypal|mercadopago|payment/i.test(allHtml)) decisionSignals.push("Payment processing");
  stages.push({
    stage: "decision",
    label: "Decision/Purchase",
    detected: decisionSignals.length >= 2,
    signals: decisionSignals,
    score: Math.min(10, decisionSignals.length * 1.5),
  });

  // RETENTION — Post-purchase
  const retentionSignals: string[] = [];
  if (/thank.*you|gracias|confirmation|confirmación/i.test(allHtml)) retentionSignals.push("Thank you page");
  if (/dashboard|portal|account|mi.*cuenta|panel/i.test(allHtml)) retentionSignals.push("Customer portal");
  if (/help.*center|support|soporte|knowledge.*base/i.test(allHtml)) retentionSignals.push("Help center");
  if (/referr|refer.*friend|recomendar/i.test(allHtml)) retentionSignals.push("Referral program");
  if (/loyalty|reward|puntos|recompensa/i.test(allHtml)) retentionSignals.push("Loyalty program");
  if (/upsell|upgrade|premium|pro.*plan/i.test(allHtml)) retentionSignals.push("Upsell paths");
  if (/community|forum|foro|comunidad/i.test(allHtml)) retentionSignals.push("Community");
  stages.push({
    stage: "retention",
    label: "Retention",
    detected: retentionSignals.length >= 1,
    signals: retentionSignals,
    score: Math.min(10, retentionSignals.length * 2),
  });

  return stages;
}

function classifyFunnelType(completeness: number, hasCheckout: boolean, hasEmailSequence: boolean): FunnelAnalysis["funnelType"] {
  if (completeness >= 85 && hasCheckout && hasEmailSequence) return "enterprise";
  if (completeness >= 70 && hasCheckout) return "advanced";
  if (completeness >= 50) return "intermediate";
  if (completeness >= 25) return "basic";
  return "none";
}

export function analyzeFunnel(pages: CrawledPage[], internalLinks: string[]): FunnelAnalysis {
  const allHtml = pages.map(p => p.html).join("\n");
  const stages = analyzeStages(pages, allHtml);

  const detectedCount = stages.filter(s => s.detected).length;
  const completeness = Math.round((detectedCount / stages.length) * 100);

  const gaps: string[] = [];
  for (const stage of stages) {
    if (!stage.detected) {
      gaps.push(stage.label);
    }
  }

  const hasCheckout = /checkout|cart|buy.*now|comprar.*ahora/i.test(allHtml);
  const hasThankYouPage = /thank.*you|gracias.*por/i.test(allHtml);
  const hasUpsell = /upsell|upgrade|premium|add.*on/i.test(allHtml);
  const hasEmailSequence = /activecampaign|mailchimp|klaviyo|drip|email.*sequence|hubspot/i.test(allHtml);

  return {
    stages,
    completeness,
    gaps,
    funnelType: classifyFunnelType(completeness, hasCheckout, hasEmailSequence),
    detectedFunnelBuilder: detectFunnelBuilder(allHtml),
    leadMagnets: detectLeadMagnets(allHtml),
    hasCheckout,
    hasThankYouPage,
    hasUpsell,
    hasEmailSequence,
    internalLinks: internalLinks.slice(0, 50),
  };
}
