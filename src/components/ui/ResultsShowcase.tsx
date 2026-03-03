"use client";

import { motion } from "framer-motion";

/* ─── Case study data ─────────────────────────────────────────────── */

const caseStudies = [
  {
    label: "Build 01",
    client: "B2B Legal Services Firm",
    headline: "From Zero Digital Presence to Autonomous Lead Machine",
    description:
      "Built a 3D animated immersive website with Three.js and GSAP — a 600vh cinematic scroll experience. Deployed 39 behavioral email templates across a 6-stage nurture sequence (Pure Value → Social Proof → Conversion → Objection → Urgency → Re-engagement). Custom lead scraping pipeline pulling from Reddit, Google, Twitter, and Maps. Full GHL CRM integration with automated pipeline management.",
    deliverables: [
      "3D immersive website (Three.js + GSAP)",
      "39 behavioral email templates",
      "6-stage automated nurture sequence",
      "Multi-source lead scraping pipeline",
      "GHL CRM with full automation",
      "AI chat advisor (Gemini 2.5)",
    ],
    metrics: [
      { value: "39", label: "Email Templates" },
      { value: "6", label: "Nurture Stages" },
      { value: "12", label: "Days to Deploy" },
    ],
    stack: ["Next.js", "Three.js", "GSAP", "GHL", "Resend"],
    visual: "roman",
  },
  {
    label: "Build 02",
    client: "Executive Coaching Practice",
    headline: "AI Voice Clone + Full Marketing Automation Stack",
    description:
      "Cloned the founder's voice using XTTS v2 AI — a custom Spanish-language voice model that sounds exactly like the client. Built a complete lead-to-close system: landing page, 18 HTML email templates with behavioral triggers, WhatsApp funnel architecture, membership portal with Stripe payments, and a 24/7 AI chatbot that speaks in the founder's voice. The entire practice now runs autonomously.",
    deliverables: [
      "AI voice clone (XTTS v2, Spanish)",
      "18 high-converting email templates",
      "WhatsApp funnel (3-flow architecture)",
      "Membership portal + Stripe billing",
      "Landing page with video integration",
      "24/7 AI chatbot in founder's voice",
    ],
    metrics: [
      { value: "18", label: "Email Sequences" },
      { value: "24/7", label: "AI Voice Bot" },
      { value: "100%", label: "Autonomous" },
    ],
    stack: ["XTTS v2", "Next.js", "Stripe", "GHL", "Replicate"],
    visual: "gold",
  },
  {
    label: "Build 03",
    client: "Business Coaching Franchise",
    headline: "Complete Outbound Engine — Cold Email to Closed Deal",
    description:
      "Designed and deployed a full cold outreach system: 18 email sequences across 3 campaigns, AI-powered lead scraping with enrichment and verification, UTM tracking across all touchpoints, GA4 + Meta Pixel integration, and complete GHL mission control setup. Built to handle 150-180 sends per day while maintaining 45%+ open rates.",
    deliverables: [
      "18 cold email sequences (3 campaigns)",
      "Lead scraping + enrichment pipeline",
      "UTM tracking infrastructure",
      "GA4 + Meta Pixel integration",
      "GHL mission control setup",
      "Complete funnel landing page",
    ],
    metrics: [
      { value: "180", label: "Emails/Day" },
      { value: "45%+", label: "Target Open Rate" },
      { value: "3", label: "Campaign Flows" },
    ],
    stack: ["Apollo.io", "NeverBounce", "GHL", "Next.js", "GA4"],
    visual: "blue",
  },
  {
    label: "Build 04",
    client: "Luxury Coastal Resort",
    headline: "Cinematic Web Experience with Direct Booking Engine",
    description:
      "Created a high-end cinematic landing page — smooth scroll animations, parallax backgrounds, and a direct booking integration. The design language mirrors luxury hospitality: serif typography, sunset color palette, and immersive GIF backgrounds that transport visitors to the property. Concept to fully live in 9 days.",
    deliverables: [
      "Cinematic landing page (GSAP animations)",
      "Direct booking engine integration",
      "Mobile-first responsive design",
      "SEO-optimized content structure",
      "High-speed CDN deployment",
      "Trust metrics + social proof system",
    ],
    metrics: [
      { value: "9", label: "Days to Live" },
      { value: "100", label: "PageSpeed Score" },
      { value: "Luxury", label: "Design Tier" },
    ],
    stack: ["Next.js", "GSAP", "Vercel", "CDN"],
    visual: "warm",
  },
];

/* ─── Visual accent colors per case study ─────────────────────────── */
const visualStyles: Record<string, string> = {
  roman: "from-amber-900/20 to-transparent",
  gold: "from-yellow-900/20 to-transparent",
  blue: "from-blue-900/20 to-transparent",
  warm: "from-orange-900/20 to-transparent",
};

/* ─── Component ───────────────────────────────────────────────────── */

export function ResultsShowcase() {
  return (
    <div className="space-y-16">
      {/* Overall stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10"
      >
        {[
          { value: "4", label: "Clients Deployed" },
          { value: "75+", label: "Email Templates Built" },
          { value: "11", label: "Avg Days to Deploy" },
          { value: "100%", label: "Full Automation" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`py-8 text-center ${
              i < 3 ? "md:border-r border-white/10" : ""
            } ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""} ${
              i === 0 ? "border-r md:border-r border-white/10" : ""
            }`}
          >
            <span className="block text-2xl md:text-3xl font-wide font-bold">{stat.value}</span>
            <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-500 mt-2">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Case study cards */}
      {caseStudies.map((study, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className={`relative p-8 md:p-12 bg-gradient-to-br ${visualStyles[study.visual] || visualStyles.blue}`}>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">{study.label}</span>
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600">{study.client}</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-wide font-bold uppercase leading-tight">
                {study.headline}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12">
            <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed mb-10 max-w-3xl">
              {study.description}
            </p>

            {/* Metrics strip */}
            <div className="grid grid-cols-3 gap-0 border border-white/10 mb-10">
              {study.metrics.map((m, j) => (
                <div key={j} className={`py-6 text-center ${j < 2 ? "border-r border-white/10" : ""}`}>
                  <span className="block text-2xl md:text-3xl font-wide font-bold">{m.value}</span>
                  <span className="block text-[9px] tracking-[0.2em] uppercase text-zinc-500 mt-1">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Deliverables + Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 block mb-4">What We Delivered</span>
                <ul className="space-y-2">
                  {study.deliverables.map((d, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-sans text-zinc-400">
                      <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 block mb-4">Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 bg-white/[0.04] border border-white/10 text-[10px] tracking-[0.15em] uppercase text-zinc-400 font-sans"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Call to action between case studies */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-12 border border-dashed border-white/10"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-3">Your Build Could Be Next</p>
        <p className="text-lg md:text-xl font-wide uppercase font-bold">
          Every system above was deployed in <span className="shimmer-text">under 14 days.</span>
        </p>
      </motion.div>
    </div>
  );
}
