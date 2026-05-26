"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium urgency system — two components:
 *
 * 1. STICKY TOP BAR: countdown to next session + spots left
 *    - Stays pinned below nav after hero scroll
 *    - Countdown flips like a mechanical clock (best-converting pattern per
 *      Unbounce data: countdown timers increase CVR 8.6% avg)
 *    - Spots-left counter with pulsing dot (social proof scarcity)
 *
 * 2. INLINE URGENCY SECTION: placed above booking CTA
 *    - Larger countdown with context copy
 *    - "3 of 5 seats taken" progress bar
 */

const SPOTS_TOTAL = 5;
const SPOTS_LEFT = 2;

function getNextSession(): Date {
  // Saturday May 3, 2026 12:00 PM MST (UTC-7) = 19:00 UTC
  return new Date("2026-05-03T19:00:00Z");
}

type TimeLeft = { d: number; h: number; m: number; s: number };

function useCountdown(): TimeLeft {
  const target = useMemo(() => getNextSession(), []);
  const [time, setTime] = useState<TimeLeft>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, target.getTime() - Date.now());
      const s = Math.floor(diff / 1000);
      setTime({
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
        s: s % 60,
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-white/[0.08] border border-white/10 rounded-lg w-12 h-14 md:w-16 md:h-[4.5rem] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-3xl font-wide font-bold tabular-nums"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/5" />
      </div>
      <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-zinc-600 uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

/* ── STICKY BAR ── */
export function TradersStickyUrgency() {
  const time = useCountdown();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[9998] bg-black/90 backdrop-blur-xl border-b border-white/5"
        >
          <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 flex items-center justify-between gap-3 md:gap-4">
            {/* Left: countdown compact */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center gap-0.5 md:gap-1.5">
                {[
                  [time.d, "d"],
                  [time.h, "h"],
                  [time.m, "m"],
                  [time.s, "s"],
                ].map(([v, l]) => (
                  <div key={l as string} className="flex items-center">
                    <span className="bg-white/[0.08] rounded px-1.5 md:px-2 py-1 text-sm md:text-lg font-wide font-bold tabular-nums">
                      {String(v).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] md:text-[10px] text-zinc-600 mx-0.5">
                      {l as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center: spots */}
            <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span className="text-xs md:text-sm text-amber-400/90 font-bold tracking-wider uppercase">
                {SPOTS_LEFT} Left
              </span>
            </div>

            {/* Right: CTA */}
            <a
              href="#booking"
              className="shrink-0 px-4 md:px-6 py-2.5 rounded-full bg-white text-black font-bold text-[9px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase hover:scale-105 transition-transform"
            >
              Book Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── INLINE URGENCY SECTION ── */
export function TradersCountdownSection() {
  const time = useCountdown();
  const spotsTaken = SPOTS_TOTAL - SPOTS_LEFT;
  const pct = (spotsTaken / SPOTS_TOTAL) * 100;

  return (
    <section className="border-t border-white/5 py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">
          Next Session Starts In
        </p>

        {/* Big flip countdown */}
        <div className="flex items-center justify-center gap-3 md:gap-5 mb-8">
          <FlipUnit value={time.d} label="Days" />
          <span className="text-xl text-zinc-600 font-bold -mt-6">:</span>
          <FlipUnit value={time.h} label="Hours" />
          <span className="text-xl text-zinc-600 font-bold -mt-6">:</span>
          <FlipUnit value={time.m} label="Min" />
          <span className="text-xl text-zinc-600 font-bold -mt-6">:</span>
          <FlipUnit value={time.s} label="Sec" />
        </div>

        <p className="text-sm text-zinc-400 mb-10">
          Saturday 12:00 PM MST · Live online · Screen share · Build on
          your business
        </p>

        {/* Spots progress bar */}
        <div className="max-w-xs sm:max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span className="text-sm text-white font-bold">
                {SPOTS_LEFT} seats remaining
              </span>
            </div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
              {spotsTaken}/{SPOTS_TOTAL} taken
            </span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(251,191,36,0.8), rgba(251,146,60,0.9))",
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: SPOTS_TOTAL }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border ${
                    i < spotsTaken
                      ? "bg-amber-400/80 border-amber-400/50"
                      : "bg-transparent border-white/20"
                  }`}
                />
                <span className="text-[8px] text-zinc-700 mt-1">
                  {i < spotsTaken ? "Taken" : "Open"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
          Once seats fill, the next session opens 2 weeks later at a higher
          price. No exceptions. No waitlist bypasses.
        </p>
      </div>
    </section>
  );
}
