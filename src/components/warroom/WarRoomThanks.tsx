"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2, Calendar, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";

// ─── Google Calendar Link Builder ───────────────────────────

function getNextThursdayCalendarLink(): string {
  const now = new Date();
  const day = now.getUTCDay();
  const daysUntil = (4 - day + 7) % 7 || 7;
  const start = new Date(now);
  start.setUTCDate(now.getUTCDate() + daysUntil);
  start.setUTCHours(18, 0, 0, 0); // 6 PM UTC = 2 PM ET

  const end = new Date(start);
  end.setUTCMinutes(end.getUTCMinutes() + 45);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "The AI War Room — MyNewStaff.ai",
    dates: `${fmt(start)}/${fmt(end)}`,
    details:
      "Weekly live breakdown with Luka Lah. AI deployment strategies, live demos, Q&A.\n\nJoin link will be emailed before the session.\n\nhttps://www.mynewstaff.ai/warroom",
    location: "Online (link in email)",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ─── Share URL ──────────────────────────────────────────────

function getShareText(): string {
  return encodeURIComponent(
    "Just signed up for The AI War Room — free weekly live session on deploying AI in business. Every Thursday.\n\nhttps://mynewstaff.ai/warroom"
  );
}

// ─── Inner Content (uses useSearchParams) ───────────────────

function ThanksContent() {
  const params = useSearchParams();
  const firstName = params.get("name") || "";
  const calendarLink = getNextThursdayCalendarLink();

  return (
    <section className="min-h-[100dvh] flex flex-col justify-center items-center text-center px-4 py-24">
      <div className="max-w-xl mx-auto">
        {/* Success icon */}
        <Reveal>
          <div className="w-20 h-20 rounded-full border border-green-400/30 bg-green-400/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-wide font-bold uppercase tracking-tighter leading-[0.95] mb-4">
            You&apos;re <span className="shimmer-text">in{firstName ? `, ${firstName}` : ""}.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg text-zinc-400 font-sans mb-10 max-w-md mx-auto leading-relaxed">
            The AI War Room is every <strong className="text-white">Thursday at 2:00 PM ET</strong>.
            Check your email for the join link.
          </p>
        </Reveal>

        {/* Action Cards */}
        <Reveal delay={0.3}>
          <div className="space-y-4 mb-12">
            {/* Add to Calendar */}
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-6 py-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all group text-left"
            >
              <Calendar className="w-6 h-6 text-green-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold font-sans text-white">
                  Add to Google Calendar
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  So you don&apos;t forget. Thursday, 2:00 PM ET.
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </a>

            {/* Explore MNS */}
            <Link
              href="/"
              className="flex items-center gap-4 px-6 py-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all group text-left"
            >
              <ExternalLink className="w-6 h-6 text-zinc-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold font-sans text-white">
                  See what our AI can do
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Explore the full MyNewStaff.ai platform.
                </p>
              </div>
            </Link>
          </div>
        </Reveal>

        {/* Share */}
        <Reveal delay={0.4}>
          <div className="border-t border-white/5 pt-8">
            <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4">
              Know someone who needs AI in their business?
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${getShareText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 rounded-full text-xs tracking-[0.15em] uppercase text-zinc-400 hover:text-white hover:border-white/30 transition-all font-sans"
              >
                <Share2 className="w-3.5 h-3.5" /> Share on X
              </a>
              <a
                href={`https://wa.me/?text=${getShareText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 rounded-full text-xs tracking-[0.15em] uppercase text-zinc-400 hover:text-white hover:border-white/30 transition-all font-sans"
              >
                <Share2 className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Exported Component (wrapped in Suspense for searchParams) ──

export function WarRoomThanks() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[100dvh] flex items-center justify-center">
          <p className="text-zinc-500 text-sm">Loading...</p>
        </section>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
