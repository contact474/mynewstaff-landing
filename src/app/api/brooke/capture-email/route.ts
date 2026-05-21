import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, source } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Send to MNS Command for nurture enrollment
  try {
    await fetch(
      "https://cold-caller.mynewstaff.ai/api/v1/nurture/send-materials",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: email.split("@")[0],
          source,
          campaign: "brooke-ugc-nurture",
        }),
      }
    );
  } catch {}

  // Also notify Luka via Telegram
  try {
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChat = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChat) {
      await fetch(
        `https://api.telegram.org/bot${tgToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChat,
            text: `📧 New Brooke lead captured!\n\nEmail: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`,
            parse_mode: "HTML",
          }),
        }
      );
    }
  } catch {}

  return NextResponse.json({ ok: true });
}
