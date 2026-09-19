import { cn } from "@/lib/utils";
import { StatusDot, Avatar, TrafficArea } from "./mocks";

/* --------------------------------- users --------------------------------- */

const USERS = [
  { name: "sara.rahad", role: "Owner", status: "Active", tone: "emerald" as const, last: "now" },
  { name: "milad.k", role: "Admin", status: "Active", tone: "emerald" as const, last: "12m" },
  { name: "nima.v", role: "Operator", status: "Active", tone: "emerald" as const, last: "1h" },
  { name: "guest_04", role: "Guest", status: "Expired", tone: "zinc" as const, last: "3d" },
  { name: "dana.m", role: "Operator", status: "Invited", tone: "amber" as const, last: "—" },
];

export function UsersMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 text-[11px] text-zinc-500">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Search users…
        </div>
        {!compact && <span className="rounded-md border border-white/[0.07] px-2.5 py-1.5 text-[11px] text-zinc-400">Filter</span>}
        <span className="rounded-md bg-[#ff5a1f] px-2.5 py-1.5 text-[11px] font-semibold text-white">Create user</span>
      </div>
      <div className="grid grid-cols-[1fr_auto] items-center gap-2 px-4 pt-2.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
        <span>User</span>
        <span className="flex items-center gap-5">
          <span className={cn("hidden sm:block", compact && "hidden")}>Role</span>
          <span>Status</span>
          <span className="hidden w-8 text-right sm:block">Last</span>
        </span>
      </div>
      <div className="p-2 pt-1.5">
        {(compact ? USERS.slice(0, 4) : USERS).map((u, i) => (
          <div key={u.name} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-white/[0.03]">
            <div className="flex min-w-0 items-center gap-2.5">
              <Avatar name={u.name} i={i} />
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-zinc-200">{u.name}</p>
                {!compact && <p className="truncate text-[10px] text-zinc-500">{u.name}@pp.io</p>}
              </div>
            </div>
            <div className="flex items-center gap-5 text-[11px]">
              <span className={cn("hidden rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-zinc-400 sm:block", compact && "!hidden")}>{u.role}</span>
              <span
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-medium",
                  u.tone === "emerald" && "bg-emerald-400/10 text-emerald-400",
                  u.tone === "amber" && "bg-amber-400/10 text-amber-400",
                  u.tone === "zinc" && "bg-zinc-500/10 text-zinc-400"
                )}
              >
                <StatusDot tone={u.tone === "emerald" ? "online" : u.tone === "amber" ? "degraded" : "offline"} />
                {u.status}
              </span>
              <span className="hidden w-8 text-right tabular-nums text-zinc-600 sm:block">{u.last}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- servers -------------------------------- */

const FLEET = [
  { id: "edge-01.pp", region: "Frankfurt", code: "FRA", status: "Online", tone: "online" as const, latency: "8 ms", uptime: "99.99%", load: 64 },
  { id: "edge-02.pp", region: "Amsterdam", code: "AMS", status: "Online", tone: "online" as const, latency: "11 ms", uptime: "99.98%", load: 41 },
  { id: "edge-03.pp", region: "London", code: "LON", status: "Degraded", tone: "degraded" as const, latency: "94 ms", uptime: "99.71%", load: 92 },
  { id: "core-01.pp", region: "New York", code: "NYC", status: "Online", tone: "online" as const, latency: "31 ms", uptime: "100%", load: 37 },
];

export function ServersMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c0f]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <p className="text-[12.5px] font-medium text-zinc-200">
          Fleet <span className="ml-1 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] tabular-nums text-zinc-400">4</span>
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
          <StatusDot tone="online" pulse /> all heartbeats received
        </span>
      </div>
      <div className="divide-y divide-white/[0.05]">
        {(compact ? FLEET.slice(0, 3) : FLEET).map((s) => (
          <div key={s.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 hover:bg-white/[0.02] sm:grid-cols-[auto_1fr_auto_auto]">
            <StatusDot tone={s.tone} pulse={s.tone === "online"} />
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-zinc-200">
                {s.id} <span className="ml-1 rounded bg-white/[0.05] px-1 py-px text-[9.5px] font-medium text-zinc-500">{s.code}</span>
              </p>
              <p className="text-[10.5px] text-zinc-500">{s.region} · WireGuard · 10s health check</p>
            </div>
            <div className="hidden w-28 sm:block">
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
                <div className={cn("h-full rounded-full", s.tone === "degraded" ? "bg-amber-400" : "bg-emerald-400/80")} style={{ width: `${s.load}%` }} />
              </div>
              <p className="mt-1 text-right text-[9.5px] tabular-nums text-zinc-600">load {s.load}%</p>
            </div>
            <div className="text-right">
              <p className={cn("text-[11.5px] font-medium", s.tone === "degraded" ? "text-amber-400" : "text-zinc-300")}>{s.status}</p>
              <p className="text-[10px] tabular-nums text-zinc-500">{s.latency} · {s.uptime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- scanner -------------------------------- */

const RANGES = [
  { cidr: "103.22.140.0/24", clean: 96, hosts: 254, note: "clean" },
  { cidr: "45.132.8.0/22", clean: 87, hosts: 1022, note: "clean" },
  { cidr: "185.220.101.0/24", clean: 41, hosts: 254, note: "flagged" },
];

export function ScannerMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-zinc-200">IP Scanner</p>
        <span className="rounded-full bg-[#ff5a1f]/12 px-2 py-0.5 text-[10px] font-medium text-[#ff8a5c]">2.0 engine</span>
      </div>
      <p className="mt-1 text-[11px] text-zinc-500">Reputation + reachability across your pools, before you route production traffic.</p>
      <div className="mt-3.5 space-y-2.5">
        {(compact ? RANGES.slice(0, 2) : RANGES).map((r) => (
          <div key={r.cidr} className="rounded-lg border border-white/[0.06] bg-[#111114] p-3">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="font-mono text-zinc-300">{r.cidr}</span>
              <span className={cn("font-medium", r.clean > 70 ? "text-emerald-400" : "text-amber-400")}>
                {r.clean}% clean
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={cn("h-full rounded-full bg-gradient-to-r", r.clean > 70 ? "from-emerald-500/70 to-emerald-400" : "from-amber-500/70 to-red-400")}
                style={{ width: `${r.clean}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-zinc-600">
              <span>{r.hosts} hosts scanned</span>
              <span>{r.note === "clean" ? "safe to route" : "review before deploy"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- ports --------------------------------- */

const PORT_ROWS = [
  { proto: "HTTP", ports: [80, 91, 102, 113, 124], tone: "text-sky-400 bg-sky-400/10" },
  { proto: "HTTPS", ports: [180, 191, 202, 213, 224], tone: "text-emerald-400 bg-emerald-400/10" },
  { proto: "SSH", ports: [280, 291, 302, 313, 324], tone: "text-violet-400 bg-violet-400/10" },
  { proto: "WireGuard", ports: [380, 391, 402, 413, 424], tone: "text-[#ff8a5c] bg-[#ff5a1f]/10" },
];

export function PortsMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-zinc-200">Port matrix</p>
        <span className="text-[10.5px] text-zinc-500">open across 4 nodes</span>
      </div>
      <div className="mt-3 space-y-2.5">
        {(compact ? PORT_ROWS.slice(0, 3) : PORT_ROWS).map((r) => (
          <div key={r.proto} className="flex items-center gap-3">
            <span className={cn("w-20 shrink-0 rounded-md px-2 py-1 text-center text-[10.5px] font-semibold", r.tone)}>{r.proto}</span>
            <div className="flex flex-wrap gap-1.5">
              {(compact ? r.ports.slice(0, 4) : r.ports).map((p) => (
                <span key={p} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[10.5px] tabular-nums text-zinc-400">
                  :{p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- endpoints ------------------------------- */

export function EndpointsMock({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c0f] [&>svg]:h-full", className)}>
      <div className="pp-grid-bg absolute inset-0 opacity-60" />
      <svg viewBox="0 0 480 240" className="relative w-full" preserveAspectRatio="xMidYMid meet">
        {/* links */}
        <path d="M240,120 L110,52" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" fill="none" />
        <path d="M240,120 L96,128" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" fill="none" />
        <path d="M240,120 L128,196" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" fill="none" />
        <path d="M240,120 L368,58" stroke="rgba(255,90,31,0.55)" strokeWidth="1.5" fill="none" className="pp-dash" />
        <path d="M240,120 L382,130" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" fill="none" />
        <path d="M240,120 L352,196" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" fill="none" />
        {/* core */}
        <circle cx="240" cy="120" r="30" fill="#111114" stroke="rgba(255,90,31,0.6)" strokeWidth="1.5" />
        <circle cx="240" cy="120" r="30" fill="url(#coreGlow)" />
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <text x="240" y="116" textAnchor="middle" className="fill-zinc-200" style={{ fontSize: 10, fontWeight: 600 }}>core-01</text>
        <text x="240" y="129" textAnchor="middle" className="fill-zinc-500" style={{ fontSize: 8 }}>NYC</text>
        {/* nodes */}
        {[
          { x: 110, y: 52, label: "edge-01", sub: "FRA", active: false },
          { x: 96, y: 128, label: "edge-02", sub: "AMS", active: false },
          { x: 128, y: 196, label: "edge-03", sub: "LON", active: false },
          { x: 368, y: 58, label: "partner-7f", sub: "pairing", active: true },
          { x: 382, y: 130, label: "laptop-a3", sub: "paired", active: false },
          { x: 352, y: 196, label: "nas-02", sub: "paired", active: false },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="17" fill="#111114" stroke={n.active ? "rgba(255,90,31,0.7)" : "rgba(255,255,255,0.14)"} strokeWidth="1.5" />
            {n.active && <circle cx={n.x} cy={n.y} r="17" fill="none" stroke="rgba(255,90,31,0.5)" strokeWidth="1.5"><animate attributeName="r" values="17;24" dur="1.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0" dur="1.8s" repeatCount="indefinite" /></circle>}
            <text x={n.x} y={n.y + 3} textAnchor="middle" className="fill-zinc-300" style={{ fontSize: 8.5, fontWeight: 500 }}>{n.label}</text>
            <text x={n.x} y={n.y + 32} textAnchor="middle" className="fill-zinc-600" style={{ fontSize: 8 }}>{n.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------- mini traffic ----------------------------- */

export function LiveTrafficMock() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-zinc-300">Traffic across edge</p>
        <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">live</span>
      </div>
      <TrafficArea height={120} className="mt-3" />
      <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-zinc-600">
        {["00:00", "06:00", "12:00", "18:00", "now"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
