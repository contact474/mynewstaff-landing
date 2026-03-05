-- ═══════════════════════════════════════════════════════════════════════
-- ScaleX SaaS — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════

-- ── PROFILES ──────────────────────────────────────────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  avatar_url TEXT,
  locale TEXT DEFAULT 'en' CHECK (locale IN ('en', 'es')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, company_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── SUBSCRIPTIONS ─────────────────────────────────────────────────────
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  whop_user_id TEXT,
  whop_membership_id TEXT,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'starter', 'growth', 'scale')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX idx_subscriptions_user ON subscriptions(user_id);

-- Auto-create free subscription on profile creation
CREATE OR REPLACE FUNCTION handle_new_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO subscriptions (user_id, tier, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_new_profile();

-- ── SCANS ─────────────────────────────────────────────────────────────
CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  company_name TEXT,
  domain TEXT NOT NULL,
  overall_score INTEGER NOT NULL,
  scores JSONB NOT NULL,
  findings JSONB NOT NULL,
  funnel JSONB,
  offer JSONB,
  positioning JSONB,
  ad_intel JSONB,
  recommendations JSONB,
  answers JSONB,
  meta JSONB NOT NULL,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_scans_user ON scans(user_id);
CREATE INDEX idx_scans_domain ON scans(domain);
CREATE INDEX idx_scans_created ON scans(created_at DESC);

-- ── PLAYBOOKS ─────────────────────────────────────────────────────────
CREATE TABLE playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scan_id UUID REFERENCES scans(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN (
    'offer_builder', 'value_stack', 'marketing_play',
    'funnel_blueprint', 'ad_copy', 'email_sequence',
    'positioning_workshop'
  )),
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  prompt_context JSONB,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_playbooks_user ON playbooks(user_id);
CREATE INDEX idx_playbooks_type ON playbooks(type);
CREATE INDEX idx_playbooks_scan ON playbooks(scan_id);

-- ── SCAN QUOTA CHECK ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION check_scan_quota(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_tier TEXT;
  v_limit INTEGER;
  v_used INTEGER;
  v_period_start TIMESTAMPTZ;
BEGIN
  SELECT tier, current_period_start
  INTO v_tier, v_period_start
  FROM subscriptions WHERE user_id = p_user_id;

  v_limit := CASE v_tier
    WHEN 'free' THEN 1
    WHEN 'starter' THEN 10
    WHEN 'growth' THEN 50
    WHEN 'scale' THEN -1
    ELSE 1
  END;

  SELECT COUNT(*) INTO v_used
  FROM scans
  WHERE user_id = p_user_id
    AND created_at >= COALESCE(v_period_start, date_trunc('month', now()));

  RETURN json_build_object(
    'tier', v_tier,
    'limit', v_limit,
    'used', v_used,
    'remaining', CASE WHEN v_limit = -1 THEN 999 ELSE GREATEST(0, v_limit - v_used) END,
    'can_scan', (v_limit = -1 OR v_used < v_limit)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own sub" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own scans" ON scans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own scans" ON scans FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE playbooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own playbooks" ON playbooks FOR ALL USING (auth.uid() = user_id);
