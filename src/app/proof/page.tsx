import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "MyNewStaff.ai — Results That Speak",
  description: "$5.1M revenue generated across 6 clients. Hotels, marinas, Legal 500 law firms, and Kardashian brands trust MyNewStaff.ai.",
};

const caseStudies = [
  {
    industry: "Law Firm",
    type: "Personal Injury",
    metrics: [
      { label: "Revenue Generated", value: "$652K" },
      { label: "ROI", value: "539%" },
      { label: "Conversion Rate", value: "14.6%" },
      { label: "Qualified Leads", value: "920" },
    ],
    result: "From referral-dependent to a predictable pipeline of high-value cases. Professional referral networks, legal intent capture, and targeted outreach — all automated.",
    highlight: "Highest ROI across all clients",
  },
  {
    industry: "Luxury Real Estate",
    type: "Brokerage",
    metrics: [
      { label: "Revenue Generated", value: "$483K" },
      { label: "ROI", value: "489%" },
      { label: "Leads Generated", value: "4,832" },
      { label: "Cost Per Lead", value: "$25.66" },
    ],
    result: "High-net-worth investor targeting on LinkedIn, relocation lead generation, waterfront buyer outreach, and broker referral networks — 12 campaigns running simultaneously.",
    highlight: "12 active campaigns simultaneously",
  },
  {
    industry: "SaaS Company",
    type: "B2B Software",
    metrics: [
      { label: "Revenue Generated", value: "$332K" },
      { label: "ROI", value: "419%" },
      { label: "Leads Generated", value: "8,920" },
      { label: "Cost Per Lead", value: "$10.99" },
    ],
    result: "CTO and VP Engineering LinkedIn outreach, G2/Capterra reviewer engagement, and competitor switcher targeting. 22 campaigns across every channel.",
    highlight: "Lowest cost per lead at scale",
  },
  {
    industry: "Health & Fitness",
    type: "Wellness Brand",
    metrics: [
      { label: "Revenue Generated", value: "$288K" },
      { label: "ROI", value: "397%" },
      { label: "Qualified Leads", value: "2,496" },
      { label: "Email Open Rate", value: "38.7%" },
    ],
    result: "Business owner acquisition, corporate wellness contract outreach, and influencer partnership campaigns. Built a 127K social following along the way.",
    highlight: "127K social followers built",
  },
  {
    industry: "E-Commerce",
    type: "Organic Food Brand",
    metrics: [
      { label: "Revenue Generated", value: "$218K" },
      { label: "Leads Generated", value: "12,400" },
      { label: "Cost Per Lead", value: "$5.40" },
      { label: "Social Following", value: "214K" },
    ],
    result: "Blogger targeting, restaurant chain outreach, and retail store partnerships. Highest lead volume at the lowest cost per lead in the portfolio.",
    highlight: "12,400 leads at $5.40 each",
  },
  {
    industry: "B2B Consulting",
    type: "Management Consulting",
    metrics: [
      { label: "Revenue Generated", value: "$93K" },
      { label: "Conversion Rate", value: "18.2%" },
      { label: "Email Open Rate", value: "44.8%" },
      { label: "Email Click Rate", value: "18.2%" },
    ],
    result: "VC-backed founder outreach and C-suite LinkedIn sequences. Newest client, already producing the highest conversion rate in the portfolio.",
    highlight: "Highest conversion rate — 18.2%",
  },
];

function DashboardImage({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="border border-white/10 overflow-hidden rounded-sm">
      <div className="relative aspect-[16/10] bg-zinc-950">
        <Image
          src={src}
          alt={caption}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      <div className="px-6 md:px-8 py-4 bg-white/[0.02] border-t border-white/10">
        <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
          {caption}
        </p>
      </div>
    </div>
  );
}

function CaseStudyCard({ study }: { study: typeof caseStudies[0] }) {
  return (
    <div className="border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
            {study.industry}
          </h3>
          <span className="text-xs text-zinc-600 font-sans">{study.type}</span>
        </div>
        <span className="text-[10px] tracking-[0.15em] text-amber-400/70 uppercase font-sans hidden sm:block">
          {study.highlight}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {study.metrics.map((m, j) => (
          <div key={j} className="px-6 md:px-8 py-5 border-r border-b border-white/5 last:border-r-0">
            <div className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
              {m.value}
            </div>
            <div className="text-[10px] tracking-[0.15em] text-zinc-600 uppercase font-sans mt-1">
              {m.label}
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 md:px-8 py-4 bg-white/[0.02]">
        <p className="text-sm text-zinc-400 font-sans">{study.result}</p>
      </div>
    </div>
  );
}

export default function ProofPage() {
  return (
    <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      {/* Hero */}
      <section className="pt-20 pb-12 px-6 text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-8 font-sans">
            MyNewStaff.ai — Real Results
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            We don&apos;t pitch.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
              We prove.
            </span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto font-sans">
            $5.1M generated across 6 clients. Here are the numbers — and the live dashboards to back them up.
          </p>
        </Reveal>
      </section>

      {/* Aggregate Stats */}
      <Reveal className="max-w-4xl mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
          {[
            { label: "Total Revenue", value: "$5.1M" },
            { label: "Leads Generated", value: "72,600" },
            { label: "Average ROI", value: "487%" },
            { label: "Cost Per Lead", value: "$10.99" },
          ].map((stat, i) => (
            <div key={i} className="p-6 md:p-8 text-center border-r border-b border-white/10 last:border-r-0">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
                {stat.value}
              </div>
              <div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ═══ SECTION 1: THE ENGINE ═══ */}
      <Reveal className="max-w-5xl mx-auto px-4 md:px-8 mb-6">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans text-center">
          Step 1 — The Dashboard
        </span>
      </Reveal>
      <Reveal className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
        <DashboardImage
          src="/assets/proof-overview.png"
          caption="Live dashboard — $5.1M revenue closed, 72.6K leads, 487% ROI, full pipeline visibility"
        />
      </Reveal>

      {/* ═══ SECTION 2: KRIS JENNER ═══ */}
      <Reveal className="max-w-5xl mx-auto my-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 overflow-hidden">
          <div className="relative aspect-[9/12] md:aspect-auto overflow-hidden bg-black">
            <video
              src="/videos/kris-jenner.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/60 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:hidden" />
          </div>
          <div className="flex flex-col items-start justify-center p-8 md:p-14 lg:p-20 bg-zinc-950">
            <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-6 font-sans">
              Built for the Kardashians
            </span>
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-sans leading-relaxed mb-8">
              &ldquo;We built growth systems for the Kardashian-Jenner brand. Here&apos;s what Kris Jenner had to say about working with our founder.&rdquo;
            </p>
            <div className="w-12 h-px bg-amber-400/40 mb-6" />
            <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
              Kris Jenner — on working with Luka Lah
            </p>
          </div>
        </div>
      </Reveal>

      {/* ═══ SECTION 3: PERFORMANCE PROOF ═══ */}
      <Reveal className="max-w-5xl mx-auto px-4 md:px-8 mb-6 mt-20">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans text-center">
          Step 2 — Per-Client Performance (Before vs After)
        </span>
      </Reveal>
      <Reveal className="max-w-5xl mx-auto px-4 md:px-8 mb-8">
        <DashboardImage
          src="/assets/proof-performance.png"
          caption="10.4x average ROI — every dollar invested returns $10.40 across all clients"
        />
      </Reveal>
      <Reveal className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
        <DashboardImage
          src="/assets/proof-clients.png"
          caption="6 active clients — individual revenue, conversion rates, and health scores tracked in real-time"
        />
      </Reveal>

      {/* ═══ SECTION 4: CASE STUDIES ═══ */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <Reveal>
          <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-10 font-sans text-center">
            Step 3 — Client Results (Anonymized)
          </span>
        </Reveal>

        <div className="space-y-4 mb-12">
          {caseStudies.slice(0, 3).map((study, i) => (
            <Reveal key={i}><CaseStudyCard study={study} /></Reveal>
          ))}
        </div>

        {/* Lead Discovery Engine */}
        <Reveal className="mb-6">
          <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans text-center">
            How We Find Leads — AI Discovery Engine
          </span>
        </Reveal>
        <Reveal className="mb-12">
          <DashboardImage
            src="/assets/proof-leadscraper.png"
            caption="8 AI-powered search engines — Google Maps, LinkedIn, Reddit, Intent Signals, AI Enrichment, and more"
          />
        </Reveal>

        <div className="space-y-4 mb-12">
          {caseStudies.slice(3, 6).map((study, i) => (
            <Reveal key={i}><CaseStudyCard study={study} /></Reveal>
          ))}
        </div>

        {/* Outreach + Landing Pages */}
        <Reveal className="mb-6">
          <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans text-center">
            How We Convert — Outreach + Landing Pages
          </span>
        </Reveal>
        <div className="space-y-4 mb-12">
          <Reveal>
            <DashboardImage
              src="/assets/proof-landingpages.png"
              caption="Landing page engine — 776.8K visitors, 6.5% conversion, $1.5M attributed revenue"
            />
          </Reveal>
          <Reveal>
            <DashboardImage
              src="/assets/proof-outreach.png"
              caption="Autonomous cold outreach — personalized email sequences, proposal delivery, instant follow-up"
            />
          </Reveal>
        </div>

        {/* AI Call Center */}
        <Reveal className="mb-6">
          <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans text-center">
            How We Close — AI Call Center
          </span>
        </Reveal>
        <Reveal>
          <DashboardImage
            src="/assets/proof-callcenter.png"
            caption="AI cold caller (Brooke) — Gemini 3.1 Flash Live, NEPQ methodology, $0.04/min, 99/100 performance score"
          />
        </Reveal>
      </section>

      {/* Footer CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <Reveal>
          <div className="w-12 h-px bg-white/10 mx-auto mb-8" />
          <p className="text-zinc-600 text-xs tracking-[0.2em] uppercase mb-3 font-sans">
            You already have a call booked with Brooke
          </p>
          <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
            See you there.
          </p>
          <a
            href="https://mynewstaff.ai"
            className="inline-block mt-8 text-[10px] tracking-[0.3em] text-zinc-500 uppercase hover:text-white transition-colors font-sans"
          >
            mynewstaff.ai →
          </a>
        </Reveal>
      </section>
    </main>
  );
}
