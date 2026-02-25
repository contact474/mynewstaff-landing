"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ── Flash positions mapped to where phones are in the crowd image ── */
const flashPositions = [
  { left: "8%", bottom: "58%", size: 18 },
  { left: "15%", bottom: "50%", size: 22 },
  { left: "22%", bottom: "55%", size: 16 },
  { left: "30%", bottom: "48%", size: 20 },
  { left: "37%", bottom: "52%", size: 24 },
  { left: "44%", bottom: "46%", size: 18 },
  { left: "50%", bottom: "53%", size: 26 },
  { left: "57%", bottom: "49%", size: 20 },
  { left: "64%", bottom: "54%", size: 22 },
  { left: "72%", bottom: "47%", size: 18 },
  { left: "78%", bottom: "51%", size: 24 },
  { left: "85%", bottom: "56%", size: 16 },
  { left: "92%", bottom: "50%", size: 20 },
  { left: "34%", bottom: "42%", size: 14 },
  { left: "60%", bottom: "44%", size: 16 },
  { left: "46%", bottom: "58%", size: 20 },
];

/* ── Mask: vertical fade (top + bottom) combined with horizontal side fade ── */
const CROWD_MASK_V = [
  "linear-gradient(to bottom,",
  "transparent 0%,",
  "rgba(0,0,0,0.03) 10%,",
  "rgba(0,0,0,0.15) 18%,",
  "rgba(0,0,0,0.4) 25%,",
  "rgba(0,0,0,0.7) 32%,",
  "black 40%,",
  "black 60%,",
  "rgba(0,0,0,0.6) 68%,",
  "rgba(0,0,0,0.25) 76%,",
  "rgba(0,0,0,0.05) 84%,",
  "transparent 90%)",
].join(" ");

const CROWD_MASK_H = [
  "linear-gradient(to right,",
  "transparent 0%,",
  "black 8%,",
  "black 92%,",
  "transparent 100%)",
].join(" ");

/* ── Shutter audio pool using HTML5 Audio ── */
const SHUTTER_URLS = [
  "/assets/shutter.mp3",
  "/assets/shutter1.mp3",
  "/assets/shutter2.mp3",
  "/assets/shutter3.mp3",
];

class ShutterPlayer {
  private pools: Map<string, HTMLAudioElement[]> = new Map();
  private ready = false;

  init() {
    if (this.ready) return;
    this.ready = true;
    for (const url of SHUTTER_URLS) {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < 3; i++) {
        const audio = new Audio(url);
        audio.preload = "auto";
        pool.push(audio);
      }
      this.pools.set(url, pool);
    }
  }

  play(volume?: number) {
    if (!this.ready) return;
    const url = SHUTTER_URLS[Math.floor(Math.random() * SHUTTER_URLS.length)];
    const pool = this.pools.get(url);
    if (!pool) return;
    const audio = pool.find((a) => a.paused || a.ended) || pool[0];
    audio.currentTime = 0;
    audio.volume = volume ?? 0.25 + Math.random() * 0.35;
    audio.play().catch(() => {});
  }

  destroy() {
    this.pools.forEach((pool) => {
      pool.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    });
    this.pools.clear();
    this.ready = false;
  }
}

export function HeroCrowd() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shutterRef = useRef<ShutterPlayer | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = document.getElementById("hero-section");
    if (el) sectionRef.current = el;
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const crowdY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const crowdOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.65, 0.65, 0.3, 0]
  );
  const crowdScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 1.02, 1.05]
  );
  const flashOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8],
    [1, 0.5, 0]
  );

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 600);
    return () => clearTimeout(t);
  }, []);

  const startShutterLoop = useCallback(() => {
    if (!shutterRef.current) return;
    const player = shutterRef.current;

    function scheduleNext() {
      const isBurst = Math.random() > 0.7;
      const delay = isBurst
        ? 200 + Math.random() * 500
        : 800 + Math.random() * 2500;

      const t = setTimeout(() => {
        player.play();

        if (isBurst && Math.random() > 0.5) {
          const t2 = setTimeout(() => player.play(), 100 + Math.random() * 200);
          timeoutsRef.current.push(t2);
        }
        scheduleNext();
      }, delay);
      timeoutsRef.current.push(t);
    }

    const t0 = setTimeout(() => {
      player.play(0.5);
      scheduleNext();
    }, 1500);
    timeoutsRef.current.push(t0);
  }, []);

  useEffect(() => {
    const player = new ShutterPlayer();
    shutterRef.current = player;
    let started = false;

    function initAudio() {
      if (started) return;
      started = true;
      player.init();
      startShutterLoop();
    }

    const events = ["click", "touchstart", "scroll", "mousemove", "keydown"] as const;
    events.forEach((e) =>
      window.addEventListener(e, initAudio, { once: true, passive: true })
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, initAudio));
      timeoutsRef.current.forEach(clearTimeout);
      player.destroy();
    };
  }, [startShutterLoop]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none overflow-hidden">
      {/* Crowd image with CSS mask for seamless edge dissolution */}
      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              y: crowdY,
              opacity: crowdOpacity,
              scale: crowdScale,
              WebkitMaskImage: `${CROWD_MASK_V}, ${CROWD_MASK_H}`,
              WebkitMaskComposite: "destination-in",
              maskImage: `${CROWD_MASK_V}, ${CROWD_MASK_H}`,
              maskComposite: "intersect",
            }}
            className="will-change-transform origin-bottom"
          >
            <img
              src="/assets/hero-crowd.png"
              alt=""
              className="w-full h-auto block"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash glow dots */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{ opacity: flashOpacity }}
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
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, white 0%, rgba(200,220,255,0.6) 30%, transparent 70%)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                inset: `-${pos.size * 0.8}px`,
                background:
                  "radial-gradient(circle, rgba(200,220,255,0.15) 0%, transparent 70%)",
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
