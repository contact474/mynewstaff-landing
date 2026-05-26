import { Navbar } from "@/components/ui/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { SmbHero } from "@/components/smb/SmbHero";
import { SmbMarquee } from "@/components/smb/SmbMarquee";
import { SmbModules } from "@/components/smb/SmbModules";
import {
  TradersStickyUrgency,
  TradersCountdownSection,
} from "@/components/traders/TradersUrgency";
import { BrookeSmbPopup } from "@/components/smb/BrookeSmbPopup";
import { SmbInlineUrgency } from "@/components/smb/SmbInlineUrgency";
import { SmbRevenueCalculator } from "@/components/smb/SmbRevenueCalculator";
import { SmbTestimonials } from "@/components/smb/SmbTestimonials";
import { MastermindQualifier } from "@/components/mastermind/MastermindQualifier";
import type { Metadata } from "next";

export const metadata: Metadata = {
  other: { "content-language": "en" },
  title: "AI Business Mastermind — Online | Luka Lah × Yeram",
  description:
    "4-hour LIVE session. We build an AI revenue machine for YOUR service business — lead gen, content, cold caller, emails, landing pages. The same system that generated $1.1M+ per client. 5 seats.",
  openGraph: {
    title: "AI Business Mastermind — Luka Lah × Yeram",
    description:
      "Stop being the bottleneck. 4 hours. AI systems deployed on your service business. From $2,497.",
  },
};

const APPLY_URL =
  "https://wa.me/13058503664?text=Hey%20Luka!%20I%20want%20in%20on%20the%20AI%20Mastermind%20for%20service%20businesses%20%F0%9F%94%A5";

export default function MastermindPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black">
        <SmbHero />
        <SmbMarquee />

        {/* THE PROBLEM */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">
                The Problem
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-4">
                You ARE the business.
                <br />
                <span className="shimmer-text">That&apos;s why it can&apos;t grow.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed mt-4 mb-12">
                You do the work. You answer the phone. You send the invoices.
                You post on Instagram when you remember. You follow up with
                leads in your head. You&apos;re doing $20K–$500K/mo through
                pure hustle — but every dollar flows through YOU. Remove
                yourself for a week and everything stops.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  {
                    t: "You're the sales team",
                    d: "Every lead requires your personal attention. No follow-up system. No nurture sequence. Leads come in, you call back when you can, half of them already booked someone else.",
                    n: "60% of leads lost to slow response — your competitor answered first",
                  },
                  {
                    t: "You're the marketing department",
                    d: "You know social media works. You see competitors with worse work quality getting more jobs because they post consistently. But who has time to create content when you're on job sites all day?",
                    n: "0 posts this week = 0 new followers = 0 new customers finding you",
                  },
                  {
                    t: "You're the receptionist",
                    d: "Phone rings during a job, goes to voicemail. Customer texts at 11pm, you see it at 7am. By then they've called three other businesses. Every missed call is a missed $2,000–$50,000 job.",
                    n: "The business that answers first wins 78% of the time (Harvard Business Review)",
                  },
                  {
                    t: "You're the architect",
                    d: "No CRM. No pipeline. No automation. No systems. You run the business from your phone, your head, and a spreadsheet. The ceiling isn't your skill — it's your lack of infrastructure.",
                    n: "You don't need to work harder. You need systems that work WITHOUT you.",
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
                  &ldquo;The difference between a $30K/mo service business and a
                  $300K/mo service business is never the quality of the work.
                  It&apos;s the{" "}
                  <span className="text-white font-medium">
                    systems around the work.
                  </span>{" "}
                  You don&apos;t need more hours. You need architecture.&rdquo;
                </p>
                <p className="text-[10px] text-zinc-600 tracking-wider uppercase text-center mt-4">
                  — Luka Lah, MyNewStaff.ai
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* MID-FUNNEL URGENCY — compact, after problem agitation */}
        <SmbInlineUrgency />

        {/* HOW IT WORKS */}
        <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5">
          <Reveal className="max-w-5xl mx-auto text-center">
            <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-16">
              From discovery call{" "}
              <span className="shimmer-text">to systems running without you.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-5xl mx-auto" delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10">
              {[
                {
                  t: "Qualify",
                  d: "15-min discovery call. We learn your business — revenue, team size, what's working and what's held together with tape. If it's a fit, we schedule your session.",
                },
                {
                  t: "Build Live",
                  d: "4-hour online session. Screen share, hands on keyboards. We deploy AI systems on YOUR business — not a demo, not a template. Your brand, your service area, your customers.",
                },
                {
                  t: "Deploy",
                  d: "By session end, at least one system is live — lead scraper pulling local prospects, content engine posting, or email sequences nurturing. Real results, same day.",
                },
                {
                  t: "Scale",
                  d: "30–90 days async access + Yeram's strategic advisory. We tune systems while Yeram expands your decision-making framework — the philosophy behind why some operators scale and others plateau.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-8 md:p-10 flex flex-col ${
                    i > 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""
                  }`}
                >
                  <span className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-wide text-xl uppercase text-white mb-3">{item.t}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">{item.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* HOSTS — Luka + Yeram */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">
                  Your Hosts
                </p>
                <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
                  The builder.{" "}
                  <span className="shimmer-text">The strategist.</span>
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal delay={0.1}>
                <div className="border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/30 transition-colors h-full relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(circle at 80% 80%, rgba(129,140,248,0.2), transparent 60%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center text-2xl font-wide font-bold text-black shadow-[0_20px_60px_rgba(255,255,255,0.15)]" style={{ borderRadius: "30% / 30%" }}>LL</div>
                      <div>
                        <h3 className="text-xl font-wide font-bold uppercase tracking-tight">Luka Lah</h3>
                        <p className="text-xs text-zinc-500 tracking-wider">@ga.god · Founder, MyNewStaff.ai</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      Built the autonomous AI stack behind $1.1M+ per client across real estate,
                      fitness, law, SaaS, consulting, and organic foods. 285+ autonomous agent
                      skills. 18 products. 7 packages. Slovenian Government COVID partnership
                      alum (saved 50% taxpayer budget, 100% campaign success).
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      The same cold callers, content engines, lead scrapers, and deploy
                      pipelines running 7-figure operators — deployed on YOUR service
                      business in one session.
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        ["$1.1M+", "per client"],
                        ["285+", "AI agents"],
                        ["47 hrs", "saved / week"],
                      ].map(([v, l]) => (
                        <div key={l} className="text-center p-3 border border-white/5 rounded-lg">
                          <div className="text-lg font-wide font-bold">{v}</div>
                          <div className="text-[9px] text-zinc-600 uppercase tracking-wider">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/30 transition-colors h-full relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(circle at 80% 20%, rgba(251,191,36,0.15), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08), transparent 60%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-2xl font-wide font-bold text-black shadow-[0_20px_60px_rgba(251,191,36,0.2)]" style={{ borderRadius: "30% / 30%" }}>YM</div>
                      <div>
                        <h3 className="text-xl font-wide font-bold uppercase tracking-tight">Yeram Murillo</h3>
                        <p className="text-xs text-zinc-500 tracking-wider">Strategic Philosopher · AI Co-Founder</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      Mexican philosopher specializing in occult philosophy, hermeticism,
                      and underground strategic traditions most business advisors have
                      never heard of. 15+ years mastering ancient decision-making systems
                      and applying them as pure strategy tools for modern business and
                      expansion. Has privately advised entrepreneurs and political figures
                      at the international level — including direct counsel to Mexico&apos;s
                      Morena party during the consolidation of the 4th Transformation
                      into national power.
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Now co-founder of an AI agency in the United States,
                      fusing ancient philosophical frameworks with future technology.
                      Luka builds the machine. Yeram expands the operator — your
                      decision-making, your strategic vision, your capacity to think
                      at the scale the AI systems now demand.
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        ["15+ yrs", "occult strategy"],
                        ["Morena 4T", "political counsel"],
                        ["AI", "co-founder"],
                      ].map(([v, l]) => (
                        <div key={l} className="text-center p-3 border border-white/5 rounded-lg">
                          <div className="text-sm font-wide font-bold uppercase">{v}</div>
                          <div className="text-[9px] text-zinc-600 uppercase tracking-wider">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* VALUE STACK */}
        <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5">
          <Reveal className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">THE VALUE STACK</span>
              <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
                $241,000/yr of systems.{" "}
                <span className="shimmer-text">From $2,497.</span>
              </h2>
              <p className="text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-6 leading-relaxed">
                Real MNS client pricing. $2,500/mo cold caller, $3,500/mo lead engine,
                $3,000/mo content, $2,500/mo email, $800/mo WhatsApp, $15,000 landing page
                builds. You&apos;d pay this annually as a client. In the mastermind, you learn to
                run it all yourself — or we deploy it for you.
              </p>
            </div>

            {[
              {
                label: "Core AI Systems (what clients pay monthly — you get knowledge or ownership)",
                rows: [
                  ["Lead Generation Engine — $2,000–$3,500/mo (12 months = $42K)", "$42,000/yr"],
                  ["Content Engine — $1,500–$3,000/mo, 5 platforms (12 months = $36K)", "$36,000/yr"],
                  ["AI Cold Caller (Brooke) — $2,500/mo + $0.20/min (12 months = $30K+)", "$30,000/yr"],
                  ["Email Engine — $1,500–$2,500/mo, 4-campaign system (12 months = $30K)", "$30,000/yr"],
                  ["Landing Pages & Funnels — $5,000–$15,000 per build", "$15,000"],
                  ["WhatsApp Bot — $800/mo managed (12 months = $9.6K)", "$9,600/yr"],
                  ["Ad Engine — $2,000/mo + 10% spend (12 months = $24K+)", "$24,000/yr"],
                ],
                subtotal: "$204,600/yr",
              },
              {
                label: "Mindset + Strategy (the Yeram layer — why systems stick)",
                rows: [
                  ["Identity integration coaching — 'I am the business' → 'I run the machine'", "$5,000"],
                  ["90-day growth plan personalized to your service business", "$2,500"],
                  ["Operator mindset framework — delegation, trust, systems-thinking", "$3,000"],
                  ["NEPQ sales scripts for your specific service", "$1,500"],
                  ["Service-specific ad creative + landing page copy", "$2,000"],
                ],
                subtotal: "$14,000",
              },
              {
                label: "Access & Network",
                rows: [
                  ["4 hours live build time with Luka (same rate as $25K clients)", "$8,000"],
                  ["30–90 days async access + Yeram strategic sessions", "$8,000"],
                  ["Private cohort Signal channel — for life", "Priceless"],
                  ["Warm intros to the MNS operator network", "$3,000"],
                ],
                subtotal: "$19,000",
              },
            ].map((section, si) => (
              <div key={si} className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
                  <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans leading-relaxed">0{si + 1} · {section.label}</span>
                  <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans shrink-0">Subtotal: <span className="text-white">{section.subtotal}</span></span>
                </div>
                <div className="border border-white/10 overflow-hidden">
                  {section.rows.map(([item, price], i) => (
                    <div key={i} className={`grid grid-cols-[1fr_auto] ${i < section.rows.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.02] transition-colors`}>
                      <div className="p-3 md:p-5"><span className="text-xs md:text-sm text-white font-sans leading-snug">{item}</span></div>
                      <div className="p-3 md:p-5 border-l border-white/10 text-right"><span className="text-xs md:text-sm text-zinc-500 font-sans line-through decoration-zinc-700 whitespace-nowrap">{price}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-12 border-2 border-white/20 bg-white/[0.03] rounded-2xl p-6 md:p-12 text-center">
              <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">Total Real-World Value</span>
              <div className="text-4xl md:text-7xl font-wide font-bold text-white mb-2">$237,600+</div>
              <div className="text-xs text-zinc-500 font-sans tracking-wider mb-8">Verified against real MNS client invoices across 6 industries.</div>
              <div className="h-px w-32 bg-white/20 mx-auto mb-8" />
              <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">Your Price Today</span>
              <div className="text-3xl md:text-6xl font-wide font-bold mb-2"><span className="shimmer-text">$2,497 — $4,997</span></div>
              <div className="text-xs text-zinc-500 font-sans tracking-wider mb-2">Builder: $2,497 · Partner: $4,997</div>
              <div className="text-xs text-zinc-400 font-sans tracking-wider">100% credited toward full build ($15K–$25K)</div>
              <a href="#booking" className="inline-block mt-8 px-10 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-105 transition-transform">Book Discovery Call</a>
            </div>
          </Reveal>
        </section>

        {/* MODULES */}
        <SmbModules />

        {/* SOCIAL PROOF */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">The Same System. Real Clients.</p>
                <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
                  $1.1M+ per client. <span className="shimmer-text">This year.</span>
                </h2>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { v: "Real Estate", before: "$68K", after: "$958K", lift: "1,309%", leads: "120 → 5,200" },
                { v: "Fitness Studio", before: "$42K", after: "$568K", lift: "1,253%", leads: "340 → 7,900" },
                { v: "Law Practice", before: "$124K", after: "$1.3M", lift: "935%", leads: "48 → 2,300" },
                { v: "SaaS", before: "$52K", after: "$670K", lift: "1,188%", leads: "400 → 11,900" },
                { v: "Organic Foods", before: "$28K", after: "$405K", lift: "1,346%", leads: "620 → 14,900" },
                { v: "Consulting", before: "$10K", after: "$167K", lift: "828%", leads: "24 → 899" },
              ].map((c) => (
                <Reveal key={c.v} delay={0.05}>
                  <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                    <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">{c.v}</span>
                    <div className="flex items-baseline gap-2 mt-3 mb-1">
                      <span className="text-xs text-zinc-600 line-through">{c.before}</span>
                      <span className="text-xl font-wide font-bold">{c.after}</span>
                      <span className="text-[10px] text-green-400/80">↑{c.lift}</span>
                    </div>
                    <span className="text-[10px] text-zinc-600">Leads: {c.leads}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — IG embeds */}
        <SmbTestimonials />

        {/* REVENUE CALCULATOR */}
        <SmbRevenueCalculator />

        {/* WHO IT'S FOR */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal><p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">Who This Is For</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
                Owner-operators who are <span className="shimmer-text">done being the bottleneck.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
                {[
                  { t: "Roofers & Contractors", d: "Doing great work, losing jobs to competitors who answer the phone faster and post on social media daily." },
                  { t: "Plumbers & HVAC", d: "Booked solid from referrals but can't break past the ceiling. No pipeline, no marketing, no systems." },
                  { t: "Dental & Med Spas", d: "Patient acquisition costs rising. Need automated recall, review generation, and content that positions you as premium." },
                  { t: "Law Practices", d: "Intake is a bottleneck. Good cases go to the firm that follows up fastest. That firm should be yours." },
                  { t: "Fitness & Coaching", d: "Your content is your pipeline. Without consistent posting and nurture sequences, you're invisible." },
                  { t: "Real Estate", d: "Lead gen is life. The agent with the best systems wins — not the best agent." },
                  { t: "Landscaping", d: "Seasonal business needs year-round pipeline building. AI nurtures leads all winter so spring is booked." },
                  { t: "Any Service Business", d: "If you're owner-operated, doing $20K–$500K/mo, and your growth ceiling is systems — this is for you." },
                ].map((item) => (
                  <div key={item.t} className="border border-white/10 rounded-xl p-5 hover:border-white/30 transition-colors">
                    <h4 className="text-xs font-wide font-bold uppercase tracking-wider mb-2">{item.t}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRICING */}
        <section id="tiers" className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <Reveal><p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase text-center mb-4">Choose Your Tier</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] text-center mb-4">
                Knowledge or deployment. <span className="shimmer-text">You pick.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-center text-sm text-zinc-500 max-w-xl mx-auto mb-16">
                $2,497 — you learn to run every system with Claude. $4,997 — we deploy it on your business. Both credited 100% toward a full partnership.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* BUILDER */}
              <Reveal delay={0.15}>
                <div className="border-2 border-white rounded-2xl p-8 h-full flex flex-col relative bg-white/[0.03]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full">Learn It</div>
                  <div className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4">Builder</div>
                  <div className="mb-1"><span className="text-4xl md:text-5xl font-wide font-bold">$2,497</span></div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2">You build it. We teach you how.</div>
                  <div className="text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">4-hour live session — Claude mastery + systems knowledge</div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      ["4-hour live session with Luka — screen share, hands on", ""],
                      ["Claude Code pro-level setup — 285+ skills, exact config", "$13,000"],
                      ["Lead generation engine — FIRE system walkthrough", "$3,500"],
                      ["AI email outreach engine — 4-campaign architecture", "$2,500"],
                      ["Content engine — 5-platform autonomous posting", "$3,000"],
                      ["Landing page + funnel templates (89 golden components)", "$5,000"],
                      ["WhatsApp bot setup guide", "$1,500"],
                      ["Yeram: strategic philosophy session — decision frameworks", "$3,000"],
                      ["Session recording + all templates, prompts, configs", "$2,000"],
                      ["Private cohort Signal channel", "for life"],
                      ["30 days async Q&A with Luka + Yeram", "$4,000"],
                      ["100% credited toward full build ($15K–$25K)", ""],
                    ].map(([f, v]) => (
                      <li key={f} className="text-xs md:text-sm text-zinc-300 flex items-start justify-between gap-2">
                        <span className="flex gap-2"><span className="text-green-400/80">+</span>{f}</span>
                        {v && <span className="text-[10px] text-zinc-500 shrink-0 mt-1">{v}</span>}
                      </li>
                    ))}
                  </ul>
                  <a href="#booking" className="block text-center px-6 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] transition-transform">Book Call — $2,497</a>
                  <p className="text-[10px] text-zinc-500 text-center mt-3">Best for operators who can execute with Claude</p>
                </div>
              </Reveal>

              {/* PARTNER */}
              <Reveal delay={0.25}>
                <div className="border border-amber-400/30 rounded-2xl p-8 h-full flex flex-col hover:border-amber-400/60 transition-colors relative bg-gradient-to-b from-amber-500/[0.03] to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full">We Deploy It</div>
                  <div className="text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-4">Partner</div>
                  <div className="mb-1"><span className="text-4xl md:text-5xl font-wide font-bold">$4,997</span></div>
                  <div className="text-[10px] text-amber-400/60 uppercase tracking-wider mb-2">We build it on your business. You own it.</div>
                  <div className="text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">Everything in Builder + lite deploys on your stack</div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      ["Everything in Builder", ""],
                      ["Lite deploy: Lead Gen Engine on your service area", "$3,500/mo value"],
                      ["Lite deploy: Email Engine — 4 campaigns live", "$2,500/mo value"],
                      ["Lite deploy: Content Engine configured + posting", "$3,000/mo value"],
                      ["Lite deploy: WhatsApp Bot on your business number", "$800/mo value"],
                      ["Lite deploy: Landing page on your domain", "$5,000–$15,000"],
                      ["Lite deploy: Ad Engine templates + tracking", "$2,000/mo value"],
                      ["1-on-1 implementation call with Luka (90 min)", "$3,000"],
                      ["Yeram: 4-week strategic expansion program", "$5,000"],
                      ["60 days direct access to Luka + Yeram", "$8,000"],
                      ["200 qualified local leads delivered", "$8,000"],
                      ["Bonus: Custom landing page built by MNS", "$5,000–$15,000"],
                      ["100% credited toward full build ($15K–$25K)", ""],
                    ].map(([f, v]) => (
                      <li key={f} className="text-xs md:text-sm text-zinc-300 flex items-start justify-between gap-2">
                        <span className="flex gap-2"><span className="text-amber-400/80">+</span>{f}</span>
                        {v && <span className="text-[10px] text-amber-400/50 shrink-0 mt-1">{v}</span>}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6 p-4 border border-white/10 rounded-xl bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex w-2 h-2"><span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" /><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" /></span>
                      <span className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Add-On Available</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      <span className="text-white font-medium">AI Cold Caller (Brooke)</span> — $2,500/mo + $0.20/min. 200+ calls/day. Available as managed add-on. Discuss on call.
                    </p>
                  </div>
                  <a href="#booking" className="block text-center px-6 py-4 rounded-full bg-amber-400 text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] transition-transform">Book Call — $4,997</a>
                  <p className="text-[10px] text-amber-400/60 text-center mt-3">Only 1 seat · Interview required</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.5}>
              <div className="mt-12 text-center">
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-2">5 seats per session · Discovery call required · 100% credited toward full partnership</p>
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">Wire · Card · BTC · ETH · USDC accepted</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* URGENCY BLOCK — after pricing, before FAQ (Brunson: pressure → then kill doubts) */}
        <TradersCountdownSection />

        {/* FAQ */}
        <section className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-3xl mx-auto">
            <Reveal><p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase text-center mb-4">Questions</p></Reveal>
            <Reveal delay={0.1}><h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] text-center mb-16">The short answers.</h2></Reveal>
            <div className="space-y-4">
              {[
                { q: "I'm not technical at all. Can I still do this?", a: "That's the whole point. Most of our clients are roofers, dentists, lawyers, and gym owners — not developers. We screen-share and build it FOR you. You watch, learn, and by the end you can manage the dashboard. The AI runs autonomously after setup." },
                { q: "Is this a course?", a: "No. We don't sell information. We deploy systems. The Builder tier teaches you to run them with Claude. The Partner tier — we install them on your business ourselves. Either way, you leave with something running, not a PDF." },
                { q: "Will this work for my industry?", a: "If you're a service business that needs leads, appointments, content, and follow-up — yes. We've done real estate, fitness, law, dental, HVAC, roofing, landscaping, consulting, and more. The distribution problem is identical across all of them." },
                { q: "What does Yeram bring to this?", a: "Yeram is a philosopher who's spent 15+ years mastering strategic decision-making frameworks that most business coaches don't know exist. He privately advised Mexico's Morena party during their rise to national power. When Luka builds the AI systems, Yeram expands the operator — your strategic thinking, your decision-making speed, your ability to operate at the scale the technology now demands." },
                { q: "Why $2,497 when you charge $15K–$25K?", a: "The mastermind is the entry point, not the product. It's how we prove the stack works on YOUR business so you trust us enough to do the full deploy. And every dollar is credited — so if you upgrade, the $4,997 becomes $4,997 off." },
                { q: "What does '100% credited' mean?", a: "If you later hire us for a full done-for-you deployment ($15K–$25K), every dollar from the mastermind is subtracted. $4,997 Partner + $15K full build = you pay $10,003 total. The mastermind isn't a separate cost — it's the first payment." },
                { q: "Only 5 spots — is that real?", a: "Yes. We build on YOUR business live during the call. Screen sharing, real deployment, real configuration. That doesn't work with 20 people. 5 operators max per session so everyone gets hands-on time." },
                { q: "What happens after the 4 hours?", a: "Builder: 30 days async Q&A + Yeram strategic session. Partner: 60 days direct access, weekly Loom progress reviews, 200 leads delivered, and Yeram's 4-week strategic expansion program. You're not left alone." },
              ].map((item, i) => (
                <Reveal key={item.q} delay={0.05 * i}>
                  <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                    <h4 className="text-sm font-wide font-bold uppercase tracking-wider mb-3">{item.q}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING / QUALIFIER + CALENDAR */}
        <MastermindQualifier />

        <section className="border-t border-white/5 py-8 px-4 text-center">
          <p className="text-[10px] text-zinc-700 tracking-wider uppercase">Built by Luka Lah × Yeram · MyNewStaff.ai</p>
        </section>
      </main>

      <BrookeSmbPopup />
      <TradersStickyUrgency />

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <a href="#booking" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold text-[10px] tracking-[0.15em] uppercase shadow-2xl shadow-white/20 hover:scale-105 transition-transform">Book Discovery Call</a>
      </div>
    </>
  );
}
