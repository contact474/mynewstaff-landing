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
    name: "ScaleX AI",
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
    ctaRoute: null,
    replaces: "Agency retainer ($5–15K/mo) that delivers reports, not revenue",
    features: [
      { text: "Everything in ScaleX AI +", included: true },
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
    ctaRoute: null,
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
      {/* Scarcity banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 py-4 px-6 border border-white/10 bg-white/[0.03] text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white font-bold">3 Spots Remaining — Applications Close April 30</span>
        </div>
        <p className="text-[10px] tracking-[0.15em] text-zinc-500 font-sans">We onboard a maximum of 5 clients per quarter to maintain execution quality.</p>
      </motion.div>

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
                {tier.price}
                {tier.period && <span className="text-base text-zinc-500 font-normal">{tier.period}</span>}
              </h3>
              {tier.name !== "ScaleX AI" && !tier.highlight && (
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

      {/* 90-Day Guarantee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 py-10 border border-white/10 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
        <div className="relative z-10">
          {/* Shield icon */}
          <div className="mx-auto w-12 h-12 mb-4 border border-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-3">90-Day Pipeline Guarantee</p>
          <p className="text-lg md:text-2xl font-wide uppercase font-bold max-w-2xl mx-auto leading-tight">
            100 Qualified Leads <br className="hidden md:block" /> Or We Work <span className="shimmer-text">Free.</span>
          </p>
          <p className="text-xs text-zinc-500 font-sans mt-4 max-w-lg mx-auto leading-relaxed px-4">
            If we don&apos;t generate at least 100 qualified leads in your pipeline within 90 days, we continue working at zero cost until we hit that number. No contracts. No risk. No excuses.
          </p>
        </div>
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
