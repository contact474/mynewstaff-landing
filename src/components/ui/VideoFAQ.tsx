"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Do I need to film anything?",
        answer: "Only once — about 30-60 minutes of footage to train the AI on your voice and likeness. After that, you never stand in front of a camera again. We handle everything."
    },
    {
        question: "I don't want my face on camera at all.",
        answer: "No problem. We produce high-performing faceless content — carousels, cinematic B-roll, motion graphics, text overlays, educational slides. Some of our best-converting accounts are fully faceless. We'll design the right content mix for your brand."
    },
    {
        question: "Can people tell it's AI?",
        answer: "On mobile, in short-form format — virtually impossible. We use the latest generation avatar technology with micro-expressions, natural pauses, and realistic lip-sync. For outreach, it's indistinguishable from a real recording."
    },
    {
        question: "Do you write the scripts?",
        answer: "Yes. Our AI analyzes viral patterns in your niche to generate high-retention scripts. You can approve, edit, or put the whole process on autopilot. Most clients choose autopilot after seeing the first batch."
    },
    {
        question: "100 videos sounds like spam. Won't that hurt my brand?",
        answer: "Quite the opposite. Every video is uniquely scripted with different hooks, angles, and formats. It's not the same video 100 times — it's 100 different pieces of content designed to test what resonates and then double down on winners."
    },
    {
        question: "What if I want to change the style or topics?",
        answer: "You have full control — edit scripts, request specific topics, adjust visual direction. That said, we recommend letting the data guide the strategy. We'll show you why on the call."
    },
    {
        question: "Does this work for any industry?",
        answer: "If your buyers scroll a phone, yes. We've deployed for SaaS, real estate, legal, med spa, coaching, ecom, and more. Every campaign is niche-calibrated — not templated. Ask us about your specific market."
    },
    {
        question: "What if I already post content?",
        answer: "Great — that means you understand the game. We take what you're doing and add volume, consistency, and data-driven optimization on top. Most clients see 3-5x more reach within 30 days of adding our engine alongside their existing efforts."
    },
];

export const VideoFAQ = () => {
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
