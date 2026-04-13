"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RollingNumber } from "@/components/ui/RollingNumber";

type ModuleData = {
  tag: string;
  name: string;
  subtitle: string;
  value: number;
  description: string;
  highlight: string;
  whoItsFor: string;
  projection: string;
  duration: string;
  includes: string[];
};

const MODULES: ModuleData[] = [
  {
    tag: "MODULE 01",
    name: "The Stack",
    subtitle: "Claude Code + MNS templates",
    value: 2500,
    description:
      "Set up the exact Claude Code environment and deploy templates we use to run 7-figure operators. Your laptop becomes a command center.",
    highlight: "You leave with the same setup running on MNS.",
    whoItsFor:
      "Every attendee. Foundation module — everything else plugs into this.",
    projection:
      "From zero to a fully configured AI dev environment with our templates in under 90 minutes.",
    duration: "Thu morning · 90 min",
    includes: [
      "Claude Code install + MCP servers configured",
      "Anthropic + OpenAI API keys + billing caps",
      "GitHub + Vercel + Cloudflare auth wired",
      "MNS deploy templates pulled down to your machine",
      "Shared skills library (285+ autonomous agents)",
      "Project scaffolding for your specific business",
    ],
  },
  {
    tag: "MODULE 02",
    name: "The Content Engine",
    subtitle: "Autonomous multi-platform content",
    value: 4000,
    description:
      "Deploy the same content pipeline that posts for MNS across IG, TikTok, YouTube Shorts, LinkedIn and X — trained on your brand voice, running on autopilot.",
    highlight: "Posts daily without you touching it after Friday.",
    whoItsFor:
      "Agency owners, coaches, personal brands. Anyone whose content is currently stuck in 'I'll post when I can'.",
    projection:
      "Go from manual posting (or silence) to 30+ pieces of content per month, auto-scheduled and brand-consistent.",
    duration: "Thu morning · 45 min",
    includes: [
      "Content Engine cloned to your environment",
      "Brand voice fine-tuning on your existing posts",
      "IG + TikTok + YT Shorts + LinkedIn + X connectors",
      "IG Algo 2026 virality scoring (75+ to ship rule)",
      "Caption + hook library seeded for your niche",
      "First week of content generated live in the room",
    ],
  },
  {
    tag: "MODULE 03",
    name: "The Lead System",
    subtitle: "Scraper + enrichment waterfall",
    value: 3500,
    description:
      "Pull targeted prospects from Apollo, Clay, LinkedIn, Google Maps and business registers — enriched, scored and ready to contact. 500-5,000 leads per day.",
    highlight: "Daily lead flow, without buying overpriced lists.",
    whoItsFor:
      "B2B agencies, consultants, high-ticket coaches, and anyone who lives or dies by pipeline.",
    projection:
      "Replace $2–5K/mo in lead vendor spend with a stack that costs under $300/mo in API fees.",
    duration: "Thu morning · 60 min",
    includes: [
      "Multi-source scraper (Apollo, Clay, LI, GMaps)",
      "Enrichment waterfall with email verification",
      "FIRE lead scoring model (behavioral signals)",
      "Tier routing to campaigns based on score",
      "First 1,000 leads pulled and enriched live",
      "Daily cron job set up to keep pipeline fresh",
    ],
  },
  {
    tag: "MODULE 04",
    name: "Brooke — AI Cold Caller",
    subtitle: "Twilio + Gemini Flash Live + NEPQ",
    value: 6000,
    description:
      "Deploy MNS's flagship AI cold caller trained on YOUR offer, YOUR objections and Jeremy Miner NEPQ scripts. $0.04/min. Books real meetings, on real calendars.",
    highlight: "The same system that added $22K/mo to a roofing client.",
    whoItsFor:
      "Operators with a clear offer and a phone-based sales motion. Not for pure e-com.",
    projection:
      "Replace a $60K/yr SDR with a system that dials 24/7, books qualified meetings and never forgets a follow-up.",
    duration: "Thu afternoon · 75 min",
    includes: [
      "Twilio account provisioned and verified",
      "Gemini Flash Live voice pipeline deployed",
      "NEPQ script trained on your specific offer",
      "Objection handling library for your niche",
      "Calendar booking integration (Cal / GHL / Calendly)",
      "First test calls run live in the room",
      "Analytics + call review dashboard",
    ],
  },
  {
    tag: "MODULE 05",
    name: "The Ad Engine",
    subtitle: "Meta + Google autonomous ad ops",
    value: 2500,
    description:
      "Set up MNS Ad Engine — the system that launches, tracks and optimizes Meta and Google ads using Advantage+, PMax and our creative rotation logic.",
    highlight: "Ads that optimize themselves against real ROAS, not clicks.",
    whoItsFor:
      "E-com, agencies running client ads, coaches with proven offers ready to scale.",
    projection:
      "Cut manual ad management by 80% while holding or improving ROAS through autonomous creative rotation.",
    duration: "Thu afternoon · 60 min",
    includes: [
      "Meta Pixel + CAPI server-side tracking",
      "Google Ads conversion tracking + enhanced conv",
      "Advantage+ / PMax campaign templates",
      "Creative rotation + fatigue detection",
      "Daily autonomous optimization loop",
      "ROAS-based kill/scale triggers (3x rule)",
    ],
  },
  {
    tag: "MODULE 06",
    name: "Deploy & Ship",
    subtitle: "Vercel + VPS + domain pipeline",
    value: 1500,
    description:
      "Learn the MNS deploy flow — Vercel for frontends, Docker on VPS for backends, Caddy for routing. Ship to production Friday afternoon, live URL, real traffic.",
    highlight: "Stop asking devs. Ship yourself.",
    whoItsFor:
      "Founders tired of waiting 2 weeks for a dev to push 3 lines. Everyone benefits from the ship module.",
    projection:
      "From 'I need a dev' to 'I just deployed' — in under 30 minutes per feature, for the rest of your career.",
    duration: "Fri morning · 90 min",
    includes: [
      "Vercel account + production deploy workflow",
      "VPS access (Hostinger / DO / Hetzner)",
      "Docker + Caddy routing setup",
      "Domain + DNS + SSL automated",
      "Your first production deploy executed live",
      "Rollback + monitoring + alerts baseline",
    ],
  },
];

export function IntensiveModules() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
      <Reveal className="max-w-5xl mx-auto text-center mb-16">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          WHAT WE TEACH · WHAT WE DEPLOY
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
          Six modules. <span className="shimmer-text">One machine.</span>
        </h2>
        <p className="text-xs text-zinc-500 font-sans tracking-[0.15em] uppercase">
          Tap any module for what&apos;s inside
        </p>
      </Reveal>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        {MODULES.map((mod, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`w-full text-left border transition-all duration-300 cursor-pointer h-full ${
                expanded === i
                  ? "border-white/30 bg-white/[0.04]"
                  : expanded !== null
                    ? "border-white/5 opacity-50 hover:opacity-80"
                    : "border-white/10 hover:border-white/20"
              } ${i % 2 === 1 ? "md:border-l-0" : ""} ${i >= 2 ? "md:border-t-0" : ""}`}
            >
              <div className="p-10 md:p-12 flex flex-col h-full">
                <span className="block text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
                  {mod.tag}
                </span>
                <h3 className="font-wide text-2xl md:text-3xl uppercase text-white mb-2">
                  {mod.name}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans mb-1">
                  {mod.subtitle}
                </p>
                <p className="text-sm text-zinc-400 font-sans mb-6">
                  Market value:{" "}
                  <RollingNumber
                    value={mod.value}
                    prefix="$"
                    separator
                    duration={2200}
                    className="text-white font-wide text-lg"
                  />
                </p>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                  {mod.description}
                </p>
                <p className="text-sm text-white font-sans font-medium mb-6">
                  {mod.highlight}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-sans">
                    {mod.includes.length} deliverables
                  </span>
                  <span
                    className={`text-xs font-sans transition-colors ${
                      expanded === i ? "text-white" : "text-zinc-600"
                    }`}
                  >
                    {expanded === i ? "Close" : "View details"}
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Expanded detail */}
      <AnimatePresence mode="wait">
        {expanded !== null && (
          <motion.div
            key={`mod-${expanded}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="border border-white/10 border-t-0 bg-zinc-950/80"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left: what's included */}
                <div className="p-8 md:p-10 lg:border-r border-white/5">
                  <span className="block text-[10px] tracking-[0.3em] text-green-400/80 uppercase mb-4 font-sans">
                    What you leave with
                  </span>
                  <ul className="space-y-3 mb-6">
                    {MODULES[expanded].includes.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-zinc-300 font-sans leading-relaxed"
                      >
                        <span className="text-green-400/60 mt-0.5 shrink-0">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    <div>
                      <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                        Duration
                      </span>
                      <span className="text-sm text-white font-sans">
                        {MODULES[expanded].duration}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                        Market value
                      </span>
                      <span className="text-sm text-white font-sans">
                        ${MODULES[expanded].value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: who + projection */}
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="mb-6">
                    <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-3 font-sans">
                      Who this is for
                    </span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      {MODULES[expanded].whoItsFor}
                    </p>
                  </div>

                  <div className="p-4 border border-white/5 bg-white/[0.02] mb-6">
                    <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2 font-sans">
                      Projected impact
                    </span>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                      &ldquo;{MODULES[expanded].projection}&rdquo;
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <a
                      href="#tiers"
                      className="block text-center w-full py-4 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-[1.02] transition-transform"
                    >
                      Apply for a seat
                    </a>
                    <p className="text-[10px] text-zinc-600 font-sans text-center mt-2">
                      20 seats · application only
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
