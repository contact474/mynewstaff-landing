"use client";

import { useEffect } from "react";

/**
 * No custom UI — the Brooke widget (brooke_widget.js) has its own
 * elegant overlay that auto-opens. We just inject the config and
 * load the script after a 1.2s delay so it appears right after
 * the hero settles.
 */

declare global {
  interface Window {
    BROOKE_CONFIG?: Record<string, unknown>;
    __BROOKE_LOADED__?: boolean;
  }
}

const BROOKE_SRC = "https://cold-caller.mynewstaff.ai/widget/brooke.js";

const BROOKE_CTX = {
  mode: "landing",
  ws: "/ws/products-session",
  brand: "AI BUSINESS MASTERMIND",
  headline: "YOUR BUSINESS\nNEXT LEVEL.",
  subtitle:
    "I'm Brooke — Luka's AI operator. I can walk you through the mastermind for service business owners, help you pick Builder vs Partner, and book your discovery call. Voice-first. Just talk.",
  autoScroll: true,
  extractData: false,
  context: {
    page_type: "mastermind",
    event: "AI Business Mastermind",
    format: "Online — 4-hour live session",
    hosts: ["Luka Lah", "Yeram"],
    icp: "Owner-operated service businesses — roofers, plumbers, HVAC, dental, law, fitness, med spas",
    tiers: {
      builder: {
        price: 2497,
        type: "Knowledge — learn to run every system with Claude",
        includes:
          "Claude mastery, lead gen engine, email outreach, content engine, ad fundamentals, WhatsApp guide",
      },
      partner: {
        price: 4997,
        type: "Lite deploy — we install systems on your business",
        includes:
          "Everything in Builder + deployed lead gen, email, content, WhatsApp bot, client portal, 200 leads, 60 days access",
      },
    },
    brooke_addon:
      "AI Cold Caller available as managed add-on at $2,500/mo + $0.20/min — not in base tiers",
    total_seats: 5,
    seats_left: 3,
    pitch_angle:
      "You ARE the business. Every lead, follow-up, and hire runs through you. The bottleneck isn't hustle — it's systems and architecture. We deploy the AI stack that turns one owner-operator into a scalable operation.",
    key_stats: {
      leads_processed: "20,536",
      email_open_rate: "47%",
      claude_skills: "285+",
      content_per_month: "30+",
      calls_per_day: "200+",
      client_revenue: "$1.1M+ per client",
    },
    apply_url: "https://wa.me/13058503664",
  },
};

export function BrookeSmbPopup() {
  useEffect(() => {
    if (window.__BROOKE_LOADED__) return;
    if (sessionStorage.getItem("brookeSmbDismissed")) return;

    const timer = setTimeout(() => {
      window.BROOKE_CONFIG = BROOKE_CTX;

      const script = document.createElement("script");
      script.src = BROOKE_SRC;
      script.async = true;
      script.onload = () => {
        window.__BROOKE_LOADED__ = true;
      };
      document.head.appendChild(script);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
