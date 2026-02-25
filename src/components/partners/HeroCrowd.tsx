"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
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

/* ── Shutter SFX via Web Audio API ── */
function createShutterSound(ac: AudioContext) {
  const now = ac.currentTime;

  // ─ Part 1: sharp mechanical "click" (the mirror slap) ─
  const clickLen = ac.sampleRate * 0.035;
  const clickBuf = ac.createBuffer(1, clickLen, ac.sampleRate);
  const clickData = clickBuf.getChannelData(0);
  for (let i = 0; i < clickLen; i++) {
    // sharp transient with fast exponential decay
    clickData[i] =
      (Math.random() * 2 - 1) * Math.exp(-i / (clickLen * 0.08));
  }
  const clickSrc = ac.createBufferSource();
  clickSrc.buffer = clickBuf;

  const clickFilter = ac.createBiquadFilter();
  clickFilter.type = "bandpass";
  clickFilter.frequency.value = 3000 + Math.random() * 2000;
  clickFilter.Q.value = 2;

  const clickGain = ac.createGain();
  clickGain.gain.setValueAtTime(0.25 + Math.random() * 0.15, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  clickSrc.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(ac.destination);
  clickSrc.start(now);
  clickSrc.stop(now + 0.04);

  // ─ Part 2: curtain "thwip" (the shutter curtain) ─
  const curtainLen = ac.sampleRate * 0.025;
  const curtainBuf = ac.createBuffer(1, curtainLen, ac.sampleRate);
  const curtainData = curtainBuf.getChannelData(0);
  for (let i = 0; i < curtainLen; i++) {
    curtainData[i] =
      (Math.random() * 2 - 1) * Math.exp(-i / (curtainLen * 0.05));
  }
  const curtainSrc = ac.createBufferSource();
  curtainSrc.buffer = curtainBuf;

  const curtainFilter = ac.createBiquadFilter();
  curtainFilter.type = "highpass";
  curtainFilter.frequency.value = 5000 + Math.random() * 3000;

  const curtainGain = ac.createGain();
  curtainGain.gain.setValueAtTime(0.15 + Math.random() * 0.1, now + 0.04);
  curtainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  curtainSrc.connect(curtainFilter);
  curtainFilter.connect(curtainGain);
  curtainGain.connect(ac.destination);
  curtainSrc.start(now + 0.04);
  curtainSrc.stop(now + 0.07);

  // ─ Part 3: low resonant "thud" body (gives it weight) ─
  const thudOsc = ac.createOscillator();
  thudOsc.type = "sine";
  thudOsc.frequency.setValueAtTime(120, now);
  thudOsc.frequency.exponentialRampToValueAtTime(60, now + 0.05);

  const thudGain = ac.createGain();
  thudGain.gain.setValueAtTime(0.12, now);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  thudOsc.connect(thudGain);
  thudGain.connect(ac.destination);
  thudOsc.start(now);
  thudOsc.stop(now + 0.06);
}

/* ── Pan the sound left/right based on which "phone" flashed ── */
function createPannedShutter(ac: AudioContext, pan: number) {
  const now = ac.currentTime;

  const clickLen = ac.sampleRate * 0.03;
  const clickBuf = ac.createBuffer(1, clickLen, ac.sampleRate);
  const d = clickBuf.getChannelData(0);
  for (let i = 0; i < clickLen; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (clickLen * 0.06));
  }
  const src = ac.createBufferSource();
  src.buffer = clickBuf;

  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2500 + Math.random() * 3000;
  filter.Q.value = 1.5;

  const gain = ac.createGain();
  // Vary volume to create depth (quieter = further away)
  gain.gain.setValueAtTime(0.12 + Math.random() * 0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  const panner = ac.createStereoPanner();
  panner.pan.value = pan;

  src.connect(filter);
  filter.connect(gain);
  gain.connect(panner);
  panner.connect(ac.destination);
  src.start(now);
  src.stop(now + 0.04);
}

export function HeroCrowd() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
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

  // ── Audio engine ──
  useEffect(() => {
    let started = false;

    function initAudio() {
      if (started) return;
      started = true;

      try {
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        function fireShutterBurst() {
          if (!audioContextRef.current) return;
          const ac = audioContextRef.current;
          if (ac.state === "suspended") ac.resume();

          // Pick a random flash position for stereo panning
          const pos = flashPositions[Math.floor(Math.random() * flashPositions.length)];
          const panValue = (parseFloat(pos.left) / 100) * 2 - 1; // -1 to 1

          // 70% chance: single distant click, 30% chance: full shutter
          if (Math.random() > 0.3) {
            createPannedShutter(ac, panValue);
          } else {
            createShutterSound(ac);
          }
        }

        function scheduleNext() {
          // Random delay between shutters — some rapid bursts, some gaps
          const isBurst = Math.random() > 0.7;
          const delay = isBurst
            ? 150 + Math.random() * 400 // rapid burst
            : 600 + Math.random() * 2000; // normal spacing

          const t = setTimeout(() => {
            fireShutterBurst();

            // During bursts, sometimes fire 2-3 rapid clicks
            if (isBurst && Math.random() > 0.5) {
              const t2 = setTimeout(() => {
                fireShutterBurst();
              }, 80 + Math.random() * 150);
              timeoutsRef.current.push(t2);
            }

            scheduleNext();
          }, delay);
          timeoutsRef.current.push(t);
        }

        // Start with a prominent shutter after a beat
        const t0 = setTimeout(() => {
          createShutterSound(ctx);
          scheduleNext();
        }, 1200);
        timeoutsRef.current.push(t0);
      } catch {
        // Web Audio not supported
      }
    }

    // Trigger on first interaction
    const events = ["click", "touchstart", "scroll", "mousemove"] as const;
    events.forEach((e) =>
      window.addEventListener(e, initAudio, { once: true, passive: true })
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, initAudio));
      timeoutsRef.current.forEach(clearTimeout);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none overflow-hidden">
      {/* Heavy gradient fade: crowd dissolves into dark hero background */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            "linear-gradient(to bottom,",
            "black 0%,",
            "rgba(0,0,0,0.95) 15%,",
            "rgba(0,0,0,0.85) 25%,",
            "rgba(0,0,0,0.6) 40%,",
            "rgba(0,0,0,0.3) 55%,",
            "rgba(0,0,0,0.1) 70%,",
            "transparent 80%,",
            "rgba(0,0,0,0.3) 92%,",
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
