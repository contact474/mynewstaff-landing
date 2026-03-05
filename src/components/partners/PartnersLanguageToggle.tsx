"use client";

import { usePartnerLocale } from "./PartnersLocaleProvider";

export function PartnersLanguageToggle() {
  const { locale, setLocale } = usePartnerLocale();

  return (
    <div className="fixed top-4 right-4 z-[150] flex items-center bg-zinc-900/90 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden">
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-sans transition-colors cursor-pointer ${
          locale === "en"
            ? "bg-white text-black font-bold"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("es")}
        className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-sans transition-colors cursor-pointer ${
          locale === "es"
            ? "bg-white text-black font-bold"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}
