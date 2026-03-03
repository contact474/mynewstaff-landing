"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuiz } from "./QuizModal";

/* ─── Feature check icon ──────────────────────────────────────────── */
const Check = () => (
  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const Dash = () => <span className="w-4 h-4 flex items-center justify-center text-zinc-700 flex-shrink-0">—</span>;

/* ─── Tier data ───────────────────────────────────────────────────── */

const tiers = [
  {
    name: "ScaleX",
    tagline: "Free Forever",
    price: "$0",
    period: "",
    setup: "",
    highlight: false,
    cta: "Run Free Diagnostic",
    ctaRoute: "/scalex",
    replaces: "DIY audits & guesswork",
    features: [
      { text: "AI website & DNS deep-scan", included: true },
      { text: "10-pillar business score", included: true },
      { text: "Funnel & offer analysis", included: true },
      { text: "Ad intelligence report", included: true },
      { text: "Positioning audit", included: true },
      { text: "Improvement roadmap", included: true },
      { text: "AI content engine", included: false },
      { text: "Lead scraping pipeline", included: false },
      { text: "Automated outreach", included: false },
      { text: "CRM & conversation AI", included: false },
      { text: "Ad management", included: false },
      { text: "Dedicated strategist", included: false },
    ],
  },
  {
    name: "Growth Engine",
    tagline: "Most Popular",
    price: "$8,500",
    period: "/mo",
    setup: "",
    highlight: true,
    cta: "Book Strategy Call",
    ctaRoute: null, // opens quiz
    replaces: "Agency retainer ($5-15K/mo) that delivers reports, not revenue",
    features: [
      { text: "Everything in ScaleX +", included: true },
      { text: "100+ AI content pieces/mo", included: true },
      { text: "3-platform distribution", included: true },
      { text: "10,000 targeted leads/mo scraped", included: true },
      { text: "Automated outreach sequences", included: true },
      { text: "CRM setup + conversation AI", included: true },
      { text: "Ad multiplier (setup + mgmt)", included: true },
      { text: "Weekly performance dashboard", included: true },
      { text: "Dedicated growth strategist", included: true },
      { text: "7-14 day deployment", included: true },
      { text: "Custom AI models", included: false },
      { text: "White-label option", included: false },
    ],
  },
  {
    name: "Domination",
    tagline: "Franchise Scale",
    price: "$25K+",
    period: "/mo",
    setup: "",
    highlight: false,
    cta: "Talk to Founders",
    ctaRoute: null, // opens quiz
    replaces: "In-house team ($300K+/yr) with management overhead",
    features: [
      { text: "Everything in Growth Engine +", included: true },
      { text: "Unlimited content volume", included: true },
      { text: "All platforms covered", included: true },
      { text: "Unlimited lead volume", included: true },
      { text: "Custom AI models for your brand", included: true },
      { text: "White-label option available", included: true },
      { text: "Multi-location support", included: true },
      { text: "Priority support + dedicated team", included: true },
      { text: "Franchise-ready systems", included: true },
      { text: "Custom integrations", included: true },
      { text: "Quarterly strategy retreats", included: true },
      { text: "Revenue share options", included: true },
    ],
  },
];

/* ─── Component ───────────────────────────────────────────────────── */

export function PricingTable() {
  const { openQuiz } = useQuiz();

  return (
    <div className="w-full">
      {/* Anchor comparison */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm md:text-base text-zinc-500 font-sans leading-relaxed">
          The average business spends <span className="text-white font-bold">$120K–$500K/year</span> on marketing teams, agencies, and freelancers that deliver reports — not revenue.
          <br className="hidden md:block" />
          <span className="text-zinc-400"> We deploy autonomous AI systems that run 24/7 for a fraction of the cost.</span>
        </p>
      </div>

      {/* Pricing grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className={`relative flex flex-col p-8 md:p-10 ${tier.highlight ? "bg-white/[0.04] border-x border-white/10 lg:border-x-0" : ""} ${i < 2 ? "lg:border-r border-white/10" : ""} ${i > 0 ? "border-t lg:border-t-0 border-white/10" : ""}`}
          >
            {/* Most Popular badge */}
            {tier.highlight && (
              <div className="absolute -top-px left-1/2 -translate-x-1/2 px-6 py-1.5 bg-white text-black text-[9px] tracking-[0.3em] uppercase font-bold">
                {tier.tagline}
              </div>
            )}

            {/* Tier header */}
            <div className="mb-8 pt-4">
              <span className={`block text-[10px] tracking-[0.4em] uppercase mb-3 ${tier.highlight ? "text-white" : "text-zinc-500"}`}>
                {tier.highlight ? tier.name : tier.tagline}
              </span>
              <h3 className="font-wide text-3xl md:text-4xl uppercase font-bold">
                {tier.highlight ? "" : ""}{tier.name === "ScaleX" ? "" : ""}{tier.price}
                {tier.period && <span className="text-base text-zinc-500 font-normal">{tier.period}</span>}
              </h3>
              {tier.name !== "ScaleX" && !tier.highlight && (
                <span className="block text-[10px] tracking-[0.2em] uppercase text-zinc-600 mt-2">
                  {tier.name}
                </span>
              )}
              {tier.setup && (
                <span className="block text-[10px] tracking-[0.2em] uppercase text-zinc-600 mt-2">{tier.setup}</span>
              )}
            </div>

            {/* Replaces anchor */}
            <div className="mb-8 py-3 border-y border-white/5">
              <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-600">Replaces</span>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{tier.replaces}</p>
            </div>

            {/* Feature list */}
            <div className="flex-1 mb-8">
              <ul className="space-y-3">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {f.included ? <Check /> : <Dash />}
                    <span className={`text-sm font-sans ${f.included ? "text-zinc-300" : "text-zinc-700"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA button */}
            {tier.ctaRoute ? (
              <Link
                href={tier.ctaRoute}
                className={`block w-full py-4 text-center text-[10px] tracking-[0.25em] uppercase font-bold transition-all ${
                  tier.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.02]"
                }`}
              >
                {tier.cta}
              </Link>
            ) : (
              <button
                onClick={() => openQuiz(`pricing-${tier.name.toLowerCase().replace(/\s/g, "-")}`)}
                className={`w-full py-4 text-center text-[10px] tracking-[0.25em] uppercase font-bold transition-all cursor-pointer ${
                  tier.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.02]"
                }`}
              >
                {tier.cta}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Guarantee banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 py-8 border border-white/10 text-center"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">Zero Risk</p>
        <p className="text-lg md:text-xl font-wide uppercase font-bold">
          Month-to-Month. No Contracts. <span className="shimmer-text">Cancel Anytime.</span>
        </p>
        <p className="text-xs text-zinc-500 font-sans mt-3 max-w-md mx-auto">
          We operate without lock-ins because the ROI makes the decision obvious.
          If you don&apos;t see results within 30 days, we&apos;ll work for free until you do.
        </p>
      </motion.div>

      {/* Social proof stats */}
      <div className="grid grid-cols-3 gap-0 mt-0 border-x border-b border-white/10">
        {[
          { label: "Deployment", value: "7-14 Days" },
          { label: "Monthly Output", value: "100+ Assets" },
          { label: "Cost vs In-House", value: "90% Less" },
        ].map((stat, i) => (
          <div key={i} className={`py-6 text-center ${i < 2 ? "border-r border-white/10" : ""}`}>
            <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600">{stat.label}</span>
            <span className="block text-sm md:text-base font-wide font-bold mt-1">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
