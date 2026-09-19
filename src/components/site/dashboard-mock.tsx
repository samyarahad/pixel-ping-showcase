import { cn } from "@/lib/utils";
import { StatusDot, WindowChrome, TrafficArea, Delta, Avatar } from "./mocks";
import { asset } from "@/lib/asset";

const NAV = [
  { label: "Overview", icon: "M3 12l9-8 9 8M5 10v10h14V10", active: true },
  { label: "Users", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75" },
  { label: "Servers", icon: "M4 4h16v6H4zM4 14h16v6H4zM7 7h.01M7 17h.01" },
  { label: "Endpoints", icon: "M12 2v6m0 8v6m-10-10h6m8 0h6M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" },
  { label: "IP Scanner", icon: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" },
  { label: "Ports", icon: "M4 6h16M4 12h16M4 18h16M8 6v12m8-12v12" },
];

const KPIS = [
  { label: "Endpoints online", value: "1,284", delta: "+2.1%", positive: true },
  { label: "Median latency", value: "42 ms", delta: "-8 ms", positive: true },
  { label: "Threats blocked", value: "312", delta: "+18", positive: true },
  { label: "Fleet uptime", value: "99.98%", delta: "30d", positive: true },
];

const SERVERS = [
  { id: "edge-01.pp", region: "FRA", load: 64, tone: "online" as const },
  { id: "edge-02.pp", region: "AMS", load: 41, tone: "online" as const },
  { id: "edge-03.pp", region: "LON", load: 92, tone: "degraded" as const },
  { id: "core-01.pp", region: "NYC", load: 37, tone: "online" as const },
];

const ACTIVITY = [
  { who: "user_alfa", what: "paired laptop-7f to edge-02", when: "2m" },
  { who: "scanner", what: "flagged 103.22.x.x as unclean", when: "9m" },
  { who: "admin", what: "revoked access for guest_04", when: "24m" },
  { who: "edge-03", what: "latency crossed 90 ms threshold", when: "31m" },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "@container overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c0f] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)]",
        className
      )}
    >
      <WindowChrome url="app.pixelping.io/overview" />
      <div className="flex text-left">
        {/* sidebar */}
        <aside className="hidden w-44 shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0a0d] p-3 @xl:flex">
          <div className="flex items-center gap-2 px-2 pb-3 pt-1">
            { }
            <img src={asset("/brand/pixel-ping-logo-nav.png")} alt="" className="h-5 w-5 rounded" />
            <span className="text-[13px] font-semibold tracking-tight text-zinc-200">Pixel &amp; Ping</span>
          </div>
          <nav className="flex flex-col gap-0.5">
            {NAV.map((n) => (
              <span
                key={n.label}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px]",
                  n.active ? "bg-white/[0.06] font-medium text-zinc-100" : "text-zinc-500"
                )}
              >
                <NavIcon d={n.icon} />
                {n.label}
                {n.label === "IP Scanner" && (
                  <span className="ml-auto rounded-full bg-[#ff5a1f]/15 px-1.5 text-[9px] font-semibold text-[#ff8a5c]">2.0</span>
                )}
              </span>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
            <Avatar name="sara rahad" i={2} />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-zinc-200">sara@pp.io</p>
              <p className="text-[10px] text-zinc-500">Owner</p>
            </div>
          </div>
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-zinc-100">Overview</h3>
              <p className="text-[11px] text-zinc-500">Friday, Sep 18 · updated 4s ago</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400 sm:flex">
                Last 24h
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
              <span className="rounded-md bg-[#ff5a1f] px-2.5 py-1 text-[11px] font-semibold text-white">Add server</span>
            </div>
          </div>

          {/* KPI row */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 @[680px]:grid-cols-4">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-lg border border-white/[0.06] bg-[#111114] p-3">
                <p className="truncate text-[11px] text-zinc-500">{k.label}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <p className="whitespace-nowrap text-[19px] font-semibold tracking-tight tabular-nums text-zinc-50">{k.value}</p>
                  <Delta value={k.delta} positive={k.positive} />
                </div>
              </div>
            ))}
          </div>

          {/* chart + servers */}
          <div className="mt-2.5 grid gap-2.5 @[760px]:grid-cols-5">
            <div className="rounded-lg border border-white/[0.06] bg-[#111114] p-3.5 @[760px]:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-zinc-300">Traffic across edge</p>
                <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" /> ingress</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-zinc-600" /> egress</span>
                </div>
              </div>
              <TrafficArea height={130} className="mt-2" />
              <div className="mt-1 flex justify-between text-[10px] tabular-nums text-zinc-600">
                {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "now"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-[#111114] p-3.5 @[760px]:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-zinc-300">Servers</p>
                <span className="text-[10px] text-zinc-500">4 / 4 registered</span>
              </div>
              <div className="mt-2.5 flex flex-col gap-2">
                {SERVERS.map((s) => (
                  <div key={s.id} className="flex items-center gap-2.5">
                    <StatusDot tone={s.tone} pulse={s.tone === "online"} />
                    <span className="w-20 truncate text-[11.5px] text-zinc-300">{s.id}</span>
                    <span className="rounded bg-white/[0.05] px-1 py-px text-[9.5px] font-medium tracking-wide text-zinc-500">{s.region}</span>
                    <div className="ml-auto flex w-16 items-center gap-1.5">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                        <div
                          className={cn("h-full rounded-full", s.tone === "degraded" ? "bg-amber-400" : "bg-emerald-400/80")}
                          style={{ width: `${s.load}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-[10px] tabular-nums text-zinc-500">{s.load}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5 text-[10px] text-zinc-500">
                <StatusDot tone="degraded" />
                edge-03 re-routed via edge-01 · auto failover
              </div>
            </div>
          </div>

          {/* activity */}
          <div className="mt-2.5 hidden items-center gap-5 rounded-lg border border-white/[0.06] bg-[#111114] px-3.5 py-2.5 @[720px]:flex">
            <p className="shrink-0 text-[11px] font-medium text-zinc-400">Activity</p>
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex min-w-0 items-center gap-1.5 text-[10.5px] text-zinc-500">
                <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                <span className="truncate">
                  <span className="text-zinc-300">{a.who}</span> {a.what}
                </span>
                <span className="shrink-0 tabular-nums text-zinc-600">{a.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
