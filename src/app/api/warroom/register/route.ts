import { NextResponse } from "next/server";

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_KEY = process.env.GHL_API_KEY || "";
const LOCATION_ID = process.env.GHL_LOCATION_ID || "";

const VALID_CHALLENGES = [
  "Lead Generation",
  "Content Creation",
  "Sales & Closing",
  "All of the Above",
];

export async function POST(req: Request) {
  try {
    if (!GHL_KEY || !LOCATION_ID) {
      console.error("Missing GHL_API_KEY or GHL_LOCATION_ID env vars");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, phone, challenge } = body;

    // ─── Validation + Sanitization ────────────────────────────
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const cleanName = name.trim().slice(0, 200);
    const cleanEmail = email.trim().toLowerCase().slice(0, 320);
    const cleanPhone = phone?.trim().slice(0, 30) || undefined;
    const cleanChallenge = VALID_CHALLENGES.includes(challenge)
      ? challenge
      : undefined;

    // ─── GHL Contact Creation ─────────────────────────────────
    const [firstName, ...rest] = cleanName.split(" ");
    const lastName = rest.join(" ");

    const contactData: Record<string, unknown> = {
      locationId: LOCATION_ID,
      firstName,
      lastName,
      email: cleanEmail,
      phone: cleanPhone,
      source: "AI War Room Registration",
      tags: ["warroom-registered"],
      customFields: cleanChallenge
        ? [{ id: "FaajU437nVUlmvakxtfv", value: cleanChallenge }]
        : [],
    };

    const ghlRes = await fetch(`${GHL_API}/contacts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_KEY}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify(contactData),
    });

    const ghlData = await ghlRes.json();

    if (!ghlRes.ok) {
      console.error("GHL contact creation failed:", ghlRes.status, ghlData);
      return NextResponse.json(
        { error: "Registration failed. Please try again." },
        { status: 502 }
      );
    }

    // Webhook (best-effort with logging)
    const ghlWebhook = process.env.GHL_WARROOM_WEBHOOK;
    if (ghlWebhook) {
      fetch(ghlWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || "",
          challenge: cleanChallenge || "",
          source: "warroom-landing",
          registeredAt: new Date().toISOString(),
        }),
      }).catch((err) => {
        console.error("GHL webhook failed:", err.message);
      });
    }

    return NextResponse.json({
      ok: true,
      contactId: ghlData?.contact?.id,
      message: "You're registered! Check your email for the link.",
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("War Room registration error:", msg);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
