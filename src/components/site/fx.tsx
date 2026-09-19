"use client";

/**
 * HorizonX-grade interaction FX for Pixel & Ping:
 *  - GlowCard   → "Border Glow": a lamp on the 1px outline that slides to the
 *                 point nearest the pointer (rAF-lerped, with soft halo spill)
 *  - PixelField → "Pixel Card": a shimmering pixel field that comes alive on hover
 *  - BreathingOrb → slow radial pulse for ambient depth
 *  - Reveal     → blur + rise scroll entrance
 *  - Counter    → in-view count-up with formatting
 *  - Marquee    → infinite status ticker (Text Loop)
 *  - GlowButton → primary CTA with shine sweep + amber bloom
 *  - Tilt       → pointer-tracked 3D tilt (springs back on leave)
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------- GlowCard -------------------------------- */

export function GlowCard({
  children,
  className,
  innerClassName,
  radius = 150, // lamp reach in px
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  radius?: number;
  spotlight?: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const target = useRef({ gx: 0, gy: 0, ox: 0, oy: 0 });
  const current = useRef({ gx: 0, gy: 0, ox: 0, oy: 0 });
  const raf = useRef<number>(0);

  // exponential smoothing → the lamp "slides" instead of jumping
  const slide = () => {
    const el = frameRef.current;
    if (!el) return;
    const t = target.current;
    const c = current.current;
    c.gx += (t.gx - c.gx) * 0.18;
    c.gy += (t.gy - c.gy) * 0.18;
    c.ox += (t.ox - c.ox) * 0.12;
    c.oy += (t.oy - c.oy) * 0.12;
    el.style.setProperty("--gx", `${c.gx.toFixed(1)}px`);
    el.style.setProperty("--gy", `${c.gy.toFixed(1)}px`);
    el.style.setProperty("--ox", `${c.ox.toFixed(1)}px`);
    el.style.setProperty("--oy", `${c.oy.toFixed(1)}px`);
    if (Math.abs(t.gx - c.gx) > 0.5 || Math.abs(t.gy - c.gy) > 0.5) {
      raf.current = requestAnimationFrame(slide);
    } else {
      raf.current = 0;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // clamp pointer to the frame → nearest point on the border
    const cx = Math.max(0, Math.min(x, r.width));
    const cy = Math.max(0, Math.min(y, r.height));
    const dTop = cy;
    const dBottom = r.height - cy;
    const dLeft = cx;
    const dRight = r.width - cx;
    const min = Math.min(dTop, dBottom, dLeft, dRight);
    let gx = x;
    let gy = y;
    if (min === dTop) gy = 0;
    else if (min === dBottom) gy = r.height;
    else if (min === dLeft) gx = 0;
    else gx = r.width;
    target.current = { gx, gy, ox: x, oy: y };
    el.dataset.active = "1";
    if (!raf.current) raf.current = requestAnimationFrame(slide);
  };

  const onPointerLeave = () => {
    const el = frameRef.current;
    if (el) el.dataset.active = "0";
  };

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    []
  );

  return (
    <div className={cn("group/glow relative h-full", className)}>
      {/* halo spill behind the card */}
      <div
        aria-hidden
        className="pp-glow-halo pointer-events-none absolute -inset-2 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{ ["--r" as string]: `${radius}px` }}
      />
      <div
        ref={frameRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        data-active="0"
        className="pp-glow relative h-full overflow-hidden rounded-2xl p-px"
      >
        {/* 1px lamp layer, revealed only through the padding frame */}
        <div aria-hidden className="pp-glow-ring pointer-events-none absolute inset-0" style={{ ["--r" as string]: `${radius}px` }} />
        <div className="relative h-full overflow-hidden rounded-[15px] bg-[#0e0e11]">
          {spotlight && <div aria-hidden className="pp-glow-spot pointer-events-none absolute inset-0" />}
          <div className={cn("relative z-10 h-full", innerClassName)}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ PixelField -------------------------------- */

/** deterministic pseudo-random so SSR/client markup match */
function seeded(i: number, seed: number) {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function PixelField({
  count = 70,
  seed = 1,
  className,
  color = "255, 90, 31",
  active = false, // always-on (true) or hover-activated (false)
}: {
  count?: number;
  seed?: number;
  className?: string;
  color?: string;
  active?: boolean;
}) {
  const pixels = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i, seed) * 100,
        top: seeded(i + 1000, seed) * 100,
        size: 2 + Math.round(seeded(i + 2000, seed) * 2), // 2–4px
        delay: (seeded(i + 3000, seed) * 4).toFixed(2),
        duration: (1.6 + seeded(i + 4000, seed) * 2.4).toFixed(2),
        bright: seeded(i + 5000, seed) > 0.72,
      })),
    [count, seed]
  );

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700",
        active ? "opacity-100" : "opacity-0 group-hover/glow:opacity-100 group-hover:opacity-100",
        className
      )}
    >
      {pixels.map((p, i) => (
        <span
          key={i}
          className="pp-twinkle absolute rounded-[1px]"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: p.bright ? `rgba(${color},0.9)` : `rgba(${color},0.45)`,
              boxShadow: p.bright ? `0 0 6px rgba(${color},0.8)` : "none",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ----------------------------- BreathingOrb ------------------------------- */

export function BreathingOrb({
  className,
  delay = 0,
  scale = 1,
}: {
  className?: string;
  delay?: number;
  scale?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pp-breathe pointer-events-none absolute rounded-full", className)}
      style={{ animationDelay: `${delay}s`, ["--orb-scale" as string]: scale } as CSSProperties}
    />
  );
}

/* -------------------------------- Reveal ---------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
  y = 22,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** word-by-word blur rise for hero headlines */
export function BlurWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "108%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: delay + i * stagger, ease: [0.21, 0.6, 0.35, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------- Counter --------------------------------- */

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = true,
  duration = 1.6,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(() => (0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      const v = value * eased;
      setDisplay(
        separator
          ? v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
          : v.toFixed(decimals)
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals, duration, separator]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* -------------------------------- Marquee --------------------------------- */

export function Marquee({
  items,
  className,
  itemClassName,
  duration = 32,
}: {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  duration?: number;
}) {
  return (
    <div className={cn("pp-marquee-mask relative overflow-hidden", className)}>
      <div className="pp-marquee flex w-max items-center" style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((it, i) => (
              <span key={i} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ GlowButton -------------------------------- */

export function GlowButton({
  children,
  href,
  className,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  if (variant === "primary") {
    return (
      <a href={href} className={cn("pp-shine group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[#ff5a1f] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_12px_36px_-8px_rgba(255,90,31,0.7)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)_inset,0_16px_44px_-8px_rgba(255,90,31,0.85)] active:translate-y-0", className)}>
        <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-[14.5px] font-medium text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] active:translate-y-0",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </a>
  );
}

/* --------------------------------- Tilt ----------------------------------- */

export function Tilt({
  children,
  className,
  max = 2.4,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const fine = useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={fine ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      onPointerMove={(e) => {
        if (!fine || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
