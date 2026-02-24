"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How fast can we launch?",
        answer: "Most clients are live within 7-14 days. By Week 3, you'll see qualified meetings landing on your calendar. We move fast because our systems are pre-built — we configure, not build from scratch."
    },
    {
        question: "Do you replace our sales team?",
        answer: "No. We replace the grunt work — cold calls, manual follow-up, lead research. Your closers stay focused on closing. We just make sure their calendar is never empty."
    },
    {
        question: "What if I don't want to be on camera?",
        answer: "Totally fine. We produce faceless content — carousels, motion graphics, B-roll montages, educational slides — that performs just as well on the feed. Many of our highest-performing campaigns use zero face-to-camera footage. We'll show you the options on the strategy call."
    },
    {
        question: "I already have an agency. Why switch?",
        answer: "Most clients come to us after spending $5K-$15K/mo on agencies that deliver reports, not revenue. Our system is measured in booked meetings and closed deals — not impressions. If your current setup is printing money, keep it. If not, let's talk."
    },
    {
        question: "How is this different from hiring a VA or freelancer?",
        answer: "A freelancer does one thing. A VA does whatever you tell them. We deploy an autonomous system — AI content, lead scraping, outreach sequencing, CRM automation — that runs 24/7 without management. You don't supervise it. You check results."
    },
    {
        question: "What do I need to provide?",
        answer: "About 2 hours of your time for onboarding. We capture your offer, voice, and positioning. After that, we handle everything — you just approve and watch the pipeline fill."
    },
    {
        question: "Is this a long-term contract?",
        answer: "No lock-ins. We operate month-to-month because we believe the results speak for themselves. Most clients stay because the ROI makes the decision obvious."
    },
    {
        question: "How does the pricing work?",
        answer: "We have three tiers based on volume and complexity. The specifics depend on your market, deal size, and growth targets. Book a strategy call — we'll map it to your exact situation and show you the projected ROI before you commit to anything."
    },
];

export const FAQ = () => {
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
