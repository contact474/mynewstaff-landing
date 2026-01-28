"use client";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "I posted 30 AI videos in a month and my TikTok went from 2k to 85k followers. I didn't record a single second.",
        name: "Jason Miller",
        role: "Content Creator",
        img: "https://i.pravatar.cc/150?img=60",
        service: "Viral Scale"
    },
    {
        text: "The voice clone is scary accurate. My own mother couldn't tell it wasn't me on the phone.",
        name: "Emily Zhang",
        role: "Realtor",
        img: "https://i.pravatar.cc/150?img=44",
        service: "Clone Tech"
    },
    {
        text: "We replaced our $5k/mo video editor with this system. The quality is cleaner and the hooks are better.",
        name: "Marcus Cole",
        role: "Agency Owner",
        img: "https://i.pravatar.cc/150?img=33",
        service: "Cost Savings"
    },
    {
        text: "Finally a way to be on LinkedIn, Instagram, and YouTube Shorts every day without burning out.",
        name: "Sarah Jenkins",
        role: "Consultant",
        img: "https://i.pravatar.cc/150?img=35",
        service: "Omnipresence"
    },
    {
        text: "The 'Retention Arch' structure they use actually works. Our average watch time doubled overnight.",
        name: "David Ross",
        role: "E-com Founder",
        img: "https://i.pravatar.cc/150?img=12",
        service: "Engagement"
    }
];

export const VideoTestimonials = () => {
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
