import { Navbar } from "@/components/ui/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { PartnersTiers } from "@/components/partners/PartnersTiers";
import { PartnersBigPlays } from "@/components/partners/PartnersBigPlays";
import { PartnersProof } from "@/components/partners/PartnersProof";
import { PartnersSteps } from "@/components/partners/PartnersSteps";
import { PartnersTerms } from "@/components/partners/PartnersTerms";
import { PartnersSpanish } from "@/components/partners/PartnersSpanish";
import { HeroCrowd } from "@/components/partners/HeroCrowd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us | MyNewStaff.ai — Influencer Barter Program",
  description:
    "Post content. Earn build credits. Redeem landing pages, explainer videos, press kits, AI content and growth assets from MyNewStaff.ai.",
};

export default function Partners() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black">
        {/* Hero */}
        <section id="hero-section" className="h-[100dvh] w-full flex flex-col justify-center items-center text-center relative" style={{ clipPath: "inset(0)", overflow: "hidden", contain: "paint" }}>
          <div
            className="absolute inset-0 z-0 opacity-40 smooth-zoom-bg"
            style={{
              backgroundImage: "url('/assets/hero_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Influencer crowd at bottom with parallax + flash effects */}
          <HeroCrowd />
          <div className="z-10 relative px-4 max-w-4xl mb-24 md:mb-32">
            <Reveal>
              <span className="block text-xs md:text-sm tracking-[0.25em] mb-6 text-white/50 font-wide shimmer-text">
                INFLUENCER BARTER PROGRAM
              </span>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
                POST CONTENT.
                <br />
                <span className="shimmer-text">EARN CREDITS.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-8 text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-sans">
                Promote MyNewStaff.ai and redeem build credits for landing
                pages, explainer videos, press kits, AI-generated content, and
                growth assets.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <a
                href="#tiers"
                className="inline-block mt-10 px-10 py-4 rounded-full border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-sans hover:bg-white/5 transition-colors"
              >
                Build Your Package
              </a>
            </Reveal>
            <Reveal delay={0.65}>
              <p className="mt-6 text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                Limited to 10 partners per quarter &bull; Q1 2026
              </p>
            </Reveal>
          </div>
        </section>

        {/* How It Works */}
        <PartnersSteps />

        {/* Proof of Work */}
        <PartnersProof />

        {/* Credit Tiers */}
        <PartnersTiers />

        {/* Bigger Plays */}
        <PartnersBigPlays />

        {/* Add-on */}
        <section className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5">
          <Reveal className="max-w-3xl mx-auto text-center">
            <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
              Optional Add-on
            </span>
            <h3 className="font-wide text-2xl md:text-4xl uppercase text-white mb-4">
              PAID USAGE RIGHTS
            </h3>
            <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-2">
              +$1,000 (or negotiated)
            </p>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed max-w-lg mx-auto">
              Allows MyNewStaff to run your influencer content as paid ads for
              30 days. Whitelisting optional.
            </p>
          </Reveal>
        </section>

        {/* Terms */}
        <PartnersTerms />

        {/* Spanish Version */}
        <PartnersSpanish />

        {/* Final CTA */}
        <section className="py-24 md:py-40 px-4 md:px-8 border-t border-white/5 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-8">
              READY TO <span className="shimmer-text">PARTNER?</span>
            </h2>
            <p className="text-sm text-zinc-400 font-sans max-w-md mx-auto mb-10 leading-relaxed">
              DM us on Instagram or reach out via email to lock in your tier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/mynewstaff.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-105 transition-transform"
              >
                DM on Instagram
              </a>
              <a
                href="mailto:contact@mynewstaff.ai"
                className="inline-block px-10 py-4 rounded-full border border-white/20 text-white text-xs tracking-[0.15em] uppercase hover:bg-white/5 transition-colors"
              >
                Email Us
              </a>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
