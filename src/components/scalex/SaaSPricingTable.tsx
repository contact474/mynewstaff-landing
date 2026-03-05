"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/supabase/auth-context";
import { TIER_LABELS, type Tier } from "@/lib/tiers";

/* ─── Plan IDs from env vars ───────────────────────────────────────── */

const PLAN_IDS = {
  starter: {
    monthly: process.env.NEXT_PUBLIC_WHOP_PLAN_STARTER_MONTHLY ?? "",
    annual: process.env.NEXT_PUBLIC_WHOP_PLAN_STARTER_ANNUAL ?? "",
  },
  growth: {
    monthly: process.env.NEXT_PUBLIC_WHOP_PLAN_GROWTH_MONTHLY ?? "",
    annual: process.env.NEXT_PUBLIC_WHOP_PLAN_GROWTH_ANNUAL ?? "",
  },
  scale: {
    monthly: process.env.NEXT_PUBLIC_WHOP_PLAN_SCALE_MONTHLY ?? "",
    annual: process.env.NEXT_PUBLIC_WHOP_PLAN_SCALE_ANNUAL ?? "",
  },
};

/* ─── Icons ─────────────────────────────────────────────────────────── */

const Check = () => (
  <svg
    className="w-4 h-4 text-white flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const Dash = () => (
  <span className="w-4 h-4 flex items-center justify-center text-zinc-700 flex-shrink-0">
    —
  </span>
);

/* ─── Tier definitions ───────────────────────────────────────────────── */

interface TierDef {
  id: Tier;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlight: boolean;
  features: { text: string; included: boolean }[];
}

const TIERS: TierDef[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Try ScaleX AI",
    monthlyPrice: 0,
    annualPrice: 0,
    highlight: false,
    features: [
      { text: "1 scan/month", included: true },
      { text: "Basic 10-pillar score", included: true },
      { text: "Full results", included: false },
      { text: "Save scan history", included: false },
      { text: "Basic playbooks", included: false },
      { text: "AI Offer Builder", included: false },
      { text: "Value Stack Creator", included: false },
      { text: "Marketing Play Generator", included: false },
      { text: "Funnel Blueprints", included: false },
      { text: "Ad Copy Generator", included: false },
      { text: "Email Sequence Builder", included: false },
      { text: "Positioning Workshop", included: false },
      { text: "White-label reports", included: false },
      { text: "1 team member", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Build your baseline",
    monthlyPrice: 19,
    annualPrice: 190,
    highlight: false,
    features: [
      { text: "10 scans/month", included: true },
      { text: "Basic 10-pillar score", included: true },
      { text: "Full results", included: true },
      { text: "Save scan history", included: true },
      { text: "3 playbooks/month", included: true },
      { text: "AI Offer Builder", included: true },
      { text: "Value Stack Creator", included: false },
      { text: "Marketing Play Generator", included: true },
      { text: "Funnel Blueprints", included: false },
      { text: "Ad Copy Generator", included: false },
      { text: "Email Sequence Builder", included: false },
      { text: "Positioning Workshop", included: false },
      { text: "White-label reports", included: false },
      { text: "1 team member", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Full AI marketing suite",
    monthlyPrice: 49,
    annualPrice: 490,
    highlight: true,
    features: [
      { text: "50 scans/month", included: true },
      { text: "Basic 10-pillar score", included: true },
      { text: "Full results", included: true },
      { text: "Save scan history", included: true },
      { text: "Unlimited playbooks", included: true },
      { text: "AI Offer Builder", included: true },
      { text: "Value Stack Creator", included: true },
      { text: "Marketing Play Generator", included: true },
      { text: "Funnel Blueprints", included: true },
      { text: "Ad Copy Generator", included: true },
      { text: "Email Sequence Builder", included: true },
      { text: "Positioning Workshop", included: true },
      { text: "White-label reports", included: false },
      { text: "3 team members", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Unlimited + white-label",
    monthlyPrice: 149,
    annualPrice: 1490,
    highlight: false,
    features: [
      { text: "Unlimited scans", included: true },
      { text: "Basic 10-pillar score", included: true },
      { text: "Full results", included: true },
      { text: "Save scan history", included: true },
      { text: "Unlimited playbooks", included: true },
      { text: "AI Offer Builder", included: true },
      { text: "Value Stack Creator", included: true },
      { text: "Marketing Play Generator", included: true },
      { text: "Funnel Blueprints", included: true },
      { text: "Ad Copy Generator", included: true },
      { text: "Email Sequence Builder", included: true },
      { text: "Positioning Workshop", included: true },
      { text: "White-label reports", included: true },
      { text: "10 team members", included: true },
      { text: "API access", included: true },
    ],
  },
];

/* ─── CTA button ─────────────────────────────────────────────────────── */

interface CTAButtonProps {
  tierId: Tier;
  annual: boolean;
  highlight: boolean;
  userTier: Tier | null;
}

function CTAButton({ tierId, annual, highlight, userTier }: CTAButtonProps) {
  const [loading, setLoading] = useState(false);

  const isCurrent = userTier === tierId;

  if (tierId === "free") {
    return (
      <a
        href="/signup"
        className="block w-full py-4 text-center text-[10px] tracking-[0.25em] uppercase font-bold transition-all border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.02]"
      >
        Start Free
      </a>
    );
  }

  if (isCurrent) {
    return (
      <div className="w-full py-4 text-center text-[10px] tracking-[0.25em] uppercase font-bold border border-white/10 text-zinc-500">
        Current Plan
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    try {
      const billing = annual ? "annual" : "monthly";
      const planKey = annual ? "annual" : "monthly";
      const planId = PLAN_IDS[tierId as keyof typeof PLAN_IDS]?.[planKey];

      const res = await fetch("/api/whop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, billing }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned", data);
      }
    } catch (err) {
      console.error("Checkout failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full py-4 text-center text-[10px] tracking-[0.25em] uppercase font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        highlight
          ? "bg-white text-black hover:bg-white/90"
          : "border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.02]"
      }`}
    >
      {loading ? "Loading..." : "Get Started"}
    </button>
  );
}

/* ─── Toggle ─────────────────────────────────────────────────────────── */

interface ToggleProps {
  annual: boolean;
  onToggle: () => void;
}

function BillingToggle({ annual, onToggle }: ToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span
        className={`text-[10px] tracking-[0.25em] uppercase font-bold transition-colors ${
          !annual ? "text-white" : "text-zinc-600"
        }`}
      >
        Monthly
      </span>

      <button
        onClick={onToggle}
        className="relative w-12 h-6 border border-white/20 transition-colors cursor-pointer"
        aria-label="Toggle billing period"
      >
        <span
          className={`absolute top-0.5 bottom-0.5 w-5 bg-white transition-all duration-200 ${
            annual ? "left-[calc(100%-1.375rem)]" : "left-0.5"
          }`}
        />
      </button>

      <span
        className={`text-[10px] tracking-[0.25em] uppercase font-bold transition-colors ${
          annual ? "text-white" : "text-zinc-600"
        }`}
      >
        Annual
        <span className="ml-2 text-[8px] tracking-[0.2em] text-zinc-500">
          (Save 2 months)
        </span>
      </span>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */

interface SaaSPricingTableProps {
  annual: boolean;
  onToggle: () => void;
}

export function SaaSPricingTable({ annual, onToggle }: SaaSPricingTableProps) {
  const { subscription, user } = useAuth();
  const userTier = user ? subscription.tier : null;

  return (
    <div className="w-full">
      <BillingToggle annual={annual} onToggle={onToggle} />

      {/* Pricing grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-white/10">
        {TIERS.map((tier, i) => {
          const price = annual ? tier.annualPrice : tier.monthlyPrice;
          const isCurrent = userTier === tier.id;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col p-8 ${
                tier.highlight ? "bg-white/[0.04]" : ""
              } ${i < 3 ? "lg:border-r border-white/10" : ""} ${
                i > 0 ? "border-t lg:border-t-0 border-white/10" : ""
              }`}
            >
              {/* Most Popular badge */}
              {tier.highlight && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 px-6 py-1.5 bg-white text-black text-[9px] tracking-[0.3em] uppercase font-bold whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Current plan badge */}
              {isCurrent && (
                <div className="absolute -top-px right-4 px-4 py-1.5 bg-zinc-800 text-zinc-300 text-[9px] tracking-[0.3em] uppercase font-bold whitespace-nowrap">
                  Current Plan
                </div>
              )}

              {/* Tier header */}
              <div className="mb-6 pt-4">
                <span className="block text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-2">
                  {TIER_LABELS[tier.id]}
                </span>
                <span className="block text-[10px] tracking-[0.2em] uppercase text-zinc-600 mb-4">
                  {tier.tagline}
                </span>
                <div>
                  {tier.monthlyPrice === 0 ? (
                    <h3 className="font-wide text-3xl uppercase font-bold">
                      Free
                    </h3>
                  ) : (
                    <h3 className="font-wide text-3xl uppercase font-bold">
                      <span className={tier.highlight ? "shimmer-text" : ""}>
                        ${price}
                      </span>
                      <span className="text-sm text-zinc-500 font-normal font-sans ml-1">
                        {annual ? "/yr" : "/mo"}
                      </span>
                    </h3>
                  )}
                  {annual && tier.monthlyPrice > 0 && (
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 mt-1">
                      ${Math.round(price / 12)}/mo billed annually
                    </span>
                  )}
                </div>
              </div>

              {/* Feature list */}
              <div className="flex-1 mb-8">
                <ul className="space-y-2.5">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      {f.included ? <Check /> : <Dash />}
                      <span
                        className={`text-xs font-sans ${
                          f.included ? "text-zinc-300" : "text-zinc-700"
                        }`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <CTAButton
                tierId={tier.id}
                annual={annual}
                highlight={tier.highlight}
                userTier={userTier}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
