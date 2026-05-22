"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/supabase/auth-context";
import { createClient } from "@/lib/supabase/client";

/* ─── Types ─── */

interface BrookeConfig {
  id?: string;
  user_id: string;
  business_name: string;
  offer_description: string;
  booking_link: string;
  industry: string;
  job_titles: string;
  location: string;
  provider: string | null;
  provider_config: Record<string, string> | null;
  generated_script: { opener: string; discovery: string; close: string };
  onboarding_complete: boolean;
  created_at?: string;
}

interface CallRecord {
  id: string;
  name: string;
  phone: string;
  duration: number;
  outcome: string;
  nepq_score: number;
}

/* ─── Script Generator (same logic as BrookeTryPopup) ─── */

function generateScript(
  offer: string,
  icp: string,
): { opener: string; discovery: string; close: string } {
  return {
    opener: `Hi [name], this is Brooke. Would it be a terrible idea if I asked — are you currently handling ${offer.toLowerCase().includes("lead") ? "your lead generation" : "your " + icp.toLowerCase() + " outreach"} in-house, or have you looked at automating that?`,
    discovery: `What's your current process for ${offer.toLowerCase().includes("install") ? "getting new installation appointments" : "finding and converting new " + icp.toLowerCase()}? And what would it mean for your business if you could double that without hiring?`,
    close: `Based on what you've told me, I think we can help. We have a slot open [day]. It's a quick 20-minute strategy call — no commitment. Want me to lock that in for you?`,
  };
}

/* ─── Constants ─── */

const INDUSTRY_OPTIONS = [
  "SaaS",
  "Real Estate",
  "Healthcare",
  "Legal",
  "Insurance",
  "Home Services",
  "Marketing Agency",
  "E-commerce",
  "Restaurant",
  "Financial Services",
  "Education",
  "Other",
] as const;

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

/* ─── Shared UI Components ─── */

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i + 1 <= current
              ? "bg-white w-8"
              : "bg-white/15 w-4"
          }`}
        />
      ))}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors text-sm"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none transition-colors text-sm resize-none"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors text-sm appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 16px center",
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-zinc-950 text-white">
          {opt}
        </option>
      ))}
    </select>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-white text-black font-bold text-sm tracking-wide uppercase px-6 py-3 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white ${className}`}
    >
      {children}
    </button>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
      <div className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="text-2xl font-wide font-bold">{value}</div>
    </div>
  );
}

/* ─── Onboarding Steps ─── */

function StepOffer({
  businessName,
  setBusinessName,
  offerDescription,
  setOfferDescription,
  bookingLink,
  setBookingLink,
  onNext,
}: {
  businessName: string;
  setBusinessName: (v: string) => void;
  offerDescription: string;
  setOfferDescription: (v: string) => void;
  bookingLink: string;
  setBookingLink: (v: string) => void;
  onNext: () => void;
}) {
  const canProceed =
    businessName.trim() && offerDescription.trim() && bookingLink.trim();

  return (
    <div>
      <div className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-3">
        Step 1 of 4
      </div>
      <h1 className="text-2xl font-wide font-bold uppercase tracking-tight mb-2">
        What does Brooke sell?
      </h1>
      <p className="text-zinc-400 text-sm mb-8">
        She&apos;ll build a custom cold call script from this.
      </p>

      <div className="space-y-5">
        <div>
          <FieldLabel>Your Business Name</FieldLabel>
          <TextInput value={businessName} onChange={setBusinessName} />
        </div>
        <div>
          <FieldLabel>What do you sell?</FieldLabel>
          <TextArea
            value={offerDescription}
            onChange={setOfferDescription}
            placeholder="Describe your offer in 2-3 sentences..."
            rows={3}
          />
        </div>
        <div>
          <FieldLabel>Your booking link</FieldLabel>
          <TextInput
            value={bookingLink}
            onChange={setBookingLink}
            placeholder="https://calendly.com/you or Cal.com link"
          />
        </div>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onNext} disabled={!canProceed} className="w-full py-4">
          Next &rarr;
        </PrimaryButton>
      </div>
    </div>
  );
}

function StepAudience({
  industry,
  setIndustry,
  jobTitles,
  setJobTitles,
  location,
  setLocation,
  onNext,
  onBack,
}: {
  industry: string;
  setIndustry: (v: string) => void;
  jobTitles: string;
  setJobTitles: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canProceed = industry && jobTitles.trim() && location.trim();

  return (
    <div>
      <div className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-3">
        Step 2 of 4
      </div>
      <h1 className="text-2xl font-wide font-bold uppercase tracking-tight mb-2">
        Who does Brooke call?
      </h1>
      <p className="text-zinc-400 text-sm mb-8">
        Define your ideal prospect so Brooke targets the right people.
      </p>

      <div className="space-y-5">
        <div>
          <FieldLabel>Industry</FieldLabel>
          <SelectInput
            value={industry}
            onChange={setIndustry}
            options={INDUSTRY_OPTIONS}
          />
        </div>
        <div>
          <FieldLabel>Job Titles to Target</FieldLabel>
          <TextInput
            value={jobTitles}
            onChange={setJobTitles}
            placeholder="CEO, Owner, VP of Sales..."
          />
        </div>
        <div>
          <FieldLabel>Location</FieldLabel>
          <TextInput
            value={location}
            onChange={setLocation}
            placeholder="USA, Texas, New York metro..."
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-sm"
        >
          &larr; Back
        </button>
        <PrimaryButton onClick={onNext} disabled={!canProceed} className="flex-1 py-4">
          Next &rarr;
        </PrimaryButton>
      </div>
    </div>
  );
}

function StepPhone({
  provider,
  setProvider,
  providerConfig,
  setProviderConfig,
  setupOrdered,
  setSetupOrdered,
  onNext,
  onBack,
}: {
  provider: string | null;
  setProvider: (v: string | null) => void;
  providerConfig: Record<string, string>;
  setProviderConfig: (v: Record<string, string>) => void;
  setupOrdered: boolean;
  setSetupOrdered: (v: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const twilioSelected = provider === "twilio";
  const signalwireSelected = provider === "signalwire";

  const twilioFilled =
    twilioSelected &&
    providerConfig.account_sid?.trim() &&
    providerConfig.auth_token?.trim() &&
    providerConfig.phone_number?.trim();

  const signalwireFilled =
    signalwireSelected &&
    providerConfig.space_name?.trim() &&
    providerConfig.project_id?.trim() &&
    providerConfig.api_token?.trim() &&
    providerConfig.phone_number?.trim();

  const canProceed = twilioFilled || signalwireFilled || setupOrdered;

  function updateConfig(key: string, val: string) {
    setProviderConfig({ ...providerConfig, [key]: val });
  }

  return (
    <div>
      <div className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-3">
        Step 3 of 4
      </div>
      <h1 className="text-2xl font-wide font-bold uppercase tracking-tight mb-2">
        Give Brooke a phone
      </h1>
      <p className="text-zinc-400 text-sm mb-8">
        Brooke calls from YOUR number. Connect Twilio or SignalWire.
      </p>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Twilio */}
        <div
          onClick={() => {
            setProvider("twilio");
            setSetupOrdered(false);
            setProviderConfig({});
          }}
          className={`bg-zinc-900 border rounded-xl p-6 cursor-pointer transition-colors ${
            twilioSelected ? "border-white/30" : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="text-sm font-wide font-bold uppercase tracking-wider mb-4">
            Twilio
          </div>
          {twilioSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="space-y-3 overflow-hidden"
            >
              <div>
                <FieldLabel>Account SID</FieldLabel>
                <TextInput
                  value={providerConfig.account_sid || ""}
                  onChange={(v) => updateConfig("account_sid", v)}
                />
              </div>
              <div>
                <FieldLabel>Auth Token</FieldLabel>
                <TextInput
                  value={providerConfig.auth_token || ""}
                  onChange={(v) => updateConfig("auth_token", v)}
                  type="password"
                />
              </div>
              <div>
                <FieldLabel>Phone Number</FieldLabel>
                <TextInput
                  value={providerConfig.phone_number || ""}
                  onChange={(v) => updateConfig("phone_number", v)}
                  placeholder="+1234567890"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* SignalWire */}
        <div
          onClick={() => {
            setProvider("signalwire");
            setSetupOrdered(false);
            setProviderConfig({});
          }}
          className={`bg-zinc-900 border rounded-xl p-6 cursor-pointer transition-colors ${
            signalwireSelected
              ? "border-white/30"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="text-sm font-wide font-bold uppercase tracking-wider mb-4">
            SignalWire
          </div>
          {signalwireSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="space-y-3 overflow-hidden"
            >
              <div>
                <FieldLabel>Space Name</FieldLabel>
                <TextInput
                  value={providerConfig.space_name || ""}
                  onChange={(v) => updateConfig("space_name", v)}
                />
              </div>
              <div>
                <FieldLabel>Project ID</FieldLabel>
                <TextInput
                  value={providerConfig.project_id || ""}
                  onChange={(v) => updateConfig("project_id", v)}
                />
              </div>
              <div>
                <FieldLabel>API Token</FieldLabel>
                <TextInput
                  value={providerConfig.api_token || ""}
                  onChange={(v) => updateConfig("api_token", v)}
                  type="password"
                />
              </div>
              <div>
                <FieldLabel>Phone Number</FieldLabel>
                <TextInput
                  value={providerConfig.phone_number || ""}
                  onChange={(v) => updateConfig("phone_number", v)}
                  placeholder="+1234567890"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* OR Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-zinc-500 uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Setup Service */}
      <div
        onClick={() => {
          setProvider(null);
          setProviderConfig({});
          setSetupOrdered(true);
        }}
        className={`border rounded-xl p-6 cursor-pointer transition-colors mb-6 ${
          setupOrdered
            ? "border-white/30 bg-zinc-900"
            : "border-white/15 hover:border-white/25"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold mb-1">$49 Setup Service</div>
            <p className="text-xs text-zinc-400">
              Don&apos;t have a number? We&apos;ll set one up for you in 24 hours.
            </p>
          </div>
          {setupOrdered ? (
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
              Selected
            </span>
          ) : (
            <span className="text-xs text-zinc-500 border border-white/15 px-3 py-1.5 rounded-lg">
              Order Setup
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-sm"
        >
          &larr; Back
        </button>
        <PrimaryButton onClick={onNext} disabled={!canProceed} className="flex-1 py-4">
          Next &rarr;
        </PrimaryButton>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-3 text-center text-zinc-500 text-xs hover:text-zinc-300 transition-colors"
      >
        Skip for now &rarr;
      </button>
    </div>
  );
}

function StepReview({
  businessName,
  offerDescription,
  industry,
  jobTitles,
  provider,
  providerConfig,
  setupOrdered,
  script,
  onLaunch,
  onBack,
  saving,
}: {
  businessName: string;
  offerDescription: string;
  industry: string;
  jobTitles: string;
  provider: string | null;
  providerConfig: Record<string, string>;
  setupOrdered: boolean;
  script: { opener: string; discovery: string; close: string };
  onLaunch: () => void;
  onBack: () => void;
  saving: boolean;
}) {
  const phoneDisplay = provider
    ? providerConfig.phone_number || `${provider} (configured)`
    : setupOrdered
      ? "Setup ordered ($49)"
      : "Not connected yet";

  return (
    <div>
      <div className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-3">
        Step 4 of 4
      </div>
      <h1 className="text-2xl font-wide font-bold uppercase tracking-tight mb-6">
        Review your Brooke
      </h1>

      {/* Summary Card */}
      <div className="bg-zinc-950 border border-white/10 rounded-xl p-6 mb-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            Business
          </span>
          <span className="text-sm text-white">{businessName}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between gap-4">
          <span className="text-xs text-zinc-500 uppercase tracking-wider shrink-0">
            Offer
          </span>
          <span className="text-sm text-white text-right">
            {offerDescription.length > 80
              ? offerDescription.slice(0, 80) + "..."
              : offerDescription}
          </span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            Industry
          </span>
          <span className="text-sm text-white">{industry}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            Targets
          </span>
          <span className="text-sm text-white">{jobTitles}</span>
        </div>
        <div className="border-t border-white/5" />
        <div className="flex justify-between">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            Phone
          </span>
          <span className="text-sm text-white">{phoneDisplay}</span>
        </div>
      </div>

      {/* Generated Script Preview */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-8 space-y-4">
        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
          Generated Script Preview
        </div>
        <div>
          <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
            Opener
          </div>
          <p className="text-sm text-green-400 leading-relaxed">
            {script.opener}
          </p>
        </div>
        <div className="border-t border-white/5" />
        <div>
          <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
            Discovery
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {script.discovery}
          </p>
        </div>
        <div className="border-t border-white/5" />
        <div>
          <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
            Close
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">{script.close}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-sm"
        >
          &larr; Back
        </button>
        <PrimaryButton
          onClick={onLaunch}
          disabled={saving}
          className="flex-1 py-4"
        >
          {saving ? "Launching..." : "Launch Brooke \uD83D\uDE80"}
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ─── Dashboard View ─── */

function BrookeDashboard({ config }: { config: BrookeConfig }) {
  const [leadsText, setLeadsText] = useState("");
  const [starting, setStarting] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(false);
  const [calls] = useState<CallRecord[]>([]);

  async function handleStartCampaign() {
    if (!leadsText.trim()) return;
    setStarting(true);
    try {
      const phones = leadsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      await fetch("https://cold-caller.mynewstaff.ai/api/v1/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: config.user_id,
          business_name: config.business_name,
          offer_description: config.offer_description,
          booking_link: config.booking_link,
          industry: config.industry,
          job_titles: config.job_titles,
          location: config.location,
          provider: config.provider,
          provider_config: config.provider_config,
          generated_script: config.generated_script,
          leads: phones,
        }),
      });
      setLeadsText("");
    } catch {
      // silently handle — will add error toast later
    } finally {
      setStarting(false);
    }
  }

  function handleCSVUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      setLeadsText(text);
    };
    input.click();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-wide font-bold uppercase tracking-tight">
          Brooke
        </h1>
        <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Active
        </span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Calls Made" value={0} />
        <StatCard label="Meetings Booked" value={0} />
        <StatCard label="Minutes Used" value="0 / 500" />
      </div>

      {/* Upload Leads */}
      <div className="bg-zinc-950 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-wide font-bold uppercase tracking-wider mb-4">
          Upload Leads
        </h2>
        <TextArea
          value={leadsText}
          onChange={setLeadsText}
          placeholder="Paste phone numbers (one per line)"
          rows={4}
        />
        <div className="flex gap-3 mt-4">
          <PrimaryButton
            onClick={handleStartCampaign}
            disabled={!leadsText.trim() || starting}
          >
            {starting ? "Starting..." : "Start Campaign"}
          </PrimaryButton>
          <button
            onClick={handleCSVUpload}
            className="px-4 py-3 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-sm"
          >
            Upload CSV
          </button>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="bg-zinc-950 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-wide font-bold uppercase tracking-wider mb-4">
          Recent Calls
        </h2>
        {calls.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No calls yet. Upload leads to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {calls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between border-b border-white/5 pb-3"
              >
                <div>
                  <div className="text-sm text-white">{call.name}</div>
                  <div className="text-xs text-zinc-500">{call.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-zinc-300">
                    {Math.floor(call.duration / 60)}:{String(call.duration % 60).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {call.outcome} &middot; NEPQ {call.nepq_score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Your Script (collapsible) */}
      <div className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
        <button
          onClick={() => setScriptOpen(!scriptOpen)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <h2 className="text-sm font-wide font-bold uppercase tracking-wider">
            Your Script
          </h2>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`text-zinc-400 transition-transform ${scriptOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <AnimatePresence>
          {scriptOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                    Opener
                  </div>
                  <p className="text-sm text-green-400 leading-relaxed">
                    {config.generated_script.opener}
                  </p>
                </div>
                <div className="border-t border-white/5" />
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                    Discovery
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {config.generated_script.discovery}
                  </p>
                </div>
                <div className="border-t border-white/5" />
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                    Close
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {config.generated_script.close}
                  </p>
                </div>
                <button className="mt-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-xs uppercase tracking-wider">
                  Edit Script
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brooke 2.0 Teaser */}
      <div className="bg-zinc-950 border border-violet-500/20 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] tracking-[0.3em] text-violet-400 uppercase font-semibold">Coming Soon</span>
            <span className="text-[9px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full uppercase tracking-wider">2.0</span>
          </div>
          <h3 className="text-lg font-wide font-bold uppercase tracking-tight mb-2">
            Find Leads + Call Them
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            Built-in lead engine powered by HeatSeak. Search any ICP, get verified contacts with intent signals, and let Brooke call them — all in one platform. No more CSV uploads.
          </p>
          <button
            onClick={() => {
              const email = prompt("Drop your email to get early access to Brooke 2.0:");
              if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                fetch("/api/brooke/capture-email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, source: "brooke-2-waitlist" }),
                });
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/50 transition-all text-xs uppercase tracking-wider font-semibold"
          >
            Join the Waitlist
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function BrookePage() {
  const { user, loading: authLoading } = useAuth();
  const [config, setConfig] = useState<BrookeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Onboarding state
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [bookingLink, setBookingLink] = useState("");
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0] as string);
  const [jobTitles, setJobTitles] = useState("");
  const [location, setLocation] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const [providerConfig, setProviderConfig] = useState<Record<string, string>>({});
  const [setupOrdered, setSetupOrdered] = useState(false);

  // Fetch existing config on load
  useEffect(() => {
    if (authLoading || !user) return;

    const supabase = createClient();

    async function fetchConfig() {
      const { data } = await supabase
        .from("brooke_configs")
        .select("*")
        .eq("user_id", user!.id)
        .single();

      if (data && data.onboarding_complete) {
        setConfig(data as BrookeConfig);
      }
      setLoading(false);
    }

    fetchConfig();
  }, [user, authLoading]);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleLaunch = useCallback(async () => {
    if (!user) return;
    setSaving(true);

    const script = generateScript(offerDescription, industry);
    const supabase = createClient();

    const payload: Omit<BrookeConfig, "id" | "created_at"> = {
      user_id: user.id,
      business_name: businessName,
      offer_description: offerDescription,
      booking_link: bookingLink,
      industry,
      job_titles: jobTitles,
      location,
      provider,
      provider_config: provider ? providerConfig : null,
      generated_script: script,
      onboarding_complete: true,
    };

    const { data, error } = await supabase
      .from("brooke_configs")
      .upsert(payload, { onConflict: "user_id" })
      .select()
      .single();

    if (!error && data) {
      setConfig(data as BrookeConfig);
    }

    setSaving(false);
  }, [
    user,
    businessName,
    offerDescription,
    bookingLink,
    industry,
    jobTitles,
    location,
    provider,
    providerConfig,
  ]);

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse" />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-xl font-wide font-bold uppercase tracking-tight mb-2">
            Sign in required
          </h1>
          <p className="text-sm text-zinc-400">
            Please sign in to access Brooke.
          </p>
        </div>
      </div>
    );
  }

  // Dashboard mode (onboarding complete)
  if (config) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <BrookeDashboard config={config} />
      </div>
    );
  }

  // Onboarding mode
  const script = generateScript(offerDescription, industry);

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <StepDots current={step} total={4} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={SLIDE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 1 && (
            <StepOffer
              businessName={businessName}
              setBusinessName={setBusinessName}
              offerDescription={offerDescription}
              setOfferDescription={setOfferDescription}
              bookingLink={bookingLink}
              setBookingLink={setBookingLink}
              onNext={goNext}
            />
          )}
          {step === 2 && (
            <StepAudience
              industry={industry}
              setIndustry={setIndustry}
              jobTitles={jobTitles}
              setJobTitles={setJobTitles}
              location={location}
              setLocation={setLocation}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <StepPhone
              provider={provider}
              setProvider={setProvider}
              providerConfig={providerConfig}
              setProviderConfig={setProviderConfig}
              setupOrdered={setupOrdered}
              setSetupOrdered={setSetupOrdered}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 4 && (
            <StepReview
              businessName={businessName}
              offerDescription={offerDescription}
              industry={industry}
              jobTitles={jobTitles}
              provider={provider}
              providerConfig={providerConfig}
              setupOrdered={setupOrdered}
              script={script}
              onLaunch={handleLaunch}
              onBack={goBack}
              saving={saving}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
