import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const COLD_CALLER_URL = "https://cold-caller.mynewstaff.ai";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: config } = await supabase
    .from("brooke_configs")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!config?.onboarding_complete) {
    return NextResponse.json({ error: "Complete onboarding first" }, { status: 400 });
  }

  const body = await req.json();
  const { leads, campaign_name } = body;

  if (!leads?.length) {
    return NextResponse.json({ error: "No leads provided" }, { status: 400 });
  }

  if (leads.length > 500) {
    return NextResponse.json({ error: "Maximum 500 leads per campaign" }, { status: 400 });
  }

  const minutesRemaining = config.minutes_limit - config.minutes_used;
  if (minutesRemaining <= 0) {
    return NextResponse.json({ error: "No minutes remaining. Upgrade your plan." }, { status: 402 });
  }

  const formattedLeads = leads.map((lead: { phone: string; name?: string; company?: string }, i: number) => ({
    id: `${user.id}_${Date.now()}_${i}`,
    phone: lead.phone,
    name: lead.name || "",
    company: lead.company || "",
  }));

  const clientConfig = {
    agent_name: "Brooke",
    company_name: config.business_name,
    service_description: config.offer_description,
    booking_outcome: config.booking_link
      ? `booking a call at ${config.booking_link}`
      : "scheduling a follow-up call",
    tenant_id: user.id,
  };

  const { data: campaign, error: campError } = await supabase
    .from("brooke_campaigns")
    .insert({
      user_id: user.id,
      config_id: config.id,
      name: campaign_name || `Campaign ${new Date().toLocaleDateString()}`,
      status: "active",
      leads_count: formattedLeads.length,
    })
    .select()
    .single();

  if (campError) {
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }

  try {
    const res = await fetch(`${COLD_CALLER_URL}/api/v1/campaigns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: campaign.name,
        leads: formattedLeads,
        client_config: clientConfig,
        priority: "normal",
      }),
    });

    const result = await res.json();

    notifyTelegram(config, formattedLeads.length, campaign.name).catch(() => {});

    return NextResponse.json({
      campaign_id: campaign.id,
      enqueued: result.enqueued || formattedLeads.length,
      skipped: result.skipped || 0,
    });
  } catch {
    await supabase
      .from("brooke_campaigns")
      .update({ status: "pending" })
      .eq("id", campaign.id);

    return NextResponse.json(
      { error: "Failed to connect to calling service. Try again." },
      { status: 502 }
    );
  }
}

async function notifyTelegram(config: Record<string, unknown>, leadsCount: number, campaignName: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `\u{1F4DE} New Brooke campaign launched!\n\nBusiness: ${config.business_name}\nCampaign: ${campaignName}\nLeads: ${leadsCount}\nTime: ${new Date().toISOString()}`,
    }),
  });
}
