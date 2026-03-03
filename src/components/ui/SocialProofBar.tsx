"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "$10M+", label: "Pipeline Generated" },
  { value: "50K+", label: "Leads Scraped" },
  { value: "7-14", label: "Days to Deploy" },
  { value: "90%", label: "Cost Reduction" },
];

export function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full border-y border-white/10 bg-white/[0.02]"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`py-8 md:py-10 text-center ${
              i < stats.length - 1 ? "md:border-r border-white/10" : ""
            } ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""} ${
              i === 0 ? "border-r border-white/10 md:border-r" : ""
            }`}
          >
            <span className="block text-2xl md:text-3xl font-wide font-bold tracking-tight">
              {stat.value}
            </span>
            <span className="block text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-zinc-500 mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
