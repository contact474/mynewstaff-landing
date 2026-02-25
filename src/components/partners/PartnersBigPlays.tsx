"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { PartnersApplyModal } from "./PartnersApplyModal";

const plays = [
  {
    tag: "Option A",
    name: "BUSINESS-IN-A-BOX",
    subtitle: "Franchise Model",
    credits: "$7,500",
    value: 7500,
    trade: "Custom scope (alignment call required)",
    delivery: "7–10 business days (after alignment call)",
    description:
      "Turn your audience into a revenue engine by selling MyNewStaff.ai services under your brand. We fulfill delivery behind the scenes.",
    highlight: "30% commission on all sales (cash collected)",
    includes: [
      "White-label offer kit (positioning + package structure)",
      "Sales assets (deck + scripts + DM flow)",
      "Delivery playbook + fulfillment pipeline",
      '"What to sell" menu: Mission Control, lead gen, content systems',
    ],
    whoItsFor:
      "Operators, agency owners, and high-influence creators who want to resell premium AI marketing services without building the backend.",
    projection:
      "Partners reselling services at $3K–$10K/client earn $900–$3,000 per deal. 3 deals covers the full barter value.",
  },
  {
    tag: "Option B",
    name: "90-DAY BLITZ",
    subtitle: "Full-Scale Build",
    credits: "$71,900",
    value: 71900,
    trade: "Custom scope (strategy session required)",
    delivery: "90 days (weekly milestones)",
    description:
      "We build, launch, and scale your business with a full system. Content, outreach, conversion assets, and growth ops.",
    highlight: "5x step-change in visibility + pipeline",
    phases: [
      "Build the machine",
      "Launch the offer",
      "Scale distribution",
      "Drive 5x growth",
    ],
    includes: [
      "Brand + offer architecture",
      "Landing pages + conversion assets",
      "Press / media kit",
      "Content production system (monthly)",
      "Lead gen + outreach system",
      "Mission Control buildout (CRM + automation)",
      "Weekly optimization cadence for 90 days",
    ],
    whoItsFor:
      "Ambitious founders and established creators ready for a full-scale digital transformation — brand, content, outreach, and systems all built in 90 days.",
    projection:
      "Clients in the 90-Day Blitz see an average 5x increase in qualified pipeline and 3x increase in content output within the first 60 days.",
  },
];

export function PartnersBigPlays() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyPlay, setApplyPlay] = useState<(typeof plays)[0] | null>(null);

  const handleApply = (play: (typeof plays)[0]) => {
    setApplyPlay(play);
    setApplyOpen(true);
  };

  return (
    <>
      <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
        <Reveal className="max-w-5xl mx-auto text-center mb-16">
          <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
            For Operators
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
            BIGGER <span className="shimmer-text">PLAYS.</span>
          </h2>
          <p className="text-xs text-zinc-500 font-sans tracking-[0.15em] uppercase">
            Ready to go beyond barter? These are full-scale partnerships.
          </p>
        </Reveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
          {plays.map((play, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <button
                onClick={() =>
                  setExpanded(expanded === i ? null : i)
                }
                className={`w-full text-left border transition-all duration-300 cursor-pointer h-full ${
                  expanded === i
                    ? "border-white/30 bg-white/[0.04]"
                    : expanded !== null
                      ? "border-white/5 opacity-50 hover:opacity-80"
                      : "border-white/10 hover:border-white/20"
                } ${i === 1 && expanded !== i ? "md:border-l-0" : ""}`}
              >
                <div className="p-10 md:p-12 flex flex-col h-full">
                  <span className="block text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
                    {play.tag}
                  </span>
                  <h3 className="font-wide text-2xl md:text-3xl uppercase text-white mb-2">
                    {play.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans mb-1">
                    {play.subtitle}
                  </p>
                  <p className="text-sm text-zinc-400 font-sans mb-6">
                    Value:{" "}
                    <span className="text-white font-wide text-lg">
                      {play.credits}
                    </span>
                  </p>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                    {play.description}
                  </p>
                  <p className="text-sm text-white font-sans font-medium mb-6">
                    {play.highlight}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-sans">
                      {play.includes.length} deliverables
                    </span>
                    <span
                      className={`text-xs font-sans transition-colors ${expanded === i ? "text-white" : "text-zinc-600"}`}
                    >
                      {expanded === i ? "Details ↓" : "View Details →"}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence mode="wait">
          {expanded !== null && (
            <motion.div
              key={`play-${expanded}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="border border-white/10 border-t-0 bg-zinc-950/80"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left: What's Included */}
                  <div className="p-8 md:p-10 lg:border-r border-white/5">
                    <span className="block text-[10px] tracking-[0.3em] text-green-400/80 uppercase mb-4 font-sans">
                      What&apos;s Included
                    </span>
                    <ul className="space-y-3 mb-6">
                      {plays[expanded].includes.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm text-zinc-300 font-sans leading-relaxed"
                        >
                          <span className="text-green-400/60 mt-0.5 shrink-0">
                            +
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Phases (for 90-Day Blitz) */}
                    {plays[expanded].phases && (
                      <div className="mb-6">
                        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-3 font-sans">
                          Phases
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {plays[expanded].phases!.map((phase, j) => (
                            <div
                              key={j}
                              className="p-3 border border-white/5 text-center"
                            >
                              <span className="text-[10px] text-zinc-400 font-sans">
                                {phase}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                      <div>
                        <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                          Delivery
                        </span>
                        <span className="text-sm text-white font-sans">
                          {plays[expanded].delivery}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                          Value
                        </span>
                        <span className="text-sm text-white font-sans">
                          {plays[expanded].credits}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Who + Why + Apply */}
                  <div className="p-8 md:p-10 flex flex-col">
                    <div className="mb-6">
                      <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-3 font-sans">
                        Who This Is For
                      </span>
                      <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                        {plays[expanded].whoItsFor}
                      </p>
                    </div>

                    <div className="p-4 border border-white/5 bg-white/[0.02] mb-6">
                      <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2 font-sans">
                        Projected Impact
                      </span>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                        &ldquo;{plays[expanded].projection}&rdquo;
                      </p>
                    </div>

                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => handleApply(plays[expanded!])}
                        className="w-full py-4 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-[1.02] transition-transform cursor-pointer"
                      >
                        Apply for {plays[expanded].name}
                      </button>
                      <p className="text-[10px] text-zinc-600 font-sans text-center mt-2">
                        By application only — schedule a strategy call
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Application Modal for bigger plays */}
      {applyPlay && (
        <PartnersApplyModal
          open={applyOpen}
          onClose={() => setApplyOpen(false)}
          tier={{
            credits: applyPlay.credits,
            trade: applyPlay.trade,
            delivery: applyPlay.delivery,
            value: applyPlay.value,
          }}
          bundle={{
            name: applyPlay.name,
            detail: applyPlay.subtitle + " — " + applyPlay.description,
          }}
        />
      )}
    </>
  );
}
