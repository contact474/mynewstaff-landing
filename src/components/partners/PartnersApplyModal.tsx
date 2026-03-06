"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePartnerLocale } from "./PartnersLocaleProvider";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  tier: {
    credits: string;
    trade: string;
    delivery: string;
    value: number;
  } | null;
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

export function PartnersApplyModal({
  open,
  onClose,
  tier,
  bundle,
}: ApplyModalProps) {
  const { t } = usePartnerLocale();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (open) {
      setStep(0);
      setSubmitted(false);
      setSubmitting(false);
      setScreenshots([]);
    }
  }, [open]);

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
    return true; // step 2 (screenshots) and step 3 (review) always passable
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 5 - screenshots.length);
    setScreenshots((prev) => [...prev, ...newFiles].slice(0, 5));
  };

  const removeFile = (idx: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      ...form,
      tier: tier?.credits ?? "Unknown",
      tierValue: tier?.value ?? 0,
      bundle: bundle?.name ?? "Unknown",
      bundleDetail: bundle?.detail ?? "",
      screenshotCount: screenshots.length,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submit failed");
    } catch {
      // Fallback: direct CRM post
      try {
        await fetch("https://mynewstaff.ai/command-api/api/v1/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          body: JSON.stringify({
            company_name: form.instagram,
            contact_name: form.name,
            contact_email: form.email,
            status: "new",
            notes: JSON.stringify(payload, null, 2),
            tags: ["source:partner_application"],
          }),
        });
      } catch {
        window.open(
          `mailto:contact@mynewstaff.ai?subject=${encodeURIComponent(`Partner Application: ${form.instagram}`)}`,
          "_blank"
        );
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const totalSteps = 4; // 0=info, 1=audience, 2=screenshots, 3=review

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/10"
          >
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
                  {t.applyModal.appSent}
                </h3>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6">
                  {t.applyModal.appSentSubtitle}
                </p>

                <div className="p-6 border border-white/10 bg-white/[0.02] mb-6">
                  <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-3 font-sans">
                    {t.applyModal.speedUp}
                  </span>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                    {screenshots.length > 0
                      ? t.applyModal.speedUpWithScreenshots
                          .replace("{n}", String(screenshots.length))
                          .replace("{s}", screenshots.length > 1 ? "s" : "")
                      : t.applyModal.speedUpWithout}
                  </p>
                  <a
                    href="https://ig.me/m/mynewstaff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-105 transition-transform"
                  >
                    {t.applyModal.dmButton}
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className="text-xs text-zinc-600 font-sans hover:text-zinc-400 transition-colors cursor-pointer"
                >
                  {t.applyModal.close}
                </button>
              </div>
            ) : (
              /* ─── Quiz Steps ─── */
              <div className="p-8 md:p-10">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(totalSteps)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-0.5 flex-1 transition-colors duration-300 ${
                          i <= step ? "bg-white" : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans">
                    {t.applyModal.stepOf
                      .replace("{current}", String(step + 1))
                      .replace("{total}", String(totalSteps))}
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
                        {t.applyModal.step0Title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans mb-6">
                        {t.applyModal.step0Subtitle}
                      </p>

                      <div className="space-y-4">
                        <Field
                          label={t.applyModal.fullName}
                          value={form.name}
                          onChange={(v) => update("name", v)}
                          placeholder="Your name"
                          required
                        />
                        <Field
                          label={t.applyModal.email}
                          value={form.email}
                          onChange={(v) => update("email", v)}
                          placeholder="you@example.com"
                          type="email"
                          required
                        />
                        <Field
                          label={t.applyModal.instagramHandle}
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
                        {t.applyModal.step1Title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans mb-6">
                        {t.applyModal.step1Subtitle}
                      </p>

                      <div className="space-y-4">
                        <SelectField
                          label={t.applyModal.followerCount}
                          value={form.followers}
                          onChange={(v) => update("followers", v)}
                          options={followerRanges}
                          selectPlaceholder={t.applyModal.selectPlaceholder}
                          required
                        />
                        <SelectField
                          label={t.applyModal.nicheIndustry}
                          value={form.niche}
                          onChange={(v) => update("niche", v)}
                          options={t.applyModal.niches}
                          selectPlaceholder={t.applyModal.selectPlaceholder}
                          required
                        />
                        <Field
                          label={t.applyModal.avgStoryViews}
                          value={form.avgStoryViews}
                          onChange={(v) => update("avgStoryViews", v)}
                          placeholder="e.g. 2,500"
                        />
                        <Field
                          label={t.applyModal.avgReelViews}
                          value={form.avgReelViews}
                          onChange={(v) => update("avgReelViews", v)}
                          placeholder="e.g. 15,000"
                        />
                        <Field
                          label={t.applyModal.engagementRate}
                          value={form.engagementRate}
                          onChange={(v) => update("engagementRate", v)}
                          placeholder="e.g. 4.2%"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ─── Step 2: Screenshots (Optional) ─── */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-wide text-xl uppercase text-white mb-1">
                        {t.applyModal.step2Title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans mb-2">
                        {t.applyModal.step2Subtitle}
                      </p>
                      <p className="text-[10px] text-zinc-600 font-sans mb-6 tracking-wide uppercase">
                        {t.applyModal.step2Optional}
                      </p>

                      {/* Upload area */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-white/15 hover:border-white/30 transition-colors p-8 text-center cursor-pointer mb-4 group"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                          <svg
                            className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-zinc-400 font-sans mb-1">
                          {t.applyModal.clickUpload}
                        </p>
                        <p className="text-[10px] text-zinc-600 font-sans">
                          {t.applyModal.uploadHint}
                        </p>
                      </div>

                      {/* Uploaded files */}
                      {screenshots.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {screenshots.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 border border-white/10 bg-white/[0.02]"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center shrink-0">
                                  <svg
                                    className="w-4 h-4 text-green-400/60"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                  </svg>
                                </div>
                                <span className="text-xs text-zinc-400 font-sans truncate">
                                  {file.name}
                                </span>
                              </div>
                              <button
                                onClick={() => removeFile(idx)}
                                className="text-zinc-600 hover:text-red-400 transition-colors text-xs cursor-pointer shrink-0 ml-2"
                              >
                                {t.applyModal.remove}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* What to upload hint */}
                      <div className="p-4 border border-white/5 bg-white/[0.01]">
                        <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase mb-2 font-sans">
                          {t.applyModal.whatToScreenshot}
                        </span>
                        <ul className="space-y-1">
                          {t.applyModal.screenshotHints.map((hint, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-[11px] text-zinc-500 font-sans"
                            >
                              <span className="text-zinc-700 shrink-0">—</span>
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── Step 3: Review ─── */}
                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-wide text-xl uppercase text-white mb-1">
                        {t.applyModal.step3Title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans mb-6">
                        {t.applyModal.step3Subtitle}
                      </p>

                      {/* Selection Summary */}
                      <div className="p-5 border border-white/10 bg-white/[0.02] mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                            {t.applyModal.yourPackage}
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
                              {t.applyModal.youPost}
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
                      <div className="p-5 border border-white/10 bg-white/[0.02] mb-4">
                        <span className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-3">
                          {t.applyModal.yourProfile}
                        </span>
                        <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                          <div>
                            <span className="text-zinc-600">{t.applyModal.name}</span>
                            <p className="text-zinc-300">{form.name}</p>
                          </div>
                          <div>
                            <span className="text-zinc-600">{t.applyModal.instagram}</span>
                            <p className="text-zinc-300">
                              @{form.instagram.replace("@", "")}
                            </p>
                          </div>
                          <div>
                            <span className="text-zinc-600">{t.applyModal.followers}</span>
                            <p className="text-zinc-300">{form.followers}</p>
                          </div>
                          <div>
                            <span className="text-zinc-600">{t.applyModal.niche}</span>
                            <p className="text-zinc-300">{form.niche}</p>
                          </div>
                        </div>
                        {screenshots.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/5">
                            <span className="text-[9px] text-green-400/60 uppercase font-sans">
                              {t.applyModal.screenshotsAttached
                                .replace("{n}", String(screenshots.length))
                                .replace("{s}", screenshots.length > 1 ? "s" : "")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Optional note */}
                      <div className="mb-2">
                        <label className="block text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                          {t.applyModal.anythingElse}
                        </label>
                        <textarea
                          value={form.whyPartner}
                          onChange={(e) =>
                            update("whyPartner", e.target.value)
                          }
                          rows={3}
                          className="w-full bg-zinc-900 border border-white/10 text-zinc-300 text-sm font-sans p-3 outline-none focus:border-white/30 transition-colors resize-none"
                          placeholder={t.applyModal.anythingElsePlaceholder}
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
                      {t.applyModal.back}
                    </button>
                  ) : (
                    <button
                      onClick={onClose}
                      className="text-xs text-zinc-500 font-sans hover:text-white transition-colors cursor-pointer"
                    >
                      {t.applyModal.changeSelection}
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
                      {step === 2
                        ? screenshots.length > 0
                          ? t.applyModal.next
                          : t.applyModal.skip
                        : t.applyModal.next}
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="px-8 py-3 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? t.applyModal.sending : t.applyModal.submitApplication}
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
  selectPlaceholder = "Select...",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
  selectPlaceholder?: string;
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
        <option value="">{selectPlaceholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
