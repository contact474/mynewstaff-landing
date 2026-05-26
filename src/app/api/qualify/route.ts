import { NextResponse } from "next/server";

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_KEY = "pit-3dc6c0c1-28d9-4d3b-aeaf-21b3b29a2be3";
const LOCATION_ID = "qZs6GgZjmIC39OaF3Sfw";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      business_type,
      monthly_revenue,
      biggest_bottleneck,
      investment_budget,
      decision_timeline,
      commitment_level,
    } = body;

    const [firstName, ...rest] = (name || "").split(" ");
    const lastName = rest.join(" ");

    const contactData: Record<string, unknown> = {
      locationId: LOCATION_ID,
      firstName,
      lastName,
      email,
      phone,
      source: "Claude Code Mastermind Qualifier",
      tags: ["mastermind-qualified"],
      customFields: [
        { id: "xxHDi8LLnSlzmdi63bCQ", value: business_type },
        { id: "3Qpr63hPF4NaRb4atv7s", value: monthly_revenue },
        { id: "FaajU437nVUlmvakxtfv", value: biggest_bottleneck },
        { id: "PjQMSGaz6NJ6qvo7QmGU", value: investment_budget },
        { id: "rDEGAqg32WWPlN6ZzDvW", value: decision_timeline },
        { id: "uBLyMUaR0W64iXIPNa67", value: commitment_level },
      ],
    };

    const res = await fetch(`${GHL_API}/contacts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_KEY}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify(contactData),
    });

    const data = await res.json();
    return NextResponse.json({ ok: true, contactId: data?.contact?.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
