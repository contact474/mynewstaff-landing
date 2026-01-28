"use client";
import { motion } from "framer-motion";

export const ComparisonTable = () => {
    return (
        <div className="w-full max-w-5xl mx-auto border border-white/10 rounded-2xl overflow-hidden bg-zinc-950/50 backdrop-blur-sm">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-white/10 bg-white/5">
                <div className="p-6 text-xs uppercase tracking-[0.2em] text-zinc-500 flex items-center">Feature</div>
                <div className="p-6 text-xs uppercase tracking-[0.2em] text-zinc-500 border-l border-white/10 flex items-center justify-center">Manual Scaling</div>
                <div className="p-6 text-xs uppercase tracking-[0.2em] text-white font-bold border-l border-white/10 flex items-center justify-center bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                    MyNewStaff AI
                </div>
            </div>

            {/* Rows */}
            <ComparisonRow feature="Setup Time" manual="3-6 Months" ai="7-14 Days" highlight />
            <ComparisonRow feature="Cost Per Lead" manual="$50 - $150" ai="$5 - $15" />
            <ComparisonRow feature="Availability" manual="9am - 5pm" ai="24/7/365" highlight />
            <ComparisonRow feature="Training" manual="Ongoing / Heavy" ai="Zero / Instant" />
            <ComparisonRow feature="Scalability" manual="Linear (Hiring)" ai="Exponential (Compute)" highlight />
        </div>
    )
}

const ComparisonRow = ({ feature, manual, ai, highlight }: { feature: string, manual: string, ai: string, highlight?: boolean }) => (
    <div className={`grid grid-cols-3 border-b border-white/5 last:border-none group hover:bg-white/5 transition-colors ${highlight ? 'bg-white/[0.02]' : ''}`}>
        <div className="p-6 text-sm text-zinc-400 font-medium flex items-center font-sans border-r border-white/5">{feature}</div>
        <div className="p-6 text-sm text-zinc-500 text-center flex items-center justify-center font-sans border-r border-white/5">{manual}</div>
        <div className="p-6 text-sm text-white font-bold text-center flex items-center justify-center font-sans shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
            {ai}
        </div>
    </div>
)
