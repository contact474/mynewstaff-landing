"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Exit-intent email capture popup for the /try page.
 *
 * Trigger logic:
 *  - Desktop: mouseleave on document (mouse toward top of viewport)
 *  - Mobile: 30s on page + scroll up (indicating intent to leave)
 *  - Once per session (sessionStorage)
 *  - Skipped if Brooke demo already loaded
 *  - Skipped in first 5 seconds (false positive guard)
 */

declare global {
  interface Window {
    __BROOKE_LOADED__?: boolean;
  }
}

const STORAGE_KEY = "exitIntentPopupShown";
const MIN_TIME_ON_PAGE_MS = 5_000;
const MOBILE_DELAY_MS = 30_000;

export default function ExitIntentPopup() {
  const [state, setState] = useState<"hidden" | "form" | "submitting" | "success">(
    "hidden"
  );
  const hasTriggeredRef = useRef(false);
  const mountTimeRef = useRef(Date.now());
  const lastScrollYRef = useRef(0);
  const emailRef = useRef<HTMLInputElement>(null);

  const show = useCallback(() => {
    if (hasTriggeredRef.current) return;
    if (Date.now() - mountTimeRef.current < MIN_TIME_ON_PAGE_MS) return;
    if (typeof window !== "undefined" && window.__BROOKE_LOADED__) return;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    hasTriggeredRef.current = true;
    setState("form");
  }, []);

  // Desktop: mouseleave toward top of viewport
  useEffect(() => {
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [show]);

  // Mobile: 30s on page + scroll up
  useEffect(() => {
    let mobileReady = false;

    const timer = setTimeout(() => {
      mobileReady = true;
    }, MOBILE_DELAY_MS);

    const onScroll = () => {
      const currentY = window.scrollY;
      if (mobileReady && currentY < lastScrollYRef.current - 50) {
        show();
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setState("hidden");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value?.trim();
    if (!email || !email.includes("@")) return;

    setState("submitting");

    try {
      await fetch("/api/brooke/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent-try" }),
      });
    } catch {}

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}

    setState("success");
    setTimeout(dismiss, 3_000);
  };

  if (state === "hidden") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="exit-intent-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[9998] flex items-end md:items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md"
        onClick={dismiss}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
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
            &times;
          </button>

          <div className="relative p-8 md:p-10">
            {state === "success" ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">&#x1F4EC;</div>
                <h3 className="text-2xl font-wide font-bold uppercase tracking-tighter leading-[0.95] shimmer-text">
                  Check your inbox
                </h3>
              </div>
            ) : (
              <>
                {/* Icon */}
                <div className="text-3xl mb-5">&#x2728;</div>

                <h3 className="text-2xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-4">
                  WAIT &mdash;
                  <br />
                  FREE AI COLD CALLER
                  <br />
                  DEMO
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  Get 10 free minutes of Brooke calling YOUR leads. Drop your
                  email and we&apos;ll set it up.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    autoFocus
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-wait"
                  >
                    {state === "submitting" ? (
                      <>
                        <span className="w-3 h-3 rounded-full bg-black/50 animate-pulse mr-2" />
                        Sending&hellip;
                      </>
                    ) : (
                      "Send Me The Demo \u2192"
                    )}
                  </button>
                </form>

                <p className="text-[10px] text-zinc-600 tracking-wider uppercase mt-5 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
