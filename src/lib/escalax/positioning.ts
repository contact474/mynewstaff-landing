/* ─── EscalaX Positioning & Messaging Analyzer ─────────────────────── */

import type { CrawledPage, PositioningAnalysis } from "./types";

// Extract all headings (H1-H3) from HTML
function extractHeadings(html: string): string[] {
  const headings: string[] = [];
  const re = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text.length > 3 && text.length < 200) headings.push(text);
  }
  return headings;
}

// Extract the primary H1 headline
function extractPrimaryHeadline(html: string): string | null {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (m) {
    const text = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text.length > 3) return text;
  }
  return null;
}

// Extract subheadline (first H2 or first paragraph after H1)
function extractSubheadline(html: string): string | null {
  // Try H2 first
  const h2 = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (h2) {
    const text = h2[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text.length > 10 && text.length < 300) return text;
  }
  // Try first substantial paragraph in hero area
  const heroP = html.match(/<(?:p|span)[^>]*class=["'][^"']*(?:hero|subtitle|subhead|tagline|lead)[^"']*["'][^>]*>([\s\S]*?)<\/(?:p|span)>/i);
  if (heroP) {
    const text = heroP[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text.length > 10) return text;
  }
  return null;
}

// Detect target audience mentions
function detectTargetAudience(allHtml: string, headlines: string[]): string | null {
  const allText = [...headlines, allHtml.replace(/<[^>]+>/g, " ").substring(0, 5000)].join(" ");

  const patterns = [
    /(?:for|para|built for|designed for|made for|pensado para|creado para|hecho para)\s+([a-záéíóúñü\s]{5,60})(?:\.|,|$)/i,
    /(?:help(?:s|ing)?|ayuda(?:mos)?(?:\s+a)?)\s+([a-záéíóúñü\s]{5,60})\s+(?:to|a|con|que)/i,
    /(?:serving|atendemos a|servimos a)\s+([a-záéíóúñü\s]{5,60})/i,
    /(?:ideal for|ideal para|perfect for|perfecto para)\s+([a-záéíóúñü\s]{5,60})/i,
  ];

  for (const re of patterns) {
    const m = allText.match(re);
    if (m && m[1].trim().length > 5) return m[1].trim();
  }
  return null;
}

// Detect differentiators and unique selling points
function detectDifferentiators(allHtml: string): string[] {
  const diffs: string[] = [];
  const text = allHtml.replace(/<[^>]+>/g, " ").substring(0, 10000);

  if (/the\s+only|el\s+único|la\s+única/i.test(text)) diffs.push("Uniqueness claim ('the only')");
  if (/unlike|a\s+diferencia\s+de/i.test(text)) diffs.push("Competitive comparison ('unlike')");
  if (/first\s+(?:to|in)|primero\s+en/i.test(text)) diffs.push("First-mover claim");
  if (/\d+x\s+(?:faster|better|more|más\s+rápido)/i.test(text)) diffs.push("Quantified advantage");
  if (/patent|proprietary|patentado|propio/i.test(text)) diffs.push("Proprietary technology");
  if (/award.?winning|galardonado|premiado/i.test(text)) diffs.push("Award-winning");
  if (/\d+\+?\s*(?:years?|años?)\s+(?:of\s+)?experience/i.test(text)) diffs.push("Experience claim");
  if (/guarantee|garantía|warranted/i.test(text)) diffs.push("Guarantee/warranty");
  if (/all[\s-]*in[\s-]*one|todo[\s-]*en[\s-]*uno/i.test(text)) diffs.push("All-in-one solution");
  if (/no[\s-]*(?:code|coding)|sin[\s-]*código/i.test(text)) diffs.push("No-code/easy approach");
  if (/ai[\s-]*powered|inteligencia\s+artificial|machine\s+learning/i.test(text)) diffs.push("AI/ML powered");
  if (/custom|personaliz|a\s+(?:tu|su)\s+medida/i.test(text)) diffs.push("Customization");

  return diffs;
}

// Detect problem statements
function detectProblemStatements(allHtml: string): string[] {
  const problems: string[] = [];
  const text = allHtml.replace(/<[^>]+>/g, " ").substring(0, 8000);

  if (/tired\s+of|cansado\s+de/i.test(text)) problems.push("Pain point: fatigue/frustration");
  if (/struggling|luchando|batallando/i.test(text)) problems.push("Pain point: struggling");
  if (/waste|wasting|desperdici/i.test(text)) problems.push("Pain point: wasted resources");
  if (/expensive|caro|costoso/i.test(text)) problems.push("Pain point: cost");
  if (/complicated|complex|complicado|complejo/i.test(text)) problems.push("Pain point: complexity");
  if (/slow|lento/i.test(text)) problems.push("Pain point: speed");
  if (/lost|losing|perdiendo|pierd/i.test(text)) problems.push("Pain point: loss");
  if (/broken|roto|no\s+funciona/i.test(text)) problems.push("Pain point: broken systems");

  return problems;
}

// Detect solution statements
function detectSolutionStatements(allHtml: string): string[] {
  const solutions: string[] = [];
  const text = allHtml.replace(/<[^>]+>/g, " ").substring(0, 8000);

  if (/automat|automatiz/i.test(text)) solutions.push("Automation");
  if (/simplif|simplific/i.test(text)) solutions.push("Simplification");
  if (/save\s+(?:time|money|hours)|ahorra/i.test(text)) solutions.push("Time/money savings");
  if (/grow|crec|escala/i.test(text)) solutions.push("Growth");
  if (/boost|increase|incrementa|aumenta/i.test(text)) solutions.push("Performance boost");
  if (/protect|protege|secur|segur/i.test(text)) solutions.push("Security/protection");
  if (/connect|conecta|integrat/i.test(text)) solutions.push("Integration/connection");
  if (/insight|analytic|análisis/i.test(text)) solutions.push("Data insights");
  if (/transform|transforma/i.test(text)) solutions.push("Transformation");

  return solutions;
}

// Extract CTA copy text
function extractCtaCopy(html: string): string[] {
  const ctas: string[] = [];
  // Buttons and links with CTA-like classes or text
  const ctaPattern = /<(?:a|button)[^>]*(?:class=["'][^"']*(?:btn|button|cta|action)[^"']*["']|type=["']submit["'])[^>]*>([\s\S]*?)<\/(?:a|button)>/gi;
  let m;
  while ((m = ctaPattern.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (text.length > 2 && text.length < 60) ctas.push(text);
  }
  // Also check for standalone CTA phrases
  const standalone = html.match(/>(\s*(?:Get Started|Start Free|Try Free|Book a Demo|Contact Us|Learn More|Sign Up|Buy Now|Subscribe|Download|Empezar|Comenzar|Probar Gratis|Reservar|Contáctanos|Suscribirse)\s*)</gi);
  if (standalone) {
    for (const s of standalone) {
      const text = s.replace(/^>/, "").trim();
      if (text && !ctas.includes(text)) ctas.push(text);
    }
  }
  return [...new Set(ctas)].slice(0, 10);
}

// Classify positioning type
function classifyPositioning(
  headline: string | null,
  audience: string | null,
  differentiators: string[],
  problems: string[],
): PositioningAnalysis["positioningType"] {
  if (!headline || headline.length < 10) return "missing";

  // Check for generic headlines
  const genericPatterns = /welcome|bienvenido|home|inicio|hello|hola/i;
  if (genericPatterns.test(headline)) return "generic";

  // Clear positioning: has audience + differentiator or problem/solution
  if ((audience || differentiators.length >= 2) && problems.length >= 1) return "clear";

  // Vague: has headline but lacks specificity
  if (headline.length > 10 && (differentiators.length > 0 || problems.length > 0)) return "vague";

  return "generic";
}

export function analyzePositioning(pages: CrawledPage[]): PositioningAnalysis {
  const homePage = pages.find(p => p.type === "home");
  const allHtml = pages.map(p => p.html).join("\n");
  const homeHtml = homePage?.html || allHtml;

  const headlines = extractHeadings(homeHtml);
  const allHeadlines = extractHeadings(allHtml);
  const primaryHeadline = extractPrimaryHeadline(homeHtml);
  const subheadline = extractSubheadline(homeHtml);
  const targetAudience = detectTargetAudience(allHtml, allHeadlines);
  const differentiators = detectDifferentiators(allHtml);
  const problems = detectProblemStatements(allHtml);
  const solutions = detectSolutionStatements(allHtml);
  const ctaCopy = extractCtaCopy(allHtml);

  const positioningType = classifyPositioning(primaryHeadline, targetAudience, differentiators, problems);

  // Value proposition: try to extract from meta description or first headline + subheadline
  const metaDesc = allHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const valueProposition = metaDesc?.[1] || (primaryHeadline && subheadline ? `${primaryHeadline}. ${subheadline}` : primaryHeadline);

  // Clarity score
  let clarity = 0;
  if (primaryHeadline && primaryHeadline.length > 10) clarity += 2.5;
  if (subheadline) clarity += 1.5;
  if (targetAudience) clarity += 2;
  if (differentiators.length > 0) clarity += Math.min(differentiators.length, 2);
  if (problems.length > 0) clarity += 1;
  if (solutions.length > 0) clarity += 1;

  // Differentiation score
  let diff = 0;
  diff += Math.min(differentiators.length * 1.5, 5);
  if (/the\s+only|el\s+único/i.test(allHtml)) diff += 2;
  if (/\d+x/i.test(primaryHeadline || "")) diff += 2;
  if (targetAudience) diff += 1;

  // Messaging consistency: do headlines and CTAs align?
  let consistency = 5; // baseline
  if (headlines.length > 1) consistency += 1;
  if (ctaCopy.length > 0) consistency += 1;
  if (problems.length > 0 && solutions.length > 0) consistency += 2;
  if (positioningType === "clear") consistency += 1;

  return {
    headlines: allHeadlines.slice(0, 20),
    primaryHeadline,
    subheadline,
    valueProposition: valueProposition || null,
    targetAudience,
    differentiators,
    problemStatements: problems,
    solutionStatements: solutions,
    ctaCopy,
    positioningType,
    clarityScore: Math.min(10, Math.round(clarity * 10) / 10),
    differentiationScore: Math.min(10, Math.round(diff * 10) / 10),
    messagingConsistency: Math.min(10, Math.round(consistency * 10) / 10),
  };
}
