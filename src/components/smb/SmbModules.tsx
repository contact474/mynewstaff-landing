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
  stat: string;
  statLabel: string;
  description: string;
  highlight: string;
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
      "This is not ChatGPT with a prompt. This is 285+ custom autonomous agent skills, 94 sub-agents, 5 execution hooks, custom MCP servers, and a skill router that activates the right agent for every task automatically. Most business owners type prompts into ChatGPT and get generic responses. You'll run an autonomous command center that builds landing pages, writes proposals, scrapes leads, creates content, and deploys software — while you run your business. Less than 0.1% of all Claude users operate at this depth.",
    highlight:
      "You're not learning to use AI. You're inheriting a year of compound engineering.",
    whoItsFor:
      "Every attendee. This is the foundation — everything else plugs into this. If you can use a phone, you can run this.",
    projection:
      "Go from 'I use ChatGPT for emails' to running 285 autonomous agents that handle marketing, sales, content, and operations — in the same session.",
    includes: [
      "Full Claude Code environment — Luka's exact settings, permissions, model config",
      "285+ autonomous agent skills across 25 categories (content, lead gen, deploy, audit, design)",
      "94 sub-agents with model routing (Haiku for research, Sonnet for code, Opus for architecture)",
      "5 execution hooks — pre-tool safety, post-tool verification, skill routing, quality gates",
      "Custom MCP servers — Notion, Playwright, Figma, Context7, Telegram",
      "The same setup that built the $1.1M+ per-client stack — the actual config files",
    ],
  },
  {
    tag: "MODULE 02",
    name: "Lead Generation Engine",
    subtitle: "$2,000–$3,500/mo service — 19-signal scoring",
    value: 42000,
    stat: "20,536",
    statLabel: "leads processed and scored",
    description:
      "The FIRE Lead Engine pulls targeted prospects for YOUR service area — homeowners needing roofing, businesses needing legal help, patients looking for dental work, clients searching for fitness coaching. 19-signal behavioral intent scoring. Multi-source enrichment waterfall that processes 5,000+ leads per day. 7,007 enriched in the last 24 hours alone. Sources include Apollo, Clay, LinkedIn, Google Maps, and business registers — enriched with email verification, decision-maker discovery, and intent signals. Every lead gets a FIRE score and routes automatically to the right campaign.",
    highlight:
      "7,007 leads enriched in 24 hours. Runs on $200/mo in API fees. Replaces $2,000–$3,500/mo managed service.",
    whoItsFor:
      "Any service business that needs a steady pipeline of qualified local leads. Roofers, plumbers, dentists, lawyers, fitness studios, med spas, real estate agents.",
    projection:
      "Replace manual prospecting and expensive lead vendors with a system you own. 50+ qualified leads per week in your service area on autopilot.",
    includes: [
      "Multi-source scraper — Apollo, Clay, LinkedIn, Google Maps, business registers",
      "19-signal intent scoring model (FIRE: Fit, Intent, Recency, Engagement)",
      "Geo-targeted for YOUR service area (radius, zip codes, neighborhoods)",
      "Enrichment waterfall — email verification, phone discovery, decision-maker resolution",
      "Tier routing — hot leads to immediate outreach, warm to nurture, cold to long-term",
      "Daily cron job — pipeline refreshes automatically, zero manual work",
    ],
  },
  {
    tag: "MODULE 03",
    name: "AI Cold Caller",
    subtitle: "$2,500/mo + $0.20/min — clients pay monthly",
    value: 30000,
    stat: "200+",
    statLabel: "calls per day, autonomous",
    description:
      "Brooke is MNS's flagship product. She makes 200+ calls per day using proprietary AI voice technology and proven sales methodology. She books appointments on your calendar, captures phone numbers, sends SMS follow-ups, and self-improves after every conversation. She added $22K/mo to a roofing client in 47 days. For service businesses: she calls leads from the FIRE engine, pitches your service, handles price objections, and books qualified appointments.",
    highlight:
      "Added $22K/mo to a roofing client in 47 days. Clients pay $30K+/yr. Available as managed add-on.",
    whoItsFor:
      "Service businesses that need booked appointments, not just leads. NOT included in base tiers — this is a managed add-on discussed on the discovery call.",
    projection:
      "Replace a $60K/yr receptionist or sales rep with a system that dials 200+ prospects per day, handles objections in real-time, and books qualified appointments.",
    includes: [
      "Enterprise voice pipeline provisioned and verified",
      "Real-time AI voice engine — natural conversation, not text-to-speech",
      "Sales script library trained on YOUR specific service and objections",
      "Self-improvement loop — 10-dimension evaluation after every conversation",
      "Calendar booking integration (Cal.com, GHL, Calendly)",
      "SMS follow-up automation after every call",
      "Call analytics dashboard + recording review",
    ],
  },
  {
    tag: "MODULE 04",
    name: "Content Engine",
    subtitle: "$1,500–$3,000/mo service — 5 platforms, autonomous",
    value: 36000,
    stat: "30+",
    statLabel: "pieces per month, zero manual work",
    description:
      "Posts to Instagram, TikTok, YouTube Shorts, LinkedIn, and Facebook — trained on YOUR brand voice, YOUR service, YOUR market. Before/after project photos, customer testimonials, educational tips, behind-the-scenes, team spotlights. Every piece runs through the IG Algo 2026 Virality Scorer — nothing ships below 75/100. Agencies charge $3,000–$5,000/mo for manual posting to 2 platforms. This runs 5 platforms autonomously for ~$50/mo in API costs.",
    highlight:
      "5 platforms. 30+ pieces/month. $50/mo to run. Agencies charge $5K/mo for less.",
    whoItsFor:
      "Every service business. If your competitors have better social presence than you despite worse work quality, this is the fix.",
    projection:
      "Go from posting when you remember to 30+ branded pieces per month across every platform your customers use.",
    includes: [
      "Content Engine cloned and configured for your service niche",
      "Brand voice AI trained on your existing posts and style",
      "Service-specific templates — before/after, testimonials, tips, team",
      "IG + TikTok + YT Shorts + LinkedIn + Facebook native posting",
      "IG Algo 2026 Virality Scorer — nothing ships below 75/100",
      "First week of content generated live in the session",
    ],
  },
  {
    tag: "MODULE 05",
    name: "Email Engine",
    subtitle: "47% open rate — 2.2x industry average",
    value: 30000,
    stat: "47%",
    statLabel: "open rate (industry avg: 21%)",
    description:
      "The MNS 4-Campaign Email Engine hits 47% open rates on live client campaigns. Industry average is 21.3% (Mailchimp 2026 benchmark). That's 2.2x the standard. Four campaign types: Welcome (new inquiries), Nurture (cold → warm), Reactivation (past customers who haven't booked in 90+ days), and Value Drops (seasonal tips that keep you top of mind). AI-written copy that passes every spam filter. FIRE-scored segmentation sends the right message at the right time.",
    highlight:
      "47% open rates. 2.2x industry average. Reactivation campaigns alone bring back 3–5 past clients per month.",
    whoItsFor:
      "Service businesses with 500+ past customers or leads sitting in a spreadsheet or CRM doing nothing.",
    projection:
      "Turn a dead contact list into 3–5 reactivated bookings per month. ROI within 45 days.",
    includes: [
      "4-campaign architecture — welcome, nurture, reactivate, value drops",
      "GHL workflow setup — we use what works, never custom infrastructure",
      "AI-written copy — zero AI detection, passes every spam filter",
      "Full deliverability stack — SPF, DKIM, DMARC, warmup plan",
      "FIRE-scored segmentation — send based on intent, not blast-to-all",
      "Seasonal campaign templates for your industry",
    ],
  },
  {
    tag: "MODULE 06",
    name: "Landing Pages & Funnels",
    subtitle: "$5,000–$15,000 per build — cinematic, 0.8s load",
    value: 15000,
    stat: "0.8s",
    statLabel: "load time — faster than 95% of the web",
    description:
      "MNS landing pages are not WordPress templates. They're cinematic, conversion-optimized pages built on Next.js + Tailwind that load in 0.8 seconds (vs. 4–6s industry average). Same architecture running mynewstaff.ai. Golden template system with 89 verified components. Responsive, accessible, tracking-ready. One page can replace your entire website and convert 3–5x better than what you have now.",
    highlight:
      "0.8s load time. 89 golden components. Clients pay $5K–$15K per build. You get the template.",
    whoItsFor:
      "Every service business with a website that loads slow, looks dated, or doesn't convert visitors to booked appointments.",
    projection:
      "Replace your $200/mo WordPress site with a page that loads 5x faster and converts 3x better. One landing page can pay for the entire mastermind.",
    includes: [
      "MNS Golden Template — Next.js 16 + Tailwind v4 + GSAP",
      "89 verified components (hero, testimonials, pricing, FAQ, booking, etc.)",
      "0.8s load time — Vercel edge, no bloat, no plugins",
      "Conversion-optimized layout — booking CTA above fold, social proof, urgency",
      "Mobile responsive by default — 60%+ of service business traffic is mobile",
      "Analytics + tracking pre-wired (Meta Pixel, Google Ads, Hotjar)",
    ],
  },
  {
    tag: "MODULE 07",
    name: "WhatsApp Bot",
    subtitle: "$800/mo managed — 24/7 AI on your number",
    value: 9600,
    stat: "24/7",
    statLabel: "AI-powered customer comms",
    description:
      "The MNS WhatsApp Bot runs on your business number with full AI conversation handling. Clients pay $800/mo for this as a managed service. It handles new inquiries ('do you service my area?', 'how much for a roof inspection?'), books appointments, sends reminders, and follows up after service. Captures contact info, qualifies leads, and hands off to you only when a human touch is needed. Running cost after deployment: ~$10/mo.",
    highlight:
      "Clients pay $800/mo. Your cost after setup: $10/mo. Same system.",
    whoItsFor:
      "Service businesses losing leads because they can't answer the phone fast enough. If calls go to voicemail, this is your fix.",
    projection:
      "Capture every inquiry instantly. No more voicemail. No more 'sorry I missed your call.' Every lead gets an immediate, intelligent response.",
    includes: [
      "WhatsApp Business API fully configured on your number",
      "AI chat agent trained on your services, pricing, availability",
      "Automated booking flow — inquiry → qualify → book → confirm → remind",
      "After-service follow-up and review request automation",
      "Lead capture + phone number collection for pipeline",
      "Smart handoff to human when the conversation needs you",
    ],
  },
];

export function SmbModules() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
      <Reveal className="max-w-5xl mx-auto text-center mb-16">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          WHAT WE BUILD · WHAT WE DEPLOY
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
          Seven systems. <span className="shimmer-text">One business machine.</span>
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
                    <RollingNumber value={mod.value} prefix="$" separator duration={2200} className="text-white font-wide text-base" />
                    <span className="text-zinc-600 ml-1">/yr value</span>
                  </span>
                  <span className={`text-xs font-sans transition-colors ${expanded === i ? "text-white" : "text-zinc-600"}`}>
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
                  <span className="block text-[10px] tracking-[0.3em] text-green-400/80 uppercase mb-4 font-sans">Full description</span>
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-6">{MODULES[expanded].description}</p>
                  <span className="block text-[10px] tracking-[0.3em] text-green-400/80 uppercase mb-4 font-sans">What you get</span>
                  <ul className="space-y-3">
                    {MODULES[expanded].includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-zinc-300 font-sans leading-relaxed">
                        <span className="text-green-400/60 mt-0.5 shrink-0">+</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="mb-6">
                    <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-3 font-sans">Who this is for</span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">{MODULES[expanded].whoItsFor}</p>
                  </div>
                  <div className="p-4 border border-white/5 bg-white/[0.02] mb-6">
                    <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2 font-sans">What this means for your business</span>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">&ldquo;{MODULES[expanded].projection}&rdquo;</p>
                  </div>
                  <div className="mt-auto pt-4">
                    <a href="#booking" className="block text-center w-full py-4 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-[1.02] transition-transform">Book discovery call</a>
                    <p className="text-[10px] text-zinc-600 font-sans text-center mt-2">5 seats · discovery call required</p>
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
