import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = ["exit-intent-try", "ugc-landing", "footer", "qa-stress-test"];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const source = ALLOWED_SOURCES.includes(body.source) ? body.source : "unknown";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

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
            text: `New Brooke lead captured!\n\nEmail: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`,
          }),
        }
      );
    }
  } catch {}

  return NextResponse.json({ ok: true });
}
