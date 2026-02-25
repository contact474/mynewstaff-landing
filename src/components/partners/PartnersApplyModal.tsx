"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  tier: { credits: string; trade: string; delivery: string; value: number } | null;
  bundle: { name: string; detail: string } | null;
}

interface FormData {
  name: string;
  email: string;
  instagram: string;
  followers: string;
  niche: string;
  avgStoryViews: string;
  avgReelViews: string;
  engagementRate: string;
  whyPartner: string;
}

const followerRanges = [
  "1K – 5K",
  "5K – 10K",
  "10K – 25K",
  "25K – 50K",
  "50K – 100K",
  "100K – 500K",
  "500K – 1M",
  "1M+",
];

const niches = [
  "Fitness & Health",
  "Beauty & Fashion",
  "Tech & Gadgets",
  "Business & Finance",
  "Travel & Lifestyle",
  "Food & Cooking",
  "Education & Learning",
  "Entertainment & Comedy",
  "Real Estate",
  "Crypto & Web3",
  "Other",
];

export function PartnersApplyModal({
  open,
  onClose,
  tier,
  bundle,
}: ApplyModalProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    instagram: "",
    followers: "",
    niche: "",
    avgStoryViews: "",
    avgReelViews: "",
    engagementRate: "",
    whyPartner: "",
  });

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep(0);
      setSubmitted(false);
      setSubmitting(false);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canAdvance = () => {
    if (step === 0) return form.name && form.email && form.instagram;
    if (step === 1) return form.followers && form.niche;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      ...form,
      tier: tier?.credits ?? "Unknown",
      tierValue: tier?.value ?? 0,
      bundle: bundle?.name ?? "Unknown",
      bundleDetail: bundle?.detail ?? "",
      submittedAt: new Date().toISOString(),
    };

    try {
      // Try posting to MNS Command leads CRM via Vercel proxy
      const res = await fetch("/command-api/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: form.instagram,
          contact_name: form.name,
          contact_email: form.email,
          source: "influencer_barter",
          status: "new",
          notes: JSON.stringify(payload, null, 2),
          score: 0,
        }),
      });

      if (!res.ok) throw new Error("CRM post failed");
    } catch {
      // Fallback: open mailto with pre-filled data
      const subject = encodeURIComponent(
        `Influencer Application: ${form.instagram} — ${tier?.credits} / ${bundle?.name}`
      );
      const body = encodeURIComponent(
        `New Influencer Application\n\n` +
          `Name: ${form.name}\n` +
          `Email: ${form.email}\n` +
          `Instagram: @${form.instagram.replace("@", "")}\n` +
          `Followers: ${form.followers}\n` +
          `Niche: ${form.niche}\n` +
          `Avg Story Views: ${form.avgStoryViews || "N/A"}\n` +
          `Avg Reel Views: ${form.avgReelViews || "N/A"}\n` +
          `Engagement Rate: ${form.engagementRate || "N/A"}\n\n` +
          `Tier: ${tier?.credits}\n` +
          `Bundle: ${bundle?.name}\n` +
          `Note: ${form.whyPartner || "N/A"}\n`
      );
      // Fire-and-forget mailto
      window.open(
        `mailto:contact@mynewstaff.ai?subject=${subject}&body=${body}`,
        "_blank"
      );
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const totalSteps = 3; // 0=info, 1=audience, 2=review

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors text-lg cursor-pointer z-10"
            >
              ✕
            </button>

            {submitted ? (
              /* ─── Success Screen ─── */
              <div className="p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-green-500/30 flex items-center justify-center">
                  <span className="text-green-400 text-2xl">✓</span>
                </div>
                <h3 className="font-wide text-2xl uppercase text-white mb-3">
                  APPLICATION SENT
                </h3>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6">
                  We&apos;ll review your profile within 48 hours and reach out
                  via email to confirm your tier.
                </p>

                {/* DM CTA — the second conversion */}
                <div className="p-6 border border-white/10 bg-white/[0.02] mb-6">
                  <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-3 font-sans">
                    Speed Up Your Approval
                  </span>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                    DM us your latest Instagram Insights screenshots
                    (followers, reach, engagement). This helps us fast-track
                    your application.
                  </p>
                  <a
                    href="https://instagram.com/mynewstaff.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-105 transition-transform"
                  >
                    DM @mynewstaff.ai
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className="text-xs text-zinc-600 font-sans hover:text-zinc-400 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              /* ─── Quiz Steps ─── */
              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    {[...Array(totalSteps)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-0.5 flex-1 transition-colors ${
                          i <= step ? "bg-white" : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans">
                    Step {step + 1} of {totalSteps}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {/* ─── Step 0: Basic Info ─── */}
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-wide text-xl uppercase text-white mb-1">
                        TELL US ABOUT YOU
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans mb-6">
                        Basic details so we can reach you.
                      </p>

                      <div className="space-y-4">
                        <Field
                          label="Full Name"
                          value={form.name}
                          onChange={(v) => update("name", v)}
                          placeholder="Your name"
                          required
                        />
                        <Field
                          label="Email"
                          value={form.email}
                          onChange={(v) => update("email", v)}
                          placeholder="you@example.com"
                          type="email"
                          required
                        />
                        <Field
                          label="Instagram Handle"
                          value={form.instagram}
                          onChange={(v) => update("instagram", v)}
                          placeholder="@yourhandle"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ─── Step 1: Audience ─── */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-wide text-xl uppercase text-white mb-1">
                        YOUR AUDIENCE
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans mb-6">
                        Helps us match you to the right tier.
                      </p>

                      <div className="space-y-4">
                        <SelectField
                          label="Follower Count"
                          value={form.followers}
                          onChange={(v) => update("followers", v)}
                          options={followerRanges}
                          required
                        />
                        <SelectField
                          label="Niche / Industry"
                          value={form.niche}
                          onChange={(v) => update("niche", v)}
                          options={niches}
                          required
                        />
                        <Field
                          label="Avg Story Views"
                          value={form.avgStoryViews}
                          onChange={(v) => update("avgStoryViews", v)}
                          placeholder="e.g. 2,500"
                        />
                        <Field
                          label="Avg Reel Views"
                          value={form.avgReelViews}
                          onChange={(v) => update("avgReelViews", v)}
                          placeholder="e.g. 15,000"
                        />
                        <Field
                          label="Engagement Rate (if known)"
                          value={form.engagementRate}
                          onChange={(v) => update("engagementRate", v)}
                          placeholder="e.g. 4.2%"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ─── Step 2: Review ─── */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-wide text-xl uppercase text-white mb-1">
                        CONFIRM YOUR APPLICATION
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans mb-6">
                        Review everything before submitting.
                      </p>

                      {/* Selection Summary */}
                      <div className="p-5 border border-white/10 bg-white/[0.02] mb-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                            Your Package
                          </span>
                          <span className="font-wide text-lg text-white">
                            {tier?.credits}
                          </span>
                        </div>
                        <p className="text-sm text-white font-sans mb-1">
                          {bundle?.name}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-sans">
                          {bundle?.detail}
                        </p>
                        <div className="mt-3 pt-3 border-t border-white/5 flex gap-6">
                          <div>
                            <span className="text-[9px] text-zinc-600 uppercase font-sans">
                              You Post
                            </span>
                            <p className="text-xs text-zinc-400 font-sans">
                              {tier?.trade}
                            </p>
                          </div>
                          <div>
                            <span className="text-[9px] text-zinc-600 uppercase font-sans">
                              Delivery
                            </span>
                            <p className="text-xs text-zinc-400 font-sans">
                              {tier?.delivery}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Profile Summary */}
                      <div className="p-5 border border-white/10 bg-white/[0.02] mb-5">
                        <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-3">
                          Your Profile
                        </span>
                        <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                          <div>
                            <span className="text-zinc-600">Name</span>
                            <p className="text-zinc-300">{form.name}</p>
                          </div>
                          <div>
                            <span className="text-zinc-600">Instagram</span>
                            <p className="text-zinc-300">
                              @{form.instagram.replace("@", "")}
                            </p>
                          </div>
                          <div>
                            <span className="text-zinc-600">Followers</span>
                            <p className="text-zinc-300">{form.followers}</p>
                          </div>
                          <div>
                            <span className="text-zinc-600">Niche</span>
                            <p className="text-zinc-300">{form.niche}</p>
                          </div>
                        </div>
                      </div>

                      {/* Optional note */}
                      <div className="mb-2">
                        <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                          Anything else? (optional)
                        </label>
                        <textarea
                          value={form.whyPartner}
                          onChange={(e) =>
                            update("whyPartner", e.target.value)
                          }
                          rows={3}
                          className="w-full bg-zinc-900 border border-white/10 text-zinc-300 text-sm font-sans p-3 outline-none focus:border-white/30 transition-colors resize-none"
                          placeholder="Links to previous brand collabs, your vision for the partnership, etc."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  {step > 0 ? (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="text-xs text-zinc-500 font-sans hover:text-white transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                  ) : (
                    <button
                      onClick={onClose}
                      className="text-xs text-zinc-500 font-sans hover:text-white transition-colors cursor-pointer"
                    >
                      ← Change Bundle
                    </button>
                  )}

                  {step < totalSteps - 1 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canAdvance()}
                      className={`px-8 py-3 text-xs tracking-[0.15em] uppercase font-bold transition-all cursor-pointer ${
                        canAdvance()
                          ? "bg-white text-black hover:scale-105"
                          : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                      }`}
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="px-8 py-3 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────── Form Fields ───────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
        {label}
        {required && <span className="text-amber-500/60 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-900 border border-white/10 text-zinc-300 text-sm font-sans p-3 outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
        {label}
        {required && <span className="text-amber-500/60 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-white/10 text-zinc-300 text-sm font-sans p-3 outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
