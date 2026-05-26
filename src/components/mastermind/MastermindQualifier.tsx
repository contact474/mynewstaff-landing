"use client";

import { useState } from "react";

const STEPS = [
  {
    key: "contact",
    heading: "Let's start.",
    sub: "Who are we meeting with?",
    fields: [
      { key: "name", label: "Full Name", type: "text" as const, placeholder: "John Smith" },
      { key: "email", label: "Email", type: "email" as const, placeholder: "john@company.com" },
      { key: "phone", label: "Phone", type: "tel" as const, placeholder: "+1 (555) 000-0000" },
    ],
  },
  {
    key: "business_type",
    heading: "What do you do?",
    sub: "Industry or service type",
    fields: [
      { key: "business_type", label: "Business Type", type: "text" as const, placeholder: "e.g. Roofing, Law, Fitness..." },
    ],
  },
  {
    key: "monthly_revenue",
    heading: "Where are you now?",
    sub: "Current monthly revenue",
    options: ["Under $10K/mo", "$10K–$20K/mo", "$20K–$50K/mo", "$50K–$100K/mo", "$100K–$500K/mo", "$500K+/mo"],
  },
  {
    key: "biggest_bottleneck",
    heading: "What's holding you back?",
    sub: "Pick the #1 bottleneck",
    options: [
      "Not enough leads",
      "Can't follow up fast enough",
      "No marketing system",
      "I AM the business",
      "Need to hire but can't afford to",
      "Other",
    ],
  },
  {
    key: "investment_budget",
    heading: "What's your budget?",
    sub: "For AI systems this quarter",
    options: ["Under $1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000+", "Not sure yet"],
  },
  {
    key: "decision_timeline",
    heading: "How fast can you move?",
    sub: "Decision timeline",
    options: ["Ready NOW", "Next 3 days", "This week", "This month", "Just exploring"],
  },
  {
    key: "commitment_level",
    heading: "Last one.",
    sub: "Are you ready to invest in systems?",
    options: [
      "Yes — I'm done doing everything myself",
      "Serious, but need to see the ROI first",
      "Interested, not ready yet",
    ],
  },
];

const TOTAL = STEPS.length;
const GHL_URL = "https://api.leadconnectorhq.com/widget/bookings/claude-code-ai-mastermind";

async function saveToGHL(data: Record<string, string>) {
  try {
    await fetch("/api/qualify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {}
}

export function MastermindQualifier() {
  const [phase, setPhase] = useState<"quiz" | "calendar">("quiz");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const step = STEPS[idx];
  const pct = Math.min(Math.round(((idx + 1) / TOTAL) * 130), 100);

  function canGo() {
    if (step.fields) return step.fields.every((f) => answers[f.key]?.trim());
    return !!answers[step.key];
  }

  async function next() {
    if (!canGo()) return;
    if (idx < TOTAL - 1) {
      setIdx(idx + 1);
    } else {
      await saveToGHL(answers);
      setPhase("calendar");
    }
  }

  function pick(val: string) {
    const updated = { ...answers, [step.key]: val };
    setAnswers(updated);
    if (idx < TOTAL - 1) {
      setTimeout(() => setIdx(idx + 1), 250);
    } else {
      setTimeout(() => {
        saveToGHL(updated);
        setPhase("calendar");
      }, 250);
    }
  }

  if (phase === "calendar") {
    const first = (answers.name || "").split(" ")[0];
    return (
      <section id="booking" className="border-t border-white/5 py-24 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">You&apos;re In</p>
          <h2 className="text-4xl md:text-7xl font-wide font-bold uppercase tracking-tighter leading-[0.9]">
            Pick your time{first ? ", " : "."}{first && <span className="shimmer-text">{first}.</span>}
          </h2>
          <p className="mt-6 text-sm text-zinc-400 max-w-xl mx-auto">
            15 minutes. We&apos;ll review your answers and come prepared.
          </p>
          <div className="mt-10 border border-white/[0.06] bg-white/[0.02] min-h-[600px] relative rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans">Select a Time</span>
            </div>
            <iframe
              src={GHL_URL}
              className="w-full border-0"
              style={{ minHeight: "550px", height: "100%", background: "transparent" }}
              title="Book Discovery Call"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="border-t border-white/5 py-20 md:py-28 px-4">
      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">Quick Check</span>
            <span className="text-[10px] tracking-[0.2em] text-zinc-500">{idx + 1} / {TOTAL}</span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-white/40 to-white/80 transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div key={idx} className="animate-[fadeSlide_0.3s_ease-out]">
          <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase tracking-tight leading-[0.95] mb-2">
            {step.heading}
          </h2>
          <p className="text-sm text-zinc-500 mb-8">{step.sub}</p>

          {step.fields && (
            <div className="space-y-4">
              {step.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    value={answers[f.key] || ""}
                    onChange={(e) => setAnswers((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              ))}
              <button
                onClick={next}
                disabled={!canGo()}
                className={`w-full mt-2 px-6 py-4 rounded-full font-bold text-xs tracking-[0.2em] uppercase transition-all ${
                  canGo() ? "bg-white text-black hover:scale-[1.02]" : "bg-white/10 text-zinc-600 cursor-not-allowed"
                }`}
              >
                Continue →
              </button>
            </div>
          )}

          {step.options && (
            <div className="space-y-3">
              {step.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm ${
                    answers[step.key] === opt
                      ? "border-white/40 bg-white/[0.08] text-white"
                      : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {idx > 0 && (
          <button
            onClick={() => setIdx(idx - 1)}
            className="mt-6 text-[10px] tracking-[0.2em] text-zinc-600 uppercase hover:text-zinc-400 transition-colors"
          >
            ← Back
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
