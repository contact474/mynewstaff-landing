"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const flashPositions = [
  { left: "12%", bottom: "55%", size: 8 },
  { left: "25%", bottom: "48%", size: 10 },
  { left: "38%", bottom: "52%", size: 7 },
  { left: "45%", bottom: "45%", size: 9 },
  { left: "55%", bottom: "50%", size: 11 },
  { left: "63%", bottom: "47%", size: 8 },
  { left: "72%", bottom: "53%", size: 10 },
  { left: "82%", bottom: "49%", size: 7 },
  { left: "18%", bottom: "42%", size: 6 },
  { left: "50%", bottom: "56%", size: 9 },
  { left: "35%", bottom: "40%", size: 8 },
  { left: "68%", bottom: "43%", size: 7 },
];

export function HeroCrowd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Parallax scroll — crowd moves up slower than page, creating depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const crowdY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const crowdOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 0.7, 0.3, 0]);
  const crowdScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.05]);

  useEffect(() => {
    let started = false;

    function initAudio() {
      if (started) return;
      started = true;

      try {
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        function playShutter() {
          if (!audioContextRef.current) return;
          const ac = audioContextRef.current;
          if (ac.state === "suspended") ac.resume();

          const now = ac.currentTime;

          // White noise burst (shutter click)
          const bufferSize = ac.sampleRate * 0.06;
          const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] =
              (Math.random() * 2 - 1) *
              Math.exp(-i / (bufferSize * 0.15));
          }

          const source = ac.createBufferSource();
          source.buffer = buffer;

          const filter = ac.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 2000 + Math.random() * 3000;
          filter.Q.value = 1.5;

          const gain = ac.createGain();
          gain.gain.value = 0.03 + Math.random() * 0.04;

          source.connect(filter);
          filter.connect(gain);
          gain.connect(ac.destination);

          source.start(now);
          source.stop(now + 0.06);

          // Second click for mechanical feel
          if (Math.random() > 0.5) {
            const bufferSize2 = ac.sampleRate * 0.04;
            const buffer2 = ac.createBuffer(1, bufferSize2, ac.sampleRate);
            const data2 = buffer2.getChannelData(0);
            for (let i = 0; i < bufferSize2; i++) {
              data2[i] =
                (Math.random() * 2 - 1) *
                Math.exp(-i / (bufferSize2 * 0.1));
            }
            const src2 = ac.createBufferSource();
            src2.buffer = buffer2;
            const f2 = ac.createBiquadFilter();
            f2.type = "highpass";
            f2.frequency.value = 4000;
            const g2 = ac.createGain();
            g2.gain.value = 0.02 + Math.random() * 0.02;
            src2.connect(f2);
            f2.connect(g2);
            g2.connect(ac.destination);
            src2.start(now + 0.07);
            src2.stop(now + 0.11);
          }
        }

        function scheduleNext() {
          const delay = 800 + Math.random() * 2500;
          intervalRef.current = setTimeout(() => {
            playShutter();
            scheduleNext();
          }, delay);
        }

        setTimeout(() => {
          playShutter();
          scheduleNext();
        }, 1500);
      } catch {
        // Web Audio not available
      }
    }

    const events = ["click", "touchstart", "scroll", "mousemove"] as const;
    events.forEach((e) =>
      window.addEventListener(e, initAudio, { once: true, passive: true })
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, initAudio));
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
    >
      {/* Gradient fade to black at top */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 25%, transparent 45%)",
        }}
      />
      {/* Parallax crowd image */}
      <motion.div
        style={{
          y: crowdY,
          opacity: crowdOpacity,
          scale: crowdScale,
        }}
        className="will-change-transform"
      >
        <img
          src="/assets/hero-crowd.png"
          alt=""
          className="w-full h-auto"
          style={{ display: "block" }}
        />
      </motion.div>
      {/* Camera flash dots */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{ opacity: crowdOpacity }}
      >
        {flashPositions.map((pos, i) => (
          <div
            key={i}
            className="flash-dot"
            style={{
              left: pos.left,
              bottom: pos.bottom,
              width: pos.size,
              height: pos.size,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
