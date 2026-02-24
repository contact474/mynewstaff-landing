"use client";

import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { useRef, useEffect, ElementType } from "react";

// ---------------------------------------------------------------------------
// ParallaxSection
// Wraps content and applies a parallax translate-Y based on scroll position.
// speed: 0.1 = subtle, 0.5 = dramatic
// ---------------------------------------------------------------------------
interface ParallaxSectionProps {
    speed?: number;
    children: React.ReactNode;
    className?: string;
}

export const ParallaxSection = ({
    speed = 0.2,
    children,
    className = "",
}: ParallaxSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Map scroll progress 0→1 to a vertical offset.
    // A positive speed moves the element up relative to scroll (classic parallax).
    const yPercent = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `-${speed * 100}%`]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y: yPercent }}>
                {children}
            </motion.div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// ScaleReveal
// Scales content from 0.85 → 1.0 and fades in as it enters the viewport.
// Ideal for hero images, big stats, diagrams.
// ---------------------------------------------------------------------------
interface ScaleRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const ScaleReveal = ({
    children,
    className = "",
    delay = 0,
}: ScaleRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ---------------------------------------------------------------------------
// TextReveal
// Splits text into words and staggers each word: y:30→0, opacity:0→1.
// ---------------------------------------------------------------------------
type TextRevealTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface TextRevealProps {
    text: string;
    className?: string;
    as?: TextRevealTag;
    stagger?: number;
}

export const TextReveal = ({
    text,
    className = "",
    as: Tag = "p",
    stagger = 0.04,
}: TextRevealProps) => {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const words = text.split(" ");

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
            },
        },
    };

    const wordVariant = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
        },
    };

    // Cast through unknown to satisfy TypeScript when using a dynamic tag with motion.
    const MotionTag = motion[Tag as keyof typeof motion] as ElementType;

    return (
        <MotionTag
            ref={ref}
            className={`${className} inline`}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            aria-label={text}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariant}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </MotionTag>
    );
};

// ---------------------------------------------------------------------------
// HorizontalSlide
// Slides content in from the left or right as it enters the viewport.
// ---------------------------------------------------------------------------
interface HorizontalSlideProps {
    direction?: "left" | "right";
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const HorizontalSlide = ({
    direction = "left",
    children,
    className = "",
    delay = 0,
}: HorizontalSlideProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const xInitial = direction === "left" ? -60 : 60;

    return (
        <motion.div
            ref={ref}
            initial={{ x: xInitial, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1],
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ---------------------------------------------------------------------------
// CountUp
// Animated number counter that counts up when scrolled into view.
// Uses spring-animated motion value for smooth easing.
// ---------------------------------------------------------------------------
interface CountUpProps {
    end: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
    decimals?: number;
}

export const CountUp = ({
    end,
    prefix = "",
    suffix = "",
    duration = 2,
    className = "",
    decimals = 0,
}: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });

    // Display value as a formatted string in state via DOM manipulation.
    useEffect(() => {
        if (isInView) {
            motionValue.set(end);
        }
    }, [isInView, end, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent =
                    prefix + latest.toFixed(decimals) + suffix;
            }
        });
        return unsubscribe;
    }, [springValue, prefix, suffix, decimals]);

    return (
        <span ref={ref} className={className}>
            {prefix}0{suffix}
        </span>
    );
};

// ---------------------------------------------------------------------------
// GrainOverlay
// Subtle animated film grain texture overlay (CSS-only, no images).
// Apply the .grain-overlay class on a wrapper and this adds the pseudo-element.
// This component renders a fixed div that serves as the grain layer directly.
// ---------------------------------------------------------------------------
export const GrainOverlay = () => {
    return (
        <div
            aria-hidden="true"
            className="grain-overlay pointer-events-none fixed inset-0 z-[9000]"
        />
    );
};

// ---------------------------------------------------------------------------
// SmoothZoomHero
// Hero section wrapper where the background slowly zooms 1.0→1.05 continuously.
// Text children remain unscaled via absolute positioning inside.
// ---------------------------------------------------------------------------
interface SmoothZoomHeroProps {
    children: React.ReactNode;
    className?: string;
    backgroundClassName?: string;
}

export const SmoothZoomHero = ({
    children,
    className = "",
    backgroundClassName = "",
}: SmoothZoomHeroProps) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Zooming background layer */}
            <div
                className={`absolute inset-0 smooth-zoom-bg ${backgroundClassName}`}
            />
            {/* Static foreground content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
