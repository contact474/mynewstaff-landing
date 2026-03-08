-- ═══════════════════════════════════════════════════════════════════════
-- MNS SaaS — Email Engine & Optimization Schema
-- Run this in the Supabase SQL Editor after the main schema
-- ═══════════════════════════════════════════════════════════════════════

-- ── EMAIL SEQUENCES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  sequence_type TEXT NOT NULL CHECK (sequence_type IN (
    'onboarding', 'scan_followup', 'reengagement', 'upsell', 'partner_nurture'
  )),
  current_email_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  temperature TEXT CHECK (temperature IN ('hot', 'warm', 'cool', 'cold')),
  last_email_sent_at TIMESTAMPTZ,
  next_email_at TIMESTAMPTZ,
  engagement_score INTEGER DEFAULT 0,
  pause_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_email_sequences_user ON email_sequences(user_id);
CREATE INDEX IF NOT EXISTS idx_email_sequences_status ON email_sequences(status);
CREATE INDEX IF NOT EXISTS idx_email_sequences_next ON email_sequences(next_email_at);
CREATE INDEX IF NOT EXISTS idx_email_sequences_type ON email_sequences(sequence_type);

-- ── EMAIL EVENTS (webhook tracking) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_address TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained'
  )),
  email_id TEXT,
  subject TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_email_events_address ON email_events(email_address);
CREATE INDEX IF NOT EXISTS idx_email_events_type ON email_events(event_type);
CREATE INDEX IF NOT EXISTS idx_email_events_created ON email_events(created_at DESC);

-- ── EMAIL WARMUP ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_warmup (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL UNIQUE,
  start_date TIMESTAMPTZ NOT NULL,
  emails_sent_today INTEGER DEFAULT 0,
  last_send_date TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_email_warmup_domain ON email_warmup(domain);

-- ── OPTIMIZATION INSIGHTS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS optimization_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'user_engagement', 'email_deliverability', 'conversion', 'retention'
  )),
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metric TEXT NOT NULL,
  current_value NUMERIC NOT NULL,
  target_value NUMERIC NOT NULL,
  suggested_action TEXT NOT NULL,
  estimated_impact TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_optimization_category ON optimization_insights(category);
CREATE INDEX IF NOT EXISTS idx_optimization_severity ON optimization_insights(severity);
CREATE INDEX IF NOT EXISTS idx_optimization_created ON optimization_insights(created_at DESC);

-- ── RLS POLICIES ────────────────────────────────────────────────────
-- email_sequences: service role only (managed by backend)
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;
-- email_events: service role only
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
-- email_warmup: service role only
ALTER TABLE email_warmup ENABLE ROW LEVEL SECURITY;
-- optimization_insights: service role only
ALTER TABLE optimization_insights ENABLE ROW LEVEL SECURITY;
