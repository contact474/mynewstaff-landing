"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Premium hosts section — Apple-grade squircle cards with:
 * - Scroll-linked parallax on the portraits
 * - Magnetic hover glow
 * - Grain texture overlay
 * - Shimmer gradient borders on hover
 */

// Squircle via superellipse SVG mask (approximate Apple shape)
const squircleClass =
  "[border-radius:38px] md:[border-radius:52px] overflow-hidden relative";

type Host = {
  initials: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  gradient: string;
};

const HOSTS: Host[] = [
  {
    initials: "LL",
    name: "Luka Lah",
    handle: "@ga.god",
    role: "Founder · MyNewStaff.ai",
    bio: "Built the autonomous AI stack that runs MNS — cold callers, content engines, ad systems, and lead machines that operate without humans in the loop. Slovenian Government COVID partnership alum. Deploys faster than most teams plan.",
    gradient:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 55%), radial-gradient(circle at 80% 80%, rgba(129,140,248,0.25), transparent 60%)",
  },
  {
    initials: "LS",
    name: "Los Silva",
    handle: "@loshustle",
    role: "Operator · Mastermind Advisor",
    bio: "Advisor to high-ticket masterminds and 7-figure founders. The operator who turns technical leverage into real revenue, real deals, real positioning. Knows how to sell the room before the room knows it's being sold.",
    gradient:
      "radial-gradient(circle at 20% 20%, rgba(251,191,36,0.2), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.12), transparent 60%)",
  },
];

function HostCard({ host, index }: { host: Host; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Reveal delay={0.1 + index * 0.12}>
      <motion.div
        ref={ref}
        style={{ y }}
        className={`group ${squircleClass} border border-white/10 hover:border-white/30 transition-colors p-8 md:p-12 h-full bg-gradient-to-b from-white/[0.04] to-transparent`}
        whileHover={{ y: -6, transition: { duration: 0.4 } }}
      >
        {/* Ambient gradient */}
        <div
          className="absolute inset-0 opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: host.gradient }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Shimmer border on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "shimmer 3s linear infinite",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-8">
            {/* Squircle avatar */}
            <div
              className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center text-2xl md:text-3xl font-wide font-bold text-black shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
              style={{ borderRadius: "30% / 30%" }}
            >
              <span className="absolute inset-0 rounded-[inherit] ring-1 ring-white/40" />
              {host.initials}
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-1">
                {host.role}
              </div>
              <h3 className="text-2xl md:text-3xl font-wide font-bold uppercase tracking-tight">
                {host.name}
              </h3>
              <p className="text-xs text-zinc-500 tracking-wider mt-1">
                {host.handle}
              </p>
            </div>
          </div>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            {host.bio}
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function IntensiveHosts() {
  return (
    <section className="border-t border-white/5 py-20 md:py-32 px-4 relative">
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">
            Your Hosts
          </p>
          <h2 className="text-3xl md:text-5xl font-wide font-bold uppercase tracking-tighter leading-[0.95]">
            Two operators.
            <br />
            <span className="shimmer-text">One room.</span>
          </h2>
        </div>
      </Reveal>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        {HOSTS.map((host, i) => (
          <HostCard key={host.name} host={host} index={i} />
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
      `}</style>
    </section>
  );
}
