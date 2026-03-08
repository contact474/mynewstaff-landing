/**
 * SaaS Optimization Engine for MyNewStaff.
 *
 * 4 optimization loops:
 * 1. USER_ENGAGEMENT — scan frequency, tool usage, session activity
 * 2. EMAIL_DELIVERABILITY — bounce rate, open rate, complaint rate
 * 3. CONVERSION — free->paid, starter->growth, trial completion
 * 4. RETENTION — MAU, churn rate, reactivation rate
 *
 * Each loop generates actionable insights with severity levels and suggested actions.
 */

import { createServiceClient } from "@/lib/supabase/server";

// ─── Types ───

export type InsightCategory =
  | "user_engagement"
  | "email_deliverability"
  | "conversion"
  | "retention";

export type InsightSeverity = "critical" | "high" | "medium" | "low";

export interface OptimizationInsight {
  id: string;
  category: InsightCategory;
  severity: InsightSeverity;
  title: string;
  description: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  suggestedAction: string;
  estimatedImpact: string;
  createdAt: string;
}

// ─── Thresholds ───

const THRESHOLDS = {
  engagement: {
    firstScanRate: { target: 0.5, critical: 0.2 },
    returnRate7d: { target: 0.4, critical: 0.15 },
    avgScansPerUser: { target: 2, critical: 0.5 },
  },
  deliverability: {
    bounceRate: { target: 0.01, high: 0.03, critical: 0.05 },
    complaintRate: { target: 0.0005, high: 0.001, critical: 0.002 },
    openRate: { target: 0.25, low: 0.15, critical: 0.10 },
  },
  conversion: {
    freeToPaid: { target: 0.10, low: 0.05, critical: 0.02 },
    starterToGrowth: { target: 0.20, low: 0.10, critical: 0.05 },
  },
  retention: {
    monthlyChurn: { target: 0.05, high: 0.10, critical: 0.15 },
    mauRatio: { target: 0.30, low: 0.15, critical: 0.05 },
    reactivationRate: { target: 0.15, low: 0.05 },
  },
};

// ─── Utility ───

function generateId(): string {
  return `insight_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function determineSeverity(
  value: number,
  target: number,
  high: number,
  critical: number,
  lowerIsBetter = false
): InsightSeverity {
  if (lowerIsBetter) {
    if (value >= critical) return "critical";
    if (value >= high) return "high";
    if (value >= target) return "medium";
    return "low";
  }
  if (value <= critical) return "critical";
  if (value <= high) return "high";
  if (value <= target) return "medium";
  return "low";
}

// ─── Optimization Loops ───

async function analyzeUserEngagement(): Promise<OptimizationInsight[]> {
  const supabase = await createServiceClient();
  const insights: OptimizationInsight[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();
  const sevenDaysAgo = new Date(
    now.getTime() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  // Get all users created in last 30 days
  const { data: recentProfiles, count: totalRecentUsers } = await supabase
    .from("profiles")
    .select("id", { count: "exact" })
    .gte("created_at", thirtyDaysAgo);

  const totalUsers = totalRecentUsers || 0;

  if (totalUsers > 0) {
    // First scan rate: users who ran at least 1 scan
    const { data: usersWithScans } = await supabase
      .from("scans")
      .select("user_id")
      .in(
        "user_id",
        (recentProfiles || []).map((p) => p.id)
      );

    const uniqueUsersWithScans = new Set(
      (usersWithScans || []).map((s) => s.user_id)
    ).size;
    const firstScanRate = uniqueUsersWithScans / totalUsers;

    if (firstScanRate < THRESHOLDS.engagement.firstScanRate.target) {
      const severity =
        firstScanRate < THRESHOLDS.engagement.firstScanRate.critical
          ? "critical"
          : "high";
      insights.push({
        id: generateId(),
        category: "user_engagement",
        severity,
        title: "Low first scan rate",
        description: `Only ${(firstScanRate * 100).toFixed(1)}% of new users run their first EscalaX scan. Target is ${(THRESHOLDS.engagement.firstScanRate.target * 100).toFixed(0)}%.`,
        metric: "first_scan_rate",
        currentValue: parseFloat((firstScanRate * 100).toFixed(1)),
        targetValue: THRESHOLDS.engagement.firstScanRate.target * 100,
        suggestedAction:
          "Strengthen Day 1 onboarding email with clearer CTA. Add in-app tooltip guiding users to run their first scan. Consider simplifying the scan flow.",
        estimatedImpact:
          "15-25% increase in new user activation",
        createdAt: now.toISOString(),
      });
    }

    // Return rate: users active in last 7 days
    const { data: recentScans } = await supabase
      .from("scans")
      .select("user_id")
      .gte("created_at", sevenDaysAgo);

    const { data: recentPlaybooks } = await supabase
      .from("playbooks")
      .select("user_id")
      .gte("created_at", sevenDaysAgo);

    const activeUserIds = new Set([
      ...(recentScans || []).map((s) => s.user_id),
      ...(recentPlaybooks || []).map((p) => p.user_id),
    ]);

    const returnRate = totalUsers > 0 ? activeUserIds.size / totalUsers : 0;

    if (returnRate < THRESHOLDS.engagement.returnRate7d.target) {
      const severity =
        returnRate < THRESHOLDS.engagement.returnRate7d.critical
          ? "critical"
          : "high";
      insights.push({
        id: generateId(),
        category: "user_engagement",
        severity,
        title: "Low weekly return rate",
        description: `Only ${(returnRate * 100).toFixed(1)}% of users are active in the last 7 days. Target is ${(THRESHOLDS.engagement.returnRate7d.target * 100).toFixed(0)}%.`,
        metric: "return_rate_7d",
        currentValue: parseFloat((returnRate * 100).toFixed(1)),
        targetValue: THRESHOLDS.engagement.returnRate7d.target * 100,
        suggestedAction:
          "Activate more aggressive re-engagement email sequence. Send reminders about existing scan results. Add push notifications if possible.",
        estimatedImpact: "10-20% increase in weekly retention",
        createdAt: now.toISOString(),
      });
    }
  }

  return insights;
}

async function analyzeEmailDeliverability(): Promise<OptimizationInsight[]> {
  const supabase = await createServiceClient();
  const insights: OptimizationInsight[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  // Get email events from last 30 days
  const { data: events } = await supabase
    .from("email_events")
    .select("event_type")
    .gte("created_at", thirtyDaysAgo);

  if (!events || events.length === 0) return insights;

  const counts: Record<string, number> = {};
  for (const e of events) {
    counts[e.event_type] = (counts[e.event_type] || 0) + 1;
  }

  const totalDelivered = counts["delivered"] || 0;
  const totalBounced = counts["bounced"] || 0;
  const totalComplaints = counts["complained"] || 0;
  const totalOpened = counts["opened"] || 0;
  const totalSent = totalDelivered + totalBounced;

  if (totalSent > 0) {
    // Bounce rate
    const bounceRate = totalBounced / totalSent;
    if (bounceRate > THRESHOLDS.deliverability.bounceRate.target) {
      const severity = determineSeverity(
        bounceRate,
        THRESHOLDS.deliverability.bounceRate.target,
        THRESHOLDS.deliverability.bounceRate.high,
        THRESHOLDS.deliverability.bounceRate.critical,
        true
      );
      insights.push({
        id: generateId(),
        category: "email_deliverability",
        severity,
        title: "Elevated bounce rate",
        description: `Bounce rate is ${(bounceRate * 100).toFixed(2)}%. Acceptable limit is ${(THRESHOLDS.deliverability.bounceRate.target * 100).toFixed(1)}%.`,
        metric: "bounce_rate",
        currentValue: parseFloat((bounceRate * 100).toFixed(2)),
        targetValue: THRESHOLDS.deliverability.bounceRate.target * 100,
        suggestedAction:
          "Clean email list of bounced addresses. Implement double opt-in. Verify email validity at signup.",
        estimatedImpact:
          "Improved domain reputation and delivery rate",
        createdAt: now.toISOString(),
      });
    }

    // Complaint rate
    const complaintRate =
      totalDelivered > 0 ? totalComplaints / totalDelivered : 0;
    if (complaintRate > THRESHOLDS.deliverability.complaintRate.target) {
      const severity = determineSeverity(
        complaintRate,
        THRESHOLDS.deliverability.complaintRate.target,
        THRESHOLDS.deliverability.complaintRate.high,
        THRESHOLDS.deliverability.complaintRate.critical,
        true
      );
      insights.push({
        id: generateId(),
        category: "email_deliverability",
        severity,
        title: "Elevated complaint rate",
        description: `Spam complaint rate is ${(complaintRate * 100).toFixed(3)}%. Limit is ${(THRESHOLDS.deliverability.complaintRate.target * 100).toFixed(2)}%.`,
        metric: "complaint_rate",
        currentValue: parseFloat((complaintRate * 100).toFixed(3)),
        targetValue: THRESHOLDS.deliverability.complaintRate.target * 100,
        suggestedAction:
          "Pause sending immediately if above 0.1%. Review email content. Add more visible unsubscribe link. Reduce sending frequency.",
        estimatedImpact:
          "Prevention of ISP and Resend blocking",
        createdAt: now.toISOString(),
      });
    }

    // Open rate
    const openRate =
      totalDelivered > 0 ? totalOpened / totalDelivered : 0;
    if (openRate < THRESHOLDS.deliverability.openRate.target) {
      const severity =
        openRate < THRESHOLDS.deliverability.openRate.critical
          ? "critical"
          : openRate < THRESHOLDS.deliverability.openRate.low
            ? "high"
            : "medium";
      insights.push({
        id: generateId(),
        category: "email_deliverability",
        severity,
        title: "Low open rate",
        description: `Open rate is ${(openRate * 100).toFixed(1)}%. Target is ${(THRESHOLDS.deliverability.openRate.target * 100).toFixed(0)}%.`,
        metric: "open_rate",
        currentValue: parseFloat((openRate * 100).toFixed(1)),
        targetValue: THRESHOLDS.deliverability.openRate.target * 100,
        suggestedAction:
          "Improve subject lines (A/B test). Optimize send time. Verify emails are not landing in spam. Consider changing sender name.",
        estimatedImpact: "20-40% increase in opens",
        createdAt: now.toISOString(),
      });
    }
  }

  return insights;
}

async function analyzeConversion(): Promise<OptimizationInsight[]> {
  const supabase = await createServiceClient();
  const insights: OptimizationInsight[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  // Total users in last 30 days
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("id", { count: "exact" })
    .gte("created_at", thirtyDaysAgo);

  // Paid users (non-free active subs)
  const { count: paidUsers } = await supabase
    .from("subscriptions")
    .select("user_id", { count: "exact" })
    .in("status", ["active", "trialing"])
    .neq("tier", "free");

  const total = totalUsers || 0;
  const paid = paidUsers || 0;

  if (total > 0) {
    const conversionRate = paid / total;
    if (conversionRate < THRESHOLDS.conversion.freeToPaid.target) {
      const severity =
        conversionRate < THRESHOLDS.conversion.freeToPaid.critical
          ? "critical"
          : conversionRate < THRESHOLDS.conversion.freeToPaid.low
            ? "high"
            : "medium";
      insights.push({
        id: generateId(),
        category: "conversion",
        severity,
        title: "Low free-to-paid conversion",
        description: `Only ${(conversionRate * 100).toFixed(1)}% of users convert to paid plans. Target is ${(THRESHOLDS.conversion.freeToPaid.target * 100).toFixed(0)}%.`,
        metric: "free_to_paid_rate",
        currentValue: parseFloat((conversionRate * 100).toFixed(1)),
        targetValue: THRESHOLDS.conversion.freeToPaid.target * 100,
        suggestedAction:
          "Activate upsell sequence earlier. Improve paywall messaging showing value. Add social proof on pricing page. Consider extending trial.",
        estimatedImpact:
          "Each 1% improvement in conversion = significant MRR growth",
        createdAt: now.toISOString(),
      });
    }
  }

  // Starter to Growth upgrade rate
  const { count: starterCount } = await supabase
    .from("subscriptions")
    .select("user_id", { count: "exact" })
    .eq("tier", "starter")
    .in("status", ["active"]);

  const { count: growthCount } = await supabase
    .from("subscriptions")
    .select("user_id", { count: "exact" })
    .in("tier", ["growth", "scale"])
    .in("status", ["active"]);

  const starterBase = (starterCount || 0) + (growthCount || 0);
  if (starterBase > 0) {
    const upgradeRate = (growthCount || 0) / starterBase;
    if (upgradeRate < THRESHOLDS.conversion.starterToGrowth.target) {
      const severity =
        upgradeRate < THRESHOLDS.conversion.starterToGrowth.critical
          ? "critical"
          : upgradeRate < THRESHOLDS.conversion.starterToGrowth.low
            ? "high"
            : "medium";
      insights.push({
        id: generateId(),
        category: "conversion",
        severity,
        title: "Low starter-to-growth upgrade rate",
        description: `Only ${(upgradeRate * 100).toFixed(1)}% of Starter users upgrade to Growth+. Target is ${(THRESHOLDS.conversion.starterToGrowth.target * 100).toFixed(0)}%.`,
        metric: "starter_to_growth_rate",
        currentValue: parseFloat((upgradeRate * 100).toFixed(1)),
        targetValue: THRESHOLDS.conversion.starterToGrowth.target * 100,
        suggestedAction:
          "Improve upsell emails showing Growth-exclusive features. Add in-app upgrade prompts when Starter users hit limits. Showcase case studies.",
        estimatedImpact:
          "Each 5% improvement in upgrade rate can significantly boost ARPU",
        createdAt: now.toISOString(),
      });
    }
  }

  return insights;
}

async function analyzeRetention(): Promise<OptimizationInsight[]> {
  const supabase = await createServiceClient();
  const insights: OptimizationInsight[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  // Monthly churn
  const { count: canceledCount } = await supabase
    .from("subscriptions")
    .select("user_id", { count: "exact" })
    .eq("status", "canceled");

  const { count: activeCount } = await supabase
    .from("subscriptions")
    .select("user_id", { count: "exact" })
    .in("status", ["active", "trialing"]);

  const canceled = canceledCount || 0;
  const active = activeCount || 0;
  const totalBase = canceled + active;

  if (totalBase > 0) {
    const churnRate = canceled / totalBase;
    if (churnRate > THRESHOLDS.retention.monthlyChurn.target) {
      const severity =
        churnRate > THRESHOLDS.retention.monthlyChurn.critical
          ? "critical"
          : churnRate > THRESHOLDS.retention.monthlyChurn.high
            ? "high"
            : "medium";
      insights.push({
        id: generateId(),
        category: "retention",
        severity,
        title: "Elevated churn rate",
        description: `Monthly churn is ${(churnRate * 100).toFixed(1)}%. Target is below ${(THRESHOLDS.retention.monthlyChurn.target * 100).toFixed(0)}%.`,
        metric: "monthly_churn_rate",
        currentValue: parseFloat((churnRate * 100).toFixed(1)),
        targetValue: THRESHOLDS.retention.monthlyChurn.target * 100,
        suggestedAction:
          "Implement exit survey. Activate win-back campaign with discount. Analyze top cancellation reasons. Improve perceived service value.",
        estimatedImpact:
          "Reducing churn from 10% to 5% can double average LTV",
        createdAt: now.toISOString(),
      });
    }
  }

  // MAU: Monthly Active Users
  const { data: mauScans } = await supabase
    .from("scans")
    .select("user_id")
    .gte("created_at", thirtyDaysAgo);

  const { data: mauPlaybooks } = await supabase
    .from("playbooks")
    .select("user_id")
    .gte("created_at", thirtyDaysAgo);

  const mauSet = new Set([
    ...(mauScans || []).map((s) => s.user_id),
    ...(mauPlaybooks || []).map((p) => p.user_id),
  ]);
  const mau = mauSet.size;

  // Compare to total users for engagement ratio
  const { count: totalProfileCount } = await supabase
    .from("profiles")
    .select("id", { count: "exact" });

  const totalProfiles = totalProfileCount || 0;
  if (totalProfiles > 0) {
    const mauRatio = mau / totalProfiles;
    if (mauRatio < THRESHOLDS.retention.mauRatio.target) {
      insights.push({
        id: generateId(),
        category: "retention",
        severity:
          mauRatio < THRESHOLDS.retention.mauRatio.critical
            ? "critical"
            : mauRatio < THRESHOLDS.retention.mauRatio.low
              ? "high"
              : "medium",
        title: "Low MAU relative to total user base",
        description: `Only ${mau} of ${totalProfiles} users (${(mauRatio * 100).toFixed(1)}%) are active this month.`,
        metric: "mau_ratio",
        currentValue: parseFloat((mauRatio * 100).toFixed(1)),
        targetValue: THRESHOLDS.retention.mauRatio.target * 100,
        suggestedAction:
          "Activate mass re-engagement campaigns. Send personalized emails based on last scan area. Consider push notifications or WhatsApp outreach.",
        estimatedImpact:
          "Each 10% increase in MAU reduces churn and increases LTV",
        createdAt: now.toISOString(),
      });
    }
  }

  return insights;
}

// ─── Public API ───

export async function runOptimizationCycle(): Promise<OptimizationInsight[]> {
  console.log("[optimization] Starting optimization cycle");
  const startTime = Date.now();

  const [engagement, deliverability, conversion, retention] =
    await Promise.all([
      analyzeUserEngagement(),
      analyzeEmailDeliverability(),
      analyzeConversion(),
      analyzeRetention(),
    ]);

  const allInsights = [
    ...engagement,
    ...deliverability,
    ...conversion,
    ...retention,
  ];

  // Sort by severity
  const severityOrder: Record<InsightSeverity, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };
  allInsights.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  // Persist insights to Supabase
  if (allInsights.length > 0) {
    const supabase = await createServiceClient();
    await supabase.from("optimization_insights").insert(
      allInsights.map((insight) => ({
        insight_id: insight.id,
        category: insight.category,
        severity: insight.severity,
        title: insight.title,
        description: insight.description,
        metric: insight.metric,
        current_value: insight.currentValue,
        target_value: insight.targetValue,
        suggested_action: insight.suggestedAction,
        estimated_impact: insight.estimatedImpact,
      }))
    );
  }

  const duration = Date.now() - startTime;
  console.log(
    `[optimization] Cycle complete in ${duration}ms: ${allInsights.length} insights generated`
  );

  return allInsights;
}

export async function getActiveInsights(): Promise<OptimizationInsight[]> {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("optimization_insights")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[optimization] Error fetching insights:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.insight_id,
    category: row.category as InsightCategory,
    severity: row.severity as InsightSeverity,
    title: row.title,
    description: row.description,
    metric: row.metric,
    currentValue: row.current_value,
    targetValue: row.target_value,
    suggestedAction: row.suggested_action,
    estimatedImpact: row.estimated_impact,
    createdAt: row.created_at,
  }));
}
