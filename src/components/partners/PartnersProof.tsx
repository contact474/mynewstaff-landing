"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {prefix}
          <motion.span>{value.toLocaleString()}</motion.span>
          {suffix}
        </motion.span>
      ) : (
        <span className="opacity-0">
          {prefix}
          {value}
          {suffix}
        </span>
      )}
    </span>
  );
}

const stats = [
  {
    value: 2.6,
    suffix: "M",
    prefix: "$",
    label: "Revenue Closed",
    detail: "Across 6 active clients in Q1 2026 alone",
  },
  {
    value: 84,
    suffix: "K+",
    label: "Leads Generated",
    detail: "Multi-channel scraping from 7 platforms",
  },
  {
    value: 441,
    suffix: "%",
    label: "Avg ROI Delivered",
    detail: "Before-vs-after tracked for every client",
  },
  {
    value: 13,
    suffix: "",
    label: "Landing Pages Live",
    detail: "Conversion-optimized, A/B tested funnels",
  },
];

const capabilities = [
  {
    title: "Mission Control",
    desc: "AI-powered CRM with autonomous agents — CEO, Content Head, Outreach Head, Dev Head — running 24/7 on autopilot.",
    tag: "LIVE",
  },
  {
    title: "Content Engine",
    desc: "9-platform trend discovery → 5-dimension scoring → AI carousel generation → branded PNG rendering. Automated every 8 hours.",
    tag: "LIVE",
  },
  {
    title: "Behavioral Email System",
    desc: "4-campaign engine: Pure Value → Social Proof → Conversion → Re-engagement. Cold leads never get pitched. Behavioral triggers route leads through the right sequence.",
    tag: "LIVE",
  },
  {
    title: "Landing Pages & Funnels",
    desc: "Next.js 15 + Tailwind v4 + GSAP animations. Dark-mode, conversion-optimized, world-class design. Deployed on Vercel edge.",
    tag: "SHIPPED",
  },
  {
    title: "AI Video Production",
    desc: "Explainer videos, slide-based presentations, AI voiceover — all produced in-house with our generation pipeline.",
    tag: "ACTIVE",
  },
  {
    title: "Lead Generation",
    desc: "High-intent Reddit prospecting, AI cold emails via GHL, multi-channel outreach. Fully autonomous pipeline from discovery to booked call.",
    tag: "ACTIVE",
  },
];

export function PartnersProof() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
      {/* Header */}
      <Reveal className="max-w-5xl mx-auto text-center mb-16">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          Proof of Work
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-6">
          WE <span className="shimmer-text">BUILD.</span> WE{" "}
          <span className="shimmer-text">SHIP.</span>
        </h2>
        <p className="text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          Everything we offer in this program is built and battle-tested across
          real client deployments. This isn&apos;t theory — it&apos;s live infrastructure.
        </p>
      </Reveal>

      {/* Stats Grid */}
      <Reveal className="max-w-5xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 text-center ${i > 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""} ${i >= 2 ? "border-t md:border-t-0 border-white/10" : ""}`}
            >
              <div className="font-wide text-3xl md:text-4xl text-white mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-xs text-zinc-300 font-sans uppercase tracking-[0.15em] mb-2">
                {stat.label}
              </p>
              <p className="text-[10px] text-zinc-600 font-sans leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Capabilities */}
      <Reveal className="max-w-5xl mx-auto">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-6 font-sans text-center">
          What Powers Your Deliverables
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-8 md:p-10 border-b border-r border-white/10 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <h4 className="font-wide text-sm uppercase text-white">
                  {cap.title}
                </h4>
                <span
                  className={`text-[9px] tracking-[0.2em] uppercase font-sans px-2 py-0.5 border ${
                    cap.tag === "LIVE"
                      ? "border-green-500/30 text-green-400/80"
                      : cap.tag === "SHIPPED"
                        ? "border-blue-500/30 text-blue-400/80"
                        : "border-amber-500/30 text-amber-400/80"
                  }`}
                >
                  {cap.tag}
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Live Dashboard Screenshots */}
      <Reveal className="max-w-5xl mx-auto mt-20 mb-20">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-6 font-sans text-center">
          Live Systems — Real Screenshots
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Dashboard Overview",
              src: "/assets/proof-overview.png",
              alt: "MNS Dashboard showing $2.6M revenue, 84.2K leads, 441% ROI across 6 clients",
            },
            {
              label: "Cold Outreach Engine",
              src: "/assets/proof-outreach.png",
              alt: "Cold outreach dashboard showing 17.4K emails sent, 54.3% open rate, 8.6% reply rate",
            },
            {
              label: "AI Lead Scraper",
              src: "/assets/proof-leadscraper.png",
              alt: "Lead scraper showing 65.6K leads scraped from 7 platforms with intent scoring",
            },
            {
              label: "Landing Pages & Funnels",
              src: "/assets/proof-landingpages.png",
              alt: "13 landing pages with 776.8K visitors, 6.5% conversion, $1.5M revenue attribution",
            },
          ].map((item, i) => (
            <div key={i} className="border border-white/10 overflow-hidden group">
              <div className="p-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                  {item.label} — Live
                </span>
              </div>
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Powered By / Integrations */}
      <Reveal className="max-w-5xl mx-auto mt-20 text-center">
        <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans mb-10">
          Powered By & Integrated With
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
          {[
            "GoHighLevel",
            "Anthropic",
            "Google AI",
            "Stripe",
            "Vercel",
            "HubSpot",
            "Zapier",
            "Meta",
            "Reddit",
            "Cloudflare",
          ].map((brand, i) => (
            <span
              key={i}
              className="text-sm md:text-base font-wide uppercase text-zinc-300 hover:text-white tracking-[0.15em] transition-colors duration-500"
            >
              {brand}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
