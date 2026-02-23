"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REPORT_API = "https://report.mynewstaff.ai";
const WEBHOOK_URL = "https://hooks.mynewstaff.ai/mission-control-apply";

type FormState = "idle" | "submitting" | "processing" | "completed" | "error";

const PROCESSING_MESSAGES = [
    "Submitting your data...",
    "Scanning your website...",
    "Analyzing social media presence...",
    "Checking paid media & ads...",
    "Evaluating marketing automation...",
    "Scoring all 10 pillars...",
    "Generating recommendations...",
    "Building your report...",
    "Almost there...",
];

export const AuditForm = () => {
    const [company, setCompany] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState<FormState>("idle");
    const [statusMsg, setStatusMsg] = useState("");
    const [reportUrl, setReportUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const msgRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
            if (msgRef.current) clearInterval(msgRef.current);
        };
    }, []);

    const canSubmit = company.trim().length > 0 && website.trim().length > 0 && email.includes("@");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || state === "submitting" || state === "processing") return;

        setState("submitting");
        setStatusMsg("Submitting your data...");
        setProgress(5);

        const formData = {
            company_name: company.trim(),
            website: website.trim().startsWith("http") ? website.trim() : `https://${website.trim()}`,
            email: email.trim(),
            contact_name: "",
            source: "mynewstaff-audit-page",
        };

        // Fire MNS webhook in background for lead capture
        try {
            fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: "",
                    email: email.trim(),
                    company: company.trim(),
                    website: formData.website,
                    need: "AI Scalability Audit",
                    source: "audit-page",
                    step: "audit-request",
                    submittedAt: new Date().toISOString(),
                }),
            });
        } catch { /* non-blocking */ }

        try {
            const resp = await fetch(`${REPORT_API}/api/report/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!resp.ok) throw new Error("Submission failed");

            const result = await resp.json();
            setState("processing");
            setProgress(20);

            // Rotate status messages
            let msgIdx = 1;
            msgRef.current = setInterval(() => {
                msgIdx = Math.min(msgIdx + 1, PROCESSING_MESSAGES.length - 1);
                setStatusMsg(PROCESSING_MESSAGES[msgIdx]);
            }, 4000);

            // Poll for completion
            let attempts = 0;
            pollRef.current = setInterval(async () => {
                attempts++;
                setProgress(Math.min(90, 20 + (attempts * 2)));

                try {
                    const statusResp = await fetch(`${REPORT_API}${result.check_status_url}`);
                    const statusData = await statusResp.json();

                    if (statusData.status === "completed") {
                        if (pollRef.current) clearInterval(pollRef.current);
                        if (msgRef.current) clearInterval(msgRef.current);
                        setProgress(100);
                        setState("completed");
                        setReportUrl(`${REPORT_API}${statusData.report_url}`);
                        setStatusMsg(`Your report is ready! Overall grade: ${statusData.overall_grade}`);
                    } else if (statusData.status === "failed") {
                        if (pollRef.current) clearInterval(pollRef.current);
                        if (msgRef.current) clearInterval(msgRef.current);
                        throw new Error("Report generation failed");
                    }
                } catch {
                    // keep polling on network errors
                }

                if (attempts >= 120) {
                    if (pollRef.current) clearInterval(pollRef.current);
                    if (msgRef.current) clearInterval(msgRef.current);
                    setStatusMsg("Taking longer than expected. Check your email — we'll send the report when it's ready.");
                }
            }, 2000);

        } catch {
            setState("error");
            setStatusMsg("Something went wrong. Please try again or email contact@mynewstaff.ai");
        }
    };

    const isLocked = state === "submitting" || state === "processing";

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-2">
                        Company Name *
                    </label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        disabled={isLocked}
                        className="w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-lg font-sans py-3 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200 disabled:opacity-40"
                    />
                </div>
                <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-2">
                        Website *
                    </label>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="www.acme.com"
                        disabled={isLocked}
                        className="w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-lg font-sans py-3 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200 disabled:opacity-40"
                    />
                </div>
                <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        disabled={isLocked}
                        className="w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-lg font-sans py-3 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200 disabled:opacity-40"
                    />
                </div>

                <AnimatePresence mode="wait">
                    {state === "completed" && reportUrl ? (
                        <motion.a
                            key="view"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            href={reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full mt-4 px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans text-center hover:bg-white/90 transition-colors"
                        >
                            View Your Report
                        </motion.a>
                    ) : (
                        <motion.button
                            key="submit"
                            type="submit"
                            disabled={!canSubmit || isLocked}
                            className="w-full mt-4 px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors cursor-pointer"
                        >
                            {isLocked ? "Analyzing..." : "Generate My Free Report"}
                        </motion.button>
                    )}
                </AnimatePresence>
            </form>

            {/* Progress Bar */}
            <AnimatePresence>
                {(state === "submitting" || state === "processing") && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-6"
                    >
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white/60 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                        <p className="mt-3 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-sans text-center">
                            {statusMsg}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Status Messages */}
            <AnimatePresence>
                {state === "completed" && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 border border-green-500/20 bg-green-500/5 text-center"
                    >
                        <p className="text-sm text-green-400 font-sans">{statusMsg}</p>
                    </motion.div>
                )}
                {state === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 border border-red-500/20 bg-red-500/5 text-center"
                    >
                        <p className="text-sm text-red-400 font-sans">{statusMsg}</p>
                        <button
                            type="button"
                            onClick={() => { setState("idle"); setStatusMsg(""); }}
                            className="mt-3 text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white font-sans transition-colors cursor-pointer"
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trust Signals */}
            <div className="flex justify-center gap-6 md:gap-10 mt-8 flex-wrap">
                {["256-bit encrypted", "No spam", "Results in < 5 min"].map((badge, i) => (
                    <span key={i} className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans">
                        {badge}
                    </span>
                ))}
            </div>
        </div>
    );
};
