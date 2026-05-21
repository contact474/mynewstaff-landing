-- Brooke SaaS Configs — stores per-user cold caller configuration
-- Run this in Supabase SQL Editor

create table if not exists brooke_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  business_name text not null,
  offer_description text not null,
  booking_link text,
  industry text,
  job_titles text,
  location text,
  provider text check (provider in ('twilio', 'signalwire', 'setup_requested', null)),
  provider_config jsonb default '{}'::jsonb,
  generated_script jsonb default '{}'::jsonb,
  onboarding_complete boolean default false,
  plan text default 'starter' check (plan in ('starter', 'growth', 'scale')),
  minutes_used integer default 0,
  minutes_limit integer default 500,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id)
);

-- RLS policies
alter table brooke_configs enable row level security;

create policy "Users can read own config"
  on brooke_configs for select
  using (auth.uid() = user_id);

create policy "Users can insert own config"
  on brooke_configs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own config"
  on brooke_configs for update
  using (auth.uid() = user_id);

-- Brooke campaigns — tracks campaigns launched by users
create table if not exists brooke_campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  config_id uuid references brooke_configs(id) on delete cascade not null,
  name text not null,
  status text default 'pending' check (status in ('pending', 'active', 'paused', 'completed')),
  leads_count integer default 0,
  calls_made integer default 0,
  meetings_booked integer default 0,
  created_at timestamptz default now()
);

alter table brooke_campaigns enable row level security;

create policy "Users can read own campaigns"
  on brooke_campaigns for select
  using (auth.uid() = user_id);

create policy "Users can insert own campaigns"
  on brooke_campaigns for insert
  with check (auth.uid() = user_id);

create policy "Users can update own campaigns"
  on brooke_campaigns for update
  using (auth.uid() = user_id);

-- Brooke call logs — individual call records
create table if not exists brooke_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  campaign_id uuid references brooke_campaigns(id) on delete set null,
  lead_name text,
  lead_phone text,
  lead_company text,
  duration_seconds integer default 0,
  outcome text check (outcome in ('booked', 'callback', 'not_interested', 'voicemail', 'no_answer', 'dnc', 'error')),
  nepq_score integer,
  transcript jsonb,
  recording_url text,
  created_at timestamptz default now()
);

alter table brooke_calls enable row level security;

create policy "Users can read own calls"
  on brooke_calls for select
  using (auth.uid() = user_id);
