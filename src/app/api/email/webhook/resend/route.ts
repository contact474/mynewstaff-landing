/**
 * Resend webhook handler for bounce/complaint management.
 *
 * POST /api/email/webhook/resend
 *
 * Events handled:
 * - email.sent — log delivery
 * - email.delivered — confirm delivery
 * - email.opened — update engagement score
 * - email.clicked — update engagement score, track CTA clicks
 * - email.bounced — pause all sequences for user
 * - email.complained — unsubscribe user, cancel all sequences
 *
 * Verify Svix signature (Resend uses Svix for webhooks).
 */

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createHmac } from "crypto";

export const dynamic = "force-dynamic";

// ─── Svix Signature Verification ───

function verifySvixSignature(
  body: string,
  headers: {
    svixId: string | null;
    svixTimestamp: string | null;
    svixSignature: string | null;
  }
): boolean {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn(
      "[resend-webhook] No RESEND_WEBHOOK_SECRET configured, skipping verification"
    );
    return true; // Allow in dev without secret
  }

  const { svixId, svixTimestamp, svixSignature } = headers;
  if (!svixId || !svixTimestamp || !svixSignature) {
    return false;
  }

  // Check timestamp is not too old (5 minutes tolerance)
  const timestampNum = parseInt(svixTimestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestampNum) > 300) {
    console.warn("[resend-webhook] Timestamp too old");
    return false;
  }

  // Svix signature format: "whsec_<base64secret>"
  const secret = webhookSecret.startsWith("whsec_")
    ? webhookSecret.slice(6)
    : webhookSecret;

  const secretBytes = Buffer.from(secret, "base64");
  const signedContent = `${svixId}.${svixTimestamp}.${body}`;
  const expectedSignature = createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  // Svix sends multiple signatures separated by spaces, each prefixed with "v1,"
  const signatures = svixSignature.split(" ");
  for (const sig of signatures) {
    const sigValue = sig.startsWith("v1,") ? sig.slice(3) : sig;
    if (sigValue === expectedSignature) return true;
  }

  return false;
}

// ─── Event Types ───

interface ResendWebhookPayload {
  type: string;
  created_at: string;
  data: {
    email_id?: string;
    from?: string;
    to?: string[];
    subject?: string;
    created_at?: string;
    click?: {
      ipAddress?: string;
      link?: string;
      timestamp?: string;
      userAgent?: string;
    };
    bounce?: {
      message?: string;
      type?: string;
    };
    complaint?: {
      complaintType?: string;
    };
  };
}

// ─── Event Handlers ───

async function handleEmailSent(data: ResendWebhookPayload["data"]) {
  console.log(
    `[resend-webhook] Email sent: ${data.email_id} to ${data.to?.join(", ")}`
  );
}

async function handleEmailDelivered(data: ResendWebhookPayload["data"]) {
  console.log(
    `[resend-webhook] Email delivered: ${data.email_id} to ${data.to?.join(", ")}`
  );

  if (!data.to?.[0]) return;

  const supabase = await createServiceClient();
  await supabase.from("email_events").insert({
    email_address: data.to[0],
    event_type: "delivered",
    email_id: data.email_id,
    subject: data.subject,
  });
}

async function handleEmailOpened(data: ResendWebhookPayload["data"]) {
  console.log(
    `[resend-webhook] Email opened: ${data.email_id} by ${data.to?.join(", ")}`
  );

  if (!data.to?.[0]) return;

  const supabase = await createServiceClient();
  const email = data.to[0];

  // Record event
  await supabase.from("email_events").insert({
    email_address: email,
    event_type: "opened",
    email_id: data.email_id,
    subject: data.subject,
  });

  // Update engagement score in email_sequences for this user
  const { data: authUsers } = await supabase.auth.admin.listUsers();
  const user = authUsers?.users?.find((u) => u.email === email);
  if (user) {
    // Boost engagement: opening emails is a positive signal
    const { data: sequences } = await supabase
      .from("email_sequences")
      .select("id, engagement_score")
      .eq("user_id", user.id)
      .eq("status", "active");

    if (sequences) {
      for (const seq of sequences) {
        await supabase
          .from("email_sequences")
          .update({
            engagement_score: Math.min(
              100,
              (seq.engagement_score || 0) + 5
            ),
          })
          .eq("id", seq.id);
      }
    }
  }
}

async function handleEmailClicked(data: ResendWebhookPayload["data"]) {
  console.log(
    `[resend-webhook] Email clicked: ${data.email_id} by ${data.to?.join(", ")} link=${data.click?.link}`
  );

  if (!data.to?.[0]) return;

  const supabase = await createServiceClient();
  const email = data.to[0];

  // Record click event with link data
  await supabase.from("email_events").insert({
    email_address: email,
    event_type: "clicked",
    email_id: data.email_id,
    subject: data.subject,
    metadata: {
      link: data.click?.link,
      userAgent: data.click?.userAgent,
    },
  });

  // Clicks are a strong engagement signal
  const { data: authUsers } = await supabase.auth.admin.listUsers();
  const user = authUsers?.users?.find((u) => u.email === email);
  if (user) {
    const { data: sequences } = await supabase
      .from("email_sequences")
      .select("id, engagement_score")
      .eq("user_id", user.id)
      .eq("status", "active");

    if (sequences) {
      for (const seq of sequences) {
        await supabase
          .from("email_sequences")
          .update({
            engagement_score: Math.min(
              100,
              (seq.engagement_score || 0) + 10
            ),
          })
          .eq("id", seq.id);
      }
    }
  }
}

async function handleEmailBounced(data: ResendWebhookPayload["data"]) {
  console.error(
    `[resend-webhook] Email bounced: ${data.email_id} to ${data.to?.join(", ")} type=${data.bounce?.type} message=${data.bounce?.message}`
  );

  if (!data.to?.[0]) return;

  const supabase = await createServiceClient();
  const email = data.to[0];

  // Record bounce event
  await supabase.from("email_events").insert({
    email_address: email,
    event_type: "bounced",
    email_id: data.email_id,
    subject: data.subject,
    metadata: {
      bounceType: data.bounce?.type,
      bounceMessage: data.bounce?.message,
    },
  });

  // Pause all active sequences for this user
  const { data: authUsers } = await supabase.auth.admin.listUsers();
  const user = authUsers?.users?.find((u) => u.email === email);
  if (user) {
    await supabase
      .from("email_sequences")
      .update({
        status: "paused",
        pause_reason: "email_bounced",
      })
      .eq("user_id", user.id)
      .eq("status", "active");

    console.log(
      `[resend-webhook] Paused all sequences for bounced user ${user.id}`
    );
  }
}

async function handleEmailComplained(data: ResendWebhookPayload["data"]) {
  console.error(
    `[resend-webhook] Email complaint: ${data.email_id} from ${data.to?.join(", ")} type=${data.complaint?.complaintType}`
  );

  if (!data.to?.[0]) return;

  const supabase = await createServiceClient();
  const email = data.to[0];

  // Record complaint event
  await supabase.from("email_events").insert({
    email_address: email,
    event_type: "complained",
    email_id: data.email_id,
    subject: data.subject,
    metadata: {
      complaintType: data.complaint?.complaintType,
    },
  });

  // Cancel ALL sequences (not just pause)
  const { data: authUsers } = await supabase.auth.admin.listUsers();
  const user = authUsers?.users?.find((u) => u.email === email);
  if (user) {
    await supabase
      .from("email_sequences")
      .update({
        status: "cancelled",
        pause_reason: "spam_complaint",
      })
      .eq("user_id", user.id)
      .in("status", ["active", "paused"]);

    console.log(
      `[resend-webhook] Cancelled all sequences for spam-complaining user ${user.id}`
    );
  }
}

// ─── Route Handler ───

export async function POST(request: NextRequest) {
  const body = await request.text();

  // Verify Svix signature
  const isValid = verifySvixSignature(body, {
    svixId: request.headers.get("svix-id"),
    svixTimestamp: request.headers.get("svix-timestamp"),
    svixSignature: request.headers.get("svix-signature"),
  });

  if (!isValid) {
    console.error("[resend-webhook] Invalid Svix signature");
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  let payload: ResendWebhookPayload;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const eventType = payload.type;
  console.log(`[resend-webhook] Event: ${eventType}`);

  switch (eventType) {
    case "email.sent":
      await handleEmailSent(payload.data);
      break;
    case "email.delivered":
      await handleEmailDelivered(payload.data);
      break;
    case "email.opened":
      await handleEmailOpened(payload.data);
      break;
    case "email.clicked":
      await handleEmailClicked(payload.data);
      break;
    case "email.bounced":
      await handleEmailBounced(payload.data);
      break;
    case "email.complained":
      await handleEmailComplained(payload.data);
      break;
    default:
      console.log(`[resend-webhook] Unhandled event type: ${eventType}`);
  }

  return NextResponse.json({ received: true });
}
