import { Navbar } from "@/components/ui/Navbar";
import { HomeStickyNav } from "@/components/ui/HomeStickyNav";
import { ResultsShowcase } from "@/components/ui/ResultsShowcase";
import { SocialProofBar } from "@/components/ui/SocialProofBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Results — What We Build & What It Produces | MyNewStaff.ai",
  description:
    "See the autonomous revenue machines we've built — 3D websites, AI voice chatbots, behavioral email engines, lead scraping pipelines. Real builds. Real systems. Real pipeline.",
};

export default function Results() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* Hero */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-[1100px] mx-auto text-center">
            <span className="block text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6">
              The Proof
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold uppercase leading-[0.9] mb-8">
              WE DON&apos;T SHOW <br />
              <span className="shimmer-text">MOCKUPS.</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
              Every build below is a real, deployed system generating pipeline right now.
              Not proposals. Not wireframes. Revenue machines — live and running.
            </p>
          </div>
        </section>

        <SocialProofBar />

        {/* Case Studies */}
        <section className="px-4 py-20">
          <div className="max-w-[1100px] mx-auto">
            <ResultsShowcase />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-4 pb-32">
          <div className="max-w-[1100px] mx-auto text-center py-16 border border-white/10">
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase mb-4">
              Ready to Be <span className="shimmer-text">Next?</span>
            </h2>
            <p className="text-sm text-zinc-500 font-sans max-w-md mx-auto mb-8">
              Get your free ScaleX AI diagnostic. See exactly where your pipeline is leaking — then let us build the machine to fix it.
            </p>
            <a
              href="/scalex"
              className="inline-block px-10 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors"
            >
              Get Your Free ScaleX AI Score
            </a>
          </div>
        </section>
      </main>
      <HomeStickyNav />
    </>
  );
}
