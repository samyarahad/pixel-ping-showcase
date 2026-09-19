"use client";

import { motion } from "framer-motion";
import { Reveal, Card } from "./feature-bento";
import { BreathingOrb, GlowCard, PixelField } from "./fx";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/* ----------------------------- infrastructure ----------------------------- */

const REGIONS = [
  { city: "Frankfurt", code: "FRA", ms: 8, pct: 22 },
  { city: "Amsterdam", code: "AMS", ms: 11, pct: 30 },
  { city: "London", code: "LON", ms: 14, pct: 38 },
  { city: "New York", code: "NYC", ms: 31, pct: 66 },
  { city: "Singapore", code: "SIN", ms: 46, pct: 84 },
];

const STACK = [
  { name: "Cloudflare", note: "edge delivery & WAF" },
  { name: "WireGuard", note: "encrypted tunnels" },
  { name: "SQLite", note: "local-first state" },
  { name: "WebSockets", note: "live updates" },
];

export function Infrastructure() {
  return (
    <section id="infrastructure" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-medium text-[#ff8a5c]">Network</p>
            <h2 className="mt-2 text-balance text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-zinc-50 sm:text-[40px]">
              Quiet control over a loud internet.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-400">
              Pixel &amp; Ping sits as a thin layer over infrastructure you already trust. Cloudflare
              carries the edge, WireGuard carries the tunnels, and the dashboard carries the judgment
              calls. Requests resolve at the nearest PoP and fail over automatically when a node
              degrades — like edge-03 did last Tuesday, before users ever felt it.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {STACK.map((s) => (
                <span
                  key={s.name}
                  className="group flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px]"
                >
                  <span className="font-medium text-zinc-200">{s.name}</span>
                  <span className="text-zinc-500">{s.note}</span>
                </span>
              ))}
            </div>

            {/* fiber imagery — ties the copy to something you can feel */}
            <div className="group relative mt-8 overflow-hidden rounded-2xl border border-white/[0.08]">
              <img
                src={asset("/showcase/traffic.jpg")}
                alt="Live fiber traffic"
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.21,0.6,0.35,1)] group-hover:scale-[1.04] sm:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-4 flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-zinc-300 backdrop-blur-md">
                  fra-01 · 1s resolution
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10.5px] text-emerald-400 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  streaming
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[14.5px] font-semibold text-zinc-100">Median latency by region</h3>
                <span className="text-[11px] text-zinc-500">last 30 days</span>
              </div>
              <div className="mt-5 flex flex-col gap-4">
                {REGIONS.map((r, i) => (
                  <div key={r.code} className="flex items-center gap-4">
                    <span className="w-10 shrink-0 rounded bg-white/[0.05] px-1.5 py-0.5 text-center text-[10.5px] font-semibold tracking-wide text-zinc-400">
                      {r.code}
                    </span>
                    <span className="w-20 shrink-0 truncate text-[13px] text-zinc-400">{r.city}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${r.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.21, 0.6, 0.35, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#ff5a1f]/50 to-[#ff5a1f]"
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right text-[12.5px] tabular-nums text-zinc-300">{r.ms} ms</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[12px] text-zinc-500">
                <span className="relative flex h-2 w-2">
                  <span className="pp-ping-soft absolute h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Auto-failover engaged 3 times this month · 0 dropped sessions
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- changelog ------------------------------- */

const LOG = [
  {
    v: "v2.4.0",
    date: "Sep 12, 2026",
    tag: "Minor",
    items: [
      "IP Scanner 2.0 — reputation data blended into pool scoring",
      "WireGuard profile export per user and per server",
      "Degraded-node auto failover now re-routes before alerting",
    ],
  },
  {
    v: "v2.3.2",
    date: "Aug 28, 2026",
    tag: "Patch",
    items: [
      "Fixed latency chart timezone drift on UTC+ zones",
      "Port matrix keyboard navigation restored",
      "Reduced dashboard cold-start by ~220 ms",
    ],
  },
  {
    v: "v2.3.0",
    date: "Jul 30, 2026",
    tag: "Minor",
    items: [
      "Endpoint graph with typed, labeled connections",
      "Per-user audit trails with CSV export",
      "New region: Singapore (SIN)",
    ],
  },
];

export function Changelog() {
  return (
    <section id="changelog" className="border-t border-white/[0.06] bg-[#0b0b0e] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-[13px] font-medium text-[#ff8a5c]">Changelog</p>
          <h2 className="mt-2 text-balance text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-zinc-50 sm:text-[40px]">
            Shipped, not promised.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-400">
            A release every few weeks, patch notes you can actually read. The product you just
            toured is the one that ships today.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {LOG.map((l, i) => (
            <Reveal key={l.v} delay={i * 0.08}>
              <Card className="h-full p-6">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[14px] font-semibold text-zinc-100">{l.v}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10.5px] font-medium",
                      l.tag === "Minor" ? "bg-[#ff5a1f]/12 text-[#ff8a5c]" : "bg-white/[0.06] text-zinc-400"
                    )}
                  >
                    {l.tag}
                  </span>
                  <span className="ml-auto text-[11.5px] text-zinc-600">{l.date}</span>
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {l.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[13.5px] leading-relaxed text-zinc-400">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#ff5a1f]/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA ----------------------------------- */

export function CtaSection() {
  return (
    <section id="cta" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <GlowCard radius={260} className="rounded-3xl">
            <div className="relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
              {/* ambient network imagery under everything */}
              <img
                src={asset("/showcase/network.jpg")}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/70 via-[#09090b]/55 to-[#09090b]/85" />
              <div className="pp-grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,black,transparent)]" />
              <BreathingOrb className="-top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.16),transparent)] blur-[110px]" />
              <PixelField count={64} seed={21} active className="opacity-60 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,black,transparent)]" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-balance text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-zinc-50 sm:text-[44px]">
                  Put your network on one screen this afternoon.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[15.5px] leading-relaxed text-zinc-400">
                  Register your first server, pair an endpoint and watch live traffic — in under
                  fifteen minutes, free up to 25 endpoints.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#top"
                    className="pp-shine relative overflow-hidden rounded-lg bg-[#ff5a1f] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_12px_36px_-8px_rgba(255,90,31,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff6b35]"
                  >
                    Get started free
                  </a>
                  <a
                    href="#tour"
                    className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-[15px] font-medium text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
                  >
                    Talk to us first
                  </a>
                </div>
                <p className="mt-6 text-[12.5px] text-zinc-600">
                  Self-hosted option available · your data never leaves your network unless you say so
                </p>
              </div>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

const FOOT = [
  {
    h: "Product",
    links: ["Overview", "Features", "IP Scanner", "Changelog", "Roadmap"],
  },
  {
    h: "Resources",
    links: ["Documentation", "API reference", "System status", "Community", "Support"],
  },
  {
    h: "Company",
    links: ["About", "Blog", "Contact", "Privacy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0b0b0e]">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-[#26262c] to-[#131316] ring-1 ring-white/[0.16] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <img src={asset("/brand/logo-mark.png")} alt="" className="h-7 w-7 object-contain drop-shadow-[0_0_10px_rgba(255,90,31,0.45)]" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">Pixel &amp; Ping</span>
            </div>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-zinc-500">
              Network management without the noise. Built by a small team that runs production
              networks and got tired of noisy dashboards.
            </p>
            <a
              href="#top"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[12px] font-medium text-emerald-400 transition-colors hover:bg-emerald-400/[0.12]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="pp-ping-soft absolute h-full w-full rounded-full bg-emerald-400" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              All systems operational
            </a>
          </div>
          {FOOT.map((col) => (
            <nav key={col.h} aria-label={col.h}>
              <p className="text-[13px] font-semibold text-zinc-300">{col.h}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-[13.5px] text-zinc-500 transition-colors hover:text-zinc-200">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-[12.5px] text-zinc-600">© 2026 Pixel &amp; Ping. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[12.5px] text-zinc-600">
            <a href="#top" className="transition-colors hover:text-zinc-300">GitHub</a>
            <a href="#top" className="transition-colors hover:text-zinc-300">X / Twitter</a>
            <span className="tabular-nums">v2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
