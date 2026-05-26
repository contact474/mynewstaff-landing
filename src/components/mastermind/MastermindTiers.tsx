"use client";

import { Reveal } from "@/components/ui/Reveal";

const TIERS = [
  {
    name: "Blueprint",
    price: "$1,497",
    badge: null,
    best: "I want to learn and try it myself",
    features: [
      "4-hour LIVE mastermind session",
      "Full system walkthrough",
      "Lite version deployed for your business",
      "Full recording of the session",
      "Private community access",
    ],
    highlight: null,
  },
  {
    name: "Builder",
    price: "$2,497",
    badge: "MOST POPULAR",
    best: "I want the system AND support to make it work",
    features: [
      "Everything in Blueprint",
      "30 days direct Slack support from Luka",
      "Priority Q&A during live session",
      "Mindset coaching session + performance hypnosis with Yeram",
      "50 high-intent ICP leads delivered to your pipeline",
    ],
    highlight: "$2,497 credited toward full partnership build",
  },
  {
    name: "Partner",
    price: "$4,997",
    badge: null,
    best: "I want you to eventually run everything — this is my test drive",
    features: [
      "Everything in Builder",
      "1-on-1 implementation call (60 min)",
      "Mindset coaching session + performance hypnosis with Yeram",
      "200 high-intent ICP leads delivered",
      "60 days support",
      "First priority for new MNS features and tools",
    ],
    highlight: "Full $4,997 credited toward partnership ($15-25K full build)",
  },
];

export function MastermindTiers() {
  return (
    <section id="tiers" className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
              Pick Your Tier
            </span>
            <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
              Three ways in.{" "}
              <span className="shimmer-text">All credited.</span>
            </h2>
            <p className="text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-6 leading-relaxed">
              Every tier is a one-time investment. Every dollar is credited toward a full
              partnership build if you decide to go further.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={0.1 * i}>
              <div
                className={`relative flex flex-col h-full rounded-2xl border bg-white/[0.02] p-6 md:p-8 transition-colors hover:border-white/15 ${
                  tier.badge
                    ? "border-[#FDEC00]/30 shadow-[0_0_40px_rgba(253,236,0,0.06)]"
                    : "border-white/[0.07]"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#FDEC00] text-black text-[10px] tracking-[0.2em] font-bold uppercase">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans">
                    {tier.name}
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-wide font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-xs text-zinc-600 font-sans">/one-time</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#FDEC00]/70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-zinc-300 font-sans leading-snug">{f}</span>
                    </div>
                  ))}
                  {tier.highlight && (
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#FDEC00]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[#FDEC00] font-semibold font-sans leading-snug">
                        {tier.highlight}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <p className="text-[10px] tracking-[0.15em] text-zinc-600 uppercase font-sans mb-4">
                    Best for: &ldquo;{tier.best}&rdquo;
                  </p>
                  <a
                    href="#booking"
                    className="block w-full text-center px-6 py-4 rounded-full bg-[#FDEC00] text-black font-bold text-[11px] tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Book Discovery Call
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
