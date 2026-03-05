"use client";

import { Reveal } from "@/components/ui/Reveal";

const comparisons = [
  {
    item: "Landing Page",
    market: "$3,000 – $8,000",
    here: "Included in $1,500 tier",
  },
  {
    item: "Press Kit (Pro)",
    market: "$1,500 – $4,000",
    here: "Included in $1,500 tier",
  },
  {
    item: "Explainer Video",
    market: "$2,000 – $5,000",
    here: "Included in $1,500 tier",
  },
  {
    item: "30-Day Content Pack",
    market: "$4,000 – $10,000",
    here: "Included in $3,500 tier",
  },
  {
    item: "Full Visibility Stack",
    market: "$6,000 – $15,000",
    here: "Included in $3,500 tier",
  },
];

export function PartnersValueCompare() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5">
      <Reveal className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
            Why This Deal Works
          </span>
          <h2 className="text-2xl md:text-5xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
            MARKET RATE VS. <span className="shimmer-text">YOUR COST.</span>
          </h2>
          <p className="text-xs text-zinc-500 font-sans max-w-lg mx-auto">
            You post content you&apos;d already be creating. We build assets that
            would cost thousands elsewhere.
          </p>
        </div>

        <div className="border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/[0.03] border-b border-white/10">
            <div className="p-4 md:p-5">
              <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                Deliverable
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10">
              <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                Market Rate
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10">
              <span className="text-[10px] tracking-[0.2em] text-green-400/60 uppercase font-sans">
                With Partner Credits
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 ${i < comparisons.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.02] transition-colors`}
            >
              <div className="p-4 md:p-5">
                <span className="text-sm text-white font-sans">{row.item}</span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/10">
                <span className="text-sm text-zinc-500 font-sans line-through decoration-zinc-700">
                  {row.market}
                </span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/10">
                <span className="text-sm text-green-400/80 font-sans">
                  {row.here}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-zinc-600 font-sans mt-4 tracking-wide">
          All you invest is content you&apos;re already making. Zero cash out of pocket.
        </p>
      </Reveal>
    </section>
  );
}
