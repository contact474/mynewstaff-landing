"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqItems = [
    {
        q: "How long until I see results?",
        a: "Most clients see their first qualified leads within 7–14 days of onboarding. Our systems are pre-built — we configure and deploy, not build from scratch. The BCC Legal build went from zero to live in 12 days with 39 email templates and a full lead pipeline running.",
    },
    {
        q: "What if it doesn't work for my business?",
        a: "We offer a 90-Day Pipeline Guarantee: if you don't get at least 30 qualified leads in your pipeline within 90 days, we keep working at zero cost until you do. No contracts. No exit fees. Zero risk.",
    },
    {
        q: "How much does it cost?",
        a: "Plans start at $1,997/month. That replaces $14K+ in payroll — content writer, SDR, CRM manager, ad manager, and tool subscriptions. The math: breakeven is literally one closed deal. Everything after that is pure profit.",
    },
    {
        q: "How is this different from a regular marketing agency?",
        a: "Agencies send reports. We send leads. Our AI system runs campaigns, generates content, qualifies leads, and handles follow-ups autonomously — 24/7, without you managing it. You review results once a week. That's it.",
    },
    {
        q: "What industries do you work with?",
        a: "We've deployed across roofing, dental, legal, real estate, SaaS, coaching, restaurants, and franchise verticals. If your business closes deals, we can build you a lead machine. The audit tells us exactly how — free of charge.",
    },
];

export default function AdsPageFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full">
            {faqItems.map((item, idx) => (
                <div key={idx} className="border-b border-white/8 last:border-none">
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full py-7 flex justify-between items-center text-left hover:text-zinc-300 transition-colors group cursor-pointer"
                    >
                        <span
                            className={`text-base md:text-lg font-wide uppercase leading-snug pr-4 ${openIndex === idx ? "text-white" : "text-zinc-400"}`}
                        >
                            {item.q}
                        </span>
                        <span className="p-2 border border-white/10 rounded-full group-hover:border-white/30 transition-colors shrink-0">
                            {openIndex === idx ? (
                                <Minus className="w-4 h-4 text-white" />
                            ) : (
                                <Plus className="w-4 h-4 text-zinc-500" />
                            )}
                        </span>
                    </button>
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <p className="pb-7 text-zinc-500 text-sm md:text-base leading-relaxed max-w-[90%] font-sans">
                                    {item.a}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
