import { Navbar } from "@/components/ui/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { TradersHero } from "@/components/traders/TradersHero";
import { TradersMarquee } from "@/components/traders/TradersMarquee";
import { TradersModules } from "@/components/traders/TradersModules";
import {
  TradersStickyUrgency,
  TradersCountdownSection,
} from "@/components/traders/TradersUrgency";
import { BrookeTradersPopup } from "@/components/traders/BrookeTradersPopup";
import { SmbInlineUrgency } from "@/components/smb/SmbInlineUrgency";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI Trading Mastermind — Online | StarFX × MyNewStaff.ai",
  description:
    "Online mastermind for copy trade leaders and IB operators. AI systems deployed on your operation — lead gen, content, cold calling, client portals. The same stack that generated $1.1M+ per client. 5 seats.",
  openGraph: {
    title: "AI Trading Mastermind — StarFX × MyNewStaff.ai",
    description:
      "Your copy trade strategy prints. Your IB program earns. But the business side is still manual. We fix that in one 4-hour session.",
  },
};

const APPLY_URL =
  "https://wa.me/13058503664?text=Hey%20Luka!%20I%20want%20in%20on%20the%20AI%20Trading%20Mastermind%20%F0%9F%94%A5";

export default function TradersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black">
        <TradersHero />
        <TradersMarquee />

        {/* THE PROBLEM — deep, specific to their reality */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">
                The Problem
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-4">
                Your strategy does +9% monthly.
                <br />
                <span className="shimmer-text">
                  Your business side does nothing.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed mt-4 mb-12">
                You built a copy trade system with 89% win rates, verified
                results on Myfxbook, and a real edge in institutional price
                zones. The trading is solved. What&apos;s NOT solved is the
                machine that puts funded accounts IN the system.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  {
                    t: "Your IB pipeline is referral-only",
                    d: "You're growing through DMs, Telegram shoutouts, and word of mouth. It works at 50 IBs. It breaks at 500. There's no automated recruitment, no lead scoring, no outreach sequences. Every new IB costs you personal time.",
                    n: "$5K–$100K/mo in commissions — capped by how many DMs you can send",
                  },
                  {
                    t: "Your content is inconsistent",
                    d: "You post trade results when you remember. Meanwhile, traders with WORSE performance but BETTER content are eating your market. They have 50K followers. You have 5K. The edge doesn't market itself.",
                    n: "0 posts this week = 0 new followers = 0 new funded accounts",
                  },
                  {
                    t: "Your onboarding leaks 60% of leads",
                    d: "Someone hears about your copy trade, visits your site, fills out an application — then waits 24-48 hours for manual approval. By then they've found 3 other providers. No nurture sequence. No follow-up. No urgency.",
                    n: "Every day of manual approval = leads who funded somewhere else",
                  },
                  {
                    t: "Your performance fee model needs VOLUME",
                    d: "30% of profits only works at scale. With 20 accounts you're making rent. With 2,000 accounts you're making generational wealth. Same strategy, same risk, same win rate — the only variable is how many funded accounts you can attract.",
                    n: "The math is simple: 100x accounts = 100x revenue. The bottleneck is distribution, not alpha.",
                  },
                ].map((item) => (
                  <Reveal key={item.t} delay={0.1}>
                    <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors h-full">
                      <h4 className="text-sm font-wide font-bold uppercase tracking-wider mb-2">
                        {item.t}
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                        {item.d}
                      </p>
                      <p className="text-[10px] text-amber-400/70 uppercase tracking-wider">
                        {item.n}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02] max-w-2xl mx-auto">
                <p className="text-sm text-zinc-300 leading-relaxed text-center">
                  &ldquo;The richest traders aren&apos;t the best traders.
                  They&apos;re the ones who built the best{" "}
                  <span className="text-white font-medium">
                    distribution machine
                  </span>{" "}
                  around their edge. Your alpha is solved. Your distribution
                  isn&apos;t. That&apos;s what we fix.&rdquo;
                </p>
                <p className="text-[10px] text-zinc-600 tracking-wider uppercase text-center mt-4">
                  — Luka Lah, MyNewStaff.ai
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* MID-FUNNEL URGENCY */}
        <SmbInlineUrgency />

        {/* HOW IT WORKS */}
        <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5">
          <Reveal className="max-w-5xl mx-auto text-center">
            <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-16">
              From discovery call{" "}
              <span className="shimmer-text">to funded accounts on autopilot.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-5xl mx-auto" delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10">
              {[
                {
                  t: "Qualify",
                  d: "15-min discovery call. We learn your copy trade operation — AUM, IB structure, current funnel, what's working and what's leaking. If it's a fit, we schedule your session.",
                },
                {
                  t: "Build Live",
                  d: "4-hour online session. Screen share, hands on keyboards. We deploy AI systems on YOUR operation — not a demo, not a template. Your brand, your offer, your leads.",
                },
                {
                  t: "Deploy",
                  d: "By session end, at least one system is live and producing — lead scraper pulling traders, content engine posting, or cold caller dialing. Real URL, real output.",
                },
                {
                  t: "Compound",
                  d: "30–90 days async access. Weekly Loom reviews. We tune until the system compounds — more IBs, more funded accounts, more performance fees flowing in.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-8 md:p-10 flex flex-col ${
                    i > 0
                      ? "border-t md:border-t-0 md:border-l border-white/10"
                      : ""
                  }`}
                >
                  <span className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-wide text-xl uppercase text-white mb-3">
                    {item.t}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* LUKA'S RESUME — deep credibility */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">
                  Who Builds This For You
                </p>
                <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
                  The system behind{" "}
                  <span className="shimmer-text">$1.1M+ per client.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-8">
              {/* Left: Luka card */}
              <Reveal delay={0.1}>
                <div className="border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/30 transition-colors h-full relative overflow-hidden">
                  <div
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(circle at 80% 80%, rgba(129,140,248,0.2), transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-20 h-20 bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center text-2xl font-wide font-bold text-black shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
                        style={{ borderRadius: "30% / 30%" }}
                      >
                        LL
                      </div>
                      <div>
                        <h3 className="text-xl font-wide font-bold uppercase tracking-tight">
                          Luka Lah
                        </h3>
                        <p className="text-xs text-zinc-500 tracking-wider">
                          @ga.god · Founder, MyNewStaff.ai
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      I don&apos;t trade. I build the machine around people
                      who do. The same stack I&apos;m deploying for trading
                      leaders has already generated $1.1M+ per client across
                      real estate, fitness, law, SaaS, and consulting.
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Now I&apos;m bringing it to the trading world — because
                      the distribution problem is identical. You have the
                      edge. You need the infrastructure to scale it.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right: credentials grid */}
              <Reveal delay={0.2}>
                <div className="space-y-4">
                  {[
                    {
                      label: "Government Partnership",
                      value: "Slovenian COVID Campaign",
                      detail:
                        "Partnered with the Slovenian government on national COVID communications. Saved 50% of taxpayer budget. 100% campaign success rate. National-scale execution.",
                    },
                    {
                      label: "Client Revenue Generated",
                      value: "$1.1M+ per client, this year",
                      detail:
                        "Real estate ($68K → $958K), fitness ($42K → $568K), law ($124K → $1.3M), SaaS ($52K → $670K). Same system, different industries. Now deploying for trading.",
                    },
                    {
                      label: "AI Stack",
                      value: "285+ autonomous agents",
                      detail:
                        "Cold callers that dial 200+/day at $0.04/min. Content engines posting to 5 platforms. Lead scrapers pulling 5K leads/day. Ad engines optimizing autonomously. All running 24/7.",
                    },
                    {
                      label: "Systems Built",
                      value: "18 products, 7 packages",
                      detail:
                        "Brooke AI (cold caller), FIRE Lead Engine (scraper + scorer), Content Machine (multi-platform), Ad Engine (Meta + Google), Client Portals, CRM automation, proposal systems. Full vertical stack.",
                    },
                    {
                      label: "Infrastructure",
                      value: "VPS + Docker + Vercel + Cloudflare",
                      detail:
                        "Everything runs on owned infrastructure. No SaaS dependencies. No monthly platform fees. You own the stack. We deploy it on YOUR domain, YOUR brand, YOUR business.",
                    },
                  ].map((cred) => (
                    <div
                      key={cred.label}
                      className="border border-white/10 rounded-xl p-5 hover:border-white/30 hover:bg-white/[0.02] transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                          {cred.label}
                        </span>
                        <span className="text-xs text-white font-wide uppercase tracking-tight shrink-0">
                          {cred.value}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {cred.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Dominik card */}
            <Reveal delay={0.3}>
              <div className="mt-8 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/30 transition-colors relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, rgba(251,191,36,0.15), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08), transparent 60%)",
                  }}
                />
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                  <div
                    className="w-20 h-20 shrink-0 bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-2xl font-wide font-bold text-black shadow-[0_20px_60px_rgba(251,191,36,0.2)]"
                    style={{ borderRadius: "30% / 30%" }}
                  >
                    DP
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-wide font-bold uppercase tracking-tight">
                        Dominik Plevnik
                      </h3>
                      <span className="text-[10px] tracking-[0.2em] text-amber-400/60 uppercase border border-amber-400/20 px-2 py-0.5 rounded-full">
                        Trading Leader
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 tracking-wider mb-4">
                      @dominikp · Automated Trading · StarFX Ecosystem
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      Architect of the StarFX ecosystem — the infrastructure
                      where verified traders, copy trade providers like
                      OracleTrading, and IB networks operate under one roof.
                      Runs automated strategies on institutional price zones
                      with 89%+ win rates, verified live on Myfxbook and FX
                      Blue.
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Built the model: free signals as the top of funnel,
                      performance-based copy trading as the core, and an IB
                      program scaling $5K–$100K/mo in commissions. StarTrader
                      as the regulated backbone (FCA, ASIC, FSCA, FSC, FSA,
                      SCA — six jurisdictions). Now scaling the distribution
                      machine with AI.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* VALUE COMPARE — Hormozi stack */}
        <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5">
          <Reveal className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
                THE VALUE STACK
              </span>
              <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
                $241,000/yr of systems.{" "}
                <span className="shimmer-text">From $1,497.</span>
              </h2>
              <p className="text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-6 leading-relaxed">
                These are verified against actual client invoices. Every
                system listed below has been deployed and paid for by
                operators in other industries. You get them adapted for copy
                trading, IB management, and trader acquisition — in one live
                session.
              </p>
            </div>

            {[
              {
                label: "Core AI Systems (what clients pay us monthly — you get ownership)",
                rows: [
                  ["IB Lead Machine — $2,000–$3,500/mo service (12 months = $42K)", "$42,000/yr"],
                  ["Content Engine — $1,500–$3,000/mo service (12 months = $36K)", "$36,000/yr"],
                  ["Brooke AI Cold Caller — $2,500/mo + $0.20/min (12 months = $30K+)", "$30,000/yr"],
                  ["Copy Trade Client Portal — $5,000–$15,000 one-time build", "$15,000"],
                  ["Ad Engine — $2,000/mo + 10% spend (12 months = $24K+)", "$24,000/yr"],
                  ["WhatsApp Bot — $800/mo managed service (12 months = $9.6K)", "$9,600/yr"],
                  ["Email Engine — $1,500–$2,500/mo, 4-campaign system (12 months = $30K)", "$30,000/yr"],
                ],
                subtotal: "$204,600/yr",
              },
              {
                label: "Strategy & Playbooks (distribution knowledge from $1.1M+ clients)",
                rows: [
                  ["90-day IB growth plan — from 50 to 500 funded accounts", "$5,000"],
                  ["NEPQ sales scripts — trained for copy trade + IB objections", "$2,500"],
                  ["Forex-specific ad creative library (proven CTR > 2.5%)", "$2,000"],
                  ["Copy trade offer teardown — performance fee positioning, risk profiles", "$3,000"],
                  ["Client onboarding automation — approval → link → connection → first trade", "$2,500"],
                ],
                subtotal: "$15,000",
              },
              {
                label: "Access & Network (the compounding layer)",
                rows: [
                  ["4 hours live build time with Luka (same rate as $25K clients)", "$8,000"],
                  ["30–90 days async access post-session (Loom reviews, Signal)", "$6,000"],
                  ["Private traders cohort channel — for life", "Priceless"],
                  ["Warm intros to the MNS operator network (agencies, e-com, SaaS)", "$3,000"],
                  ["StarFX ecosystem integration — broker API, Myfxbook, portal wiring", "$5,000"],
                ],
                subtotal: "$22,000",
              },
            ].map((section, si) => (
              <div key={si} className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
                  <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans leading-relaxed">
                    {`0${si + 1}`} · {section.label}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans shrink-0">
                    Subtotal:{" "}
                    <span className="text-white">{section.subtotal}</span>
                  </span>
                </div>
                <div className="border border-white/10 overflow-hidden">
                  {section.rows.map(([item, price], i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[1fr_auto] ${
                        i < section.rows.length - 1
                          ? "border-b border-white/5"
                          : ""
                      } hover:bg-white/[0.02] transition-colors`}
                    >
                      <div className="p-3 md:p-5">
                        <span className="text-xs md:text-sm text-white font-sans leading-snug">
                          {item}
                        </span>
                      </div>
                      <div className="p-3 md:p-5 border-l border-white/10 text-right">
                        <span className="text-xs md:text-sm text-zinc-500 font-sans line-through decoration-zinc-700 whitespace-nowrap">
                          {price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Grand total */}
            <div className="mt-12 border-2 border-white/20 bg-white/[0.03] rounded-2xl p-6 md:p-12 text-center">
              <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">
                Total Real-World Value
              </span>
              <div className="text-4xl md:text-7xl font-wide font-bold text-white mb-2">
                $241,600+
              </div>
              <div className="text-xs text-zinc-500 font-sans tracking-wider mb-8">
                Real MNS client pricing — $2,500/mo cold caller, $3,500/mo
                lead engine, $3,000/mo content, $2,500/mo email, $800/mo
                WhatsApp. You&apos;d pay this annually. In the mastermind,
                you get ownership.
              </div>
              <div className="h-px w-32 bg-white/20 mx-auto mb-8" />
              <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">
                Your Price Today
              </span>
              <div className="text-3xl md:text-6xl font-wide font-bold mb-2">
                <span className="shimmer-text">$1,497 — $4,997</span>
              </div>
              <div className="text-xs text-zinc-500 font-sans tracking-wider mb-2">
                Blueprint: $1,497 · Builder: $2,497 · Partner: $4,997
              </div>
              <div className="text-xs text-zinc-400 font-sans tracking-wider">
                100% credited toward full build ($15K–$25K)
              </div>
              <a
                href="#booking"
                className="inline-block mt-8 px-10 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-105 transition-transform"
              >
                Book Discovery Call
              </a>
            </div>
          </Reveal>
        </section>

        {/* MODULES — 6 trading systems */}
        <TradersModules />

        {/* SOCIAL PROOF — cross-industry */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">
                  Proven Across Industries
                </p>
                <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
                  Same system.{" "}
                  <span className="shimmer-text">Different verticals.</span>
                </h2>
                <p className="text-sm text-zinc-400 max-w-xl mx-auto mt-4">
                  The AI stack we deploy for trading leaders is the same one
                  that produced these results in other industries. The
                  distribution problem is universal.
                </p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { v: "Real Estate", before: "$68K", after: "$958K", lift: "1,309%", leads: "120 → 5,200" },
                { v: "Fitness", before: "$42K", after: "$568K", lift: "1,253%", leads: "340 → 7,900" },
                { v: "Law", before: "$124K", after: "$1.3M", lift: "935%", leads: "48 → 2,300" },
                { v: "SaaS", before: "$52K", after: "$670K", lift: "1,188%", leads: "400 → 11,900" },
                { v: "Organic Foods", before: "$28K", after: "$405K", lift: "1,346%", leads: "620 → 14,900" },
                { v: "Consulting", before: "$10K", after: "$167K", lift: "828%", leads: "24 → 899" },
              ].map((c) => (
                <Reveal key={c.v} delay={0.05}>
                  <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                    <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                      {c.v}
                    </span>
                    <div className="flex items-baseline gap-2 mt-3 mb-1">
                      <span className="text-xs text-zinc-600 line-through">
                        {c.before}
                      </span>
                      <span className="text-xl font-wide font-bold">
                        {c.after}
                      </span>
                      <span className="text-[10px] text-green-400/80">
                        ↑{c.lift}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-600">
                      Leads: {c.leads}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <p className="text-center text-xs text-zinc-500 mt-8">
                Now imagine these numbers applied to funded trading accounts
                generating 30% performance fees on +9% monthly returns.
              </p>
            </Reveal>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">
                Who This Is For
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
                Trading leaders who already have the edge.
                <br />
                <span className="shimmer-text">
                  Now need the machine around it.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="grid md:grid-cols-3 gap-4 mt-12 text-left">
                {[
                  {
                    t: "Copy Trade Providers",
                    d: "Running a service like OracleTrading — verified results, performance fee model, institutional-grade strategy. Need a professional portal, automated onboarding, and marketing that attracts $10K–$100K funded accounts.",
                  },
                  {
                    t: "IB Network Operators",
                    d: "Building under StarTrader or any regulated broker. Earning $5K–$100K/mo in IB commissions but capped by manual recruitment. Need an automated pipeline that turns strangers into funded IBs.",
                  },
                  {
                    t: "Signal & Community Leaders",
                    d: "Running Telegram/WhatsApp groups with 100–10,000 traders. Giving away signals for free. Want to monetize through IB commissions, copy trade services, or paid tiers — without losing the community.",
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors"
                  >
                    <h4 className="text-sm font-wide font-bold uppercase tracking-wider mb-2">
                      {item.t}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section
          id="tiers"
          className="border-t border-white/5 py-20 md:py-28 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase text-center mb-4">
                Choose Your Tier
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] text-center mb-4">
                Knowledge or deployment.
                <br />
                <span className="shimmer-text">You pick the level.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-center text-sm text-zinc-500 max-w-xl mx-auto mb-16">
                $2,497 gives you the knowledge to run every system yourself
                using Claude. $4,997 and we deploy it on your business. Both
                credited 100% toward a full partnership.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* BUILDER — knowledge tier */}
              <Reveal delay={0.15}>
                <div className="border-2 border-white rounded-2xl p-8 h-full flex flex-col relative bg-white/[0.03]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full">
                    Learn It
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4">
                    Builder
                  </div>
                  <div className="mb-1">
                    <span className="text-4xl md:text-5xl font-wide font-bold">$2,497</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2">
                    You build it. We teach you how.
                  </div>
                  <div className="text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">
                    4-hour live masterclass — Claude Pro-level mastery
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase mb-4">
                    What You Get
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      ["4-hour live session with Luka — screen share, hands on", ""],
                      ["Claude Code pro-level setup — my exact skills, agents, config", "$5,000"],
                      ["285+ MNS autonomous agent skills library", "$8,000"],
                      ["Lead generation engine — how to build + run the FIRE system", "$3,500"],
                      ["AI-native email outreach engine — 4-campaign architecture", "$2,500"],
                      ["Content engine walkthrough — 5-platform autonomous posting", "$3,000"],
                      ["Ad engine fundamentals — Meta + Google for trader acquisition", "$2,000"],
                      ["WhatsApp bot setup guide — client comms automation", "$1,500"],
                      ["Session recording + all templates, prompts, configs", "$2,000"],
                      ["Private traders cohort Signal channel", "for life"],
                      ["30 days async Q&A with Luka", "$4,000"],
                      ["100% credited toward full build ($15K–$25K)", ""],
                    ].map(([f, v]) => (
                      <li
                        key={f}
                        className="text-xs md:text-sm text-zinc-300 flex items-start justify-between gap-2"
                      >
                        <span className="flex gap-2">
                          <span className="text-green-400/80">+</span>
                          {f}
                        </span>
                        {v && (
                          <span className="text-[10px] text-zinc-500 shrink-0 mt-1">
                            {v}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#booking"
                    className="block text-center px-6 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] transition-transform"
                  >
                    Book Call — $2,497
                  </a>
                  <p className="text-[10px] text-zinc-500 text-center mt-3">
                    Best for: operators who can execute with Claude
                  </p>
                </div>
              </Reveal>

              {/* PARTNER — lite deploy tier */}
              <Reveal delay={0.25}>
                <div className="border border-amber-400/30 rounded-2xl p-8 h-full flex flex-col hover:border-amber-400/60 transition-colors relative bg-gradient-to-b from-amber-500/[0.03] to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full">
                    We Deploy It
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-4">
                    Partner
                  </div>
                  <div className="mb-1">
                    <span className="text-4xl md:text-5xl font-wide font-bold">$4,997</span>
                  </div>
                  <div className="text-[10px] text-amber-400/60 uppercase tracking-wider mb-2">
                    We build it on your business. You own it.
                  </div>
                  <div className="text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">
                    Everything in Builder + lite deploys on your stack
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-amber-400/80 uppercase mb-4">
                    Everything in Builder, Plus
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      ["Lite deploy: Lead Generation Engine on your ICP", "$3,500/mo value"],
                      ["Lite deploy: Email Outreach Engine (4 campaigns live)", "$2,500/mo value"],
                      ["Lite deploy: Content Engine configured + posting", "$3,000/mo value"],
                      ["Lite deploy: WhatsApp Bot on your number", "$800/mo value"],
                      ["Lite deploy: Client Portal on your domain", "$15,000 build"],
                      ["Lite deploy: Ad Engine templates + tracking", "$2,000/mo value"],
                      ["1-on-1 implementation call with Luka (90 min)", "$3,000"],
                      ["200 qualified trader leads delivered", "$8,000"],
                      ["60 days direct access to Luka", "$8,000"],
                      ["StarFX ecosystem integration support", "$5,000"],
                      ["Bonus: Custom landing page by MNS", "$5,000–$15,000"],
                      ["Bonus: Myfxbook/FX Blue API dashboard wiring", "$2,500"],
                      ["100% credited toward full build ($15K–$25K)", ""],
                    ].map(([f, v]) => (
                      <li
                        key={f}
                        className="text-xs md:text-sm text-zinc-300 flex items-start justify-between gap-2"
                      >
                        <span className="flex gap-2">
                          <span className="text-amber-400/80">+</span>
                          {f}
                        </span>
                        {v && (
                          <span className="text-[10px] text-amber-400/50 shrink-0 mt-1">
                            {v}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Brooke upsell callout */}
                  <div className="mb-6 p-4 border border-white/10 rounded-xl bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                      </span>
                      <span className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                        Add-On Available
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      <span className="text-white font-medium">
                        AI Cold Caller (Brooke)
                      </span>{" "}
                      — $2,500/mo + $0.20/min. 200+ calls/day, NEPQ-trained
                      on your offer. Available as a managed add-on after your
                      Partner deploy. Discuss on discovery call.
                    </p>
                  </div>

                  <a
                    href="#booking"
                    className="block text-center px-6 py-4 rounded-full bg-amber-400 text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] transition-transform"
                  >
                    Book Call — $4,997
                  </a>
                  <p className="text-[10px] text-amber-400/60 text-center mt-3">
                    Only 1 seat · Interview required
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.5}>
              <div className="mt-12 text-center">
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-2">
                  5 seats per session · Discovery call required · 100%
                  credited toward full partnership
                </p>
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                  Wire · Card · BTC · ETH · USDC accepted
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* URGENCY BLOCK — after pricing, before FAQ (Brunson proven placement) */}
        <TradersCountdownSection />

        {/* FAQ */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase text-center mb-4">
                Questions
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] text-center mb-16">
                The short answers.
              </h2>
            </Reveal>
            <div className="space-y-4">
              {[
                {
                  q: "Is this a trading course?",
                  a: "No. We don't touch your trading strategy. We build the BUSINESS infrastructure around it — the lead machine, the content engine, the cold caller, the client portal. You bring the alpha. We bring the distribution.",
                },
                {
                  q: "My copy trade results are verified on Myfxbook. Why do I need this?",
                  a: "Verified results are table stakes. There are 500 copy trade providers with verified results. The ones making real money are the ones with an automated distribution machine bringing in funded accounts 24/7. That's what we build.",
                },
                {
                  q: "I already have an IB program earning $5K–$20K/mo. Will this help?",
                  a: "That's the sweet spot. You've proven the model works. Now we automate the pipeline that feeds it. The jump from $20K to $100K/mo in IB commissions isn't more manual work — it's a system that recruits, nurtures, and activates traders without you in the loop.",
                },
                {
                  q: "What broker do I need?",
                  a: "StarTrader integration is native (including portal API, Myfxbook sync, and IB tracking). If you use a different regulated broker, we adapt everything accordingly. The AI systems are broker-agnostic.",
                },
                {
                  q: "I run free signals on Telegram. How does this help me monetize?",
                  a: "Free signals are the best top-of-funnel in trading. We add the conversion layer: automated onboarding into your IB program, upsell to copy trading, and nurture sequences that turn free signal followers into funded accounts. Your free signals become a $10K+/mo business.",
                },
                {
                  q: "What's the performance fee model? Do I pay monthly?",
                  a: "No monthly fees. One-time investment ($1,497–$4,997) for the mastermind session + deployment. After that, your only costs are API fees (~$200–300/mo for the AI stack). We earn through the full partnership if you upgrade later.",
                },
                {
                  q: "What does '100% credited toward full build' mean?",
                  a: "If you later hire us for a full done-for-you deployment ($15K–$25K), every dollar from the mastermind is subtracted. So $4,997 Partner tier + $15K full build = you pay $10,003 for the full build, not $19,997.",
                },
                {
                  q: "Only 5 spots — is that real?",
                  a: "Yes. We build on YOUR operation live during the call. Screen sharing, real deployment, real configuration. That doesn't work with 20 people. 5 operators max per session.",
                },
                {
                  q: "I'm not technical at all. Can I still do this?",
                  a: "Most of our clients aren't. We screen-share and build it FOR you. You watch, learn, and by the end you can manage the dashboard. The AI runs autonomously after setup — you don't need to code anything.",
                },
              ].map((item, i) => (
                <Reveal key={item.q} delay={0.05 * i}>
                  <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                    <h4 className="text-sm font-wide font-bold uppercase tracking-wider mb-3">
                      {item.q}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING CTA */}
        <section
          id="booking"
          className="border-t border-white/5 py-24 md:py-32 px-4 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">
                Book Your Discovery Call
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-7xl font-wide font-bold uppercase tracking-tighter leading-[0.9]">
                5 seats.
                <br />
                <span className="shimmer-text">Your edge deserves scale.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm md:text-base text-zinc-400 max-w-xl mx-auto">
                15 minutes. We learn about your copy trade operation, IB
                structure, and what needs automating. If it&apos;s a fit, we
                schedule your 4-hour build session. If not, we say so
                honestly. No pitch.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-10 px-12 py-5 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-105 transition-transform"
              >
                Book Discovery Call
              </a>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex items-center justify-center gap-3 md:gap-8 mt-10 text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] text-zinc-600 uppercase flex-wrap">
                <span>100% credited</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:block" />
                <span>5 spots</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:block" />
                <span>No pitch</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <section className="border-t border-white/5 py-8 px-4 text-center">
          <p className="text-[10px] text-zinc-700 tracking-wider uppercase">
            Built by Luka Lah · MyNewStaff.ai · Powered by StarFX
          </p>
        </section>
      </main>

      {/* Brooke voice widget — trading ICP configured */}
      <BrookeTradersPopup />

      {/* Sticky urgency bar (appears after hero) */}
      <TradersStickyUrgency />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <a
          href="#booking"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold text-[10px] tracking-[0.15em] uppercase shadow-2xl shadow-white/20 hover:scale-105 transition-transform"
        >
          Book Discovery Call
        </a>
      </div>
    </>
  );
}
