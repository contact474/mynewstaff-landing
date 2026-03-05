"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Scan } from "@/lib/supabase/types";

function IconBack() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 8H3M6.5 4.5L3 8l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PILLAR_LABELS: Record<string, string> = {
  digital_presence: "Digital Presence",
  website_conversion: "Website Conversion",
  content_strategy: "Content Strategy",
  lead_generation: "Lead Generation",
  marketing_automation: "Marketing Automation",
  advertising: "Advertising",
  sales_process: "Sales Process",
  customer_journey: "Customer Journey",
  tech_ai_readiness: "Tech & AI Readiness",
  revenue_operations: "Revenue Operations",
};

function scoreColor(score: number): string {
  if (score >= 8) return "text-emerald-400";
  if (score >= 6) return "text-blue-400";
  if (score >= 4) return "text-amber-400";
  return "text-red-400";
}

function scoreBgColor(score: number): string {
  if (score >= 8) return "bg-emerald-400";
  if (score >= 6) return "bg-blue-400";
  if (score >= 4) return "bg-amber-400";
  return "bg-red-400";
}

function overallScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-blue-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function overallLabel(score: number): string {
  if (score >= 80) return "Strong Growth Engine";
  if (score >= 60) return "Moderate Growth Engine";
  if (score >= 40) return "Weak Growth Engine";
  return "Critical — Needs Attention";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface PillarScores {
  [key: string]: number;
}

interface Recommendation {
  pillar?: string;
  priority?: string;
  title?: string;
  action?: string;
  impact?: string;
  [key: string]: unknown;
}

export default function ScanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [scan, setScan] = useState<Scan | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = params?.id as string;
    if (!id) return;

    const supabase = createClient();

    async function fetchScan() {
      setLoading(true);
      const { data, error } = await supabase
        .from("scans")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setScan(data as Scan);
      }
      setLoading(false);
    }

    fetchScan();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <div className="space-y-4">
          <div className="h-8 w-32 bg-white/[0.03] animate-pulse" />
          <div className="h-16 w-64 bg-white/[0.03] animate-pulse" />
          <div className="h-48 bg-white/[0.03] animate-pulse" />
        </div>
      </div>
    );
  }

  if (notFound || !scan) {
    return (
      <div className="p-6 md:p-10 max-w-5xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-2">Not Found</p>
        <p className="text-sm font-sans text-zinc-400 mb-6">This scan could not be found.</p>
        <Link
          href="/app/scans"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-white/[0.03] transition-colors"
        >
          <IconBack /> Back to Scans
        </Link>
      </div>
    );
  }

  const pillarScores = (scan.scores ?? {}) as PillarScores;
  const recommendations = (scan.recommendations ?? []) as Recommendation[];
  const pillars = Object.keys(PILLAR_LABELS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-10 max-w-5xl mx-auto"
    >
      {/* Back */}
      <Link
        href="/app/scans"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors font-sans mb-8"
      >
        <IconBack /> All Scans
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-1">
            Scan Report
          </p>
          <h1 className="text-2xl md:text-3xl font-wide font-bold uppercase text-white">
            {scan.domain}
          </h1>
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans mt-2">
            {formatDate(scan.created_at)} &bull; {scan.locale === "es" ? "Spanish" : "English"}
          </p>
        </div>

        <Link
          href="/app/ai-tools"
          className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-colors"
        >
          Generate AI Playbook <IconArrow />
        </Link>
      </div>

      {/* Overall score */}
      <div className="border border-white/10 p-8 mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-2">
            ScaleX Score
          </p>
          <div className={["text-7xl font-wide font-bold", overallScoreColor(scan.overall_score)].join(" ")}>
            {scan.overall_score}
          </div>
          <p className="text-sm font-sans text-zinc-400 mt-1">
            {overallLabel(scan.overall_score)}
          </p>
        </div>

        {/* Radar-style pillar bars (simplified visual) */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pillars.map((key) => {
              const val = pillarScores[key] ?? 0;
              const pct = Math.round((val / 10) * 100);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] tracking-[0.15em] uppercase text-zinc-500 font-sans">
                      {PILLAR_LABELS[key]}
                    </span>
                    <span className={["text-[10px] font-wide font-bold", scoreColor(val)].join(" ")}>
                      {val.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-0.5 bg-white/[0.06] w-full">
                    <div
                      className={["h-full transition-all duration-700", scoreBgColor(val)].join(" ")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
            Top Recommendations
          </p>
          <div className="space-y-3">
            {recommendations.slice(0, 10).map((rec, idx) => (
              <div key={idx} className="border border-white/10 p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {rec.pillar && (
                      <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-sans bg-white/[0.04] border border-white/10 px-2 py-0.5">
                        {PILLAR_LABELS[rec.pillar] ?? rec.pillar}
                      </span>
                    )}
                    {rec.priority && (
                      <span
                        className={[
                          "text-[9px] tracking-[0.2em] uppercase font-sans px-2 py-0.5 border",
                          rec.priority === "high"
                            ? "text-red-400 border-red-400/30 bg-red-400/5"
                            : rec.priority === "medium"
                            ? "text-amber-400 border-amber-400/30 bg-amber-400/5"
                            : "text-zinc-400 border-zinc-400/30 bg-zinc-400/5",
                        ].join(" ")}
                      >
                        {rec.priority}
                      </span>
                    )}
                  </div>
                </div>
                {rec.title && (
                  <p className="text-sm font-sans font-medium text-white mb-1">{rec.title}</p>
                )}
                {rec.action && (
                  <p className="text-xs font-sans text-zinc-400 leading-relaxed">{rec.action}</p>
                )}
                {rec.impact && (
                  <p className="text-[10px] tracking-[0.05em] text-zinc-600 font-sans mt-2">
                    Impact: {rec.impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech stack + key findings */}
      {scan.findings && (
        <div className="border border-white/10 p-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
            Key Findings
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-sans">
            {/* Tech stack */}
            {Array.isArray((scan.findings as Record<string, unknown>).techStack) &&
              ((scan.findings as Record<string, unknown>).techStack as string[]).length > 0 && (
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-sans mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {((scan.findings as Record<string, unknown>).techStack as string[])
                      .slice(0, 8)
                      .map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] tracking-[0.05em] text-zinc-300 font-sans bg-white/[0.04] border border-white/10 px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                </div>
              )}

            {/* Analytics */}
            {Array.isArray((scan.findings as Record<string, unknown>).analytics) &&
              ((scan.findings as Record<string, unknown>).analytics as string[]).length > 0 && (
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-sans mb-2">
                    Analytics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {((scan.findings as Record<string, unknown>).analytics as string[]).map(
                      (t: string) => (
                        <span
                          key={t}
                          className="text-[10px] tracking-[0.05em] text-zinc-300 font-sans bg-white/[0.04] border border-white/10 px-2 py-0.5"
                        >
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Quick signals */}
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-sans mb-2">
                Signals
              </p>
              <div className="space-y-1.5">
                {[
                  { label: "SSL", val: (scan.findings as Record<string, unknown>).ssl },
                  { label: "Mobile Viewport", val: (scan.findings as Record<string, unknown>).hasMobileViewport },
                  { label: "Schema Markup", val: (scan.findings as Record<string, unknown>).hasSchema },
                  { label: "Sitemap", val: (scan.findings as Record<string, unknown>).hasSitemap },
                  { label: "CTAs", val: (scan.findings as Record<string, unknown>).hasCTAs },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={[
                        "w-1.5 h-1.5 rounded-full shrink-0",
                        val ? "bg-emerald-400" : "bg-red-400",
                      ].join(" ")}
                    />
                    <span className="text-[10px] text-zinc-400 font-sans">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/app/ai-tools"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-colors"
        >
          Generate AI Playbook <IconArrow />
        </Link>
        <Link
          href="/scalex"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-white/[0.03] transition-colors"
        >
          Scan Another Domain <IconArrow />
        </Link>
      </div>
    </motion.div>
  );
}
