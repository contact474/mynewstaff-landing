"use client";

import Link from "next/link";

interface ScanCardProps {
  domain: string;
  score: number;
  date: string;
  locale: string;
  id: string;
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-blue-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function scoreBgColor(score: number): string {
  if (score >= 80) return "bg-emerald-400/10 border-emerald-400/20";
  if (score >= 60) return "bg-blue-400/10 border-blue-400/20";
  if (score >= 40) return "bg-amber-400/10 border-amber-400/20";
  return "bg-red-400/10 border-red-400/20";
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Weak";
  return "Critical";
}

function relativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export function ScanCard({ domain, score, date, locale, id }: ScanCardProps) {
  return (
    <Link
      href={`/app/scans/${id}`}
      className="block border border-white/10 p-6 hover:bg-white/[0.02] transition-colors group"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Domain + meta */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-sans text-white truncate group-hover:text-white/90 transition-colors">
            {domain}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">
              {relativeDate(date)}
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-600 font-sans">
              {locale === "es" ? "ES" : "EN"}
            </span>
          </div>
        </div>

        {/* Score badge */}
        <div
          className={[
            "shrink-0 flex flex-col items-center justify-center w-16 h-16 border",
            scoreBgColor(score),
          ].join(" ")}
        >
          <span className={["text-xl font-wide font-bold", scoreColor(score)].join(" ")}>
            {score}
          </span>
          <span className="text-[8px] tracking-[0.1em] uppercase text-zinc-500 font-sans mt-0.5">
            {scoreLabel(score)}
          </span>
        </div>
      </div>
    </Link>
  );
}
