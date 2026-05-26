"use client";

import { Reveal } from "@/components/ui/Reveal";

const SYSTEMS = [
  { num: "01", name: "Lead Generation", desc: "AI that finds businesses actively searching for your service. High-intent, not cold lists.", metric: "50+ qualified leads/week" },
  { num: "02", name: "Sales Funnels", desc: "Multi-step qualification that converts browsers into booked calls. Not templates — built for your offer.", metric: "14% conversion rate" },
  { num: "03", name: "AI Cold Caller", desc: "Brooke makes 200+ calls/day, handles objections with NEPQ, books meetings on your calendar, sends SMS confirmations.", metric: "200+ calls/day · $0.04/min" },
  { num: "04", name: "Landing Pages", desc: "High-converting pages deployed to your domain. Next.js + Tailwind. Loads in under a second.", metric: "0.8s load time" },
  { num: "05", name: "Email Engine", desc: "4-stage automated sequences. Plain text, no tracking pixels. Personalized per lead. Anti-spam compliant.", metric: "47% open rates" },
];

export function MastermindSystem() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6 text-center font-sans">
            The System
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase tracking-tighter leading-[0.92] text-center mb-4">
            5 AI systems.{" "}
            <span className="shimmer-text">One stack.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-sm text-zinc-400 text-center max-w-xl mx-auto mb-16 font-sans">
            This is what I build for clients at $15K–$25K.
            In the mastermind, I deploy a lite version for your business — live.
          </p>
        </Reveal>

        <div className="space-y-3">
          {SYSTEMS.map((s, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="group border border-white/[0.06] bg-white/[0.02] rounded-xl p-5 md:p-8 hover:border-[#FDEC00]/20 transition-all hover:bg-[#FDEC00]/[0.02]">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <span className="text-[10px] tracking-[0.3em] text-zinc-600 font-sans shrink-0 mt-1">
                    {s.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-wide font-bold uppercase tracking-tight mb-2">
                      {s.name}
                    </h3>
                    <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="shrink-0 md:text-right">
                    <span className="inline-block px-3 py-1.5 rounded-full bg-[#FDEC00]/10 text-[#FDEC00] text-[11px] font-semibold tracking-wider font-sans">
                      {s.metric}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
