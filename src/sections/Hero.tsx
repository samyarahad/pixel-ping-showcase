/**
 * Hero — opening scene.
 * Combines: editorial oversized typography (monograph) +
 *           breath-cycle subtle scale (yoga calm) +
 *           brand attitude (hardcore)
 *
 * Sequence:
 *   darkness → logo → kinetic name treatment → headline → breath CTA
 */
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState(0);
  const breathRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Breath cycle: 4-second ease-in-out scale (yoga calm)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    function loop(t: number) {
      const el = breathRef.current;
      if (el) {
        const elapsed = (t - start) / 1000;
        const phase = (elapsed % 8) / 8; // 8s cycle = inhale + exhale
        // sin wave 0..1..0
        const s = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2 - Math.PI / 2);
        const scale = 1 + s * 0.04;
        el.style.transform = `scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const brandChars = "PIXEL & PING".split("");

  return (
    <section
      ref={ref}
      id="hero"
      className="hero"
      aria-label="Pixel & Ping — opening"
    >
      {/* Background breath layer (subtle expanding/contracting glow) */}
      <div className="hero__breath" ref={breathRef} aria-hidden="true">
        <div className="hero__breath-glow" />
      </div>

      <div className="shell hero__inner">
        {/* Top meta strip — editorial colophon style */}
        <div className={`hero__meta ${phase >= 1 ? "is-in" : ""}`}>
          <span className="col-label">VOL. 01 — SHOWCASE</span>
          <span className="hero__meta-rule" />
          <span className="col-label">NETWORK · PRODUCT · SYSTEM</span>
        </div>

        {/* Logo + kinetic name treatment */}
        <div className={`hero__brand-block ${phase >= 1 ? "is-in" : ""}`}>
          <div className="hero__logo-wrap" aria-hidden="true">
            <picture>
              <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
              <img
                src="./logo/pixel-ping-logo.png"
                alt=""
                width={88}
                height={88}
                className="hero__logo"
              />
            </picture>
          </div>
          <div className="hero__brand-text" aria-label="PIXEL & PING">
            {brandChars.map((ch, i) => (
              <span
                key={i}
                className="hero__char"
                style={{ animationDelay: `${300 + i * 45}ms` }}
                aria-hidden="true"
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
        </div>

        {/* Oversized headline — monograph treatment */}
        <h1 className={`hero__title h-display ${phase >= 2 ? "is-in" : ""}`}>
          <span className="hero__title-line">
            <span className="reveal-mask"><span>Control</span></span>
            <span className="hero__title-accent">your</span>
          </span>
          <span className="hero__title-line">
            <span className="reveal-mask"><span>network.</span></span>
          </span>
          <span className="hero__title-line hero__title-line--serif">
            <span className="reveal-mask"><span>See</span></span>
            <span className="hero__title-accent hero__title-accent--orange">everything.</span>
          </span>
        </h1>

        {/* Supporting line + scroll cue */}
        <div className={`hero__foot ${phase >= 3 ? "is-in" : ""}`}>
          <p className="hero__sub lead">
            A modern network management experience.
          </p>
          <div className="hero__scroll" aria-hidden="true">
            <span className="hero__scroll-text">SCROLL</span>
            <span className="hero__scroll-line" />
            <span className="hero__scroll-num">01 / 23</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          overflow: hidden;
        }

        .hero__breath {
          position: absolute;
          inset: 0;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
          z-index: 0;
          transform-origin: center center;
          will-change: transform;
        }
        .hero__breath-glow {
          width: 70vmin; height: 70vmin;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 91, 31, 0.10) 0%, transparent 65%);
          filter: blur(40px);
        }

        .hero__inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .hero__meta {
          display: flex; align-items: center; gap: 18px;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
        }
        .hero__meta.is-in { opacity: 1; transform: none; }
        .hero__meta-rule { flex: 1; height: 1px; background: var(--line); max-width: 280px; }

        .hero__brand-block {
          display: flex; align-items: center; gap: 28px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
        }
        .hero__brand-block.is-in { opacity: 1; transform: none; }

        .hero__logo-wrap {
          width: 88px; height: 88px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line-strong);
          padding: 8px;
        }
        .hero__logo {
          width: 100%; height: 100%; object-fit: contain;
          filter: drop-shadow(0 0 30px rgba(255, 91, 31, 0.4));
          animation: hero-logo-pulse 4s ease-in-out infinite;
        }
        @keyframes hero-logo-pulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 91, 31, 0.3)); }
          50%      { filter: drop-shadow(0 0 40px rgba(255, 138, 76, 0.6)); }
        }

        .hero__brand-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.4rem, 3vw, 2rem);
          letter-spacing: 0.4em;
          color: var(--text-1);
          display: inline-flex;
        }
        .hero__char {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px) rotate(8deg);
          animation: hero-char-in 0.9s var(--ease-out) forwards;
        }
        @keyframes hero-char-in {
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        .hero__title {
          margin: 12px 0 0;
          display: flex; flex-direction: column;
          gap: 0;
          color: var(--text-1);
        }
        .hero__title-line {
          display: flex; align-items: baseline; gap: 0.25em;
          font-size: clamp(3rem, 11vw, 11rem);
        }
        .hero__title-line--serif {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 300;
          letter-spacing: -0.03em;
          text-transform: none;
          line-height: 1.0;
        }
        .hero__title-accent {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 300;
          color: var(--text-2);
          text-transform: none;
          letter-spacing: -0.02em;
        }
        .hero__title-accent--orange {
          color: var(--accent-1);
          font-style: italic;
        }
        .hero__title .reveal-mask { display: inline-block; }
        .hero__title .reveal-mask > span {
          display: inline-block;
          transform: translateY(110%);
          transition: transform 1.2s var(--ease-out);
        }
        .hero__title.is-in .reveal-mask > span { transform: translateY(0); }
        .hero__title.is-in .reveal-mask:nth-child(2) > span { transition-delay: 0.1s; }
        .hero__title.is-in .hero__title-line:nth-child(2) .reveal-mask > span { transition-delay: 0.2s; }
        .hero__title.is-in .hero__title-line:nth-child(3) .reveal-mask > span { transition-delay: 0.4s; }

        .hero__foot {
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 32px; flex-wrap: wrap;
          margin-top: 32px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s var(--ease-out), transform 1s var(--ease-out);
        }
        .hero__foot.is-in { opacity: 1; transform: none; }

        .hero__sub {
          margin: 0;
          max-width: 38ch;
          color: var(--text-2);
        }

        .hero__scroll {
          display: flex; align-items: center; gap: 14px;
        }
        .hero__scroll-text {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          color: var(--text-3);
        }
        .hero__scroll-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-1);
          letter-spacing: 0.1em;
        }
        .hero__scroll-line {
          width: 60px; height: 1px;
          background: linear-gradient(to right, var(--accent-1), transparent);
          position: relative; overflow: hidden;
        }
        .hero__scroll-line::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent, var(--text-1), transparent);
          animation: hero-scroll-pulse 2.4s ease-in-out infinite;
        }
        @keyframes hero-scroll-pulse {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 880px) {
          .hero__brand-block { gap: 18px; }
          .hero__logo-wrap { width: 64px; height: 64px; }
          .hero__foot { flex-direction: column; align-items: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__char, .hero__logo, .hero__scroll-line::after { animation: none; }
          .hero__breath { transform: none !important; }
          .hero__meta, .hero__brand-block, .hero__title, .hero__foot { opacity: 1; transform: none; }
          .hero__title .reveal-mask > span { transform: none; }
        }
      `}</style>
    </section>
  );
}
