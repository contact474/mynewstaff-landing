"use client";

import { useEffect, useState, useMemo } from "react";
import { Reveal } from "@/components/ui/Reveal";

function getNextSession(): Date {
  return new Date("2026-05-03T19:00:00Z");
}

export function SmbInlineUrgency() {
  const target = useMemo(() => getNextSession(), []);
  const [label, setLabel] = useState("");

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, target.getTime() - Date.now());
      const s = Math.floor(diff / 1000);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      setLabel(`${d}d ${h}h ${m}m`);
    }
    calc();
    const id = setInterval(calc, 30_000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <Reveal>
      <div className="border-t border-b border-white/5 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.15em] text-zinc-500 uppercase">
            <span className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="text-amber-400/90 font-bold">2 seats left</span>
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span>Next session: <span className="text-white">{label}</span></span>
          </div>
          <a
            href="#booking"
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase hover:scale-105 transition-transform"
          >
            Book Discovery Call
          </a>
        </div>
      </div>
    </Reveal>
  );
}
