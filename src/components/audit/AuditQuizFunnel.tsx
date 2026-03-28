"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REPORT_API = "https://report.mynewstaff.ai";
const WEBHOOK_URL = "https://hooks.mynewstaff.ai/mission-control-apply";

type Step = "hook" | "company" | "website" | "email" | "adSpend" | "challenge" | "analyzing" | "results";
type AnalysisState = "idle" | "submitting" | "processing" | "completed" | "error";

const STEPS: Step[] = ["hook", "company", "website", "email", "adSpend", "challenge", "analyzing", "results"];
const PROGRESS_STEPS: Step[] = ["company", "website", "email", "adSpend", "challenge"];

const AD_SPEND_OPTIONS = [
  "Not running ads yet",
  "Under $1,000/mo",
  "$1,000 – $5,000/mo",
  "$5,000 – $25,000/mo",
  "$25,000+",
];

const CHALLENGE_OPTIONS = [
  "Getting enough leads",
  "Cost per lead is too high",
  "Leads don't convert to sales",
  "Don't know what's working",
  "Scaling without losing ROI",
];

const ANALYSIS_STEPS = [
  "Scanning website structure...",
  "Analyzing social media presence...",
  "Checking paid media & ad pixels...",
  "Evaluating marketing automation...",
  "Scoring all 10 pillars...",
  "Generating recommendations...",
  "Building your report...",
];

const stepVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/* ─── Sub-components ─── */

function ProgressBar({ current }: { current: Step }) {
  const idx = PROGRESS_STEPS.indexOf(current);
  if (idx < 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex gap-1 px-4 py-3">
      {PROGRESS_STEPS.map((_, i) => (
        <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              i < idx ? "bg-white" : i === idx ? "bg-white/40" : "bg-white/10"
            }`}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}

function UnderlineInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus = false,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoFocus?: boolean;
  onSubmit: () => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-xl md:text-2xl font-sans py-4 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200"
    />
  );
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-6 py-4 border rounded transition-all duration-200 cursor-pointer font-sans text-base md:text-lg ${
        selected
          ? "border-white bg-white/10 text-white"
          : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function ContinueButton({ disabled, onClick, label = "Continue" }: { disabled: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-8 px-10 py-4 border border-white text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white cursor-pointer"
    >
      {label}
    </button>
  );
}

/* ─── Main Component ─── */

export function AuditQuizFunnel() {
  const [step, setStep] = useState<Step>("hook");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [challenge, setChallenge] = useState("");

  // Analysis state
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [progress, setProgress] = useState(0);
  const [activeCheckIdx, setActiveCheckIdx] = useState(0);
  const [reportUrl, setReportUrl] = useState("");
  const [overallGrade, setOverallGrade] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup intervals
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (checkRef.current) clearInterval(checkRef.current);
    };
  }, []);

  // Resume from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mns-audit-quiz");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.company) setCompany(data.company);
        if (data.website) setWebsite(data.website);
        if (data.email) setEmail(data.email);
        if (data.adSpend) setAdSpend(data.adSpend);
        if (data.challenge) setChallenge(data.challenge);
        // Resume to the step they were on (but not past analyzing)
        if (data.step && STEPS.indexOf(data.step) < STEPS.indexOf("analyzing")) {
          setStep(data.step);
        }
      }
    } catch { /* ignore */ }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((currentStep: Step) => {
    try {
      localStorage.setItem("mns-audit-quiz", JSON.stringify({
        company, website, email, adSpend, challenge, step: currentStep,
      }));
    } catch { /* ignore */ }
  }, [company, website, email, adSpend, challenge]);

  const goTo = (next: Step) => {
    saveProgress(next);
    setStep(next);
  };

  // Fire webhook for lead capture
  const fireWebhook = (payload: Record<string, string>) => {
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch { /* non-blocking */ }
  };

  // Save to mns-lead for cross-page persistence
  const saveLead = () => {
    try {
      localStorage.setItem("mns-lead", JSON.stringify({
        firstName: "",
        email,
        need: "AI Ad Audit",
      }));
    } catch { /* ignore */ }
  };

  // Start report generation
  const startAnalysis = async () => {
    setAnalysisState("submitting");
    setProgress(5);
    setActiveCheckIdx(0);

    // Animate checklist items
    checkRef.current = setInterval(() => {
      setActiveCheckIdx((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 3500);

    const formData = {
      company_name: company.trim(),
      website: website.trim().startsWith("http") ? website.trim() : `https://${website.trim()}`,
      email: email.trim(),
      contact_name: "",
      source: "ads-audit-quiz",
    };

    try {
      const resp = await fetch(`${REPORT_API}/api/report/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) throw new Error("Submission failed");

      const result = await resp.json();
      setAnalysisState("processing");
      setProgress(20);

      // Poll for completion
      let attempts = 0;
      pollRef.current = setInterval(async () => {
        attempts++;
        setProgress(Math.min(92, 20 + attempts * 2.5));

        try {
          const statusResp = await fetch(`${REPORT_API}${result.check_status_url}`);
          const statusData = await statusResp.json();

          if (statusData.status === "completed") {
            if (pollRef.current) clearInterval(pollRef.current);
            if (checkRef.current) clearInterval(checkRef.current);
            setProgress(100);
            setAnalysisState("completed");
            setReportUrl(`${REPORT_API}${statusData.report_url}`);
            setOverallGrade(statusData.overall_grade || "A");
            setActiveCheckIdx(ANALYSIS_STEPS.length);
            // Brief pause to show 100%, then reveal results
            setTimeout(() => goTo("results"), 1200);
          } else if (statusData.status === "failed") {
            if (pollRef.current) clearInterval(pollRef.current);
            if (checkRef.current) clearInterval(checkRef.current);
            throw new Error("Report generation failed");
          }
        } catch {
          // keep polling on network errors
        }

        if (attempts >= 120) {
          if (pollRef.current) clearInterval(pollRef.current);
          if (checkRef.current) clearInterval(checkRef.current);
          setAnalysisState("completed");
          setErrorMsg("Taking longer than expected. Check your email — we'll send the report when it's ready.");
          setTimeout(() => goTo("results"), 1500);
        }
      }, 2000);
    } catch {
      setAnalysisState("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  // Auto-advance for option cards
  const selectAndAdvance = (setter: (v: string) => void, value: string, nextStep: Step) => {
    setter(value);
    setTimeout(() => goTo(nextStep), 350);
  };

  /* ─── Step Renderers ─── */

  const renderHook = () => (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center text-center px-4">
      <span className="block text-[10px] md:text-xs tracking-[0.35em] mb-6 text-white/30 font-sans uppercase">
        Free AI-Powered Audit
      </span>
      <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
        YOUR ADS ARE<br />
        LEAKING <span className="shimmer-text">MONEY.</span>
      </h1>
      <p className="mt-6 md:mt-8 text-sm md:text-base text-zinc-400 font-sans max-w-[480px] leading-relaxed">
        We&apos;ll scan your website, social media, and marketing stack across 10 critical pillars — then show you exactly where you&apos;re bleeding budget.
      </p>
      <button
        type="button"
        onClick={() => goTo("company")}
        className="mt-10 px-12 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-all duration-300 cursor-pointer"
      >
        Find My Leaks →
      </button>
      <div className="flex gap-6 md:gap-10 mt-12 flex-wrap justify-center">
        {["500+ Reports", "200+ Data Points", "100% Free"].map((badge) => (
          <span key={badge} className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );

  const renderCompany = () => (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[520px]">
        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
          Step 1 of 5
        </span>
        <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase text-white mb-8">
          What&apos;s your<br />company name?
        </h2>
        <UnderlineInput
          value={company}
          onChange={setCompany}
          placeholder="Acme Corp"
          autoFocus
          onSubmit={() => company.trim() && goTo("website")}
        />
        <ContinueButton disabled={!company.trim()} onClick={() => goTo("website")} />
      </div>
    </div>
  );

  const renderWebsite = () => (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[520px]">
        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
          Step 2 of 5
        </span>
        <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase text-white mb-2">
          What&apos;s your<br />website?
        </h2>
        <p className="text-sm text-zinc-500 font-sans mb-8">We&apos;ll scan this for your audit.</p>
        <UnderlineInput
          value={website}
          onChange={setWebsite}
          placeholder="www.yourcompany.com"
          autoFocus
          onSubmit={() => website.trim() && goTo("email")}
        />
        <ContinueButton disabled={!website.trim()} onClick={() => goTo("email")} />
      </div>
    </div>
  );

  const renderEmail = () => {
    const validEmail = email.includes("@") && email.includes(".");
    const handleEmailSubmit = () => {
      if (!validEmail) return;
      // FIRE WEBHOOK — lead is captured
      fireWebhook({
        email: email.trim(),
        company: company.trim(),
        website: website.trim().startsWith("http") ? website.trim() : `https://${website.trim()}`,
        need: "AI Ad Audit",
        source: "ads-audit-quiz",
        step: "email-captured",
      });
      saveLead();
      goTo("adSpend");
    };

    return (
      <div className="h-[100dvh] w-full flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-[520px]">
          <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
            Step 3 of 5
          </span>
          <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase text-white mb-2">
            Where should we<br />send your <span className="shimmer-text">report?</span>
          </h2>
          <p className="text-sm text-zinc-500 font-sans mb-8">No spam. No sales calls. Just your report.</p>
          <UnderlineInput
            value={email}
            onChange={setEmail}
            placeholder="you@company.com"
            type="email"
            autoFocus
            onSubmit={handleEmailSubmit}
          />
          <ContinueButton disabled={!validEmail} onClick={handleEmailSubmit} />
        </div>
      </div>
    );
  };

  const renderAdSpend = () => (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[520px]">
        <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
          Step 4 of 5
        </span>
        <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase text-white mb-8">
          What&apos;s your monthly<br />ad spend?
        </h2>
        <div className="flex flex-col gap-3">
          {AD_SPEND_OPTIONS.map((opt) => (
            <OptionCard
              key={opt}
              label={opt}
              selected={adSpend === opt}
              onClick={() => selectAndAdvance(setAdSpend, opt, "challenge")}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderChallenge = () => {
    const handleSelect = (opt: string) => {
      setChallenge(opt);
      // Fire qualifying webhook
      fireWebhook({
        email: email.trim(),
        company: company.trim(),
        website: website.trim().startsWith("http") ? website.trim() : `https://${website.trim()}`,
        adSpend,
        challenge: opt,
        source: "ads-audit-quiz",
        step: "quiz-completed",
      });
      setTimeout(() => {
        goTo("analyzing");
        startAnalysis();
      }, 350);
    };

    return (
      <div className="h-[100dvh] w-full flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-[520px]">
          <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
            Step 5 of 5
          </span>
          <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase text-white mb-8">
            What&apos;s your biggest<br />challenge?
          </h2>
          <div className="flex flex-col gap-3">
            {CHALLENGE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt}
                label={opt}
                selected={challenge === opt}
                onClick={() => handleSelect(opt)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAnalyzing = () => (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[520px]">
        <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase text-white mb-2 text-center">
          Analyzing<br />your <span className="shimmer-text">business...</span>
        </h2>
        <p className="text-sm text-zinc-500 font-sans mb-10 text-center">
          Scanning {company || "your company"} across 10 pillars
        </p>

        {/* Checklist */}
        <div className="flex flex-col gap-3 mb-10">
          {ANALYSIS_STEPS.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= activeCheckIdx ? 1 : 0.2,
                x: 0,
              }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                i < activeCheckIdx
                  ? "border-emerald-400 bg-emerald-400/10"
                  : i === activeCheckIdx
                    ? "border-white/40"
                    : "border-white/10"
              }`}>
                {i < activeCheckIdx && (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-3 h-3 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <motion.path d="M5 12l5 5L19 7" />
                  </motion.svg>
                )}
                {i === activeCheckIdx && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white/60"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              <span className={`text-sm font-sans transition-colors duration-300 ${
                i < activeCheckIdx
                  ? "text-zinc-300"
                  : i === activeCheckIdx
                    ? "text-white"
                    : "text-zinc-600"
              }`}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/60 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {analysisState === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-red-400 font-sans">{errorMsg}</p>
            <button
              type="button"
              onClick={() => { setAnalysisState("idle"); startAnalysis(); }}
              className="mt-3 text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white font-sans transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[560px] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">
            {company ? `${company}'s` : "Your"} Report
          </span>
          <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase text-white mb-3">
            Your report is<br /><span className="shimmer-text">ready.</span>
          </h2>

          {overallGrade && (
            <div className="my-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans">
                Overall Grade
              </span>
              <div className="text-6xl md:text-8xl font-wide font-bold shimmer-text mt-2">
                {overallGrade}
              </div>
            </div>
          )}

          {errorMsg && !reportUrl && (
            <p className="text-sm text-zinc-400 font-sans mb-8">{errorMsg}</p>
          )}

          <div className="flex flex-col gap-4 mt-8">
            {reportUrl && (
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-10 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans text-center hover:bg-white/90 transition-all duration-300"
              >
                View Full Report
              </a>
            )}
            <a
              href="https://calendly.com/mynewstaff/strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-10 py-5 border border-white text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans text-center hover:bg-white hover:text-black transition-all duration-300"
            >
              Book a Free Strategy Call
            </a>
          </div>

          <p className="mt-8 text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans">
            Report also sent to {email || "your email"}
          </p>
        </motion.div>
      </div>
    </div>
  );

  const stepRenderers: Record<Step, () => React.ReactNode> = {
    hook: renderHook,
    company: renderCompany,
    website: renderWebsite,
    email: renderEmail,
    adSpend: renderAdSpend,
    challenge: renderChallenge,
    analyzing: renderAnalyzing,
    results: renderResults,
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ProgressBar current={step} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {stepRenderers[step]()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
