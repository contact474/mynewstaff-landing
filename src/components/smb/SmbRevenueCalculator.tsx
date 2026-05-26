"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const PRESETS = [
  { label: "Roofing", avgJob: 12000, closeRate: 25 },
  { label: "Plumbing / HVAC", avgJob: 3500, closeRate: 30 },
  { label: "Dental", avgJob: 2800, closeRate: 40 },
  { label: "Law", avgJob: 8000, closeRate: 20 },
  { label: "Fitness", avgJob: 1200, closeRate: 35 },
  { label: "Med Spa", avgJob: 4500, closeRate: 30 },
  { label: "Real Estate", avgJob: 9000, closeRate: 15 },
  { label: "Other", avgJob: 5000, closeRate: 25 },
];

export function SmbRevenueCalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(30);
  const [avgJobValue, setAvgJobValue] = useState(5000);
  const [closeRate, setCloseRate] = useState(25);
  const [preset, setPreset] = useState<string | null>(null);

  const results = useMemo(() => {
    const currentCloses = Math.round(leadsPerMonth * (closeRate / 100));
    const currentRevenue = currentCloses * avgJobValue;

    // AI impact projections (conservative, based on real MNS client data)
    const aiLeads = Math.round(leadsPerMonth * 3.2); // 3.2x more leads from FIRE + content
    const aiCloseRate = Math.min(closeRate * 1.4, 65); // 40% close rate improvement from speed-to-lead + nurture
    const aiCloses = Math.round(aiLeads * (aiCloseRate / 100));
    const aiRevenue = aiCloses * avgJobValue;

    const monthlyGain = aiRevenue - currentRevenue;
    const yearlyGain = monthlyGain * 12;
    const roi = Math.round((yearlyGain / 4997) * 10) / 10; // ROI on Partner tier

    return {
      currentCloses,
      currentRevenue,
      aiLeads,
      aiCloseRate: Math.round(aiCloseRate),
      aiCloses,
      aiRevenue,
      monthlyGain,
      yearlyGain,
      roi,
    };
  }, [leadsPerMonth, avgJobValue, closeRate]);

  const selectPreset = (p: typeof PRESETS[number]) => {
    setPreset(p.label);
    setAvgJobValue(p.avgJob);
    setCloseRate(p.closeRate);
  };

  const fmt = (n: number) =>
    n >= 1000000
      ? `$${(n / 1000000).toFixed(1)}M`
      : `$${n.toLocaleString()}`;

  return (
    <section id="calculator" className="border-t border-white/5 py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">
              Revenue Calculator
            </p>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
              What would AI do{" "}
              <span className="shimmer-text">for YOUR numbers?</span>
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto mt-4">
              Plug in your real numbers. See what happens when AI handles
              your lead gen, follow-up, content, and outreach.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            {/* Industry presets */}
            <div className="p-4 md:p-6 border-b border-white/5 bg-white/[0.02]">
              <p className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-3">
                Select your industry
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => selectPreset(p)}
                    className={`px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase transition-all ${
                      preset === p.label
                        ? "bg-white text-black font-bold"
                        : "border border-white/10 text-zinc-500 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="p-4 md:p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-zinc-400">
                    Leads per month (current)
                  </label>
                  <span className="text-sm font-wide font-bold">{leadsPerMonth}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={leadsPerMonth}
                  onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />
                <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
                  <span>5</span><span>200</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-zinc-400">
                    Average job / client value
                  </label>
                  <span className="text-sm font-wide font-bold">
                    ${avgJobValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={avgJobValue}
                  onChange={(e) => setAvgJobValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />
                <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
                  <span>$500</span><span>$50,000</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-zinc-400">
                    Close rate (%)
                  </label>
                  <span className="text-sm font-wide font-bold">{closeRate}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />
                <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
                  <span>5%</span><span>60%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="border-t border-white/5">
              {/* Before vs After */}
              <div className="grid grid-cols-2 divide-x divide-white/5">
                <div className="p-4 md:p-6 text-center">
                  <p className="text-[9px] tracking-[0.25em] text-zinc-600 uppercase mb-3">
                    Without AI (now)
                  </p>
                  <div className="text-xs text-zinc-500 mb-1">
                    {leadsPerMonth} leads × {closeRate}% close = {results.currentCloses} clients
                  </div>
                  <div className="text-2xl md:text-3xl font-wide font-bold text-zinc-500">
                    {fmt(results.currentRevenue)}
                  </div>
                  <div className="text-[9px] text-zinc-600 mt-1">per month</div>
                </div>
                <div className="p-4 md:p-6 text-center bg-white/[0.02]">
                  <p className="text-[9px] tracking-[0.25em] text-green-400/60 uppercase mb-3">
                    With AI systems
                  </p>
                  <div className="text-xs text-zinc-400 mb-1">
                    {results.aiLeads} leads × {results.aiCloseRate}% close = {results.aiCloses} clients
                  </div>
                  <motion.div
                    key={results.aiRevenue}
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl md:text-3xl font-wide font-bold text-white"
                  >
                    {fmt(results.aiRevenue)}
                  </motion.div>
                  <div className="text-[9px] text-green-400/60 mt-1">per month</div>
                </div>
              </div>

              {/* Impact summary */}
              <div className="p-4 md:p-6 border-t border-white/5 bg-white/[0.03]">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <motion.div
                      key={results.monthlyGain}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-lg md:text-2xl font-wide font-bold text-green-400"
                    >
                      +{fmt(results.monthlyGain)}
                    </motion.div>
                    <div className="text-[9px] text-zinc-600 uppercase tracking-wider mt-1">
                      Monthly gain
                    </div>
                  </div>
                  <div>
                    <motion.div
                      key={results.yearlyGain}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-lg md:text-2xl font-wide font-bold text-white"
                    >
                      +{fmt(results.yearlyGain)}
                    </motion.div>
                    <div className="text-[9px] text-zinc-600 uppercase tracking-wider mt-1">
                      Yearly gain
                    </div>
                  </div>
                  <div>
                    <motion.div
                      key={results.roi}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-lg md:text-2xl font-wide font-bold text-amber-400"
                    >
                      {results.roi}x
                    </motion.div>
                    <div className="text-[9px] text-zinc-600 uppercase tracking-wider mt-1">
                      ROI on $4,997
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-4 md:p-6 border-t border-white/5 text-center">
                <p className="text-xs text-zinc-400 mb-4">
                  {results.roi > 10
                    ? `That's a ${results.roi}x return on a $4,997 investment. The mastermind pays for itself in the first month.`
                    : results.roi > 5
                      ? `${results.roi}x ROI in year one. Most businesses see results within 45 days.`
                      : `Even at conservative estimates, the system compounds every month it runs.`}
                </p>
                <a
                  href="#booking"
                  className="inline-block px-8 py-3 rounded-full bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase hover:scale-105 transition-transform"
                >
                  Book Discovery Call
                </a>
                <p className="text-[9px] text-zinc-600 mt-3">
                  Based on real MNS client data: 3.2x lead increase, 40%
                  close rate improvement from speed-to-lead + AI nurture.
                  Conservative estimates. Individual results vary.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
