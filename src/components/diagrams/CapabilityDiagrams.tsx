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

export const FoundersDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center gap-[2px]">
            {[1, 2, 3, 4, 3, 2, 1].map((i, index) => (
                <motion.div
                    key={index}
                    className="w-[3px] bg-white rounded-full"
                    animate={{ height: [i * 3, i * 6, i * 3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: index * 0.1, ease: "easeInOut" }}
                />
            ))}
        </div>
    )
}

export const ValueDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-end justify-center gap-1 pb-1">
            <motion.div
                className="w-6 h-6 border border-white/30 rounded bg-white/5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
                className="w-6 h-8 border border-white/60 rounded bg-white/10"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
                className="w-6 h-10 border border-white rounded bg-white/20"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
        </div>
    )
}

export const ViralDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center">
            <motion.div
                className="w-6 h-6 bg-white rotate-45"
                animate={{ scale: [1, 1.2, 1], rotate: [45, 90, 45] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "backOut" }}
            />
            {[0, 90, 180, 270].map((deg, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-3 bg-white/80 rounded-full"
                    style={{ rotate: deg, transformOrigin: "0 15px" }}
                    animate={{ opacity: [0, 1, 0], scaleY: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
            ))}
        </div>
    )
}

export const HookTestingDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center gap-2">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className={`w-4 h-6 border rounded-sm ${i === 2 ? 'bg-white border-white' : 'bg-white/5 border-white/20'}`}
                    animate={i === 2 ? { scale: [1, 1.1, 1], borderColor: ["#fff", "#4ade80", "#fff"] } : { opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}
        </div>
    )
}

export const RetentionArchDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-end justify-center pb-2">
            <svg width="80" height="30" viewBox="0 0 80 30" fill="none">
                <motion.path
                    d="M 5 25 Q 40 5 75 25"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>
        </div>
    )
}

export const AlgorithmLockDiagram = () => {
    return (
        <div className="w-24 h-12 relative flex items-center justify-center">
            <div className="w-6 h-8 border-2 border-white rounded-t-full rounded-b-md relative">
                <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ height: "0%" }}
                    animate={{ height: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ bottom: 0, top: 'auto' }}
                />
            </div>
            {/* Pulsing rings */}
            <motion.div
                className="absolute w-12 h-12 border border-white/20 rounded-full"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        </div>
    )
}
