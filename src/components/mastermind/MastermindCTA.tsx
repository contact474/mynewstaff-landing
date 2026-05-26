"use client";

import { Reveal } from "@/components/ui/Reveal";

export function MastermindCTA() {
  return (
    <section className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6 font-sans">
            Your Move
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase tracking-tighter leading-[0.92] mb-6">
            Stop renting.
            <br />
            <span className="shimmer-text">Start owning.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-4 font-sans leading-relaxed">
            Your entire mastermind fee is credited toward a full partnership build
            ($15-25K). Think of this as the $2K test drive.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full bg-[#FDEC00] text-black font-bold text-sm tracking-[0.15em] uppercase hover:scale-105 transition-transform shadow-lg shadow-yellow-500/20"
            >
              Book Discovery Call
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("brooke:open"))}
              className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full border border-white/10 text-white/60 text-sm tracking-[0.15em] uppercase hover:bg-white/5 transition-colors font-sans"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
              </svg>
              Talk to Brooke
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-8 flex items-center justify-center gap-6 text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
            <span>10 spots</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Price increases next session</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>100% credited toward full build</span>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-16 text-xs text-zinc-600 font-sans">
            Built by Luka Lah · MyNewStaff.ai · El Paso, TX
          </p>
        </Reveal>
      </div>
    </section>
  );
}
