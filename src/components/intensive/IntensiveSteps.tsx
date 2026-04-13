"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RollingNumber } from "@/components/ui/RollingNumber";

const STEPS = [
  {
    title: "Apply",
    desc: "WhatsApp us. 3 questions, 15-min fit call for VIP/Deploy tiers. We cap the room at 20 operators doing real numbers.",
  },
  {
    title: "Prep",
    desc: "Pre-event setup doc, laptop checklist, brand voice brief. You walk in ready. We don't waste minute one on logins.",
  },
  {
    title: "Build",
    desc: "Wed–Thu–Fri in LA. Hands on keyboards. We install the MNS stack on YOUR business, module by module, sitting next to you.",
  },
  {
    title: "Ship",
    desc: "Friday afternoon you deploy live to production. Real URL, real traffic. Then 30 days async access to finish what's left.",
  },
];

export function IntensiveSteps() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <Reveal className="max-w-5xl mx-auto text-center">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          HOW IT WORKS
        </span>
        <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-16">
          From application <span className="shimmer-text">to running machine.</span>
        </h2>
      </Reveal>
      <Reveal className="max-w-5xl mx-auto" delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10">
          {STEPS.map((item, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 flex flex-col ${
                i > 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""
              }`}
            >
              <span className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
                <RollingNumber value={i + 1} pad={2} duration={1200} />
              </span>
              <h3 className="font-wide text-xl uppercase text-white mb-3">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
