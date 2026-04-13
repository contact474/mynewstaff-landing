"use client";

import { motion } from "framer-motion";

/**
 * Netflix/Apple-style infinite marquee showcasing the stack we install.
 * Dual rows moving in opposite directions, with gradient fade edges.
 */

const STACK_TOP = [
  "CLAUDE CODE",
  "GEMINI 3.1 LIVE",
  "ANTHROPIC API",
  "TWILIO VOICE",
  "NEXT.JS 16",
  "TAILWIND V4",
  "VERCEL",
  "CLOUDFLARE",
  "SUPABASE",
  "STRIPE",
  "DOCKER",
  "HOSTINGER VPS",
];

const STACK_BOTTOM = [
  "BROOKE AI",
  "CONTENT ENGINE",
  "FIRE SCORER",
  "AD ENGINE",
  "WHATSAPP BOT",
  "GHL CRM",
  "INSTANTLY",
  "APOLLO",
  "CLAY",
  "MAGIC UI",
  "FRAMER MOTION",
  "GSAP",
];

function MarqueeRow({
  items,
  direction = "left",
  duration = 40,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-6 shrink-0"
          >
            <span className="text-2xl md:text-4xl lg:text-5xl font-wide font-bold uppercase tracking-tighter text-white/20 hover:text-white/80 transition-colors">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function IntensiveMarquee() {
  return (
    <section className="border-t border-white/5 py-20 md:py-28 relative overflow-hidden">
      {/* Ambient noise layer */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="text-center mb-12 px-4">
        <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-3">
          The Stack We Install
        </p>
        <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase tracking-tighter">
          Every tool. <span className="shimmer-text">On your business.</span>
        </h2>
      </div>

      <div className="space-y-8">
        <MarqueeRow items={STACK_TOP} direction="left" duration={45} />
        <MarqueeRow items={STACK_BOTTOM} direction="right" duration={55} />
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent" />
    </section>
  );
}
