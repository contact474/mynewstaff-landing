import { Navbar } from "@/components/ui/Navbar";
import { HomeStickyNav } from "@/components/ui/HomeStickyNav";
import { Section } from "@/components/ui/Section";
import { Card, Grid } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import {
  ParallaxSection,
  ScaleReveal,
  HorizontalSlide,
} from "@/components/ui/ScrollEffects";
import { LaunchScaleDiagram } from "@/components/diagrams/LaunchScaleDiagram";
import { CRMDiagram } from "@/components/diagrams/CRMDiagram";
import { ConversationEngine } from "@/components/diagrams/ConversationEngine";
import { FunnelDiagram } from "@/components/diagrams/FunnelDiagram";
import { ValuationChart } from "@/components/diagrams/ValuationChart";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { FAQ } from "@/components/ui/FAQ";
import { HomeCTA } from "@/components/ui/HomeCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white relative min-h-screen !overflow-visible selection:bg-white selection:text-black pb-20 md:pb-40">
        {/* Hero — smooth-zoom-bg applies the continuous 1.0→1.05 zoom animation */}
        <section id="hero" className="h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-60 smooth-zoom-bg" style={{
            backgroundImage: "url('/assets/hero_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
          <div className="z-10 relative px-4">
            <Reveal>
              <span className="block text-xs md:text-sm tracking-[0.25em] mb-6 text-white/50 font-wide shimmer-text">
                EST. 2026 • REVENUE MACHINES
              </span>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-4xl md:text-8xl lg:text-9xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
                WE BUILD <br /> REVENUE <br /> MACHINES.
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Chapter 3: The Landscape */}
        <Section id="landscape" subtitle="The Landscape" title={<>EVERYONE SELLS <br /> YOU <span className="shimmer-text">PIECES.</span></>}>
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
                  <td className="py-6 px-4 font-bold font-sans">$300K - $500K/yr</td>
                  <td className="py-6 px-4 text-zinc-500">Slow hiring. Management hell.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-6 px-4 font-sans text-zinc-300">Traditional Agency</td>
                  <td className="py-6 px-4 font-bold font-sans">$60K - $180K/yr</td>
                  <td className="py-6 px-4 text-zinc-500">Reports with no revenue.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-6 px-4 font-sans text-zinc-300">Freelancers</td>
                  <td className="py-6 px-4 font-bold font-sans">$30K - $100K/yr</td>
                  <td className="py-6 px-4 text-zinc-500">Inconsistent execution.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Chapter 2: The Friction */}
        <Section id="problem" subtitle="The Friction" title={<>YOUR BUSINESS <br /> IS <span className="shimmer-text">INVISIBLE.</span></>}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed">
              70% of buyers never convert because they don&apos;t see you. Your competitors are omnipresent. You are a ghost.
            </p>
          </div>
        </Section>

        {/* Chapter 3: The Engine */}
        <ParallaxSection speed={0.15}>
          <Section id="strategy" subtitle="The Engine" title={<>THREE SYSTEMS. <br /> ONE <span className="shimmer-text">ENGINE.</span></>}>
            <Grid>
              <Card label="System 01" value="AI Content" desc="100+ viral videos monthly to dominate every social feed." />
              <Card label="System 02" value="Hyper-Outreach" desc="10,000+ targeted leads engaged via automated systems." />
              <Card label="System 03" value="Ad Multiplier" desc="Strategic amplification to drown out the competition." />
            </Grid>
            {/* CRM Diagram */}
            <div className="mt-24">
              <ScaleReveal>
                <CRMDiagram />
              </ScaleReveal>
            </div>
          </Section>
        </ParallaxSection>

        {/* The Targets Diagram */}
        <Section id="targets" subtitle="The Targets" title={<>PREDICTABLE <br /> <span className="shimmer-text">REVENUE.</span></>}>
          <ScaleReveal>
            <FunnelDiagram />
          </ScaleReveal>
        </Section>

        {/* Conversation Engine */}
        <Section id="conversation" subtitle="The Intelligence" title={<>ALWAYS ON. <br /> ALWAYS <span className="shimmer-text">CLOSING.</span></>}>
          <ScaleReveal>
            <ConversationEngine />
          </ScaleReveal>
        </Section>

        {/* The Vision (Valuation Chart) */}
        <Section id="valuation" subtitle="The Asset" title={<>BUILDING <br /> <span className="shimmer-text">VALUATION.</span></>}>
          <ScaleReveal>
            <ValuationChart />
          </ScaleReveal>
        </Section>

        {/* Chapter 5: The Ecosystem */}
        <ParallaxSection speed={0.15}>
          <Section id="ecosystem" subtitle="The Ecosystem" title={<>NOT MARKETING. <br /> A <span className="shimmer-text">MACHINE.</span></>}>
            <ScaleReveal>
              <LaunchScaleDiagram />
            </ScaleReveal>
          </Section>
        </ParallaxSection>

        {/* Chapter 6: The Team */}
        <ParallaxSection speed={0.15}>
          <Section id="team" subtitle="The Architects" title={<>BUILT BY <br /> <span className="shimmer-text">FOUNDERS.</span></>}>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-[900px] mx-auto border-t border-l border-r border-white/10">
              <Card label="Founder" value="LUKA LAH" desc="$300M+ raised across ventures. 90K person network managed. AI Trading Engine Architect." />
              <Card label="Partner" value="YERAM MURILLO" desc="Strategic Advisor to Morena Party. High-Performance Team Architect. Mexican Market Strategy Counsel." />
            </div>
          </Section>
        </ParallaxSection>

        {/* Chapter 7: Pricing */}
        <Section id="pricing" subtitle="Investment" title={<>THREE <span className="shimmer-text">PACKAGES.</span></>}>
          <Grid>
            <HorizontalSlide direction="left" delay={0}>
              <Card
                label="Starter"
                value="$1.5K - $2.5K"
                desc="Per Month. $3K Setup."
                detail="Ideal for validation. Includes our viral content engine and basic CRM setup. 1 Platform."
              />
            </HorizontalSlide>
            <HorizontalSlide direction="right" delay={0.1}>
              <Card
                label="Engine ⭐"
                value="$8K - $45K"
                desc="Most Popular. Full Scale."
                highlight
                detail="The complete growth stack. Multi-platform viral distribution, 10k monthly leads scraping, and full automated outreach."
              />
            </HorizontalSlide>
            <HorizontalSlide direction="left" delay={0.2}>
              <Card
                label="Enterprise"
                value="$25K+"
                desc="Franchise Scale."
                detail="Franchise-level domination. Custom AI models, dedicated support team, and unlimited lead volume."
              />
            </HorizontalSlide>
          </Grid>
        </Section>

        {/* Testimonials */}
        <Section id="testimonials" subtitle="The Validation" title={<>MARKET <br /> <span className="shimmer-text">RESPONSE.</span></>}>
          <TestimonialCarousel />
        </Section>

        {/* Chapter 4: The Proof */}
        <Section id="results" subtitle="The Proof" title={<>UNFAIR <br /> <span className="shimmer-text">ADVANTAGES.</span></>}>
          <div className="w-full max-w-[800px] mx-auto border-t border-white/10">
            {[
              { label: "Deployment", value: "7-14 DAYS" },
              { label: "Volume", value: "100+ ASSETS" },
              { label: "Outcome", value: "3-5X GROWTH" }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center py-8 border-b border-white/10">
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500">{stat.label}</span>
                <span className="text-xl md:text-3xl font-wide font-bold shimmer-text">{stat.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" subtitle="FAQ" title={<>COMMON <br /> <span className="shimmer-text">QUESTIONS.</span></>}>
          <FAQ />
        </Section>

        {/* Chapter 5: The Finality */}
        <Section id="cta" subtitle="Finality" title={<>READY TO <br /> <span className="shimmer-text">SCALE?</span></>}>
          <div className="text-center mt-12 py-12 md:py-0 relative z-30">
            <div className="inline-block px-8 py-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm mb-8">
              <p className="text-[10px] tracking-[0.4em] uppercase opacity-50">Exclusive Onboarding • Jan 2026</p>
            </div>

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
