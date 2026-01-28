"use client";
import { motion } from "framer-motion";

export const ProcessMap = () => {
    return (
        <div className="w-full max-w-6xl mx-auto p-8 relative min-h-[600px] flex items-center justify-center">
            {/* Central Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="w-48 h-48 bg-black border border-white/20 rounded-full flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(255,255,255,0.1)] relative"
                >
                    <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
                    <span className="text-3xl font-bold font-wide text-white mb-2">SCALE</span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">Engine Core</span>
                </motion.div>
            </div>

            {/* Orbiting Nodes */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Left */}
                <ProcessNode
                    title="Sourcing"
                    desc="10k+ Leads"
                    pos="top-[15%] left-[20%]"
                    delay={0}
                />

                {/* Top Right */}
                <ProcessNode
                    title="Enrichment"
                    desc="Data Mining"
                    pos="top-[15%] right-[20%]"
                    delay={0.2}
                />

                {/* Bottom Right */}
                <ProcessNode
                    title="Conversion"
                    desc="AI Closing"
                    pos="bottom-[15%] right-[20%]"
                    delay={0.4}
                />

                {/* Bottom Left */}
                <ProcessNode
                    title="Nurture"
                    desc="Auto-Followup"
                    pos="bottom-[15%] left-[20%]"
                    delay={0.6}
                />
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <motion.path
                    d="M 300 150 Q 600 300 900 150"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                />
                <motion.path
                    d="M 900 450 Q 600 300 300 450"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                />
            </svg>
        </div>
    );
};

const ProcessNode = ({ title, desc, pos, delay }: { title: string, desc: string, pos: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`absolute ${pos} bg-zinc-900/80 backdrop-blur border border-white/10 p-6 rounded-xl w-48 text-center pointer-events-auto hover:border-white/40 transition-colors cursor-default`}
    >
        <div className="w-2 h-2 rounded-full bg-white mx-auto mb-4 shadow-[0_0_10px_white]" />
        <h4 className="text-white font-bold uppercase tracking-wide mb-1">{title}</h4>
        <p className="text-zinc-500 text-xs uppercase tracking-widest">{desc}</p>
    </motion.div>
)
