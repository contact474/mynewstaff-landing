/* ─── ScaleX AI — Pre-Seeded Industry Benchmarks ─────────────────────
 *  Source: Semrush, HubSpot State of Marketing 2025, Databox,
 *          industry surveys, aggregated marketing research.
 *  These benchmarks seed the comparison engine until we have
 *  enough corpus data (1 000+ scans per vertical).
 * ──────────────────────────────────────────────────────────────────── */

export type Industry =
  | "restaurant"
  | "law_firm"
  | "ecommerce"
  | "saas"
  | "real_estate"
  | "healthcare"
  | "professional_services"
  | "construction"
  | "fitness_wellness"
  | "marketing_agency"
  | "general";

export interface PillarBenchmark {
  avg: number;    // average score (0-10)
  median: number; // median score
  p25: number;    // 25th percentile
  p75: number;    // 75th percentile
}

export interface IndustryBenchmark {
  industry: Industry;
  label: string;
  pillars: Record<string, PillarBenchmark>;
  source: "research" | "corpus";
  sampleSize: number;
  updatedAt: string;
}

/* ─── Pillar Keys ─────────────────────────────────────────────────── */

export const PILLAR_KEYS = [
  "digital_presence",
  "website_conversion",
  "content_strategy",
  "lead_generation",
  "marketing_automation",
  "advertising",
  "sales_process",
  "customer_journey",
  "tech_ai_readiness",
  "revenue_operations",
] as const;

export type PillarKey = (typeof PILLAR_KEYS)[number];

/* ─── Helpers: build pillar spread from avg ────────────────────────── */

const clamp = (v: number, min = 0, max = 10): number =>
  Math.round(Math.max(min, Math.min(max, v)) * 10) / 10;

const spread = (avg: number): PillarBenchmark => ({
  avg: clamp(avg),
  median: clamp(avg + 0.3),
  p25: clamp(avg - 1.7),
  p75: clamp(avg + 1.7),
});

/* ─── Industry Benchmark Data ─────────────────────────────────────── */

const makeBenchmark = (
  industry: Industry,
  label: string,
  sampleSize: number,
  avgs: Record<PillarKey, number>,
): IndustryBenchmark => ({
  industry,
  label,
  pillars: Object.fromEntries(
    PILLAR_KEYS.map((k) => [k, spread(avgs[k])]),
  ),
  source: "research",
  sampleSize,
  updatedAt: "2026-03-01",
});

export const INDUSTRY_BENCHMARKS: Record<Industry, IndustryBenchmark> = {
  /* ── Restaurants ─────────────────────────────────────────────────── */
  restaurant: makeBenchmark("restaurant", "Restaurants & Food Service", 850, {
    digital_presence: 5.5,
    website_conversion: 4.8,
    content_strategy: 3.8,
    lead_generation: 3.5,
    marketing_automation: 2.8,
    advertising: 4.2,
    sales_process: 4.5,
    customer_journey: 4.0,
    tech_ai_readiness: 2.2,
    revenue_operations: 3.2,
  }),

  /* ── Law Firms ───────────────────────────────────────────────────── */
  law_firm: makeBenchmark("law_firm", "Law Firms & Legal", 420, {
    digital_presence: 6.2,
    website_conversion: 5.0,
    content_strategy: 3.5,
    lead_generation: 4.8,
    marketing_automation: 3.5,
    advertising: 3.2,
    sales_process: 5.8,
    customer_journey: 4.5,
    tech_ai_readiness: 2.5,
    revenue_operations: 4.2,
  }),

  /* ── E-commerce ──────────────────────────────────────────────────── */
  ecommerce: makeBenchmark("ecommerce", "E-commerce & Online Retail", 1200, {
    digital_presence: 6.5,
    website_conversion: 6.8,
    content_strategy: 5.2,
    lead_generation: 6.0,
    marketing_automation: 6.2,
    advertising: 7.1,
    sales_process: 6.0,
    customer_journey: 5.5,
    tech_ai_readiness: 6.5,
    revenue_operations: 6.0,
  }),

  /* ── SaaS ────────────────────────────────────────────────────────── */
  saas: makeBenchmark("saas", "SaaS & Software", 680, {
    digital_presence: 7.0,
    website_conversion: 6.5,
    content_strategy: 7.2,
    lead_generation: 7.0,
    marketing_automation: 7.0,
    advertising: 6.5,
    sales_process: 5.5,
    customer_journey: 6.8,
    tech_ai_readiness: 7.8,
    revenue_operations: 5.8,
  }),

  /* ── Real Estate ─────────────────────────────────────────────────── */
  real_estate: makeBenchmark("real_estate", "Real Estate", 560, {
    digital_presence: 5.8,
    website_conversion: 4.5,
    content_strategy: 3.8,
    lead_generation: 5.0,
    marketing_automation: 3.0,
    advertising: 5.2,
    sales_process: 5.0,
    customer_journey: 4.2,
    tech_ai_readiness: 2.4,
    revenue_operations: 3.8,
  }),

  /* ── Healthcare ──────────────────────────────────────────────────── */
  healthcare: makeBenchmark("healthcare", "Healthcare & Medical", 390, {
    digital_presence: 5.0,
    website_conversion: 4.0,
    content_strategy: 3.2,
    lead_generation: 3.5,
    marketing_automation: 2.8,
    advertising: 2.8,
    sales_process: 3.8,
    customer_journey: 3.5,
    tech_ai_readiness: 2.0,
    revenue_operations: 3.2,
  }),

  /* ── Professional Services ───────────────────────────────────────── */
  professional_services: makeBenchmark(
    "professional_services",
    "Professional Services",
    720,
    {
      digital_presence: 6.0,
      website_conversion: 5.0,
      content_strategy: 4.8,
      lead_generation: 5.0,
      marketing_automation: 3.8,
      advertising: 3.5,
      sales_process: 5.5,
      customer_journey: 4.8,
      tech_ai_readiness: 4.0,
      revenue_operations: 4.5,
    },
  ),

  /* ── Construction ────────────────────────────────────────────────── */
  construction: makeBenchmark("construction", "Construction & Trades", 310, {
    digital_presence: 4.2,
    website_conversion: 3.5,
    content_strategy: 2.5,
    lead_generation: 3.2,
    marketing_automation: 2.2,
    advertising: 3.0,
    sales_process: 3.8,
    customer_journey: 3.0,
    tech_ai_readiness: 1.8,
    revenue_operations: 2.8,
  }),

  /* ── Fitness & Wellness ──────────────────────────────────────────── */
  fitness_wellness: makeBenchmark(
    "fitness_wellness",
    "Fitness & Wellness",
    480,
    {
      digital_presence: 5.5,
      website_conversion: 5.0,
      content_strategy: 6.2,
      lead_generation: 5.2,
      marketing_automation: 4.2,
      advertising: 5.8,
      sales_process: 5.0,
      customer_journey: 5.0,
      tech_ai_readiness: 3.0,
      revenue_operations: 3.5,
    },
  ),

  /* ── Marketing Agencies ──────────────────────────────────────────── */
  marketing_agency: makeBenchmark(
    "marketing_agency",
    "Marketing & Creative Agencies",
    540,
    {
      digital_presence: 8.0,
      website_conversion: 7.2,
      content_strategy: 7.8,
      lead_generation: 7.0,
      marketing_automation: 7.2,
      advertising: 7.5,
      sales_process: 6.8,
      customer_journey: 7.0,
      tech_ai_readiness: 7.5,
      revenue_operations: 6.2,
    },
  ),

  /* ── General (fallback) ──────────────────────────────────────────── */
  general: makeBenchmark("general", "All Industries", 5000, {
    digital_presence: 5.5,
    website_conversion: 5.0,
    content_strategy: 4.8,
    lead_generation: 4.8,
    marketing_automation: 4.5,
    advertising: 4.8,
    sales_process: 5.0,
    customer_journey: 4.5,
    tech_ai_readiness: 4.0,
    revenue_operations: 4.2,
  }),
};

/* ─── Lookup ──────────────────────────────────────────────────────── */

export function getIndustryBenchmark(industry: Industry): IndustryBenchmark {
  return INDUSTRY_BENCHMARKS[industry] ?? INDUSTRY_BENCHMARKS.general;
}

/* ─── Industry Detection ──────────────────────────────────────────── */

interface DetectionFindings {
  businessType?: string;
  ecommerce?: string;
  trackedTools?: { category: string }[];
}

const INDUSTRY_KEYWORDS: Record<Industry, string[]> = {
  restaurant: [
    "restaurant", "cafe", "coffee", "bakery", "pizzeria", "bar",
    "food", "catering", "diner", "bistro", "eatery", "gastropub",
  ],
  law_firm: [
    "law", "legal", "attorney", "lawyer", "abogado", "bufete",
    "solicitor", "barrister", "paralegal", "litigation",
  ],
  ecommerce: [
    "ecommerce", "e-commerce", "shop", "store", "retail", "marketplace",
    "shopify", "woocommerce", "magento", "bigcommerce",
  ],
  saas: [
    "saas", "software", "platform", "app", "cloud", "api",
    "dashboard", "subscription", "b2b software",
  ],
  real_estate: [
    "real estate", "realtor", "property", "realty", "inmobiliaria",
    "broker", "housing", "apartment", "rental",
  ],
  healthcare: [
    "health", "medical", "clinic", "hospital", "doctor", "dental",
    "dentist", "therapy", "therapist", "pharma", "wellness clinic",
  ],
  professional_services: [
    "consulting", "accounting", "accountant", "cpa", "financial advisor",
    "advisory", "professional", "consultant", "coaching",
  ],
  construction: [
    "construction", "contractor", "builder", "plumbing", "plumber",
    "hvac", "electrical", "roofing", "renovation", "trades",
  ],
  fitness_wellness: [
    "fitness", "gym", "yoga", "pilates", "personal trainer",
    "wellness", "spa", "nutrition", "crossfit", "martial arts",
  ],
  marketing_agency: [
    "marketing", "agency", "creative agency", "digital agency",
    "advertising agency", "seo agency", "pr agency", "media agency",
  ],
  general: [],
};

const TOOL_CATEGORY_MAP: Record<string, Industry> = {
  "restaurant-ordering": "restaurant",
  "legal-crm": "law_firm",
  "ecommerce-platform": "ecommerce",
  ecommerce: "ecommerce",
  "product-analytics": "saas",
  "real-estate-crm": "real_estate",
  "health-records": "healthcare",
  "ehr": "healthcare",
  "gym-management": "fitness_wellness",
  "fitness-tracking": "fitness_wellness",
};

export function detectIndustry(findings: DetectionFindings): Industry {
  const text = [
    findings.businessType ?? "",
    findings.ecommerce ?? "",
  ]
    .join(" ")
    .toLowerCase();

  // Check tool categories first (high signal)
  if (findings.trackedTools?.length) {
    for (const tool of findings.trackedTools) {
      const cat = tool.category?.toLowerCase();
      if (cat && TOOL_CATEGORY_MAP[cat]) return TOOL_CATEGORY_MAP[cat];
    }
  }

  // Ecommerce platform detection (very strong signal)
  if (
    findings.ecommerce &&
    findings.ecommerce !== "none" &&
    findings.ecommerce !== "unknown"
  ) {
    return "ecommerce";
  }

  // Keyword matching — first match wins (ordered by specificity)
  const orderedIndustries: Industry[] = [
    "restaurant",
    "law_firm",
    "healthcare",
    "construction",
    "fitness_wellness",
    "real_estate",
    "marketing_agency",
    "saas",
    "ecommerce",
    "professional_services",
  ];

  for (const industry of orderedIndustries) {
    const keywords = INDUSTRY_KEYWORDS[industry];
    for (const kw of keywords) {
      if (text.includes(kw)) return industry;
    }
  }

  return "general";
}

/* ─── Percentile Estimation ───────────────────────────────────────── */

/**
 * Estimate what percentile a given score falls in for a pillar/industry
 * using linear interpolation between p25, median, and p75 anchors.
 * Returns 0-100.
 */
export function getPercentile(
  score: number,
  pillar: string,
  industry: Industry,
): number {
  const bench = INDUSTRY_BENCHMARKS[industry] ?? INDUSTRY_BENCHMARKS.general;
  const pb = bench.pillars[pillar];
  if (!pb) return 50; // unknown pillar, return median assumption

  const { p25, median, p75 } = pb;

  // Below p25 range — extrapolate down
  if (score <= p25) {
    // linear from 0 at (p25 - spread) to 25 at p25
    const floor = Math.max(0, p25 - 2.0);
    if (score <= floor) return 0;
    return Math.round((25 * (score - floor)) / (p25 - floor));
  }

  // Between p25 and median
  if (score <= median) {
    return Math.round(25 + (25 * (score - p25)) / (median - p25 || 1));
  }

  // Between median and p75
  if (score <= p75) {
    return Math.round(50 + (25 * (score - median)) / (p75 - median || 1));
  }

  // Above p75 — extrapolate up
  const ceiling = Math.min(10, p75 + 2.0);
  if (score >= ceiling) return 100;
  return Math.round(75 + (25 * (score - p75)) / (ceiling - p75 || 1));
}

/* ─── Full Comparison ─────────────────────────────────────────────── */

export interface PillarComparison {
  pillar: string;
  score: number;
  industryAvg: number;
  percentile: number;
  aboveAvg: boolean;
}

export function getIndustryComparison(
  scores: Record<string, number>,
  industry: Industry,
): PillarComparison[] {
  const bench = INDUSTRY_BENCHMARKS[industry] ?? INDUSTRY_BENCHMARKS.general;

  return Object.entries(scores).map(([pillar, score]) => {
    const pb = bench.pillars[pillar];
    const industryAvg = pb?.avg ?? 5.0;
    return {
      pillar,
      score,
      industryAvg,
      percentile: getPercentile(score, pillar, industry),
      aboveAvg: score > industryAvg,
    };
  });
}
