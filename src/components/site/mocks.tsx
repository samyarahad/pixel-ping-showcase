import { cn } from "@/lib/utils";

/* ---------------------------------- bits --------------------------------- */

export function StatusDot({
  tone = "online",
  pulse = false,
  className,
}: {
  tone?: "online" | "degraded" | "offline";
  pulse?: boolean;
  className?: string;
}) {
  const color =
    tone === "online" ? "bg-emerald-400" : tone === "degraded" ? "bg-amber-400" : "bg-zinc-500";
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {pulse && tone === "online" && (
        <span className="pp-ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", color)} />
    </span>
  );
}

export function WindowChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0d0d10] px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] text-[11px] text-zinc-500">
        <svg viewBox="0 0 24 24" className="h-3 w-3 text-emerald-400" fill="none">
          <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
        </svg>
        {url}
      </div>
      <div className="w-10" />
    </div>
  );
}

export function Delta({ value, positive = true }: { value: string; positive?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
        positive ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
      )}
    >
      <svg viewBox="0 0 12 12" className={cn("h-2.5 w-2.5", !positive && "rotate-180")} fill="none">
        <path d="M6 10V2m0 0L2.5 5.5M6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {value}
    </span>
  );
}

/* ------------------------------- charts ---------------------------------- */

const TRAFFIC = [28, 34, 30, 42, 38, 47, 44, 58, 52, 63, 57, 71, 66, 78, 72, 84, 76, 88, 82, 94, 87, 96, 90, 100];

export function TrafficArea({ className, height = 150 }: { className?: string; height?: number }) {
  const w = 720;
  const h = height;
  const step = w / (TRAFFIC.length - 1);
  const pts = TRAFFIC.map((v, i) => [i * step, h - (v / 100) * (h - 18) - 6] as const);
  const line = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)} preserveAspectRatio="none">
      <defs>
        <linearGradient id="ppArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#ppArea)" />
      <path d={line} fill="none" stroke="#ff5a1f" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill="#ff5a1f">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

const BARS = [34, 52, 40, 66, 48, 78, 58, 88, 64, 96, 72, 84, 60, 90, 70, 55];

export function MiniBars({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full items-end gap-1.5", className)}>
      {BARS.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-[#ff5a1f]/25 to-[#ff5a1f] transition-all"
          style={{ height: `${v}%`, opacity: 0.55 + (v / 100) * 0.45 }}
        />
      ))}
    </div>
  );
}

export function Sparkline({ className, tone = "#ff5a1f" }: { className?: string; tone?: string }) {
  const d = "M0,26 C14,24 20,14 32,16 C44,18 50,26 62,22 C74,18 80,8 94,10 C106,12 114,6 128,4";
  return (
    <svg viewBox="0 0 128 30" className={cn("w-full", className)} fill="none" preserveAspectRatio="none">
      <path d={d} stroke={tone} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------- avatar ---------------------------------- */

const AVATAR_TONES = [
  "from-orange-400/80 to-amber-500/80",
  "from-sky-400/70 to-cyan-500/70",
  "from-violet-400/70 to-fuchsia-500/70",
  "from-emerald-400/70 to-teal-500/70",
  "from-rose-400/70 to-pink-500/70",
  "from-indigo-400/70 to-blue-500/70",
];

export function Avatar({ name, i = 0, size = "h-7 w-7 text-[10px]" }: { name: string; i?: number; size?: string }) {
  const initials = name
    .split(/[\s_.-]+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white/90 ring-1 ring-white/10",
        AVATAR_TONES[i % AVATAR_TONES.length],
        size
      )}
    >
      {initials}
    </span>
  );
}
