"use client";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "We went from 5 leads a week to booking 40 meetings a month. The validation engine is terrifyingly effective.",
        name: "Alex Rivera",
        role: "Founder, ScaleTech",
        img: "https://i.pravatar.cc/150?img=11",
        service: "Growth Scale"
    },
    {
        text: "The AI videos look better than our studio shoots. It's fully automated 24/7 content production.",
        name: "Sarah Chen",
        role: "Marketing Director, Veltra",
        img: "https://i.pravatar.cc/150?img=5",
        service: "AI Video"
    },
    {
        text: "MyNewStaff replaced our entire SDR layer. We are closing deals with 90% margins now.",
        name: "Marcus Thorne",
        role: "CEO, Thorne Capital",
        img: "https://i.pravatar.cc/150?img=3",
        service: "Automation"
    },
    {
        text: "I was skeptical about 'viral' distribution. Then we hit 1M views in week two. The system works.",
        name: "Elena Rodriguez",
        role: "CMO, Luxe Brands",
        img: "https://i.pravatar.cc/150?img=9",
        service: "AI Content"
    },
    {
        text: "The speed of execution is unmatched. We launched a full GTM infrastructure in 9 days.",
        name: "David Kim",
        role: "VP Sales, OmniCorp",
        img: "https://i.pravatar.cc/150?img=13",
        service: "Infrastructure"
    }
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
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        className="flex gap-8 px-4 flex-shrink-0"
    >
        {items.map((t, i) => (
            <div
                key={i}
                className="w-[400px] flex-shrink-0 bg-zinc-900/50 border border-white/10 p-8 rounded-xl backdrop-blur-sm relative group hover:border-white/30 transition-colors"
            >
                <div className="absolute top-6 right-6 text-2xl text-zinc-700 opacity-50">"</div>

                <p className="text-lg text-zinc-300 mb-8 font-light leading-relaxed">
                    {t.text}
                </p>

                <div className="flex items-center gap-4">
                    <img
                        src={t.img}
                        alt={t.name}
                        className="w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all object-cover"
                    />
                    <div>
                        <div className="text-white font-bold text-sm tracking-wide uppercase">{t.name}</div>
                        <div className="text-zinc-500 text-xs flex gap-2">
                            <span>{t.role}</span>
                            <span className="text-zinc-700 mx-1">•</span>
                            <span className="text-zinc-400">{t.service}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </motion.div>
);
