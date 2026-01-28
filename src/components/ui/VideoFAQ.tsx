"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Do I need to film anything?",
        answer: "Only once. We need about 30-60 minutes of footage to train the AI on your voice and likeness. After that, you never have to stand in front of a camera again."
    },
    {
        question: "Can people tell it's AI?",
        answer: "For short-form content on mobile screens, it is nearly impossible to tell. We use the latest generation of avatar technology that replicates micro-expressions and natural pauses."
    },
    {
        question: "Do you write the scripts?",
        answer: "Yes. Our AI analyzes viral trends in your niche to generate high-retention scripts. You can approve or edit them before production, or put the entire process on autopilot."
    },
    {
        question: "What if I want to change something?",
        answer: "You have full control. You can edit scripts, request specific topics, or ask for changes to the visual style. Our system is designed to be flexible while doing the heavy lifting."
    },
    {
        question: "Does this work for any platform?",
        answer: "Yes. We optimize formats for TikTok, Instagram Reels, YouTube Shorts, and even LinkedIn video. One piece of content is repurposed natively for all channels."
    }
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
