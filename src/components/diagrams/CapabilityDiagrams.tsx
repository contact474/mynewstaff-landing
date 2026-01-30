"use client";
import { motion } from "framer-motion";

export const SpeedDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-end justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    className="w-3 bg-white/20 rounded-sm"
                    initial={{ height: "20%" }}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "circOut"
                    }}
                    style={{ backgroundColor: i > 3 ? '#fff' : 'rgba(255,255,255,0.2)' }}
                />
            ))}
        </div>
    );
};

export const ReliabilityDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center">
            <motion.div
                className="w-3 h-3 bg-white rounded-full absolute"
                animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <svg width="100" height="40" className="absolute">
                <motion.circle
                    cx="50" cy="20" r="15"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                    cx="50" cy="20" r="8"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </svg>
        </div>
    );
};

export const EfficiencyDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-between px-2">
            {/* Big Inefficient Block */}
            <motion.div
                className="w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center"
                animate={{ opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-full h-[1px] bg-red-500/50 rotate-45 transform" />
            </motion.div>

            {/* Arrow */}
            <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                →
            </motion.div>

            {/* Small Efficient Block */}
            <motion.div
                className="w-4 h-4 bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                animate={{ rotate: 90 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};
