"use client";

/**
 * ShowcaseGallery — HorizonX-style media cards.
 * Each card: full-bleed brand imagery; hovering unfolds a staggered
 * description panel (grid-rows trick) with a light-beam sweep, media zoom,
 * brand-flip tag chip and rising arrow — wrapped in the GlowCard lamp frame.
 * Touch devices get the panel permanently open via @media (hover:none).
 */

import { useState } from "react";
import { GlowCard, PixelField, Reveal } from "./fx";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

type Item = {
  img: string;
  tag: string;
  title: string;
  desc: string;
  meta: string;
  span: string; // grid column span at lg
  h: string; // card height
  pixels?: boolean;
};

const ITEMS: Item[] = [
  {
    img: "/showcase/traffic.jpg",
    tag: "Live traffic",
    title: "Watch every packet breathe",
    desc: "Per-second ingress and egress across every edge node, with anomaly markers the moment a route starts to degrade.",
    meta: "1s resolution · 6 PoPs",
    span: "lg:col-span-7",
    h: "h-[300px] sm:h-[340px] lg:h-[380px]",
  },
  {
    img: "/showcase/scan.jpg",
    tag: "IP Scanner",
    title: "Score a pool before you trust it",
    desc: "Reachability, reputation and subnet hygiene blended into a single reputation score for every CIDR you own.",
    meta: "185.220.0.0/16 · score 94",
    span: "lg:col-span-5",
    h: "h-[300px] sm:h-[340px] lg:h-[380px]",
    pixels: true,
  },
  {
    img: "/showcase/servers.jpg",
    tag: "Infrastructure",
    title: "Racks without the room",
    desc: "Health, load and temperature for every node in the fleet — noisy neighbors get flagged before they bite.",
    meta: "edge-01 … core-04 · 30d uptime 99.98%",
    span: "lg:col-span-5",
    h: "h-[300px] sm:h-[340px] lg:h-[380px]",
  },
  {
    img: "/showcase/network.jpg",
    tag: "Global edge",
    title: "Six PoPs, one heartbeat",
    desc: "Auto-failover re-routes degraded nodes before users ever feel it — like edge-03 did last Tuesday, quietly.",
    meta: "FRA · AMS · LON · NYC · SIN",
    span: "lg:col-span-7",
    h: "h-[300px] sm:h-[340px] lg:h-[380px]",
    pixels: true,
  },
  {
    img: "/showcase/ops.jpg",
    tag: "Endpoints",
    title: "Every device, one map",
    desc: "Laptops, phones and servers converge into the core with typed, labeled connections you can actually read.",
    meta: "1,284 endpoints paired",
    span: "lg:col-span-4",
    h: "h-[300px] lg:h-[320px]",
  },
  {
    img: "/showcase/shield.jpg",
    tag: "Security",
    title: "Quiet, vigilant, yours",
    desc: "WireGuard tunnels, per-user audit trails and port-level visibility keep the whole fleet locked down by default.",
    meta: "0 dropped sessions · 30d",
    span: "lg:col-span-8",
    h: "h-[300px] lg:h-[320px]",
  },
];

function ShowcaseCard({ item, index }: { item: Item; index: number }) {
  const [active, setActive] = useState(false);
  return (
    <Reveal className={cn(item.span)} delay={(index % 2) * 0.08}>
      <GlowCard radius={200}>
        <div
          className={cn("pp-show group relative h-full overflow-hidden rounded-[15px]", item.h)}
          data-active={active ? "1" : "0"}
          onClick={() => setActive((v) => !v)}
          tabIndex={0}
          role="button"
          aria-label={`${item.tag} — ${item.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActive((v) => !v);
            }
          }}
        >
          {/* media */}
          <img
            src={asset(item.img)}
            alt={item.title}
            loading="lazy"
            className="pp-show-media absolute inset-0 h-full w-full object-cover"
          />

          {/* beam sweep */}
          <div aria-hidden className="pp-show-beam z-10" />

          {/* scrim */}
          <div aria-hidden className="pp-show-scrim absolute inset-0 z-10" />

          {/* tag chip */}
          <span className="pp-show-tag absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-wide text-zinc-200 backdrop-blur-md">
            {item.tag}
          </span>

          {/* arrow chip */}
          <span className="pp-show-arrow absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5a1f] text-white shadow-[0_6px_18px_-4px_rgba(255,90,31,0.7)]">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          {/* description panel */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
            <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-white sm:text-[21px]">
              {item.title}
            </h3>
            <div className="pp-show-extra">
              <div>
                <p className="pt-2 max-w-lg text-[13.5px] leading-relaxed text-zinc-300">
                  {item.desc}
                </p>
                <p className="pt-3 font-mono text-[11px] tracking-wide text-[#ff8a5c]">
                  {item.meta}
                </p>
              </div>
            </div>
          </div>

          {item.pixels && (
            <PixelField count={26} seed={index * 13 + 5} className="z-10 rounded-[15px]" />
          )}
        </div>
      </GlowCard>
    </Reveal>
  );
}

export function ShowcaseGallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-medium text-[#ff8a5c]">Showcase</p>
          <h2 className="mt-2 text-balance text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-zinc-50 sm:text-[40px]">
            See your network the way we built it.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-400">
            Hover — or tap — through the six surfaces your team lives in every day, then open the
            live demo. Every panel you see here is a real screen inside the product.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {ITEMS.map((item, i) => (
            <ShowcaseCard key={item.img} item={item} index={i} />
          ))}

          {/* closing CTA tile */}
          <Reveal className="lg:col-span-12" delay={0.1}>
            <a href="#tour" className="group block">
              <GlowCard radius={240} innerClassName="bg-[#0b0b0e]">
                <div className="relative flex min-h-[150px] flex-col items-start justify-between gap-6 overflow-hidden rounded-[15px] p-6 sm:flex-row sm:items-center sm:px-10 sm:py-8">
                  <PixelField count={54} seed={31} active className="opacity-70" />
                  <div className="relative z-10">
                    <p className="text-[13px] font-medium text-[#ff8a5c]">Ready when you are</p>
                    <p className="mt-1.5 text-[20px] font-semibold tracking-[-0.015em] text-zinc-50 sm:text-[24px]">
                      Open the live dashboard tour
                    </p>
                  </div>
                  <span className="relative z-10 inline-flex items-center gap-2 rounded-lg bg-[#ff5a1f] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_12px_36px_-8px_rgba(255,90,31,0.7)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#ff6b35]">
                    Start the tour
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none">
                      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </GlowCard>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
