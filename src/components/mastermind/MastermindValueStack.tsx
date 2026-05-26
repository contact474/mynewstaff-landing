"use client";

import { Reveal } from "@/components/ui/Reveal";

type Row = { item: string; market: string; yours: string };

const ROWS: Row[] = [
  { item: "AI Lead Generation System (configured for your niche)", market: "$6,500", yours: "Deployed live" },
  { item: "High-Converting Landing Page (your domain, your brand)", market: "$5,000", yours: "Deployed live" },
  { item: "Sales Funnel (multi-step qualification)", market: "$4,500", yours: "Deployed live" },
  { item: "AI Cold Caller Demo (Brooke, your script)", market: "$12,000", yours: "Configured live" },
  { item: "Email Campaign Sequences (4-stage, loaded)", market: "$3,500", yours: "Configured live" },
  { item: "Claude Code Environment + MNS Agent Skills", market: "$3,500", yours: "Included" },
  { item: "4 Hours of Direct Build Time with Luka", market: "$8,000", yours: "The entire session" },
  { item: "Full Recording of the Build Session", market: "$2,000", yours: "Included" },
  { item: "30 Days of Slack Support Post-Session", market: "$4,000", yours: "Included" },
];

const LEADS_ROW = {
  item: "High-intent ICP leads delivered",
  market: "$5,000+",
  blueprint: "\u2014",
  builder: "50 leads",
  partner: "200 leads",
};

const TOTAL = "$49,000";

export function MastermindValueStack() {
  return (
    <section className="py-20 md:py-32 px-4 border-t border-white/5">
      <Reveal className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
            The Value Stack
          </span>
          <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
            $49,000 of build.{" "}
            <span className="shimmer-text">From $1,497.</span>
          </h2>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-6 leading-relaxed">
            These are the real numbers clients pay us for each piece separately.
            In the mastermind, you get everything deployed in one session.
          </p>
        </div>

        <div className="border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] bg-white/[0.03] border-b border-white/10">
            <div className="p-4 md:p-5">
              <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                What You Get
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10 min-w-[90px] md:min-w-[120px] text-right">
              <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                Market
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10 min-w-[100px] md:min-w-[140px] text-right">
              <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-[#FDEC00]/60 uppercase font-sans">
                Mastermind
              </span>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_auto_auto] border-b border-white/5 hover:bg-white/[0.02] transition-colors`}
            >
              <div className="p-4 md:p-5">
                <span className="text-xs md:text-sm text-white font-sans leading-snug">
                  {row.item}
                </span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/10 min-w-[90px] md:min-w-[120px] text-right">
                <span className="text-xs md:text-sm text-zinc-500 font-sans line-through decoration-zinc-700">
                  {row.market}
                </span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/10 min-w-[100px] md:min-w-[140px] text-right">
                <span className="text-xs md:text-sm text-[#FDEC00]/80 font-sans">
                  {row.yours}
                </span>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-[1fr_auto_auto] bg-white/[0.02] hover:bg-white/[0.03] transition-colors">
            <div className="p-4 md:p-5">
              <span className="text-xs md:text-sm text-white font-sans font-semibold leading-snug">
                {LEADS_ROW.item}
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10 min-w-[90px] md:min-w-[120px] text-right">
              <span className="text-xs md:text-sm text-zinc-500 font-sans line-through decoration-zinc-700">
                {LEADS_ROW.market}
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10 min-w-[100px] md:min-w-[140px] text-right">
              <div className="text-[9px] md:text-[10px] font-sans space-y-1">
                <div className="text-zinc-600">Blueprint: {LEADS_ROW.blueprint}</div>
                <div className="text-[#FDEC00]/80">Builder: {LEADS_ROW.builder}</div>
                <div className="text-[#FDEC00]">Partner: {LEADS_ROW.partner}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border border-[#FDEC00]/20 bg-[#FDEC00]/5 rounded-xl p-5 text-center">
          <span className="text-sm md:text-base font-wide font-bold text-[#FDEC00] uppercase tracking-wider">
            Credited Toward Full Build
          </span>
          <p className="text-xs text-zinc-400 font-sans mt-2">
            Every dollar you invest in the mastermind is subtracted from your full
            partnership price ($15K-$25K). You never pay twice.
          </p>
        </div>

        <div className="mt-12 border-2 border-white/20 bg-white/[0.03] rounded-2xl p-8 md:p-12 text-center">
          <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">
            Total Real-World Value
          </span>
          <div className="text-4xl md:text-7xl font-wide font-bold text-white mb-2">
            {TOTAL}
          </div>
          <div className="text-xs text-zinc-500 font-sans tracking-wider mb-8">
            Verified against actual client invoices.
          </div>

          <div className="h-px w-32 bg-white/20 mx-auto mb-8" />

          <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-3">
            Your Investment
          </span>
          <div className="text-3xl md:text-6xl font-wide font-bold mb-2">
            <span className="shimmer-text">$1,497 — $4,997</span>
          </div>
          <div className="text-xs text-zinc-500 font-sans tracking-wider">
            Blueprint: $1,497 · Builder: $2,497 · Partner: $4,997 · 10 spots per session
          </div>

          <a
            href="#tiers"
            className="inline-block mt-8 px-10 py-4 rounded-full bg-[#FDEC00] text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-105 transition-transform"
          >
            Pick my tier
          </a>
        </div>
      </Reveal>
    </section>
  );
}
