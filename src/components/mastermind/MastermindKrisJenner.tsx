"use client";

import { Reveal } from "@/components/ui/Reveal";

export function MastermindKrisJenner() {
  return (
    <section className="border-t border-white/5">
      <Reveal>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 min-h-[400px] md:min-h-[500px]">
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              <video
                src="/videos/kris-jenner.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/60 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:hidden" />
            </div>
            <div className="flex flex-col items-start justify-center p-8 md:p-14 lg:p-20 bg-zinc-950">
              <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-6 font-sans">
                Built for the Kardashians
              </span>
              <p className="text-xl md:text-2xl lg:text-3xl text-white font-sans leading-relaxed mb-8">
                &ldquo;We built growth systems for the Kardashian-Jenner brand.
                Here&apos;s what Kris Jenner had to say about working with our
                founder.&rdquo;
              </p>
              <div className="w-12 h-px bg-amber-400/40 mb-6" />
              <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                Kris Jenner — on working with Luka Lah
              </p>
              <a
                href="#booking"
                className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#FDEC00] text-black font-bold text-[11px] tracking-[0.2em] uppercase hover:scale-105 transition-transform"
              >
                Book Discovery Call
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
