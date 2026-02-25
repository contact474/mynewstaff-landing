"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RollingNumber } from "@/components/ui/RollingNumber";

const steps = [
  {
    num: 1,
    title: "Post",
    desc: "Complete a posting package — stories or reels featuring MyNewStaff.ai.",
  },
  {
    num: 2,
    title: "Earn",
    desc: "Unlock $500, $1,500, or $3,500+ in build credits based on your package.",
  },
  {
    num: 3,
    title: "Choose",
    desc: "Pick an example bundle or we custom-scope deliverables within your credit cap.",
  },
  {
    num: 4,
    title: "Receive",
    desc: "Delivery starts after intake and assets are received. World-class output guaranteed.",
  },
];

export function PartnersSteps() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <Reveal className="max-w-5xl mx-auto text-center">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          How It Works
        </span>
        <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-16">
          VALUE-CREDITS <span className="shimmer-text">MODEL.</span>
        </h2>
      </Reveal>
      <Reveal className="max-w-5xl mx-auto" delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10">
          {steps.map((item, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 flex flex-col ${i > 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""}`}
            >
              <span className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
                <RollingNumber value={item.num} pad={2} duration={1200} />
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
