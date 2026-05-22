"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * "Configure YOUR Brooke" demo popup for the /try UGC landing page.
 *
 * Flow:
 *  1. Visitor clicks "Talk to Brooke" CTA → popup opens in configure state.
 *  2. Visitor describes their business + picks ICP → clicks "Generate My Script".
 *  3. Animated generating phase (3 s) → preview of the custom cold call script.
 *  4. On confirm, we inject window.BROOKE_CONFIG with the custom context and
 *     load /widget/brooke.js from cold-caller.mynewstaff.ai.
 *  5. Brooke takes over, voice-first, role-playing as their custom cold caller.
 */

declare global {
  interface Window {
    BROOKE_CONFIG?: Record<string, unknown>;
    __BROOKE_LOADED__?: boolean;
  }
}

const BROOKE_SRC = "https://cold-caller.mynewstaff.ai/widget/brooke.js";

const ICP_OPTIONS = [
  "Business Owners",
  "Homeowners",
  "Executives/C-Suite",
  "Sales Teams",
  "Marketing Agencies",
  "Real Estate Agents",
  "Restaurant Owners",
  "Healthcare Providers",
  "E-commerce Brands",
  "Other",
] as const;

type PopupState =
  | "hidden"
  | "configure"
  | "generating"
  | "preview"
  | "talking"
  | "active";

function generateScript(
  offer: string,
  icp: string,
): { opener: string; discovery: string; close: string } {
  return {
    opener: `Hi [name], this is Brooke. Would it be a terrible idea if I asked — are you currently handling ${offer.toLowerCase().includes("lead") ? "your lead generation" : "your " + icp.toLowerCase() + " outreach"} in-house, or have you looked at automating that?`,
    discovery: `What's your current process for ${offer.toLowerCase().includes("install") ? "getting new installation appointments" : "finding and converting new " + icp.toLowerCase()}? And what would it mean for your business if you could double that without hiring?`,
    close: `Based on what you've told me, I think we can help. We have a slot open [day]. It's a quick 20-minute strategy call — no commitment. Want me to lock that in for you?`,
  };
}

const GENERATING_STEPS = [
  "Analyzing your offer...",
  "Building NEPQ framework...",
  "Generating objection handlers...",
] as const;

export function BrookeTryPopup() {
  const [state, setState] = useState<PopupState>("hidden");
  const [offerDescription, setOfferDescription] = useState("");
  const [selectedICP, setSelectedICP] = useState<string>(ICP_OPTIONS[0]);
  const [generatedScript, setGeneratedScript] = useState<{
    opener: string;
    discovery: string;
    close: string;
  } | null>(null);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const generatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Listen for manual triggers from CTAs elsewhere on the page
  useEffect(() => {
    const onOpen = () => setState("configure");
    window.addEventListener("brooke:open", onOpen);
    return () => window.removeEventListener("brooke:open", onOpen);
  }, []);

  // Escape key to dismiss
  useEffect(() => {
    if (state === "hidden" || state === "active") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  // Auto-advance generating steps + transition to preview
  useEffect(() => {
    if (state !== "generating") {
      setVisibleSteps(0);
      return;
    }

    let step = 0;
    const advance = () => {
      step += 1;
      setVisibleSteps(step);

      if (step < GENERATING_STEPS.length) {
        generatingTimerRef.current = setTimeout(advance, 1000);
      } else {
        // All steps shown — wait 1 s then transition to preview
        generatingTimerRef.current = setTimeout(() => {
          setGeneratedScript(generateScript(offerDescription, selectedICP));
          setState("preview");
        }, 1000);
      }
    };

    generatingTimerRef.current = setTimeout(advance, 1000);

    return () => {
      if (generatingTimerRef.current) clearTimeout(generatingTimerRef.current);
    };
  }, [state, offerDescription, selectedICP]);

  const handleGenerate = () => {
    if (!offerDescription.trim()) return;
    setState("generating");
  };

  const handleEditScript = () => {
    setState("configure");
  };

  const launchBrooke = () => {
    if (!generatedScript) return;
    setState("talking");

    window.BROOKE_CONFIG = {
      mode: "landing",
      ws: "/ws/report-session",
      brand: "YOUR AI CLOSER",
      headline: "MEET YOUR<br>CUSTOM BROOKE.",
      subtitle: `I'm configured for ${offerDescription.replace(/<[^>]*>/g, "")}. Let's do a test call — I'll pitch your offer to you.`,
      autoScroll: false,
      extractData: false,
      context: {
        mode: "custom_demo",
        offer: offerDescription.replace(/<[^>]*>/g, "").slice(0, 500),
        icp: selectedICP,
        generated_script: generatedScript,
      },
    };

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
        "Brooke is taking a break. Message us directly — link at the top of the page.",
      );
    };
    document.head.appendChild(script);
  };

  const dismiss = () => {
    try {
      sessionStorage.setItem("brookeTryDismissed", "1");
    } catch {}
    setState("hidden");
  };

  if (state === "active" || state === "hidden") return null;

  return (
    <AnimatePresence>
      {(state === "configure" ||
        state === "generating" ||
        state === "preview" ||
        state === "talking") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Configure your AI cold caller"
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
                  "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(circle at 90% 90%, rgba(74,222,128,0.08), transparent 55%)",
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

              {/* ── CONFIGURE STATE ── */}
              {state === "configure" && (
                <motion.div
                  key="configure"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-4">
                    Tell me about
                    <br />
                    <span className="shimmer-text">your business</span>
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    I&apos;ll build a custom cold call script for your offer in
                    30 seconds.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-2">
                        What do you sell?
                      </label>
                      <textarea
                        id="offer-input"
                        rows={2}
                        maxLength={500}
                        value={offerDescription}
                        onChange={(e) => setOfferDescription(e.target.value)}
                        placeholder="e.g., Solar panel installation for homeowners in Texas"
                        className="w-full bg-transparent border border-white/10 text-white placeholder:text-zinc-600 p-4 rounded-lg resize-none focus:outline-none focus:border-white/25 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-2">
                        Who&apos;s your ideal customer?
                      </label>
                      <select
                        value={selectedICP}
                        onChange={(e) => setSelectedICP(e.target.value)}
                        className="w-full bg-transparent border border-white/10 text-white p-4 rounded-lg focus:outline-none focus:border-white/25 transition-colors text-sm appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        {ICP_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-zinc-950 text-white"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    disabled={!offerDescription.trim()}
                    onClick={handleGenerate}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Generate My Script →
                  </button>
                </motion.div>
              )}

              {/* ── GENERATING STATE ── */}
              {state === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="py-6"
                >
                  <h3 className="text-xl md:text-2xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-8 text-center">
                    Building your script...
                  </h3>

                  <div className="space-y-4">
                    {GENERATING_STEPS.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          i < visibleSteps
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="text-green-400">✓</span>
                        <span className="text-zinc-300">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── PREVIEW STATE ── */}
              {state === "preview" && generatedScript && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-6">
                    Your custom Brooke
                  </h3>

                  <div className="space-y-4 mb-6 bg-white/[0.03] border border-white/10 rounded-lg p-5">
                    <div>
                      <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                        Opener:
                      </div>
                      <p className="text-sm text-green-400 leading-relaxed">
                        {generatedScript.opener}
                      </p>
                    </div>
                    <div className="border-t border-white/5" />
                    <div>
                      <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                        Discovery:
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {generatedScript.discovery}
                      </p>
                    </div>
                    <div className="border-t border-white/5" />
                    <div>
                      <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                        Close:
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {generatedScript.close}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={launchBrooke}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                      </svg>
                      Talk to YOUR Brooke →
                    </button>
                    <button
                      onClick={handleEditScript}
                      className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/15 text-white/70 text-[11px] tracking-[0.25em] uppercase hover:bg-white/5 transition-colors"
                    >
                      Edit Script
                    </button>
                  </div>

                  <p className="text-[10px] text-zinc-600 tracking-wider uppercase mt-5 text-center">
                    Voice only · Allow mic when prompted · ~3 min call
                  </p>
                </motion.div>
              )}

              {/* ── TALKING STATE (loading widget) ── */}
              {state === "talking" && (
                <motion.div
                  key="talking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-10 flex flex-col items-center justify-center"
                >
                  <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse mb-4" />
                  <p className="text-sm text-zinc-400 tracking-wider uppercase">
                    Connecting to your custom Brooke…
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Launch helper — call from any button on the page */
export function openBrookeTry() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("brooke:open"));
}
