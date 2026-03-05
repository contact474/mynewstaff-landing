"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/supabase/auth-context";
import {
  hasAccess,
  type Feature,
  FEATURE_TIERS,
  TIER_LABELS,
  TIER_PRICES,
} from "@/lib/tiers";

interface PaywallGateProps {
  feature: Feature;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PaywallGate({ feature, children, fallback }: PaywallGateProps) {
  const subscription = useSubscription();
  const userHasAccess = hasAccess(subscription.tier, feature);

  if (userHasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const requiredTier = FEATURE_TIERS[feature];
  const tierLabel = TIER_LABELS[requiredTier];
  const monthlyPrice = TIER_PRICES[requiredTier].monthly;

  return (
    <div className="relative">
      {/* Blurred preview of the gated content */}
      <div className="blur-sm pointer-events-none select-none opacity-50" aria-hidden="true">
        {children}
      </div>

      {/* Upgrade overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="border border-white/10 bg-black/80 p-8 max-w-sm w-full mx-4 text-center">
          {/* Tier badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500">Required</span>
            <span className="px-2 py-0.5 border border-white/10 text-[9px] tracking-[0.25em] uppercase font-bold text-white">
              {tierLabel}
            </span>
          </div>

          <h3 className="font-wide text-lg uppercase font-bold mb-2 leading-tight">
            Unlock This Feature
          </h3>

          <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-6">
            Starting at{" "}
            <span className="text-white font-bold">${monthlyPrice}/mo</span>
          </p>

          <Link
            href="/scalex/pricing"
            className="block w-full py-3.5 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
}
