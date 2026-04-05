/* ─── ScaleX AI — Companion Tier System ────────────────────────────── */

export type Tier = "free" | "starter" | "growth" | "scale";

export const TIER_HIERARCHY: Record<Tier, number> = {
  free: 0,
  starter: 1,
  growth: 2,
  scale: 3,
};

export type Feature =
  | "full_results"
  | "save_scans"
  | "basic_playbooks"
  | "offer_builder"
  | "value_stack"
  | "marketing_plays"
  | "funnel_blueprint"
  | "ad_copy"
  | "email_sequence"
  | "positioning_workshop"
  | "ai_advisor_full"
  | "ai_builds_deliverables"
  | "competitor_monitoring"
  | "monthly_rescan"
  | "progress_tracking"
  | "white_label"
  | "team_access"
  | "api_access"
  | "bulk_scanning"
  | "client_management"
  | "proposal_generator";

export const FEATURE_TIERS: Record<Feature, Tier> = {
  full_results: "starter",
  save_scans: "starter",
  basic_playbooks: "starter",
  offer_builder: "starter",
  marketing_plays: "starter",
  ai_advisor_full: "starter",
  monthly_rescan: "starter",
  progress_tracking: "starter",
  value_stack: "growth",
  funnel_blueprint: "growth",
  ad_copy: "growth",
  email_sequence: "growth",
  positioning_workshop: "growth",
  ai_builds_deliverables: "growth",
  competitor_monitoring: "growth",
  white_label: "scale",
  team_access: "scale",
  api_access: "scale",
  bulk_scanning: "scale",
  client_management: "scale",
  proposal_generator: "scale",
};

export const SCAN_LIMITS: Record<Tier, number> = {
  free: 1,
  starter: 10,
  growth: -1, // unlimited
  scale: -1,
};

export const PLAYBOOK_LIMITS: Record<Tier, number> = {
  free: 0,
  starter: 5,
  growth: -1,
  scale: -1,
};

export const ADVISOR_MESSAGE_LIMITS: Record<Tier, number> = {
  free: 10,
  starter: -1,
  growth: -1,
  scale: -1,
};

export const COMPETITOR_LIMITS: Record<Tier, number> = {
  free: 0,
  starter: 1,
  growth: 3,
  scale: -1, // unlimited
};

export function hasAccess(userTier: Tier, requiredFeature: Feature): boolean {
  return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[FEATURE_TIERS[requiredFeature]];
}

export function canScan(tier: Tier, usedThisMonth: number): boolean {
  const limit = SCAN_LIMITS[tier];
  return limit === -1 || usedThisMonth < limit;
}

export function canGeneratePlaybook(tier: Tier, usedThisMonth: number): boolean {
  const limit = PLAYBOOK_LIMITS[tier];
  return limit === -1 || usedThisMonth < limit;
}

/* ─── Display labels ────────────────────────────────────────────── */

export const TIER_LABELS: Record<Tier, string> = {
  free: "Free",
  starter: "Growth Guide",
  growth: "Growth Accelerator",
  scale: "Agency Command",
};

export const TIER_TAGLINES: Record<Tier, string> = {
  free: "See what's broken",
  starter: "AI guides you to fix it",
  growth: "AI builds it for you",
  scale: "Full agency toolkit",
};

export const TIER_PRICES: Record<Tier, { monthly: number; annual: number }> = {
  free: { monthly: 0, annual: 0 },
  starter: { monthly: 29, annual: 290 },
  growth: { monthly: 99, annual: 990 },
  scale: { monthly: 499, annual: 4990 },
};

export const TIER_COLORS: Record<Tier, string> = {
  free: "text-zinc-400",
  starter: "text-blue-400",
  growth: "text-emerald-400",
  scale: "text-amber-400",
};

/* ─── Revenue estimates per pillar (conservative monthly) ──────── */

export const PILLAR_REVENUE_ESTIMATES: Record<string, { low: number; high: number }> = {
  digital_presence: { low: 1200, high: 3500 },
  website_conversion: { low: 2800, high: 7200 },
  content_strategy: { low: 1500, high: 4000 },
  lead_generation: { low: 4200, high: 8700 },
  marketing_automation: { low: 3100, high: 6500 },
  advertising: { low: 2500, high: 5800 },
  sales_process: { low: 3800, high: 9200 },
  customer_journey: { low: 1800, high: 4500 },
  tech_ai_readiness: { low: 900, high: 2800 },
  revenue_operations: { low: 2200, high: 5500 },
};

/**
 * Estimate monthly revenue loss based on pillar score.
 * Lower scores = higher estimated loss.
 */
export function estimateRevenueLoss(
  pillar: string,
  score: number
): { low: number; high: number } | null {
  const est = PILLAR_REVENUE_ESTIMATES[pillar];
  if (!est || score >= 8) return null; // Score 8+ = minimal loss
  // Scale loss inversely with score (0-7 range)
  const factor = Math.max(0, (8 - score) / 8);
  return {
    low: Math.round(est.low * factor),
    high: Math.round(est.high * factor),
  };
}

/**
 * Total estimated monthly revenue loss across all pillars.
 */
export function totalRevenueLoss(
  scores: Record<string, number>
): { low: number; high: number } {
  let low = 0;
  let high = 0;
  for (const [pillar, score] of Object.entries(scores)) {
    const loss = estimateRevenueLoss(pillar, score);
    if (loss) {
      low += loss.low;
      high += loss.high;
    }
  }
  return { low, high };
}
