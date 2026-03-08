/**
 * Optimization API routes for MyNewStaff SaaS.
 *
 * GET  /api/optimization — Get current active insights
 * POST /api/optimization — Trigger optimization cycle (admin/cron only)
 *
 * Protected by CRON_SECRET for cron access or Supabase auth for admin access.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  runOptimizationCycle,
  getActiveInsights,
} from "@/lib/optimization/insights";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function isAuthorized(request: NextRequest): Promise<boolean> {
  // Check cron secret (for automated triggers)
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret && secret === process.env.CRON_SECRET) {
    return true;
  }

  // Check Supabase auth (for admin UI)
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) return true;
  } catch {
    // Auth check failed, not authorized
  }

  return false;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const insights = await getActiveInsights();

    return NextResponse.json({
      insights,
      count: insights.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[api/optimization] GET error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch insights",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const startTime = Date.now();
    const insights = await runOptimizationCycle();
    const duration = Date.now() - startTime;

    // Summarize by category
    const byCategoryCounts: Record<string, number> = {};
    const bySeverityCounts: Record<string, number> = {};
    for (const insight of insights) {
      byCategoryCounts[insight.category] =
        (byCategoryCounts[insight.category] || 0) + 1;
      bySeverityCounts[insight.severity] =
        (bySeverityCounts[insight.severity] || 0) + 1;
    }

    return NextResponse.json({
      insights,
      summary: {
        total: insights.length,
        byCategory: byCategoryCounts,
        bySeverity: bySeverityCounts,
      },
      durationMs: duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[api/optimization] POST error:", error);
    return NextResponse.json(
      {
        error: "Optimization cycle failed",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
