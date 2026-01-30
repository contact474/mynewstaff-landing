"use client";
import { motion } from "framer-motion";

export const ValuationChart = () => {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="w-full overflow-x-auto pb-4">
                <div className="relative h-[400px] border-l border-b border-white/20 p-4 min-w-[700px]">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-t border-white" />
                        <div className="border-t border-white" />
                        <div className="border-t border-white" />
                        <div className="border-t border-white" />
                    </div>

                    {/* Chart Line */}
                    <svg className="absolute inset-0 w-full h-full p-4 overflow-visible">
                        <motion.path
                            d="M 0 380 Q 300 360 400 320 T 900 20"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#444" />
                                <stop offset="100%" stopColor="#fff" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Points & Labels */}
                    {/* Year 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute left-[30%] top-[70%] md:top-[75%] -translate-x-1/2"
                    >
                        <div className="bg-black border border-white/20 p-3 rounded-lg backdrop-blur-md shadow-xl text-center min-w-[200px]">
                            <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Year 1</span>
                            <div className="text-xs font-bold text-white mb-1">ARR: $5M - $10M</div>
                            <div className="text-xs font-bold text-zinc-400">Valuation: $35M - $50M</div>
                        </div>
                        <div className="w-3 h-3 bg-white rounded-full mx-auto mt-4 shadow-[0_0_15px_white]" />
                    </motion.div>

                    {/* Year 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="absolute right-[0%] top-[0%] -translate-x-[20%] translate-y-4"
                    >
                        <div className="bg-zinc-900 border border-white/40 p-4 rounded-lg backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)] text-center min-w-[240px]">
                            <span className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Year 2</span>
                            <div className="text-sm font-bold text-white mb-1">ARR: $15M - $30M</div>
                            <div className="text-sm font-bold text-white">Valuation: $150M - $250M</div>
                        </div>
                        <div className="w-4 h-4 bg-white rounded-full mx-auto mt-4 shadow-[0_0_20px_white] relative z-10" />
                    </motion.div>
                </div>
            </div>

            {/* Footer Comparables */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16 text-xs md:text-sm text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="w-1 h-4 bg-white/20 block" /> TradingView (15x ARR)</span>
                <span className="flex items-center gap-2"><span className="w-1 h-4 bg-white/20 block" /> eToro (12x ARR)</span>
                <span className="flex items-center gap-2"><span className="w-1 h-4 bg-white/20 block" /> Robinhood (20x Revenue)</span>
            </div>
        </div>
    );
};
