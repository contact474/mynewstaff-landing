"use client";
import { motion } from "framer-motion";

export const ProcessMap = () => {
    return (
        <div className="w-full max-w-6xl mx-auto p-8 relative min-h-[600px] flex items-center justify-center">
            {/* Connecting Lines (Behind everything) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" xmlns="http://www.w3.org/2000/svg">
                {/* Top Left (Center to Bottom of TL Card) */}
                <motion.line
                    x1="25%" y1="38%" x2="50%" y2="50%"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                />
                {/* Top Right (Center to Bottom of TR Card) */}
                <motion.line
                    x1="75%" y1="38%" x2="50%" y2="50%"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                />
                {/* Bottom Right (Center to Top of BR Card) */}
                <motion.line
                    x1="75%" y1="62%" x2="50%" y2="50%"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                />
                {/* Bottom Left (Center to Top of BL Card) */}
                <motion.line
                    x1="25%" y1="62%" x2="50%" y2="50%"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                />
            </svg>

            {/* Central Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="w-48 h-48 bg-black border border-white/20 rounded-full flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(255,255,255,0.1)] relative z-20"
                >
                    <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
                    <span className="text-3xl font-bold font-wide text-white mb-2">SCALE</span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">Engine Core</span>
                </motion.div>
            </div>

            {/* Orbiting Nodes */}
            <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
                {/* Top Left */}
                <ProcessNode
                    title="Sourcing"
                    desc="10k+ Leads"
                    pos="top-[20%] left-[15%]"
                    delay={0}
                    dotPos="bottom"
                />

                {/* Top Right */}
                <ProcessNode
                    title="Enrichment"
                    desc="Data Mining"
                    pos="top-[20%] right-[15%]"
                    delay={0.2}
                    dotPos="bottom"
                />

                {/* Bottom Right */}
                <ProcessNode
                    title="Conversion"
                    desc="AI Closing"
                    pos="bottom-[20%] right-[15%]"
                    delay={0.4}
                    dotPos="top"
                />

                {/* Bottom Left */}
                <ProcessNode
                    title="Nurture"
                    desc="Auto-Followup"
                    pos="bottom-[20%] left-[15%]"
                    delay={0.6}
                    dotPos="top"
                />
            </div>
            {/* Mobile View Stack (Simplified) */}
            <div className="flex flex-col gap-4 md:hidden relative z-10 mt-[240px]">
                <ProcessNodeMobile title="Sourcing" desc="10k+ Leads" />
                <ProcessNodeMobile title="Enrichment" desc="Data Mining" />
                <ProcessNodeMobile title="Nurture" desc="Auto-Followup" />
                <ProcessNodeMobile title="Conversion" desc="AI Closing" />
            </div>
        </div>
    );
};

const ProcessNode = ({ title, desc, pos, delay, dotPos }: { title: string, desc: string, pos: string, delay: number, dotPos: 'top' | 'bottom' }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`absolute ${pos} bg-zinc-900/90 backdrop-blur-md border border-white/10 p-6 rounded-xl w-56 text-center pointer-events-auto hover:border-white/40 transition-colors shadow-2xl`}
    >
        <div
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] z-30 ${dotPos === 'top' ? 'top-[-5px]' : 'bottom-[-5px]'}`}
        />
        <h4 className="text-white font-bold uppercase tracking-wide mb-1 mt-2">{title}</h4>
        <p className="text-zinc-500 text-xs uppercase tracking-widest">{desc}</p>
    </motion.div>
)

const ProcessNodeMobile = ({ title, desc }: { title: string, desc: string }) => (
    <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-6 rounded-xl w-full text-center">
        <h4 className="text-white font-bold uppercase tracking-wide mb-1">{title}</h4>
        <p className="text-zinc-500 text-xs uppercase tracking-widest">{desc}</p>
    </div>
)
