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
  stat: string;
  statLabel: string;
  whoItsFor: string;
  projection: string;
  includes: string[];
};

const MODULES: ModuleData[] = [
  {
    tag: "MODULE 01",
    name: "Claude Code Mastery",
    subtitle: "Top 0.1% AI operator setup — not a tutorial",
    value: 13000,
    stat: "285+",
    statLabel: "autonomous agent skills",
    description:
      "This is not ChatGPT with a prompt. This is 285+ custom autonomous agent skills, 94 sub-agents, 5 execution hooks, custom MCP servers, and a skill router that activates the right agent for every task automatically. Most Claude users type prompts. You'll run an autonomous command center that builds, deploys, and operates software while you sleep. Anthropic themselves featured this level of Claude Code usage — less than 0.1% of all users operate at this depth.",
    highlight: "You're not learning to use AI. You're inheriting a year of compound engineering.",
    whoItsFor:
      "Any operator who wants to stop being an AI tourist and start running AI like infrastructure. If you can use a terminal, you can run this.",
    projection:
      "Go from 'I use ChatGPT for emails' to running 285 autonomous agents that build landing pages, scrape leads, write campaigns, and deploy code — in the same session.",
    includes: [
      "Full Claude Code environment — Luka's exact settings.json, permissions, model config",
      "285+ autonomous agent skills (content, lead gen, deploy, audit, research, design — 25 categories)",
      "94 sub-agents with model routing (Haiku for research, Sonnet for code, Opus for architecture)",
      "5 execution hooks — pre-tool safety, post-tool verification, skill routing, anti-rebuild, quality gates",
      "Custom MCP servers — Telegram, Notion, Playwright, Figma, Context7",
      "Skill chaining — compound multi-step workflows that trigger sequentially",
      "The same setup that built the $1.1M+ per-client stack. Not a demo — the actual config files.",
    ],
  },
  {
    tag: "MODULE 02",
    name: "Lead Generation Engine",
    subtitle: "FIRE v2 — 20,536 leads processed, 19-signal scoring",
    value: 42000,
    stat: "20,536",
    statLabel: "leads processed and scored",
    description:
      "The FIRE Lead Engine is not a spreadsheet scraper. It's a 19-signal behavioral intent scoring system with a multi-source enrichment waterfall that processes 5,000+ leads per day. It pulled 7,007 enriched leads in the last 24 hours alone. Sources include Apollo, Clay, LinkedIn, Google Maps, and business registers — enriched with email verification, decision-maker discovery, company revenue estimation, and tech stack detection. Every lead gets a FIRE score (Fit, Intent, Recency, Engagement) and routes automatically to the right campaign tier.",
    highlight: "7,007 leads enriched in 24 hours. 19-signal scoring. Runs on $200/mo in API fees.",
    whoItsFor:
      "IB operators who need volume. Copy trade providers who need funded accounts. Anyone whose revenue scales with how many qualified traders enter the pipeline.",
    projection:
      "Replace $2,000–$3,500/mo in managed lead gen with a system you own. 50+ qualified trader leads per week on autopilot.",
    includes: [
      "Multi-source scraper — Apollo, Clay, LinkedIn, Google Maps, business registers",
      "19-signal intent scoring model (FIRE: Fit, Intent, Recency, Engagement)",
      "Enrichment waterfall — email verification, phone discovery, decision-maker resolution",
      "Owner/founder discovery via AI (Gemini-powered, not database lookups)",
      "Tier routing — hot leads to immediate outreach, warm to nurture, cold to long-term",
      "Free enrichment engine — 1,393 lines, replaces $500+/mo in paid enrichment tools",
      "Daily cron job — pipeline refreshes automatically, no manual triggering",
    ],
  },
  {
    tag: "MODULE 03",
    name: "AI Email Outreach Engine",
    subtitle: "47% open rate — 2.2x industry average",
    value: 30000,
    stat: "47%",
    statLabel: "open rate (industry avg: 21%)",
    description:
      "The MNS 4-Campaign Email Engine hits 47% open rates on live client campaigns. Industry average for B2B is 21.3% (Mailchimp 2026 benchmark). That's 2.2x the industry standard. Not because of tricks — because of deliverability engineering (SPF, DKIM, DMARC, dedicated IPs, warm-up sequences), AI-written copy that passes every spam filter and human detector, and FIRE-scored segmentation that sends the right message to the right person at the right intent level. Four campaign types: Welcome (new IB signups), Nurture (cold → warm), Reactivation (dormant accounts), and Market Recap (weekly value that keeps your list warm and funding).",
    highlight: "47% open rates. 2.2x industry average. Zero AI detection on copy.",
    whoItsFor:
      "Any trading leader with an email list of 500+ traders sitting untouched. IB recruiters, copy trade providers with past applicants, signal groups with captured emails.",
    projection:
      "Turn a dead email list into 3–5 new funded accounts per month. Clients typically see ROI within 45 days of the nurture sequence going live.",
    includes: [
      "4-campaign architecture — welcome, nurture, reactivate, market recap",
      "GHL workflow setup (we use what works — never custom email infrastructure)",
      "AI-written copy — NEPQ-style, zero AI detection, passes every spam filter",
      "Full deliverability stack — SPF, DKIM, DMARC, warmup plan, dedicated IP guidance",
      "FIRE-scored segmentation — send based on intent level, not blast-to-all",
      "A/B test framework for subject lines and CTAs (statistical significance, not guessing)",
      "Weekly automated market recap template — keeps your list engaged between campaigns",
    ],
  },
  {
    tag: "MODULE 04",
    name: "Content Engine",
    subtitle: "30+ pieces/month across 5 platforms — autonomous",
    value: 36000,
    stat: "30+",
    statLabel: "pieces per month, zero manual work",
    description:
      "The MNS Content Engine posts to Instagram, TikTok, YouTube Shorts, LinkedIn, and X — trained on YOUR brand voice, YOUR trading style, YOUR niche. It generates market analysis posts, trade recaps, educational content, lifestyle positioning, and engagement hooks. Every piece runs through the IG Algo 2026 Virality Scorer — nothing ships below 75/100. It uses real-time news feeds for newsjacking (trending market events → content in under 20 minutes). Agencies charge $3,000–$5,000/mo for manual posting to 2 platforms. This runs 5 platforms autonomously for ~$50/mo in API costs.",
    highlight: "5 platforms. 30+ pieces/month. $50/mo to run. Agencies charge $5K/mo for less.",
    whoItsFor:
      "Signal providers who need consistent social presence. IB leaders who need to build personal brand. Copy trade providers competing for attention in a crowded market.",
    projection:
      "Go from posting when you remember to 30+ branded pieces per month across every platform your traders use. Follower growth compounds — 6 months of consistency changes your business.",
    includes: [
      "Content Engine cloned and configured for your trading niche",
      "Brand voice AI trained on your existing posts, style, and terminology",
      "Trading-specific templates — market analysis, trade recaps, P&L posts, educational",
      "IG + TikTok + YT Shorts + LinkedIn + X native posting (not cross-post)",
      "IG Algo 2026 Virality Scorer — nothing ships below 75/100",
      "Newsjacking pipeline — trending market events → branded content in 20 min",
      "First week of content generated live in the session",
    ],
  },
  {
    tag: "MODULE 05",
    name: "AI Cold Caller",
    subtitle: "$2,500/mo + $0.20/min — clients pay monthly for this",
    value: 30000,
    stat: "200+",
    statLabel: "calls per day, autonomous",
    description:
      "Brooke is MNS's flagship product. She makes 200+ calls per day using proprietary AI voice technology and proven sales methodology. She books meetings on your calendar, captures phone numbers, sends SMS follow-ups, and self-improves after every conversation (10-dimension self-evaluation: tonality, pacing, sales execution, emotion, objection handling, close rate). She added $22K/mo to a roofing client in 47 days. For trading: she calls leads from the FIRE engine, pitches your copy trade service or IB program, handles 'is this a scam' objections, and books qualified calls on your calendar.",
    highlight: "Added $22K/mo to a client in 47 days. Clients pay $30K+/yr for access. Available as managed add-on.",
    whoItsFor:
      "IB leaders who need volume outreach without hiring SDRs. NOT included in base tiers — this is a managed add-on discussed on the discovery call.",
    projection:
      "Replace a $60K/yr SDR with a system that dials 200+ traders per day, handles objections in real-time, books qualified meetings, and gets better with every call.",
    includes: [
      "Enterprise voice pipeline provisioned and verified",
      "Real-time AI voice engine — natural conversation, not text-to-speech",
      "Sales script library trained on YOUR specific offer and objections",
      "Self-improvement loop — 10-dimension evaluation after every conversation",
      "Calendar booking integration (Cal.com, GHL, Calendly)",
      "SMS follow-up automation after every call",
      "Call analytics dashboard + recording review",
    ],
  },
  {
    tag: "MODULE 06",
    name: "WhatsApp Bot",
    subtitle: "$800/mo managed — 24/7 AI on your number",
    value: 9600,
    stat: "24/7",
    statLabel: "AI-powered client comms",
    description:
      "The MNS WhatsApp Bot runs on your business number with full AI conversation handling. Clients pay $800/mo for this as a managed service. It handles new inquiries ('how does copy trading work?'), onboarding flows (application → approval → broker registration link → account connection), trade notifications, and P&L recaps. It captures contact info, qualifies leads, and hands off to you only when a human touch is needed. Running cost after deployment: ~$10/mo.",
    highlight: "Clients pay $800/mo. Your cost after setup: $10/mo. Same system.",
    whoItsFor:
      "Copy trade providers handling client questions manually. IB leaders with applicants sitting unresponded in WhatsApp. Anyone whose phone buzzes 50+ times a day with the same questions.",
    projection:
      "Eliminate 2–3 hours/day of repetitive WhatsApp replies. Every inquiry gets instant, intelligent response. Onboarding happens while you sleep.",
    includes: [
      "WhatsApp Business API fully configured on your number",
      "AI chat agent trained on your copy trade offer, FAQ, risk profiles",
      "Automated onboarding flow — apply → approve → broker link → connect → welcome",
      "Trade notification templates — entries, exits, P&L recaps",
      "Lead capture + phone number collection for IB pipeline",
      "Smart handoff to human when the conversation needs you",
    ],
  },
  {
    tag: "MODULE 07",
    name: "Ad Engine",
    subtitle: "$2,000/mo + 10% spend — autonomous optimization",
    value: 24000,
    stat: "3x",
    statLabel: "ROAS kill/scale threshold",
    description:
      "The MNS Ad Engine runs Meta + Google campaigns with autonomous creative rotation, fatigue detection, and ROAS-based kill/scale triggers. Clients pay $2,000/mo + 10% of ad spend for managed service. It targets forex interest audiences, passive income seekers, copy trade intent keywords, and broker comparison traffic. Creative rotation means your ads don't fatigue — the system detects declining CTR and swaps creatives before performance drops. The 3x ROAS rule: anything below 3x gets killed, anything above gets scaled. No human in the loop after setup.",
    highlight: "Autonomous ad ops. Agencies charge $2K/mo + 15-20% spend. You own this.",
    whoItsFor:
      "Trading leaders ready to spend $50–$500/day on paid acquisition. IB operators who need funded accounts faster than organic allows.",
    projection:
      "Cut cost per funded account by 40% through AI-optimized creative rotation vs. manual campaign management.",
    includes: [
      "Meta Pixel + Conversions API (server-side tracking, not browser-only)",
      "Google Ads conversion tracking + enhanced conversions",
      "Trading-specific audience targeting — forex interest, broker intent, passive income",
      "Creative templates for copy trade and IB offers",
      "Advantage+ / PMax campaign architecture",
      "Autonomous creative rotation + fatigue detection",
      "3x ROAS kill/scale triggers — no manual optimization needed",
    ],
  },
];

export function TradersModules() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
      <Reveal className="max-w-5xl mx-auto text-center mb-16">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          WHAT WE BUILD · WHAT WE DEPLOY
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
          Seven systems. <span className="shimmer-text">One trading empire.</span>
        </h2>
        <p className="text-xs text-zinc-500 font-sans tracking-[0.15em] uppercase">
          Real data. Real pricing. Tap any module.
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
              <div className="p-8 md:p-12 flex flex-col h-full">
                <span className="block text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
                  {mod.tag}
                </span>
                <h3 className="font-wide text-2xl md:text-3xl uppercase text-white mb-2">
                  {mod.name}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans mb-4">
                  {mod.subtitle}
                </p>

                {/* Key stat */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                  <span className="text-3xl md:text-4xl font-wide font-bold text-white">
                    {mod.stat}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider leading-snug">
                    {mod.statLabel}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                  {mod.description.slice(0, 180)}...
                </p>
                <p className="text-sm text-white font-sans font-medium mb-6">
                  {mod.highlight}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-sans">
                    <RollingNumber
                      value={mod.value}
                      prefix="$"
                      separator
                      duration={2200}
                      className="text-white font-wide text-base"
                    />
                    <span className="text-zinc-600 ml-1">/yr value</span>
                  </span>
                  <span
                    className={`text-xs font-sans transition-colors ${
                      expanded === i ? "text-white" : "text-zinc-600"
                    }`}
                  >
                    {expanded === i ? "Close" : "Full details"}
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

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
                <div className="p-8 md:p-10 lg:border-r border-white/5">
                  <span className="block text-[10px] tracking-[0.3em] text-green-400/80 uppercase mb-4 font-sans">
                    Full description
                  </span>
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                    {MODULES[expanded].description}
                  </p>
                  <span className="block text-[10px] tracking-[0.3em] text-green-400/80 uppercase mb-4 font-sans">
                    What you get
                  </span>
                  <ul className="space-y-3">
                    {MODULES[expanded].includes.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-zinc-300 font-sans leading-relaxed"
                      >
                        <span className="text-green-400/60 mt-0.5 shrink-0">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
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
                      What this means for your trading business
                    </span>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                      &ldquo;{MODULES[expanded].projection}&rdquo;
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <a
                      href="#booking"
                      className="block text-center w-full py-4 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-[1.02] transition-transform"
                    >
                      Book discovery call
                    </a>
                    <p className="text-[10px] text-zinc-600 font-sans text-center mt-2">
                      5 seats · discovery call required
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
