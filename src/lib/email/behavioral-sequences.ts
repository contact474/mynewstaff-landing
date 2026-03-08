/**
 * Behavioral Email Sequence Engine for MyNewStaff SaaS.
 *
 * Manages 5 automated email sequences triggered by user behavior:
 * 1. ONBOARDING — new signups (welcome, scan guide, tools guide, upsell)
 * 2. SCAN_FOLLOWUP — after user runs EscalaX scan (results, pillar fix, social proof)
 * 3. RE_ENGAGEMENT — inactive 7+ days (reminder, new features, win-back)
 * 4. UPSELL — free users showing high engagement (limit hit, case study, discount)
 * 5. PARTNER_NURTURE — after partner application (welcome, earnings, toolkit)
 *
 * Temperature tracking (HOT/WARM/COOL/COLD) drives sequence prioritization.
 * State is persisted in Supabase `email_sequences` table.
 */

import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import {
  onboardingWelcomeEmail,
  onboardingDay1Email,
  onboardingDay3Email,
  onboardingDay7Email,
  scanResultsEmail,
  scanPillarEmail,
  scanSocialProofEmail,
  reengagementDay7Email,
  reengagementDay14Email,
  reengagementDay30Email,
  upsellLimitHitEmail,
  upsellCaseStudyEmail,
  upsellDiscountEmail,
  partnerWelcomeEmail,
  partnerEarningsEmail,
  partnerToolkitEmail,
} from "@/lib/email/sequence-templates";

// ─── Types ───

export type SequenceType =
  | "onboarding"
  | "scan_followup"
  | "reengagement"
  | "upsell"
  | "partner_nurture";

export type UserTemperature = "hot" | "warm" | "cool" | "cold";

export type SequenceStatus = "active" | "paused" | "completed" | "cancelled";

export interface UserSequenceState {
  userId: string;
  sequenceType: SequenceType;
  currentEmailIndex: number;
  status: SequenceStatus;
  temperature: UserTemperature;
  lastEmailSentAt?: string;
  nextEmailAt?: string;
  engagementScore: number;
  pauseReason?: string;
}

export interface UserEngagementData {
  userId: string;
  email: string;
  firstName: string;
  tier: string;
  lastActiveAt: string | null;
  scanCount: number;
  toolsUsedCount: number;
  playbookCount: number;
  subscriptionStatus: string | null;
  lastScanScore: number | null;
  lastScanWeakestPillar: string | null;
  createdAt: string;
}

// ─── Sequence Definitions ───

interface SequenceEmail {
  delayHours: number;
  getTemplate: (data: UserEngagementData) => { subject: string; html: string };
}

const SEQUENCE_EMAILS: Record<SequenceType, SequenceEmail[]> = {
  onboarding: [
    {
      // Email 1: Welcome (immediate)
      delayHours: 0,
      getTemplate: (d) => onboardingWelcomeEmail(d.firstName),
    },
    {
      // Email 2: Day 1 — Run your first EscalaX scan
      delayHours: 24,
      getTemplate: (d) => onboardingDay1Email(d.firstName),
    },
    {
      // Email 3: Day 3 — Your 7 AI marketing tools guide
      delayHours: 72,
      getTemplate: (d) => onboardingDay3Email(d.firstName),
    },
    {
      // Email 4: Day 7 — See what Growth plan unlocks (upsell if free)
      delayHours: 168,
      getTemplate: (d) => onboardingDay7Email(d.firstName, d.tier === "free"),
    },
  ],
  scan_followup: [
    {
      // Email 1: Immediate — Your diagnostic results + quick wins
      delayHours: 0,
      getTemplate: (d) =>
        scanResultsEmail(
          d.firstName,
          d.lastScanScore || 50,
          d.lastScanWeakestPillar || "Digital Presence"
        ),
    },
    {
      // Email 2: Day 2 — What fixing weakest pillar means for revenue
      delayHours: 48,
      getTemplate: (d) =>
        scanPillarEmail(
          d.firstName,
          d.lastScanWeakestPillar || "Digital Presence"
        ),
    },
    {
      // Email 3: Day 5 — Social proof: companies improved X%
      delayHours: 120,
      getTemplate: (d) => scanSocialProofEmail(d.firstName),
    },
  ],
  reengagement: [
    {
      // Email 1: Day 7 — Your marketing diagnostic is waiting
      delayHours: 0,
      getTemplate: (d) => reengagementDay7Email(d.firstName),
    },
    {
      // Email 2: Day 14 — New features launched
      delayHours: 168,
      getTemplate: (d) => reengagementDay14Email(d.firstName),
    },
    {
      // Email 3: Day 30 — Win-back with free scan
      delayHours: 384,
      getTemplate: (d) => reengagementDay30Email(d.firstName),
    },
  ],
  upsell: [
    {
      // Email 1: You've hit your plan limit
      delayHours: 0,
      getTemplate: (d) => upsellLimitHitEmail(d.firstName, d.tier),
    },
    {
      // Email 2: Case study: how businesses grow 3x
      delayHours: 72,
      getTemplate: (d) => upsellCaseStudyEmail(d.firstName),
    },
    {
      // Email 3: Special: 30% off first month
      delayHours: 168,
      getTemplate: (d) => upsellDiscountEmail(d.firstName),
    },
  ],
  partner_nurture: [
    {
      // Email 1: Welcome — application confirmed
      delayHours: 0,
      getTemplate: (d) => partnerWelcomeEmail(d.firstName),
    },
    {
      // Email 2: Day 3 — How top partners earn $5K+/month
      delayHours: 72,
      getTemplate: (d) => partnerEarningsEmail(d.firstName),
    },
    {
      // Email 3: Day 7 — Your partner toolkit is ready
      delayHours: 168,
      getTemplate: (d) => partnerToolkitEmail(d.firstName),
    },
  ],
};

// ─── Engagement Score Calculation ───

export function calculateEngagementScore(user: UserEngagementData): number {
  let score = 0;

  // Recency (0-30 points)
  const now = Date.now();
  const lastActive = user.lastActiveAt
    ? new Date(user.lastActiveAt).getTime()
    : 0;
  const daysSinceActive = lastActive
    ? (now - lastActive) / (1000 * 60 * 60 * 24)
    : 999;

  if (daysSinceActive <= 1) score += 30;
  else if (daysSinceActive <= 3) score += 25;
  else if (daysSinceActive <= 7) score += 15;
  else if (daysSinceActive <= 14) score += 5;

  // Frequency: scans completed (0-25 points)
  score += Math.min(user.scanCount * 5, 25);

  // Depth: tools used / playbooks generated (0-25 points)
  score += Math.min(user.toolsUsedCount * 4, 15);
  score += Math.min(user.playbookCount * 5, 10);

  // Monetization (0-20 points)
  const tierScores: Record<string, number> = {
    free: 0,
    starter: 10,
    growth: 15,
    scale: 20,
  };
  score += tierScores[user.tier] ?? 0;

  return Math.min(score, 100);
}

// ─── Temperature Calculation ───

export function getUserTemperature(score: number): UserTemperature {
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  if (score >= 15) return "cool";
  return "cold";
}

// ─── Pause Conditions ───

async function checkPauseConditions(
  userId: string,
  sequenceType: SequenceType
): Promise<boolean> {
  const supabase = await createServiceClient();

  switch (sequenceType) {
    case "reengagement": {
      // Pause if user ran a scan recently (came back)
      const { data: recentScan } = await supabase
        .from("scans")
        .select("id")
        .eq("user_id", userId)
        .gte(
          "created_at",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        )
        .limit(1);
      if (recentScan && recentScan.length > 0) return true;
      break;
    }

    case "upsell": {
      // Pause if user upgraded from free
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("tier, status")
        .eq("user_id", userId)
        .single();
      if (
        sub?.status === "active" &&
        sub?.tier !== "free"
      )
        return true;
      break;
    }

    default:
      break;
  }

  return false;
}

// ─── Core Functions ───

export async function enrollUser(
  userId: string,
  sequence: SequenceType,
  metadata?: Record<string, unknown>
): Promise<void> {
  const supabase = await createServiceClient();

  // Check if already enrolled in this sequence and active
  const { data: existing } = await supabase
    .from("email_sequences")
    .select("id, status")
    .eq("user_id", userId)
    .eq("sequence_type", sequence)
    .in("status", ["active", "paused"])
    .single();

  if (existing) {
    console.log(
      `[sequences] User ${userId} already enrolled in ${sequence} (status: ${existing.status})`
    );
    return;
  }

  const emails = SEQUENCE_EMAILS[sequence];
  const firstEmail = emails[0];
  const nextEmailAt = new Date(
    Date.now() + firstEmail.delayHours * 60 * 60 * 1000
  ).toISOString();

  await supabase.from("email_sequences").insert({
    user_id: userId,
    sequence_type: sequence,
    current_email_index: 0,
    status: "active",
    next_email_at: nextEmailAt,
    engagement_score: 0,
    metadata: metadata || null,
  });

  console.log(
    `[sequences] Enrolled user ${userId} in ${sequence}, next email at ${nextEmailAt}`
  );
}

export async function processSequenceQueue(): Promise<{
  sent: number;
  skipped: number;
  errors: number;
}> {
  const supabase = await createServiceClient();
  const now = new Date().toISOString();

  const result = { sent: 0, skipped: 0, errors: 0 };

  // Get all active sequences that are due
  const { data: dueSequences, error } = await supabase
    .from("email_sequences")
    .select("*")
    .eq("status", "active")
    .lte("next_email_at", now)
    .order("next_email_at", { ascending: true })
    .limit(100);

  if (error) {
    console.error("[sequences] Error fetching queue:", error);
    return result;
  }

  if (!dueSequences || dueSequences.length === 0) {
    console.log("[sequences] No sequences due for processing");
    return result;
  }

  console.log(`[sequences] Processing ${dueSequences.length} due sequences`);

  for (const seq of dueSequences) {
    try {
      // Check pause conditions
      const shouldPause = await checkPauseConditions(
        seq.user_id,
        seq.sequence_type as SequenceType
      );
      if (shouldPause) {
        await supabase
          .from("email_sequences")
          .update({
            status: "paused",
            pause_reason: "auto_pause_condition_met",
          })
          .eq("id", seq.id);
        result.skipped++;
        console.log(
          `[sequences] Paused ${seq.sequence_type} for user ${seq.user_id} (condition met)`
        );
        continue;
      }

      // Get user engagement data
      const userData = await getUserEngagementData(seq.user_id);
      if (!userData || !userData.email) {
        result.skipped++;
        console.warn(
          `[sequences] No user data for ${seq.user_id}, skipping`
        );
        continue;
      }

      // Get the email template for current index
      const emails = SEQUENCE_EMAILS[seq.sequence_type as SequenceType];
      if (!emails || seq.current_email_index >= emails.length) {
        // Sequence completed
        await supabase
          .from("email_sequences")
          .update({ status: "completed" })
          .eq("id", seq.id);
        result.skipped++;
        continue;
      }

      const emailDef = emails[seq.current_email_index];
      const template = emailDef.getTemplate(userData);

      // Send the email
      const sendResult = await sendEmail(userData.email, template);
      if (!sendResult.success) {
        result.errors++;
        console.error(
          `[sequences] Failed to send ${seq.sequence_type}[${seq.current_email_index}] to ${userData.email}: ${sendResult.error}`
        );
        continue;
      }

      // Calculate next email timing
      const nextIndex = seq.current_email_index + 1;
      const isComplete = nextIndex >= emails.length;

      const updateData: Record<string, unknown> = {
        current_email_index: nextIndex,
        last_email_sent_at: now,
        engagement_score: calculateEngagementScore(userData),
        temperature: getUserTemperature(calculateEngagementScore(userData)),
      };

      if (isComplete) {
        updateData.status = "completed";
        updateData.next_email_at = null;
      } else {
        const nextEmail = emails[nextIndex];
        updateData.next_email_at = new Date(
          Date.now() + nextEmail.delayHours * 60 * 60 * 1000
        ).toISOString();
      }

      await supabase
        .from("email_sequences")
        .update(updateData)
        .eq("id", seq.id);

      result.sent++;
      console.log(
        `[sequences] Sent ${seq.sequence_type}[${seq.current_email_index}] to ${userData.email}`
      );
    } catch (err) {
      result.errors++;
      console.error(
        `[sequences] Error processing sequence ${seq.id}:`,
        err
      );
    }
  }

  console.log(
    `[sequences] Done: ${result.sent} sent, ${result.skipped} skipped, ${result.errors} errors`
  );
  return result;
}

// ─── User Engagement Data Loader ───

async function getUserEngagementData(
  userId: string
): Promise<UserEngagementData | null> {
  const supabase = await createServiceClient();

  const [authResult, profileResult, subResult, scanResult, playbookResult] =
    await Promise.all([
      supabase.auth.admin.getUserById(userId),
      supabase
        .from("profiles")
        .select("full_name, created_at")
        .eq("id", userId)
        .single(),
      supabase
        .from("subscriptions")
        .select("tier, status")
        .eq("user_id", userId)
        .single(),
      supabase
        .from("scans")
        .select("id, overall_score, scores, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("playbooks")
        .select("id, type, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
    ]);

  const email = authResult.data?.user?.email;
  if (!email) return null;

  const firstName =
    profileResult.data?.full_name?.split(" ")[0] || "there";

  const tier = subResult.data?.tier || "free";

  // Determine last active from most recent scan or playbook
  const lastScanAt = scanResult.data?.[0]?.created_at || null;
  const lastPlaybookAt = playbookResult.data?.[0]?.created_at || null;
  let lastActiveAt: string | null = null;
  if (lastScanAt && lastPlaybookAt) {
    lastActiveAt =
      new Date(lastScanAt) > new Date(lastPlaybookAt)
        ? lastScanAt
        : lastPlaybookAt;
  } else {
    lastActiveAt = lastScanAt || lastPlaybookAt;
  }

  // Determine weakest pillar from last scan scores
  let lastScanWeakestPillar: string | null = null;
  const lastScanScores = scanResult.data?.[0]?.scores as Record<string, number> | null;
  if (lastScanScores) {
    let minScore = Infinity;
    for (const [pillar, score] of Object.entries(lastScanScores)) {
      if (typeof score === "number" && score < minScore) {
        minScore = score;
        lastScanWeakestPillar = pillar;
      }
    }
  }

  // Count unique tool types used from playbooks
  const toolTypes = new Set(
    (playbookResult.data || []).map((p) => p.type)
  );

  return {
    userId,
    email,
    firstName,
    tier,
    lastActiveAt,
    scanCount: scanResult.data?.length || 0,
    toolsUsedCount: toolTypes.size,
    playbookCount: playbookResult.data?.length || 0,
    subscriptionStatus: subResult.data?.status || null,
    lastScanScore: scanResult.data?.[0]?.overall_score || null,
    lastScanWeakestPillar,
    createdAt: profileResult.data?.created_at || new Date().toISOString(),
  };
}

// ─── Trigger Detection ───

export async function detectAndEnrollReengagement(): Promise<number> {
  const supabase = await createServiceClient();
  let enrolled = 0;

  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  // Find active subscribers
  const { data: subs } = await supabase
    .from("subscriptions")
    .select("user_id")
    .in("status", ["active", "trialing"]);

  if (!subs) return 0;

  for (const sub of subs) {
    // Check for recent scans
    const { data: recentScans } = await supabase
      .from("scans")
      .select("id")
      .eq("user_id", sub.user_id)
      .gte("created_at", sevenDaysAgo)
      .limit(1);

    // Check for recent playbooks
    const { data: recentPlaybooks } = await supabase
      .from("playbooks")
      .select("id")
      .eq("user_id", sub.user_id)
      .gte("created_at", sevenDaysAgo)
      .limit(1);

    const hasRecentActivity =
      (recentScans && recentScans.length > 0) ||
      (recentPlaybooks && recentPlaybooks.length > 0);

    if (hasRecentActivity) continue;

    // Check not already enrolled
    const { data: existing } = await supabase
      .from("email_sequences")
      .select("id")
      .eq("user_id", sub.user_id)
      .eq("sequence_type", "reengagement")
      .in("status", ["active", "paused"])
      .limit(1);

    if (existing && existing.length > 0) continue;

    await enrollUser(sub.user_id, "reengagement");
    enrolled++;
  }

  return enrolled;
}

export async function detectAndEnrollUpsell(): Promise<number> {
  const supabase = await createServiceClient();
  let enrolled = 0;

  // Find free/starter users
  const { data: subs } = await supabase
    .from("subscriptions")
    .select("user_id, tier")
    .in("tier", ["free", "starter"])
    .in("status", ["active"]);

  if (!subs) return 0;

  for (const sub of subs) {
    // Check triggers: 3+ scans
    const { data: scans } = await supabase
      .from("scans")
      .select("id")
      .eq("user_id", sub.user_id);

    const hasManyScansx = (scans?.length || 0) >= 3;

    // Check triggers: 2+ tool types used
    const { data: playbooks } = await supabase
      .from("playbooks")
      .select("type")
      .eq("user_id", sub.user_id);

    const uniqueTools = new Set((playbooks || []).map((p) => p.type));
    const hasManyTools = uniqueTools.size >= 2;

    if (!hasManyScansx && !hasManyTools) continue;

    // Check not already enrolled
    const { data: existing } = await supabase
      .from("email_sequences")
      .select("id")
      .eq("user_id", sub.user_id)
      .eq("sequence_type", "upsell")
      .in("status", ["active", "paused"])
      .limit(1);

    if (existing && existing.length > 0) continue;

    await enrollUser(sub.user_id, "upsell");
    enrolled++;
  }

  return enrolled;
}
