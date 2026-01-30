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

export const ProspectorDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center overflow-hidden">
            {/* Scanning Line */}
            <motion.div
                className="absolute w-[1px] h-full bg-white/50 shadow-[0_0_10px_white]"
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Data Points appearing */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ left: `${i * 25 + 10}%`, top: '50%' }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}
        </div>
    )
}

export const NurtureDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center gap-2">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="w-4 h-3 bg-white/10 border border-white/20 rounded-sm flex items-center justify-center"
                    animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                    <div className="w-2 h-[1px] bg-white/50" />
                </motion.div>
            ))}
        </div>
    )
}

export const CloserDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center">
            <div className="w-8 h-8 border border-white/20 rounded-md bg-white/5 flex items-center justify-center relative">
                <motion.svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M1 6L5.5 10.5L15 1"
                        stroke="white"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                </motion.svg>
            </div>
        </div>
    )
}
