"use client";
import { motion } from "framer-motion";

export const ViralFormulaDiagram = () => {
    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col md:flex-row items-center justify-center gap-4">
            <FormulaCard label="THE HOOK" value="STOP SCROLL" color="from-purple-500/20 to-purple-900/20" delay={0} />
            <span className="text-4xl text-zinc-700 font-thin">+</span>
            <FormulaCard label="THE VALUE" value="BUILD TRUST" color="from-blue-500/20 to-blue-900/20" delay={0.2} />
            <span className="text-4xl text-zinc-700 font-thin">+</span>
            <FormulaCard label="THE ASK" value="CONVERT" color="from-emerald-500/20 to-emerald-900/20" delay={0.4} />
            <span className="text-4xl text-white font-thin">=</span>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="relative p-8 rounded-2xl bg-white text-black text-center min-w-[200px]"
            >
                <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Outcome</span>
                <span className="block text-3xl font-wide font-bold uppercase">GROWTH</span>
                <div className="absolute inset-0 bg-white/50 blur-xl -z-10" />
            </motion.div>
        </div>
    )
}

const FormulaCard = ({ label, value, color, delay }: { label: string, value: string, color: string, delay: number }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br ${color} backdrop-blur-sm text-center min-w-[180px]`}
    >
        <span className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-2">{label}</span>
        <span className="block text-xl font-bold font-wide text-white">{value}</span>
    </motion.div>
)
