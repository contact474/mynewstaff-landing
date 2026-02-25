"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface RollingNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  pad?: number;
  separator?: boolean;
  className?: string;
}

export function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
  pad = 0,
  separator = false,
  className,
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      let formatted = current.toFixed(decimals);
      if (separator) {
        const [int, dec] = formatted.split(".");
        const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = dec ? `${withCommas}.${dec}` : withCommas;
      }
      if (pad > 0) {
        const intPart = Math.round(current).toString();
        formatted = intPart.padStart(pad, "0");
      }

      setDisplay(formatted);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, value, decimals, duration, pad, separator]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
