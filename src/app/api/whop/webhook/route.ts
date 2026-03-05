import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import type { Tier } from "@/lib/tiers";

// Map Whop product/plan IDs to our tiers
const PLAN_TO_TIER: Record<string, Tier> = {
  [process.env.WHOP_PLAN_STARTER_MONTHLY || ""]: "starter",
  [process.env.WHOP_PLAN_STARTER_ANNUAL || ""]: "starter",
  [process.env.WHOP_PLAN_GROWTH_MONTHLY || ""]: "growth",
  [process.env.WHOP_PLAN_GROWTH_ANNUAL || ""]: "growth",
  [process.env.WHOP_PLAN_SCALE_MONTHLY || ""]: "scale",
  [process.env.WHOP_PLAN_SCALE_ANNUAL || ""]: "scale",
};

function resolveTier(planId: string): Tier {
  return PLAN_TO_TIER[planId] || "free";
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;
    const signature = request.headers.get("x-whop-signature");

    if (webhookSecret && !signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const body = await request.json();
    const { action, data } = body;

    const supabase = await createServiceClient();

    switch (action) {
      case "membership.went_valid": {
        // User purchased or renewed
        const userId = data.metadata?.supabase_user_id;
        const planId = data.plan_id || data.plan?.id || "";
        const tier = resolveTier(planId);

        if (userId) {
          await supabase.from("subscriptions").upsert(
            {
              user_id: userId,
              whop_user_id: data.user_id || data.user?.id,
              whop_membership_id: data.id,
              tier,
              status: "active",
              current_period_start: data.current_period_start || new Date().toISOString(),
              current_period_end: data.current_period_end || null,
              cancel_at_period_end: false,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
        }
        break;
      }

      case "membership.went_invalid": {
        // Subscription canceled/expired
        const userId = data.metadata?.supabase_user_id;
        if (userId) {
          await supabase
            .from("subscriptions")
            .update({
              tier: "free",
              status: "canceled",
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);
        }
        break;
      }

      case "payment.succeeded": {
        // Successful payment — update period
        const membershipId = data.membership_id;
        if (membershipId) {
          await supabase
            .from("subscriptions")
            .update({
              status: "active",
              updated_at: new Date().toISOString(),
            })
            .eq("whop_membership_id", membershipId);
        }
        break;
      }

      case "payment.failed": {
        // Failed payment
        const membershipId = data.membership_id;
        if (membershipId) {
          await supabase
            .from("subscriptions")
            .update({
              status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("whop_membership_id", membershipId);
        }
        break;
      }

      default:
        console.log(`Unhandled Whop webhook: ${action}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Whop webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
