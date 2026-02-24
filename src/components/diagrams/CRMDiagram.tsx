"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

// Baseline: Feb 19 2026, day 0
const BASELINE = new Date("2026-02-19T00:00:00").getTime();
const DAY_MS = 86_400_000;

// Deterministic daily jitter so numbers don't look robotic
function jitter(day: number, seed: number): number {
    const x = Math.sin(day * 9301 + seed * 49297) * 0.5 + 0.5; // 0-1
    return x;
}

function useLiveStats() {
    return useMemo(() => {
        const days = Math.max(0, Math.floor((Date.now() - BASELINE) / DAY_MS));
        const j = (seed: number) => jitter(days, seed);

        // Daily growth rates with slight randomness
        const newLeads     = 186  + Math.round(days * (9 + j(1) * 3));       // +9-12/day
        const inConvo      = 34   + Math.round(days * (1.1 + j(2) * 0.6));   // +1.1-1.7/day
        const closing      = 17   + Math.round(days * (0.5 + j(3) * 0.3));   // +0.5-0.8/day
        const pipelineK    = 2400 + Math.round(days * (55 + j(4) * 30));     // +$55k-85k/day
        const activities   = 5180 + Math.round(days * (160 + j(5) * 50));    // +160-210/day

        // Lead card values also drift up slightly
        const bump = (base: number) => base + Math.round(days * (1.5 + j(6) * 1.5));

        // Format pipeline as $X.XM
        const pipelineStr = pipelineK >= 1000
            ? `$${(pipelineK / 1000).toFixed(1)}M`
            : `$${pipelineK}K`;

        return {
            newLeads: newLeads.toLocaleString(),
            inConvo: inConvo.toLocaleString(),
            closing: closing.toLocaleString(),
            pipeline: pipelineStr,
            activities: activities.toLocaleString(),
            lead1Val: `$${bump(74)}k`,
            lead2Val: `$${bump(38)}k`,
            lead3Val: `$${bump(92)}k`,
            lead4Val: `$${bump(210)}k`,
            lead5Val: `$${bump(48)}k`,
            lead6Val: `$${bump(425)}k`,
        };
    }, []);
}

export const CRMDiagram = () => {
    const s = useLiveStats();

    return (
        <div className="w-full max-w-5xl mx-auto border border-white/10 bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="border-b border-white/5 p-4 flex justify-between items-center bg-zinc-900/50">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Mission Control // CRM</div>
                <div className="w-4" />
            </div>

            {/* Dashboard Content */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[400px]">
                {/* Column 1 */}
                <Column title="New Leads" value={s.newLeads}>
                    <LeadCard name="Apex Property Co" value={s.lead1Val} status="Qualified" delay={0.1} />
                    <LeadCard name="Vantage Health" value={s.lead2Val} status="New" delay={0.2} />
                    <LeadCard name="Ironclad Legal" value={s.lead3Val} status="New" delay={0.3} />
                </Column>

                {/* Column 2 */}
                <Column title="In Conversation" value={s.inConvo}>
                    <LeadCard name="Stratos Digital" value={s.lead4Val} status="Hot" delay={0.4} />
                    <LeadCard name="Ember Ecom" value={s.lead5Val} status="Warm" delay={0.5} />
                </Column>

                {/* Column 3 */}
                <Column title="Closing" value={s.closing}>
                    <LeadCard name="Forge Ventures" value={s.lead6Val} status="Signed" delay={0.6} active />
                </Column>

                {/* Column 4 - Stats */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex-1 flex flex-col justify-center items-center text-center">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Pipeline</span>
                        <span className="text-3xl font-bold font-wide text-white">{s.pipeline}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex-1 flex flex-col justify-center items-center text-center">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Activities</span>
                        <span className="text-3xl font-bold font-wide text-white">{s.activities}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Column = ({ title, value, children }: { title: string, value: string, children?: React.ReactNode }) => (
    <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
            <span className="text-xs text-zinc-400 font-medium">{title}</span>
            <span className="text-[10px] text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded">{value}</span>
        </div>
        <div className="bg-zinc-900/30 border border-white/5 rounded-lg p-2 h-full overflow-hidden flex flex-col gap-2">
            {children}
        </div>
    </div>
)

const LeadCard = ({ name, value, status, delay, active }: { name: string, value: string, status: string, delay: number, active?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`p-3 rounded border bg-black flex flex-col gap-2 ${active ? 'border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-white/10 hover:border-white/20'}`}
    >
        <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-white">{name}</span>
            <span className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-zinc-500">{value}</span>
            <span className="text-[8px] uppercase tracking-wider text-zinc-400 border border-white/10 px-1 py-0.5 rounded">{status}</span>
        </div>
    </motion.div>
)
