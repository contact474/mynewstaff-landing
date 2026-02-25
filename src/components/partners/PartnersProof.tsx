"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {prefix}
          <motion.span>{value.toLocaleString()}</motion.span>
          {suffix}
        </motion.span>
      ) : (
        <span className="opacity-0">
          {prefix}
          {value}
          {suffix}
        </span>
      )}
    </span>
  );
}

const stats = [
  {
    value: 2.6,
    suffix: "M",
    prefix: "$",
    label: "Revenue Closed",
    detail: "Across 6 active clients in Q1 2026 alone",
  },
  {
    value: 84,
    suffix: "K+",
    label: "Leads Generated",
    detail: "Multi-channel scraping from 7 platforms",
  },
  {
    value: 441,
    suffix: "%",
    label: "Avg ROI Delivered",
    detail: "Before-vs-after tracked for every client",
  },
  {
    value: 13,
    suffix: "",
    label: "Landing Pages Live",
    detail: "Conversion-optimized, A/B tested funnels",
  },
];

const capabilities = [
  {
    title: "Mission Control",
    desc: "AI-powered CRM with autonomous agents — CEO, Content Head, Outreach Head, Dev Head — running 24/7 on autopilot.",
    tag: "LIVE",
  },
  {
    title: "Content Engine",
    desc: "9-platform trend discovery → 5-dimension scoring → AI carousel generation → branded PNG rendering. Automated every 8 hours.",
    tag: "LIVE",
  },
  {
    title: "Behavioral Email System",
    desc: "4-campaign engine: Pure Value → Social Proof → Conversion → Re-engagement. Cold leads never get pitched. Behavioral triggers route leads through the right sequence.",
    tag: "LIVE",
  },
  {
    title: "Landing Pages & Funnels",
    desc: "Next.js 15 + Tailwind v4 + GSAP animations. Dark-mode, conversion-optimized, world-class design. Deployed on Vercel edge.",
    tag: "SHIPPED",
  },
  {
    title: "AI Video Production",
    desc: "Explainer videos, slide-based presentations, AI voiceover — all produced in-house with our generation pipeline.",
    tag: "ACTIVE",
  },
  {
    title: "Lead Generation",
    desc: "High-intent Reddit prospecting, AI cold emails via GHL, multi-channel outreach. Fully autonomous pipeline from discovery to booked call.",
    tag: "ACTIVE",
  },
];

export function PartnersProof() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
      {/* Header */}
      <Reveal className="max-w-5xl mx-auto text-center mb-16">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          Proof of Work
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white mb-6">
          WE <span className="shimmer-text">BUILD.</span> WE{" "}
          <span className="shimmer-text">SHIP.</span>
        </h2>
        <p className="text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
          Everything we offer in this program is built and battle-tested across
          real client deployments. This isn&apos;t theory — it&apos;s live infrastructure.
        </p>
      </Reveal>

      {/* Stats Grid */}
      <Reveal className="max-w-5xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 text-center ${i > 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""} ${i >= 2 ? "border-t md:border-t-0 border-white/10" : ""}`}
            >
              <div className="font-wide text-3xl md:text-4xl text-white mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-xs text-zinc-300 font-sans uppercase tracking-[0.15em] mb-2">
                {stat.label}
              </p>
              <p className="text-[10px] text-zinc-600 font-sans leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Capabilities */}
      <Reveal className="max-w-5xl mx-auto">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-6 font-sans text-center">
          What Powers Your Deliverables
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-8 md:p-10 border-b border-r border-white/10 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <h4 className="font-wide text-sm uppercase text-white">
                  {cap.title}
                </h4>
                <span
                  className={`text-[9px] tracking-[0.2em] uppercase font-sans px-2 py-0.5 border ${
                    cap.tag === "LIVE"
                      ? "border-green-500/30 text-green-400/80"
                      : cap.tag === "SHIPPED"
                        ? "border-blue-500/30 text-blue-400/80"
                        : "border-amber-500/30 text-amber-400/80"
                  }`}
                >
                  {cap.tag}
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Live Dashboard Screenshots */}
      <Reveal className="max-w-5xl mx-auto mt-20 mb-20">
        <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-6 font-sans text-center">
          Live Systems — Real Screenshots
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Dashboard Overview",
              src: "/assets/proof-overview.png",
              alt: "MNS Dashboard showing $2.6M revenue, 84.2K leads, 441% ROI across 6 clients",
            },
            {
              label: "Cold Outreach Engine",
              src: "/assets/proof-outreach.png",
              alt: "Cold outreach dashboard showing 17.4K emails sent, 54.3% open rate, 8.6% reply rate",
            },
            {
              label: "AI Lead Scraper",
              src: "/assets/proof-leadscraper.png",
              alt: "Lead scraper showing 65.6K leads scraped from 7 platforms with intent scoring",
            },
            {
              label: "Landing Pages & Funnels",
              src: "/assets/proof-landingpages.png",
              alt: "13 landing pages with 776.8K visitors, 6.5% conversion, $1.5M revenue attribution",
            },
          ].map((item, i) => (
            <div key={i} className="border border-white/10 overflow-hidden group">
              <div className="p-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans">
                  {item.label} — Live
                </span>
              </div>
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Powered By / Integrations */}
      <Reveal className="max-w-5xl mx-auto mt-20 text-center">
        <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-sans mb-10">
          Powered By & Integrated With
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-7 md:gap-x-14">
          {/* GoHighLevel */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">GoHighLevel</span>
          </div>
          {/* Anthropic */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.503-4.076H5.248L3.741 20.48H0l6.569-16.96zm1.88 5.725-2.33 6.33h4.658l-2.328-6.33z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Anthropic</span>
          </div>
          {/* Google AI */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M12 11h8.533c.089.518.133 1.064.133 1.636 0 2.456-.67 4.544-1.944 6.111C17.278 20.494 14.933 21.6 12 21.6c-2.4 0-4.578-.89-6.222-2.534A8.764 8.764 0 013.244 12.8c0-2.4.89-4.578 2.534-6.222A8.764 8.764 0 0112 4.044c2.267 0 4.178.8 5.644 2.134l-2.311 2.222C14.4 7.556 13.333 7.111 12 7.111A5.37 5.37 0 006.667 12.444 5.37 5.37 0 0012 17.778c2.578 0 4.222-1.467 4.578-3.511H12V11z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Google AI</span>
          </div>
          {/* Stripe */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Stripe</span>
          </div>
          {/* Vercel */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M12 1L0 22h24L12 1z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Vercel</span>
          </div>
          {/* HubSpot */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.2 2.2 0 0017.235.838h-.066a2.2 2.2 0 00-2.196 2.196v.066c0 .87.517 1.617 1.257 1.964v2.866a5.828 5.828 0 00-2.834 1.37L7.156 4.893a2.386 2.386 0 00.072-.559A2.4 2.4 0 004.835 1.94a2.4 2.4 0 00-2.394 2.394 2.4 2.4 0 002.394 2.394c.49 0 .946-.153 1.326-.41l6.272 4.248a5.834 5.834 0 00-.908 3.124c0 1.168.347 2.256.938 3.173l-1.97 1.97a1.85 1.85 0 00-.544-.087 1.87 1.87 0 00-1.866 1.866 1.87 1.87 0 001.866 1.866 1.87 1.87 0 001.866-1.866c0-.197-.034-.385-.087-.564l1.934-1.934a5.856 5.856 0 003.547 1.196 5.86 5.86 0 005.857-5.857 5.852 5.852 0 00-4.903-5.776zm-1.004 8.89a3.12 3.12 0 01-3.115-3.116 3.12 3.12 0 013.115-3.116 3.12 3.12 0 013.116 3.116 3.12 3.12 0 01-3.116 3.116z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">HubSpot</span>
          </div>
          {/* Zapier */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M15.977 8.023h-3.106l2.186-3.779a.414.414 0 00-.358-.619H9.97a.414.414 0 00-.372.232L5.578 12.37a.414.414 0 00.372.596h3.258l-2.62 7.166a.414.414 0 00.717.403l8.672-11.895a.414.414 0 00-.337-.617h.337z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Zapier</span>
          </div>
          {/* Meta */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M6.915 4.03c-1.968 0-3.402 1.352-4.344 3.24C1.53 9.186.86 11.742.86 13.634c0 1.078.213 1.96.657 2.614.46.678 1.138 1.02 1.98 1.02 1.04 0 1.938-.472 2.89-1.496.814-.876 1.672-2.136 2.56-3.744l.96-1.74c1.11-2.016 2.39-3.592 3.84-4.62C15.163 4.636 16.64 4.03 18.18 4.03c1.944 0 3.52.98 4.476 2.726.868 1.584 1.344 3.756 1.344 6.07 0 2.028-.444 3.672-1.26 4.83-.84 1.188-2.04 1.812-3.54 1.812-1.416 0-2.58-.576-3.444-1.62-.1.152-.2.296-.312.444-.66.876-1.404 1.572-2.244 2.004a5.03 5.03 0 01-2.4.576c-1.944 0-3.48-.94-4.416-2.592C5.5 17.098 5 15.16 5 12.826c0-2.376.528-4.77 1.596-6.87C7.788 3.606 9.468 2 11.892 2c1.308 0 2.388.36 3.228 1.044a6.27 6.27 0 011.836 2.7l-1.716.996A4.61 4.61 0 0013.94 4.8c-.564-.504-1.26-.768-2.04-.768h-.012z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Meta</span>
          </div>
          {/* Reddit */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.28c.039.213.059.43.059.652 0 3.34-3.89 6.051-8.686 6.051-4.797 0-8.686-2.71-8.686-6.05 0-.234.023-.463.066-.688a1.78 1.78 0 01-.715-1.43 1.787 1.787 0 011.79-1.786c.469 0 .894.184 1.21.484 1.193-.856 2.832-1.406 4.637-1.477l.96-4.07a.34.34 0 01.41-.254l2.97.632a1.235 1.235 0 012.348.48 1.236 1.236 0 01-1.235 1.235c-.671 0-1.216-.54-1.235-1.207l-2.637-.562-.852 3.617c1.77.09 3.367.636 4.535 1.477a1.78 1.78 0 011.199-.476 1.787 1.787 0 011.79 1.785c0 .602-.3 1.133-.758 1.457zM8.727 11.285a1.398 1.398 0 00-1.395 1.395c0 .77.625 1.395 1.395 1.395.77 0 1.395-.625 1.395-1.395 0-.77-.625-1.395-1.395-1.395zm6.546 0a1.398 1.398 0 00-1.395 1.395c0 .77.625 1.395 1.395 1.395s1.395-.625 1.395-1.395c0-.77-.625-1.395-1.395-1.395zm-5.156 4.98c-.117-.117-.117-.309 0-.426.117-.117.309-.117.426 0 .684.684 1.766.97 2.457.97s1.773-.286 2.457-.97c.117-.117.309-.117.426 0 .117.117.117.309 0 .426-.82.82-2.063 1.137-2.883 1.137s-2.063-.316-2.883-1.137z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Reddit</span>
          </div>
          {/* Cloudflare */}
          <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors duration-500 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
              <path d="M16.51 17.255l.48-1.677c.095-.333.054-.64-.115-.865a.884.884 0 00-.705-.355l-8.467-.114a.173.173 0 01-.145-.082.176.176 0 01-.015-.168.213.213 0 01.19-.132l8.556-.114c.87-.04 1.806-.772 2.12-1.662l.397-1.134a.327.327 0 00.016-.145 5.327 5.327 0 00-10.3-1.293 3.207 3.207 0 00-4.998 2.467 2.248 2.248 0 00-.02.264 3.988 3.988 0 00-3.18 3.456.176.176 0 00.173.198l15.97.001a.207.207 0 00.197-.148l.046-.196zm2.465-2.073a.128.128 0 00-.127.099l-.283 1c-.096.332-.054.64.114.864.155.206.4.328.706.355l1.774.114c.06.002.11.037.145.082a.176.176 0 01.015.167.213.213 0 01-.19.132l-1.862.114a2.16 2.16 0 00-2.12 1.663l-.112.393a.168.168 0 00.163.212h6.357a.176.176 0 00.173-.14 4.453 4.453 0 00-4.753-5.055z"/>
            </svg>
            <span className="text-xs md:text-sm font-wide uppercase tracking-[0.12em]">Cloudflare</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
