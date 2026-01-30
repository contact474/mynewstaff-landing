"use client";
import { motion } from "framer-motion";

export const CRMDiagram = () => {
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
                <Column title="New Leads" value="142">
                    <LeadCard name="Tesla Inc." value="$50k" status="New" delay={0.1} />
                    <LeadCard name="SpaceX" value="$120k" status="New" delay={0.2} />
                    <LeadCard name="Oracle" value="$80k" status="New" delay={0.3} />
                </Column>

                {/* Column 2 */}
                <Column title="In Conversation" value="28">
                    <LeadCard name="Nvidia" value="$450k" status="Warm" delay={0.4} />
                    <LeadCard name="Apple" value="$2M" status="Hot" delay={0.5} />
                </Column>

                {/* Column 3 */}
                <Column title="Closing" value="14">
                    <LeadCard name="OpenAI" value="$5M" status="Contract" delay={0.6} active />
                </Column>

                {/* Column 4 - Stats */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex-1 flex flex-col justify-center items-center text-center">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Pipeline</span>
                        <span className="text-3xl font-bold font-wide text-white">$8.4M</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex-1 flex flex-col justify-center items-center text-center">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Activities</span>
                        <span className="text-3xl font-bold font-wide text-white">1,240</span>
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
