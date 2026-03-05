"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePartnerLocale } from "./PartnersLocaleProvider";

export function PartnersAddOn() {
  const { t } = usePartnerLocale();

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5">
      <Reveal className="max-w-3xl mx-auto text-center">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
          {t.addOn.label}
        </span>
        <h3 className="font-wide text-2xl md:text-4xl uppercase text-white mb-4">
          {t.addOn.heading}
        </h3>
        <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-2">
          {t.addOn.price}
        </p>
        <p className="text-xs text-zinc-500 font-sans leading-relaxed max-w-lg mx-auto">
          {t.addOn.description}
        </p>
      </Reveal>
    </section>
  );
}
