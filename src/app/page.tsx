import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { HomeStickyNav } from "@/components/ui/HomeStickyNav";
import { SocialProofBar } from "@/components/ui/SocialProofBar";
import { Section } from "@/components/ui/Section";
import { Card, Grid } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import {
  ParallaxSection,
  ScaleReveal,
} from "@/components/ui/ScrollEffects";
import { LaunchScaleDiagram } from "@/components/diagrams/LaunchScaleDiagram";
import { CRMDiagram } from "@/components/diagrams/CRMDiagram";
import { ConversationEngine } from "@/components/diagrams/ConversationEngine";
import { FunnelDiagram } from "@/components/diagrams/FunnelDiagram";
import { ValuationChart } from "@/components/diagrams/ValuationChart";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { FAQ } from "@/components/ui/FAQ";
import { PricingTable } from "@/components/ui/PricingTable";
import { HomeCTA } from "@/components/ui/HomeCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white relative min-h-screen !overflow-visible selection:bg-white selection:text-black pb-20 md:pb-40">
        {/* ═══ HERO — Problem-first hook with above-fold CTA ═══ */}
        <section id="hero" className="h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-60 smooth-zoom-bg" style={{
            backgroundImage: "url('/assets/hero_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
          <div className="z-10 relative px-4 max-w-5xl mx-auto">
            <Reveal>
              <span className="block text-[10px] md:text-xs tracking-[0.35em] mb-6 text-white/40 font-sans uppercase">
                For B2B founders doing $1M–$50M/year
              </span>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
                YOUR PIPELINE <br /> IS <span className="shimmer-text">INVISIBLE.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base md:text-xl text-zinc-400 font-sans mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed">
                We deploy AI-powered content, outreach, and CRM as one autonomous engine — live in 14 days. No contracts. No agencies. Just pipeline.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <Link
                  href="/scalex"
                  className="px-10 py-4 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors"
                >
                  Get Your Free ScaleX AI Score
                </Link>
                <a
                  href="#strategy"
                  className="px-10 py-4 border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase font-sans hover:border-white/40 hover:bg-white/[0.03] transition-all"
                >
                  See How It Works
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ SOCIAL PROOF BAR — Immediately after hero ═══ */}
        <SocialProofBar />

        {/* ═══ THE PROBLEM — Status quo awareness ═══ */}
        <Section id="landscape" subtitle="The Problem" title={<>EVERYONE SELLS <br /> YOU <span className="shimmer-text">PIECES.</span></>}>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  <th className="py-6 px-4 font-normal w-1/3">Option</th>
                  <th className="py-6 px-4 font-normal text-white w-1/3">Investment</th>
                  <th className="py-6 px-4 font-normal w-1/3">Outcome</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                <tr className="border-b border-white/5">
                  <td className="py-6 px-4 font-sans text-zinc-300">In-House Team</td>
                  <td className="py-6 px-4 font-bold font-sans">$300K–$500K/yr</td>
                  <td className="py-6 px-4 text-zinc-500">Slow hiring. Management hell.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-6 px-4 font-sans text-zinc-300">Traditional Agency</td>
                  <td className="py-6 px-4 font-bold font-sans">$60K–$180K/yr</td>
                  <td className="py-6 px-4 text-zinc-500">Reports with no revenue.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-6 px-4 font-sans text-zinc-300">Freelancers</td>
                  <td className="py-6 px-4 font-bold font-sans">$30K–$100K/yr</td>
                  <td className="py-6 px-4 text-zinc-500">Inconsistent execution.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* ═══ THE FRICTION — Emotional trigger ═══ */}
        <Section id="problem" subtitle="The Friction" title={<>YOUR BUSINESS <br /> IS <span className="shimmer-text">INVISIBLE.</span></>}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed">
              70% of buyers never convert because they don&apos;t see you. Your competitors are omnipresent. You are a ghost.
            </p>
          </div>
        </Section>

        {/* ═══ THE ENGINE — Three systems ═══ */}
        <ParallaxSection speed={0.15}>
          <Section id="strategy" subtitle="The Engine" title={<>THREE SYSTEMS. <br /> ONE <span className="shimmer-text">ENGINE.</span></>}>
            <Grid>
              <Card label="System 01" value="AI Content" desc="100+ viral videos monthly to dominate every social feed." />
              <Card label="System 02" value="Hyper-Outreach" desc="10,000+ targeted leads engaged via automated systems." />
              <Card label="System 03" value="Ad Multiplier" desc="Strategic amplification to drown out the competition." />
            </Grid>
            <div className="mt-24">
              <ScaleReveal>
                <CRMDiagram />
              </ScaleReveal>
            </div>
          </Section>
        </ParallaxSection>

        {/* ═══ THE MATH — Dream outcome ROI (Hormozi) ═══ */}
        <Section id="math" subtitle="The Math" title={<>THE ROI THAT MAKES <br /> THIS <span className="shimmer-text">OBVIOUS.</span></>}>
          <div className="max-w-3xl mx-auto">
            {/* Pipeline Math */}
            <div className="border border-white/10">
              <div className="p-6 md:p-10 border-b border-white/10">
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 block mb-6">What You Get Monthly</span>
                <div className="space-y-3 text-sm md:text-base font-sans text-zinc-300">
                  <div className="flex items-start gap-3"><span className="text-white/30 mt-0.5">├</span> 100+ content pieces across 3–5 platforms</div>
                  <div className="flex items-start gap-3"><span className="text-white/30 mt-0.5">├</span> 10,000+ targeted leads scraped &amp; enriched</div>
                  <div className="flex items-start gap-3"><span className="text-white/30 mt-0.5">├</span> AI-personalized outreach sequences</div>
                  <div className="flex items-start gap-3"><span className="text-white/30 mt-0.5">├</span> 24/7 conversation AI qualifying leads</div>
                  <div className="flex items-start gap-3"><span className="text-white/30 mt-0.5">├</span> Full CRM pipeline management</div>
                  <div className="flex items-start gap-3"><span className="text-white/30 mt-0.5">└</span> Weekly performance optimization</div>
                </div>
              </div>
              <div className="p-6 md:p-10 border-b border-white/10 bg-white/[0.02]">
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 block mb-6">Conservative Pipeline Math</span>
                <div className="space-y-4 text-sm md:text-base font-sans">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>10,000 leads scraped</span>
                    <span className="text-white font-bold">→ 2% respond</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>200 conversations</span>
                    <span className="text-white font-bold">→ 10% qualify</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>20 qualified meetings</span>
                    <span className="text-white font-bold">→ 25% close</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400 pt-3 border-t border-white/10">
                    <span>5 new clients/month</span>
                    <span className="text-white font-bold">× $10K avg deal</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="p-6 md:p-10 text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 block mb-2">Your Investment</span>
                  <span className="text-2xl md:text-4xl font-wide font-bold">$8,500<span className="text-base text-zinc-500">/mo</span></span>
                </div>
                <div className="p-6 md:p-10 text-center bg-white/[0.03]">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 block mb-2">Projected Return</span>
                  <span className="text-2xl md:text-4xl font-wide font-bold shimmer-text">$50,000<span className="text-base text-zinc-400">/mo</span></span>
                </div>
              </div>
              <div className="p-4 text-center border-t border-white/10 bg-white/[0.02]">
                <p className="text-xs text-zinc-500 font-sans">
                  Breakeven = <span className="text-white font-bold">1 closed deal.</span> Everything after is profit.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ THE TARGETS — Funnel Diagram ═══ */}
        <Section id="targets" subtitle="The Targets" title={<>PREDICTABLE <br /> <span className="shimmer-text">REVENUE.</span></>}>
          <ScaleReveal>
            <FunnelDiagram />
          </ScaleReveal>
        </Section>

        {/* ═══ THE TIMELINE — 90-Day Mechanism (Hormozi) ═══ */}
        <Section id="timeline" subtitle="The Process" title={<>YOUR FIRST <br /> <span className="shimmer-text">90 DAYS.</span></>}>
          <div className="max-w-3xl mx-auto">
            <div className="border border-white/10">
              {[
                {
                  phase: "Week 1–2",
                  label: "DEPLOY",
                  items: [
                    "ScaleX AI diagnostic maps your gaps",
                    "Brand voice AI trained on your content",
                    "CRM + pipeline configured end-to-end",
                    "Lead scraping pipelines activated",
                    "First 50 content pieces generated",
                  ],
                },
                {
                  phase: "Week 3–4",
                  label: "ENGAGE",
                  items: [
                    "10,000+ leads scraped & enriched",
                    "AI outreach sequences go live",
                    "First qualified meetings booked",
                    "Content distributed across platforms",
                    "Conversation AI handling inbound 24/7",
                  ],
                },
                {
                  phase: "Month 2–3",
                  label: "SCALE",
                  items: [
                    "Pipeline filling predictably",
                    "Ad multiplier activated for amplification",
                    "A/B testing optimizing every touchpoint",
                    "Weekly performance dashboards live",
                    "ROI tracking against guarantee metrics",
                  ],
                },
                {
                  phase: "Day 90",
                  label: "RESULTS",
                  items: [
                    "100+ qualified leads in your pipeline",
                    "Predictable monthly meeting flow established",
                    "Fully autonomous engine running 24/7",
                    "If we missed our guarantee — we keep working free",
                  ],
                },
              ].map((block, i) => (
                <div key={i} className={`p-6 md:p-8 ${i < 3 ? "border-b border-white/10" : ""} ${i === 3 ? "bg-white/[0.03]" : ""}`}>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 shrink-0">{block.phase}</span>
                    <span className="text-lg md:text-xl font-wide font-bold uppercase">{block.label}</span>
                  </div>
                  <div className="space-y-2 pl-0 md:pl-24">
                    {block.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm font-sans text-zinc-400">
                        <span className="text-white/20 mt-0.5">{j < block.items.length - 1 ? "├" : "└"}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ CONVERSATION ENGINE ═══ */}
        <Section id="conversation" subtitle="The Intelligence" title={<>ALWAYS ON. <br /> ALWAYS <span className="shimmer-text">CLOSING.</span></>}>
          <ScaleReveal>
            <ConversationEngine />
          </ScaleReveal>
        </Section>

        {/* ═══ VALUATION CHART ═══ */}
        <Section id="valuation" subtitle="The Asset" title={<>BUILDING <br /> <span className="shimmer-text">VALUATION.</span></>}>
          <ScaleReveal>
            <ValuationChart />
          </ScaleReveal>
        </Section>

        {/* ═══ THE ECOSYSTEM ═══ */}
        <ParallaxSection speed={0.15}>
          <Section id="ecosystem" subtitle="The Ecosystem" title={<>NOT MARKETING. <br /> A <span className="shimmer-text">MACHINE.</span></>}>
            <ScaleReveal>
              <LaunchScaleDiagram />
            </ScaleReveal>
          </Section>
        </ParallaxSection>

        {/* ═══ THE TEAM ═══ */}
        <ParallaxSection speed={0.15}>
          <Section id="team" subtitle="The Architects" title={<>BUILT BY <br /> <span className="shimmer-text">FOUNDERS.</span></>}>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-[900px] mx-auto border-t border-l border-r border-white/10">
              <Card label="Founder" value="LUKA LAH" desc="$300M+ raised across ventures. 90K person network managed. AI Trading Engine Architect." />
              <Card label="Partner" value="YERAM MURILLO" desc="Strategic Advisor to Morena Party. High-Performance Team Architect. Mexican Market Strategy Counsel." />
            </div>
          </Section>
        </ParallaxSection>

        {/* ═══ OBJECTION HANDLING — "You might be thinking..." ═══ */}
        <Section id="objections" subtitle="Objections" title={<>YOU MIGHT BE <br /> <span className="shimmer-text">THINKING...</span></>}>
          <div className="max-w-3xl mx-auto space-y-0 border border-white/10">
            {[
              {
                objection: "\"Another agency with AI buzzwords?\"",
                response: "We don't send you reports. We deploy autonomous systems that book meetings while you sleep. Our clients have 39-template behavioral email sequences, AI voice chatbots, and lead scraping pipelines running 24/7 — all deployed in under 14 days. We build machines, not decks.",
              },
              {
                objection: "\"$8,500/month is a lot.\"",
                response: "It replaces $14K+/month in payroll — content writer, SDR, CRM manager, ad manager. Unlike employees, our system works 24/7, never calls in sick, and scales instantly. The math: 1 closed deal at $10K+ pays for 14 months of service. And there's zero lock-in.",
              },
              {
                objection: "\"What if it doesn't work?\"",
                response: "90-Day Pipeline Guarantee. 100 qualified leads in your pipeline or we continue working at zero cost until we hit that number. We've deployed multiple clients across legal, coaching, hospitality, and franchise verticals. The system works because it's built on data, not hope.",
              },
              {
                objection: "\"I've been burned by agencies before.\"",
                response: "So have most of our clients. That's why we don't do contracts, retainers, or \"strategy phases\" that bill for thinking. We deploy real systems in Week 1. You see pipeline activity in Week 3. If we fail, you walk — no exit fees, no awkward calls.",
              },
            ].map((item, i) => (
              <div key={i} className={`p-6 md:p-8 ${i < 3 ? "border-b border-white/10" : ""}`}>
                <h3 className="text-base md:text-lg font-wide uppercase text-white mb-3">{item.objection}</h3>
                <p className="text-sm font-sans text-zinc-400 leading-relaxed">{item.response}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ PRICING ═══ */}
        <Section id="pricing" subtitle="Investment" title={<>THE VALUE <span className="shimmer-text">STACK.</span></>}>
          <PricingTable />
        </Section>

        {/* ═══ TESTIMONIALS ═══ */}
        <Section id="testimonials" subtitle="The Validation" title={<>MARKET <br /> <span className="shimmer-text">RESPONSE.</span></>}>
          <TestimonialCarousel />
        </Section>

        {/* ═══ FAQ ═══ */}
        <Section id="faq" subtitle="FAQ" title={<>COMMON <br /> <span className="shimmer-text">QUESTIONS.</span></>}>
          <FAQ />
        </Section>

        {/* ═══ FINAL CTA ═══ */}
        <Section id="cta" subtitle="Finality" title={<>READY TO <br /> <span className="shimmer-text">SCALE?</span></>}>
          <div className="text-center mt-12 py-12 md:py-0 relative z-30">
            <div className="inline-block px-8 py-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm mb-4">
              <p className="text-[10px] tracking-[0.4em] uppercase opacity-50">Applications Close March 31 • 3 Spots Left</p>
            </div>
            <p className="text-xs text-zinc-500 font-sans mb-8 max-w-md mx-auto">
              We onboard a maximum of 5 clients per quarter to maintain execution quality.
            </p>

            <div className="pb-[400px] md:pb-0">
              <HomeCTA />
            </div>
          </div>
        </Section>
      </main>
      <HomeStickyNav />
    </>
  );
}
