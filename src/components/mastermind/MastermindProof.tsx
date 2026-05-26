"use client";

import { Reveal } from "@/components/ui/Reveal";

const CLIENTS = [
  {
    industry: "Real Estate",
    initials: "RE",
    since: "Since Nov 2025",
    metrics: [
      { label: "Monthly Revenue", before: "$68K", after: "$958K", change: "1309%" },
      { label: "Leads / Month", before: "120", after: "5.2K", change: "4214%" },
      { label: "Conversion Rate", before: "1.8%", after: "14.2%", change: "" },
      { label: "Cost Per Lead", before: "$442", after: "$12.07", change: "" },
    ],
  },
  {
    industry: "Fitness",
    initials: "FT",
    since: "Since Nov 2025",
    metrics: [
      { label: "Monthly Revenue", before: "$42K", after: "$568K", change: "1253%" },
      { label: "Leads / Month", before: "340", after: "7.9K", change: "2211%" },
      { label: "Conversion Rate", before: "3.2%", after: "16.6%", change: "" },
      { label: "Cost Per Lead", before: "$48", after: "$6.93", change: "" },
    ],
  },
  {
    industry: "Law Partners",
    initials: "LP",
    since: "Since Dec 2025",
    metrics: [
      { label: "Monthly Revenue", before: "$124K", after: "$1.3M", change: "935%" },
      { label: "Leads / Month", before: "48", after: "2.3K", change: "4779%" },
      { label: "Conversion Rate", before: "4.1%", after: "20%", change: "" },
      { label: "Cost Per Lead", before: "$329", after: "$41.21", change: "" },
    ],
  },
  {
    industry: "SaaS",
    initials: "SS",
    since: "Since Nov 2025",
    metrics: [
      { label: "Monthly Revenue", before: "$52K", after: "$670K", change: "1188%" },
      { label: "Leads / Month", before: "400", after: "11.9K", change: "2376%" },
      { label: "Conversion Rate", before: "1.8%", after: "12.1%", change: "" },
      { label: "Cost Per Lead", before: "$82", after: "$5.42", change: "" },
    ],
  },
  {
    industry: "Organic Foods",
    initials: "OF",
    since: "Since Dec 2025",
    metrics: [
      { label: "Monthly Revenue", before: "$28K", after: "$405K", change: "1346%" },
      { label: "Leads / Month", before: "620", after: "14.9K", change: "2300%" },
      { label: "Conversion Rate", before: "1.4%", after: "10%", change: "" },
      { label: "Cost Per Lead", before: "$34", after: "$2.58", change: "" },
    ],
  },
  {
    industry: "Consulting",
    initials: "CG",
    since: "Since Jan 2026",
    metrics: [
      { label: "Monthly Revenue", before: "$10K", after: "$167K", change: "828%" },
      { label: "Leads / Month", before: "24", after: "899", change: "3646%" },
      { label: "Conversion Rate", before: "6.2%", after: "22.9%", change: "" },
      { label: "Cost Per Lead", before: "$108", after: "$19.09", change: "" },
    ],
  },
];

export function MastermindProof() {
  return (
    <section className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6 text-center font-sans">
            The Proof
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase tracking-tighter leading-[0.92] text-center mb-4">
            $1.1M+ per client.{" "}
            <span className="text-zinc-500">This year.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-sm text-zinc-400 text-center max-w-xl mx-auto mb-16 font-sans">
            Real clients. Real numbers. Same system you&apos;ll get on the call.
          </p>
        </Reveal>

        <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-4 md:p-8 mb-8">
          <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-sans mb-6">
            Client Results — Before MNS vs Current
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {CLIENTS.map((c, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-sans">
                      {c.initials}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white font-sans">{c.industry}</span>
                      <span className="block text-[10px] text-zinc-600 font-sans">{c.since}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {c.metrics.map((m, j) => (
                      <div key={j} className="flex items-center justify-between text-xs font-sans">
                        <span className="text-zinc-500">{m.label}</span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-zinc-600 line-through decoration-zinc-700">{m.before}</span>
                          <span className="text-zinc-600">&rarr;</span>
                          <span className="text-white font-semibold">{m.after}</span>
                          {m.change && (
                            <span className="text-emerald-400 text-[10px]">&uarr;{m.change}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#FDEC00]/20 flex items-center justify-center text-[#FDEC00] text-xs">%</span>
              <span className="text-[10px] tracking-[0.3em] text-emerald-400 uppercase font-sans font-semibold">
                MNS Revenue — Earned to Date
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { val: "$149K", label: "Blitz Fees Collected" },
                { val: "$1.3M", label: "21% Profit Split" },
                { val: "$1.5M", label: "Total MNS Revenue" },
                { val: "$17K", label: "Infra Costs" },
                { val: "$1.5M", label: "Net Profit", highlight: true },
              ].map((s, i) => (
                <div key={i}>
                  <span className={`text-2xl md:text-3xl font-wide font-bold ${s.highlight ? "text-emerald-400" : "text-white"}`}>
                    {s.val}
                  </span>
                  <span className="block text-[9px] tracking-[0.15em] text-zinc-500 uppercase font-sans mt-1">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
