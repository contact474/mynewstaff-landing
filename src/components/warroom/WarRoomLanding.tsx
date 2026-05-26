"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import {
  Zap,
  Users,
  TrendingDown,
  Clock,
  ChevronDown,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────

interface WarRoomLandingProps {
  nextThursday: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Countdown Hook ─────────────────────────────────────────

function useCountdown(target: string): TimeLeft {
  const calc = useCallback((): TimeLeft => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [target]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return timeLeft;
}

// ─── Registration Form ──────────────────────────────────────

const CHALLENGES = [
  "Lead Generation",
  "Content Creation",
  "Sales & Closing",
  "All of the Above",
] as const;

function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    challenge: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/warroom/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      // Redirect to thank you page after brief success state
      setTimeout(() => {
        window.location.href = "/warroom/thanks?name=" + encodeURIComponent(form.name.split(" ")[0]);
      }, 800);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <p className="text-xl font-wide font-bold uppercase">You&apos;re in.</p>
        <p className="text-sm text-zinc-500 mt-2">Redirecting...</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="John Smith"
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2">
          Email *
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="john@company.com"
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2">
          Phone
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          placeholder="+1 (555) 000-0000"
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      {/* Challenge Dropdown */}
      <div>
        <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2">
          Biggest Marketing Challenge
        </label>
        <div className="relative">
          <select
            value={form.challenge}
            onChange={(e) => setForm((p) => ({ ...p, challenge: e.target.value }))}
            className="w-full appearance-none bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-base text-white focus:border-white/30 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="" className="bg-zinc-900 text-zinc-500">
              Select one...
            </option>
            {CHALLENGES.map((c) => (
              <option key={c} value={c} className="bg-zinc-900 text-white">
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading" || !form.name.trim() || !form.email.trim()}
        className={`w-full mt-2 px-6 py-4 rounded-full font-bold text-xs tracking-[0.2em] uppercase transition-all ${
          status === "loading" || !form.name.trim() || !form.email.trim()
            ? "bg-white/10 text-zinc-600 cursor-not-allowed"
            : "bg-green-400 text-black hover:bg-green-300 hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {status === "loading" ? "Registering..." : "Register Now — Free"}
      </button>

      <p className="text-[10px] text-zinc-600 text-center mt-3">
        No credit card. No commitment. Just show up.
      </p>
    </form>
  );
}

// ─── FAQ Accordion ──────────────────────────────────────────

const FAQS = [
  {
    q: "Is it really free?",
    a: "100% free. No credit card, no hidden fees. We run these because the best clients come from people who've seen our work live. If you want to go deeper after, great. If not, you still leave with actionable strategies.",
  },
  {
    q: "What do I need?",
    a: "A laptop or phone, a decent internet connection, and 45 minutes. That's it. We'll send you the join link by email after you register.",
  },
  {
    q: "How long is each session?",
    a: "45 minutes sharp. 30 minutes of content and live demos, 15 minutes of Q&A. No filler, no fluff. We respect your time.",
  },
  {
    q: "Will I be sold to?",
    a: "We'll mention our services at the end for 2 minutes. That's it. The other 43 minutes are pure value. If you leave feeling like it was a pitch, DM us and we'll send you a free AI audit as an apology.",
  },
  {
    q: "I missed the live session. Can I watch the replay?",
    a: "Yes. Registrants get the replay link within 24 hours. But live attendees get priority Q&A and occasionally exclusive bonuses we don't include in replays.",
  },
];

function WarRoomFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {FAQS.map((faq, idx) => (
        <div key={idx} className="border-b border-white/10 last:border-none">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full py-8 flex justify-between items-center text-left hover:text-zinc-300 transition-colors group"
          >
            <span
              className={`text-lg md:text-xl font-wide uppercase ${
                openIndex === idx ? "text-white" : "text-zinc-400"
              }`}
            >
              {faq.q}
            </span>
            <span className="p-2 border border-white/10 rounded-full group-hover:border-white/30 transition-colors shrink-0 ml-4">
              {openIndex === idx ? (
                <Minus className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-zinc-500" />
              )}
            </span>
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="pb-8 text-zinc-500 text-sm md:text-base leading-relaxed max-w-[90%]">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Countdown Display ──────────────────────────────────────

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-white/10 bg-white/[0.03] rounded-xl">
        <span className="text-2xl md:text-3xl font-wide font-bold tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="block text-[9px] tracking-[0.3em] text-zinc-600 uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────

export function WarRoomLanding({ nextThursday }: WarRoomLandingProps) {
  const timeLeft = useCountdown(nextThursday);

  const nextDate = new Date(nextThursday);
  const dateStr = nextDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="min-h-[100dvh] w-full flex flex-col justify-center items-center text-center relative overflow-hidden pt-24 pb-16 px-4">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-400/[0.04] blur-[120px]" />
        </div>

        <div className="z-10 relative max-w-4xl mx-auto">
          <Reveal>
            <span className="inline-block px-4 py-2 border border-green-400/20 rounded-full text-[10px] tracking-[0.3em] uppercase text-green-400/80 mb-8">
              Free Weekly Live Session
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
              The AI <span className="shimmer-text">War Room.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base md:text-xl text-zinc-400 font-sans mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed">
              Every Thursday, I show business owners how to build an AI-powered
              lead generation and sales machine that runs on autopilot.
            </p>
          </Reveal>

          {/* Countdown */}
          <Reveal delay={0.3}>
            <div className="mt-10 mb-2">
              <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4">
                Next session: {dateStr} &middot; 2:00 PM ET
              </p>
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <span className="text-zinc-600 text-xl font-light mt-[-20px]">:</span>
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <span className="text-zinc-600 text-xl font-light mt-[-20px]">:</span>
                <CountdownUnit value={timeLeft.minutes} label="Min" />
                <span className="text-zinc-600 text-xl font-light mt-[-20px]">:</span>
                <CountdownUnit value={timeLeft.seconds} label="Sec" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <a
              href="#register"
              className="inline-flex items-center gap-2 mt-8 px-10 py-4 bg-green-400 text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-green-300 transition-colors rounded-full"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHAT YOU'LL LEARN ═══ */}
      <section className="border-t border-white/5 py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">
              What You&apos;ll Learn
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-12">
              45 minutes. <span className="shimmer-text">Zero fluff.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-0 border border-white/10">
            {[
              {
                icon: Zap,
                title: "Generate leads and sales on autopilot",
                desc: "Build an AI-powered system that finds, qualifies, and converts leads 24/7 — whether you have an existing business or just starting out.",
              },
              {
                icon: Users,
                title: "Build your conversion infrastructure",
                desc: "The exact tools, funnels, and automations that turn strangers into paying customers — without hiring a team or learning to code.",
              },
              {
                icon: TrendingDown,
                title: "Stop guessing, start closing",
                desc: "Why most businesses burn money on marketing that doesn't convert — and the AI systems that generate real dollars on autopilot.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.1}>
                <div
                  className={`p-8 md:p-10 text-center h-full ${
                    i < 2 ? "md:border-r border-b md:border-b-0 border-white/10" : ""
                  }`}
                >
                  <item.icon className="w-8 h-8 text-green-400/70 mx-auto mb-4" />
                  <h3 className="text-sm font-wide font-bold uppercase tracking-wider mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT LUKA ═══ */}
      <section className="border-t border-white/5 py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <Reveal variant="fade-left">
              <div className="aspect-square max-w-[400px] mx-auto md:mx-0 border border-white/10 bg-white/[0.02] rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent" />
                <div className="text-center z-10">
                  <div className="w-24 h-24 rounded-full bg-white/[0.06] border border-white/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-wide font-bold text-white/30">LL</span>
                  </div>
                  <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                    Luka Lah
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bio */}
            <Reveal variant="fade-right" delay={0.15}>
              <div>
                <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">
                  Your Host
                </p>
                <h2 className="text-3xl md:text-4xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-6">
                  Luka Lah
                </h2>
                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-sans">
                  <p>
                    Built AI systems for the Slovenian Government. Saved 50%
                    taxpayer money on a national campaign with 100% success rate.
                  </p>
                  <p>
                    Now helping businesses deploy AI employees that handle lead
                    generation, cold calling, content creation, and CRM
                    management — autonomously.
                  </p>
                  <p>
                    Every week in The AI War Room, I break down exactly what
                    we&apos;re building, what&apos;s working, and what&apos;s not. No
                    gatekeeping. No slides. Just live demos and real talk.
                  </p>
                </div>
                <div className="flex gap-6 mt-8">
                  <div>
                    <span className="block text-2xl font-wide font-bold">12+</span>
                    <span className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
                      Active Clients
                    </span>
                  </div>
                  <div>
                    <span className="block text-2xl font-wide font-bold">$0.25</span>
                    <span className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
                      Per AI Call Min
                    </span>
                  </div>
                  <div>
                    <span className="block text-2xl font-wide font-bold">0</span>
                    <span className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
                      Employees
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="border-t border-white/5 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/[0.02]">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black bg-zinc-700 flex items-center justify-center"
                  >
                    <span className="text-[8px] text-zinc-400 font-bold">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-zinc-400 font-sans">
                Join <span className="text-white font-bold">100+</span> business
                owners who&apos;ve attended
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ REGISTRATION FORM ═══ */}
      <section
        id="register"
        className="border-t border-white/5 py-20 md:py-28 px-4"
      >
        <div className="max-w-lg mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6 text-center">
              Reserve Your Spot
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-4 text-center">
              Get <span className="shimmer-text">in.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm text-zinc-500 text-center mb-10 max-w-md mx-auto">
              Register below and we&apos;ll send you the join link + calendar invite.
              Takes 30 seconds.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]">
              <RegistrationForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SCARCITY ═══ */}
      <section className="border-t border-white/5 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="border border-amber-400/20 rounded-2xl p-8 bg-amber-400/[0.03]">
              <Clock className="w-6 h-6 text-amber-400/60 mx-auto mb-3" />
              <p className="text-sm font-wide font-bold uppercase tracking-wider mb-2">
                Limited to 50 spots per session.
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                After that, you&apos;ll catch the replay. But live attendees get
                priority Q&A and exclusive bonuses. Don&apos;t sleep on it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-t border-white/5 py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-6">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-12">
              Common <span className="shimmer-text">questions.</span>
            </h2>
          </Reveal>
          <WarRoomFAQ />
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="border-t border-white/5 py-20 md:py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-6">
              Stop guessing. <br />
              <span className="shimmer-text">Start deploying.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-zinc-500 mb-8 max-w-md mx-auto">
              Every Thursday. 45 minutes. Real AI strategies you can implement
              the same day. No pitch. No fluff.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#register"
              className="inline-flex items-center gap-2 px-10 py-4 bg-green-400 text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-green-300 transition-colors rounded-full"
            >
              Register Free <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
