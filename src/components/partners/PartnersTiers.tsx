"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface Bundle {
  name: string;
  detail: string;
}

interface Tier {
  credits: string;
  trade: string;
  requirements: string[];
  bundles: Bundle[];
  delivery: string;
  accent: string;
}

const tiers: Tier[] = [
  {
    credits: "$500",
    trade: "4 Stories (or equivalent)",
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
      },
      {
        name: "Content Pack Starter",
        detail: "12 hooks + captions + 2-week posting plan",
      },
      {
        name: "AI Visuals Pack",
        detail: "10 branded visuals for posts + story backgrounds",
      },
    ],
    delivery: "72 hours",
    accent: "border-zinc-700",
  },
  {
    credits: "$1,500",
    trade: "1 Reel + 3 Stories",
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
        detail: "1-page landing page in MyNewStaff.ai style + copy + CTA sections",
      },
      {
        name: "Explainer Video Kit",
        detail: "60–90 sec explainer video — script + AI voiceover",
      },
      {
        name: "Press Kit Pro",
        detail: "5–7 page PDF deck: story, offer, audience, metrics, examples",
      },
    ],
    delivery: "5 business days",
    accent: "border-white/20",
  },
  {
    credits: "$3,500",
    trade: "3 Reels + 6 Stories (over 10–14 days)",
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
      },
      {
        name: "One Month Content Machine",
        detail: "30 carousels + 10 AI visuals + 12 hooks & captions",
      },
      {
        name: "Authority Builder",
        detail: "Press Kit Pro + explainer video + 10 AI visuals",
      },
    ],
    delivery: "7–10 business days",
    accent: "border-white/40",
  },
];

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const [selectedBundle, setSelectedBundle] = useState(0);

  return (
    <div
      className={`border ${tier.accent} bg-zinc-950/50 flex flex-col h-full`}
    >
      {/* Header */}
      <div className="p-8 md:p-10 border-b border-white/5">
        <span className="block text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-2 font-sans">
          Credit Level {index + 1}
        </span>
        <h3 className="font-wide text-4xl md:text-5xl uppercase text-white mb-2">
          {tier.credits}
        </h3>
        <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
          Build Credits
        </p>
      </div>

      {/* Trade */}
      <div className="px-8 md:px-10 py-6 border-b border-white/5">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-2 font-sans">
          Typical Trade
        </span>
        <p className="text-sm text-zinc-300 font-sans">{tier.trade}</p>
      </div>

      {/* Requirements */}
      <div className="px-8 md:px-10 py-6 border-b border-white/5 flex-1">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4 font-sans">
          Posting Requirements
        </span>
        <ul className="space-y-2">
          {tier.requirements.map((req, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-zinc-400 font-sans leading-relaxed"
            >
              <span className="text-zinc-600 mt-0.5 shrink-0">—</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Bundles */}
      <div className="px-8 md:px-10 py-6 border-b border-white/5">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4 font-sans">
          Choose 1 Bundle
        </span>
        <div className="space-y-2">
          {tier.bundles.map((bundle, i) => (
            <button
              key={i}
              onClick={() => setSelectedBundle(i)}
              className={`w-full text-left p-4 border transition-all cursor-pointer ${
                selectedBundle === i
                  ? "border-white/30 bg-white/5"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <span className="block text-sm text-white font-sans mb-1">
                {bundle.name}
              </span>
              <span className="block text-[11px] text-zinc-500 font-sans leading-relaxed">
                {bundle.detail}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Delivery */}
      <div className="px-8 md:px-10 py-6">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-1 font-sans">
          Delivery Time
        </span>
        <p className="text-sm text-white font-sans">{tier.delivery}</p>
        <p className="text-[10px] text-zinc-600 font-sans mt-1">
          after intake
        </p>
      </div>
    </div>
  );
}

export function PartnersTiers() {
  return (
    <section id="tiers" className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5">
      <Reveal className="max-w-6xl mx-auto text-center mb-16">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          Credit Tiers
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white">
          PICK YOUR <span className="shimmer-text">LEVEL.</span>
        </h2>
      </Reveal>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px">
        {tiers.map((tier, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <TierCard tier={tier} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
