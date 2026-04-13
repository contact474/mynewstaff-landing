import { Navbar } from "@/components/ui/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { IntensiveHero } from "@/components/intensive/IntensiveHero";
import { IntensiveSteps } from "@/components/intensive/IntensiveSteps";
import { IntensiveValueCompare } from "@/components/intensive/IntensiveValueCompare";
import { IntensiveModules } from "@/components/intensive/IntensiveModules";
import { IntensiveMarquee } from "@/components/intensive/IntensiveMarquee";
import { IntensiveHosts } from "@/components/intensive/IntensiveHosts";
import { BrookeIntensivePopup } from "@/components/intensive/BrookeIntensivePopup";
import { IntensiveFloatingCTA } from "@/components/intensive/IntensiveFloatingCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The AI Intensive — Los Angeles | Luka Lah × Los Silva",
  description:
    "Two and a half days in LA with Luka Lah and Los Silva. Walk in with a business. Walk out with an AI-powered sales, content and delivery machine built live.",
  openGraph: {
    title: "The AI Intensive — LA | Luka Lah × Los Silva",
    description:
      "Build your AI machine live in LA. Hands-on with the tools that run 7-figure operators.",
  },
};

const APPLY_URL =
  "https://wa.me/13058503664?text=Hey%20Luka!%20I%20want%20in%20on%20The%20AI%20Intensive%20in%20LA%20%F0%9F%94%A5";

export default function IntensivePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black">
        {/* HERO — identical to /partners */}
        <IntensiveHero />

        {/* MARQUEE — Netflix/Apple tech stack scroll */}
        <IntensiveMarquee />

        {/* HOW IT WORKS */}
        <IntensiveSteps />

        {/* VALUE COMPARE TABLE — Hormozi stack */}
        <IntensiveValueCompare />

        {/* HOSTS — premium squircle cards with parallax */}
        <IntensiveHosts />

        {/* WHAT WE TEACH + DEPLOY — 6 modules */}
        <IntensiveModules />

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
                Operators doing real numbers
                <br />
                <span className="shimmer-text">ready to 10x with AI.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="grid md:grid-cols-3 gap-4 mt-12 text-left">
                {[
                  {
                    t: "Agency Owners",
                    d: "$30K+/mo shops ready to productize with AI and cut delivery cost by 60%.",
                  },
                  {
                    t: "High-Ticket Coaches",
                    d: "Consultants and coaches who want AI closers, AI content, and AI lead gen baked in.",
                  },
                  {
                    t: "E-Commerce Founders",
                    d: "Shopify and DTC operators looking to weaponize AI across acquisition and retention.",
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

        {/* AGENDA */}
        <section id="agenda" className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase text-center mb-4">
                The Agenda
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] text-center mb-16">
                Three days.
                <br />
                <span className="shimmer-text">One machine built.</span>
              </h2>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  day: "Wed · May 6",
                  tag: "Arrival",
                  title: "Welcome Night",
                  desc: "Hors d'oeuvres, drinks, and warm intros at the venue. Meet the room. Set your outcome for the intensive. Nothing sold, everything set up.",
                  time: "6:00 – 9:30 PM",
                },
                {
                  day: "Thu · May 7",
                  tag: "Build Day",
                  title: "Full Build Day",
                  desc: "Hands on keyboards. We set up Claude Code, the productivity stack, the content engine, the lead system, the cold caller, and the deploy pipeline — on YOUR business, not a demo.",
                  time: "9:00 AM – 6:00 PM",
                },
                {
                  day: "Thu Night",
                  tag: "VIP",
                  title: "Private Dinner (VIP Only)",
                  desc: "Closed-room dinner with Luka, Los, and the VIP tier. Deals get made here. Partnerships get made here. Your next client is probably at this table.",
                  time: "8:00 – 11:00 PM",
                },
                {
                  day: "Fri · May 8",
                  tag: "Ship Day",
                  title: "Ship & Scale",
                  desc: "Deploy everything built Thursday. Plug into your funnel. Leave with a running machine, your 90-day scale plan, and direct access for 30 days post-event.",
                  time: "9:00 AM – 1:00 PM",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={0.05 * i}>
                  <div className="border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/30 hover:bg-white/[0.02] transition-all group">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      <div className="md:w-48 shrink-0">
                        <div className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-1">
                          {item.day}
                        </div>
                        <div className="text-xs text-white/80 font-wide uppercase tracking-wider">
                          {item.tag}
                        </div>
                        <div className="text-[10px] text-zinc-600 mt-2 tracking-wider">
                          {item.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-wide font-bold uppercase tracking-tight mb-3 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING — Hormozi stack style */}
        <section id="tiers" className="border-t border-white/5 py-20 md:py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase text-center mb-4">
                Choose Your Tier
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] text-center mb-4">
                Three ways in.
                <br />
                <span className="shimmer-text">One outcome.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-center text-sm text-zinc-500 max-w-xl mx-auto mb-16">
                Higher tiers stack real dollars of bonuses. Deploy tier is
                insane on purpose — we want 2 operators who go all in.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4">
              {/* GENERAL */}
              <Reveal delay={0.15}>
                <div className="border border-white/10 rounded-2xl p-8 h-full flex flex-col hover:border-white/30 transition-colors">
                  <div className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4">
                    General
                  </div>
                  <div className="mb-1">
                    <span className="text-5xl font-wide font-bold">$1,000</span>
                  </div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">
                    Value: $45,000
                  </div>
                  <div className="text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">
                    Full intensive access
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-4">
                    What&apos;s Included
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      ["Wed welcome night + networking", ""],
                      ["Full Thursday build day (9–6)", ""],
                      ["Friday ship day + demo hour", ""],
                      ["All 6 modules taught live", "$9,500"],
                      ["MNS deploy templates", "$5,000"],
                      ["Content + NEPQ + hook libraries", "$3,500"],
                      ["Private cohort Signal channel", "for life"],
                      ["30 days async Q&A", "$4,000"],
                    ].map(([f, v]) => (
                      <li key={f} className="text-xs md:text-sm text-zinc-400 flex items-start justify-between gap-2">
                        <span className="flex gap-2">
                          <span className="text-green-400/60">+</span>
                          {f}
                        </span>
                        {v && (
                          <span className="text-[10px] text-zinc-600 shrink-0 mt-1">
                            {v}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-4 rounded-full border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase hover:bg-white/5 transition-colors"
                  >
                    Apply — $1,000
                  </a>
                  <p className="text-[10px] text-zinc-600 text-center mt-3">
                    12 seats
                  </p>
                </div>
              </Reveal>

              {/* VIP — FEATURED */}
              <Reveal delay={0.25}>
                <div className="border-2 border-white rounded-2xl p-8 h-full flex flex-col relative bg-white/[0.03]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4">
                    VIP
                  </div>
                  <div className="mb-1">
                    <span className="text-5xl font-wide font-bold">$2,500</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2">
                    Value: $72,000
                  </div>
                  <div className="text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">
                    General + $27,000 of bonuses
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase mb-4">
                    Everything in General, plus
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      ["Thursday VIP private dinner", "$500"],
                      ["Front-row seating + priority help", ""],
                      ["1:1 strategy session w/ Luka (60 min)", "$2,000"],
                      ["1:1 sales teardown w/ Los (60 min)", "$2,000"],
                      ["Your offer rewritten by Los live", "$3,500"],
                      ["Hormozi Offer Stack applied to your biz", "$2,500"],
                      ["Warm intros to 3 MNS clients (JV)", "$5,000"],
                      ["60 days async access (2x General)", "$4,000"],
                      ["First-look on new MNS tools for 12 mo", "$3,000"],
                      ["Event recordings + all raw files", "$1,500"],
                      ["Invite to Cohort 2 at current price", "$3,000"],
                    ].map(([f, v]) => (
                      <li key={f} className="text-xs md:text-sm text-zinc-300 flex items-start justify-between gap-2">
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
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] transition-transform"
                  >
                    Apply for VIP — $2,500
                  </a>
                  <p className="text-[10px] text-zinc-500 text-center mt-3">
                    6 seats · 3 gone
                  </p>
                </div>
              </Reveal>

              {/* DEPLOY — maximum stack */}
              <Reveal delay={0.35}>
                <div className="border border-amber-400/30 rounded-2xl p-8 h-full flex flex-col hover:border-amber-400/60 transition-colors relative bg-gradient-to-b from-amber-500/[0.03] to-transparent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1 rounded-full">
                    Only 2 Seats
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-4">
                    Deploy
                  </div>
                  <div className="mb-1">
                    <span className="text-5xl font-wide font-bold">$5,000</span>
                  </div>
                  <div className="text-[10px] text-amber-400/60 uppercase tracking-wider mb-2">
                    Value: $135,000+
                  </div>
                  <div className="text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">
                    VIP + a done-for-you deploy
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-amber-400/80 uppercase mb-4">
                    Everything in VIP, plus
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      ["Done-for-you light deploy on your stack", "$25,000"],
                      ["Brooke cold caller seeded w/ 1K leads", "$12,000"],
                      ["Content Engine fully configured + running", "$8,000"],
                      ["Custom AI stack on your domain", "$6,000"],
                      ["First week of content generated for you", "$2,500"],
                      ["90 days async access (3x General)", "$6,000"],
                      ["Weekly 30-min Loom reviews for 90 days", "$4,500"],
                      ["Priority Signal line (same-day response)", "$3,000"],
                      ["Luka & Los invested in your first campaign launch", "$5,000"],
                      ["Bonus: Full Ad Engine deploy w/ creatives", "$4,500"],
                      ["Bonus: Custom landing page built by MNS", "$3,500"],
                      ["Bonus: 30-day performance audit by Luka", "$2,500"],
                      ["Bonus: 1-year Cohort 2 Mastermind seat", "$12,000"],
                    ].map(([f, v]) => (
                      <li key={f} className="text-xs md:text-sm text-zinc-300 flex items-start justify-between gap-2">
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
                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-4 rounded-full bg-amber-400 text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] transition-transform"
                  >
                    Apply for Deploy — $5,000
                  </a>
                  <p className="text-[10px] text-amber-400/60 text-center mt-3">
                    2 seats only · interview required
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.5}>
              <div className="mt-12 text-center">
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-2">
                  20 total seats · Application required · No refunds, transferable
                </p>
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                  Wire · Card · BTC · ETH · USDC accepted
                </p>
              </div>
            </Reveal>
          </div>
        </section>

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
                  q: "Why a weekday event?",
                  a: "Because it works. Wed–Fri means you justify it as work, not as time stolen from your family. Operators show up focused.",
                },
                {
                  q: "What laptop / setup do I need?",
                  a: "Any Mac or Windows machine, 16GB RAM preferred. We send a pre-event setup doc the week before so you walk in ready.",
                },
                {
                  q: "Is this a speaker event?",
                  a: "No. This is an intensive. You are on keyboards the entire Thursday building your own system. Talking is for the dinner.",
                },
                {
                  q: "What if I don't ship?",
                  a: "You will. That's the whole point of Friday. If you walk out without something running, we'll schedule a free 1:1 to finish it.",
                },
                {
                  q: "Where in LA?",
                  a: "Private venue in West Hollywood. Exact address sent after application approval.",
                },
                {
                  q: "Can I pay in crypto / wire?",
                  a: "Yes. Wire, card, BTC, ETH, USDC. Payment link sent after application call.",
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

        {/* FINAL CTA */}
        <section className="border-t border-white/5 py-24 md:py-32 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-wide font-bold uppercase tracking-tighter leading-[0.9]">
                20 seats.
                <br />
                <span className="shimmer-text">Don&apos;t wait.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-sm md:text-base text-zinc-400 max-w-xl mx-auto">
                If you&apos;re a real operator and you want AI running your
                business by the end of the month — this is the fastest path.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-10 px-12 py-5 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-105 transition-transform"
              >
                Apply Now
              </a>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="mt-6 text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                Los Angeles · May 6–8, 2026
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Brooke — activates via scroll (40%) + 12s + manual triggers */}
      <BrookeIntensivePopup />

      {/* Floating "Talk to Brooke" CTA */}
      <IntensiveFloatingCTA />
    </>
  );
}
