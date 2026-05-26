"use client";

import { Reveal } from "@/components/ui/Reveal";

const HOURS = [
  { time: "Hour 1", title: "Full System Walkthrough", desc: "I show you the exact architecture — every tool, every integration, every automation. You see how the $1.1M machine works under the hood.", icon: "🔍" },
  { time: "Hour 2", title: "YOUR Deployment", desc: "I open Claude Code and deploy a lite version for YOUR business. Your domain. Your branding. Your niche. Live, while you watch.", icon: "🚀" },
  { time: "Hour 3", title: "Claude Code Deep Dive", desc: "Hands-on training. You learn how to use Claude Code, navigate the dashboard, modify the system, and make it better over time.", icon: "⚡" },
  { time: "Hour 4", title: "Custom Q&A + Tuning", desc: "Your specific funnel. Your specific audience. I help you customize and tune the system to your exact use case. You leave ready.", icon: "🎯" },
];

export function MastermindFormat() {
  return (
    <section className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6 text-center font-sans">
            The Format
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase tracking-tighter leading-[0.92] text-center mb-4">
            Not a webinar.{" "}
            <span className="shimmer-text">A build session.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-sm text-zinc-400 text-center max-w-xl mx-auto mb-16 font-sans">
            You don&apos;t leave with notes. You leave with a working system
            deployed on your business.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {HOURS.map((h, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <div className="relative border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 md:p-8 hover:border-[#FDEC00]/15 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{h.icon}</span>
                  <div>
                    <span className="text-[10px] tracking-[0.3em] text-[#FDEC00]/50 uppercase font-sans">
                      {h.time}
                    </span>
                    <h3 className="text-lg font-wide font-bold uppercase tracking-tight">
                      {h.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
