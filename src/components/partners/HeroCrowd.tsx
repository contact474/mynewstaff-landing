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

/* ── Shutter audio pool using HTML5 Audio (works everywhere) ── */
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

    // Pre-create a pool of audio elements for each sound so we can overlap
    for (const url of SHUTTER_URLS) {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < 3; i++) {
        const audio = new Audio(url);
        audio.preload = "auto";
        audio.volume = 0.3 + Math.random() * 0.3; // 0.3-0.6 volume
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

    // Find an audio element that's not currently playing
    const audio = pool.find((a) => a.paused || a.ended) || pool[0];
    audio.currentTime = 0;
    audio.volume = volume ?? 0.2 + Math.random() * 0.4; // 0.2-0.6
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

  // Track the parent hero section for parallax
  useEffect(() => {
    const el = document.getElementById("hero-section");
    if (el) sectionRef.current = el;
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const crowdY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const crowdOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0.75, 0.75, 0.35, 0]
  );
  const crowdScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 1.03, 1.08]
  );
  const flashOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8],
    [1, 0.6, 0]
  );

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 600);
    return () => clearTimeout(t);
  }, []);

  // ── Audio engine using real audio files ──
  const startShutterLoop = useCallback(() => {
    if (!shutterRef.current) return;
    const player = shutterRef.current;

    function fireShutter() {
      player.play();
    }

    function scheduleNext() {
      const isBurst = Math.random() > 0.7;
      const delay = isBurst
        ? 200 + Math.random() * 500
        : 800 + Math.random() * 2500;

      const t = setTimeout(() => {
        fireShutter();

        // During bursts, sometimes fire 2-3 rapid clicks
        if (isBurst && Math.random() > 0.5) {
          const t2 = setTimeout(() => {
            fireShutter();
          }, 100 + Math.random() * 200);
          timeoutsRef.current.push(t2);
        }

        scheduleNext();
      }, delay);
      timeoutsRef.current.push(t);
    }

    // Start with a prominent shutter after entrance animation
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

    // Trigger on first user interaction (browser autoplay policy)
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
    <div
      className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
      style={{ overflow: "hidden", maxHeight: "70vh" }}
    >
      {/* AGGRESSIVE gradient: crowd fully dissolves into black at top AND bottom */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            "linear-gradient(to bottom,",
            "black 0%,",
            "black 10%,",
            "rgba(0,0,0,0.97) 18%,",
            "rgba(0,0,0,0.9) 25%,",
            "rgba(0,0,0,0.7) 35%,",
            "rgba(0,0,0,0.4) 45%,",
            "rgba(0,0,0,0.15) 55%,",
            "rgba(0,0,0,0.05) 65%,",
            "transparent 72%,",
            "rgba(0,0,0,0.1) 85%,",
            "rgba(0,0,0,0.6) 93%,",
            "black 100%)",
          ].join(" "),
        }}
      />

      {/* Crowd image with parallax + entrance */}
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
