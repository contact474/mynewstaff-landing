/**
 * Cron endpoint to process the behavioral email sequence queue.
 *
 * GET /api/email/sequences/process?secret=xxx
 *
 * Called by cron (Vercel cron or external) every 30 minutes.
 * Protected by CRON_SECRET env var.
 *
 * Steps:
 * 1. Process pending sequence queue (onboarding, scan_followup, etc.)
 * 2. Detect and enroll users into re-engagement sequences (7+ days inactive)
 * 3. Detect and enroll users into upsell sequences (high engagement free users)
 * 4. Return summary of actions taken
 */

import { NextRequest, NextResponse } from "next/server";
import {
  processSequenceQueue,
  detectAndEnrollReengagement,
  detectAndEnrollUpsell,
} from "@/lib/email/behavioral-sequences";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds max for Vercel

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || secret !== cronSecret) {
    console.warn("[cron/sequences] Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("[cron/sequences] Starting sequence processing cycle");
  const startTime = Date.now();

  try {
    // Step 1: Process pending sequence queue
    const queueResult = await processSequenceQueue();

    // Step 2: Detect and enroll re-engagement-eligible users
    const reengagementEnrolled = await detectAndEnrollReengagement();

    // Step 3: Detect and enroll upsell-eligible users
    const upsellEnrolled = await detectAndEnrollUpsell();

    const duration = Date.now() - startTime;

    const summary = {
      processed: {
        sent: queueResult.sent,
        skipped: queueResult.skipped,
        errors: queueResult.errors,
      },
      enrolled: {
        reengagement: reengagementEnrolled,
        upsell: upsellEnrolled,
      },
      durationMs: duration,
      timestamp: new Date().toISOString(),
    };

    console.log("[cron/sequences] Cycle complete:", JSON.stringify(summary));

    return NextResponse.json(summary);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[cron/sequences] Error during processing:", error);

    return NextResponse.json(
      {
        error: "Processing failed",
        message: error instanceof Error ? error.message : String(error),
        durationMs: duration,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
