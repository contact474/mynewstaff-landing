/* ─── ScaleX SaaS Tier System ───────────────────────────────────────── */

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
  | "white_label"
  | "team_access"
  | "api_access";

export const FEATURE_TIERS: Record<Feature, Tier> = {
  full_results: "starter",
  save_scans: "starter",
  basic_playbooks: "starter",
  offer_builder: "starter",
  marketing_plays: "starter",
  value_stack: "growth",
  funnel_blueprint: "growth",
  ad_copy: "growth",
  email_sequence: "growth",
  positioning_workshop: "growth",
  white_label: "scale",
  team_access: "scale",
  api_access: "scale",
};

export const SCAN_LIMITS: Record<Tier, number> = {
  free: 1,
  starter: 10,
  growth: 50,
  scale: -1, // unlimited
};

export const PLAYBOOK_LIMITS: Record<Tier, number> = {
  free: 0,
  starter: 3,
  growth: -1,
  scale: -1,
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

export const TIER_LABELS: Record<Tier, string> = {
  free: "Free",
  starter: "Starter",
  growth: "Growth",
  scale: "Scale",
};

export const TIER_PRICES: Record<Tier, { monthly: number; annual: number }> = {
  free: { monthly: 0, annual: 0 },
  starter: { monthly: 19, annual: 190 },
  growth: { monthly: 49, annual: 490 },
  scale: { monthly: 149, annual: 1490 },
};

export const TIER_COLORS: Record<Tier, string> = {
  free: "text-zinc-400",
  starter: "text-blue-400",
  growth: "text-emerald-400",
  scale: "text-amber-400",
};
