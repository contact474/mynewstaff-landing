"use client";
import { motion, AnimatePresence } from "framer-motion";

export const TransitionOverlay = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black"
                >
                    <div className="relative mb-8">
                        {/* Outer Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 rounded-full border border-white/10 border-t-white/50 border-r-white/50"
                        />

                        {/* Inner Ring - Counter Spin */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-zinc-500/20 border-b-white/80 border-l-white/80"
                        />

                        {/* Core Pulse */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white blur-md"
                        />

                        {/* Core Solid */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" />
                    </div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="block text-sm font-wide tracking-[0.3em] uppercase text-white shimmer-text"
                    >
                        Initializing Engine
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
