/**
 * GoHighLevel CRM sync for MyNewStaff SaaS.
 * Creates/updates contacts and applies tags when users sign up, run scans, use tools, etc.
 *
 * Tag taxonomy for MNS SaaS:
 * Source: source_website, source_partner, source_scan, source_ai_tool
 * Tier: tier_free, tier_starter, tier_growth, tier_scale
 * Engagement: high_engagement, scan_completed, tool_used, partner_applicant
 * Lifecycle: signed_up, trial_active, paid, churned
 *
 * Custom fields: engagement_score, scans_completed, tools_used, subscription_tier, last_active
 */

import type { Profile, Subscription } from "@/lib/supabase/types";

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "";

// ─── Tag Taxonomy ───

export const GHL_TAGS = {
  // Source
  SOURCE_WEBSITE: "source_website",
  SOURCE_PARTNER: "source_partner",
  SOURCE_SCAN: "source_scan",
  SOURCE_AI_TOOL: "source_ai_tool",

  // Tier
  TIER_FREE: "tier_free",
  TIER_STARTER: "tier_starter",
  TIER_GROWTH: "tier_growth",
  TIER_SCALE: "tier_scale",

  // Engagement
  HIGH_ENGAGEMENT: "high_engagement",
  SCAN_COMPLETED: "scan_completed",
  TOOL_USED: "tool_used",
  PARTNER_APPLICANT: "partner_applicant",

  // Lifecycle
  SIGNED_UP: "signed_up",
  TRIAL_ACTIVE: "trial_active",
  PAID: "paid",
  CHURNED: "churned",
} as const;

// ─── Custom Field IDs ───
// These must be created in the GHL location first.
// Update these IDs after creating custom fields in GHL.
const CUSTOM_FIELDS: Record<string, string> = {
  engagement_score: process.env.GHL_FIELD_ENGAGEMENT_SCORE || "",
  scans_completed: process.env.GHL_FIELD_SCANS_COMPLETED || "",
  tools_used: process.env.GHL_FIELD_TOOLS_USED || "",
  subscription_tier: process.env.GHL_FIELD_SUBSCRIPTION_TIER || "",
  last_active: process.env.GHL_FIELD_LAST_ACTIVE || "",
};

// ─── Internal Helpers ───

function getHeaders() {
  return {
    Authorization: `Bearer ${GHL_API_KEY}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };
}

async function ghlFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response | null> {
  if (!GHL_API_KEY) {
    console.warn("[ghl] No GHL_API_KEY configured, skipping");
    return null;
  }

  try {
    const resp = await fetch(`${GHL_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...(options.headers as Record<string, string>),
      },
    });
    return resp;
  } catch (err) {
    console.error("[ghl] Fetch error:", err);
    return null;
  }
}

interface GHLContact {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

/**
 * Search for an existing GHL contact by email.
 */
async function searchContact(email: string): Promise<GHLContact | null> {
  const resp = await ghlFetch(
    `/contacts/search?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(email)}`
  );

  if (!resp || !resp.ok) return null;

  const data = await resp.json();
  const contacts = data.contacts || [];
  return contacts.length > 0 ? contacts[0] : null;
}

/**
 * Build GHL customFields array from key-value pairs.
 */
function buildCustomFields(
  fields: Record<string, string>
): Array<{ id: string; field_value: string }> {
  const result: Array<{ id: string; field_value: string }> = [];
  for (const [key, value] of Object.entries(fields)) {
    const fieldId = CUSTOM_FIELDS[key];
    if (fieldId) {
      result.push({ id: fieldId, field_value: value });
    }
  }
  return result;
}

/**
 * Resolve tier to GHL tag.
 */
function tierToTag(tier: string): string {
  const tierMap: Record<string, string> = {
    free: GHL_TAGS.TIER_FREE,
    starter: GHL_TAGS.TIER_STARTER,
    growth: GHL_TAGS.TIER_GROWTH,
    scale: GHL_TAGS.TIER_SCALE,
  };
  return tierMap[tier] || GHL_TAGS.TIER_FREE;
}

// ─── Public API ───

/**
 * Sync a user profile and subscription to GHL.
 * Creates contact if new, or updates tags on existing contact.
 */
export async function syncUserToGHL(
  user: Pick<Profile, "id" | "full_name" | "company_name">,
  subscription: Pick<Subscription, "tier" | "status">,
  email: string
): Promise<void> {
  if (!GHL_API_KEY) {
    console.warn("[ghl] Skipping sync — no GHL_API_KEY configured");
    return;
  }

  const firstName = user.full_name?.split(" ")[0] || "";
  const lastName =
    user.full_name?.split(" ").slice(1).join(" ") || "";

  const tags: string[] = [
    GHL_TAGS.SOURCE_WEBSITE,
    GHL_TAGS.SIGNED_UP,
    tierToTag(subscription.tier),
  ];

  if (
    subscription.status === "active" &&
    subscription.tier !== "free"
  ) {
    tags.push(GHL_TAGS.PAID);
  }

  if (subscription.status === "trialing") {
    tags.push(GHL_TAGS.TRIAL_ACTIVE);
  }

  if (subscription.status === "canceled") {
    tags.push(GHL_TAGS.CHURNED);
  }

  const customFields: Record<string, string> = {
    subscription_tier: subscription.tier,
    last_active: new Date().toISOString(),
  };

  try {
    const existing = await searchContact(email);

    if (existing?.id) {
      // Add tags to existing contact
      await ghlFetch(`/contacts/${existing.id}/tags`, {
        method: "POST",
        body: JSON.stringify({ tags }),
      });

      // Update custom fields
      const fields = buildCustomFields(customFields);
      if (fields.length > 0) {
        await ghlFetch(`/contacts/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify({ customFields: fields }),
        });
      }

      console.log(
        `[ghl] Updated contact ${existing.id} with tags [${tags.join(", ")}]`
      );
    } else {
      // Create new contact
      const payload: Record<string, unknown> = {
        locationId: GHL_LOCATION_ID,
        firstName,
        email,
        tags,
        source: "MyNewStaff SaaS Platform",
        companyName: user.company_name || undefined,
      };

      if (lastName) payload.lastName = lastName;

      const fields = buildCustomFields(customFields);
      if (fields.length > 0) payload.customFields = fields;

      const createResp = await ghlFetch("/contacts/", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (createResp?.ok) {
        const result = await createResp.json();
        console.log(
          `[ghl] Created contact ${result.contact?.id} for ${email}`
        );
      } else {
        console.error(
          "[ghl] Failed to create contact:",
          await createResp?.text()
        );
      }
    }
  } catch (err) {
    console.error("[ghl] Sync error:", err);
  }
}

/**
 * Update GHL contact engagement based on platform events.
 * Adds event-specific tags and updates custom fields.
 */
export async function updateGHLEngagement(
  email: string,
  event: string,
  metadata?: Record<string, string>
): Promise<void> {
  if (!GHL_API_KEY) {
    console.warn("[ghl] Skipping engagement update — no GHL_API_KEY");
    return;
  }

  try {
    const contact = await searchContact(email);
    if (!contact?.id) {
      console.warn(
        `[ghl] Contact not found for ${email}, skipping engagement update`
      );
      return;
    }

    // Map events to tags
    const eventTags: Record<string, string[]> = {
      scan_completed: [GHL_TAGS.SCAN_COMPLETED],
      tool_used: [GHL_TAGS.TOOL_USED, GHL_TAGS.SOURCE_AI_TOOL],
      partner_applied: [GHL_TAGS.PARTNER_APPLICANT, GHL_TAGS.SOURCE_PARTNER],
      subscription_upgraded: [GHL_TAGS.PAID],
      subscription_canceled: [GHL_TAGS.CHURNED],
      high_engagement: [GHL_TAGS.HIGH_ENGAGEMENT],
    };

    const tags = eventTags[event] || [];
    if (tags.length > 0) {
      await ghlFetch(`/contacts/${contact.id}/tags`, {
        method: "POST",
        body: JSON.stringify({ tags }),
      });
    }

    // Update custom fields if metadata provided
    if (metadata && Object.keys(metadata).length > 0) {
      const fields = buildCustomFields(metadata);
      if (fields.length > 0) {
        await ghlFetch(`/contacts/${contact.id}`, {
          method: "PUT",
          body: JSON.stringify({ customFields: fields }),
        });
      }
    }

    console.log(
      `[ghl] Updated engagement for ${email}: event=${event}, tags=[${tags.join(", ")}]`
    );
  } catch (err) {
    console.error("[ghl] Engagement update error:", err);
  }
}

/**
 * Fire-and-forget GHL sync (non-blocking).
 */
export function fireGHLSync(
  user: Pick<Profile, "id" | "full_name" | "company_name">,
  subscription: Pick<Subscription, "tier" | "status">,
  email: string
) {
  syncUserToGHL(user, subscription, email).catch((err) =>
    console.error("[ghl] Fire-and-forget sync error:", err)
  );
}

/**
 * Fire-and-forget GHL engagement update (non-blocking).
 */
export function fireGHLEngagement(
  email: string,
  event: string,
  metadata?: Record<string, string>
) {
  updateGHLEngagement(email, event, metadata).catch((err) =>
    console.error("[ghl] Fire-and-forget engagement error:", err)
  );
}
