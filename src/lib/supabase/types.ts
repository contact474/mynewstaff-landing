/* ─── Supabase Database Types for ScaleX SaaS ──────────────────────── */

export interface Profile {
  id: string;
  full_name: string | null;
  company_name: string | null;
  avatar_url: string | null;
  locale: "en" | "es";
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  whop_user_id: string | null;
  whop_membership_id: string | null;
  tier: "free" | "starter" | "growth" | "scale";
  status: "active" | "trialing" | "past_due" | "canceled" | "unpaid";
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface Scan {
  id: string;
  user_id: string;
  url: string;
  company_name: string | null;
  domain: string;
  overall_score: number;
  scores: Record<string, number>;
  findings: Record<string, unknown>;
  funnel: Record<string, unknown> | null;
  offer: Record<string, unknown> | null;
  positioning: Record<string, unknown> | null;
  ad_intel: Record<string, unknown> | null;
  recommendations: Record<string, unknown>[] | null;
  answers: Record<string, number> | null;
  meta: Record<string, unknown>;
  locale: "en" | "es";
  created_at: string;
}

export interface Playbook {
  id: string;
  user_id: string;
  scan_id: string | null;
  type:
    | "offer_builder"
    | "value_stack"
    | "marketing_play"
    | "funnel_blueprint"
    | "ad_copy"
    | "email_sequence"
    | "positioning_workshop";
  title: string;
  content: Record<string, unknown>;
  prompt_context: Record<string, unknown> | null;
  locale: "en" | "es";
  created_at: string;
  updated_at: string;
}

export interface ScanQuota {
  tier: string;
  limit: number;
  used: number;
  remaining: number;
  can_scan: boolean;
}
