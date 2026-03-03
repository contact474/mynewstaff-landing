"use client";

import { motion } from "framer-motion";
import { useQuiz } from "./QuizModal";

/* ─── System breakdown data ───────────────────────────────────────── */

const systems = [
  {
    number: "01",
    name: "AI Content Engine",
    description: "100+ viral-optimized content pieces generated monthly. Social posts, carousels, short-form video scripts, blog articles — all aligned to your brand voice and distributed across platforms.",
    metrics: [
      { label: "Monthly Output", value: "100+" },
      { label: "Platforms", value: "3-5" },
      { label: "Brand Voice", value: "Custom AI" },
    ],
  },
  {
    number: "02",
    name: "Lead Scraping Pipeline",
    description: "AI-powered multi-source prospecting. We scrape 10,000+ targeted leads monthly from LinkedIn, industry databases, and intent signals — all verified and enriched before reaching your CRM.",
    metrics: [
      { label: "Leads/Month", value: "10,000+" },
      { label: "Sources", value: "Multi" },
      { label: "Verification", value: "Auto" },
    ],
  },
  {
    number: "03",
    name: "Automated Outreach",
    description: "Multi-channel sequencing — email, LinkedIn, WhatsApp — with AI-personalized messaging. Each touch is contextual, timed, and optimized based on real response data.",
    metrics: [
      { label: "Channels", value: "3+" },
      { label: "Personalization", value: "AI" },
      { label: "Follow-ups", value: "Auto" },
    ],
  },
  {
    number: "04",
    name: "Conversation AI + CRM",
    description: "24/7 AI conversation engine that qualifies leads, handles objections, books meetings, and nurtures cold prospects. Integrated with your CRM so nothing falls through the cracks.",
    metrics: [
      { label: "Availability", value: "24/7" },
      { label: "Response Time", value: "<60s" },
      { label: "Meeting Booking", value: "Auto" },
    ],
  },
  {
    number: "05",
    name: "Ad Multiplier",
    description: "Strategic paid amplification across Meta, Google, LinkedIn, and TikTok. We set up, manage, and optimize your ad spend to multiply organic efforts and fill the top of funnel.",
    metrics: [
      { label: "Platforms", value: "4+" },
      { label: "Optimization", value: "AI" },
      { label: "Reporting", value: "Weekly" },
    ],
  },
  {
    number: "06",
    name: "ScaleX Diagnostic",
    description: "Deep AI audit of any business — website, DNS, security, funnel, offer, positioning, ad strategy. Scores across 10 pillars with bilingual improvement roadmap. Free for all tiers.",
    metrics: [
      { label: "Data Points", value: "200+" },
      { label: "Pillars", value: "10" },
      { label: "Price", value: "Free" },
    ],
  },
];

const comparisonRows = [
  { feature: "Content creation", us: "100+ pieces/mo (AI)", them: "4-8 posts/mo (manual)" },
  { feature: "Lead generation", us: "10,000+ targeted/mo", them: "Cold lists, no enrichment" },
  { feature: "Outreach", us: "AI-personalized multi-channel", them: "Generic email blasts" },
  { feature: "Response time", us: "<60 seconds (24/7 AI)", them: "24-48 hours (business hours)" },
  { feature: "CRM management", us: "Autonomous pipeline", them: "Manual data entry" },
  { feature: "Reporting", us: "Real-time dashboard", them: "Monthly PDF" },
  { feature: "Time to deploy", us: "7-14 days", them: "2-3 months" },
  { feature: "Monthly investment", us: "From $8,500/mo", them: "$15,000-$40,000/mo" },
  { feature: "Contract lock-in", us: "None — cancel anytime", them: "6-12 month minimum" },
];

/* ─── Component ───────────────────────────────────────────────────── */

export function PricingDetails() {
  const { openQuiz } = useQuiz();

  return (
    <div className="space-y-24">

      {/* What's Inside */}
      <div>
        <div className="text-center mb-16">
          <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-4">What&apos;s Inside</span>
          <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase">
            Six <span className="shimmer-text">Systems.</span> One Engine.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-8 ${i < 3 ? "border-b border-white/10" : ""} ${i % 3 !== 2 ? "lg:border-r border-white/10" : ""} ${i % 2 !== 1 ? "md:border-r lg:border-r-0 border-white/10" : ""}`}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-3 block">System {sys.number}</span>
              <h3 className="text-lg font-wide font-bold uppercase mb-3">{sys.name}</h3>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed mb-6">{sys.description}</p>
              <div className="flex gap-4">
                {sys.metrics.map((m, j) => (
                  <div key={j}>
                    <span className="block text-[8px] tracking-[0.2em] uppercase text-zinc-700">{m.label}</span>
                    <span className="block text-sm font-wide font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Us vs Them comparison */}
      <div>
        <div className="text-center mb-16">
          <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-4">Comparison</span>
          <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase">
            Us vs <span className="shimmer-text">Agencies.</span>
          </h2>
        </div>

        <div className="border border-white/10 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-5 px-6 text-left text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-normal w-1/3">Feature</th>
                <th className="py-5 px-6 text-left text-[10px] tracking-[0.2em] uppercase text-white font-bold w-1/3">MyNewStaff.ai</th>
                <th className="py-5 px-6 text-left text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-normal w-1/3">Traditional Agency</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-none">
                  <td className="py-4 px-6 text-sm font-sans text-zinc-400">{row.feature}</td>
                  <td className="py-4 px-6 text-sm font-sans text-white font-medium">{row.us}</td>
                  <td className="py-4 px-6 text-sm font-sans text-zinc-600">{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-16 border border-white/10"
      >
        <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase mb-4">
          Ready to <span className="shimmer-text">Scale?</span>
        </h2>
        <p className="text-sm text-zinc-500 font-sans max-w-md mx-auto mb-8">
          Book a 30-minute strategy call. We&apos;ll run your ScaleX diagnostic live, show you exactly where your gaps are, and map a custom growth plan.
        </p>
        <button
          onClick={() => openQuiz("pricing-page-cta")}
          className="px-10 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors cursor-pointer"
        >
          Book Strategy Call
        </button>
      </motion.div>
    </div>
  );
}
