import Link from "next/link";

interface ScaleXBannerProps {
  headline?: string;
  subtext?: string;
}

export function ScaleXBanner({
  headline = "See Where You Stand",
  subtext = "Get your free ScaleX AI diagnostic. 60 seconds. 10 pillars scored. See exactly where your growth is leaking — then talk to our AI advisor about how to fix it.",
}: ScaleXBannerProps) {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-[900px] mx-auto text-center">
        <span className="block text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-4">
          Free AI Diagnostic
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-6">
          {headline.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="shimmer-text">
            {headline.split(" ").slice(-1)[0]}
          </span>
        </h2>
        <p className="text-sm text-zinc-400 font-sans max-w-lg mx-auto mb-10 leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/scalex"
            className="inline-block px-10 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors"
          >
            Get Your Free ScaleX Score
          </Link>
          <Link
            href="/escalax"
            className="inline-block px-10 py-5 border border-white/20 text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/5 transition-colors"
          >
            En Espanol
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] tracking-[0.15em] uppercase text-zinc-600">
          <span>10 Pillars</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>AI-Powered</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>60 Seconds</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>100% Free</span>
        </div>
      </div>
    </section>
  );
}
