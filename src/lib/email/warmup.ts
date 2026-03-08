/**
 * Email warmup tracker for MyNewStaff SaaS.
 *
 * Tracks sending volume per domain to maintain deliverability.
 * Day 1-3:   5 emails/day, plain text only
 * Day 4-7:  10/day, plain text
 * Day 8-14: 20/day, HTML allowed
 * Day 15+:  50/day, full HTML
 *
 * State is persisted in Supabase `email_warmup` table with in-memory cache.
 */

import { createServiceClient } from "@/lib/supabase/server";

// ─── Types ───

export interface WarmupState {
  domain: string;
  startDate: string;
  currentDay: number;
  emailsSentToday: number;
  lastSendDate: string;
  format: "text" | "html";
  dailyLimit: number;
}

interface WarmupTier {
  maxDay: number;
  dailyLimit: number;
  format: "text" | "html";
}

// ─── Configuration ───

const WARMUP_TIERS: WarmupTier[] = [
  { maxDay: 3, dailyLimit: 5, format: "text" },
  { maxDay: 7, dailyLimit: 10, format: "text" },
  { maxDay: 14, dailyLimit: 20, format: "html" },
  { maxDay: Infinity, dailyLimit: 50, format: "html" },
];

// In-memory cache to reduce DB reads per request
const warmupCache: Map<
  string,
  { state: WarmupState; cachedAt: number }
> = new Map();
const CACHE_TTL_MS = 60 * 1000; // 1 minute

// ─── Tier Resolution ───

function getTierForDay(day: number): WarmupTier {
  for (const tier of WARMUP_TIERS) {
    if (day <= tier.maxDay) return tier;
  }
  return WARMUP_TIERS[WARMUP_TIERS.length - 1];
}

function calculateCurrentDay(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);
}

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

// ─── Core Functions ───

export async function getWarmupState(domain: string): Promise<WarmupState> {
  // Check cache first
  const cached = warmupCache.get(domain);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached.state;
  }

  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("email_warmup")
    .select("*")
    .eq("domain", domain)
    .single();

  const today = getTodayDate();

  if (data) {
    const currentDay = calculateCurrentDay(data.start_date);
    const tier = getTierForDay(currentDay);

    // Reset daily count if new day
    const emailsSentToday =
      data.last_send_date === today ? data.emails_sent_today : 0;

    const state: WarmupState = {
      domain,
      startDate: data.start_date,
      currentDay,
      emailsSentToday,
      lastSendDate: data.last_send_date || today,
      format: tier.format,
      dailyLimit: tier.dailyLimit,
    };

    warmupCache.set(domain, { state, cachedAt: Date.now() });
    return state;
  }

  // No record: initialize warmup for this domain
  const startDate = new Date().toISOString();
  const tier = getTierForDay(1);

  const newState: WarmupState = {
    domain,
    startDate,
    currentDay: 1,
    emailsSentToday: 0,
    lastSendDate: today,
    format: tier.format,
    dailyLimit: tier.dailyLimit,
  };

  await supabase.from("email_warmup").insert({
    domain,
    start_date: startDate,
    emails_sent_today: 0,
    last_send_date: today,
  });

  warmupCache.set(domain, { state: newState, cachedAt: Date.now() });
  return newState;
}

export async function canSendEmail(
  domain: string
): Promise<{ allowed: boolean; format: "text" | "html"; remaining: number }> {
  const state = await getWarmupState(domain);
  const remaining = Math.max(0, state.dailyLimit - state.emailsSentToday);

  return {
    allowed: remaining > 0,
    format: state.format,
    remaining,
  };
}

export async function recordSend(domain: string): Promise<void> {
  const supabase = await createServiceClient();
  const today = getTodayDate();

  // Get current state to check if day rolled over
  const { data: existing } = await supabase
    .from("email_warmup")
    .select("last_send_date, emails_sent_today")
    .eq("domain", domain)
    .single();

  const isNewDay = existing?.last_send_date !== today;
  const newCount = isNewDay ? 1 : (existing?.emails_sent_today || 0) + 1;

  await supabase
    .from("email_warmup")
    .update({
      emails_sent_today: newCount,
      last_send_date: today,
    })
    .eq("domain", domain);

  // Invalidate cache
  warmupCache.delete(domain);

  console.log(
    `[warmup] Recorded send for ${domain}: ${newCount} emails today`
  );
}

// ─── Utility ───

export function extractDomain(email: string): string {
  return email.split("@")[1] || email;
}

export function clearWarmupCache(): void {
  warmupCache.clear();
}
