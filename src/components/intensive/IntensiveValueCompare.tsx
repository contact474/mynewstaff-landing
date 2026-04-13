"use client";

import { Reveal } from "@/components/ui/Reveal";

type Row = { item: string; market: string; here: string };

const SECTIONS: { label: string; rows: Row[]; subtotal: string }[] = [
  {
    label: "Core Build (what we install on your business)",
    rows: [
      { item: "Claude Code environment + 285 MNS agent skills", market: "$3,500", here: "Included" },
      { item: "MNS Deploy Templates (the same ones running 7-fig clients)", market: "$5,000", here: "Included" },
      { item: "Content Engine — 5 platforms, brand-trained, autonomous", market: "$8,000", here: "Installed live" },
      { item: "Lead System — FIRE scorer + waterfall enrichment", market: "$6,500", here: "Installed live" },
      { item: "Brooke — AI Cold Caller (Twilio + Gemini + NEPQ)", market: "$12,000", here: "Installed live" },
      { item: "MNS Ad Engine (Meta + Google + auto-optimization)", market: "$4,500", here: "Installed live" },
      { item: "Deploy Pipeline (Vercel + VPS + Caddy + SSL)", market: "$2,500", here: "Installed live" },
      { item: "Measurement Stack — dashboards + kill/scale triggers", market: "$3,000", here: "Installed live" },
    ],
    subtotal: "$45,000",
  },
  {
    label: "Strategy & Playbooks (what we hand you)",
    rows: [
      { item: "90-Day Scale Plan personalized to your business", market: "$2,500", here: "Built with you" },
      { item: "NEPQ Sales Script Library (Jeremy Miner trained)", market: "$1,500", here: "Included" },
      { item: "Hormozi Offer Stack + pricing teardown of your offer", market: "$2,000", here: "Los on the table" },
      { item: "Viral Hook Library (IG Algo 2026 scored, 200+ hooks)", market: "$1,200", here: "Included" },
      { item: "Cold Email Templates (2026 deliverability, Instantly-ready)", market: "$800", here: "Included" },
      { item: "Client Blueprint Library (5 project types A–E)", market: "$1,500", here: "Included" },
    ],
    subtotal: "$9,500",
  },
  {
    label: "Access & Network (the part money can't buy)",
    rows: [
      { item: "3 days in-room with Luka + Los (10+ hrs of direct build time)", market: "$15,000", here: "Included" },
      { item: "Private cohort Signal channel — for life", market: "Priceless", here: "Included" },
      { item: "30 days async access to Luka + Los post-event", market: "$4,000", here: "Included" },
      { item: "Warm intros to the MNS client network", market: "$2,500", here: "Where deals get made" },
      { item: "First-look on every new MNS tool before public launch", market: "$3,000", here: "Included" },
    ],
    subtotal: "$24,500",
  },
];

const GRAND_TOTAL = "$79,000+";

export function IntensiveValueCompare() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5">
      <Reveal className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
            THE VALUE STACK
          </span>
          <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
            $79,000 of build.{" "}
            <span className="shimmer-text">From $1,000.</span>
          </h2>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-6 leading-relaxed">
            These are the real numbers operators pay us for each piece
            separately. In the intensive, you get the whole stack installed,
            the playbooks that make it work, and direct access to the two
            people running it — in one room, in 3 days.
          </p>
        </div>

        {SECTIONS.map((section, si) => (
          <div key={si} className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
              <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans leading-relaxed">
                {`0${si + 1}`} · {section.label}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans shrink-0">
                Subtotal: <span className="text-white">{section.subtotal}</span>
              </span>
            </div>

            <div className="border border-white/10 overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] bg-white/[0.03] border-b border-white/10">
                <div className="p-3 md:p-5">
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                    Deliverable
                  </span>
                </div>
                <div className="p-3 md:p-5 border-l border-white/10 md:min-w-[120px] text-right">
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                    Market
                  </span>
                </div>
                <div className="p-3 md:p-5 border-l border-white/10 md:min-w-[160px] text-right">
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-green-400/60 uppercase font-sans whitespace-nowrap">
                    Intensive
                  </span>
                </div>
              </div>

              {section.rows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto_auto] ${
                    i < section.rows.length - 1
                      ? "border-b border-white/5"
                      : ""
                  } hover:bg-white/[0.02] transition-colors`}
                >
                  <div className="p-3 md:p-5">
                    <span className="text-xs md:text-sm text-white font-sans leading-snug">
                      {row.item}
                    </span>
                  </div>
                  <div className="p-3 md:p-5 border-l border-white/10 md:min-w-[120px] text-right">
                    <span className="text-xs md:text-sm text-zinc-500 font-sans line-through decoration-zinc-700 whitespace-nowrap">
                      {row.market}
                    </span>
                  </div>
                  <div className="p-3 md:p-5 border-l border-white/10 md:min-w-[160px] text-right">
                    <span className="text-xs md:text-sm text-green-400/80 font-sans whitespace-nowrap">
                      {row.here}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* GRAND TOTAL — Hormozi slap */}
        <div className="mt-12 border-2 border-white/20 bg-white/[0.03] rounded-2xl p-6 md:p-12 text-center">
          <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">
            Total Real-World Value
          </span>
          <div className="text-4xl md:text-7xl font-wide font-bold text-white mb-2">
            {GRAND_TOTAL}
          </div>
          <div className="text-xs text-zinc-500 font-sans tracking-wider mb-8">
            Yes, we&apos;ve verified this against our actual client invoices.
          </div>

          <div className="h-px w-32 bg-white/20 mx-auto mb-8" />

          <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">
            Your Price Today
          </span>
          <div className="text-3xl md:text-6xl font-wide font-bold mb-2">
            <span className="shimmer-text">$1,000 — $5,000</span>
          </div>
          <div className="text-xs text-zinc-500 font-sans tracking-wider">
            General: $1K · VIP: $2.5K · Deploy: $5K · 20 seats · application only
          </div>

          <a
            href="#tiers"
            className="inline-block mt-8 px-10 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-105 transition-transform"
          >
            Pick my tier
          </a>
        </div>
      </Reveal>
    </section>
  );
}
