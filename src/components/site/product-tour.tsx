"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DashboardMock } from "./dashboard-mock";
import { UsersMock, ServersMock, ScannerMock, PortsMock, EndpointsMock } from "./product-mocks";
import { GlowCard } from "./fx";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "servers", label: "Servers" },
  { id: "endpoints", label: "Endpoints" },
  { id: "scanner", label: "IP Scanner" },
  { id: "ports", label: "Ports" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const NOTES: Record<TabId, string> = {
  overview: "A single morning check: KPIs, traffic and server load on one screen. Everything is updated live — no manual refresh, no stale charts.",
  users: "Create, filter and find people fast. Roles map to real permissions, and every action lands in a per-user audit trail you can export.",
  servers: "Servers self-register and pair into the mesh. Health checks run every 10 seconds, and degraded nodes re-route before anyone notices.",
  endpoints: "Laptops, NAS boxes, partners — every endpoint converges into the core with a typed connection and a visible place on the map.",
  scanner: "Score a range before you route production through it. Scanner 2.0 blends reachability probes with reputation data across the pool.",
  ports: "See which ports are open on which node, grouped by protocol. Close, pin or annotate any port without touching a terminal.",
};

export function ProductTour() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <section id="tour" className="relative border-t border-white/[0.06] bg-[#0b0b0e] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[13px] font-medium text-[#ff8a5c]">Product tour</p>
            <h2 className="mt-2 text-balance text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-zinc-50 sm:text-[40px]">
              Look around before you commit.
            </h2>
          </div>
          <p className="max-w-sm text-[14.5px] leading-relaxed text-zinc-500">
            Six surfaces, one design language. Click through the screens — this is exactly how the
            product ships today.
          </p>
        </div>

        {/* tabs */}
        <div className="pp-scroll mt-10 flex gap-1.5 overflow-x-auto rounded-xl border border-white/[0.07] bg-[#0e0e11] p-1.5" role="tablist" aria-label="Product screens">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative shrink-0 rounded-lg px-4 py-2 text-[13.5px] font-medium transition-colors",
                tab === t.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="tour-pill"
                  className="absolute inset-0 rounded-lg bg-white/[0.09] ring-1 ring-white/[0.1]"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        {/* panel */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                <GlowCard radius={200} innerClassName="bg-[#0c0c0f] p-2.5">
                  {tab === "overview" && <DashboardMock className="border-white/[0.05] shadow-none" />}
                  {tab === "users" && <UsersMock />}
                  {tab === "servers" && <ServersMock />}
                  {tab === "endpoints" && <EndpointsMock className="min-h-[320px]" />}
                  {tab === "scanner" && <ScannerMock />}
                  {tab === "ports" && <PortsMock />}
                </GlowCard>
                <aside className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#0e0e11] p-6">
                  <div>
                    <h3 className="text-[15.5px] font-semibold text-zinc-100">
                      {TABS.find((t) => t.id === tab)?.label}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-zinc-400">{NOTES[tab]}</p>
                  </div>
                  <a
                    href="#cta"
                    className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#ff8a5c] transition-colors hover:text-[#ff5a1f]"
                  >
                    Try it in the live demo
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </aside>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
