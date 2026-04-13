"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openBrooke } from "./BrookeIntensivePopup";

/**
 * Premium floating CTA — magnetic hover, appears after hero.
 * Two actions: "Talk to Brooke" (voice) + "Apply on WhatsApp"
 */
export function IntensiveFloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic hover effect — Apple-style
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        const pull = (120 - dist) / 120;
        btn.style.transform = `translate(${dx * 0.25 * pull}px, ${dy * 0.25 * pull}px)`;
      } else {
        btn.style.transform = "";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[9000] flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-2 items-end"
              >
                <button
                  onClick={() => {
                    setExpanded(false);
                    openBrooke();
                  }}
                  className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.2em] uppercase hover:scale-[1.03] transition-transform shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
                >
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  Talk to Brooke
                </button>
                <a
                  href="https://wa.me/13058503664?text=Hey%20Luka!%20I%20want%20in%20on%20The%20AI%20Intensive%20in%20LA%20%F0%9F%94%A5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-green-500 text-white font-bold text-[11px] tracking-[0.2em] uppercase hover:scale-[1.03] transition-transform shadow-[0_10px_40px_rgba(34,197,94,0.3)]"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Apply on WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            ref={btnRef}
            onClick={() => setExpanded((e) => !e)}
            className="relative w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_15px_50px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform will-change-transform"
            style={{ transition: "transform 0.15s ease-out" }}
            aria-label={expanded ? "Close" : "Open actions"}
          >
            <span className="absolute inset-0 rounded-full animate-ping bg-white/30 opacity-60" />
            <span className="relative text-lg font-wide font-bold">
              {expanded ? "×" : "→"}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
