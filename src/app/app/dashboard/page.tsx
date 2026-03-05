"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth, useSubscription } from "@/lib/supabase/auth-context";
import { createClient } from "@/lib/supabase/client";
import { ScanCard } from "@/components/app/ScanCard";
import { UsageMeter } from "@/components/app/UsageMeter";
import { SubscriptionBadge } from "@/components/app/SubscriptionBadge";
import { SCAN_LIMITS } from "@/lib/tiers";
import type { Scan, ScanQuota } from "@/lib/supabase/types";

function IconScan() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="1.75" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="8" y2="14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.75" y1="8" x2="3.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.5" y1="8" x2="14.25" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPlaybooks() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.75" y="1.75" width="10.5" height="12.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="10.5" x2="8.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconAITools() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.75L9.5 5.5L13.25 5.5L10.25 7.75L11.25 11.5L8 9.25L4.75 11.5L5.75 7.75L2.75 5.5L6.5 5.5L8 1.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconUpgrade() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.5L12 7H9.5V12.5H6.5V7H4L8 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "New Scan",
    description: "Diagnose a website",
    href: "/scalex",
    icon: <IconScan />,
  },
  {
    label: "Playbooks",
    description: "View growth plans",
    href: "/app/playbooks",
    icon: <IconPlaybooks />,
  },
  {
    label: "AI Tools",
    description: "Generate strategies",
    href: "/app/ai-tools",
    icon: <IconAITools />,
  },
  {
    label: "Upgrade",
    description: "Unlock more power",
    href: "/scalex/pricing",
    icon: <IconUpgrade />,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const subscription = useSubscription();
  const [scans, setScans] = useState<Scan[]>([]);
  const [quota, setQuota] = useState<ScanQuota | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();

    async function fetchData() {
      setLoading(true);
      const [scansRes, quotaRes] = await Promise.all([
        supabase
          .from("scans")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase.rpc("check_scan_quota", { p_user_id: user!.id }),
      ]);

      if (scansRes.data) setScans(scansRes.data as Scan[]);
      if (quotaRes.data) setQuota(quotaRes.data as ScanQuota);
      setLoading(false);
    }

    fetchData();
  }, [user]);

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "there";

  const latestScan = scans[0] ?? null;
  const scanLimit = SCAN_LIMITS[subscription.tier];
  const scansUsed = quota?.used ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-10 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-1">Dashboard</p>
        <h1 className="text-2xl md:text-3xl font-wide font-bold uppercase text-white">
          Welcome back, {displayName}
        </h1>
      </div>

      {/* Top row — ScaleX Score + Subscription */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* ScaleX Score */}
        <div className="border border-white/10 p-6 bg-black">
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
            Latest ScaleX Score
          </p>
          {loading ? (
            <div className="h-16 bg-white/5 animate-pulse" />
          ) : latestScan ? (
            <div className="flex items-center gap-6">
              <div className="text-5xl font-wide font-bold text-white">
                {latestScan.overall_score}
              </div>
              <div>
                <p className="text-sm font-sans text-zinc-400 truncate max-w-[200px]">
                  {latestScan.domain}
                </p>
                <Link
                  href={`/app/scans/${latestScan.id}`}
                  className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors font-sans flex items-center gap-1.5 mt-1"
                >
                  View report <IconArrow />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-sans text-zinc-500">No scans yet.</p>
              <Link
                href="/scalex"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-colors"
              >
                Run your first scan <IconArrow />
              </Link>
            </div>
          )}
        </div>

        {/* Subscription + usage */}
        <div className="border border-white/10 p-6 bg-black space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans">
              Current Plan
            </p>
            <SubscriptionBadge tier={subscription.tier} />
          </div>

          <UsageMeter
            used={scansUsed}
            limit={scanLimit}
            label="Scans this month"
          />

          {subscription.tier === "free" && (
            <Link
              href="/scalex/pricing"
              className="block text-center py-2.5 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-white/[0.03] transition-colors"
            >
              Upgrade to unlock more
            </Link>
          )}
        </div>
      </div>

      {/* Recent scans */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans">
            Recent Scans
          </p>
          {scans.length > 0 && (
            <Link
              href="/app/scans"
              className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors font-sans flex items-center gap-1.5"
            >
              View all <IconArrow />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white/[0.02] border border-white/10 animate-pulse" />
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
          <div className="border border-white/10 p-8 text-center">
            <p className="text-sm font-sans text-zinc-500 mb-4">
              No scans yet. Run your first ScaleX diagnostic.
            </p>
            <Link
              href="/scalex"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-colors"
            >
              Start Free Scan <IconArrow />
            </Link>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="border border-white/10 p-5 hover:bg-white/[0.02] transition-colors group flex flex-col gap-3"
            >
              <span className="text-zinc-400 group-hover:text-white transition-colors">
                {action.icon}
              </span>
              <div>
                <p className="text-sm font-sans text-white font-medium">{action.label}</p>
                <p className="text-[10px] tracking-[0.05em] text-zinc-500 font-sans mt-0.5">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
