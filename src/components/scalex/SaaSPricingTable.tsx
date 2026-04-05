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
    tagline: "See what's broken",
    monthlyPrice: 0,
    annualPrice: 0,
    highlight: false,
    features: [
      { text: "1 scan/month", included: true },
      { text: "Basic 10-pillar score", included: true },
      { text: "10 AI advisor messages", included: true },
      { text: "Top 3 issues visible", included: true },
    ],
  },
  {
    id: "starter",
    name: "Growth Guide",
    tagline: "AI guides you to fix it",
    monthlyPrice: 29,
    annualPrice: 290,
    highlight: false,
    features: [
      { text: "10 scans/month", included: true },
      { text: "Full 10-pillar results", included: true },
      { text: "Unlimited AI advisor", included: true },
      { text: "Step-by-step fix guidance", included: true },
      { text: "90-day action plan", included: true },
      { text: "Monthly re-scan + progress", included: true },
      { text: "Save scan history", included: true },
      { text: "5 playbooks/month", included: true },
      { text: "AI Offer Builder", included: true },
      { text: "1 competitor comparison", included: true },
    ],
  },
  {
    id: "growth",
    name: "Growth Accelerator",
    tagline: "AI builds it for you",
    monthlyPrice: 99,
    annualPrice: 990,
    highlight: true,
    features: [
      { text: "Unlimited scans", included: true },
      { text: "Everything in Growth Guide", included: true },
      { text: "AI generates ad copy", included: true },
      { text: "AI builds email sequences", included: true },
      { text: "AI creates funnel blueprints", included: true },
      { text: "Positioning workshop", included: true },
      { text: "Value Stack Creator", included: true },
      { text: "3 competitor comparisons + monitoring", included: true },
      { text: "3 team members", included: true },
    ],
  },
  {
    id: "scale",
    name: "Agency Command",
    tagline: "Full agency toolkit",
    monthlyPrice: 499,
    annualPrice: 4990,
    highlight: false,
    features: [
      { text: "Everything in Accelerator", included: true },
      { text: "White-label reports", included: true },
      { text: "AI generates proposals", included: true },
      { text: "Bulk scanning (CSV upload)", included: true },
      { text: "Client management dashboard", included: true },
      { text: "10 team members", included: true },
      { text: "API access", included: true },
      { text: "Custom domain support", included: true },
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
        href="/scalex"
        className="block w-full py-4 text-center text-[10px] tracking-[0.25em] uppercase font-bold transition-all border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.02]"
      >
        Start Free Scan
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
      {loading ? "Loading..." : "Start 7-Day Free Trial"}
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

              {/* DFY callout for Agency Command */}
              {tier.id === "scale" && (
                <div className="mt-4 border border-white/10 p-4 text-center">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 mb-1">
                    Need it done for you?
                  </p>
                  <a
                    href="/book"
                    className="text-[10px] tracking-[0.2em] uppercase text-white hover:text-zinc-300 transition-colors font-bold"
                  >
                    Book a strategy call — from $997
                  </a>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
