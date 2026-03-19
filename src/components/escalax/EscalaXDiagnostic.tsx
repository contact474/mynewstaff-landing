"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  FunnelAnalysis,
  OfferAnalysis,
  PositioningAnalysis,
  AdIntelligence,
  Recommendation,
} from "@/lib/escalax/types";
import { t, tr, type Locale } from "@/lib/escalax/i18n";
import { useAuth, useSubscription } from "@/lib/supabase/auth-context";
import { hasAccess } from "@/lib/tiers";
import Link from "next/link";

/* ─── Types ────────────────────────────────────────────────────────── */

type Step = "hero" | "input" | "analyzing" | "discovery" | "q1" | "q2" | "q3" | "q4" | "q5" | "email" | "results";

interface TrackedTool { tool: string; id: string | null; category: string }
interface SocialProfile { platform: string; url: string }
interface SecurityHeader { header: string; present: boolean; value: string | null }

interface Findings {
  title: string;
  description: string;
  ogImage: string | null;
  language: string | null;
  generator: string | null;
  themeColor: string | null;
  hasOG: boolean;
  hasTwitterCard: boolean;
  socialLinks: SocialProfile[];
  trackedTools: TrackedTool[];
  analytics: string[];
  pixels: string[];
  crm: string | null;
  chat: string | null;
  marketingTools: string[];
  retargetingTools: string[];
  abTestingTools: string[];
  popupTools: string[];
  bookingTools: string[];
  privacyTools: string[];
  seoTools: string[];
  reviewPlatforms: string[];
  hasTestimonials: boolean;
  ecommerce: string | null;
  paymentGateways: string[];
  conversionEvents: string[];
  formCount: number;
  formDestinations: string[];
  hasCTAs: boolean;
  hasBlog: boolean;
  hasVideo: boolean;
  hasPodcast: boolean;
  imageCount: number;
  techStack: string[];
  fonts: string[];
  externalScriptDomains: string[];
  businessName: string | null;
  businessType: string | null;
  businessPhone: string | null;
  businessAddress: string | null;
  businessRating: string | null;
  structuredDataTypes: string[];
  hasCanonical: boolean;
  hasSchema: boolean;
  hasMobileViewport: boolean;
  hasMultiLang: boolean;
  hasAMP: boolean;
  ssl: boolean;
  loadTime: number;
  scriptCount: number;
  stylesheetCount: number;
  hasLazyLoading: boolean;
  hasWebP: boolean;
  hasPWA: boolean;
  h1Count: number;
  headingStructure: string;
  imgWithoutAlt: number;
  ariaCount: number;
  // Header analysis
  securityHeaders: SecurityHeader[];
  cdnProvider: string | null;
  serverHeader: string | null;
  poweredBy: string | null;
  hasCompression: boolean;
  compressionType: string | null;
  securityScore: number;
  // DNS
  mxRecords: string[];
  emailProvider: string | null;
  hasSPF: boolean;
  spfSenders: string[];
  hasDMARC: boolean;
  dmarcPolicy: string | null;
  dnsVerifications: string[];
  // Sitemap
  hasSitemap: boolean;
  sitemapPageCount: number;
  sitemapSections: string[];
  hasRobotsTxt: boolean;
  robotsDirectives: string[];
  // Meta
  domain: string;
  totalSignals: number;
  error?: string;
}

interface Scores {
  digital_presence: number;
  website_conversion: number;
  content_strategy: number;
  lead_generation: number;
  marketing_automation: number;
  advertising: number;
  sales_process: number;
  customer_journey: number;
  tech_ai_readiness: number;
  revenue_operations: number;
}

interface AnalysisResult {
  scores: Scores;
  findings: Findings;
  funnel?: FunnelAnalysis;
  offer?: OfferAnalysis;
  positioning?: PositioningAnalysis;
  adIntel?: AdIntelligence;
  recommendations?: Recommendation[];
  meta: { url: string; status: number; loadTime: number; domain: string; locale?: Locale; pagesCrawled?: number; version?: string };
}

/* ─── Constants ────────────────────────────────────────────────────── */

const PILLAR_LABELS: Record<keyof Scores, string> = {
  digital_presence: "Digital Presence",
  website_conversion: "Website Conversion",
  content_strategy: "Content Strategy",
  lead_generation: "Lead Generation",
  marketing_automation: "Marketing Automation",
  advertising: "Advertising",
  sales_process: "Sales Process",
  customer_journey: "Customer Journey",
  tech_ai_readiness: "Tech & AI Readiness",
  revenue_operations: "Revenue Operations",
};

const PILLAR_KEYS = Object.keys(PILLAR_LABELS) as (keyof Scores)[];

const PILLAR_WEIGHTS: Record<keyof Scores, number> = {
  digital_presence: 1.0, website_conversion: 1.2, content_strategy: 1.1, lead_generation: 1.3,
  marketing_automation: 1.2, advertising: 1.0, sales_process: 1.1, customer_journey: 0.9,
  tech_ai_readiness: 1.0, revenue_operations: 1.2,
};

const QUESTIONS: { id: string; question: string; options: { label: string; impacts: Partial<Record<keyof Scores, number>> }[] }[] = [
  { id: "leads", question: "How many leads does your business generate per month?", options: [
    { label: "0\u201310", impacts: { lead_generation: -1, sales_process: -1 } },
    { label: "11\u201350", impacts: { lead_generation: 0, sales_process: 0.5 } },
    { label: "51\u2013200", impacts: { lead_generation: 1.5, sales_process: 1 } },
    { label: "200+", impacts: { lead_generation: 3, sales_process: 2 } },
  ] },
  { id: "crm", question: "Do you use a CRM to manage your sales pipeline?", options: [
    { label: "No CRM", impacts: { sales_process: -2, revenue_operations: -1.5, marketing_automation: -1 } },
    { label: "Spreadsheets", impacts: { sales_process: -0.5, revenue_operations: -0.5 } },
    { label: "Basic CRM", impacts: { sales_process: 1, revenue_operations: 1, marketing_automation: 0.5 } },
    { label: "Advanced CRM (HubSpot, SF)", impacts: { sales_process: 2, revenue_operations: 2, marketing_automation: 1.5 } },
  ] },
  { id: "budget", question: "What\u2019s your monthly marketing & advertising budget?", options: [
    { label: "Under $500", impacts: { advertising: -1, content_strategy: -0.5 } },
    { label: "$500 \u2013 $2,000", impacts: { advertising: 0.5, content_strategy: 0.5 } },
    { label: "$2,000 \u2013 $10,000", impacts: { advertising: 1.5, content_strategy: 1 } },
    { label: "$10,000+", impacts: { advertising: 2.5, content_strategy: 1.5 } },
  ] },
  { id: "content", question: "How often do you publish content (blog, social, video)?", options: [
    { label: "Rarely / never", impacts: { content_strategy: -2, digital_presence: -1, customer_journey: -0.5 } },
    { label: "A few times per month", impacts: { content_strategy: 0.5, digital_presence: 0.5 } },
    { label: "Weekly", impacts: { content_strategy: 1.5, digital_presence: 1, customer_journey: 0.5 } },
    { label: "Daily", impacts: { content_strategy: 2.5, digital_presence: 1.5, customer_journey: 1 } },
  ] },
  { id: "challenge", question: "What\u2019s your biggest growth challenge right now?", options: [
    { label: "Getting found online", impacts: { digital_presence: -1.5, advertising: -0.5 } },
    { label: "Converting visitors to leads", impacts: { website_conversion: -1.5, lead_generation: -1 } },
    { label: "Closing deals faster", impacts: { sales_process: -1.5, customer_journey: -0.5 } },
    { label: "Scaling without more headcount", impacts: { marketing_automation: -1, tech_ai_readiness: -1, revenue_operations: -0.5 } },
  ] },
];

const ANALYZING_STEPS = [
  "Connecting to your website...",
  "Scanning page structure & metadata...",
  "Extracting structured business data...",
  "Detecting 100+ marketing tools...",
  "Extracting tracking pixel IDs...",
  "Probing DNS & email infrastructure...",
  "Testing security headers...",
  "Mapping sitemap & content strategy...",
  "Analyzing social media footprint...",
  "Scanning ad platforms & retargeting...",
  "Running accessibility audit...",
  "Calculating your ScaleX Score...",
];

const WEBHOOK_URL = "https://hooks.mynewstaff.ai/mission-control-apply";

/* ─── Helpers ──────────────────────────────────────────────────────── */

function getZone(score: number, loc: Locale = "en") {
  if (score < 40) return { label: loc === "es" ? "Zona Roja" : "Red Zone", color: "#EF4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" };
  if (score < 60) return { label: loc === "es" ? "Zona de Riesgo" : "Risk Zone", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" };
  if (score < 80) return { label: loc === "es" ? "Zona de Crecimiento" : "Growth Zone", color: "#3B82F6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" };
  return { label: loc === "es" ? "Zona de Dominio" : "Dominance Zone", color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" };
}

function computeOverallScore(scores: Scores): number {
  let total = 0, weightSum = 0;
  for (const key of PILLAR_KEYS) { total += scores[key] * PILLAR_WEIGHTS[key]; weightSum += PILLAR_WEIGHTS[key]; }
  return Math.round((total / weightSum) * 10);
}

function getTopIssues(scores: Scores, n: number) {
  return PILLAR_KEYS.map((k) => ({ key: k, score: scores[k], label: PILLAR_LABELS[k] })).sort((a, b) => a.score - b.score).slice(0, n);
}

function estimateRevenueLeak(overall: number): string {
  if (overall < 30) return "40\u201360%";
  if (overall < 50) return "25\u201340%";
  if (overall < 70) return "10\u201325%";
  return "5\u201310%";
}

/** Build the "scary" discovery highlights from findings */
function buildDiscoveryHighlights(f: Findings): string[] {
  const highlights: string[] = [];

  // Tracked tools with IDs — MOST impressive
  for (const t of (f.trackedTools || [])) {
    if (t.id) highlights.push(`${t.tool}: ${t.id}`);
  }

  // Email provider from DNS
  if (f.emailProvider) highlights.push(`Email: ${f.emailProvider}`);

  // SPF authorized senders — shows we probed their DNS
  if (f.spfSenders?.length > 0) highlights.push(`Authorized email senders: ${f.spfSenders.join(", ")}`);

  // Security findings
  if (f.securityHeaders) {
    const missing = f.securityHeaders.filter(h => !h.present).length;
    if (missing > 0) highlights.push(`${missing} security headers missing`);
  }

  // Business intelligence from JSON-LD
  if (f.businessPhone) highlights.push(`Business phone: ${f.businessPhone}`);
  if (f.businessAddress) highlights.push(`Business address: ${f.businessAddress}`);
  if (f.businessRating) highlights.push(`Rating: ${f.businessRating}`);

  // CDN
  if (f.cdnProvider) highlights.push(`CDN: ${f.cdnProvider}`);

  // CRM
  if (f.crm) highlights.push(`CRM: ${f.crm}`);

  // Chat
  if (f.chat) highlights.push(`Chat: ${f.chat}`);

  // Sitemap
  if (f.sitemapPageCount > 0) highlights.push(`${f.sitemapPageCount} pages indexed`);

  // Social
  for (const s of (f.socialLinks || []).slice(0, 3)) {
    highlights.push(`${s.platform}: ${s.url}`);
  }

  // Tech
  if (f.techStack?.length > 0) highlights.push(`Stack: ${f.techStack.join(", ")}`);

  // DMARC policy
  if (f.hasDMARC && f.dmarcPolicy) highlights.push(`DMARC policy: ${f.dmarcPolicy}`);
  else if (f.hasDMARC === false) highlights.push("No DMARC record \u2014 email spoofing risk");

  // Conversion events
  for (const ev of (f.conversionEvents || []).slice(0, 2)) {
    highlights.push(`Tracking: ${ev}`);
  }

  // External scripts
  if (f.externalScriptDomains?.length > 5) highlights.push(`${f.externalScriptDomains.length} third-party scripts loaded`);

  return highlights.slice(0, 12);
}

/* ─── Radar Chart ──────────────────────────────────────────────────── */

function RadarChart({ scores, animate }: { scores: Scores; animate: boolean }) {
  const cx = 160, cy = 160, R = 120;
  const levels = [0.25, 0.5, 0.75, 1.0];
  const angleStep = (2 * Math.PI) / PILLAR_KEYS.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 10) * R;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPolygons = levels.map((lvl) => PILLAR_KEYS.map((_, i) => { const p = getPoint(i, lvl * 10); return `${p.x},${p.y}`; }).join(" "));
  const dataPoints = PILLAR_KEYS.map((k, i) => getPoint(i, scores[k]));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const axisEnds = PILLAR_KEYS.map((_, i) => getPoint(i, 10));
  const shortLabels: Record<keyof Scores, string> = { digital_presence: "DP", website_conversion: "WC", content_strategy: "CS", lead_generation: "LG", marketing_automation: "MA", advertising: "AD", sales_process: "SP", customer_journey: "CJ", tech_ai_readiness: "TA", revenue_operations: "RO" };

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[320px] mx-auto">
      {gridPolygons.map((pts, i) => (<polygon key={i} points={pts} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />))}
      {axisEnds.map((end, i) => (<line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />))}
      <motion.polygon
        points={animate ? PILLAR_KEYS.map(() => `${cx},${cy}`).join(" ") : dataPolygon}
        animate={{ points: dataPolygon }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
        fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="1.5"
      />
      {dataPoints.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r={3} fill="white"
          initial={animate ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
        />
      ))}
      {PILLAR_KEYS.map((k, i) => {
        const angle = startAngle + i * angleStep;
        const labelR = R + 24;
        return (<text key={k} x={cx + labelR * Math.cos(angle)} y={cy + labelR * Math.sin(angle)} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-sans)" letterSpacing="0.08em">{shortLabels[k]}</text>);
      })}
    </svg>
  );
}

/* ─── Animated Counter ─────────────────────────────────────────────── */

function AnimatedScore({ target, zone }: { target: number; zone: ReturnType<typeof getZone> }) {
  const [value, setValue] = useState(0);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    const duration = 2000, start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start, progress = Math.min(elapsed / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [target]);

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <span className="text-[120px] md:text-[160px] font-wide font-bold leading-none tabular-nums" style={{ color: zone.color }}>{value}</span>
        <span className="absolute -top-2 -right-8 text-xl font-sans text-zinc-500">/100</span>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6 }}
        className="mt-2 inline-block px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-[0.2em] uppercase"
        style={{ background: zone.bg, color: zone.color, border: `1px solid ${zone.border}` }}>
        {zone.label}
      </motion.div>
    </div>
  );
}

/* ─── Pass/Fail Badge ──────────────────────────────────────────────── */

function StatusBadge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${pass ? "bg-emerald-400" : "bg-red-400"}`} />
      <span className="text-[10px] tracking-[0.1em] uppercase text-zinc-400 font-sans">{label}</span>
      <span className={`text-[10px] font-sans font-semibold ml-auto ${pass ? "text-emerald-400" : "text-red-400"}`}>{pass ? "PASS" : "FAIL"}</span>
    </div>
  );
}

/* ─── Step Transition ──────────────────────────────────────────────── */

const stepVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export function EscalaXDiagnostic() {
  const [step, setStep] = useState<Step>("hero");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [finalScores, setFinalScores] = useState<Scores | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [discoveryHighlights, setDiscoveryHighlights] = useState<string[]>([]);
  const [locale, setLocale] = useState<Locale>("en");
  const [scanSaved, setScanSaved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auth + tier gating
  const { user } = useAuth();
  const { tier } = useSubscription();
  const isAuthenticated = !!user;
  const canSeeFullResults = hasAccess(tier, "full_results");

  // AI Advisor Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [bookCall, setBookCall] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInitRef = useRef(false);

  const scrollChatToBottom = useCallback(() => {
    requestAnimationFrame(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }));
  }, []);

  /* ── URL param pre-fill (from proposal links) ─────────────────── */
  const prefillDone = useRef(false);
  useEffect(() => {
    if (prefillDone.current) return;
    prefillDone.current = true;
    const params = new URLSearchParams(window.location.search);
    const pCompany = params.get("company");
    const pUrl = params.get("url");
    if (pCompany || pUrl) {
      if (pCompany) setCompany(pCompany);
      if (pUrl) setUrl(pUrl.startsWith("http") ? pUrl : `https://${pUrl}`);
      setStep("input");
    }
  }, []);

  // Build scan context string for the AI
  const buildScanContextString = useCallback(() => {
    if (!finalScores || !analysisResult) return "";
    const f = analysisResult.findings;
    const lines = [
      `COMPANY: ${company || f.businessName || "Unknown"}`,
      `WEBSITE: ${analysisResult.meta.url}`,
      `OVERALL SCORE: ${overallScore}/100`,
      ``,
      `PILLAR SCORES (0-10 each):`,
      ...PILLAR_KEYS.map(k => `- ${PILLAR_LABELS[k]}: ${finalScores[k].toFixed(1)}`),
      ``,
      `TOP 3 WEAKEST PILLARS:`,
      ...getTopIssues(finalScores, 3).map((issue, i) => `${i+1}. ${issue.label}: ${issue.score.toFixed(1)}/10`),
      ``,
      `REVENUE LEAK ESTIMATE: ${estimateRevenueLeak(overallScore)} of potential revenue`,
      `TOTAL DATA POINTS FOUND: ${f.totalSignals}`,
    ];
    if (f.trackedTools?.length) lines.push(`TRACKING: ${f.trackedTools.map(t => t.tool + (t.id ? `: ${t.id}` : "")).join(", ")}`);
    if (f.emailProvider) lines.push(`EMAIL PROVIDER: ${f.emailProvider}`);
    if (f.crm) lines.push(`CRM: ${f.crm}`);
    if (f.techStack?.length) lines.push(`TECH STACK: ${f.techStack.join(", ")}`);
    if (f.securityScore !== undefined) lines.push(`SECURITY: ${f.securityScore}/7 headers`);
    if (analysisResult.positioning) {
      const p = analysisResult.positioning;
      lines.push(`POSITIONING: clarity ${p.clarityScore}/10, differentiation ${p.differentiationScore}/10`);
      if (p.primaryHeadline) lines.push(`HEADLINE: "${p.primaryHeadline}"`);
    }
    if (analysisResult.offer) {
      const o = analysisResult.offer;
      lines.push(`OFFER: clarity ${o.offerClarity}/10, strength ${o.offerStrength}/10`);
    }
    if (analysisResult.funnel) {
      const fn = analysisResult.funnel;
      lines.push(`FUNNEL: ${fn.funnelType}, completeness ${fn.completeness}%`);
      if (fn.gaps?.length) lines.push(`FUNNEL GAPS: ${fn.gaps.join(", ")}`);
    }
    return lines.join("\n");
  }, [finalScores, analysisResult, company, overallScore]);

  // Initialize chat with opening message when chat opens
  useEffect(() => {
    if (!chatOpen || chatInitRef.current || !finalScores) return;
    chatInitRef.current = true;
    const topIssues = getTopIssues(finalScores, 3);
    const opening = `I've analyzed your full ScaleX diagnostic — **${overallScore}/100** overall with ${analysisResult?.findings.totalSignals || 0} data points scanned.\n\nYour biggest gaps are **${topIssues.map(i => `${i.label} (${i.score.toFixed(1)}/10)`).join(", ")}**. That means you're likely leaving **${estimateRevenueLeak(overallScore)}** of your potential revenue on the table right now.\n\nLet's figure out exactly what's costing you money. What does your current marketing and lead generation setup look like?`;
    setChatMessages([{ role: "assistant", text: opening }]);
  }, [chatOpen, finalScores, overallScore, analysisResult]);

  // Send chat message
  const handleChatSend = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const userMsg = { role: "user" as const, text };
    const updated = [...chatMessages, userMsg];
    setChatMessages(updated);
    setChatInput("");
    setChatLoading(true);
    setTimeout(scrollChatToBottom, 50);

    try {
      const res = await fetch("/api/scalex-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map(m => ({ role: m.role, text: m.text })),
          scanContext: buildScanContextString(),
        }),
      });
      const data = await res.json();
      const reply = data.reply || "I'm having trouble connecting. Please try again.";
      setChatMessages(prev => [...prev, { role: "assistant", text: reply }]);
      if (data.bookCall) setBookCall(true);
      if (data.showPricing) setShowPricing(true);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", text: "Connection error. Please try again." }]);
    } finally {
      setChatLoading(false);
      setTimeout(scrollChatToBottom, 100);
    }
  };

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ── Analyze website ─────────────────────────────────────────── */
  const startAnalysis = async () => {
    if (!url.trim()) return;
    setStep("analyzing");
    setAnalyzingStep(0);
    scrollToTop();

    const interval = setInterval(() => {
      setAnalyzingStep((prev) => Math.min(prev + 1, ANALYZING_STEPS.length - 1));
    }, 1800);

    try {
      const resp = await fetch("/api/escalax/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data: AnalysisResult = await resp.json();
      setAnalysisResult(data);
      if (data.meta?.locale) setLocale(data.meta.locale);
      setDiscoveryHighlights(buildDiscoveryHighlights(data.findings));
    } catch {
      const emptyFindings = { title: "", description: "", ogImage: null, language: null, generator: null, themeColor: null, hasOG: false, hasTwitterCard: false, socialLinks: [], trackedTools: [], analytics: [], pixels: [], crm: null, chat: null, marketingTools: [], retargetingTools: [], abTestingTools: [], popupTools: [], bookingTools: [], privacyTools: [], seoTools: [], reviewPlatforms: [], hasTestimonials: false, ecommerce: null, paymentGateways: [], conversionEvents: [], formCount: 0, formDestinations: [], hasCTAs: false, hasBlog: false, hasVideo: false, hasPodcast: false, imageCount: 0, techStack: [], fonts: [], externalScriptDomains: [], businessName: null, businessType: null, businessPhone: null, businessAddress: null, businessRating: null, structuredDataTypes: [], hasCanonical: false, hasSchema: false, hasMobileViewport: false, hasMultiLang: false, hasAMP: false, ssl: false, loadTime: 99999, scriptCount: 0, stylesheetCount: 0, hasLazyLoading: false, hasWebP: false, hasPWA: false, h1Count: 0, headingStructure: "", imgWithoutAlt: 0, ariaCount: 0, securityHeaders: [], cdnProvider: null, serverHeader: null, poweredBy: null, hasCompression: false, compressionType: null, securityScore: 0, mxRecords: [], emailProvider: null, hasSPF: false, spfSenders: [], hasDMARC: false, dmarcPolicy: null, dnsVerifications: [], hasSitemap: false, sitemapPageCount: 0, sitemapSections: [], hasRobotsTxt: false, robotsDirectives: [], domain: "", totalSignals: 0 } as Findings;
      setAnalysisResult({
        scores: { digital_presence: 1, website_conversion: 0, content_strategy: 1, lead_generation: 0, marketing_automation: 0, advertising: 0, sales_process: 0, customer_journey: 0, tech_ai_readiness: 0, revenue_operations: 0 },
        findings: emptyFindings,
        meta: { url, status: 0, loadTime: 0, domain: "" },
      });
      setDiscoveryHighlights(["Could not reach website"]);
    }

    clearInterval(interval);
    setAnalyzingStep(ANALYZING_STEPS.length - 1);
    await new Promise((r) => setTimeout(r, 600));
    setStep("discovery");
    scrollToTop();
  };

  /* ── Answer question ─────────────────────────────────────────── */
  const answerQuestion = (qIndex: number, optionIndex: number) => {
    const q = QUESTIONS[qIndex];
    setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }));
    // If authenticated and on last question, skip email gate → go straight to results
    if (qIndex === QUESTIONS.length - 1 && isAuthenticated) {
      setTimeout(() => { showResults(); }, 300);
      return;
    }
    const nextSteps: Step[] = ["q2", "q3", "q4", "q5", "email"];
    setTimeout(() => { setStep(nextSteps[qIndex]); scrollToTop(); }, 300);
  };

  /* ── Compute final scores ────────────────────────────────────── */
  const computeFinal = useCallback(() => {
    if (!analysisResult) return;
    const base = { ...analysisResult.scores };
    for (const q of QUESTIONS) {
      const optIdx = answers[q.id];
      if (optIdx === undefined) continue;
      for (const [pillar, delta] of Object.entries(q.options[optIdx].impacts)) {
        const k = pillar as keyof Scores;
        base[k] = Math.round(Math.min(10, Math.max(0, base[k] + (delta ?? 0) * 0.4)) * 10) / 10;
      }
    }
    setFinalScores(base);
    setOverallScore(computeOverallScore(base));
  }, [analysisResult, answers]);

  /* ── Show results (shared by email submit + auth skip) ───────── */
  const showResults = () => {
    computeFinal();
    setStep("results");
    scrollToTop();
  };

  /* ── Build scan payload (shared by save + localStorage) ───── */
  const buildScanPayload = useCallback(() => {
    if (!analysisResult || !finalScores) return null;
    return {
      url: url.trim(),
      companyName: company.trim(),
      domain: analysisResult.meta.domain,
      overallScore,
      scores: finalScores,
      findings: analysisResult.findings,
      funnel: analysisResult.funnel,
      offer: analysisResult.offer,
      positioning: analysisResult.positioning,
      adIntel: analysisResult.adIntel,
      recommendations: analysisResult.recommendations,
      answers,
      meta: analysisResult.meta,
      locale,
    };
  }, [analysisResult, finalScores, overallScore, url, company, answers, locale]);

  /* ── Auto-save scan for authenticated users ────────────────── */
  useEffect(() => {
    if (step !== "results" || !isAuthenticated || scanSaved || !analysisResult || !finalScores) return;
    setScanSaved(true);
    const payload = buildScanPayload();
    if (!payload) return;
    // Clear localStorage pending scan since we're saving to DB
    try { localStorage.removeItem("scalex_pending_scan"); } catch { /* */ }
    fetch("/api/scans/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => { /* non-blocking */ });
  }, [step, isAuthenticated, scanSaved, analysisResult, finalScores, buildScanPayload]);

  /* ── Save scan to localStorage for anonymous users ─────────── */
  useEffect(() => {
    if (step !== "results" || isAuthenticated || !analysisResult || !finalScores) return;
    const payload = buildScanPayload();
    if (!payload) return;
    try { localStorage.setItem("scalex_pending_scan", JSON.stringify(payload)); } catch { /* quota */ }
  }, [step, isAuthenticated, analysisResult, finalScores, buildScanPayload]);

  /* ── Re-attach pending scan when user authenticates ─────────── */
  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const pending = localStorage.getItem("scalex_pending_scan");
      if (!pending) return;
      const payload = JSON.parse(pending);
      localStorage.removeItem("scalex_pending_scan");
      fetch("/api/scans/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => { /* non-blocking */ });
    } catch { /* non-blocking */ }
  }, [isAuthenticated]);

  /* ── Submit email + show results ─────────────────────────────── */
  const submitEmail = async () => {
    if (!email.includes("@")) return;
    try { fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName: "", email: email.trim(), company: company.trim(), website: url.trim(), need: "ScaleX Diagnostic", source: "scalex", step: "scalex-email-gate", submittedAt: new Date().toISOString() }) }); } catch { /* non-blocking */ }
    showResults();
  };

  const zone = getZone(overallScore, locale);
  const currentQ = step.startsWith("q") ? parseInt(step[1]) - 1 : -1;
  const f = analysisResult?.findings;

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-32">
      <AnimatePresence mode="wait">

        {/* ═══ HERO ════════════════════════════════════════════════════ */}
        {step === "hero" && (
          <motion.div key="hero" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-[800px] text-center">
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 mb-6">Free AI Deep Diagnostic</span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-wide font-bold uppercase leading-[0.85] mb-8">
              Know Your<br /><span className="shimmer-text">Number</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-400 font-sans max-w-[580px] mx-auto leading-relaxed mb-12">
              We deep-scan your website, probe your DNS, detect every tracking pixel, map your entire tech stack, audit your security headers, and score your business across 10 growth pillars. In seconds.
            </p>
            <button onClick={() => { setStep("input"); scrollToTop(); }} className="px-10 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors cursor-pointer">
              Get Your ScaleX Score
            </button>
            <div className="flex justify-center gap-6 md:gap-8 mt-10 flex-wrap">
              {["100+ Tools Detected", "DNS Probed", "Security Audited", "Free"].map((t, i) => (
                <span key={i} className="text-[9px] tracking-[0.25em] uppercase text-zinc-600 font-sans">{t}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ INPUT ═══════════════════════════════════════════════════ */}
        {step === "input" && (
          <motion.div key="input" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-[560px]">
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 mb-6 text-center">Step 1 of 8</span>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase leading-[0.9] text-center mb-12">Let&apos;s Scan<br />Your Business</h2>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-2">Company Name</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" className="w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-lg font-sans py-3 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200" autoFocus />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-2">Website URL</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="www.acme.com" className="w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-lg font-sans py-3 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200" onKeyDown={(e) => { if (e.key === "Enter" && url.trim()) startAnalysis(); }} />
              </div>
              <button onClick={startAnalysis} disabled={!url.trim()} className="mt-4 w-full px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors cursor-pointer">
                Deep Scan My Website
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══ ANALYZING ═══════════════════════════════════════════════ */}
        {step === "analyzing" && (
          <motion.div key="analyzing" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-[560px] text-center">
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase leading-[0.9] mb-12">Deep Scanning...</h2>
            <div className="space-y-3">
              {ANALYZING_STEPS.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={i <= analyzingStep ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }} className="flex items-center gap-3 text-left">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${i < analyzingStep ? "bg-white border-white" : i === analyzingStep ? "border-white/50 bg-transparent" : "border-[#222] bg-transparent"}`}>
                    {i < analyzingStep && (<svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>)}
                    {i === analyzingStep && (<motion.div className="w-2 h-2 rounded-full bg-white" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />)}
                  </div>
                  <span className={`text-sm font-sans transition-colors duration-300 ${i <= analyzingStep ? "text-zinc-300" : "text-zinc-700"}`}>{msg}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full bg-white/40 rounded-full" initial={{ width: "0%" }} animate={{ width: `${Math.round(((analyzingStep + 1) / ANALYZING_STEPS.length) * 100)}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
            </div>
          </motion.div>
        )}

        {/* ═══ DISCOVERY — "scary" reveal of what we found ══════════ */}
        {step === "discovery" && analysisResult && (
          <motion.div key="discovery" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-[640px] text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}>
              <span className="block text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 mb-4">Intelligence Report</span>
              <h2 className="text-4xl md:text-6xl font-wide font-bold uppercase leading-[0.85] mb-3">
                <span className="shimmer-text">{analysisResult.findings.totalSignals || 0}</span>
              </h2>
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-sans mb-10">Data points detected on {analysisResult.meta.domain}</p>
            </motion.div>

            <div className="text-left space-y-2 mb-10 border border-white/5 p-5 md:p-6 bg-white/[0.01]">
              <div className="text-[9px] tracking-[0.3em] uppercase text-zinc-600 font-sans mb-3">What we found</div>
              {discoveryHighlights.map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }} className="flex items-start gap-2.5 py-1">
                  <span className="text-emerald-400 text-xs mt-0.5 flex-shrink-0 font-mono">&gt;</span>
                  <span className="text-sm font-sans text-zinc-300 font-mono">{h}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: discoveryHighlights.length * 0.15 + 0.5 }}
              onClick={() => { setStep("q1"); scrollToTop(); }}
              className="w-full px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors cursor-pointer"
            >
              Continue Diagnostic
            </motion.button>
            <p className="text-[9px] tracking-[0.15em] uppercase text-zinc-600 font-sans mt-4">5 quick questions to refine your score</p>
          </motion.div>
        )}

        {/* ═══ QUESTIONS (q1-q5) ═══════════════════════════════════════ */}
        {currentQ >= 0 && currentQ < QUESTIONS.length && (
          <motion.div key={step} variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-[600px]">
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 mb-6 text-center">Step {currentQ + 3} of 8</span>
            <h2 className="text-2xl md:text-4xl font-wide font-bold uppercase leading-[0.9] text-center mb-10">{QUESTIONS[currentQ].question}</h2>
            <div className="flex flex-col gap-3">
              {QUESTIONS[currentQ].options.map((opt, oi) => (
                <button key={oi} onClick={() => answerQuestion(currentQ, oi)} className="group w-full text-left px-6 py-5 border border-[#222] hover:border-white/30 bg-transparent hover:bg-white/[0.02] transition-all duration-200 cursor-pointer">
                  <span className="text-base font-sans text-zinc-300 group-hover:text-white transition-colors">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-10">
              {QUESTIONS.map((_, i) => (<div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i < currentQ ? "bg-white" : i === currentQ ? "bg-white/50" : "bg-white/10"}`} />))}
            </div>
          </motion.div>
        )}

        {/* ═══ EMAIL GATE ══════════════════════════════════════════════ */}
        {step === "email" && (
          <motion.div key="email" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-[560px] text-center">
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 mb-6">Last Step</span>
            <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase leading-[0.9] mb-4">Your Intelligence<br />Report Is Ready</h2>
            <p className="text-base text-zinc-400 font-sans mb-10">Enter your email to unlock your full ScaleX diagnostic — {analysisResult?.findings.totalSignals || 0}+ data points, radar chart, security audit, email deliverability, and personalized action plan.</p>
            <div className="flex flex-col gap-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-transparent border-0 border-b-2 border-[#222] text-white text-lg font-sans py-3 outline-none placeholder:text-[#333] focus:border-white transition-colors duration-200 text-center" onKeyDown={(e) => { if (e.key === "Enter" && email.includes("@")) submitEmail(); }} autoFocus />
              <button onClick={submitEmail} disabled={!email.includes("@")} className="w-full mt-2 px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors cursor-pointer">
                Reveal My Score
              </button>
            </div>
            <p className="text-[9px] tracking-[0.15em] uppercase text-zinc-600 font-sans mt-6">No spam. Your detailed report will be sent to this email.</p>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
           RESULTS — Full Intelligence Dashboard
           ═══════════════════════════════════════════════════════════════ */}
        {step === "results" && finalScores && f && (
          <motion.div key="results" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-[900px]">

            {/* ── Score Header ─────────────────────────────────────── */}
            <div className="text-center mb-6">
              <span className="block text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-zinc-500 mb-6">
                {locale === "es" ? "EscalaX" : "ScaleX"} Intelligence Report — {company || f.businessName || "Your Business"}
              </span>
              <AnimatedScore target={overallScore} zone={zone} />
            </div>

            {/* Signal count */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mb-16">
              <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans">
                {f.totalSignals} data points analyzed across website, DNS, security & social
              </span>
            </motion.div>

            {/* ── Radar + Pillars ──────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="border border-white/5 p-6 md:p-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6 text-center">Growth Radar</h3>
                <RadarChart scores={finalScores} animate={true} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="border border-white/5 p-6 md:p-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">Pillar Scores</h3>
                <div className="space-y-3">
                  {PILLAR_KEYS.map((k, i) => {
                    const val = finalScores[k]; const pct = (val / 10) * 100;
                    const barColor = val < 4 ? "#EF4444" : val < 6 ? "#F59E0B" : val < 8 ? "#3B82F6" : "#10B981";
                    return (
                      <motion.div key={k} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.08, duration: 0.4 }}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 font-sans">{PILLAR_LABELS[k]}</span>
                          <span className="text-xs font-sans font-semibold" style={{ color: barColor }}>{val.toFixed(1)}</span>
                        </div>
                        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{ backgroundColor: barColor }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 1.2 + i * 0.08, ease: "easeOut" }} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* ── Top Issues ───────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">Top 3 Issues Holding You Back</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getTopIssues(finalScores, 3).map((issue, i) => (
                  <div key={issue.key} className="border border-red-500/10 bg-red-500/[0.03] p-5">
                    <div className="flex items-center gap-2 mb-3"><span className="text-red-400 text-2xl font-wide font-bold">{i + 1}</span><span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans">{issue.label}</span></div>
                    <div className="flex items-baseline gap-1"><span className="text-2xl font-wide font-bold text-red-400">{issue.score.toFixed(1)}</span><span className="text-xs text-zinc-600 font-sans">/10</span></div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── PAYWALL: everything below top 3 issues is gated for free users ── */}
            {!canSeeFullResults && (() => {
              // Build dynamic teaser stats from scan data
              const teaserStats: { label: string; value: string; color: string }[] = [];
              if (f.securityHeaders) {
                const fails = f.securityHeaders.filter(h => !h.present).length;
                if (fails > 0) teaserStats.push({ label: locale === "es" ? "Vulnerabilidades de seguridad" : "Security vulnerabilities", value: String(fails), color: "text-red-400" });
              }
              if (analysisResult?.funnel) {
                teaserStats.push({ label: locale === "es" ? "Embudo completado" : "Funnel completeness", value: `${analysisResult.funnel.completeness}%`, color: analysisResult.funnel.completeness >= 60 ? "text-emerald-400" : "text-red-400" });
              }
              if (analysisResult?.recommendations) {
                const critical = analysisResult.recommendations.filter(r => r.priority === "critical" || r.priority === "high").length;
                if (critical > 0) teaserStats.push({ label: locale === "es" ? "Acciones urgentes" : "Urgent actions needed", value: String(critical), color: "text-amber-400" });
              }
              if (f.trackedTools) {
                teaserStats.push({ label: locale === "es" ? "Herramientas detectadas" : "Tools detected", value: String(f.trackedTools.length), color: "text-blue-400" });
              }
              if (analysisResult?.offer) {
                teaserStats.push({ label: locale === "es" ? "Fortaleza de oferta" : "Offer strength", value: `${analysisResult.offer.offerStrength}/10`, color: analysisResult.offer.offerStrength >= 6 ? "text-emerald-400" : "text-red-400" });
              }

              return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.6 }} className="relative mb-8">
                  <div className="blur-sm pointer-events-none select-none opacity-40" aria-hidden="true">
                    <div className="border border-white/5 p-6 md:p-8 mb-8 h-40" />
                    <div className="border border-white/5 p-6 md:p-8 mb-8 h-40" />
                    <div className="border border-white/5 p-6 md:p-8 mb-8 h-40" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="border border-white/10 bg-black/80 p-8 max-w-lg w-full mx-4 text-center">
                      <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                      <h3 className="font-wide text-xl uppercase font-bold mb-4 leading-tight">
                        {locale === "es" ? "Encontramos Más" : "We Found More"}
                      </h3>

                      {/* Dynamic teaser stats — FOMO triggers */}
                      {teaserStats.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-5">
                          {teaserStats.slice(0, 4).map((stat, i) => (
                            <div key={i} className="p-2.5 border border-white/5 bg-white/[0.02]">
                              <span className={`block text-lg font-wide font-bold ${stat.color}`}>{stat.value}</span>
                              <span className="text-[9px] tracking-[0.1em] uppercase text-zinc-500 font-sans">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-zinc-400 font-sans mb-1">
                        {locale === "es"
                          ? "7+ secciones más: seguridad, email, embudo, oferta, posicionamiento, anuncios, y plan de acción."
                          : "7+ more sections: security audit, email, funnel, offer, positioning, ad intel, and action plan."}
                      </p>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-5">
                        {locale === "es" ? "Desde" : "Starting at"} <span className="text-white font-bold">$19/mo</span>
                      </p>
                      {isAuthenticated ? (
                        <Link href="/scalex/pricing" className="block w-full py-4 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-colors">
                          {locale === "es" ? "Actualizar para Desbloquear" : "Upgrade to Unlock"}
                        </Link>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Link href="/signup" className="block w-full py-4 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-colors">
                            {locale === "es" ? "Crear Cuenta — Guardar Este Scan" : "Sign Up — Save This Scan"}
                          </Link>
                          <Link href="/login" className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors">
                            {locale === "es" ? "¿Ya tienes cuenta? Inicia sesión" : "Already have an account? Log in"}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {canSeeFullResults && <>
            {/* ── TRACKING INFRASTRUCTURE — the scary part ──────── */}
            {f.trackedTools && f.trackedTools.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">Tracking Infrastructure Detected</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {f.trackedTools.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5">
                      <div>
                        <span className="text-xs font-sans text-zinc-300">{t.tool}</span>
                        <span className="ml-2 text-[9px] tracking-[0.15em] uppercase text-zinc-600 font-sans">{t.category}</span>
                      </div>
                      {t.id && <span className="text-[10px] font-mono text-emerald-400">{t.id}</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SECURITY AUDIT ──────────────────────────────────── */}
            {f.securityHeaders && f.securityHeaders.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans">Security Header Audit</h3>
                  <span className={`text-xs font-sans font-semibold ${f.securityScore >= 5 ? "text-emerald-400" : f.securityScore >= 3 ? "text-amber-400" : "text-red-400"}`}>
                    {f.securityScore}/7
                  </span>
                </div>
                <div className="space-y-2">
                  {f.securityHeaders.map((h, i) => (
                    <StatusBadge key={i} pass={h.present} label={h.header} />
                  ))}
                </div>
                {f.cdnProvider && <div className="mt-4 pt-3 border-t border-white/5"><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">CDN: </span><span className="text-xs font-sans text-zinc-300">{f.cdnProvider}</span></div>}
                {f.hasCompression && <div className="mt-2"><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Compression: </span><span className="text-xs font-sans text-zinc-300">{f.compressionType}</span></div>}
              </motion.div>
            )}

            {/* ── EMAIL DELIVERABILITY ─────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">Email Infrastructure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {f.emailProvider && <div><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Provider: </span><span className="text-xs font-sans text-zinc-300">{f.emailProvider}</span></div>}
                  <StatusBadge pass={f.hasSPF} label="SPF Record" />
                  <StatusBadge pass={f.hasDMARC} label="DMARC Record" />
                  {f.dmarcPolicy && <div><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">DMARC Policy: </span><span className={`text-xs font-sans font-semibold ${f.dmarcPolicy === "reject" ? "text-emerald-400" : f.dmarcPolicy === "quarantine" ? "text-amber-400" : "text-red-400"}`}>{f.dmarcPolicy}</span></div>}
                </div>
                <div>
                  {f.spfSenders && f.spfSenders.length > 0 && (
                    <div>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans block mb-2">Authorized Senders (SPF)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {f.spfSenders.map((s, i) => (<span key={i} className="text-[10px] font-sans text-zinc-400 px-2 py-0.5 border border-white/5 bg-white/[0.02]">{s}</span>))}
                      </div>
                    </div>
                  )}
                  {f.mxRecords && f.mxRecords.length > 0 && (
                    <div className="mt-3">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans block mb-2">MX Records</span>
                      {f.mxRecords.map((mx, i) => (<div key={i} className="text-[10px] font-mono text-zinc-500">{mx}</div>))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ── FULL DIGITAL STACK ──────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">Complete Digital Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Tech Stack", items: f.techStack },
                  { label: "CRM", items: f.crm ? [f.crm] : [] },
                  { label: "Chat", items: f.chat ? [f.chat] : [] },
                  { label: "Marketing", items: f.marketingTools },
                  { label: "E-commerce", items: f.ecommerce ? [f.ecommerce] : [] },
                  { label: "Payments", items: f.paymentGateways },
                  { label: "Booking", items: f.bookingTools },
                  { label: "A/B Testing", items: f.abTestingTools },
                  { label: "Retargeting", items: f.retargetingTools },
                  { label: "Popups", items: f.popupTools },
                  { label: "Reviews", items: f.reviewPlatforms },
                  { label: "Privacy", items: f.privacyTools },
                  { label: "SEO", items: f.seoTools },
                  { label: "Fonts", items: f.fonts },
                  { label: "Social", items: f.socialLinks?.map(s => s.platform) || [] },
                  { label: "DNS Verified", items: f.dnsVerifications },
                ].filter(g => g.items.length > 0).map((group, i) => (
                  <div key={i} className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1.5">{group.label}</span>
                    <span className="text-xs font-sans text-zinc-300">{group.items.join(", ")}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── CONTENT & SEO MATURITY ───────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">Content & SEO Intelligence</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-white/[0.02] border border-white/5">
                  <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">Pages Indexed</span>
                  <span className="text-lg font-wide font-bold text-white">{f.sitemapPageCount || "N/A"}</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5">
                  <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">Load Time</span>
                  <span className={`text-lg font-wide font-bold ${f.loadTime < 3000 ? "text-emerald-400" : f.loadTime < 5000 ? "text-amber-400" : "text-red-400"}`}>
                    {f.loadTime < 99999 ? `${(f.loadTime / 1000).toFixed(1)}s` : "N/A"}
                  </span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5">
                  <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">Forms</span>
                  <span className="text-lg font-wide font-bold text-white">{f.formCount}</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5">
                  <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">3rd Party Scripts</span>
                  <span className="text-lg font-wide font-bold text-white">{f.externalScriptDomains?.length || 0}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <StatusBadge pass={f.hasBlog} label="Blog" />
                <StatusBadge pass={f.hasVideo} label="Video" />
                <StatusBadge pass={f.hasSchema} label="Schema/JSON-LD" />
                <StatusBadge pass={f.hasCanonical} label="Canonical URL" />
                <StatusBadge pass={f.hasMobileViewport} label="Mobile Ready" />
                <StatusBadge pass={f.hasOG} label="Open Graph" />
                <StatusBadge pass={f.hasLazyLoading} label="Lazy Loading" />
                <StatusBadge pass={f.hasWebP} label="WebP Images" />
                <StatusBadge pass={f.hasSitemap} label="Sitemap" />
                <StatusBadge pass={f.hasRobotsTxt} label="robots.txt" />
                <StatusBadge pass={f.ssl} label="SSL/HTTPS" />
                <StatusBadge pass={f.hasPWA} label="PWA" />
              </div>
              {f.headingStructure && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Heading Structure: </span>
                  <span className="text-xs font-mono text-zinc-400">{f.headingStructure}</span>
                  {f.imgWithoutAlt > 0 && <span className="ml-4 text-xs font-sans text-red-400">{f.imgWithoutAlt} images missing alt text</span>}
                </div>
              )}
            </motion.div>

            {/* ── CONVERSION EVENTS ───────────────────────────────── */}
            {f.conversionEvents && f.conversionEvents.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.2, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">Conversion Events Tracked</h3>
                <div className="flex flex-wrap gap-2">
                  {f.conversionEvents.map((ev, i) => (
                    <span key={i} className="text-[10px] font-mono text-emerald-400 px-3 py-1 border border-emerald-400/20 bg-emerald-400/[0.05]">{ev}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── BUSINESS INTELLIGENCE (JSON-LD) ─────────────────── */}
            {(f.businessName || f.businessPhone || f.businessAddress || f.businessRating) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.3, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-4">Business Data Extracted</h3>
                <div className="space-y-2">
                  {f.businessName && <div><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Name: </span><span className="text-sm font-sans text-zinc-300">{f.businessName}</span></div>}
                  {f.businessType && <div><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Type: </span><span className="text-sm font-sans text-zinc-300">{f.businessType}</span></div>}
                  {f.businessPhone && <div><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Phone: </span><span className="text-sm font-mono text-zinc-300">{f.businessPhone}</span></div>}
                  {f.businessAddress && <div><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Address: </span><span className="text-sm font-sans text-zinc-300">{f.businessAddress}</span></div>}
                  {f.businessRating && <div><span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Rating: </span><span className="text-sm font-sans text-zinc-300">{f.businessRating}</span></div>}
                </div>
              </motion.div>
            )}

            {/* ═══ V2: FUNNEL ANALYSIS ═════════════════════════════════ */}
            {analysisResult?.funnel && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.4, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">{tr(t.funnelTitle, locale)}</h3>
                {/* Completeness bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-sans">{tr(t.funnelCompleteness, locale)}</span>
                    <span className="text-lg font-wide font-bold" style={{ color: analysisResult.funnel.completeness >= 60 ? "#10B981" : analysisResult.funnel.completeness >= 40 ? "#F59E0B" : "#EF4444" }}>
                      {analysisResult.funnel.completeness}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${analysisResult.funnel.completeness}%` }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ background: analysisResult.funnel.completeness >= 60 ? "#10B981" : analysisResult.funnel.completeness >= 40 ? "#F59E0B" : "#EF4444" }} />
                  </div>
                  <span className="text-[10px] text-zinc-600 font-sans mt-1 block capitalize">{locale === "es" ? `Tipo: ${analysisResult.funnel.funnelType}` : `Type: ${analysisResult.funnel.funnelType}`}</span>
                </div>
                {/* Funnel stages */}
                <div className="space-y-3 mb-6">
                  {analysisResult.funnel.stages.map((stage) => (
                    <div key={stage.stage} className="flex items-start gap-3">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${stage.detected ? "bg-emerald-400" : "bg-red-400"}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-sans text-zinc-300 font-medium">{stage.label}</span>
                          <span className={`text-[10px] font-mono ${stage.detected ? "text-emerald-400" : "text-red-400"}`}>{stage.score.toFixed(1)}/10</span>
                        </div>
                        {stage.signals.length > 0 && (
                          <span className="text-[10px] text-zinc-600 font-sans">{stage.signals.join(" · ")}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Gaps */}
                {analysisResult.funnel.gaps.length > 0 && (
                  <div className="p-3 bg-red-400/[0.05] border border-red-400/20 mb-4">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-red-400 font-sans mb-1">{tr(t.funnelGaps, locale)}</span>
                    <span className="text-xs font-sans text-red-300">{analysisResult.funnel.gaps.join(", ")}</span>
                  </div>
                )}
                {/* Lead magnets */}
                {analysisResult.funnel.leadMagnets.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.funnel.leadMagnets.map((lm, i) => (
                      <span key={i} className="text-[10px] font-mono text-emerald-400 px-3 py-1 border border-emerald-400/20 bg-emerald-400/[0.05]">{lm}</span>
                    ))}
                  </div>
                )}
                {analysisResult.funnel.detectedFunnelBuilder && (
                  <div className="mt-3 text-[10px] font-sans text-zinc-500">Funnel Builder: <span className="text-zinc-300">{analysisResult.funnel.detectedFunnelBuilder}</span></div>
                )}
              </motion.div>
            )}

            {/* ═══ V2: OFFER & VALUE STACK ════════════════════════════════ */}
            {analysisResult?.offer && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.6, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">{tr(t.offerTitle, locale)}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.offerClarity, locale)}</span>
                    <span className="text-lg font-wide font-bold" style={{ color: analysisResult.offer.offerClarity >= 6 ? "#10B981" : analysisResult.offer.offerClarity >= 3 ? "#F59E0B" : "#EF4444" }}>
                      {analysisResult.offer.offerClarity}/10
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.offerStrength, locale)}</span>
                    <span className="text-lg font-wide font-bold" style={{ color: analysisResult.offer.offerStrength >= 6 ? "#10B981" : analysisResult.offer.offerStrength >= 3 ? "#F59E0B" : "#EF4444" }}>
                      {analysisResult.offer.offerStrength}/10
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.offerGuarantee, locale)}</span>
                    <span className={`text-lg font-wide font-bold ${analysisResult.offer.hasMoneyBackGuarantee ? "text-emerald-400" : "text-red-400"}`}>
                      {analysisResult.offer.hasMoneyBackGuarantee ? (locale === "es" ? "Sí" : "Yes") : "No"}
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{locale === "es" ? "Precios" : "Pricing"}</span>
                    <span className={`text-lg font-wide font-bold ${analysisResult.offer.hasPricingPage ? "text-emerald-400" : "text-red-400"}`}>
                      {analysisResult.offer.hasPricingPage ? (locale === "es" ? "Sí" : "Yes") : "No"}
                    </span>
                  </div>
                </div>
                {/* Pricing tiers */}
                {analysisResult.offer.tiers.length > 0 && (
                  <div className="mb-4">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-2">{tr(t.offerPricing, locale)}</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {analysisResult.offer.tiers.map((tier, i) => (
                        <div key={i} className={`p-3 border ${tier.isFeatured ? "border-amber-500/30 bg-amber-500/[0.03]" : "border-white/5 bg-white/[0.02]"}`}>
                          <span className="block text-xs font-sans text-white font-medium">{tier.name}</span>
                          {tier.price && <span className="block text-sm font-wide font-bold text-amber-400 mt-1">{tier.price}{tier.period ? `/${tier.period}` : ""}</span>}
                          {tier.features.length > 0 && (
                            <div className="mt-2 space-y-0.5">{tier.features.slice(0, 5).map((f, j) => (
                              <span key={j} className="block text-[10px] text-zinc-500 font-sans">{f}</span>
                            ))}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Tactics detected */}
                <div className="grid grid-cols-2 gap-3">
                  {analysisResult.offer.urgencyTactics.length > 0 && (
                    <div className="p-3 bg-white/[0.02] border border-white/5">
                      <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.offerUrgency, locale)}</span>
                      <span className="text-xs font-sans text-amber-400">{analysisResult.offer.urgencyTactics.join(", ")}</span>
                    </div>
                  )}
                  {analysisResult.offer.valueStackElements.length > 0 && (
                    <div className="p-3 bg-white/[0.02] border border-white/5">
                      <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.offerValueStack, locale)}</span>
                      <span className="text-xs font-sans text-emerald-400">{analysisResult.offer.valueStackElements.join(", ")}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ═══ V2: POSITIONING & MESSAGING ════════════════════════════ */}
            {analysisResult?.positioning && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.8, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">{tr(t.positioningTitle, locale)}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.positioningClarity, locale)}</span>
                    <span className="text-lg font-wide font-bold" style={{ color: analysisResult.positioning.clarityScore >= 6 ? "#10B981" : analysisResult.positioning.clarityScore >= 3 ? "#F59E0B" : "#EF4444" }}>
                      {analysisResult.positioning.clarityScore}/10
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{locale === "es" ? "Diferenciación" : "Differentiation"}</span>
                    <span className="text-lg font-wide font-bold" style={{ color: analysisResult.positioning.differentiationScore >= 6 ? "#10B981" : analysisResult.positioning.differentiationScore >= 3 ? "#F59E0B" : "#EF4444" }}>
                      {analysisResult.positioning.differentiationScore}/10
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{locale === "es" ? "Consistencia" : "Consistency"}</span>
                    <span className="text-lg font-wide font-bold" style={{ color: analysisResult.positioning.messagingConsistency >= 6 ? "#10B981" : analysisResult.positioning.messagingConsistency >= 3 ? "#F59E0B" : "#EF4444" }}>
                      {analysisResult.positioning.messagingConsistency}/10
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.positioningType, locale)}</span>
                    <span className={`text-sm font-sans font-bold uppercase ${analysisResult.positioning.positioningType === "clear" ? "text-emerald-400" : analysisResult.positioning.positioningType === "vague" ? "text-amber-400" : "text-red-400"}`}>
                      {analysisResult.positioning.positioningType}
                    </span>
                  </div>
                </div>
                {/* Primary headline */}
                {analysisResult.positioning.primaryHeadline && (
                  <div className="p-4 bg-white/[0.02] border border-white/5 mb-4">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-2">{tr(t.positioningHeadline, locale)}</span>
                    <span className="text-sm font-sans text-white italic">&ldquo;{analysisResult.positioning.primaryHeadline}&rdquo;</span>
                    {analysisResult.positioning.subheadline && (
                      <span className="block text-xs font-sans text-zinc-500 mt-1">{analysisResult.positioning.subheadline}</span>
                    )}
                  </div>
                )}
                {/* Target audience */}
                {analysisResult.positioning.targetAudience && (
                  <div className="p-3 bg-emerald-400/[0.05] border border-emerald-400/20 mb-4">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-emerald-400 font-sans mb-1">{tr(t.positioningAudience, locale)}</span>
                    <span className="text-xs font-sans text-emerald-300">{analysisResult.positioning.targetAudience}</span>
                  </div>
                )}
                {/* Differentiators */}
                {analysisResult.positioning.differentiators.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {analysisResult.positioning.differentiators.map((d, i) => (
                      <span key={i} className="text-[10px] font-mono text-blue-400 px-3 py-1 border border-blue-400/20 bg-blue-400/[0.05]">{d}</span>
                    ))}
                  </div>
                )}
                {/* CTA copy */}
                {analysisResult.positioning.ctaCopy.length > 0 && (
                  <div className="mt-3">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">CTAs Found</span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.positioning.ctaCopy.map((c, i) => (
                        <span key={i} className="text-[10px] font-sans text-zinc-400 px-2 py-1 border border-white/5 bg-white/[0.02]">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══ V2: AD INTELLIGENCE ═════════════════════════════════════ */}
            {analysisResult?.adIntel && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.0, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">{tr(t.adIntelTitle, locale)}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.adIntelMaturity, locale)}</span>
                    <span className={`text-sm font-wide font-bold uppercase ${
                      analysisResult.adIntel.maturityLevel === "advanced" || analysisResult.adIntel.maturityLevel === "enterprise" ? "text-emerald-400" :
                      analysisResult.adIntel.maturityLevel === "intermediate" ? "text-blue-400" :
                      analysisResult.adIntel.maturityLevel === "basic" ? "text-amber-400" : "text-red-400"
                    }`}>
                      {analysisResult.adIntel.maturityLevel}
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.adIntelSpend, locale)}</span>
                    <span className="text-sm font-wide font-bold text-white">{analysisResult.adIntel.estimatedMonthlySpend || (locale === "es" ? "No detectado" : "Not detected")}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{tr(t.adIntelPixelHealth, locale)}</span>
                    <span className={`text-sm font-wide font-bold uppercase ${
                      analysisResult.adIntel.pixelHealth === "advanced" ? "text-emerald-400" :
                      analysisResult.adIntel.pixelHealth === "healthy" ? "text-blue-400" :
                      analysisResult.adIntel.pixelHealth === "partial" ? "text-amber-400" : "text-red-400"
                    }`}>
                      {analysisResult.adIntel.pixelHealth}
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-sans mb-1">{locale === "es" ? "Sofisticación" : "Sophistication"}</span>
                    <span className="text-lg font-wide font-bold text-white">{analysisResult.adIntel.trackingSophistication}/10</span>
                  </div>
                </div>
                {/* Per-platform breakdown */}
                <div className="space-y-2">
                  {analysisResult.adIntel.platforms.filter(p => p.pixelDetected).map((platform, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-xs font-sans text-white">{platform.platform}</span>
                        {platform.pixelId && <span className="text-[10px] font-mono text-zinc-500">{platform.pixelId}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                          platform.maturity === "full_funnel" ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/[0.05]" :
                          platform.maturity === "tracking_events" ? "text-blue-400 border-blue-400/20 bg-blue-400/[0.05]" :
                          "text-amber-400 border-amber-400/20 bg-amber-400/[0.05]"
                        }`}>
                          {platform.maturity.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                  {analysisResult.adIntel.platforms.filter(p => !p.pixelDetected).length > 0 && (
                    <div className="p-3 bg-red-400/[0.03] border border-red-400/10">
                      <span className="text-[10px] text-red-400 font-sans">
                        {locale === "es" ? "Sin presencia en: " : "Not on: "}
                        {analysisResult.adIntel.platforms.filter(p => !p.pixelDetected).map(p => p.platform).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ═══ V2: RECOMMENDATIONS ROADMAP ═════════════════════════════ */}
            {analysisResult?.recommendations && analysisResult.recommendations.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.2, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">{tr(t.recommendationsTitle, locale)}</h3>
                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec, i) => {
                    const priorityColors: Record<string, string> = { critical: "#EF4444", high: "#F59E0B", medium: "#3B82F6", low: "#6B7280" };
                    const color = priorityColors[rec.priority] || "#6B7280";
                    return (
                      <div key={rec.id || i} className="p-4 border border-white/5 bg-white/[0.01]" style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm" style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}>
                            {tr(t.recommendationsPriority[rec.priority as keyof typeof t.recommendationsPriority], locale)}
                          </span>
                          <span className="text-[9px] tracking-[0.1em] uppercase text-zinc-600 font-sans">{rec.category}</span>
                          <span className="text-[9px] text-zinc-700 font-sans ml-auto">{tr(t.recommendationsEffort[rec.effort], locale)}</span>
                        </div>
                        <h4 className="text-sm font-sans font-semibold text-white mb-1">{rec.title[locale]}</h4>
                        <p className="text-xs font-sans text-zinc-500 leading-relaxed">{rec.description[locale]}</p>
                        {rec.impact && (
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-[9px] tracking-[0.1em] uppercase text-zinc-600 font-sans">{tr(t.recommendationsImpact, locale)}:</span>
                            <span className="text-[10px] font-sans font-semibold" style={{ color }}>{rec.impact}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Revenue Leak ─────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.5, duration: 0.6 }} className="border border-white/5 p-6 md:p-8 mb-8 text-center">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-3">{tr(t.revenueLeak, locale)}</h3>
              <span className="text-4xl md:text-5xl font-wide font-bold" style={{ color: zone.color }}>{estimateRevenueLeak(overallScore)}</span>
              <p className="text-sm text-zinc-500 font-sans mt-3">Based on gaps across {getTopIssues(finalScores, 10).filter(i => i.score < 5).length} underperforming pillars</p>
            </motion.div>
            </>}

            {/* ── CTA ──────────────────────────────────────────────── */}
            {isAuthenticated && canSeeFullResults ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.8, duration: 0.6 }} className="border border-white/10 bg-white/[0.02] p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-4xl font-wide font-bold uppercase leading-[0.9] mb-4">
                  {locale === "es" ? "Tu Scan Está" : "Your Scan Is"}<br /><span className="shimmer-text">{locale === "es" ? "Guardado" : "Saved"}</span>
                </h3>
                <p className="text-sm text-zinc-400 font-sans max-w-[500px] mx-auto mb-8">
                  {locale === "es"
                    ? "Usa nuestras herramientas AI para generar estrategias personalizadas basadas en este diagnóstico."
                    : "Use our AI tools to generate personalized strategies based on this diagnostic."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/app/ai-tools" className="inline-block px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors">
                    {locale === "es" ? "Abrir Herramientas AI" : "Open AI Tools"}
                  </Link>
                  <Link href="/app/dashboard" className="px-8 py-5 border border-white/20 text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:border-white/40 hover:bg-white/[0.02] transition-colors">
                    {locale === "es" ? "Ir al Dashboard" : "Go to Dashboard"}
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.8, duration: 0.6 }} className="border border-white/10 bg-white/[0.02] p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-4xl font-wide font-bold uppercase leading-[0.9] mb-4">{locale === "es" ? "¿Quieres Que Lo" : "Want Us to"}<br /><span className="shimmer-text">{locale === "es" ? "Arreglemos?" : "Fix This?"}</span></h3>
                <p className="text-sm text-zinc-400 font-sans max-w-[500px] mx-auto mb-4">
                  {tr(t.ctaDescription, locale).replace("{signals}", String(f.totalSignals))}
                </p>
                <p className="text-xs text-zinc-500 font-sans max-w-[500px] mx-auto mb-8">
                  Book a free 30-minute strategy call. We&apos;ll walk through your score, build a custom action plan, and give you a complete DIY implementation guide — worth $2,500. No obligation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/38640505084?text=Hey%20Luka%2C%20I%20just%20got%20my%20ScaleX%20score%20and%20I%27d%20like%20to%20book%20the%20free%20strategy%20call." target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-5 bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-white/90 transition-colors cursor-pointer">
                    Book Free Strategy Call
                  </a>
                  <Link href="/signup" className="px-8 py-5 border border-white/20 text-white font-bold text-[11px] tracking-[0.25em] uppercase font-sans hover:border-white/40 hover:bg-white/[0.02] transition-colors">
                    {locale === "es" ? "Crear Cuenta Gratis" : "Create Free Account"}
                  </Link>
                </div>
              </motion.div>
            )}

            <div className="text-center mt-10">
              <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-700 font-sans">{tr(t.poweredBy, locale)}</span>
            </div>

            {/* ── AI ADVISOR CHAT ─────────────────────────────────── */}
            {!chatOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.5, duration: 0.6 }} className="mt-10">
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full border border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all p-6 md:p-8 text-center cursor-pointer group"
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold tracking-wider">SX</div>
                    <h3 className="text-lg md:text-xl font-wide font-bold uppercase">Talk to Your AI Advisor</h3>
                  </div>
                  <p className="text-sm text-zinc-400 font-sans max-w-[500px] mx-auto mb-4">
                    Get a personalized growth plan based on your scan. I&apos;ll show you exactly what&apos;s broken, what it&apos;s costing you, and how to fix it.
                  </p>
                  <span className="inline-block px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold group-hover:bg-white/90 transition-colors">
                    Start Conversation
                  </span>
                </button>
              </motion.div>
            )}

            {chatOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-10 border border-white/20 bg-black/50 backdrop-blur-sm">
                {/* Chat header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold tracking-wider">SX</div>
                    <div>
                      <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 block">ScaleX</span>
                      <span className="text-sm font-wide font-bold uppercase">AI Growth Advisor</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 font-sans">Live</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-[450px] overflow-y-auto px-6 py-6 space-y-5">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold tracking-wider mt-0.5 ${msg.role === "assistant" ? "bg-white text-black" : "bg-white/10 border border-white/20 text-white"}`}>
                        {msg.role === "assistant" ? "SX" : "You"}
                      </div>
                      <div className={`max-w-[80%] text-sm font-sans leading-relaxed ${msg.role === "assistant" ? "text-zinc-300" : "bg-white/[0.04] border border-white/10 rounded-2xl rounded-tr-lg px-4 py-3 text-zinc-300"}`}>
                        <div className="whitespace-pre-wrap">{msg.text.split(/\*\*(.*?)\*\*/g).map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}</div>
                      </div>
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold tracking-wider">SX</div>
                      <div className="flex items-center gap-1.5 py-2">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" />
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}

                  {/* Book call CTA */}
                  {bookCall && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-7 h-7" />
                      <a href="https://wa.me/38640505084?text=Hi%2C%20I%20just%20did%20a%20ScaleX%20scan%20and%20I%27d%20like%20to%20book%20a%20strategy%20call." target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all cursor-pointer">
                        Book Free Strategy Call
                      </a>
                    </div>
                  )}

                  {/* Pricing CTA */}
                  {showPricing && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-7 h-7" />
                      <div className="border border-white/20 bg-white/[0.03] p-4 max-w-[80%]">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2">Growth Plans</p>
                        <p className="text-sm text-zinc-300 font-sans mb-3">Get done-for-you marketing, funnel building, and growth execution from the MNS team.</p>
                        <a href="https://wa.me/38640505084?text=I%27m%20interested%20in%20MyNewStaff.ai%20growth%20plans.%20Can%20we%20talk%3F" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all cursor-pointer">
                          Get Started
                        </a>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="px-6 py-4 border-t border-white/10">
                  <div className="flex items-end gap-3">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleChatSend(); } }}
                      placeholder="Ask about your growth strategy..."
                      disabled={chatLoading}
                      className="flex-1 bg-transparent border border-white/20 py-3 px-4 text-sm font-sans text-white outline-none focus:border-white/40 transition-colors placeholder:text-zinc-600 disabled:opacity-50"
                    />
                    <button
                      onClick={handleChatSend}
                      disabled={!chatInput.trim() || chatLoading}
                      className="px-5 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
