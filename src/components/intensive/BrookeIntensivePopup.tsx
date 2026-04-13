"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Intensive-specific Brooke trigger popup.
 *
 * Flow:
 *  1. User scrolls past hero or clicks "Talk to Brooke" CTA → popup opens.
 *  2. Popup explains what Brooke will do (pitch the intensive, answer
 *     questions, qualify them, book them in).
 *  3. On confirm, we inject window.BROOKE_CONFIG for the intensive
 *     context and load /widget/brooke.js from cold-caller.mynewstaff.ai.
 *  4. Brooke takes over, voice-first, NEPQ flow tuned to the event.
 */

declare global {
  interface Window {
    BROOKE_CONFIG?: Record<string, unknown>;
    __BROOKE_LOADED__?: boolean;
  }
}

const BROOKE_SRC = "https://cold-caller.mynewstaff.ai/widget/brooke.js";

const BROOKE_CTX = {
  mode: "landing",
  ws: "/ws/report-session",
  brand: "THE AI INTENSIVE",
  headline: "YOU FOUND<br>THE INTENSIVE.",
  subtitle:
    "I'm Brooke — Luka and Los's AI operator. Ask me anything about the LA intensive or I'll walk you through whether it's a fit.",
  autoScroll: true,
  extractData: false,
  context: {
    event: "The AI Intensive",
    location: "Los Angeles",
    dates: "May 6-8, 2026",
    hosts: ["Luka Lah", "Los Silva"],
    tiers: {
      general: { price: 1000, seats: 12, value: 45000 },
      vip: { price: 2500, seats: 6, value: 72000 },
      deploy: { price: 5000, seats: 2, value: 135000 },
    },
    total_seats: 20,
    pitch_angle:
      "Operators doing real numbers who want the full MNS stack installed on their business in 3 days.",
    apply_url: "https://wa.me/13058503664",
  },
};

export function BrookeIntensivePopup() {
  const [state, setState] = useState<"hidden" | "teaser" | "loading" | "active">(
    "hidden"
  );
  const hasShownRef = useRef(false);

  // Auto-surface teaser after 12s of reading OR 40% scroll
  useEffect(() => {
    if (hasShownRef.current) return;

    const dismissed =
      typeof window !== "undefined" &&
      sessionStorage.getItem("brookeIntensiveDismissed") === "1";
    if (dismissed) return;

    const timeoutId = setTimeout(() => {
      if (!hasShownRef.current) {
        hasShownRef.current = true;
        setState("teaser");
      }
    }, 12_000);

    const onScroll = () => {
      const doc = document.documentElement;
      const pct =
        (doc.scrollTop + window.innerHeight) / doc.scrollHeight;
      if (pct > 0.4 && !hasShownRef.current) {
        hasShownRef.current = true;
        setState("teaser");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Listen for manual triggers from CTAs elsewhere on the page
  useEffect(() => {
    const onOpen = () => {
      hasShownRef.current = true;
      setState("teaser");
    };
    window.addEventListener("brooke:open", onOpen);
    return () => window.removeEventListener("brooke:open", onOpen);
  }, []);

  const launchBrooke = () => {
    setState("loading");

    window.BROOKE_CONFIG = BROOKE_CTX;

    if (window.__BROOKE_LOADED__) {
      setState("active");
      return;
    }

    const script = document.createElement("script");
    script.src = BROOKE_SRC;
    script.async = true;
    script.onload = () => {
      window.__BROOKE_LOADED__ = true;
      setState("active");
    };
    script.onerror = () => {
      setState("hidden");
      alert(
        "Brooke is taking a break. Message Luka directly on WhatsApp — link at the top of the page."
      );
    };
    document.head.appendChild(script);
  };

  const dismiss = () => {
    try {
      sessionStorage.setItem("brookeIntensiveDismissed", "1");
    } catch {}
    setState("hidden");
  };

  if (state === "active" || state === "hidden") return null;

  return (
    <AnimatePresence>
      {(state === "teaser" || state === "loading") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(circle at 90% 90%, rgba(251,191,36,0.08), transparent 55%)",
              }}
            />

            <button
              onClick={dismiss}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center text-sm"
              aria-label="Dismiss"
            >
              ×
            </button>

            <div className="relative p-8 md:p-10">
              {/* Avatar + pulsing ring */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-60" />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-white to-zinc-300 flex items-center justify-center text-black font-wide font-bold text-lg">
                    B
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                    Live · AI Operator
                  </div>
                  <div className="text-lg font-wide font-bold uppercase tracking-tight">
                    Brooke
                  </div>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-4">
                Not sure if the intensive is
                <br />
                <span className="shimmer-text">a fit for you?</span>
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                I can walk you through the modules, pick your tier, and book
                your seat in under 3 minutes. Voice-first. No forms. Just talk.
              </p>

              <ul className="space-y-2 mb-8 text-xs text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  I&apos;ll pitch the event the way Luka and Los would
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  Answer anything about modules, tiers, schedule, venue
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  Help you pick General vs VIP vs Deploy
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  Grab your phone and book you in
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={state === "loading"}
                  onClick={launchBrooke}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-wait"
                >
                  {state === "loading" ? (
                    <>
                      <span className="w-3 h-3 rounded-full bg-black/50 animate-pulse" />
                      Connecting…
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                      </svg>
                      Talk to Brooke
                    </>
                  )}
                </button>
                <button
                  onClick={dismiss}
                  className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/15 text-white/70 text-[11px] tracking-[0.25em] uppercase hover:bg-white/5 transition-colors"
                >
                  I&apos;ll read first
                </button>
              </div>

              <p className="text-[10px] text-zinc-600 tracking-wider uppercase mt-5 text-center">
                Voice only · Allow mic when prompted · ~3 min call
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Launch helper — call from any button on the page */
export function openBrooke() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("brooke:open"));
}
