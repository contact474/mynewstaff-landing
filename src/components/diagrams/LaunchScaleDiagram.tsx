"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export const LaunchScaleDiagram = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 relative min-h-[500px] flex flex-col md:block items-center justify-center">
            {/* Connecting Lines (Desktop Only Background) */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0" xmlns="http://www.w3.org/2000/svg">
                {/* Top Left */}
                <line x1="25%" y1="25%" x2="38%" y2="38%" stroke="white" strokeWidth="1" />
                {/* Top Right */}
                <line x1="75%" y1="25%" x2="62%" y2="38%" stroke="white" strokeWidth="1" />
                {/* Bottom Left */}
                <line x1="25%" y1="75%" x2="38%" y2="62%" stroke="white" strokeWidth="1" />
                {/* Bottom Right */}
                <line x1="75%" y1="75%" x2="62%" y2="62%" stroke="white" strokeWidth="1" />
            </svg>

            {/* Central Hub */}
            <div className="relative md:absolute inset-0 flex items-center justify-center z-10 pointer-events-none h-[300px] md:h-auto">
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
                <div className="relative z-20 w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 bg-black flex flex-col items-center justify-center text-center p-4 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                    <Counter value={10000} />
                    <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500">Leads / Month</span>
                </div>
            </div>

            {/* Satellites (Desktop) */}
            <div className="hidden md:flex absolute inset-0 flex-col justify-between py-12 px-4 md:px-24 pointer-events-none z-20">
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

            {/* Satellites (Mobile) */}
            <div className="md:hidden relative z-20 flex flex-col items-center gap-6 w-full px-2 mt-8">
                {/* Central Spine */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[-60px] bottom-[20px] w-[2px] bg-gradient-to-b from-white/40 via-white/10 to-transparent -z-10" />

                <Satellite label="AI Scraping" desc="High-intent targeting" number="1" />
                <Satellite label="Viral Distro" desc="TikTok, IG, Shorts" number="2" />
                <Satellite label="Retargeting" desc="Warm traffic only" number="3" />
                <Satellite label="Outreach" desc="Partnership setup" number="4" />
            </div>
        </div>
    );
};

const Counter = ({ value }: { value: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView) {
            const node = ref.current;
            const controls = animate(0, value, {
                duration: 2.5,
                ease: "circOut",
                onUpdate: (latest) => {
                    if (node) {
                        node.textContent = Math.round(latest).toLocaleString();
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, value]);

    return <span ref={ref} className="text-4xl font-bold font-wide text-white mb-2">0</span>;
};

const Satellite = ({ label, desc, number, align = "left" }: { label: string, desc: string, number: string, align?: "left" | "right" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`pointer-events-auto flex items-center gap-4 bg-zinc-950 border border-white/10 p-4 rounded-xl max-w-[250px] shadow-xl ${align === "right" ? "flex-row-reverse text-right" : "text-left"}`}>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold font-wide">
            {number}
        </div>
        <div>
            <h4 className="text-sm font-bold font-wide uppercase text-white">{label}</h4>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed mt-1">{desc}</p>
        </div>
    </motion.div>
)
