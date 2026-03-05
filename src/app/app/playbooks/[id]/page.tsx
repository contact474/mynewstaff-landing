"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/auth-context";
import { AI_TOOLS } from "@/lib/ai/types";
import Link from "next/link";
import type { Playbook } from "@/lib/supabase/types";

export default function PlaybookDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("playbooks")
      .select("*")
      .eq("id", params.id)
      .single()
      .then(({ data }) => {
        if (data) setPlaybook(data as Playbook);
        setLoading(false);
      });
  }, [user, params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-zinc-500 text-sm font-sans">Loading...</span>
      </div>
    );
  }

  if (!playbook) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 font-sans text-sm mb-4">Playbook not found.</p>
        <Link href="/app/playbooks" className="text-white text-sm hover:underline">
          Back to Playbooks
        </Link>
      </div>
    );
  }

  const tool = AI_TOOLS.find((t) => t.type === playbook.type);
  const content = (playbook.content as { markdown?: string })?.markdown || JSON.stringify(playbook.content, null, 2);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <Link href="/app/playbooks" className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors mb-6 inline-block">
        &larr; Playbooks
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {tool && (
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                </svg>
              </div>
            )}
            <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">{tool?.name || playbook.type}</span>
          </div>
          <h1 className="text-xl font-wide font-bold uppercase">{playbook.title}</h1>
          <p className="text-xs text-zinc-500 font-sans mt-1">
            {new Date(playbook.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 border border-white/20 text-[10px] tracking-[0.2em] uppercase text-white hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <Link
            href={`/app/ai-tools/${playbook.type.replace(/_/g, "-")}`}
            className="px-4 py-2 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-all"
          >
            Regenerate
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="border border-white/10 p-8">
        <div className="font-sans text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap max-w-3xl">
          {content}
        </div>
      </div>
    </div>
  );
}
