"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/auth-context";
import { AI_TOOLS } from "@/lib/ai/types";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Playbook } from "@/lib/supabase/types";

export default function PlaybooksPage() {
  const { user } = useAuth();
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("playbooks")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPlaybooks(data as Playbook[]);
        setLoading(false);
      });
  }, [user]);

  const filtered = filter === "all" ? playbooks : playbooks.filter((p) => p.type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-zinc-500 text-sm font-sans">Loading playbooks...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 block mb-2">Library</span>
          <h1 className="text-3xl font-wide font-bold uppercase">Playbooks</h1>
        </div>
        <Link
          href="/app/ai-tools"
          className="px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/90 transition-all flex-shrink-0"
        >
          Generate New
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-sans border transition-all cursor-pointer flex-shrink-0 ${
            filter === "all" ? "border-white/40 text-white" : "border-white/10 text-zinc-500 hover:border-white/20"
          }`}
        >
          All ({playbooks.length})
        </button>
        {AI_TOOLS.map((tool) => {
          const count = playbooks.filter((p) => p.type === tool.type).length;
          if (count === 0) return null;
          return (
            <button
              key={tool.type}
              onClick={() => setFilter(tool.type)}
              className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-sans border transition-all cursor-pointer flex-shrink-0 ${
                filter === tool.type ? "border-white/40 text-white" : "border-white/10 text-zinc-500 hover:border-white/20"
              }`}
            >
              {tool.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Playbook grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 border border-white/10">
          <p className="text-zinc-500 font-sans text-sm mb-4">
            {playbooks.length === 0
              ? "No playbooks yet. Generate your first one with AI Tools."
              : "No playbooks match this filter."}
          </p>
          {playbooks.length === 0 && (
            <Link
              href="/app/ai-tools"
              className="inline-block px-6 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold"
            >
              Open AI Tools
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {filtered.map((playbook, i) => {
            const tool = AI_TOOLS.find((t) => t.type === playbook.type);
            return (
              <motion.div
                key={playbook.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/app/playbooks/${playbook.id}`}
                  className="block border border-white/10 p-6 hover:bg-white/[0.02] transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={tool?.icon || ""} />
                      </svg>
                    </div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-500">
                      {tool?.name || playbook.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-sans font-medium text-white mb-2 line-clamp-2">{playbook.title}</h3>
                  <span className="text-[10px] text-zinc-600 font-sans">
                    {new Date(playbook.created_at).toLocaleDateString()}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
