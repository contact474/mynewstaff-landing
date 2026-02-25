import { Reveal } from "@/components/ui/Reveal";

export function PartnersTerms() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5">
      <Reveal className="max-w-3xl mx-auto text-center">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
          Terms
        </span>
        <div className="space-y-4">
          {[
            "Timelines start after intake is complete and assets are provided.",
            "1 revision round included per deliverable.",
            "Posting requirements must be completed to unlock delivery.",
          ].map((term, i) => (
            <p
              key={i}
              className="text-sm text-zinc-400 font-sans leading-relaxed"
            >
              {term}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
