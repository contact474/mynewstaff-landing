"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How fast can we launch?",
        answer: "Most clients are live within 7-14 days. By Week 3, qualified meetings start hitting your calendar. Our systems are pre-built — we configure to your business, not build from scratch."
    },
    {
        question: "What if I don't want to use AI clones or be on video?",
        answer: "You don't have to. The growth engine works with or without video. We run automated outreach sequences, lead scraping, CRM pipelines, and ad campaigns that are entirely faceless. Video is an accelerator — not a requirement."
    },
    {
        question: "We've been burned by agencies before. What's different?",
        answer: "Most agencies sell you hours and impressions. We build autonomous systems that produce booked meetings and pipeline — not PDFs. No long contracts, no vanity metrics. If the system doesn't perform, you'll know within 30 days."
    },
    {
        question: "Do I need a big team to manage this?",
        answer: "No. That's the point. Our system runs autonomously — content creation, lead scraping, outreach, follow-up, booking. You need exactly one person to show up to the meetings we generate."
    },
    {
        question: "Is this just cold email spam?",
        answer: "No. We build multi-channel sequences — email, LinkedIn, SMS, retargeting — that feel personal because they are. Every message is dynamically personalized to the prospect's role, company, and pain points. We'll walk you through the exact sequences on the strategy call."
    },
    {
        question: "What industries does this work for?",
        answer: "B2B services, SaaS, agencies, consulting, real estate, legal, med spa, coaching — any business with a $2K+ deal size and a definable ICP. We've run campaigns across 20+ verticals. Ask about yours."
    },
    {
        question: "How do you source the leads?",
        answer: "Proprietary AI scraping that pulls high-intent signals from multiple data sources — not purchased lists. Every lead is enriched and verified before outreach begins. The specifics depend on your market — we'll map the strategy on the call."
    },
    {
        question: "Is this a long-term contract?",
        answer: "Month-to-month. No lock-ins. We keep clients because the pipeline justifies it, not because of a contract. Most clients stay 12+ months because the math is obvious."
    },
];

export const ScaleFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-white/10 last:border-none">
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full py-8 flex justify-between items-center text-left hover:text-zinc-300 transition-colors group"
                    >
                        <span className={`text-lg md:text-xl font-wide uppercase ${openIndex === idx ? 'text-white' : 'text-zinc-400'}`}>
                            {faq.question}
                        </span>
                        <span className="p-2 border border-white/10 rounded-full group-hover:border-white/30 transition-colors">
                            {openIndex === idx ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-zinc-500" />}
                        </span>
                    </button>
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="pb-8 text-zinc-500 text-sm md:text-base leading-relaxed max-w-[90%]">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}
