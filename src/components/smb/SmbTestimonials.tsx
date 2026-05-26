"use client";

import { Reveal } from "@/components/ui/Reveal";

type VideoTestimonial = {
  igUrl: string;
  name: string;
  role: string;
  quote: string;
  badge: string;
};

const VIDEOS: VideoTestimonial[] = [
  {
    igUrl: "https://www.instagram.com/reel/DX4en6gxQYf/",
    name: "Mastermind Client",
    role: "Service Business Owner",
    quote: "If you would do it alone is a totally different story.",
    badge: "HE PAID. HERE'S WHAT HE THINKS.",
  },
];

export function SmbTestimonials() {
  return (
    <section className="border-t border-white/5 py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">
              Real Results
            </p>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
              Don&apos;t take our word.{" "}
              <span className="shimmer-text">Watch.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-1 max-w-3xl mx-auto">
          {VIDEOS.map((v) => (
            <Reveal key={v.igUrl} delay={0.15}>
              <div className="group relative">
                {/* Card */}
                <a
                  href={v.igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-[28px] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 bg-zinc-950 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                >
                  {/* Cinematic gradient bg */}
                  <div
                    className="w-full"
                    style={{
                      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)",
                      height: "360px",
                    }}
                  />

                  {/* Overlay content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Play button */}
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_15px_50px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase mt-4">
                      Watch on Instagram
                    </span>
                  </div>

                  {/* Bottom quote overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 mb-3">
                      <span className="text-[9px] tracking-[0.2em] text-amber-400 uppercase font-bold">
                        {v.badge}
                      </span>
                    </div>
                    <p className="text-lg md:text-xl text-white font-wide font-bold leading-snug">
                      &ldquo;{v.quote}&rdquo;
                    </p>
                    <p className="text-[10px] text-zinc-400 tracking-wider uppercase mt-2">
                      {v.name} · {v.role}
                    </p>
                  </div>
                </a>

                {/* Credit line */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <span className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
                    @ga.god × @yerammurillo
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
