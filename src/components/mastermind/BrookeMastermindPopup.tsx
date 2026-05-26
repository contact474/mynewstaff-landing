"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  brand: "CLAUDE CODE MASTERMIND",
  headline: "NOT SURE WHICH<br>TIER IS RIGHT?",
  subtitle:
    "I'm Brooke — Luka's AI operator. I'll learn about your business, help you pick the right tier, and book your discovery call.",
  autoScroll: true,
  extractData: false,
  context: {
    event: "Claude Code Online Mastermind",
    format: "4-hour LIVE call via Zoom",
    host: "Luka Lah",
    tiers: {
      blueprint: { price: 1497, includes: "session + deployment + recording" },
      builder: { price: 2497, includes: "blueprint + 30d support + 50 leads + credited" },
      partner: { price: 4997, includes: "builder + 1on1 + 200 leads + 60d + full credit" },
    },
    total_spots: 10,
    pitch_angle:
      "Business owners doing $20K-$500K/mo who want to own their AI revenue system instead of renting agencies. Qualify them: ask about current revenue, biggest marketing pain, and what they've tried. If they're a fit, guide them to book a discovery call. Frame the call as: we need to understand your business to see if we can deploy the right system for you.",
    booking_url: "#booking",
    qualifying_questions: [
      "What does your business do and what's your monthly revenue?",
      "What are you currently spending on marketing/lead gen?",
      "Have you tried any AI tools before? What happened?",
      "If this works, what would a 3x ROI look like for your business?",
    ],
  },
};

export function BrookeMastermindPopup() {
  const [state, setState] = useState<"hidden" | "teaser" | "loading" | "active">(
    "hidden"
  );
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (hasShownRef.current) return;

    const dismissed =
      typeof window !== "undefined" &&
      sessionStorage.getItem("brookeMastermindDismissed") === "1";
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
        "Brooke is taking a break. Scroll down and book a discovery call directly."
      );
    };
    document.head.appendChild(script);
  };

  const dismiss = () => {
    try {
      sessionStorage.setItem("brookeMastermindDismissed", "1");
    } catch {}
    setState("hidden");
  };

  if (state === "active") return null;

  return (
    <>
      {state === "hidden" && hasShownRef.current && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={() => setState("teaser")}
          className="fixed bottom-20 right-4 z-[9998] w-14 h-14 rounded-full bg-white shadow-xl shadow-black/30 flex items-center justify-center text-black font-wide font-bold text-lg hover:scale-110 transition-transform md:bottom-6"
          aria-label="Talk to Brooke"
        >
          <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-40" />
          <span className="relative">B</span>
        </motion.button>
      )}

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
              x
            </button>

            <div className="relative p-8 md:p-10">
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
                Not sure which tier
                <br />
                <span className="shimmer-text">is right?</span>
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                I&apos;m Brooke — Luka&apos;s AI operator. I&apos;ll learn about your business,
                help you pick the right tier, and book your discovery call.
              </p>

              <ul className="space-y-2 mb-8 text-xs text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  I&apos;ll understand your business and revenue goals
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  Recommend the right tier for your situation
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  Answer any questions about the mastermind
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400/80">+</span>
                  Book your qualification call with Luka
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
                      Connecting...
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
    </>
  );
}

export function openBrookeMastermind() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("brooke:open"));
}
