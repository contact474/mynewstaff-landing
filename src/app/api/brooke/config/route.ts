import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
    return NextResponse.json({ error: error.message }, { status: 500 });
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

  const config = {
    user_id: user.id,
    business_name: body.business_name,
    offer_description: body.offer_description,
    booking_link: body.booking_link || null,
    industry: body.industry || null,
    job_titles: body.job_titles || null,
    location: body.location || null,
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
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    "\u{1F680} New Brooke SaaS signup!",
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
