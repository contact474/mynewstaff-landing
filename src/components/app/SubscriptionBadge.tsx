import { TIER_LABELS, TIER_COLORS, type Tier } from "@/lib/tiers";

interface SubscriptionBadgeProps {
  tier: Tier;
}

const TIER_BORDER_COLORS: Record<Tier, string> = {
  free: "border-zinc-600",
  starter: "border-blue-400/40",
  growth: "border-emerald-400/40",
  scale: "border-amber-400/40",
};

const TIER_BG_COLORS: Record<Tier, string> = {
  free: "bg-zinc-900",
  starter: "bg-blue-400/5",
  growth: "bg-emerald-400/5",
  scale: "bg-amber-400/5",
};

export function SubscriptionBadge({ tier }: SubscriptionBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-1 border text-[10px] tracking-[0.2em] uppercase font-sans font-medium",
        TIER_COLORS[tier],
        TIER_BORDER_COLORS[tier],
        TIER_BG_COLORS[tier],
      ].join(" ")}
    >
      {TIER_LABELS[tier]}
    </span>
  );
}
