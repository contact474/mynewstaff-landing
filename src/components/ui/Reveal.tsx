"use client";

import { motion, useInView } from "framer-motion";
import { useRef, Children } from "react";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "blur";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    // New props — all optional to keep existing usage backward-compatible.
    variant?: RevealVariant;
    stagger?: boolean;
    duration?: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const variantMap: Record<RevealVariant, { initial: any; animate: any }> = {
    "fade-up": {
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    },
    "fade-left": {
        initial: { x: -40, opacity: 0 },
        animate: { x: 0, opacity: 1 },
    },
    "fade-right": {
        initial: { x: 40, opacity: 0 },
        animate: { x: 0, opacity: 1 },
    },
    scale: {
        initial: { scale: 0.88, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
    },
    blur: {
        initial: { filter: "blur(12px)", opacity: 0, y: 20 },
        animate: { filter: "blur(0px)", opacity: 1, y: 0 },
    },
};

export const Reveal = ({
    children,
    className = "",
    delay = 0,
    variant = "fade-up",
    stagger = false,
    duration = 1.0,
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const { initial, animate } = variantMap[variant];

    // Non-stagger path — single wrapper, same as original behaviour.
    if (!stagger) {
        return (
            <motion.div
                ref={ref}
                initial={initial}
                animate={isInView ? animate : {}}
                transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    // Stagger path — wrap each direct child in its own motion.div and stagger them.
    const childArray = Children.toArray(children);
    const staggerDelay = 0.1;

    return (
        <div ref={ref} className={className}>
            {childArray.map((child, i) => (
                <motion.div
                    key={i}
                    initial={initial}
                    animate={isInView ? animate : {}}
                    transition={{
                        duration,
                        ease: [0.16, 1, 0.3, 1],
                        delay: delay + i * staggerDelay,
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
};
