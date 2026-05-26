"use client";

import { Reveal } from "@/components/ui/Reveal";

export function MastermindHero() {
  return (
    <section className="min-h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,236,0,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="z-10 relative px-4 max-w-4xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FDEC00]/20 bg-[#FDEC00]/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FDEC00] animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] text-[#FDEC00]/80 uppercase font-sans">
              Next session filling — 10 spots
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.92] tracking-tighter uppercase">
            Claude Code
            <br />
            <span className="shimmer-text">Mastermind</span>
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans">
            We need to make sure this is right for your business. Book a quick
            call — if it&apos;s a fit, we deploy. If not, we&apos;ll tell you.
            4 hours live. The same system that generated{" "}
            <span className="text-[#FDEC00] font-semibold">$1.1M+ per client</span> this year.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#FDEC00] text-black font-bold text-xs tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-lg shadow-yellow-500/20"
            >
              Book Your Discovery Call
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("brooke:open"))}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/60 text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-colors font-sans"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
              </svg>
              Talk to Brooke
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div
            id="hero-video"
            className="mt-8 max-w-2xl mx-auto aspect-video rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center"
          >
            <span className="text-sm text-zinc-600 font-sans">Video coming soon</span>
          </div>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-12 flex items-center justify-center gap-8 text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
            <span>4 Hours Live</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>10 Operators</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Built On Your Business</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
