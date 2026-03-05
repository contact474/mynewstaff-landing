"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/auth-context";
import { createClient } from "@/lib/supabase/client";
import { ScanCard } from "@/components/app/ScanCard";
import type { Scan } from "@/lib/supabase/types";

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ScansPage() {
  const { user } = useAuth();
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();

    async function fetchScans() {
      setLoading(true);
      const { data } = await supabase
        .from("scans")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setScans(data as Scan[]);
      setLoading(false);
    }

    fetchScans();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-10 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-1">
            ScaleX AI
          </p>
          <h1 className="text-2xl md:text-3xl font-wide font-bold uppercase text-white">
            Saved Scans
          </h1>
        </div>
        <Link
          href="/scalex"
          className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-colors"
        >
          New Scan <IconArrow />
        </Link>
      </div>

      {/* Scan count */}
      {!loading && scans.length > 0 && (
        <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans mb-6">
          {scans.length} scan{scans.length !== 1 ? "s" : ""} total
        </p>
      )}

      {/* Content */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-white/[0.02] border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : scans.length > 0 ? (
        <div className="space-y-2">
          {scans.map((scan) => (
            <ScanCard
              key={scan.id}
              id={scan.id}
              domain={scan.domain}
              score={scan.overall_score}
              date={scan.created_at}
              locale={scan.locale}
            />
          ))}
        </div>
      ) : (
        <div className="border border-white/10 p-12 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-2">
            No scans yet
          </p>
          <p className="text-sm font-sans text-zinc-400 mb-6">
            Run your first ScaleX diagnostic to see your growth engine score.
          </p>
          <Link
            href="/scalex"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-colors"
          >
            Start Free Scan <IconArrow />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
