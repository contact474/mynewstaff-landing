"use client";

import { Reveal } from "@/components/ui/Reveal";

const PROBLEMS = [
  { stat: "$10K+/mo", label: "on agencies", desc: "You get a PDF report once a month. They change 2 keywords and call it optimization." },
  { stat: "47 hours", label: "avg response time", desc: "Your leads call, go to voicemail, and book with your competitor who answered in 3 seconds." },
  { stat: "60%", label: "of leads wasted", desc: "You spend $10K on ads, then let more than half go to voicemail. That's not marketing. That's arson." },
  { stat: "0", label: "AI systems you own", desc: "You've tried ChatGPT. Watched YouTube tutorials. Bought a course. Nothing stuck. You still don't own any of it." },
];

export function MastermindProblem() {
  return (
    <section className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6 text-center font-sans">
            The Problem
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase tracking-tighter leading-[0.92] text-center mb-6">
            You know AI can do this.
            <br />
            <span className="text-zinc-500">You just can&apos;t wire it together.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto text-center mb-16 font-sans leading-relaxed">
            You&apos;re a business owner doing $20K–$500K/mo. You&apos;re not stupid.
            You&apos;re just drowning in tools that don&apos;t talk to each other,
            agencies that don&apos;t deliver, and AI hype that never converts to revenue.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {PROBLEMS.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl md:text-4xl font-wide font-bold text-[#FDEC00]">
                    {p.stat}
                  </span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-sans">
                    {p.label}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
