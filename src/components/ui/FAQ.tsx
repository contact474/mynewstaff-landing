"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How fast can we launch?",
        answer: "Our standard deployment timeline is 7-14 days. This includes infrastructure setup, AI training, and initial campaign launch. You will see live meetings on your calendar by Week 3."
    },
    {
        question: "Do you replace our sales team?",
        answer: "We replace the 'grunt work'. Your sales team shouldn't be cold calling or manually following up. We build the engine that feeds them qualified meetings, allowing them to focus purely on closing."
    },
    {
        question: "Is the AI video quality realistic?",
        answer: "Yes. We use state-of-the-art cloning technology. It captures your voice, mannerisms, and likeness. For cold outreach, it is indistinguishable from a manually recorded video."
    },
    {
        question: "What do I need to provide?",
        answer: "We need about 2 hours of your time for onboarding to capture your voice/likeness and understand your offer. After that, we handle the entire technical implementation."
    },
    {
        question: "How does the pricing work?",
        answer: "We offer three tiers based on volume and complexity. The 'Engine' package is our most popular, offering a full end-to-end solution. Book a call to get a custom quote based on your growth targets."
    }
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
