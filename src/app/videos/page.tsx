import { Navbar } from "@/components/ui/Navbar";
import { HomeStickyNav } from "@/components/ui/HomeStickyNav";
import { Section } from "@/components/ui/Section";
import { Card, Grid } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

import { VideoPipelineDiagram } from "@/components/diagrams/VideoPipelineDiagram";
import { ViralFormulaDiagram } from "@/components/diagrams/ViralFormulaDiagram";
import { VideoShowcaseCarousel } from "@/components/ui/VideoShowcaseCarousel";
import { VideoTestimonials } from "@/components/ui/VideoTestimonials";
import { VideoFAQ } from "@/components/ui/VideoFAQ";

export default function Videos() {
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
                        filter: "hue-rotate(45deg) contrast(1.2) brightness(0.6)"
                    }}></div>
                    <div className="z-10 relative px-4">
                        <Reveal>
                            <span className="block text-xs md:text-sm tracking-[0.25em] mb-6 text-white/50 font-wide shimmer-text">
                                CONTENT ENGINE
                            </span>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
                                AI VIDEO <br /> <span className="shimmer-text">DOMINATION.</span>
                            </h1>
                        </Reveal>
                    </div>
                </section>

                {/* Section 2: The Shift */}
                <Section id="shift" subtitle="The Shift" title={<>ATTENTION <br /> <span className="shimmer-text">WAR.</span></>}>
                    <div className="max-w-xl mx-auto text-center">
                        <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed">
                            In 2026, text is invisible. Short-form video is the only currency that matters. You either dominate the feed, or you don't exist.
                        </p>
                    </div>
                </Section>

                {/* Section 3: The Offer */}
                <Section id="offer" subtitle="The Offer" title={<>100 VIDEOS. <br /> <span className="shimmer-text">ZERO EFFORT.</span></>}>
                    <VideoPipelineDiagram />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1000px] mx-auto border-t border-l border-white/10 mt-12">
                        <div className="p-12 border-r border-b border-white/10 bg-black text-center flex flex-col items-center justify-center aspect-square">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-4">Volume</span>
                            <h3 className="text-3xl md:text-4xl font-wide uppercase mb-2 text-white">100 VIDEOS</h3>
                            <p className="text-sm text-zinc-500">Per Month. Fully Edited.</p>
                        </div>
                        <div className="p-12 border-r border-b border-white/10 bg-zinc-900 text-center flex flex-col items-center justify-center aspect-square">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-white mb-4">Impact</span>
                            <h3 className="text-3xl md:text-4xl font-wide uppercase mb-2 text-white">OMNIPRESENCE</h3>
                            <p className="text-sm text-zinc-400">TikTok, Reels, Shorts. Everywhere.</p>
                        </div>
                    </div>
                </Section>

                {/* Video Showcase */}
                <Section id="samples" subtitle="The Output" title={<>IMPOSSIBLE <br /> <span className="shimmer-text">QUALITY.</span></>}>
                    <VideoShowcaseCarousel />
                </Section>

                {/* Testimonials */}
                <Section id="testimonials" subtitle="The Validation" title={<>CREATOR <br /> <span className="shimmer-text">RESULTS.</span></>}>
                    <VideoTestimonials />
                </Section>

                {/* Section 4: Formats */}
                <Section id="formats" subtitle="Formats" title={<>FORMAT <br /> <span className="shimmer-text">MASTERY.</span></>}>
                    <Grid>
                        <Card label="Type 01" value="Founders" desc="Authentic stories that build trust." />
                        <Card label="Type 02" value="Value" desc="High-density educational clips." />
                        <Card label="Type 03" value="Viral" desc="Visual-heavy montages for reach." />
                    </Grid>
                </Section>

                {/* Section 5: The Science */}
                <Section id="science" subtitle="The Science" title={<>DATA DRIVEN <br /> <span className="shimmer-text">VIRALITY.</span></>}>
                    <ViralFormulaDiagram />
                    <div className="mt-16">
                        <Grid>
                            <Card label="Analysis" value="Hook Testing" desc="We generate massive variations to identify winning angles instantly." />
                            <Card label="Structure" value="Retention Arch" desc="Pacing, visuals, and audio engineered to keep viewers glued to the screen." highlight />
                            <Card label="Growth" value="Algorithm Lock" desc="Consistent, high-volume posting signals relevance to every major platform." />
                        </Grid>
                    </div>
                </Section>

                {/* Section 6: Network */}
                <Section id="network" subtitle="Distribution" title={<>PLATFORM <br /> <span className="shimmer-text">NATIVE.</span></>}>
                    <div className="w-full max-w-[800px] mx-auto border-t border-white/10">
                        {[
                            { label: "TikTok", value: "DISCOVERY" },
                            { label: "Instagram", value: "BRAND" },
                            { label: "YouTube", value: "SEARCH" }
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
                    <VideoFAQ />
                </Section>

                {/* Section 7: CTA */}
                <Section id="cta" subtitle="Finality" title={<>OWN YOUR <br /> <span className="shimmer-text">NICHE.</span></>}>
                    <div className="text-center mt-8">
                        <a href="https://calendly.com/contact-mynewstaff/mynewstaff-ai-scaling-clone" target="_blank"
                            className="inline-block px-12 py-6 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                        >
                            Own Your Niche
                        </a>
                    </div>
                </Section>

            </main>
            <HomeStickyNav />
        </>
    );
}
