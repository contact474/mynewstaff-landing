"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { PartnersApplyModal } from "./PartnersApplyModal";

/* ───────────────────── Data ───────────────────── */

interface Bundle {
  name: string;
  detail: string;
  useCase: string;
  projection: string;
  deliverables: string[];
}

interface Tier {
  credits: string;
  value: number;
  trade: string;
  requirements: string[];
  bundles: Bundle[];
  delivery: string;
  spots: number;
}

const tiers: Tier[] = [
  {
    credits: "$500",
    value: 500,
    trade: "4 Stories (or equivalent)",
    spots: 4,
    requirements: [
      "4 Stories within 48–72 hours",
      "Tag: @ga.god and @mynewstaff.ai",
      "Link sticker to tracking URL we provide",
      'Save to Highlight for 7 days ("Tools" or "Business")',
    ],
    bundles: [
      {
        name: "Press Kit Lite",
        detail: "1-page PDF: bio, audience, positioning, collab contact",
        useCase:
          "Perfect for creators who need a professional media kit to land more brand deals and sponsorships.",
        projection:
          "Creators with professional press kits see up to 3x more inbound brand inquiries.",
        deliverables: [
          "Professional 1-page PDF media kit",
          "Audience demographics breakdown",
          "Brand positioning statement",
          "Collaboration contact section",
        ],
      },
      {
        name: "Content Pack Starter",
        detail: "12 hooks + captions + 2-week posting plan",
        useCase:
          "For creators stuck in a content rut who need a system to post consistently and grow engagement.",
        projection:
          "Consistent posting with optimized hooks can increase reach 40-60% within the first month.",
        deliverables: [
          "12 scroll-stopping hooks",
          "12 engagement-optimized captions",
          "2-week content calendar",
          "Best posting times analysis",
        ],
      },
      {
        name: "AI Visuals Pack",
        detail: "10 branded visuals for posts + story backgrounds",
        useCase:
          "Elevate your feed aesthetic instantly. Professional branded visuals that make your profile look premium.",
        projection:
          "Consistent visual branding increases profile visit-to-follow rate by 25-35%.",
        deliverables: [
          "10 branded post visuals",
          "Story background templates",
          "Color palette + typography guide",
          "Source files for future use",
        ],
      },
    ],
    delivery: "72 hours",
  },
  {
    credits: "$1,500",
    value: 1500,
    trade: "1 Reel + 3 Stories",
    spots: 3,
    requirements: [
      "1 Reel (15–30 sec)",
      "3 Stories supporting the reel within 72 hours",
      "Tag + link sticker",
      "Pin reel for 7 days",
      "MyNewStaff can repost organically for 30 days",
    ],
    bundles: [
      {
        name: "Landing Page Kit",
        detail:
          "1-page landing page in MyNewStaff.ai style + copy + CTA sections",
        useCase:
          "Turn your audience into leads and customers with a conversion-optimized page that captures emails and drives sales.",
        projection:
          "Custom landing pages convert at 15-25% vs 3% on standard link-in-bio tools.",
        deliverables: [
          "Custom 1-page landing page",
          "Conversion-optimized copy",
          "CTA sections + email capture",
          "Mobile-responsive design",
          "Hosted on your domain",
        ],
      },
      {
        name: "Explainer Video Kit",
        detail: "60–90 sec explainer video — script + AI voiceover",
        useCase:
          "A professional explainer video you can use in your bio, stories, or pitches to instantly communicate your value proposition.",
        projection:
          "Video explainers increase conversion rates by 20% and reduce time-to-close on brand deals.",
        deliverables: [
          "60–90 second explainer video",
          "Professional script writing",
          "AI voiceover production",
          "Slide-based visual design",
          "Multiple format exports (16:9, 9:16, 1:1)",
        ],
      },
      {
        name: "Press Kit Pro",
        detail:
          "5–7 page PDF deck: story, offer, audience, metrics, examples",
        useCase:
          "The full professional package for creators serious about landing $5k-$50k brand partnerships.",
        projection:
          "Pro-level press kits are the #1 factor brands cite when choosing between similar creators.",
        deliverables: [
          "5–7 page designed PDF deck",
          "Your story + brand narrative",
          "Audience demographics + metrics",
          "Past collaboration examples",
          "Rate card + partnership tiers",
        ],
      },
    ],
    delivery: "5 business days",
  },
  {
    credits: "$3,500",
    value: 3500,
    trade: "3 Reels + 6 Stories (over 10–14 days)",
    spots: 2,
    requirements: [
      "3 Reels over 10–14 days (min 72h between)",
      "6 Stories total (2 per reel)",
      "Tag + link sticker",
      "Pin best-performing reel for 14 days",
      "MyNewStaff can repost organically for 30 days",
    ],
    bundles: [
      {
        name: "Visibility Stack",
        detail: "Landing page (1-page) + Press Kit Pro",
        useCase:
          "The complete online presence upgrade. Your own conversion page plus a professional press kit — everything you need to close bigger deals.",
        projection:
          "Creators with both a landing page and press kit close brand deals 4x faster.",
        deliverables: [
          "Custom landing page (fully hosted)",
          "5–7 page press kit PDF",
          "Conversion-optimized copy",
          "Email capture integration",
          "Mobile-responsive design",
          "Rate card + partnership tiers",
        ],
      },
      {
        name: "One Month Content Machine",
        detail: "30 carousels + 10 AI visuals + 12 hooks & captions",
        useCase:
          "Never run out of content again. One full month of daily branded carousels, visual assets, and engagement-driving copy.",
        projection:
          "Daily posting with carousel content generates 3-5x more saves and shares than single-image posts.",
        deliverables: [
          "30 branded carousel posts",
          "10 AI-generated visual assets",
          "12 scroll-stopping hooks",
          "12 engagement-optimized captions",
          "Monthly content calendar",
          "Performance tracking template",
        ],
      },
      {
        name: "Authority Builder",
        detail: "Press Kit Pro + explainer video + 10 AI visuals",
        useCase:
          "Position yourself as the go-to expert in your niche. Pro media kit, professional video, and branded visuals that scream credibility.",
        projection:
          "Full authority positioning packages increase average deal size by 60-80%.",
        deliverables: [
          "5–7 page press kit PDF",
          "60–90 sec explainer video",
          "10 branded visual assets",
          "Professional script + voiceover",
          "Brand positioning strategy",
          "Source files for all assets",
        ],
      },
    ],
    delivery: "7–10 business days",
  },
];

/* ───────────────────── Components ───────────────────── */

function BundlePreview({
  tier,
  bundle,
  onApply,
}: {
  tier: Tier;
  bundle: Bundle;
  onApply: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border border-white/10 bg-zinc-950/80 mt-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: What You Get */}
        <div className="p-8 md:p-10 lg:border-r border-white/5">
          <span className="block text-[10px] tracking-[0.3em] text-green-400/80 uppercase mb-4 font-sans">
            What You Get
          </span>
          <h4 className="font-wide text-xl uppercase text-white mb-3">
            {bundle.name}
          </h4>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
            {bundle.detail}
          </p>
          <ul className="space-y-2 mb-6">
            {bundle.deliverables.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-zinc-300 font-sans leading-relaxed"
              >
                <span className="text-green-400/60 mt-0.5 shrink-0">+</span>
                {d}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 pt-4 border-t border-white/5">
            <div>
              <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                Delivery
              </span>
              <span className="text-sm text-white font-sans">
                {tier.delivery}
              </span>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                Value
              </span>
              <span className="text-sm text-white font-sans">
                {tier.credits}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Why + What You Give */}
        <div className="p-8 md:p-10 flex flex-col">
          {/* Use Case */}
          <div className="mb-6">
            <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-3 font-sans">
              Why This Matters For You
            </span>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {bundle.useCase}
            </p>
          </div>

          {/* Projection */}
          <div className="p-4 border border-white/5 bg-white/[0.02] mb-6">
            <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2 font-sans">
              Projected Impact
            </span>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
              &ldquo;{bundle.projection}&rdquo;
            </p>
          </div>

          {/* What You Give */}
          <div className="mb-6">
            <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3 font-sans">
              What You Post
            </span>
            <p className="text-sm text-zinc-400 font-sans mb-2">
              {tier.trade}
            </p>
            <ul className="space-y-1">
              {tier.requirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[11px] text-zinc-500 font-sans"
                >
                  <span className="text-zinc-700 shrink-0">—</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Apply CTA */}
          <div className="mt-auto pt-4">
            <button
              onClick={onApply}
              className="w-full py-4 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Lock This In — Apply Now
            </button>
            <p className="text-[10px] text-zinc-600 font-sans text-center mt-2">
              Only {tier.spots} spots left this quarter
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────── Main Export ───────────────────── */

export function PartnersTiers() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleTierSelect = (tierIdx: number) => {
    if (selectedTier === tierIdx) {
      setSelectedTier(null);
      setSelectedBundle(null);
    } else {
      setSelectedTier(tierIdx);
      setSelectedBundle(null);
    }
  };

  const handleBundleSelect = (bundleIdx: number) => {
    setSelectedBundle(bundleIdx);
    setTimeout(() => {
      previewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const activeTier = selectedTier !== null ? tiers[selectedTier] : null;
  const activeBundle =
    activeTier && selectedBundle !== null
      ? activeTier.bundles[selectedBundle]
      : null;

  return (
    <>
      <section
        id="tiers"
        className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5"
      >
        <Reveal className="max-w-6xl mx-auto text-center mb-16">
          <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
            Credit Tiers
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
            PICK YOUR <span className="shimmer-text">LEVEL.</span>
          </h2>
          <p className="text-xs text-zinc-500 font-sans tracking-[0.15em] uppercase">
            Limited to 10 partners per quarter — {tiers.reduce((s, t) => s + t.spots, 0)} spots remaining
          </p>
        </Reveal>

        {/* Tier Selector Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px mb-0">
          {tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <button
                onClick={() => handleTierSelect(i)}
                className={`w-full text-left border transition-all duration-300 cursor-pointer ${
                  selectedTier === i
                    ? "border-white/30 bg-white/5"
                    : selectedTier !== null
                      ? "border-white/5 bg-zinc-950/30 opacity-50 hover:opacity-80"
                      : "border-white/10 bg-zinc-950/50 hover:border-white/20"
                }`}
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase font-sans">
                      Credit Level {i + 1}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-sans px-2 py-0.5 border border-amber-500/30 text-amber-400/80">
                      {tier.spots} spots
                    </span>
                  </div>
                  <h3 className="font-wide text-4xl md:text-5xl uppercase text-white mb-2">
                    {tier.credits}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans mb-4">
                    Build Credits
                  </p>
                  <p className="text-sm text-zinc-400 font-sans">
                    {tier.trade}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-sans">
                      {tier.bundles.length} bundles available
                    </span>
                    <span
                      className={`text-xs font-sans transition-colors ${selectedTier === i ? "text-white" : "text-zinc-600"}`}
                    >
                      {selectedTier === i ? "Selected ↓" : "Select →"}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Expanded Bundle Selector */}
        <AnimatePresence mode="wait">
          {activeTier && (
            <motion.div
              key={`tier-${selectedTier}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl mx-auto overflow-hidden"
            >
              <div className="pt-8">
                <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4 font-sans text-center">
                  Choose Your Bundle — {activeTier.credits} tier
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeTier.bundles.map((bundle, i) => (
                    <button
                      key={i}
                      onClick={() => handleBundleSelect(i)}
                      className={`text-left p-6 border transition-all duration-200 cursor-pointer ${
                        selectedBundle === i
                          ? "border-white/30 bg-white/5"
                          : "border-white/8 hover:border-white/20 bg-zinc-950/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm text-white font-sans font-medium">
                          {bundle.name}
                        </span>
                        {selectedBundle === i && (
                          <span className="text-[9px] tracking-[0.15em] text-green-400/80 uppercase font-sans">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                        {bundle.detail}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bundle Preview */}
              <div ref={previewRef}>
                <AnimatePresence mode="wait">
                  {activeBundle && activeTier && (
                    <BundlePreview
                      key={`bundle-${selectedTier}-${selectedBundle}`}
                      tier={activeTier}
                      bundle={activeBundle}
                      onApply={() => setApplyOpen(true)}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Not sure hint */}
              {selectedBundle === null && (
                <p className="text-center text-[11px] text-zinc-600 font-sans mt-6">
                  Select a bundle above to see the full breakdown and apply
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Application Modal */}
      <PartnersApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        tier={activeTier}
        bundle={activeBundle}
      />
    </>
  );
}
