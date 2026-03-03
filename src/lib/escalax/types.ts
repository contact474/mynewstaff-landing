/* ─── EscalaX Deep Intelligence v2 — Shared Types ──────────────────── */

export interface TrackedTool { tool: string; id: string | null; category: string }
export interface SocialProfile { platform: string; url: string }
export interface SecurityHeader { header: string; present: boolean; value: string | null }

/* ─── Crawled Page ─────────────────────────────────────────────────── */

export interface CrawledPage {
  url: string;
  html: string;
  status: number;
  type: "home" | "pricing" | "about" | "contact" | "blog" | "landing" | "other";
}

/* ─── Funnel Analysis ──────────────────────────────────────────────── */

export interface FunnelStage {
  stage: "awareness" | "interest" | "consideration" | "decision" | "retention";
  label: string;
  detected: boolean;
  signals: string[];
  score: number; // 0-10
}

export interface FunnelAnalysis {
  stages: FunnelStage[];
  completeness: number; // 0-100
  gaps: string[];
  funnelType: "none" | "basic" | "intermediate" | "advanced" | "enterprise";
  detectedFunnelBuilder: string | null;
  leadMagnets: string[];
  hasCheckout: boolean;
  hasThankYouPage: boolean;
  hasUpsell: boolean;
  hasEmailSequence: boolean;
  internalLinks: string[];
}

/* ─── Offer Analysis ───────────────────────────────────────────────── */

export interface PricingTier {
  name: string;
  price: string | null;
  currency: string | null;
  period: string | null;
  features: string[];
  isFeatured: boolean;
}

export interface OfferAnalysis {
  hasPricingPage: boolean;
  pricingUrl: string | null;
  tiers: PricingTier[];
  hasFreeOption: boolean;
  hasFreeTrial: boolean;
  hasMoneyBackGuarantee: boolean;
  guaranteeText: string | null;
  hasAnnualDiscount: boolean;
  urgencyTactics: string[];
  scarcityTactics: string[];
  valueStackElements: string[];
  socialProofOnPricing: string[];
  offerClarity: number; // 0-10
  offerStrength: number; // 0-10
}

/* ─── Positioning Analysis ─────────────────────────────────────────── */

export interface PositioningAnalysis {
  headlines: string[];
  primaryHeadline: string | null;
  subheadline: string | null;
  valueProposition: string | null;
  targetAudience: string | null;
  differentiators: string[];
  problemStatements: string[];
  solutionStatements: string[];
  ctaCopy: string[];
  positioningType: "clear" | "vague" | "generic" | "missing";
  clarityScore: number; // 0-10
  differentiationScore: number; // 0-10
  messagingConsistency: number; // 0-10
}

/* ─── Ad Intelligence ──────────────────────────────────────────────── */

export interface AdIntelligence {
  platforms: AdPlatformIntel[];
  maturityLevel: "none" | "basic" | "intermediate" | "advanced" | "enterprise";
  estimatedMonthlySpend: string | null;
  trackingSophistication: number; // 0-10
  hasRetargeting: boolean;
  hasConversionTracking: boolean;
  hasLandingPages: boolean;
  landingPageIndicators: string[];
  adRelatedVerifications: string[];
  pixelHealth: string; // "none" | "partial" | "healthy" | "advanced"
}

export interface AdPlatformIntel {
  platform: string;
  pixelDetected: boolean;
  pixelId: string | null;
  conversionEvents: string[];
  maturity: "not_detected" | "pixel_only" | "tracking_events" | "full_funnel";
}

/* ─── Recommendations ──────────────────────────────────────────────── */

export interface Recommendation {
  id: string;
  category: string;
  priority: "critical" | "high" | "medium" | "low";
  title: { en: string; es: string };
  description: { en: string; es: string };
  impact: string;
  effort: "easy" | "medium" | "hard";
  pillarAffected: string;
}

/* ─── Complete Response ────────────────────────────────────────────── */

export interface EscalaXResponse {
  scores: Record<string, number>;
  findings: Record<string, unknown>;
  funnel: FunnelAnalysis;
  offer: OfferAnalysis;
  positioning: PositioningAnalysis;
  adIntel: AdIntelligence;
  recommendations: Recommendation[];
  meta: {
    url: string;
    status: number;
    loadTime: number;
    domain: string;
    locale: "en" | "es";
    pagesCrawled: number;
    version: "2.0";
  };
}
