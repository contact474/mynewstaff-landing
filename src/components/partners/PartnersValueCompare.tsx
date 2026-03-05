"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePartnerLocale } from "./PartnersLocaleProvider";

export function PartnersValueCompare() {
  const { t } = usePartnerLocale();
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5">
      <Reveal className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
            {t.valueCompare.label}
          </span>
          <h2 className="text-2xl md:text-5xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
            {t.valueCompare.heading} <span className="shimmer-text">{t.valueCompare.headingAccent}</span>
          </h2>
          <p className="text-xs text-zinc-500 font-sans max-w-lg mx-auto">
            {t.valueCompare.subtitle}
          </p>
        </div>

        <div className="border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/[0.03] border-b border-white/10">
            <div className="p-4 md:p-5">
              <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                {t.valueCompare.colDeliverable}
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10">
              <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                {t.valueCompare.colMarketRate}
              </span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/10">
              <span className="text-[10px] tracking-[0.2em] text-green-400/60 uppercase font-sans">
                {t.valueCompare.colPartnerCredits}
              </span>
            </div>
          </div>

          {/* Rows */}
          {t.valueCompare.rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 ${i < t.valueCompare.rows.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.02] transition-colors`}
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
          {t.valueCompare.footer}
        </p>
      </Reveal>
    </section>
  );
}
