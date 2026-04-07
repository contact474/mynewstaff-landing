import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Whop from "@whop/sdk";

function getWhop() {
  return new Whop({ apiKey: process.env.WHOP_API_KEY! });
}

// GET handler for direct link checkout (used by Deep Dive tripwire)
export async function GET(request: NextRequest) {
  try {
    const planId = request.nextUrl.searchParams.get("plan");
    const redirect = request.nextUrl.searchParams.get("redirect") || "/app/dashboard?upgraded=true";

    if (!planId) {
      return NextResponse.redirect(new URL("/scalex/pricing", request.url));
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const checkout = await getWhop().checkoutConfigurations.create({
      plan_id: planId,
      metadata: {
        supabase_user_id: user?.id || "anonymous",
        email: user?.email || "",
        billing: "one-time",
      },
      redirect_url: `${request.nextUrl.origin}${redirect}`,
    });

    return NextResponse.redirect(checkout.purchase_url);
  } catch (err) {
    console.error("Whop GET checkout error:", err);
    return NextResponse.redirect(new URL("/scalex/pricing?error=checkout", request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId, billing } = await request.json();

    if (!planId) {
      return NextResponse.json({ error: "Plan ID required" }, { status: 400 });
    }

    // Create Whop checkout session
    const checkout = await getWhop().checkoutConfigurations.create({
      plan_id: planId,
      metadata: {
        supabase_user_id: user.id,
        email: user.email || "",
        billing: billing || "monthly",
      },
      redirect_url: `${request.nextUrl.origin}/app/dashboard?upgraded=true`,
    });

    return NextResponse.json({ url: checkout.purchase_url });
  } catch (err) {
    console.error("Whop checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
