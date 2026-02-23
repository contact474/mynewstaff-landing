"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QuizData {
  firstName: string;
  email: string;
  need: string;
}

interface QuizContextValue {
  openQuiz: (source?: string) => void;
  closeQuiz: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const QuizContext = createContext<QuizContextValue | null>(null);

export const useQuiz = (): QuizContextValue => {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error("useQuiz must be used inside <QuizProvider>");
  }
  return ctx;
};

// ---------------------------------------------------------------------------
// Constants — Quick Quiz (3 steps: name+email, need, redirect)
// ---------------------------------------------------------------------------

const TOTAL_STEPS = 2; // 0 = name+email, 1 = need selection → auto-submit

const NEED_OPTIONS = [
  { label: "Free AI scalability audit", route: "/audit" },
  { label: "More leads & closed deals", route: "/mission-control" },
  { label: "AI video content at scale", route: "/videos" },
  { label: "Not sure yet — show me everything", route: "/scale" },
];

const CALENDLY_URL = "https://calendly.com/contact-mynewstaff/30min";
const WEBHOOK_URL = "https://hooks.mynewstaff.ai/mission-control-apply";

// ---------------------------------------------------------------------------
// Slide animation variants
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (direction: 1 | -1) => ({
    x: direction === 1 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: 1 | -1) => ({
    x: direction === 1 ? -48 : 48,
    opacity: 0,
  }),
};

const slideTransition = {
  duration: 0.28,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const UnderlineInput = ({
  type = "text",
  value,
  onChange,
  placeholder,
  onKeyDown,
  autoFocus,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    onKeyDown={onKeyDown}
    autoFocus={autoFocus}
    autoComplete="off"
    className="
      w-full bg-transparent border-0 border-b-2 border-[#333]
      text-white text-[22px] font-sans py-3 outline-none
      placeholder:text-[#444] placeholder:font-sans
      focus:border-white transition-colors duration-200
    "
  />
);

const OptionCard = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      text-left px-5 py-4 border font-sans text-sm tracking-wide
      transition-all duration-150 cursor-pointer
      ${
        selected
          ? "border-white bg-[#1a1a1a] text-white"
          : "border-white/10 bg-[#111] text-white/70 hover:border-[#444] hover:text-white"
      }
    `}
  >
    {label}
  </button>
);

// ---------------------------------------------------------------------------
// QuizModal inner — LOW FRICTION: only name, email, need
// ---------------------------------------------------------------------------

interface QuizModalInnerProps {
  source: string;
  onClose: () => void;
}

const QuizModalInner = ({ source, onClose }: QuizModalInnerProps) => {
  // Load saved data from localStorage on mount
  const getInitialData = (): QuizData => {
    try {
      const stored = localStorage.getItem("mns-lead");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          firstName: parsed.firstName || "",
          email: parsed.email || "",
          need: "",
        };
      }
    } catch { /* */ }
    return { firstName: "", email: "", need: "" };
  };

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<QuizData>(getInitialData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectLabel, setRedirectLabel] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const update = (field: keyof QuizData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const goForward = useCallback(() => {
    setDirection(1);
    setStep((s) => s + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => s - 1);
  }, []);

  // When need is selected → fire webhook + redirect to right LP with prefilled params
  const handleNeedSelect = async (needLabel: string, route: string) => {
    update("need", needLabel);
    setIsSuccess(true);

    const labels: Record<string, string> = {
      "/scale": "your growth blueprint",
      "/videos": "your content engine",
      "/mission-control": "the full revenue machine",
    };
    setRedirectLabel(labels[route] || "your personalized plan");

    // Fire webhook in background (don't block redirect)
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          email: data.email,
          need: needLabel,
          source,
          step: "quick-quiz",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Swallow
    }

    // Store in localStorage so LP forms can prefill
    try {
      localStorage.setItem("mns-lead", JSON.stringify({
        firstName: data.firstName,
        email: data.email,
        need: needLabel,
      }));
    } catch {
      // Swallow
    }

    // Redirect after brief success screen
    setTimeout(() => {
      window.location.href = `${route}?name=${encodeURIComponent(data.firstName)}&email=${encodeURIComponent(data.email)}&need=${encodeURIComponent(needLabel)}`;
    }, 1800);
  };

  const canContinue = (): boolean => {
    if (step === 0) {
      return data.firstName.trim().length > 0 && data.email.includes("@");
    }
    return false;
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && canContinue()) goForward();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <motion.div
      ref={overlayRef}
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-[12px] flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-[580px] p-8 md:p-12 overflow-hidden"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#444] hover:text-white transition-colors duration-150 text-xl font-light font-sans"
          aria-label="Close"
        >
          ×
        </button>

        {/* Success screen */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-8 gap-6"
          >
            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <motion.path d="M5 12l5 5L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15 }} />
              </svg>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-3 font-sans">
                Perfect, {data.firstName}
              </p>
              <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">
                Let&apos;s Go
              </h2>
            </div>
            <p className="text-sm text-zinc-400 font-sans max-w-[340px] leading-relaxed">
              Taking you to {redirectLabel}&hellip;
            </p>
            <div className="w-full h-px bg-white/5 mt-2" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans">
              mynewstaff.ai
            </p>
          </motion.div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="flex gap-1 mb-8">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div
                  key={i}
                  className={`h-[3px] flex-1 transition-colors duration-300 ${
                    i < step ? "bg-white" : i === step ? "bg-white/40" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-6 font-sans">
              Step {step + 1} of {TOTAL_STEPS}
            </p>

            <div className="relative overflow-hidden min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className="w-full"
                >
                  {step === 0 && (
                    <div className="flex flex-col gap-6">
                      <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">
                        Let&apos;s get started
                      </h2>
                      <UnderlineInput
                        value={data.firstName}
                        onChange={(v) => update("firstName", v)}
                        placeholder="First name"
                        onKeyDown={handleEnter}
                        autoFocus
                      />
                      <UnderlineInput
                        type="email"
                        value={data.email}
                        onChange={(v) => update("email", v)}
                        placeholder="you@company.com"
                        onKeyDown={handleEnter}
                      />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex flex-col gap-6">
                      <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">
                        What do you need?
                      </h2>
                      <div className="flex flex-col gap-2">
                        {NEED_OPTIONS.map((opt) => (
                          <OptionCard
                            key={opt.label}
                            label={opt.label}
                            selected={data.need === opt.label}
                            onClick={() => handleNeedSelect(opt.label, opt.route)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-[#444] hover:text-white text-[10px] tracking-[0.3em] uppercase font-sans transition-colors duration-150"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step === 0 && (
                <button
                  type="button"
                  onClick={goForward}
                  disabled={!canContinue()}
                  className="bg-white text-black text-[11px] font-bold uppercase tracking-[0.25em] px-8 py-3 font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors duration-150"
                >
                  Continue
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Full Application Form — for /scale and /videos pages
// Reads prefilled data from URL params + localStorage
// ---------------------------------------------------------------------------

export interface FullFormData {
  firstName: string;
  email: string;
  need: string;
  phone: string;
  company: string;
  industry: string;
  revenue: string;
  bottleneck: string;
}

const INDUSTRY_OPTIONS = [
  "Real Estate", "Legal Services", "Healthcare", "SaaS / Tech",
  "E-commerce", "Financial Services", "Marketing Agency", "Hospitality",
  "Education / Coaching", "Construction", "Other",
];

const REVENUE_OPTIONS = [
  "Under $10K/mo", "$10K–$50K", "$50K–$100K", "$100K–$500K", "$500K+",
];

const FULL_FORM_STEPS = 5; // phone, company, industry, revenue, bottleneck

interface FullFormModalInnerProps {
  source: string;
  prefill: { firstName: string; email: string; need: string };
  onClose: () => void;
}

const FullFormModalInner = ({ source, prefill, onClose }: FullFormModalInnerProps) => {
  // Load saved full form data from localStorage, merge with prefill
  const getInitialData = (): FullFormData => {
    const base: FullFormData = {
      firstName: prefill.firstName,
      email: prefill.email,
      need: prefill.need,
      phone: "",
      company: "",
      industry: "",
      revenue: "",
      bottleneck: "",
    };
    try {
      const stored = localStorage.getItem("mns-full");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          firstName: prefill.firstName || parsed.firstName || "",
          email: prefill.email || parsed.email || "",
          need: prefill.need || parsed.need || "",
          phone: parsed.phone || "",
          company: parsed.company || "",
          industry: parsed.industry || "",
          revenue: parsed.revenue || "",
          bottleneck: parsed.bottleneck || "",
        };
      }
    } catch { /* */ }
    return base;
  };

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<FullFormData>(getInitialData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Persist to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem("mns-full", JSON.stringify(data)); } catch { /* */ }
  }, [data]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const update = (field: keyof FullFormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const goForward = useCallback(() => {
    setDirection(1);
    setStep((s) => s + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => s - 1);
  }, []);

  const selectAndAdvance = (field: keyof FullFormData, value: string) => {
    update(field, value);
    setTimeout(() => {
      setDirection(1);
      setStep((s) => s + 1);
    }, 300);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source,
          step: "full-application",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Swallow
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Clear localStorage lead data
      try { localStorage.removeItem("mns-lead"); } catch { /* */ }
      setTimeout(() => {
        window.location.href = CALENDLY_URL;
      }, 2500);
    }
  };

  const canContinue = (): boolean => {
    switch (step) {
      case 0: return data.phone.trim().length > 0;
      case 1: return data.company.trim().length > 0;
      case 2: return data.industry.length > 0;
      case 3: return data.revenue.length > 0;
      case 4: return true; // bottleneck optional
      default: return false;
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && canContinue() && step < 4) goForward();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <motion.div
      ref={overlayRef}
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-[12px] flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-[580px] p-8 md:p-12 overflow-hidden"
      >
        <button type="button" onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#444] hover:text-white transition-colors duration-150 text-xl font-light font-sans" aria-label="Close">×</button>

        {isSuccess ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center text-center py-8 gap-6">
            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <motion.path d="M5 12l5 5L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15 }} />
              </svg>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-3 font-sans">Application Received</p>
              <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">You&apos;re In, {data.firstName}</h2>
            </div>
            <p className="text-sm text-zinc-400 font-sans max-w-[340px] leading-relaxed">Redirecting you to book your strategy call&hellip;</p>
            <div className="w-full h-px bg-white/5 mt-2" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans">mynewstaff.ai</p>
          </motion.div>
        ) : (
          <>
            {/* Greeting */}
            {data.firstName && (
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2 font-sans">
                Welcome back, {data.firstName}
              </p>
            )}

            <div className="flex gap-1 mb-8">
              {Array.from({ length: FULL_FORM_STEPS }, (_, i) => (
                <div key={i} className={`h-[3px] flex-1 transition-colors duration-300 ${i < step ? "bg-white" : i === step ? "bg-white/40" : "bg-white/10"}`} />
              ))}
            </div>

            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-6 font-sans">
              Step {step + 1} of {FULL_FORM_STEPS}
            </p>

            <div className="relative overflow-hidden min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full">
                  {step === 0 && (
                    <div className="flex flex-col gap-6">
                      <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">Best phone number?</h2>
                      <UnderlineInput type="tel" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 000-0000" onKeyDown={handleEnter} autoFocus />
                      <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-600 font-sans">WhatsApp preferred</p>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="flex flex-col gap-6">
                      <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">Company name</h2>
                      <UnderlineInput value={data.company} onChange={(v) => update("company", v)} placeholder="Your company" onKeyDown={handleEnter} autoFocus />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col gap-6">
                      <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">What industry?</h2>
                      <div className="grid grid-cols-2 gap-2">
                        {INDUSTRY_OPTIONS.map((opt) => (
                          <OptionCard key={opt} label={opt} selected={data.industry === opt} onClick={() => selectAndAdvance("industry", opt)} />
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="flex flex-col gap-6">
                      <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">Monthly revenue?</h2>
                      <div className="flex flex-col gap-2">
                        {REVENUE_OPTIONS.map((opt) => (
                          <OptionCard key={opt} label={opt} selected={data.revenue === opt} onClick={() => selectAndAdvance("revenue", opt)} />
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="flex flex-col gap-6">
                      <h2 className="font-wide text-2xl md:text-3xl font-black text-white uppercase leading-tight">Biggest bottleneck?</h2>
                      <textarea
                        value={data.bottleneck}
                        onChange={(e) => update("bottleneck", e.target.value)}
                        placeholder="What's holding your growth back right now?"
                        rows={4}
                        autoFocus
                        className="w-full bg-transparent border-0 border-b-2 border-[#333] text-white text-base font-sans py-3 outline-none resize-none placeholder:text-[#444] placeholder:font-sans focus:border-white transition-colors duration-200 leading-relaxed"
                      />
                      <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-600 font-sans">Optional — helps us prepare</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-8 gap-4">
              {step > 0 ? (
                <button type="button" onClick={goBack} className="text-[#444] hover:text-white text-[10px] tracking-[0.3em] uppercase font-sans transition-colors duration-150">← Back</button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button type="button" onClick={goForward} disabled={!canContinue()} className="bg-white text-black text-[11px] font-bold uppercase tracking-[0.25em] px-8 py-3 font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors duration-150">
                  Continue
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="bg-white text-black text-[11px] font-bold uppercase tracking-[0.25em] px-8 py-3 font-sans disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors duration-150">
                  {isSubmitting ? "Sending..." : "Submit Application"}
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Exported: useFullForm hook for LP pages
// ---------------------------------------------------------------------------

export const useFullForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState({ firstName: "", email: "", need: "" });
  const [source, setSource] = useState("");

  const openFullForm = useCallback((src: string, pre?: { firstName: string; email: string; need: string }) => {
    setSource(src);
    if (pre) setPrefill(pre);
    setIsOpen(true);
  }, []);

  const closeFullForm = useCallback(() => setIsOpen(false), []);

  const FullFormModal = () => (
    <AnimatePresence>
      {isOpen && (
        <FullFormModalInner key="full-form" source={source} prefill={prefill} onClose={closeFullForm} />
      )}
    </AnimatePresence>
  );

  return { openFullForm, closeFullForm, FullFormModal, setPrefill };
};

// ---------------------------------------------------------------------------
// Helper: read lead data from localStorage
// ---------------------------------------------------------------------------

function getStoredLead(): { firstName: string; email: string; need: string } {
  try {
    const stored = localStorage.getItem("mns-lead");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        firstName: parsed.firstName || "",
        email: parsed.email || "",
        need: parsed.need || "",
      };
    }
  } catch { /* */ }
  return { firstName: "", email: "", need: "" };
}

// Landing pages where we should show the full form instead of quick quiz
const FULL_FORM_PAGES = ["/scale", "/videos", "/audit"];

// ---------------------------------------------------------------------------
// QuizProvider — wraps entire app, smart about which form to show
// On homepage: quick quiz → routes to LP
// On /scale or /videos: full application form (prefilled from localStorage)
// ---------------------------------------------------------------------------

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [fullFormOpen, setFullFormOpen] = useState(false);
  const [source, setSource] = useState("");
  const [fullFormPrefill, setFullFormPrefill] = useState({ firstName: "", email: "", need: "" });

  const openQuiz = useCallback((src?: string) => {
    const s = src ?? "";
    setSource(s);

    // Check if we're on a landing page — if so, show full form directly
    const path = window.location.pathname;
    if (FULL_FORM_PAGES.includes(path)) {
      const lead = getStoredLead();
      setFullFormPrefill(lead);
      setFullFormOpen(true);
    } else {
      setQuizOpen(true);
    }
  }, []);

  const closeQuiz = useCallback(() => {
    setQuizOpen(false);
    setFullFormOpen(false);
  }, []);

  return (
    <QuizContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
      <AnimatePresence>
        {quizOpen && (
          <QuizModalInner key="quiz-modal" source={source} onClose={closeQuiz} />
        )}
        {fullFormOpen && (
          <FullFormModalInner key="full-form-modal" source={source} prefill={fullFormPrefill} onClose={closeQuiz} />
        )}
      </AnimatePresence>
    </QuizContext.Provider>
  );
};
