"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How fast can we launch?",
        answer: "Most clients are live within 7-14 days. That's not a marketing claim — our BCC Legal build went from zero to 39 email templates, a 3D website, and a lead scraping pipeline in 12 days. By Week 3, you'll see qualified meetings landing on your calendar. We move fast because our systems are pre-built and battle-tested — we configure and deploy, not build from scratch."
    },
    {
        question: "What if it doesn't work?",
        answer: "90-Day Pipeline Guarantee: if we don't generate at least 100 qualified leads in your pipeline within 90 days, we continue working at zero cost until we hit that number. No contracts, no exit fees, no awkward calls. We've deployed across legal, coaching, hospitality, and franchise verticals. The system works because it's built on data, automation, and relentless optimization — not hope."
    },
    {
        question: "I already have an agency. Why switch?",
        answer: "Most clients come to us after spending $5K-$15K/mo on agencies that deliver reports, not revenue. Our system is measured in booked meetings and closed deals — not impressions, clicks, or \"brand awareness.\" We deployed an executive coaching practice with AI voice cloning, 18 email sequences, WhatsApp funnels, and a membership portal — fully autonomous, running 24/7. Ask your current agency if they can do that in 14 days. If they can, keep them."
    },
    {
        question: "$8,500/month — isn't that expensive?",
        answer: "It replaces $14K+/month in payroll — content writer ($4K), SDR ($3K), CRM manager ($3K), ad manager ($2K), outreach tool subscriptions ($2K). Unlike employees, our system works 24/7, never calls in sick, and scales instantly. The math: 10,000 leads scraped → 200 conversations → 20 qualified meetings → 5 clients at $10K avg = $50K/month from $8.5K investment. Breakeven is literally 1 closed deal. Everything after is profit."
    },
    {
        question: "How is this different from hiring a VA or freelancer?",
        answer: "A freelancer does one thing. A VA does whatever you tell them — which means you're still managing. We deploy an autonomous system — AI content generation, lead scraping, behavioral email sequences, outreach automation, CRM pipeline management, and conversation AI — that runs 24/7 without management. You don't supervise it. You check results. One of our franchise clients has 180 emails/day going out with 45%+ open rates while the founder focuses on closing."
    },
    {
        question: "Do you replace our sales team?",
        answer: "No — we supercharge them. We replace the grunt work: cold calls, manual follow-up, lead research, CRM data entry. Your closers stay focused on closing. We just make sure their calendar is never empty. Think of it as giving your sales team an army of AI assistants that work 24/7 feeding them pre-qualified meetings."
    },
    {
        question: "What do I need to provide?",
        answer: "About 2 hours of your time for onboarding. We capture your offer, brand voice, and positioning. After that, we handle everything — content creation, lead scraping, outreach sequences, CRM setup, ad management. You approve the initial setup, then watch the pipeline fill. Most clients spend less than 30 minutes per week reviewing dashboards."
    },
    {
        question: "Is this a long-term contract?",
        answer: "Zero lock-in. Month-to-month. Cancel anytime with 30 days notice. We operate this way because the results speak for themselves — clients stay because the ROI makes leaving feel stupid, not because a contract forces them. We've never had a client churn after seeing their 90-day results."
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
