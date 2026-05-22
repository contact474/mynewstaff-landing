import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function sanitize(val: unknown, maxLen: number): string | null {
  if (typeof val !== "string") return null;
  return val.replace(/<[^>]*>/g, "").slice(0, maxLen) || null;
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("brooke_configs")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: "Failed to load config" }, { status: 500 });
  }

  return NextResponse.json({ config: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const businessName = sanitize(body.business_name, 200);
  const offerDescription = sanitize(body.offer_description, 2000);
  if (!businessName || !offerDescription) {
    return NextResponse.json({ error: "Business name and offer description are required" }, { status: 400 });
  }

  const bookingLink = sanitize(body.booking_link, 500);
  if (bookingLink && !/^https?:\/\//.test(bookingLink)) {
    return NextResponse.json({ error: "Booking link must be a valid URL" }, { status: 400 });
  }

  const config = {
    user_id: user.id,
    business_name: businessName,
    offer_description: offerDescription,
    booking_link: bookingLink,
    industry: sanitize(body.industry, 100),
    job_titles: sanitize(body.job_titles, 200),
    location: sanitize(body.location, 200),
    provider: body.provider || null,
    provider_config: body.provider_config || {},
    generated_script: body.generated_script || {},
    onboarding_complete: body.onboarding_complete || false,
  };

  const { data, error } = await supabase
    .from("brooke_configs")
    .upsert(config, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 });
  }

  if (body.onboarding_complete) {
    notifyTelegram(config).catch(() => {});
  }

  return NextResponse.json({ config: data });
}

async function notifyTelegram(config: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "New Brooke SaaS signup!",
    "",
    `Business: ${config.business_name}`,
    `Offer: ${String(config.offer_description).slice(0, 100)}`,
    `Industry: ${config.industry || "N/A"}`,
    `Provider: ${config.provider || "Not connected"}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
