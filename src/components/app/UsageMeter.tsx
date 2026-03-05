"use client";

interface UsageMeterProps {
  used: number;
  limit: number;
  label: string;
}

function barColor(pct: number): string {
  if (pct > 80) return "bg-red-400";
  if (pct > 50) return "bg-amber-400";
  return "bg-emerald-400";
}

function textColor(pct: number): string {
  if (pct > 80) return "text-red-400";
  if (pct > 50) return "text-amber-400";
  return "text-emerald-400";
}

export function UsageMeter({ used, limit, label }: UsageMeterProps) {
  const isUnlimited = limit === -1;
  const pct = isUnlimited ? 0 : Math.min(100, Math.round((used / limit) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans">{label}</span>
        {isUnlimited ? (
          <span className="text-[10px] tracking-[0.15em] uppercase text-emerald-400 font-sans">Unlimited</span>
        ) : (
          <span className={["text-[10px] tracking-[0.15em] uppercase font-sans", textColor(pct)].join(" ")}>
            {used} / {limit}
          </span>
        )}
      </div>

      {/* Bar track */}
      <div className="h-1 bg-white/10 w-full overflow-hidden">
        {isUnlimited ? (
          <div className="h-full w-full bg-emerald-400/30" />
        ) : (
          <div
            className={["h-full transition-all duration-500", barColor(pct)].join(" ")}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
    </div>
  );
}
