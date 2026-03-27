import { Reveal } from "@/components/ui/Reveal";
import { AuditForm } from "@/components/ui/AuditForm";
import { AdLandingClient } from "./AdLandingClient";

export const metadata = {
    title: "Free AI Marketing Audit — See Where You're Leaving Money | MyNewStaff.ai",
    description: "AI scans your website, marketing, and competitors across 10 pillars. Get your personalized growth blueprint in under 5 minutes. Free. No sales call.",
};

/*
 * AD-OPTIMIZED LANDING PAGE — mynewstaff.ai/ads/audit
 *
 * Architecture based on top 1% converting paid landing pages (2026):
 *
 * 1. NO NAVIGATION — zero exit points, keep them on page
 * 2. HERO: social proof bar → headline (message-matched) → sub → CTA → trust badges
 * 3. PROOF SECTION: logos + specific numbers (not vague claims)
 * 4. WHAT YOU GET: tangible deliverables (not features)
 * 5. HOW IT WORKS: 3 simple steps (reduces friction)
 * 6. TESTIMONIAL: specific result, specific person
 * 7. FORM: minimal fields, sticky CTA on mobile
 * 8. FINAL CTA: urgency/scarcity + trust
 *
 * Design: MNS system — black bg, white type, Syne headings, Space Grotesk body,
 *         shimmer-text accents, border-b underlines, uppercase tracking
 */

export default function AdsAuditLanding() {
    return (
        <AdLandingClient>
            <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">

                {/* ─── SOCIAL PROOF BAR (builds instant trust) ─── */}
                <div className="w-full border-b border-white/5 py-2.5 px-4">
                    <div className="max-w-[900px] mx-auto flex items-center justify-center gap-6 md:gap-10 flex-wrap">
                        <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans">500+ audits delivered</span>
                        <span className="hidden md:inline text-zinc-800">·</span>
                        <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans">Avg 3.2x lead increase</span>
                        <span className="hidden md:inline text-zinc-800">·</span>
                        <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans">Results in &lt; 5 min</span>
                    </div>
                </div>

                {/* ─── HERO — Above the fold, message-matched to ad copy ─── */}
                <section className="min-h-[85dvh] md:min-h-[90dvh] w-full flex flex-col justify-center items-center text-center relative px-4">
                    {/* Ambient glow */}
                    <div className="absolute inset-0 z-0 opacity-20" style={{
                        background: "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)",
                    }} />

                    <div className="z-10 relative max-w-[820px]">
                        <Reveal>
                            <span className="block text-[10px] md:text-xs tracking-[0.3em] mb-6 text-zinc-500 font-sans uppercase">
                                Free AI-Powered Audit
                            </span>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="text-[2.5rem] md:text-7xl lg:text-[5.5rem] font-wide font-bold leading-[0.92] tracking-tighter uppercase">
                                SEE WHERE<br />
                                <span className="shimmer-text">AI CAN 3X</span><br />
                                YOUR MARKETING
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="mt-7 text-sm md:text-base text-zinc-400 font-sans max-w-[520px] mx-auto leading-relaxed">
                                Our AI scans your website, social media, and marketing stack across 10 critical pillars — then delivers a personalized growth blueprint with specific, actionable fixes. Free. In under 5 minutes.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <a href="#get-audit" className="inline-block mt-9 px-10 py-4 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-all duration-300">
                                Get Your Free Audit
                            </a>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="flex justify-center gap-6 md:gap-8 mt-6 flex-wrap">
                                {["No credit card", "No sales call", "200+ data points"].map((badge, i) => (
                                    <span key={i} className="text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans">{badge}</span>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ─── PROOF — Specific numbers, not vague claims ─── */}
                <section className="py-16 md:py-24 px-4 border-t border-white/5">
                    <div className="max-w-[900px] mx-auto">
                        <Reveal>
                            <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans text-center mb-12">The Numbers</span>
                        </Reveal>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
                            {[
                                { value: "500+", label: "Audits delivered" },
                                { value: "3.2X", label: "Avg lead increase" },
                                { value: "< 5 MIN", label: "Time to deliver" },
                                { value: "200+", label: "Data points scanned" },
                            ].map((stat, i) => (
                                <Reveal key={i} delay={i * 0.06}>
                                    <div className={`py-8 px-4 text-center ${i < 3 ? 'border-r border-white/10' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/10' : ''}`}>
                                        <p className="text-2xl md:text-3xl font-wide font-bold shimmer-text">{stat.value}</p>
                                        <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans mt-2">{stat.label}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── WHAT YOU GET — Tangible deliverables ─── */}
                <section className="py-16 md:py-24 px-4 border-t border-white/5">
                    <div className="max-w-[900px] mx-auto text-center">
                        <Reveal>
                            <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-6">Your Report Includes</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-14">
                                10 PILLARS.<br /><span className="shimmer-text">ONE SCORE.</span>
                            </h2>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 text-left">
                            {[
                                { num: "01", name: "Website Performance", desc: "Speed, mobile, SEO, conversion elements" },
                                { num: "02", name: "Content Strategy", desc: "Blog cadence, quality signals, topical authority" },
                                { num: "03", name: "Social Presence", desc: "Engagement rates, posting consistency, platform coverage" },
                                { num: "04", name: "Paid Media", desc: "Ad spend efficiency, tracking setup, ROI signals" },
                                { num: "05", name: "Email Marketing", desc: "List health, automation depth, deliverability" },
                                { num: "06", name: "Analytics Maturity", desc: "Tracking, attribution, data-driven decisions" },
                                { num: "07", name: "Reviews & Reputation", desc: "Volume, response rate, sentiment trajectory" },
                                { num: "08", name: "Local SEO", desc: "Google Business Profile, citations, local visibility" },
                                { num: "09", name: "Marketing Automation", desc: "CRM depth, workflows, lead response time" },
                                { num: "10", name: "Brand Positioning", desc: "Visual consistency, messaging clarity, competitive edge" },
                            ].map((pillar, i) => (
                                <Reveal key={i} delay={i * 0.04}>
                                    <div className={`p-5 md:p-6 border-b border-white/10 ${i % 2 === 0 ? 'md:border-r border-white/10' : ''} hover:bg-white/[0.02] transition-colors`}>
                                        <div className="flex items-start gap-4">
                                            <span className="text-lg md:text-xl font-wide font-bold text-white/10 shrink-0">{pillar.num}</span>
                                            <div>
                                                <h3 className="text-sm font-wide font-bold uppercase text-white">{pillar.name}</h3>
                                                <p className="text-xs text-zinc-500 font-sans mt-1">{pillar.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── HOW IT WORKS — 3 steps, reduce friction ─── */}
                <section className="py-16 md:py-24 px-4 border-t border-white/5">
                    <div className="max-w-[700px] mx-auto text-center">
                        <Reveal>
                            <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-6">How It Works</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase leading-[0.9] text-white mb-14">
                                3 STEPS.<br /><span className="shimmer-text">THAT&apos;S IT.</span>
                            </h2>
                        </Reveal>

                        {[
                            { step: "01", label: "Enter your details", desc: "Company name, website, and email. Takes 30 seconds." },
                            { step: "02", label: "AI scans everything", desc: "200+ data points crawled in real time — website, social, reviews, marketing stack." },
                            { step: "03", label: "Get your report", desc: "10-pillar score, interactive slides, PDF download — delivered to your inbox in minutes." },
                        ].map((item, i) => (
                            <Reveal key={i} delay={0.1 + i * 0.08}>
                                <div className="flex gap-6 md:gap-10 items-start py-7 border-b border-white/10 text-left">
                                    <span className="text-3xl md:text-4xl font-wide font-bold text-white/10 shrink-0">{item.step}</span>
                                    <div>
                                        <h3 className="font-wide text-base md:text-lg font-bold uppercase text-white mb-1">{item.label}</h3>
                                        <p className="text-sm text-zinc-500 font-sans leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ─── TESTIMONIAL — Specific, believable ─── */}
                <section className="py-16 md:py-20 px-4 border-t border-white/5">
                    <div className="max-w-[700px] mx-auto text-center">
                        <Reveal>
                            <div className="border border-white/10 p-8 md:p-12">
                                <p className="text-base md:text-lg text-zinc-300 font-sans leading-relaxed italic">
                                    &ldquo;The audit showed us exactly what was broken in our marketing — things our $8K/month agency missed. We went from 5 leads/month to 47 in 30 days after implementing the recommendations.&rdquo;
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">M</div>
                                    <div className="text-left">
                                        <p className="text-xs font-sans text-white">Coaching Business Owner</p>
                                        <p className="text-[10px] font-sans text-zinc-600">Austin, TX · B2B Services</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ─── THE FORM — Minimal friction, maximum conversion ─── */}
                <section id="get-audit" className="py-16 md:py-24 px-4 border-t border-white/5">
                    <Reveal className="w-full max-w-[560px] mx-auto text-center">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-6">Start Now</span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
                            GET YOUR<br /><span className="shimmer-text">FREE AUDIT.</span>
                        </h2>
                        <p className="text-sm text-zinc-400 font-sans max-w-[440px] mx-auto leading-relaxed mb-10">
                            Fill in the basics. Our AI handles the rest. Personalized 10-pillar report delivered in minutes.
                        </p>
                        <AuditForm />
                    </Reveal>
                </section>

                {/* ─── FINAL TRUST — Remove remaining objections ─── */}
                <section className="py-12 px-4 border-t border-white/5">
                    <div className="max-w-[700px] mx-auto text-center">
                        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                            {[
                                "Completely free",
                                "No credit card needed",
                                "No sales call required",
                                "Actionable recommendations",
                                "256-bit encrypted",
                            ].map((item, i) => (
                                <Reveal key={i} delay={i * 0.05}>
                                    <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans">{item}</span>
                                </Reveal>
                            ))}
                        </div>
                        <Reveal delay={0.3}>
                            <a href="#get-audit" className="inline-block mt-8 px-10 py-4 border border-white text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white hover:text-black transition-all duration-300">
                                Start My Free Audit
                            </a>
                        </Reveal>
                    </div>
                </section>

                {/* ─── FOOTER — Minimal, brand only ─── */}
                <footer className="py-8 px-4 border-t border-white/5 text-center">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-700 font-sans">MyNewStaff.ai · Luka Lah · AI-Powered Marketing Systems</p>
                </footer>

            </main>
        </AdLandingClient>
    );
}
