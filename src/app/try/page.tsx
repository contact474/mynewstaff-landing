"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { BrookeTryPopup } from "@/components/brooke/BrookeTryPopup";
import ExitIntentPopup from "@/components/brooke/ExitIntentPopup";

/* ═══════════════════════════════════════════════════════════
   /try — Brooke AI Cold Caller UGC Landing Page
   Traffic: TikTok / IG UGC campaigns (1.5M+ views)
   Goal: Talk to Brooke on-page → self-configuring demo
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
  "47 meetings booked this week",
  "$0.04/min vs $25/hr human SDR",
  "99/100 NEPQ score on real calls",
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
    a: "10 minutes. Describe your offer \u2192 Brooke generates your script \u2192 connect your number \u2192 upload leads \u2192 Brooke starts calling.",
  },
  {
    q: "What\u2019s the money-back guarantee?",
    a: "Full refund within 14 days, no questions asked. We\u2019re that confident Brooke will outperform your current SDRs.",
  },
];

// ─── Helpers ─────────────────────────────────────────────

function openBrooke() {
  window.dispatchEvent(new CustomEvent("brooke:open"));
}

function scrollToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}

// ─── FAQ Accordion ───────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
      >
        <span className="text-sm md:text-base font-sans text-white pr-4">
          {q}
        </span>
        <span className="text-white/40 text-xl shrink-0">
          {open ? "\u2212" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-zinc-400 leading-relaxed pb-6">
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
      <Navbar />

      <main className="bg-black text-white relative min-h-screen !overflow-visible selection:bg-white selection:text-black">
        {/* ═══ HERO ═══ */}
        <section className="h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
          <Reveal>
            <span className="block text-[10px] md:text-xs tracking-[0.35em] mb-6 text-white/40 font-sans uppercase">
              AI Cold Caller &middot; Picks Up in 3 Seconds
            </span>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
              YOUR AI CLOSER
              <br />
              <span className="shimmer-text">NEVER SLEEPS.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-base md:text-xl text-zinc-400 font-sans mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed">
              Brooke handles cold calls, qualifies leads, and books meetings
              &mdash; on YOUR offer. Talk to her now.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={openBrooke}
                className="px-10 py-4 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors cursor-pointer"
              >
                Talk to Brooke &mdash; Free Demo
              </button>
              <button
                onClick={scrollToPricing}
                className="px-10 py-4 border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase font-sans hover:border-white/40 hover:bg-white/[0.03] transition-all cursor-pointer"
              >
                See Pricing
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="mt-8 text-zinc-500 text-xs tracking-wide font-sans">
              2,847 demos this week &middot; 89% say &ldquo;holy shit&rdquo;
            </p>
          </Reveal>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-24 md:py-36 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter text-center mb-16 md:mb-24">
                HOW IT WORKS
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.15}>
                  <div className="flex flex-col items-start">
                    <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center text-sm font-sans text-white/60 mb-6">
                      {step.num}
                    </div>
                    <h3 className="text-sm font-wide font-bold uppercase tracking-wide mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section className="border-y border-white/10 py-6">
          <div className="max-w-5xl mx-auto flex md:justify-center gap-8 md:gap-16 px-4 overflow-x-auto scrollbar-none">
            {STATS.map((stat) => (
              <Reveal key={stat}>
                <span className="text-xs md:text-sm font-sans text-zinc-400 whitespace-nowrap tracking-wide">
                  {stat}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ USE CASES ═══ */}
        <section className="py-24 md:py-36 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter text-center mb-16 md:mb-24">
                WHAT BROOKE DOES
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {USE_CASES.map((uc, i) => (
                <Reveal key={uc.title} delay={i * 0.12}>
                  <div className="bg-zinc-950 border border-white/10 p-8">
                    <h3 className="text-sm font-wide font-bold uppercase tracking-wide mb-4">
                      {uc.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      {uc.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" className="py-24 md:py-36 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter text-center mb-4">
                SIMPLE PRICING
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm text-zinc-400 text-center mb-16 md:mb-24 font-sans">
                14-day money-back guarantee. No contracts.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIERS.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.12}>
                  <div
                    className={`relative p-8 border ${
                      tier.highlighted
                        ? "border-white/30 bg-zinc-950"
                        : "border-white/10 bg-zinc-950"
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute top-4 right-4 text-[9px] tracking-[0.25em] uppercase font-bold font-sans bg-white text-black px-3 py-1">
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
                          className="flex items-start gap-2 text-sm text-zinc-400 font-sans"
                        >
                          <span className="text-green-400/80 mt-0.5">+</span>
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
                      className={`w-full py-4 text-[11px] tracking-[0.25em] uppercase font-bold font-sans transition-colors cursor-pointer ${
                        tier.highlighted
                          ? "bg-white text-black hover:bg-white/90"
                          : "border border-white/15 text-white hover:bg-white/5"
                      }`}
                    >
                      {tier.cta}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="py-24 md:py-36 px-4">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter text-center mb-16">
                FAQ
              </h2>
            </Reveal>

            <div>
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="py-24 md:py-36 px-4 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase tracking-tighter mb-10">
              READY TO REPLACE
              <br />
              YOUR SDR TEAM?
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <button
              onClick={openBrooke}
              className="px-10 py-4 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors cursor-pointer"
            >
              Talk to Brooke
            </button>
          </Reveal>

          <Reveal delay={0.25}>
            <a
              href="https://wa.me/13058503664?text=Hey%20Luka%2C%20I%20want%20to%20talk%20about%20Brooke"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-sans tracking-wide"
            >
              or book a call with Luka &rarr;
            </a>
          </Reveal>
        </section>
      </main>

      <BrookeTryPopup />
      <ExitIntentPopup />
    </>
  );
}
