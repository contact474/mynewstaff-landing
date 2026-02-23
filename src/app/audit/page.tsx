import { Navbar } from "@/components/ui/Navbar";
import { HomeStickyNav } from "@/components/ui/HomeStickyNav";
import { Section } from "@/components/ui/Section";
import { Card, Grid } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxSection, ScaleReveal } from "@/components/ui/ScrollEffects";
import { AuditForm } from "@/components/ui/AuditForm";

export const metadata = {
    title: "Free AI Scalability Audit | MyNewStaff.ai",
    description: "Get your free 10-pillar AI scalability report. We scan your website, social media, and marketing stack — then deliver a personalized growth blueprint in under 5 minutes.",
};

export default function Audit() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen relative !overflow-visible bg-black text-white selection:bg-white selection:text-black">
                {/* Hero */}
                <section id="hero" className="h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-30" style={{
                        background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 70%)",
                    }} />
                    <div className="z-10 relative px-4 max-w-[900px]">
                        <Reveal>
                            <span className="block text-xs md:text-sm tracking-[0.25em] mb-6 text-white/50 font-wide shimmer-text">
                                FREE SCALABILITY AUDIT
                            </span>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
                                YOUR GROWTH,<br /> <span className="shimmer-text">SCORED.</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="mt-8 text-sm md:text-base text-zinc-400 font-sans max-w-[560px] mx-auto leading-relaxed">
                                We scan your website, social media, and marketing stack across 10 critical pillars — then deliver a personalized AI-powered growth blueprint. Free. In under 5 minutes.
                            </p>
                        </Reveal>
                        <Reveal delay={0.45}>
                            <a href="#get-audit" className="inline-block mt-10 px-10 py-4 border border-white text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white hover:text-black transition-all duration-300">
                                Get Your Free Audit
                            </a>
                        </Reveal>
                    </div>
                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-600 font-sans">Scroll</span>
                        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
                    </div>
                </section>

                {/* What You Get */}
                <Section id="what-you-get" subtitle="The Report" title={<>10 PILLARS.<br /> <span className="shimmer-text">ONE SCORE.</span></>}>
                    <p className="text-sm md:text-base text-zinc-400 font-sans max-w-[600px] mx-auto leading-relaxed mb-12 md:mb-20">
                        Your AI Scalability Report analyzes every dimension of your business's growth potential — from website performance to marketing automation — and gives you an overall scalability score with specific, actionable recommendations.
                    </p>
                    <Grid>
                        <Card label="Pillar 01" value="Website" desc="Performance, SEO, mobile, speed, conversion elements." />
                        <Card label="Pillar 02" value="Content" desc="Blog cadence, quality signals, topical authority." highlight />
                        <Card label="Pillar 03" value="Social" desc="Platform presence, engagement rate, posting consistency." />
                    </Grid>
                    <Grid className="border-t-0">
                        <Card label="Pillar 04" value="Paid Media" desc="Ad spend efficiency, platform coverage, tracking setup." />
                        <Card label="Pillar 05" value="Email" desc="List health, automation depth, deliverability signals." highlight />
                        <Card label="Pillar 06" value="Analytics" desc="Tracking maturity, attribution, data-driven decisions." />
                    </Grid>
                    <Grid className="border-t-0">
                        <Card label="Pillar 07" value="Reviews" desc="Reputation score, response rate, volume trajectory." />
                        <Card label="Pillar 08" value="Local SEO" desc="Google Business Profile, citations, local pack visibility." highlight />
                        <Card label="Pillar 09" value="Automation" desc="CRM depth, workflow coverage, lead response time." />
                    </Grid>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-white/10">
                        <div className="md:col-start-2">
                            <Card label="Pillar 10" value="Brand" desc="Visual consistency, messaging clarity, competitive positioning." highlight />
                        </div>
                    </div>
                </Section>

                {/* How It Works */}
                <ParallaxSection speed={0.12}>
                    <Section id="how-it-works" subtitle="The Process" title={<>SUBMIT.<br /> <span className="shimmer-text">RECEIVE.</span></>}>
                        <div className="w-full max-w-[800px] mx-auto">
                            {[
                                { step: "01", label: "Enter your details", desc: "Company name, website, and email. That's all we need to start." },
                                { step: "02", label: "AI scans everything", desc: "Our engine crawls your website, social profiles, reviews, and marketing stack in real time." },
                                { step: "03", label: "Get your report", desc: "10-pillar score, interactive slides, PDF download, and AI-narrated voiceover — delivered to your inbox." },
                            ].map((item, i) => (
                                <ScaleReveal key={i} delay={i * 0.1}>
                                    <div className="flex gap-6 md:gap-10 items-start py-8 border-b border-white/10">
                                        <span className="text-3xl md:text-5xl font-wide font-bold text-white/10 shrink-0">{item.step}</span>
                                        <div className="text-left">
                                            <h3 className="font-wide text-lg md:text-xl font-bold uppercase text-white mb-2">{item.label}</h3>
                                            <p className="text-sm text-zinc-500 font-sans leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </ScaleReveal>
                            ))}
                        </div>
                    </Section>
                </ParallaxSection>

                {/* Social Proof / Stats */}
                <Section id="proof" subtitle="The Numbers" title={<>TRUSTED<br /> <span className="shimmer-text">RESULTS.</span></>}>
                    <div className="w-full max-w-[800px] mx-auto border-t border-white/10">
                        {[
                            { label: "Reports Generated", value: "500+" },
                            { label: "Average Score Improvement", value: "3.2X" },
                            { label: "Time To Deliver", value: "< 5 MIN" },
                            { label: "Data Points Analyzed", value: "200+" },
                        ].map((stat, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <div className="flex justify-between items-center py-8 border-b border-white/10">
                                    <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500">{stat.label}</span>
                                    <span className="text-xl md:text-3xl font-wide font-bold shimmer-text">{stat.value}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Section>

                {/* The Form */}
                <section id="get-audit" className="min-h-0 md:min-h-screen py-20 md:py-32 px-4 md:px-8 flex flex-col items-center justify-center relative border-t border-white/5 bg-black">
                    <Reveal className="w-full max-w-[640px] text-center">
                        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">Your Audit</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-6">
                            GET YOUR<br /> <span className="shimmer-text">REPORT.</span>
                        </h2>
                        <p className="text-sm text-zinc-400 font-sans max-w-[480px] mx-auto leading-relaxed mb-12">
                            Fill in the basics below. Our AI engine handles the rest — you'll receive your personalized 10-pillar scalability report within minutes.
                        </p>
                        <AuditForm />
                    </Reveal>
                </section>

                {/* Final CTA */}
                <Section id="final" subtitle="No Risk" title={<>COMPLETELY<br /> <span className="shimmer-text">FREE.</span></>}>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-4">
                        {[
                            "No credit card",
                            "No sales call required",
                            "Results in minutes",
                            "Actionable recommendations",
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500 font-sans">{item}</span>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.4}>
                        <a href="#get-audit" className="inline-block mt-12 px-10 py-4 border border-white text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white hover:text-black transition-all duration-300">
                            Start My Free Audit
                        </a>
                    </Reveal>
                </Section>

            </main>
            <HomeStickyNav />
        </>
    );
}
