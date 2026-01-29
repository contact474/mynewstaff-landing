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
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
                >
                    <div className="relative">
                        <div className="w-16 h-16 border border-white/20 rounded-full animate-spin border-t-white mb-8 mx-auto" />
                        <motion.span
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="block text-sm font-wide tracking-[0.3em] uppercase text-white shimmer-text"
                        >
                            Initializing Engine
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
