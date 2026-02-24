"use client";
import { motion } from "framer-motion";
import { FileText, Mic, User, Film } from "lucide-react";

export const VideoPipelineDiagram = () => {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between relative gap-8 md:gap-4">
                {/* Step 1 */}
                <PipelineStep icon={<FileText />} label="Scripting" desc="AI Hooks & Copy" delay={0} />

                <PipelineConnector delay={0.2} />

                {/* Step 2 */}
                <PipelineStep icon={<Mic />} label="Voiceover" desc="Hyper-Realistic Clone" delay={0.4} />

                <PipelineConnector delay={0.6} />

                {/* Step 3 */}
                <PipelineStep icon={<User />} label="Avatar" desc="Digital Twin Gen" delay={0.8} />

                <PipelineConnector delay={1.0} />

                {/* Step 4 */}
                <PipelineStep icon={<Film />} label="Final Cut" desc="Edited & Captioned" delay={1.2} highlight />
            </div>
        </div>
    );
};

const PipelineStep = ({ icon, label, desc, delay, highlight }: { icon: any, label: string, desc: string, delay: number, highlight?: boolean }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`relative z-10 flex flex-col items-center text-center p-6 rounded-2xl border ${highlight ? 'bg-white/10 border-white/40' : 'bg-black border-white/10'} backdrop-blur-md min-w-[200px]`}
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white ${highlight ? 'bg-white/20' : 'bg-white/5'}`}>
            {icon}
        </div>
        <h4 className="text-white font-bold uppercase tracking-wider mb-1">{label}</h4>
        <p className="text-zinc-500 text-xs uppercase tracking-widest">{desc}</p>
        {highlight && <div className="absolute inset-0 border border-white/50 rounded-2xl calm-pulse pointer-events-none" />}
    </motion.div>
);

const PipelineConnector = ({ delay }: { delay: number }) => (
    <>
        {/* Desktop Horizontal */}
        <div className="hidden md:block flex-1 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ delay, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            />
        </div>
        {/* Mobile Vertical */}
        <div className="md:hidden w-[1px] h-12 bg-white/10 relative overflow-hidden mx-auto">
            <motion.div
                initial={{ y: "-100%" }}
                whileInView={{ y: "100%" }}
                transition={{ delay, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50"
            />
        </div>
    </>
);
