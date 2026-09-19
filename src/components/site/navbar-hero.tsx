"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { DashboardMock } from "./dashboard-mock";
import {
  BreathingOrb,
  BlurWords,
  GlowButton,
  GlowCard,
  Marquee,
  PixelField,
  Tilt,
} from "./fx";
import { asset } from "@/lib/asset";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#gallery", label: "Showcase" },
  { href: "#tour", label: "Product" },
  { href: "#infrastructure", label: "Network" },
  { href: "#changelog", label: "Changelog" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.35 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pp-progress fixed inset-x-0 top-0 z-[60] h-[2.5px]"
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-white/[0.06] bg-[#09090b]/85 backdrop-blur-xl" : "bg-transparent"
        )}
      >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          {/* brand mark on a light plate → stays readable on the near-black nav */}
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 rounded-xl bg-[#ff5a1f]/0 blur-md transition-all duration-300 group-hover:bg-[#ff5a1f]/30" />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#26262c] to-[#131316] ring-1 ring-white/[0.16] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105" />
            <img
              src={asset("/brand/logo-mark.png")}
              alt="Pixel & Ping logo"
              className="relative h-7 w-7 object-contain drop-shadow-[0_0_10px_rgba(255,90,31,0.45)]"
            />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Pixel &amp; Ping</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-md px-3 py-2 text-[13.5px] text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-100"
            >
              {l.label}
              <span className="absolute inset-x-3 -bottom-px h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#ff5a1f] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#tour"
            className="hidden rounded-lg border border-white/[0.1] px-3.5 py-2 text-[13.5px] font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white sm:block"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="pp-shine relative overflow-hidden rounded-lg bg-[#ff5a1f] px-3.5 py-2 text-[13.5px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_24px_-8px_rgba(255,90,31,0.6)] transition-colors hover:bg-[#ff6b35]"
          >
            Get started
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-300 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#0a0a0d]/95 px-5 py-3 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-[14px] text-zinc-300 hover:bg-white/[0.05]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
      </header>
    </>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[13px] text-zinc-400">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#ff8a5c]" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.35" />
        <path d="M5 8.2 7.2 10.4 11 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}

const TICKER = [
  "edge-01.fra · healthy · 8 ms",
  "scan pool 185.220.0.0/16 · score 94",
  "edge-03.ams · degraded → re-routed",
  "core-01 · load 45% · 7d",
  "42 ms median across 6 PoPs",
  "wireguard tunnel · handshake ok",
  "backup snapshot completed 04:00 UTC",
  "99.98% fleet uptime, 30 days",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const dashY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const dashScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dashOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.45]);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      {/* ambient layer: grid + breathing orbs */}
      <div className="pp-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <BreathingOrb className="-top-48 left-1/2 h-[520px] w-[880px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,90,31,0.13),transparent)] blur-[120px]" />
      <BreathingOrb className="right-[-140px] top-[380px] h-[380px] w-[380px] bg-[radial-gradient(closest-side,rgba(255,90,31,0.07),transparent)] blur-[90px]" delay={2.4} />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* brand medallion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.21, 0.6, 0.35, 1] }}
            className="relative mx-auto mb-8 flex h-[104px] w-[104px] items-center justify-center"
          >
            <div className="pp-breathe absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.26),transparent)] blur-xl" />
            {/* light plate behind the badge → separates it from the dark hero */}
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,#202027,#101014_70%)] ring-1 ring-white/[0.14] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.09)]" />
            <img
              src={asset("/brand/logo-full.png")}
              alt="Pixel & Ping"
              className="relative h-[92px] w-[92px] object-contain drop-shadow-[0_0_30px_rgba(255,90,31,0.45)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <a
              href="#changelog"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] py-1 pl-1 pr-3 text-[12.5px] text-zinc-400 transition-colors hover:border-[#ff5a1f]/40 hover:text-zinc-200"
            >
              <span className="rounded-full bg-[#ff5a1f] px-2 py-0.5 text-[11px] font-semibold text-white">v2.4</span>
              IP Scanner 2.0 &amp; WireGuard profiles are live
              <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none">
                <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <h1 className="mt-6 text-balance text-[40px] font-semibold leading-[1.06] tracking-[-0.03em] text-zinc-50 sm:text-[56px]">
            <BlurWords text="Your whole network." delay={0.25} />
            <br />
            <BlurWords text="One calm dashboard." delay={0.4} wordClassName="text-zinc-400" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-zinc-400"
          >
            Pixel &amp; Ping brings servers, endpoints, users and live traffic together in a single surface —
            with health checks, clean-IP scanning and port-level visibility built in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <GlowButton href="#tour">
              Open live demo
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </GlowButton>
            <GlowButton href="#features" variant="ghost">
              Explore features
            </GlowButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <Check>Free for networks up to 25 endpoints</Check>
            <Check>No credit card required</Check>
          </motion.div>
        </div>

        {/* live status ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <Marquee
            duration={38}
            items={TICKER.map((t, i) => (
              <span key={i} className="flex items-center gap-2.5 px-5 text-[11.5px] font-medium tracking-wide text-zinc-500">
                <span className="h-1 w-1 rounded-full bg-[#ff5a1f]/80" />
                {t}
              </span>
            ))}
          />
        </motion.div>

        {/* dashboard — tilt + glowing frame + pixel dust + scroll parallax
            (entrance and parallax live on separate layers so motion values
             never fight over the same transform source) */}
        <motion.div
          initial={{ opacity: 0, y: 42, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.9, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative mx-auto mt-10 max-w-5xl"
        >
          <motion.div style={{ y: dashY, scale: dashScale, opacity: dashOpacity }}>
            <Tilt>
              <GlowCard radius={220} innerClassName="bg-[#0b0b0e]">
                <div className="relative max-h-[640px] overflow-hidden rounded-[15px]">
                  <PixelField count={56} seed={7} className="z-10 rounded-[15px]" />
                  <div className="relative z-20">
                    <DashboardMock />
                  </div>
                </div>
              </GlowCard>
            </Tilt>
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
