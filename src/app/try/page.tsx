"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { BrookeTryPopup } from "@/components/brooke/BrookeTryPopup";
import ExitIntentPopup from "@/components/brooke/ExitIntentPopup";

/* ═══════════════════════════════════════════════════════════
   /try — Brooke AI Cold Caller UGC Landing Page
   Traffic: TikTok / IG UGC campaigns (1.5M+ views)
   Goal: Talk to Brooke on-page → self-configuring demo
   Design: Matches /brooke violet glassmorphic language
   ═══════════════════════════════════════════════════════════ */

// ─── Data ────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Tell Brooke Your Offer",
    desc: "Describe what you sell in 2 sentences. She builds your custom cold call script in 30 seconds.",
  },
  {
    num: "02",
    title: "Connect Your Phone Line",
    desc: "Paste your Twilio or SignalWire credentials. Or pay $49 and we set it up.",
  },
  {
    num: "03",
    title: "Brooke Starts Calling",
    desc: "Upload leads. Brooke calls them using YOUR script, YOUR number, YOUR brand.",
  },
];

const STATS = [
  { value: "47", label: "meetings booked this week" },
  { value: "$0.04", label: "/min vs $25/hr human SDR" },
  { value: "99/100", label: "NEPQ score on real calls" },
];

const USE_CASES = [
  {
    title: "Cold Calling",
    desc: "Brooke dials your leads, handles objections, books meetings. 200+ calls/day.",
  },
  {
    title: "Zoom Meetings",
    desc: "Send Brooke to your Zoom. She presents, qualifies, closes. Avatar + voice.",
  },
  {
    title: "Website Widget",
    desc: "Embed Brooke on your site. She answers questions, captures leads, books calls.",
  },
];

const TIERS = [
  {
    name: "Starter",
    price: "$97",
    period: "/mo",
    badge: null,
    features: [
      "500 voice minutes",
      "1 phone number",
      "Custom NEPQ script",
      "Call recordings & transcripts",
      "Email support",
    ],
    cta: "Start Free Demo",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$497",
    period: "/mo",
    badge: "POPULAR",
    features: [
      "2,000 voice minutes",
      "3 phone numbers",
      "Priority script optimization",
      "Real-time dashboard",
      "Slack/Telegram alerts",
    ],
    cta: "Start Free Demo",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "$997",
    period: "/mo",
    badge: null,
    features: [
      "5,000 voice minutes",
      "Unlimited numbers",
      "Dedicated account manager",
      "API access",
      "White-label option",
    ],
    cta: "Talk to Luka",
    highlighted: false,
  },
];

const FAQS = [
  {
    q: "How does the free demo work?",
    a: "Click 'Talk to Brooke' above. Describe what you sell, and Brooke will role-play as YOUR cold caller right here on the page. No signup needed. No credit card. Just talk.",
  },
  {
    q: "What phone numbers does Brooke call from?",
    a: "Your own. You connect your Twilio or SignalWire account during onboarding. Brooke calls from YOUR number, YOUR caller ID. We never use shared numbers.",
  },
  {
    q: "How fast can I start?",
    a: "10 minutes. Describe your offer → Brooke generates your script → connect your number → upload leads → Brooke starts calling.",
  },
  {
    q: "What\u2019s the money-back guarantee?",
    a: "Full refund within 14 days, no questions asked. We\u2019re that confident Brooke will outperform your current SDRs.",
  },
];

// ─── Animation variants ─────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

function fadeUpDelay(delay: number) {
  return {
    ...fadeUp,
    transition: { ...fadeUp.transition, delay },
  };
}

// ─── Helpers ─────────────────────────────────────────────

function openBrooke() {
  window.dispatchEvent(new CustomEvent("brooke:open"));
}

function scrollToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Shimmer inline style ────────────────────────────────

const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg, #fff 0%, #fff 40%, rgba(139,92,246,0.6) 50%, #fff 60%, #fff 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "shimmer 4s linear infinite",
};

// ─── FAQ Accordion ───────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 py-5 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center">
        <span className="text-[15px] md:text-[17px] font-sans text-white pr-4">{q}</span>
        <span
          className="text-violet-400/70 text-xl shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[15px] md:text-[17px] text-zinc-500 leading-relaxed pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────

export default function TryPage() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>

      <Navbar />

      <main className="bg-black text-white relative min-h-screen !overflow-visible selection:bg-violet-500/30 selection:text-white">
        {/* ═══ HERO ═══ */}
        <section className="min-h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden px-6 md:px-10">
          {/* Background orbs */}
          <div className="absolute w-[600px] h-[600px] bg-violet-600 -top-48 -right-48 rounded-full blur-[120px] opacity-[0.12] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] bg-violet-500 bottom-0 -left-32 rounded-full blur-[120px] opacity-[0.12] pointer-events-none" />

          <motion.div {...fadeUp}>
            <span className="block text-[11px] uppercase tracking-[0.35em] text-violet-400/70 font-semibold mb-6">
              AI Cold Caller &middot; Picks Up in 3 Seconds
            </span>
          </motion.div>

          <motion.div {...fadeUpDelay(0.15)}>
            <h1 className="text-[clamp(52px,9vw,120px)] font-wide font-extrabold leading-[0.88] tracking-[-0.05em] uppercase">
              YOUR AI CLOSER
              <br />
              <span style={shimmerStyle}>NEVER SLEEPS.</span>
            </h1>
          </motion.div>

          <motion.div {...fadeUpDelay(0.3)}>
            <p className="text-[clamp(16px,2.2vw,26px)] font-wide font-bold leading-snug tracking-[-0.01em] text-zinc-300 mt-6 md:mt-8 max-w-2xl mx-auto">
              Brooke handles cold calls, qualifies leads, and books meetings
              &mdash; on YOUR offer. Talk to her now.
            </p>
          </motion.div>

          <motion.div {...fadeUpDelay(0.45)}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={openBrooke}
                className="bg-gradient-to-br from-[#7c3aed] to-[#8b5cf6] text-white font-bold text-[11px] tracking-[0.25em] uppercase px-10 py-4 rounded-sm hover:from-[#6d28d9] hover:to-[#7c3aed] hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:-translate-y-px transition-all cursor-pointer"
              >
                Talk to Brooke &mdash; Free Demo
              </button>
              <button
                onClick={scrollToPricing}
                className="border border-white/10 text-white font-bold text-[11px] tracking-[0.25em] uppercase px-10 py-4 hover:border-white/30 transition-colors rounded-sm cursor-pointer"
              >
                See Pricing
              </button>
            </div>
          </motion.div>

          <motion.div {...fadeUpDelay(0.6)}>
            <p className="mt-8 text-zinc-500 text-xs tracking-wide font-sans">
              2,847 demos this week &middot; 89% say &ldquo;holy shit&rdquo;
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg className="w-6 h-6 text-zinc-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section className="border-t border-white/5 py-6">
          <div className="max-w-[1200px] mx-auto flex md:justify-center gap-4 md:gap-8 px-6 md:px-10 overflow-x-auto scrollbar-none">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-[10px] px-5 py-2.5 rounded-full flex items-center gap-2 shrink-0"
              >
                <span className="text-violet-400 text-sm font-semibold">{stat.value}</span>
                <span className="text-zinc-500 text-[11px] uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-16 md:py-24 relative border-t border-white/5">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative">
            <motion.div {...fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.35em] text-violet-400/60 font-semibold mb-4 block">
                Process
              </span>
              <h2 className="text-[clamp(28px,4vw,48px)] font-wide font-extrabold leading-[1] tracking-[-0.04em] uppercase mb-16 md:mb-24">
                HOW IT WORKS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...fadeUpDelay(i * 0.15)}
                  className="border border-white/10 bg-white/[0.02] rounded-sm p-6 md:p-8 transition-all duration-400 hover:bg-violet-500/[0.04] hover:border-violet-500/20 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-full border border-violet-500/20 flex items-center justify-center text-sm font-sans text-violet-400/70 mb-6">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-wide font-bold uppercase tracking-wide mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[15px] md:text-[17px] text-zinc-500 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHAT BROOKE DOES ═══ */}
        <section className="py-16 md:py-24 relative border-t border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative">
            <motion.div {...fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.35em] text-violet-400/60 font-semibold mb-4 block">
                Capabilities
              </span>
              <h2 className="text-[clamp(28px,4vw,48px)] font-wide font-extrabold leading-[1] tracking-[-0.04em] uppercase mb-16 md:mb-24">
                WHAT BROOKE DOES
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {USE_CASES.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  {...fadeUpDelay(i * 0.12)}
                  className="border border-white/10 bg-white/[0.02] rounded-sm p-6 md:p-8 transition-all duration-400 hover:bg-violet-500/[0.04] hover:border-violet-500/20 hover:-translate-y-1"
                >
                  <h3 className="text-sm font-wide font-bold uppercase tracking-wide mb-4">
                    {uc.title}
                  </h3>
                  <p className="text-[15px] md:text-[17px] text-zinc-500 leading-relaxed font-sans">
                    {uc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" className="py-16 md:py-24 relative border-t border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative">
            <motion.div {...fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.35em] text-violet-400/60 font-semibold mb-4 block">
                Pricing
              </span>
              <h2 className="text-[clamp(28px,4vw,48px)] font-wide font-extrabold leading-[1] tracking-[-0.04em] uppercase mb-4">
                SIMPLE PRICING
              </h2>
            </motion.div>
            <motion.div {...fadeUpDelay(0.1)}>
              <p className="text-[15px] md:text-[17px] text-zinc-500 leading-relaxed mb-16 md:mb-24 font-sans">
                14-day money-back guarantee. No contracts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIERS.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  {...fadeUpDelay(i * 0.12)}
                  className={`relative rounded-sm p-8 transition-all duration-300 ${
                    tier.highlighted
                      ? "border border-violet-500/30 bg-white/[0.02] hover:scale-[1.02] hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]"
                      : "border border-white/10 bg-white/[0.02] hover:bg-violet-500/[0.04] hover:border-violet-500/20 hover:-translate-y-1"
                  }`}
                >
                  {/* Featured top line */}
                  {tier.highlighted && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600 rounded-t-sm" />
                  )}

                  {tier.badge && (
                    <span className="absolute top-4 right-4 text-[9px] tracking-[0.25em] uppercase font-bold font-sans bg-gradient-to-r from-violet-600 to-violet-500 text-white px-3 py-1 rounded-sm">
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="text-sm font-wide font-bold uppercase tracking-wide mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl md:text-4xl font-wide font-bold">
                      {tier.price}
                    </span>
                    <span className="text-sm text-zinc-500 font-sans">
                      {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[15px] text-zinc-400 font-sans"
                      >
                        <span className="text-violet-400/80 mt-0.5">+</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={
                      tier.name === "Scale"
                        ? () =>
                            window.open(
                              "https://wa.me/13058503664?text=Hey%20Luka%2C%20I%20want%20to%20talk%20about%20Brooke%20Scale%20plan",
                              "_blank"
                            )
                        : openBrooke
                    }
                    className={`w-full py-4 text-[11px] tracking-[0.25em] uppercase font-bold font-sans transition-all cursor-pointer rounded-sm ${
                      tier.highlighted
                        ? "bg-gradient-to-br from-[#7c3aed] to-[#8b5cf6] text-white hover:from-[#6d28d9] hover:to-[#7c3aed] hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)]"
                        : "border border-white/10 text-white hover:border-white/30"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="py-16 md:py-24 relative border-t border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

          <div className="max-w-[700px] mx-auto px-6 md:px-10 relative">
            <motion.div {...fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.35em] text-violet-400/60 font-semibold mb-4 block">
                Questions
              </span>
              <h2 className="text-[clamp(28px,4vw,48px)] font-wide font-extrabold leading-[1] tracking-[-0.04em] uppercase mb-16">
                FAQ
              </h2>
            </motion.div>

            <motion.div {...fadeUpDelay(0.1)}>
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="py-16 md:py-24 relative border-t border-white/5 text-center">
          {/* Background orbs */}
          <div className="absolute w-[600px] h-[600px] bg-violet-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative">
            <motion.div {...fadeUp}>
              <h2 className="text-[clamp(28px,4vw,48px)] font-wide font-extrabold leading-[1] tracking-[-0.04em] uppercase mb-4">
                READY TO REPLACE
                <br />
                YOUR SDR TEAM?
              </h2>
            </motion.div>

            <motion.div {...fadeUpDelay(0.15)}>
              <button
                onClick={openBrooke}
                className="bg-gradient-to-br from-[#7c3aed] to-[#8b5cf6] text-white font-bold text-[11px] tracking-[0.25em] uppercase px-10 py-4 rounded-sm hover:from-[#6d28d9] hover:to-[#7c3aed] hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:-translate-y-px transition-all cursor-pointer mt-6"
              >
                Talk to Brooke
              </button>
            </motion.div>

            <motion.div {...fadeUpDelay(0.25)}>
              <a
                href="https://wa.me/13058503664?text=Hey%20Luka%2C%20I%20want%20to%20talk%20about%20Brooke"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6 text-xs text-zinc-500 hover:text-violet-400/70 transition-colors font-sans tracking-wide"
              >
                or book a call with Luka &rarr;
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <BrookeTryPopup />
      <ExitIntentPopup />
    </>
  );
}
