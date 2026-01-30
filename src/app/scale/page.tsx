import { Navbar } from "@/components/ui/Navbar";
import { HomeStickyNav } from "@/components/ui/HomeStickyNav";
import { Section } from "@/components/ui/Section";
import { Card, Grid } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

import { ComparisonTable } from "@/components/diagrams/ComparisonTable";
import { ProcessMap } from "@/components/diagrams/ProcessMap";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { FAQ } from "@/components/ui/FAQ";

import {
    SpeedDiagram, ReliabilityDiagram, EfficiencyDiagram,
    ProspectorDiagram, NurtureDiagram, CloserDiagram
} from "@/components/diagrams/CapabilityDiagrams";

export default function Scale() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-white selection:text-black">
                {/* Hero */}
                <section id="hero" className="h-[100dvh] w-full flex flex-col justify-center items-center text-center relative">
                    <div className="absolute inset-0 z-0 opacity-60" style={{
                        backgroundImage: "url('/assets/hero_bg.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}></div>
                    <div className="z-10 relative px-4">
                        <Reveal>
                            <span className="block text-xs md:text-sm tracking-[0.25em] mb-6 text-white/50 font-wide shimmer-text">
                                THE BLUEPRINT
                            </span>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <h1 className="text-4xl md:text-8xl lg:text-9xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
                                SCALE YOUR <br /> <span className="shimmer-text">GROWTH.</span>
                            </h1>
                        </Reveal>
                    </div>
                </section>

                {/* Section 2: The Shift */}
                <Section id="shift" subtitle="The Shift" title={<>OBSOLETE <br /> <span className="shimmer-text">MODEL.</span></>}>
                    <div className="w-full overflow-x-auto px-4 pb-4">
                        <ComparisonTable />
                    </div>
                </Section>

                {/* Section 3: Process */}
                <Section id="services" subtitle="Our Process" title={<>COMPLETE <br /> <span className="shimmer-text">DOMINATION.</span></>}>
                    <ProcessMap />
                </Section>

                {/* Section 4: Advantage */}
                <Section id="advantage" subtitle="The Advantage" title={<>HIRE <br /> <span className="shimmer-text">INTELLIGENCE.</span></>}>
                    <Grid>
                        <Card label="Speed" value="Instant Scale" desc="Spin up 1 or 100 AI agents instantly. No onboarding. No training ramp.">
                            <SpeedDiagram />
                        </Card>
                        <Card label="Reliability" value="Perfect Recall" desc="Your AI staff never forgets a lead, a follow-up, or a critical detail." highlight>
                            <ReliabilityDiagram />
                        </Card>
                        <Card label="Efficiency" value="Zero Overhead" desc="1/10th the cost of human teams. 100x the output capacity.">
                            <EfficiencyDiagram />
                        </Card>
                    </Grid>
                </Section>

                {/* Section 5: Capabilities */}
                <Section id="capabilities" subtitle="Capabilities" title={<>DIGITAL <br /> <span className="shimmer-text">WORKFORCE.</span></>}>
                    <Grid>
                        <Card label="Role 01" value="Prospector" desc="Scrapes and enriches 10k+ leads.">
                            <ProspectorDiagram />
                        </Card>
                        <Card label="Role 02" value="Nurture" desc="Intelligent SMS & Email follow-up.">
                            <NurtureDiagram />
                        </Card>
                        <Card label="Role 03" value="Closer" desc="Books qualified meetings automatically.">
                            <CloserDiagram />
                        </Card>
                    </Grid>
                </Section>

                {/* Testimonials */}
                <Section id="testimonials" subtitle="The Validation" title={<>MARKET <br /> <span className="shimmer-text">RESPONSE.</span></>}>
                    <TestimonialCarousel />
                </Section>

                {/* Section 6: Economics */}
                <Section id="economics" subtitle="The Math" title={<>UNFAIR <br /> <span className="shimmer-text">RETURNS.</span></>}>
                    <div className="w-full max-w-[800px] mx-auto border-t border-white/10">
                        {[
                            { label: "Cost Reduction", value: "90%" },
                            { label: "Output Increase", value: "10X" },
                            { label: "Time To Launch", value: "7 DAYS" }
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

                {/* Section 7: CTA */}
                <Section id="cta" subtitle="Finality" title={<>READY TO <br /> <span className="shimmer-text">SCALE?</span></>}>
                    <div className="text-center mt-8">
                        <a href="https://calendly.com/contact-mynewstaff/mynewstaff-ai-meeting-clone" target="_blank"
                            className="inline-block px-12 py-6 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                        >
                            Book Your Strategy Call
                        </a>
                    </div>
                </Section>

            </main>
            <HomeStickyNav />
        </>
    );
}
