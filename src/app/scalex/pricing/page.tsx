"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { SaaSPricingTable } from "@/components/scalex/SaaSPricingTable";
import { useAuth } from "@/lib/supabase/auth-context";
import { TIER_LABELS } from "@/lib/tiers";

/* ─── Feature comparison matrix data ────────────────────────────────── */

const MATRIX_ROWS = [
  { label: "Scans/month",                free: "1",         starter: "10",        growth: "Unlimited",  scale: "Unlimited" },
  { label: "Full pillar results",        free: false,       starter: true,        growth: true,         scale: true },
  { label: "AI Advisor messages",        free: "10",        starter: "Unlimited", growth: "Unlimited",  scale: "Unlimited" },
  { label: "Step-by-step fix guidance",  free: false,       starter: true,        growth: true,         scale: true },
  { label: "90-day action plan",         free: false,       starter: true,        growth: true,         scale: true },
  { label: "Monthly re-scan + progress", free: false,       starter: true,        growth: true,         scale: true },
  { label: "Playbooks",                  free: false,       starter: "5/mo",      growth: "Unlimited",  scale: "Unlimited" },
  { label: "AI Offer Builder",           free: false,       starter: true,        growth: true,         scale: true },
  { label: "Competitor comparisons",     free: false,       starter: "1",         growth: "3 + monitoring", scale: "Unlimited" },
  { label: "AI Ad Copy Generator",       free: false,       starter: false,       growth: true,         scale: true },
  { label: "AI Email Sequence Builder",  free: false,       starter: false,       growth: true,         scale: true },
  { label: "AI Funnel Blueprints",       free: false,       starter: false,       growth: true,         scale: true },
  { label: "Positioning Workshop",       free: false,       starter: false,       growth: true,         scale: true },
  { label: "Value Stack Creator",        free: false,       starter: false,       growth: true,         scale: true },
  { label: "White-label reports",        free: false,       starter: false,       growth: false,        scale: true },
  { label: "AI Proposal Generator",      free: false,       starter: false,       growth: false,        scale: true },
  { label: "Bulk scanning",              free: false,       starter: false,       growth: false,        scale: true },
  { label: "Client management",          free: false,       starter: false,       growth: false,        scale: true },
  { label: "Team members",               free: "1",         starter: "1",         growth: "3",          scale: "10" },
  { label: "API access",                 free: false,       starter: false,       growth: false,        scale: true },
];

/* ─── Icons ──────────────────────────────────────────────────────────── */

const Check = () => (
  <svg
    className="w-4 h-4 text-white mx-auto flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const Dash = () => (
  <span className="block text-center text-zinc-700 leading-none">—</span>
);

/* ─── Cell renderer ───────────────────────────────────────────────────── */

function MatrixCell({ value }: { value: boolean | string }) {
  if (value === false) return <Dash />;
  if (value === true) return <Check />;
  return (
    <span className="block text-center text-[11px] font-sans text-zinc-300">
      {value}
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function ScaleXPricing() {
  const [annual, setAnnual] = useState(false);
  const { user, subscription } = useAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* Hero */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-[1100px] mx-auto text-center">
            <span className="block text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6">
              ScaleX AI — Pricing
            </span>

            {/* Current plan badge (logged-in users) */}
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-white/10 bg-white/[0.03]"
              >
                <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500">
                  Current plan
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-white">
                  {TIER_LABELS[subscription.tier]}
                </span>
              </motion.div>
            )}

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold uppercase leading-[0.9] mb-8">
              Your AI{" "}
              <span className="shimmer-text">Marketing</span>
              <br />
              Companion
            </h1>

            <p className="text-sm md:text-base text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
              ScaleX AI scans your business, scores your growth engine across 10 pillars,
              and gives you an exact AI-powered playbook to fix the leaks — in minutes,
              not months. Start free, unlock the full suite when you&apos;re ready.
            </p>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="px-4 pt-10 pb-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
            >
              {[
                { value: "3,200+", label: "Businesses scanned" },
                { value: "10", label: "Growth pillars analyzed" },
                { value: "97%", label: "Find revenue leaks" },
                { value: "< 60s", label: "Time to first insight" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="block text-lg md:text-xl font-wide font-bold text-white">{stat.value}</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="px-4 py-16">
          <div className="max-w-[1200px] mx-auto">
            <SaaSPricingTable annual={annual} onToggle={() => setAnnual((a) => !a)} />
          </div>
        </section>

        {/* DFY Bridge Offer */}
        <section className="px-4 py-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="border border-white/10 p-8 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-3">Rather have us do it?</p>
              <h3 className="text-2xl md:text-3xl font-wide font-bold uppercase mb-4">Growth Sprint — <span className="shimmer-text">$997</span></h3>
              <p className="text-sm text-zinc-400 font-sans max-w-xl mx-auto mb-6">We implement your top 3 ScaleX recommendations in 30 days. Then re-scan to prove the impact. One-time investment, measurable results.</p>
              <a href="/book?source=growth-sprint" className="inline-block px-8 py-4 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all">Book Strategy Call</a>
            </div>
          </div>
        </section>

        {/* Feature Comparison Matrix */}
        <section className="px-4 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 text-center mb-10">
                Full Feature Comparison
              </h2>

              <div className="border border-white/10 overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  {/* Header row */}
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-6 text-left text-[9px] tracking-[0.3em] uppercase text-zinc-600 font-normal w-1/3">
                        Feature
                      </th>
                      {(["Free", "Growth Guide", "Growth Accelerator", "Agency Command"] as const).map((label, i) => (
                        <th
                          key={label}
                          className={`py-4 px-4 text-center text-[9px] tracking-[0.3em] uppercase font-bold ${
                            i === 2 ? "text-white" : "text-zinc-500"
                          }`}
                        >
                          {label}
                          {i === 2 && (
                            <span className="block text-[8px] tracking-[0.2em] text-zinc-600 font-normal mt-0.5">
                              Most Popular
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {MATRIX_ROWS.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-white/5 ${
                          i % 2 === 0 ? "bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="py-3.5 px-6 text-xs font-sans text-zinc-400">
                          {row.label}
                        </td>
                        <td className="py-3.5 px-4">
                          <MatrixCell value={row.free} />
                        </td>
                        <td className="py-3.5 px-4">
                          <MatrixCell value={row.starter} />
                        </td>
                        <td className="py-3.5 px-4 bg-white/[0.02]">
                          <MatrixCell value={row.growth} />
                        </td>
                        <td className="py-3.5 px-4">
                          <MatrixCell value={row.scale} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 90-Day Guarantee */}
        <section className="px-4 pb-20">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="py-10 border border-white/10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
              <div className="relative z-10">
                {/* Shield icon */}
                <div className="mx-auto w-12 h-12 mb-4 border border-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-3">
                  Risk-Free Guarantee
                </p>
                <p className="text-lg md:text-2xl font-wide uppercase font-bold max-w-2xl mx-auto leading-tight">
                  Cancel Anytime. <br className="hidden md:block" />
                  No Lock-ins. <span className="shimmer-text">No Risk.</span>
                </p>
                <p className="text-xs text-zinc-500 font-sans mt-4 max-w-lg mx-auto leading-relaxed px-4">
                  Every paid plan comes with a 14-day money-back guarantee. If ScaleX
                  AI doesn&apos;t surface actionable insights that help you grow, we&apos;ll refund
                  every dollar — no questions asked. Cancel anytime from your dashboard.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
