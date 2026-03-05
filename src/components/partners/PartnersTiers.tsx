"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { PartnersApplyModal } from "./PartnersApplyModal";
import { usePartnerLocale } from "./PartnersLocaleProvider";
import type { TierData } from "@/lib/partners-i18n";

/* ───────────────────── Interfaces ───────────────────── */

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
  const { t } = usePartnerLocale();

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
            {t.tiers.whatYouGet}
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
                {t.tiers.delivery}
              </span>
              <span className="text-sm text-white font-sans">
                {tier.delivery}
              </span>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                {t.tiers.value}
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
              {t.tiers.whyThisMatters}
            </span>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {bundle.useCase}
            </p>
          </div>

          {/* Projection */}
          <div className="p-4 border border-white/5 bg-white/[0.02] mb-6">
            <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2 font-sans">
              {t.tiers.projectedImpact}
            </span>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
              &ldquo;{bundle.projection}&rdquo;
            </p>
          </div>

          {/* What You Give */}
          <div className="mb-6">
            <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3 font-sans">
              {t.tiers.whatYouPost}
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
              {t.tiers.lockThisIn}
            </button>
            <p className="text-[10px] text-zinc-600 font-sans text-center mt-2">
              {t.tiers.spotsLeftPrefix}{tier.spots}{t.tiers.spotsLeftSuffix}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────── Main Export ───────────────────── */

export function PartnersTiers() {
  const { t } = usePartnerLocale();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const tiers: Tier[] = t.tiers.data;
  const totalSpots = tiers.reduce((s, tier) => s + tier.spots, 0);

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
            {t.tiers.label}
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
            {t.tiers.heading} <span className="shimmer-text">{t.tiers.headingAccent}</span>
          </h2>
          <p className="text-xs text-zinc-500 font-sans tracking-[0.15em] uppercase">
            {t.tiers.spotsRemaining.replace("{count}", String(totalSpots))}
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
                      {t.tiers.creditLevel.replace("{n}", String(i + 1))}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-sans px-2 py-0.5 border border-amber-500/30 text-amber-400/80">
                      {t.tiers.spots.replace("{n}", String(tier.spots))}
                    </span>
                  </div>
                  <h3 className="font-wide text-4xl md:text-5xl uppercase text-white mb-2">
                    <RollingNumber value={tier.value} prefix="$" separator duration={1800} />
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans mb-4">
                    {t.tiers.buildCredits}
                  </p>
                  <p className="text-sm text-zinc-400 font-sans">
                    {tier.trade}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-sans">
                      {t.tiers.bundlesAvailable.replace("{n}", String(tier.bundles.length))}
                    </span>
                    <span
                      className={`text-xs font-sans transition-colors ${selectedTier === i ? "text-white" : "text-zinc-600"}`}
                    >
                      {selectedTier === i ? t.tiers.selected : t.tiers.select}
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
                  {t.tiers.chooseBundlePrefix}{activeTier.credits}{t.tiers.chooseBundleSuffix}
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
                            {t.tiers.selectedLabel}
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
                  {t.tiers.selectBundleHint}
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
