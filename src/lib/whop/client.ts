import Whop from "@whop/sdk";

// Lazy-initialized Whop client (avoids build-time env var errors)
let _whop: Whop | null = null;
export function getWhop() {
  if (!_whop) _whop = new Whop({ apiKey: process.env.WHOP_API_KEY! });
  return _whop;
}

// Plan IDs — set these in Whop dashboard, store in env vars
export const WHOP_PLANS = {
  starter_monthly: process.env.WHOP_PLAN_STARTER_MONTHLY || "",
  starter_annual: process.env.WHOP_PLAN_STARTER_ANNUAL || "",
  growth_monthly: process.env.WHOP_PLAN_GROWTH_MONTHLY || "",
  growth_annual: process.env.WHOP_PLAN_GROWTH_ANNUAL || "",
  scale_monthly: process.env.WHOP_PLAN_SCALE_MONTHLY || "",
  scale_annual: process.env.WHOP_PLAN_SCALE_ANNUAL || "",
} as const;

// Access Pass IDs — one per tier, used for access verification
export const WHOP_ACCESS_PASSES = {
  starter: process.env.WHOP_ACCESS_PASS_STARTER || "",
  growth: process.env.WHOP_ACCESS_PASS_GROWTH || "",
  scale: process.env.WHOP_ACCESS_PASS_SCALE || "",
} as const;
