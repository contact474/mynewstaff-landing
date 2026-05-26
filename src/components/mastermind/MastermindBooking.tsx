"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const GHL_CALENDAR_URL =
  "https://api.leadconnectorhq.com/widget/bookings/claude-code-ai-mastermind";

export function MastermindBooking() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section id="booking" className="py-20 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-6">
              Next Step
            </span>
            <h2 className="text-3xl md:text-6xl font-wide font-bold uppercase leading-[0.9] text-white mb-4">
              Book Your{" "}
              <span className="shimmer-text">Discovery Call</span>
            </h2>
            <p className="text-sm text-zinc-400 font-sans max-w-xl mx-auto mt-6 leading-relaxed">
              This isn&apos;t a sales call. We need to understand your business to make
              sure the mastermind is a fit and we can deploy the right system for you.
              15 minutes. No pressure.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border border-white/[0.06] bg-white/[0.02] min-h-[600px] relative rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans">
                Select a Time
              </span>
            </div>

            <iframe
              src={GHL_CALENDAR_URL}
              className="w-full border-0"
              style={{ minHeight: "550px", height: "100%", background: "transparent" }}
              onLoad={() => setIframeLoaded(true)}
              title="Book Discovery Call"
            />

            {!iframeLoaded && (
              <div className="absolute inset-0 top-[49px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-3" />
                  <span className="text-xs text-zinc-600 font-sans">Loading calendar...</span>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-5 text-center">
              <span className="text-sm text-[#FDEC00] font-semibold font-sans">
                100% credited toward full build
              </span>
              <p className="text-xs text-zinc-500 font-sans mt-2">
                Your entire mastermind fee is subtracted from the partnership price
              </p>
            </div>
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-5 text-center">
              <span className="text-sm text-white font-semibold font-sans">
                10 spots per session
              </span>
              <p className="text-xs text-zinc-500 font-sans mt-2">
                We cap it because we build live
              </p>
            </div>
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-5 text-center">
              <span className="text-sm text-white font-semibold font-sans">
                Honest qualification
              </span>
              <p className="text-xs text-zinc-500 font-sans mt-2">
                If it&apos;s not a fit, we&apos;ll tell you. We&apos;d rather have 10 right
                people than 10 any people.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
