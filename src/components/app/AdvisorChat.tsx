"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth, useSubscription } from "@/lib/supabase/auth-context";
import type { Scan } from "@/lib/supabase/types";
import { TIER_HIERARCHY } from "@/lib/tiers";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

export function AdvisorChat() {
  const { user } = useAuth();
  const subscription = useSubscription();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [scans, setScans] = useState<Pick<Scan, "id" | "domain" | "company_name" | "overall_score">[]>([]);
  const [selectedScan, setSelectedScan] = useState<string>("");
  const [bookDiscovery, setBookDiscovery] = useState(false);
  const [showUpgradeCta, setShowUpgradeCta] = useState(false);
  const [tierLimited, setTierLimited] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const msgIdRef = useRef(0);
  const initRef = useRef(false);

  const isPaid = TIER_HIERARCHY[subscription.tier] >= TIER_HIERARCHY["starter"];
  const newId = () => `msg-${++msgIdRef.current}`;

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const addMessage = useCallback(
    (role: "assistant" | "user", content: string) => {
      setMessages((prev) => [...prev, { id: newId(), role, content }]);
      setTimeout(scrollToBottom, 50);
    },
    [scrollToBottom]
  );

  // Load scans on mount
  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("scans")
      .select("id, domain, company_name, overall_score")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setScans(data as Pick<Scan, "id" | "domain" | "company_name" | "overall_score">[]);
          setSelectedScan(data[0].id);
        }
      });
  }, [user]);

  // Opening message
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    addMessage(
      "assistant",
      isPaid
        ? "Welcome back to your ScaleX AI Advisor. I have your full diagnostic data loaded and I'm ready to build you a custom growth plan.\n\nWhat's the biggest challenge you want to tackle today?"
        : "Hey, welcome to your ScaleX AI Advisor. I have your diagnostic data loaded.\n\nI'll analyze your biggest growth gaps and show you exactly what's broken — let's start with your biggest challenge right now."
    );
  }, [addMessage, isPaid]);

  function getHistory() {
    return messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading || tierLimited) return;

    addMessage("user", text);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: getHistory(),
          scanId: selectedScan || undefined,
        }),
      });

      if (!res.ok) {
        addMessage("assistant", "Something went wrong. Could you try again?");
        setLoading(false);
        return;
      }

      const data = await res.json();
      addMessage("assistant", data.reply);

      if (data.bookDiscovery) {
        setBookDiscovery(true);
      }
      if (data.upgradeCta) {
        setShowUpgradeCta(true);
      }
      if (data.tierLimited) {
        setTierLimited(true);
      }
    } catch {
      addMessage("assistant", "Connection error. Please try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      {/* Header with scan selector + tier badge */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 block">ScaleX</span>
            <h1 className="text-lg font-wide font-bold uppercase">AI Advisor</h1>
          </div>
          {!isPaid && (
            <span className="text-[8px] tracking-[0.2em] uppercase bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-0.5">
              Free
            </span>
          )}
          {isPaid && (
            <span className="text-[8px] tracking-[0.2em] uppercase bg-white/10 border border-white/20 text-white px-2 py-0.5">
              Pro
            </span>
          )}
        </div>

        {scans.length > 0 && (
          <div className="flex items-center gap-3">
            <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">Context</label>
            <select
              value={selectedScan}
              onChange={(e) => setSelectedScan(e.target.value)}
              className="bg-transparent border border-white/20 py-1.5 px-3 text-xs font-sans text-white outline-none focus:border-white/40 transition-colors appearance-none cursor-pointer max-w-[200px]"
            >
              {scans.map((s) => (
                <option key={s.id} value={s.id} className="bg-black text-white">
                  {s.company_name || s.domain} — {s.overall_score}/100
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold tracking-wider mt-0.5 ${
                msg.role === "assistant"
                  ? "bg-white text-black"
                  : "bg-white/10 border border-white/20 text-white"
              }`}
            >
              {msg.role === "assistant" ? "SX" : "You"}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] text-sm font-sans leading-relaxed ${
                msg.role === "assistant"
                  ? "text-zinc-300"
                  : "bg-white/[0.04] border border-white/10 rounded-2xl rounded-tr-lg px-4 py-3 text-zinc-300"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold tracking-wider">
              SX
            </div>
            <div className="flex items-center gap-1.5 py-2">
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" />
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {/* Upgrade CTA */}
        {showUpgradeCta && !isPaid && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7" />
            <div className="border border-white/20 bg-white/[0.03] p-4 max-w-[80%]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2">Unlock Full Advisor</p>
              <p className="text-sm text-zinc-300 font-sans mb-3">
                Get full execution plans, marketing plays, implementation checklists, and unlimited conversations — less than a coffee a week.
              </p>
              <a
                href="/app/settings"
                className="inline-block px-5 py-2.5 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all"
              >
                Upgrade to Starter — $9/mo
              </a>
            </div>
          </div>
        )}

        {/* Discovery call CTA */}
        {bookDiscovery && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7" />
            <a
              href="https://mynewstaff.ai/call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all"
            >
              Book Free Discovery Call
            </a>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* No scans warning */}
      {scans.length === 0 && (
        <div className="flex-shrink-0 px-6 py-3 border-t border-white/10 bg-zinc-900/50">
          <p className="text-xs text-zinc-500 font-sans">
            No scans found. <a href="/scalex" className="text-white hover:underline">Run a ScaleX scan</a> first for personalized advice.
          </p>
        </div>
      )}

      {/* Tier limit reached banner */}
      {tierLimited && (
        <div className="flex-shrink-0 px-6 py-4 border-t border-white/20 bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-300 font-sans">
              You&apos;ve reached the free message limit. Upgrade for unlimited access.
            </p>
            <a
              href="/app/settings"
              className="px-5 py-2 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all flex-shrink-0 ml-4"
            >
              Upgrade
            </a>
          </div>
        </div>
      )}

      {/* Input */}
      {!tierLimited && (
        <div className="flex-shrink-0 px-6 py-4 border-t border-white/10">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isPaid ? "Ask anything about your growth strategy..." : "Ask about your growth challenges..."}
              rows={1}
              disabled={loading}
              className="flex-1 bg-transparent border border-white/20 py-3 px-4 text-sm font-sans text-white outline-none focus:border-white/40 transition-colors resize-none placeholder:text-zinc-600 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-5 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
