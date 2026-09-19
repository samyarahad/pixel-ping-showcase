"use client";

import { cn } from "@/lib/utils";
import { StatusDot, MiniBars, Sparkline, Avatar } from "./mocks";
import { UsersMock, ScannerMock, PortsMock, EndpointsMock, LiveTrafficMock } from "./product-mocks";
import { Counter, GlowCard, PixelField, Reveal } from "./fx";

function Card({
  className,
  children,
  pixels,
  seed = 1,
}: {
  className?: string;
  children: React.ReactNode;
  pixels?: boolean;
  seed?: number;
}) {
  return (
    <GlowCard innerClassName={className}>
      {pixels && <PixelField count={44} seed={seed} className="rounded-[15px]" />}
      {children}
    </GlowCard>
  );
}

function CardHead({ title, desc, chip }: { title: string; desc: string; chip?: string }) {
  return (
    <div className="p-6 pb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[16.5px] font-semibold tracking-[-0.01em] text-zinc-100">{title}</h3>
        {chip && (
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-zinc-400 transition-colors duration-300 group-hover/glow:border-[#ff5a1f]/40 group-hover/glow:text-[#ff8a5c]">
            {chip}
          </span>
        )}
      </div>
      <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-zinc-500">{desc}</p>
    </div>
  );
}

const STATS = [
  { v: 1284, l: "endpoints monitored", suffix: "" },
  { v: 42, l: "median latency", suffix: " ms" },
  { v: 99.98, l: "fleet uptime, 30d", suffix: "%", decimals: 2 },
  { v: 6, l: "PoPs across EU & US", suffix: "" },
];

export function StatsStrip() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#0b0b0e]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 sm:grid-cols-4 lg:px-8">
        {STATS.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.06} className="py-8 text-center sm:py-10">
            <p className="text-[28px] font-semibold tracking-tight text-zinc-50">
              <Counter value={s.v} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <p className="mt-1 text-[12.5px] text-zinc-500">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-medium text-[#ff8a5c]">Features</p>
          <h2 className="mt-2 text-balance text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-zinc-50 sm:text-[40px]">
            Everything a network needs. Nothing it doesn&rsquo;t.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-400">
            Six focused tools that cover the daily work of running a network — designed to stay quiet
            until something actually needs you.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* 1 — live traffic */}
          <Reveal className="lg:col-span-2">
            <Card className="h-full" pixels seed={3}>
              <CardHead
                title="Live traffic analytics"
                desc="Per-second ingress and egress across every edge node, with anomaly markers the moment a route starts to degrade."
                chip="real-time"
              />
              <div className="px-6 pb-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
                <LiveTrafficMock />
              </div>
            </Card>
          </Reveal>

          {/* 2 — user directory */}
          <Reveal delay={0.08}>
            <Card className="flex h-full flex-col">
              <CardHead
                title="Users & access"
                desc="Role-based access with per-user audit trails."
              />
              <div className="mt-auto px-3 pb-3 [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]">
                <UsersMock compact />
              </div>
            </Card>
          </Reveal>

          {/* 3 — IP scanner */}
          <Reveal delay={0.05}>
            <Card className="flex h-full flex-col" pixels seed={11}>
              <CardHead
                title="Clean-IP scanner"
                desc="Score pools before you deploy — reachability, reputation, subnet hygiene."
                chip="new in 2.4"
              />
              <div className="mt-auto px-3 pb-3 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
                <ScannerMock compact />
              </div>
            </Card>
          </Reveal>

          {/* 4 — endpoint graph */}
          <Reveal delay={0.1}>
            <Card className="flex h-full flex-col">
              <CardHead
                title="Endpoint pairing"
                desc="Every device converges into the core with typed, labeled connections."
              />
              <div className="mt-auto px-3 pb-3">
                <EndpointsMock className="flex min-h-[220px] items-center" />
              </div>
            </Card>
          </Reveal>

          {/* 5 — port matrix */}
          <Reveal delay={0.15}>
            <Card className="flex h-full flex-col">
              <CardHead
                title="Port matrix"
                desc="HTTP, HTTPS, SSH and WireGuard mapped across every node — no spreadsheet required."
              />
              <div className="mt-auto px-3 pb-3">
                <PortsMock compact />
              </div>
            </Card>
          </Reveal>

          {/* 6 — mini stats card row */}
          <Reveal delay={0.2} className="md:col-span-2 lg:col-span-1">
            <Card className="flex h-full flex-col">
              <CardHead
                title="Health at a glance"
                desc="Compact widgets stay on top of the fleet so you don't have to."
              />
              <div className="mt-auto grid grid-cols-2 gap-3 p-3 pt-0">
                <div className="rounded-xl border border-white/[0.06] bg-[#111114] p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-zinc-500">Load</p>
                    <span className="rounded-full bg-white/[0.05] px-1.5 text-[9.5px] text-zinc-400">7d</span>
                  </div>
                  <p className="mt-1 text-[22px] font-semibold tracking-tight tabular-nums text-zinc-50">45%</p>
                  <div className="mt-2 h-9">
                    <MiniBars />
                  </div>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-[#111114] p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-zinc-500">Response</p>
                    <span className="flex items-center gap-1 text-[9.5px] text-emerald-400">
                      <StatusDot pulse /> stable
                    </span>
                  </div>
                  <p className="mt-1 text-[22px] font-semibold tracking-tight tabular-nums text-zinc-50">
                    1.2<span className="text-[13px] font-medium text-zinc-500">s</span>
                  </p>
                  <div className="mt-3 h-9">
                    <Sparkline tone="#34d399" />
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { Reveal, Card, CardHead };
