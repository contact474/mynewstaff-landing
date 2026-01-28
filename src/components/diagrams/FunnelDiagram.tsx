"use client";
import { motion } from "framer-motion";

export const FunnelDiagram = () => {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 p-8">
            {/* Funnel Visual */}
            <div className="relative w-full max-w-[400px] flex flex-col items-center">
                {/* Top Tier */}
                <FunnelTier width="w-full" color="bg-zinc-800" delay={0}>
                    <span className="text-white font-bold text-lg">10,000</span>
                    <span className="text-zinc-400 text-xs uppercase tracking-wider">AI-Scraped Leads</span>
                </FunnelTier>

                {/* Connector */}
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white/20 my-1" />

                {/* Middle Tier */}
                <FunnelTier width="w-[75%]" color="bg-zinc-900" delay={0.2}>
                    <span className="text-white font-bold text-lg">300</span>
                    <span className="text-zinc-400 text-xs uppercase tracking-wider">Webinar Attendees</span>
                    <span className="text-white/60 text-[10px] mt-1">(3%) → 90 Trials</span>
                </FunnelTier>

                {/* Connector */}
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white/20 my-1" />

                {/* Bottom Tier */}
                <FunnelTier width="w-[50%]" color="bg-black" border="border-white/40" delay={0.4} glow>
                    <span className="text-white font-bold text-2xl">23</span>
                    <span className="text-zinc-300 text-xs uppercase tracking-wider">New Clients</span>
                </FunnelTier>
            </div>

            {/* Stats Content */}
            <div className="flex-1 flex flex-col gap-8">
                <div>
                    <h3 className="text-3xl font-wide font-bold uppercase mb-6 text-center">Financial Outcomes</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 items-start text-left">
                            <span className="text-zinc-500 mt-1">⦿</span>
                            <div>
                                <strong className="text-white block mb-1">Subscription Model</strong>
                                <span className="text-zinc-400">$9k - $40k MRR ramp.</span>
                            </div>
                        </li>
                        <li className="flex gap-3 items-start text-left">
                            <span className="text-zinc-500 mt-1">⦿</span>
                            <div>
                                <strong className="text-white block mb-1">Licensing Revenue</strong>
                                <span className="text-zinc-400">30 sales/mo @ $3.5k = $105k/mo revenue.</span>
                            </div>
                        </li>
                        <li className="flex gap-3 items-start text-left">
                            <span className="text-zinc-500 mt-1">⦿</span>
                            <div>
                                <strong className="text-white block mb-1">Affiliate Ecosystem</strong>
                                <span className="text-zinc-400">$70k/mo passive baseline.</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="border border-white/20 bg-white/5 rounded-xl p-6 text-center backdrop-blur-md">
                    <span className="block text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2">Total Target</span>
                    <div className="text-2xl md:text-3xl font-bold font-wide text-white">$100K - $150K <br /> <span className="text-lg md:text-xl font-sans font-normal opacity-70">MRR IN 90 DAYS.</span></div>
                </div>
            </div>
        </div>
    )
}

const FunnelTier = ({ width, color, children, delay, border = "border-white/10", glow }: { width: string, color: string, children: React.ReactNode, delay: number, border?: string, glow?: boolean }) => (
    <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`${width} ${color} border ${border} rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-sm z-10 ${glow ? 'shadow-[0_0_30px_rgba(255,255,255,0.1)]' : ''}`}
    >
        {glow && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
        {children}
    </motion.div>
)
