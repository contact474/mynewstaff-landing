"use client";

import { AI_TOOLS } from "@/lib/ai/types";
import { useSubscription } from "@/lib/supabase/auth-context";
import { hasAccess, type Feature, TIER_LABELS, FEATURE_TIERS } from "@/lib/tiers";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AIToolsPage() {
  const { tier } = useSubscription();

  return (
    <div>
      <div className="mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 block mb-2">AI Marketing Guide</span>
        <h1 className="text-3xl font-wide font-bold uppercase">AI Tools</h1>
        <p className="text-sm text-zinc-400 font-sans mt-3 max-w-lg">
          Generate personalized marketing assets powered by your ScaleX diagnostic data. Each tool uses AI to create strategies tailored to your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {AI_TOOLS.map((tool, i) => {
          const feature = tool.type === "marketing_play" ? "marketing_plays" : tool.type as Feature;
          const locked = !hasAccess(tier, feature);

          return (
            <motion.div
              key={tool.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={`relative border border-white/10 p-8 ${locked ? "opacity-60" : "hover:bg-white/[0.02]"} transition-all`}
            >
              {locked && (
                <div className="absolute top-4 right-4">
                  <span className="text-[8px] tracking-[0.2em] uppercase text-zinc-600 border border-white/10 px-2 py-1">
                    {TIER_LABELS[FEATURE_TIERS[feature]]}+
                  </span>
                </div>
              )}

              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                </svg>
              </div>

              <h3 className="text-sm font-wide font-bold uppercase mb-2">{tool.name}</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">{tool.description}</p>

              {locked ? (
                <Link
                  href="/scalex/pricing"
                  className="inline-block text-[10px] tracking-[0.2em] uppercase text-zinc-500 border border-white/10 px-4 py-2 hover:border-white/20 transition-all"
                >
                  Upgrade to Unlock
                </Link>
              ) : (
                <Link
                  href={`/app/ai-tools/${tool.type.replace(/_/g, "-")}`}
                  className="inline-block text-[10px] tracking-[0.25em] uppercase font-bold bg-white text-black px-6 py-3 hover:bg-white/90 transition-all"
                >
                  Launch Tool
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
