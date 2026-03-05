"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth, useSubscription } from "@/lib/supabase/auth-context";
import { AI_TOOLS, type AIToolType } from "@/lib/ai/types";
import { hasAccess, type Feature } from "@/lib/tiers";
import Link from "next/link";
import type { Scan } from "@/lib/supabase/types";

export default function AIToolPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { tier } = useSubscription();
  const toolSlug = params.tool as string;
  const toolType = toolSlug.replace(/-/g, "_") as AIToolType;
  const tool = AI_TOOLS.find((t) => t.type === toolType);

  const [scans, setScans] = useState<Scan[]>([]);
  const [selectedScan, setSelectedScan] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [saved, setSaved] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Check access
  const feature = toolType === "marketing_play" ? "marketing_plays" : toolType as Feature;
  const locked = !hasAccess(tier, feature);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("scans")
      .select("id, domain, company_name, overall_score, created_at")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setScans(data as unknown as Scan[]);
        if (data && data.length > 0) setSelectedScan(data[0].id);
      });
  }, [user]);

  async function handleGenerate() {
    if (!selectedScan || generating) return;
    setGenerating(true);
    setOutput("");
    setSaved(false);

    try {
      const res = await fetch(`/api/ai/${toolType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanId: selectedScan }),
      });

      if (!res.ok) {
        const err = await res.json();
        setOutput(`Error: ${err.error || "Generation failed"}`);
        setGenerating(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setOutput(text);
        // Auto-scroll
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }
    } catch {
      setOutput("Error: Failed to connect to AI service.");
    }

    setGenerating(false);
  }

  async function handleSave() {
    if (!output || saved) return;
    try {
      const res = await fetch(`/api/ai/${toolType}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scanId: selectedScan,
          title: `${tool?.name || toolType} — ${new Date().toLocaleDateString()}`,
          content: output,
        }),
      });
      if (res.ok) setSaved(true);
    } catch {
      // Silent fail
    }
  }

  if (!tool) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 font-sans">Tool not found.</p>
        <Link href="/app/ai-tools" className="text-white text-sm mt-4 inline-block hover:underline">
          Back to AI Tools
        </Link>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h2 className="text-xl font-wide font-bold uppercase mb-3">Upgrade Required</h2>
        <p className="text-sm text-zinc-400 font-sans mb-8">
          {tool.name} requires a Growth plan or higher.
        </p>
        <Link
          href="/scalex/pricing"
          className="inline-block px-8 py-4 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all"
        >
          View Plans
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/app/ai-tools" className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors mb-4 inline-block">
          &larr; AI Tools
        </Link>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
            </svg>
          </div>
          <h1 className="text-2xl font-wide font-bold uppercase">{tool.name}</h1>
        </div>
        <p className="text-sm text-zinc-400 font-sans">{tool.description}</p>
      </div>

      {/* Scan selector */}
      <div className="border border-white/10 p-6 mb-6">
        <label className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-3">Select a scan to use as context</label>
        {scans.length === 0 ? (
          <div>
            <p className="text-sm text-zinc-400 font-sans mb-4">You need at least one saved scan to use AI tools.</p>
            <Link href="/scalex" className="inline-block px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold">
              Run a Scan
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-end">
            <select
              value={selectedScan}
              onChange={(e) => setSelectedScan(e.target.value)}
              className="flex-1 bg-transparent border border-white/20 py-3 px-4 text-sm font-sans text-white outline-none focus:border-white/40 transition-colors appearance-none cursor-pointer"
            >
              {scans.map((s) => (
                <option key={s.id} value={s.id} className="bg-black text-white">
                  {s.company_name || s.domain} — Score: {s.overall_score}/100
                </option>
              ))}
            </select>
            <button
              onClick={handleGenerate}
              disabled={generating || !selectedScan}
              className="px-8 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
            >
              {generating ? "Generating..." : "Generate"}
            </button>
          </div>
        )}
      </div>

      {/* Output */}
      {(output || generating) && (
        <div className="border border-white/10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">
              {generating ? "Generating..." : "Result"}
            </span>
            {output && !generating && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  Copy
                </button>
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors disabled:text-emerald-400 cursor-pointer"
                >
                  {saved ? "Saved" : "Save to Playbooks"}
                </button>
              </div>
            )}
          </div>
          <div
            ref={outputRef}
            className="p-6 max-h-[600px] overflow-y-auto font-sans text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap"
          >
            {output || (
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="w-2 h-2 bg-white/30 rounded-full animate-pulse" />
                Thinking...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
