/* ─── EscalaX Offer & Value Stack Analyzer ─────────────────────────── */

import type { CrawledPage, OfferAnalysis, PricingTier } from "./types";

// Extract pricing tiers from HTML
function extractPricingTiers(html: string): PricingTier[] {
  const tiers: PricingTier[] = [];

  // Common pricing tier name patterns
  const tierNames: [string, RegExp][] = [
    ["Starter", /(?:^|\b)(starter|básico|basic|free|gratis|lite|hobby)(?:\b|$)/i],
    ["Professional", /(?:^|\b)(pro|professional|profesional|business|negocio|growth|crecimiento|standard|estándar)(?:\b|$)/i],
    ["Enterprise", /(?:^|\b)(enterprise|empresa|premium|advanced|avanzado|ultimate|unlimited|ilimitado|scale|custom|personalizado)(?:\b|$)/i],
  ];

  // Detect pricing patterns: $X/mo, $X/yr, €X, MXN X
  const pricePatterns = html.match(
    /(?:\$|€|£|MXN\s*|USD\s*|EUR\s*)\s*\d[\d,]*(?:\.\d{1,2})?(?:\s*\/\s*(?:mo|month|mes|yr|year|año|week|semana))?/gi
  ) || [];

  // Detect tier blocks using common HTML patterns
  const tierBlockPattern = /class=["'][^"']*(?:pricing[_-]?(?:card|tier|plan|item|box)|plan[_-]?(?:card|tier|item))[^"']*["'][^>]*>([\s\S]*?)(?=class=["'][^"']*(?:pricing[_-]?(?:card|tier|plan|item|box)|plan[_-]?(?:card|tier|item))|$)/gi;

  let tierMatch;
  while ((tierMatch = tierBlockPattern.exec(html)) !== null) {
    const block = tierMatch[1];
    const name = detectTierName(block, tierNames);
    const price = extractPrice(block);
    const features = extractFeatures(block);
    const isFeatured = /popular|recommended|best.*value|más\s*popular|recomendado/i.test(block);

    if (name || price) {
      tiers.push({
        name: name || `Tier ${tiers.length + 1}`,
        price: price?.amount || null,
        currency: price?.currency || null,
        period: price?.period || null,
        features,
        isFeatured,
      });
    }
  }

  // If no structured tiers found, check for price mentions
  if (tiers.length === 0 && pricePatterns.length > 0) {
    // Create inferred tiers from price mentions
    const seen = new Set<string>();
    for (const p of pricePatterns.slice(0, 5)) {
      const normalized = p.trim();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        tiers.push({
          name: `Plan ${tiers.length + 1}`,
          price: normalized,
          currency: null,
          period: null,
          features: [],
          isFeatured: false,
        });
      }
    }
  }

  return tiers;
}

function detectTierName(block: string, patterns: [string, RegExp][]): string | null {
  for (const [name, re] of patterns) {
    if (re.test(block)) return name;
  }
  // Try to find tier name from headings within the block
  const h = block.match(/<h[2-4][^>]*>([^<]{2,40})<\/h[2-4]>/i);
  if (h) return h[1].trim();
  return null;
}

function extractPrice(block: string): { amount: string; currency: string; period: string | null } | null {
  const m = block.match(
    /(?:(\$|€|£|MXN|USD|EUR)\s*)(\d[\d,]*(?:\.\d{1,2})?)(?:\s*\/\s*(mo|month|mes|yr|year|año))?/i
  );
  if (m) {
    return {
      amount: `${m[1]}${m[2]}`,
      currency: m[1],
      period: m[3] || null,
    };
  }
  return null;
}

function extractFeatures(block: string): string[] {
  const features: string[] = [];
  // Look for list items in tier blocks
  const liPattern = /<li[^>]*>([^<]{3,80})<\/li>/gi;
  let li;
  while ((li = liPattern.exec(block)) !== null) {
    const text = li[1].replace(/<[^>]+>/g, "").trim();
    if (text.length > 2 && text.length < 80) features.push(text);
  }
  return features.slice(0, 15); // Cap at 15 features per tier
}

// Detect guarantee language
function detectGuarantees(html: string): { has: boolean; text: string | null } {
  const patterns = [
    /(\d+[\s-]*day\s+money[\s-]*back\s+guarantee)/i,
    /(\d+\s*días?\s+de\s+garantía\s+de\s+devolución)/i,
    /(100%\s+(?:money[\s-]*back|satisfaction)\s+guarantee)/i,
    /(garantía\s+de\s+satisfacción\s+(?:total|100%))/i,
    /(risk[\s-]*free|sin\s+riesgo)/i,
    /(full\s+refund|reembolso\s+completo)/i,
    /(no\s+questions?\s+asked|sin\s+preguntas)/i,
    /(satisfaction\s+guaranteed|satisfacción\s+garantizada)/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return { has: true, text: m[1] };
  }
  return { has: false, text: null };
}

// Detect urgency tactics
function detectUrgency(html: string): string[] {
  const tactics: string[] = [];
  if (/countdown|timer|temporizador/i.test(html)) tactics.push("Countdown timer");
  if (/limited\s+time|tiempo\s+limitado|por\s+tiempo\s+limitado/i.test(html)) tactics.push("Limited time");
  if (/offer\s+expires|oferta\s+termina|oferta\s+vence/i.test(html)) tactics.push("Expiring offer");
  if (/today\s+only|solo\s+hoy|sólo\s+hoy/i.test(html)) tactics.push("Today only");
  if (/hours?\s+left|horas?\s+restantes/i.test(html)) tactics.push("Hours left");
  if (/ending\s+soon|termina\s+pronto/i.test(html)) tactics.push("Ending soon");
  if (/last\s+chance|última\s+oportunidad/i.test(html)) tactics.push("Last chance");
  if (/flash\s+sale|venta\s+relámpago/i.test(html)) tactics.push("Flash sale");
  return tactics;
}

// Detect scarcity tactics
function detectScarcity(html: string): string[] {
  const tactics: string[] = [];
  if (/\d+\s+spots?\s+left|quedan\s+\d+\s+lugares/i.test(html)) tactics.push("Limited spots");
  if (/only\s+\d+\s+remaining|solo\s+quedan\s+\d+/i.test(html)) tactics.push("Limited quantity");
  if (/sold\s+out|agotado/i.test(html)) tactics.push("Sold out signals");
  if (/waitlist|lista\s+de\s+espera/i.test(html)) tactics.push("Waitlist");
  if (/exclusive|exclusivo/i.test(html)) tactics.push("Exclusivity");
  if (/limited\s+edition|edición\s+limitada/i.test(html)) tactics.push("Limited edition");
  if (/invitation\s+only|solo\s+con\s+invitación/i.test(html)) tactics.push("Invitation only");
  return tactics;
}

// Detect value stack elements
function detectValueStack(html: string): string[] {
  const elements: string[] = [];
  if (/bonus|bono|extra|adicional/i.test(html)) elements.push("Bonus offers");
  if (/free\s+(?:shipping|envío\s+gratis)/i.test(html)) elements.push("Free shipping");
  if (/onboarding|setup.*included|implementación.*incluida/i.test(html)) elements.push("Free onboarding");
  if (/support\s+(?:24|round|dedicated)|soporte\s+(?:24|dedicado)/i.test(html)) elements.push("Priority support");
  if (/training|capacitación|formación/i.test(html)) elements.push("Training included");
  if (/community|comunidad|group|grupo/i.test(html)) elements.push("Community access");
  if (/template|plantilla/i.test(html)) elements.push("Templates included");
  if (/api\s+access|acceso.*api/i.test(html)) elements.push("API access");
  if (/white[\s-]*label|marca\s+blanca/i.test(html)) elements.push("White label");
  if (/integration|integración/i.test(html)) elements.push("Integrations");
  if (/certificate|certificado|certificación/i.test(html)) elements.push("Certification");
  if (/lifetime|vitalicio|de\s+por\s+vida/i.test(html)) elements.push("Lifetime access");
  return elements;
}

// Detect social proof on pricing pages
function detectPricingSocialProof(html: string): string[] {
  const proof: string[] = [];
  if (/trusted\s+by|confían\s+en\s+nosotros/i.test(html)) proof.push("'Trusted by' statement");
  if (/\d+[\s,]*\d*\+?\s*(?:customers?|clients?|users?|businesses|empresas|clientes|usuarios)/i.test(html)) proof.push("Customer count");
  if (/rating|review|testimonial|calificación|reseña/i.test(html)) proof.push("Reviews/testimonials");
  if (/logo.*(?:grid|wall|strip)|as\s+seen\s+(?:in|on)/i.test(html)) proof.push("Logo wall");
  if (/award|premio|recognition|reconocimiento/i.test(html)) proof.push("Awards/recognition");
  if (/featured\s+(?:in|on)|publicado\s+en/i.test(html)) proof.push("Media mentions");
  return proof;
}

export function analyzeOffer(pages: CrawledPage[]): OfferAnalysis {
  const allHtml = pages.map(p => p.html).join("\n");
  const pricingPage = pages.find(p => p.type === "pricing");
  const htmlToAnalyze = pricingPage ? pricingPage.html : allHtml;

  const tiers = extractPricingTiers(htmlToAnalyze);
  const guarantee = detectGuarantees(allHtml);
  const urgency = detectUrgency(allHtml);
  const scarcity = detectScarcity(allHtml);
  const valueStack = detectValueStack(allHtml);
  const socialProof = detectPricingSocialProof(htmlToAnalyze);

  const hasFreeOption = tiers.some(t => /free|gratis|0|libre/i.test(t.price || t.name));
  const hasFreeTrial = /free.*trial|prueba.*gratis|prueba.*gratuita|try.*free/i.test(allHtml);
  const hasAnnualDiscount = /annual|yearly|anual|save.*%|ahorra.*%/i.test(allHtml);

  // Offer clarity: can a visitor understand what they're getting?
  let clarity = 0;
  if (tiers.length > 0) clarity += 3;
  if (tiers.some(t => t.features.length > 0)) clarity += 2;
  if (guarantee.has) clarity += 1.5;
  if (hasFreeOption || hasFreeTrial) clarity += 1.5;
  if (socialProof.length > 0) clarity += 1;
  if (hasAnnualDiscount) clarity += 0.5;
  if (tiers.some(t => t.isFeatured)) clarity += 0.5;

  // Offer strength: how compelling is the offer?
  let strength = 0;
  if (tiers.length >= 2) strength += 2;
  if (guarantee.has) strength += 2;
  if (urgency.length > 0) strength += 1.5;
  if (scarcity.length > 0) strength += 1;
  if (valueStack.length > 0) strength += Math.min(valueStack.length * 0.5, 2);
  if (socialProof.length >= 2) strength += 1;
  if (hasFreeTrial || hasFreeOption) strength += 0.5;

  return {
    hasPricingPage: !!pricingPage,
    pricingUrl: pricingPage?.url || null,
    tiers,
    hasFreeOption,
    hasFreeTrial,
    hasMoneyBackGuarantee: guarantee.has,
    guaranteeText: guarantee.text,
    hasAnnualDiscount,
    urgencyTactics: urgency,
    scarcityTactics: scarcity,
    valueStackElements: valueStack,
    socialProofOnPricing: socialProof,
    offerClarity: Math.min(10, Math.round(clarity * 10) / 10),
    offerStrength: Math.min(10, Math.round(strength * 10) / 10),
  };
}
