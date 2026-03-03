"use client";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "39 behavioral email templates, 3D animated website, and a lead scraping pipeline — all deployed in 12 days. Our outreach runs itself now.",
        name: "BCC Legal",
        initials: "BL",
        service: "B2B Legal Services",
        metric: "39 templates • 12-day deploy",
    },
    {
        text: "Voice-cloned AI chatbot, 18 email sequences, WhatsApp funnels, and a membership portal. My entire practice runs 24/7 without me touching anything.",
        name: "Armando Franco",
        initials: "AF",
        service: "Executive Coaching",
        metric: "Full automation • 24/7 AI voice",
    },
    {
        text: "We went from 5 leads a week to booking 40 meetings a month. The validation engine is terrifyingly effective.",
        name: "Jordan",
        initials: "J",
        service: "Growth Scale",
        metric: "5 leads/wk → 40 meetings/mo",
    },
    {
        text: "The AI videos look better than our studio shoots. Fully automated 24/7 content production across three platforms.",
        name: "Casey",
        initials: "C",
        service: "AI Video",
        metric: "100+ videos/mo • 3 platforms",
    },
    {
        text: "MyNewStaff replaced our entire SDR layer. We are closing deals with 90% margins now.",
        name: "Michael",
        initials: "M",
        service: "Automation",
        metric: "90% margins • Zero SDR cost",
    },
    {
        text: "I was skeptical about 'viral' distribution. Then we hit 1M views in week two. The system works.",
        name: "Sophia",
        initials: "S",
        service: "AI Content",
        metric: "1M views • Week 2",
    },
    {
        text: "The speed of execution is unmatched. We launched a full GTM infrastructure in 9 days.",
        name: "James",
        initials: "J",
        service: "Infrastructure",
        metric: "Full GTM • 9-day launch",
    },
];

export const TestimonialCarousel = () => {
    return (
        <div className="w-full relative overflow-hidden py-10">
            <div className="flex">
                <CarouselRow items={testimonials} />
                <CarouselRow items={testimonials} />
            </div>

            {/* Gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        </div>
    );
};

const CarouselRow = ({ items }: { items: typeof testimonials }) => (
    <motion.div
        animate={{ x: "-100%" }}
        transition={{ ease: "linear", duration: 50, repeat: Infinity }}
        className="flex gap-8 px-4 flex-shrink-0"
    >
        {items.map((t, i) => (
            <div
                key={i}
                className="w-[320px] md:w-[420px] flex-shrink-0 bg-zinc-900/50 border border-white/10 p-8 rounded-xl backdrop-blur-sm relative group hover:border-white/30 transition-colors"
            >
                <div className="absolute top-6 right-6 text-2xl text-zinc-700 opacity-50">&ldquo;</div>

                {/* Metric badge */}
                <div className="inline-block px-3 py-1 bg-white/[0.06] border border-white/10 rounded-full mb-5">
                    <span className="text-[9px] tracking-[0.15em] uppercase text-zinc-400 font-sans">{t.metric}</span>
                </div>

                <p className="text-base text-zinc-300 mb-8 font-light leading-relaxed">
                    {t.text}
                </p>

                <div className="flex items-center gap-4">
                    {/* Initial circle instead of fake photo */}
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center text-sm font-bold text-zinc-400 group-hover:text-white group-hover:border-white/30 transition-all">
                        {t.initials}
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm tracking-wide uppercase">{t.name}</div>
                        <div className="text-zinc-500 text-xs">{t.service}</div>
                    </div>
                </div>
            </div>
        ))}
    </motion.div>
);
