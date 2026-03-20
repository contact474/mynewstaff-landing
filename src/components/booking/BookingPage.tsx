"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const GHL_CALENDAR_SLUG = "ai-scalability-assessment";
const GHL_CALENDAR_URL = `https://api.leadconnectorhq.com/widget/bookings/${GHL_CALENDAR_SLUG}`;

const WHAT_YOU_GET = [
  "Full 10-pillar AI scalability audit of your business",
  "Competitor gap analysis with real data",
  "Custom AI marketing blueprint for your industry",
  "Channel-by-channel action plan with timelines",
  "ROI projections based on your actual numbers",
  "Complete DIY implementation guide your team can follow",
];

const WHAT_TO_EXPECT = [
  { time: "0-5 min", label: "Quick Intro", desc: "We learn about your business and goals" },
  { time: "5-15 min", label: "Live Audit", desc: "We walk through your ScaleX score and top gaps" },
  { time: "15-25 min", label: "Custom Strategy", desc: "Your personalized AI marketing blueprint" },
  { time: "25-30 min", label: "Action Plan", desc: "Next steps — DIY guide or we help execute" },
];

export function BookingPage() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "";
  const company = searchParams.get("company") || "";
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Build iframe URL with pre-fill params
  const iframeSrc = (() => {
    const params = new URLSearchParams();
    if (company) params.set("name", company);
    if (source) params.set("source", source);
    const qs = params.toString();
    return GHL_CALENDAR_URL + (qs ? `?${qs}` : "");
  })();

  return (
    <div className="pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1100px] mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] text-zinc-500 block mb-6">
            Free — No Obligation
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.95] tracking-tight">
            Book Your Free<br />
            <span className="shimmer-text">Strategy Call</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-sans max-w-[550px] mx-auto mt-6 leading-relaxed">
            30 minutes. You walk away with a $2,500 AI scalability assessment,
            custom action plan, and DIY implementation guide. Whether you work with us or not.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: What You Get */}
          <div className="lg:col-span-2 space-y-8">

            {/* Value stack */}
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-5">
                What You Walk Away With
              </h3>
              <div className="space-y-3">
                {WHAT_YOU_GET.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-zinc-600 font-mono text-xs mt-0.5 flex-shrink-0">
                      {i < WHAT_YOU_GET.length - 1 ? "├" : "└"}
                    </span>
                    <span className="text-sm font-sans text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans block">Assessment Value</span>
                  <span className="text-2xl font-wide font-bold">$2,500</span>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans block">Your Cost</span>
                  <span className="text-2xl font-wide font-bold text-emerald-500">$0</span>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-5">
                What to Expect
              </h3>
              <div className="space-y-0">
                {WHAT_TO_EXPECT.map((step, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-t border-white/[0.04] first:border-0">
                    <span className="text-[10px] font-mono text-zinc-600 min-w-[55px]">{step.time}</span>
                    <div>
                      <span className="text-sm font-sans font-semibold text-white">{step.label}</span>
                      <span className="text-xs font-sans text-zinc-500 ml-2">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social proof */}
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
                Not a Sales Call
              </h3>
              <p className="text-sm font-sans text-zinc-400 leading-relaxed">
                This is a strategy session, not a pitch deck. You get the full assessment
                and DIY guide regardless of what you decide. If our help makes sense, we
                will talk about it. If not, you still walk away armed with a plan your team
                can execute tomorrow.
              </p>
            </div>

            {/* Prefer to chat first? */}
            <div className="text-center py-4">
              <p className="text-xs text-zinc-600 font-sans mb-3">Prefer to chat first?</p>
              <a
                href="https://wa.me/13058503664?text=Hey%20Luka%2C%20I%20saw%20your%20site%20and%20I%27m%20curious%20about%20the%20AI%20assessment."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-white/[0.15] text-white text-[10px] tracking-[0.2em] uppercase font-bold font-sans hover:border-white/30 hover:bg-white/[0.02] transition-all"
              >
                WhatsApp Luka
              </a>
            </div>
          </div>

          {/* Right: Calendar embed */}
          <div className="lg:col-span-3">
            <div className="border border-white/[0.06] bg-white/[0.02] min-h-[600px] relative">
              <div className="p-4 border-b border-white/[0.06]">
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans">
                  Select a Time
                </span>
              </div>

              {/* GHL Calendar iframe */}
              <iframe
                src={iframeSrc}
                className="w-full border-0"
                style={{ minHeight: "550px", height: "100%", background: "transparent" }}
                onLoad={() => setIframeLoaded(true)}
                title="Book AI Scalability Assessment"
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
          </div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-[1px] bg-white/[0.06] border border-white/[0.06] mt-12 max-w-[600px] mx-auto">
          <div className="bg-black py-5 text-center">
            <span className="text-xl md:text-2xl font-wide font-bold">30 min</span>
            <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mt-1">Your Time</span>
          </div>
          <div className="bg-black py-5 text-center">
            <span className="text-xl md:text-2xl font-wide font-bold text-emerald-500">$0</span>
            <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mt-1">Your Cost</span>
          </div>
          <div className="bg-black py-5 text-center">
            <span className="text-xl md:text-2xl font-wide font-bold">$2,500</span>
            <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mt-1">Assessment Value</span>
          </div>
        </div>

      </div>
    </div>
  );
}
