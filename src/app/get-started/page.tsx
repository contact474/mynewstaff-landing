import { Reveal } from "@/components/ui/Reveal";
import { ScaleReveal, ParallaxSection } from "@/components/ui/ScrollEffects";
import { AdsLeadForm } from "@/components/ui/AdsLeadForm";
import AdsPageFAQ from "@/components/ui/AdsPageFAQ";

export const metadata = {
    title: "Get 30+ Qualified Leads Per Month | MyNewStaff.ai",
    description: "Our AI marketing system runs your entire lead generation on autopilot. Get your free marketing audit — no agencies, no hiring, no guesswork.",
};

// ─── Pain point icons ────────────────────────────────────────────────────────

const IconBurn = () => (
    <svg className="w-7 h-7 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
    </svg>
);

const IconUser = () => (
    <svg className="w-7 h-7 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const IconClock = () => (
    <svg className="w-7 h-7 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// ─── Comparison table data ────────────────────────────────────────────────────

const comparisonRows = [
    { label: "Monthly Cost",     mns: "$1,997–$4,997", agency: "$5K–$20K",   inhouse: "$8K–$15K",  diy: "Your time" },
    { label: "Time to Results",  mns: "7–14 days",     agency: "60–90 days", inhouse: "6–12 months",diy: "Never?" },
    { label: "Your Effort",      mns: "< 30 min/week", agency: "High",       inhouse: "High",       diy: "Full-time" },
    { label: "24/7 Operation",   mns: "Yes",            agency: "No",         inhouse: "No",         diy: "No" },
    { label: "Qualified Leads",  mns: "30+/month",     agency: "Reports",    inhouse: "Maybe",      diy: "Inconsistent" },
    { label: "Guarantee",        mns: "90-Day",         agency: "None",       inhouse: "None",       diy: "None" },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqItems = [
    {
        q: "How long until I see results?",
        a: "Most clients see their first qualified leads within 7–14 days of onboarding. Our systems are pre-built — we configure and deploy, not build from scratch. The BCC Legal build went from zero to live in 12 days with 39 email templates and a full lead pipeline running.",
    },
    {
        q: "What if it doesn't work for my business?",
        a: "We offer a 90-Day Pipeline Guarantee: if you don't get at least 30 qualified leads in your pipeline within 90 days, we keep working at zero cost until you do. No contracts. No exit fees. Zero risk.",
    },
    {
        q: "How much does it cost?",
        a: "Plans start at $1,997/month. That replaces $14K+ in payroll — content writer, SDR, CRM manager, ad manager, and tool subscriptions. The math: breakeven is literally one closed deal. Everything after that is pure profit.",
    },
    {
        q: "How is this different from a regular marketing agency?",
        a: "Agencies send reports. We send leads. Our AI system runs campaigns, generates content, qualifies leads, and handles follow-ups autonomously — 24/7, without you managing it. You review results once a week. That's it.",
    },
    {
        q: "What industries do you work with?",
        a: "We've deployed across roofing, dental, legal, real estate, SaaS, coaching, restaurants, and franchise verticals. If your business closes deals, we can build you a lead machine. The audit tells us exactly how — free of charge.",
    },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GetStartedPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-black">

            {/* ══ HERO ══════════════════════════════════════════════════════════ */}
            <section
                id="hero"
                className="min-h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden px-4"
            >
                {/* Radial glow background */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)",
                    }}
                />
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 inset-x-0 h-32 z-0 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, #09090b)" }}
                />

                <div className="relative z-10 max-w-[860px] w-full">
                    {/* Eyebrow */}
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-violet-500/20 bg-violet-500/5 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-violet-400 font-sans">
                                AI Lead Generation System
                            </span>
                        </div>
                    </Reveal>

                    {/* Headline */}
                    <Reveal delay={0.1}>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-wide font-bold leading-[0.92] tracking-tighter uppercase mb-6">
                            GET 30+{" "}
                            <span className="shimmer-text">QUALIFIED</span>
                            <br />LEADS PER MONTH
                        </h1>
                    </Reveal>

                    {/* Sub */}
                    <Reveal delay={0.22}>
                        <p className="text-base md:text-lg text-zinc-400 font-sans max-w-[600px] mx-auto leading-relaxed mb-4">
                            Without Hiring a Marketing Team.
                        </p>
                        <p className="text-sm md:text-base text-zinc-500 font-sans max-w-[560px] mx-auto leading-relaxed">
                            Our AI marketing system runs your entire lead generation on autopilot while you focus on closing deals.
                        </p>
                    </Reveal>

                    {/* CTA */}
                    <Reveal delay={0.34}>
                        <div className="mt-10">
                            <a
                                href="#audit-form"
                                className="inline-block px-10 py-5 bg-white text-black font-bold text-[11px] tracking-[0.3em] uppercase font-sans hover:bg-zinc-100 active:scale-[0.98] transition-all duration-150"
                            >
                                Get Your Free Marketing Audit
                            </a>
                        </div>
                    </Reveal>

                    {/* Social proof bar */}
                    <Reveal delay={0.44}>
                        <p className="mt-8 text-[11px] tracking-[0.2em] uppercase text-zinc-600 font-sans">
                            Trusted by{" "}
                            <span className="text-white">47+ businesses</span>{" "}
                            across{" "}
                            <span className="text-white">12 industries</span>
                        </p>
                    </Reveal>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-700 font-sans">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
                </div>
            </section>

            {/* ══ PROBLEM ═══════════════════════════════════════════════════════ */}
            <section
                id="problem"
                className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950"
            >
                <div className="max-w-[1100px] mx-auto">
                    <Reveal className="text-center mb-16 md:mb-20">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-5">
                            Sound Familiar?
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white">
                            THE MARKETING<br />
                            <span className="shimmer-text">TRAP.</span>
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/8">
                        {[
                            {
                                icon: <IconBurn />,
                                label: "The Agency Trap",
                                desc: "Spending $5K+/month on agencies that send reports but no leads?",
                                num: "01",
                            },
                            {
                                icon: <IconUser />,
                                label: "The Hire Trap",
                                desc: "Hiring marketers who quit after 6 months — taking all the knowledge with them?",
                                num: "02",
                            },
                            {
                                icon: <IconClock />,
                                label: "The DIY Trap",
                                desc: "Doing all the marketing yourself because nobody else gets it?",
                                num: "03",
                            },
                        ].map((item, i) => (
                            <ScaleReveal key={i} delay={i * 0.12}>
                                <div className={`p-8 md:p-10 border-white/8 h-full flex flex-col gap-5 ${i < 2 ? "md:border-r" : ""} ${i > 0 ? "border-t md:border-t-0" : ""}`}>
                                    <div className="flex items-start justify-between">
                                        {item.icon}
                                        <span className="text-4xl font-wide font-bold text-white/5">{item.num}</span>
                                    </div>
                                    <h3 className="text-sm tracking-[0.2em] uppercase font-sans text-zinc-400">
                                        {item.label}
                                    </h3>
                                    <p className="text-xl md:text-2xl font-wide font-bold text-white leading-snug">
                                        {item.desc}
                                    </p>
                                </div>
                            </ScaleReveal>
                        ))}
                    </div>

                    <Reveal delay={0.3} className="text-center mt-12">
                        <p className="text-zinc-500 font-sans text-sm md:text-base max-w-[560px] mx-auto leading-relaxed">
                            Every one of these paths burns cash, time, or energy you don&apos;t have. There&apos;s a fourth option.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
            <ParallaxSection speed={0.08}>
                <section
                    id="how-it-works"
                    className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-black"
                >
                    <div className="max-w-[900px] mx-auto">
                        <Reveal className="text-center mb-16 md:mb-20">
                            <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-5">
                                The System
                            </span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white">
                                HOW IT<br />
                                <span className="shimmer-text">WORKS.</span>
                            </h2>
                        </Reveal>

                        <div className="w-full">
                            {[
                                {
                                    step: "01",
                                    label: "We analyze your business and build your AI marketing system",
                                    desc: "We scan your offer, audience, and competitive landscape — then configure your full lead generation engine in 7 days. No 90-day onboarding. No waiting.",
                                    accent: "violet",
                                },
                                {
                                    step: "02",
                                    label: "The system creates and runs campaigns automatically",
                                    desc: "AI generates ad creatives, writes copy, manages budgets, A/B tests audiences, and optimizes in real time. It runs 24/7 without you touching it.",
                                    accent: "violet",
                                },
                                {
                                    step: "03",
                                    label: "You get qualified leads in your inbox — ready to close",
                                    desc: "Leads are scored, pre-qualified, and delivered with full context. Your only job is showing up to the conversation and closing the deal.",
                                    accent: "emerald",
                                },
                            ].map((item, i) => (
                                <ScaleReveal key={i} delay={i * 0.1}>
                                    <div className="flex gap-8 md:gap-12 items-start py-10 border-b border-white/8 last:border-b-0">
                                        <span className="text-5xl md:text-7xl font-wide font-bold text-white/5 shrink-0 leading-none">
                                            {item.step}
                                        </span>
                                        <div>
                                            <h3 className="font-wide text-lg md:text-xl lg:text-2xl font-bold uppercase text-white mb-3 leading-snug">
                                                {item.label}
                                            </h3>
                                            <p className="text-sm md:text-base text-zinc-500 font-sans leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </ScaleReveal>
                            ))}
                        </div>
                    </div>
                </section>
            </ParallaxSection>

            {/* ══ COMPARISON TABLE ══════════════════════════════════════════════ */}
            <section
                id="comparison"
                className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950 overflow-x-auto"
            >
                <div className="max-w-[1100px] mx-auto">
                    <Reveal className="text-center mb-12 md:mb-16">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-5">
                            The Comparison
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white">
                            WHY <span className="shimmer-text">MNS</span><br />
                            WINS EVERY TIME.
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="min-w-[600px]">
                            {/* Header */}
                            <div className="grid grid-cols-5 border border-white/8 mb-0">
                                <div className="p-4 md:p-5 border-r border-white/8">
                                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans"></span>
                                </div>
                                {[
                                    { label: "MNS AI", highlight: true },
                                    { label: "Agency", highlight: false },
                                    { label: "In-House", highlight: false },
                                    { label: "DIY", highlight: false },
                                ].map((col, i) => (
                                    <div
                                        key={i}
                                        className={`p-4 md:p-5 text-center ${i < 3 ? "border-r border-white/8" : ""} ${col.highlight ? "bg-violet-500/8" : ""}`}
                                    >
                                        <span className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans font-bold ${col.highlight ? "text-violet-400" : "text-zinc-500"}`}>
                                            {col.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Rows */}
                            {comparisonRows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className="grid grid-cols-5 border-x border-b border-white/8"
                                >
                                    <div className="p-4 md:p-5 border-r border-white/8 flex items-center">
                                        <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-zinc-500 font-sans">
                                            {row.label}
                                        </span>
                                    </div>
                                    {[row.mns, row.agency, row.inhouse, row.diy].map((val, ci) => (
                                        <div
                                            key={ci}
                                            className={`p-4 md:p-5 text-center flex items-center justify-center ${ci < 3 ? "border-r border-white/8" : ""} ${ci === 0 ? "bg-violet-500/5" : ""}`}
                                        >
                                            {ci === 0 ? (
                                                <span className="text-xs md:text-sm font-bold font-sans text-white">
                                                    {val}
                                                </span>
                                            ) : (
                                                <span className="text-xs md:text-sm font-sans text-zinc-500">
                                                    {val}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══ RESULTS ═══════════════════════════════════════════════════════ */}
            <section
                id="results"
                className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-black"
            >
                <div className="max-w-[1100px] mx-auto">
                    <Reveal className="text-center mb-12 md:mb-16">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-5">
                            Real Numbers
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white">
                            RESULTS THAT<br />
                            <span className="shimmer-text">SPEAK.</span>
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/8">
                        {[
                            {
                                industry: "Home Services",
                                label: "Roofing Company",
                                before: "8",
                                after: "43",
                                unit: "leads/month",
                                timeline: "30 days",
                                detail: "Cold market. Zero existing funnel. Scaled from local referrals only.",
                                accentClass: "text-emerald-400",
                                borderAccent: "border-emerald-500/20",
                                bgAccent: "bg-emerald-500/5",
                            },
                            {
                                industry: "Medical",
                                label: "Dental Practice",
                                before: "12",
                                after: "47",
                                unit: "new patients/month",
                                timeline: "45 days",
                                detail: "Replaced $6K/month agency spend. Now generating patients at $42 CPL.",
                                accentClass: "text-violet-400",
                                borderAccent: "border-violet-500/20",
                                bgAccent: "bg-violet-500/5",
                            },
                            {
                                industry: "Technology",
                                label: "SaaS Startup",
                                before: "0",
                                after: "127",
                                unit: "demo requests",
                                timeline: "60 days",
                                detail: "Pre-product launch. Built entire demand engine from scratch.",
                                accentClass: "text-sky-400",
                                borderAccent: "border-sky-500/20",
                                bgAccent: "bg-sky-500/5",
                            },
                        ].map((c, i) => (
                            <ScaleReveal key={i} delay={i * 0.1}>
                                <div className={`p-8 md:p-10 h-full flex flex-col border-white/8 ${i < 2 ? "md:border-r" : ""} ${i > 0 ? "border-t md:border-t-0" : ""}`}>
                                    {/* Industry tag */}
                                    <span className="text-[9px] tracking-[0.25em] uppercase text-zinc-600 font-sans mb-4">
                                        {c.industry}
                                    </span>

                                    {/* Label */}
                                    <h3 className="text-base font-wide font-bold uppercase text-white mb-6">
                                        {c.label}
                                    </h3>

                                    {/* Numbers */}
                                    <div className="flex items-end gap-4 mb-2">
                                        <div>
                                            <span className="text-3xl md:text-4xl font-wide font-bold text-zinc-600">{c.before}</span>
                                        </div>
                                        <svg className="w-5 h-5 text-zinc-600 mb-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                        <div>
                                            <span className={`text-3xl md:text-4xl font-wide font-bold ${c.accentClass}`}>{c.after}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-600 font-sans mb-5">
                                        {c.unit}
                                    </span>

                                    {/* Detail */}
                                    <p className="text-sm text-zinc-500 font-sans leading-relaxed flex-1 mb-6">
                                        {c.detail}
                                    </p>

                                    {/* Timeline badge */}
                                    <div className={`inline-flex items-center gap-2 px-3 py-2 border self-start ${c.borderAccent} ${c.bgAccent}`}>
                                        <span className="w-1 h-1 rounded-full bg-current opacity-70" />
                                        <span className={`text-[10px] tracking-[0.2em] uppercase font-sans ${c.accentClass}`}>
                                            In {c.timeline}
                                        </span>
                                    </div>
                                </div>
                            </ScaleReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
            <section
                id="faq"
                className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950"
            >
                <div className="max-w-[800px] mx-auto">
                    <Reveal className="text-center mb-12 md:mb-16">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-5">
                            Questions
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white">
                            YOU&apos;RE PROBABLY<br />
                            <span className="shimmer-text">WONDERING.</span>
                        </h2>
                    </Reveal>

                    <AdsPageFAQ />
                </div>
            </section>

            {/* ══ FINAL CTA + FORM ══════════════════════════════════════════════ */}
            <section
                id="audit-form"
                className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-black relative overflow-hidden"
            >
                {/* Violet glow */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10 max-w-[640px] mx-auto text-center">
                    {/* Scarcity */}
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500/20 bg-amber-500/5 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-sans">
                                3 Spots Remaining for April
                            </span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
                            WE ONBOARD 5<br />
                            NEW CLIENTS<br />
                            <span className="shimmer-text">PER MONTH.</span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p className="text-sm md:text-base text-zinc-500 font-sans max-w-[480px] mx-auto leading-relaxed mb-12">
                            Fill in your details. We&apos;ll review your business and reach out within 24 hours to schedule your free audit call — no pressure, no pitch deck.
                        </p>
                    </Reveal>

                    <Reveal delay={0.3} className="text-left">
                        <AdsLeadForm />
                    </Reveal>
                </div>
            </section>

            {/* ══ FOOTER STRIP ══════════════════════════════════════════════════ */}
            <div className="border-t border-white/5 py-8 px-4 text-center">
                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-700 font-sans">
                    &copy; {new Date().getFullYear()} MyNewStaff.ai — All rights reserved
                </p>
            </div>

        </main>
    );
}

