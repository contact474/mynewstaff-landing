"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const FAQS = [
  { q: "Is this another AI course?", a: "No. This is a live build session. I don't just teach — I open Claude Code and deploy a working system for YOUR business on the call. You leave with a live landing page, lead gen, email sequences, and an AI cold caller demo. Not notes. Not a PDF." },
  { q: "Do I need to be technical?", a: "You need to be able to follow along on a screen share. If you can use a browser and type, you're fine. I do the building. You learn how it works so you can maintain and improve it." },
  { q: "Will this work for my industry?", a: "If you run a service business — law firm, med spa, dental, real estate, SaaS, coaching, consulting, agency — yes. The system is niche-agnostic. I customize it for your specific business on the call." },
  { q: "Why $1,497-$4,997 when you charge clients $15-25K?", a: "Because I want 50 case studies, not 50 customers. People who actually use the system and send me results in 90 days are worth more to me than one-time payments. The lite version is scoped smaller than the full build, but the architecture is identical. And your entire fee is credited if you go further." },
  { q: "What happens after the 4 hours?", a: "You get the full recording, a working system deployed on your business, and direct Slack access to me (30 days for Builder, 60 for Partner). If you get stuck, I help you. If you want the full build later, the mastermind fee is credited toward it." },
  { q: "What if I'm already paying an agency?", a: "Even better. You'll see exactly what they should be doing (and probably aren't). Many attendees use the mastermind to build their own system, then fire their agency the next month. The system pays for itself in the first week." },
  { q: "Only 10 spots — is that real?", a: "Yes. I deploy a lite version for each attendee's specific business on the call. I can't do that with 50 people. 10 is the max for quality. When a session fills, I open the next one — but the price goes up." },
  { q: "What happens on the discovery call?", a: "15 minutes. We learn about your business, your current marketing setup, and your goals. If the mastermind is a fit, we'll walk you through the tiers and help you pick the right one. If it's not a fit, we'll tell you — we'd rather have 10 right people than waste anyone's time." },
  { q: "What does 'credited toward full build' mean?", a: "If you attend the mastermind and later decide you want us to partner with you — run everything, manage the AI systems, handle your lead gen and outreach — your entire mastermind fee ($1,497-$4,997) is subtracted from the full partnership price ($15K-$25K). You're not paying twice. The mastermind is your test drive." },
  { q: "What are the 'high-intent ICP leads'?", a: "In the Builder and Partner tiers, we deliver real, verified leads that match your ideal customer profile. Not scraped lists — these are businesses actively searching for your service, enriched with contact info, scored by our FIRE algorithm, and ready for outreach. 50 leads in Builder, 200 in Partner." },
];

export function MastermindFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6 text-center font-sans">
            Questions
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.92] text-center mb-16">
            Before you decide.
          </h2>
        </Reveal>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left border border-white/[0.06] bg-white/[0.02] rounded-xl p-5 md:p-6 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm md:text-base font-semibold font-sans">
                    {faq.q}
                  </span>
                  <span className="text-zinc-500 text-xl shrink-0">
                    {open === i ? "−" : "+"}
                  </span>
                </div>
                {open === i && (
                  <p className="mt-4 text-sm text-zinc-400 font-sans leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </p>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
