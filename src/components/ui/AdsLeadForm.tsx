"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/placeholder";

type FormState = "idle" | "submitting" | "success" | "error";

const BUSINESS_TYPES = [
    "Roofing / Home Services",
    "Dental / Medical",
    "Legal",
    "Real Estate",
    "SaaS / Tech",
    "E-commerce",
    "Coaching / Consulting",
    "Restaurant / Hospitality",
    "Franchise",
    "Other",
];

const CHALLENGES = [
    "Not enough leads",
    "Leads are low quality",
    "Can't afford a full agency",
    "Tried ads — didn't work",
    "No time to manage marketing",
    "Don't know where to start",
    "Scaling after initial traction",
];

export const AdsLeadForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [challenge, setChallenge] = useState("");
    const [state, setState] = useState<FormState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const canSubmit =
        name.trim().length > 0 &&
        email.includes("@") &&
        phone.trim().length > 6 &&
        businessType.length > 0 &&
        challenge.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || state === "submitting") return;

        setState("submitting");

        const payload = {
            firstName: name.trim().split(" ")[0],
            lastName: name.trim().split(" ").slice(1).join(" ") || "",
            email: email.trim(),
            phone: phone.trim(),
            businessType,
            biggestChallenge: challenge,
            source: "mns-get-started-ads",
            submittedAt: new Date().toISOString(),
        };

        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            setState("success");
        } catch {
            setState("error");
            setErrorMsg("Something went wrong. Email us at contact@mynewstaff.ai");
        }
    };

    if (state === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-12"
            >
                <div className="w-14 h-14 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-wide font-bold uppercase text-white mb-3">
                    You&apos;re In.
                </h3>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed max-w-sm mx-auto">
                    We&apos;ll review your submission and reach out within 24 hours to book your free audit call. Check your email.
                </p>
            </motion.div>
        );
    }

    const inputClass =
        "w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-base font-sans py-3 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200 disabled:opacity-40";
    const labelClass =
        "block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-2";
    const selectClass =
        "w-full bg-zinc-950 border border-zinc-800 text-white text-sm font-sans py-3 px-4 outline-none focus:border-white transition-colors duration-200 disabled:opacity-40 appearance-none cursor-pointer";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            {/* Name */}
            <div>
                <label className={labelClass}>Full Name *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    disabled={state === "submitting"}
                    className={inputClass}
                />
            </div>

            {/* Email */}
            <div>
                <label className={labelClass}>Email *</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    disabled={state === "submitting"}
                    className={inputClass}
                />
            </div>

            {/* Phone */}
            <div>
                <label className={labelClass}>Phone *</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    disabled={state === "submitting"}
                    className={inputClass}
                />
            </div>

            {/* Business Type */}
            <div>
                <label className={labelClass}>Business Type *</label>
                <div className="relative">
                    <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        disabled={state === "submitting"}
                        className={selectClass}
                    >
                        <option value="" disabled>Select your industry</option>
                        {BUSINESS_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Challenge */}
            <div>
                <label className={labelClass}>Biggest Marketing Challenge *</label>
                <div className="relative">
                    <select
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        disabled={state === "submitting"}
                        className={selectClass}
                    >
                        <option value="" disabled>What&apos;s holding you back?</option>
                        {CHALLENGES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <AnimatePresence mode="wait">
                <motion.button
                    key="submit-btn"
                    type="submit"
                    disabled={!canSubmit || state === "submitting"}
                    className="w-full mt-2 px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.3em] uppercase font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-100 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                >
                    {state === "submitting" ? "Sending..." : "Get My Free Audit"}
                </motion.button>
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
                {state === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 border border-red-500/20 bg-red-500/5 text-center"
                    >
                        <p className="text-sm text-red-400 font-sans">{errorMsg}</p>
                        <button
                            type="button"
                            onClick={() => setState("idle")}
                            className="mt-2 text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white font-sans transition-colors cursor-pointer"
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trust signals */}
            <div className="flex justify-center gap-6 flex-wrap pt-2">
                {["No spam ever", "100% free", "Response within 24h"].map((badge, i) => (
                    <span key={i} className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans">
                        {badge}
                    </span>
                ))}
            </div>
        </form>
    );
};
