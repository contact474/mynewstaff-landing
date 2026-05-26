"use client";

import { Reveal } from "@/components/ui/Reveal";
import { HeroCrowd } from "@/components/partners/HeroCrowd";

const APPLY_URL =
  "https://wa.me/13058503664?text=Hey%20Luka!%20I%20want%20in%20on%20the%20AI%20Mastermind%20for%20service%20businesses%20%F0%9F%94%A5";

export function SmbHero() {
  return (
    <section
      id="hero-section"
      className="h-[100dvh] w-full flex flex-col justify-center items-center text-center relative"
      style={{ clipPath: "inset(0)", overflow: "hidden", contain: "paint" }}
    >
      <div
        className="absolute inset-0 z-0 opacity-40 smooth-zoom-bg"
        style={{
          backgroundImage: "url('/assets/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <HeroCrowd />
      <div className="z-10 relative px-4 max-w-4xl mb-24 md:mb-32">
        <Reveal>
          <span className="block text-xs md:text-sm tracking-[0.25em] mb-6 text-white/50 font-wide shimmer-text">
            ONLINE MASTERMIND — LIVE · 5 SEATS · SERVICE BUSINESSES ONLY
          </span>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
            WE BUILD.
            <br />
            <span className="shimmer-text">YOU OWN.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-8 text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-sans">
            You run a service business doing $20K&ndash;$500K/mo. You ARE the
            business &mdash; every lead, every follow-up, every hire runs through
            you. The bottleneck isn&rsquo;t hustle. It&rsquo;s systems and
            architecture. We deploy the same AI stack that generated $1.1M+ per
            client &mdash; live on your operation. One 4-hour session. You own
            everything we build.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a
              href="#booking"
              className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase hover:scale-105 transition-transform"
            >
              Book Discovery Call
            </a>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-green-500/30 text-green-400 text-xs tracking-[0.2em] uppercase hover:bg-green-500/10 transition-colors font-sans"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.65}>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/[0.08]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="text-[10px] tracking-[0.2em] text-amber-400/90 uppercase font-bold">
                2 of 5 seats remaining
              </span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
