"use client";
import { motion } from "framer-motion";

export const LaunchScaleDiagram = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-8 relative min-h-[500px] flex items-center justify-center">
            {/* Central Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Ripples */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-white/5 rounded-full"
                        style={{ width: `${i * 30}%`, height: `${i * 30}%` }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    />
                ))}

                {/* Core */}
                <div className="relative z-10 w-64 h-64 rounded-full border border-white/20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                    <span className="text-4xl font-bold font-wide text-white mb-2">10,000</span>
                    <span className="text-sm tracking-[0.2em] uppercase text-zinc-500">Leads / Month</span>
                </div>
            </div>

            {/* Satellites */}
            <div className="absolute inset-0 flex flex-col justify-between py-12 px-4 md:px-24 pointer-events-none">
                {/* Top Row */}
                <div className="flex justify-between w-full">
                    <Satellite label="AI Scraping" desc="High-intent targeting" number="1" />
                    <Satellite label="Viral Distro" desc="TikTok, IG, Shorts" number="2" align="right" />
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between w-full">
                    <Satellite label="Retargeting" desc="Warm traffic only" number="3" />
                    <Satellite label="Outreach" desc="Partnership setup" number="4" align="right" />
                </div>
            </div>

            {/* Connecting Lines (Decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
                <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
                <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
                <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
            </svg>
        </div>
    );
};

const Satellite = ({ label, desc, number, align = "left" }: { label: string, desc: string, number: string, align?: "left" | "right" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`pointer-events-auto flex items-center gap-4 bg-zinc-950/80 border border-white/10 p-4 rounded-xl backdrop-blur-sm max-w-[250px] ${align === "right" ? "flex-row-reverse text-right" : "text-left"}`}>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold font-wide">
            {number}
        </div>
        <div>
            <h4 className="text-sm font-bold font-wide uppercase text-white">{label}</h4>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed mt-1">{desc}</p>
        </div>
    </motion.div>
)
