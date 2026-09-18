/**
 * FullReveal — editorial monograph climax.
 * Type-heavy: oversized chapter number + headline + orbiting chips with mono labels.
 */
import { useEffect, useRef } from "react";
import { useReveal } from "../utils";

const ORBIT_LABELS = [
  "DASHBOARD", "USERS", "SERVERS", "ENDPOINTS",
  "IP SCANNER", "PORTS", "CLOUDFLARE", "CONFIG",
  "TRAFFIC", "ANALYTICS", "FAILOVER", "LOGS",
  "NOTIFICATIONS", "SETTINGS",
];

export function FullReveal() {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.25 });
  const coreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = coreRef.current;
    if (!el) return;
    const core: HTMLDivElement = el;
    function onMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      core.style.transform = `rotateX(${-dy * 3}deg) rotateY(${dx * 5}deg)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      id="reveal"
      className={`reveal-section ${visible ? "is-visible" : ""}`}
    >
      <div className="shell">
        <div className={`reveal-section__chapter ${visible ? "is-in" : ""}`}>
          <span className="num-tag">CH. 18</span>
          <span className="rule-strong" style={{ width: 80, margin: "0 16px" }} />
          <span className="col-label">THE FULL SYSTEM</span>
        </div>

        <h2 className={`reveal-section__title ${visible ? "is-in" : ""}`}>
          <span className="reveal-mask"><span>Everything is</span></span>
          <span className="reveal-mask"><span>connected.</span></span>
          <span className="reveal-mask">
            <span className="h-serif reveal-section__title-accent">Everything is visible.</span>
          </span>
        </h2>

        <p className={`reveal-section__sub ${visible ? "is-in" : ""}`}>
          All of it belongs to one product — Pixel &amp; Ping.
        </p>

        {/* The orbiting system */}
        <div
          ref={coreRef}
          className={`reveal-core ${visible ? "is-in" : ""}`}
          role="img"
          aria-label="All Pixel & Ping product surfaces orbiting around the central logo"
        >
          <div className="reveal-core__center">
            <picture>
              <source srcSet="./logo/pixel-ping-logo.avif" type="image/avif" />
              <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
              <img src="./logo/pixel-ping-logo.png" alt="" width={120} height={120} loading="lazy" decoding="async" />
            </picture>
            <div className="reveal-core__center-text">PIXEL &amp; PING</div>
            <div className="reveal-core__center-tag">CORE</div>
          </div>

          <div className="reveal-core__orbit reveal-core__orbit--1">
            {ORBIT_LABELS.slice(0, 7).map((label, i) => (
              <span key={label} className="reveal-core__chip">
                <span className="reveal-core__chip-num">0{i + 1}</span>
                <span>{label}</span>
              </span>
            ))}
          </div>
          <div className="reveal-core__orbit reveal-core__orbit--2">
            {ORBIT_LABELS.slice(7).map((label, i) => (
              <span key={label} className="reveal-core__chip reveal-core__chip--alt">
                <span className="reveal-core__chip-num">0{i + 8}</span>
                <span>{label}</span>
              </span>
            ))}
          </div>
          <div className="reveal-core__halo" />
        </div>
      </div>

      <style>{`
        .reveal-section {
          position: relative;
          min-height: 120vh;
          display: flex; align-items: center;
          padding: 140px 0;
          border-top: 1px solid var(--line);
        }
        .reveal-section .shell {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 36px;
        }

        .reveal-section__chapter {
          display: flex; align-items: center;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
        }
        .reveal-section__chapter.is-in { opacity: 1; transform: none; }

        .reveal-section__title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(2.6rem, 8vw, 7rem);
          letter-spacing: -0.04em;
          line-height: 0.92;
          text-transform: uppercase;
          color: var(--text-1);
          display: flex; flex-direction: column;
        }
        .reveal-section__title .reveal-mask { display: block; }
        .reveal-section__title .reveal-mask > span {
          display: block;
          transform: translateY(110%);
          transition: transform 1.2s var(--ease-out);
        }
        .reveal-section__title.is-in .reveal-mask:nth-child(1) > span { transform: translateY(0); }
        .reveal-section__title.is-in .reveal-mask:nth-child(2) > span { transform: translateY(0); transition-delay: 0.15s; }
        .reveal-section__title.is-in .reveal-mask:nth-child(3) > span { transform: translateY(0); transition-delay: 0.3s; }
        .reveal-section__title-accent {
          color: var(--accent-1);
          text-transform: none;
          font-style: italic;
          font-weight: 300;
        }

        .reveal-section__sub {
          margin: 0;
          font-size: 14px;
          color: var(--text-2);
          opacity: 0; transform: translateY(20px);
          transition: opacity 1s var(--ease-out) 0.5s, transform 1s var(--ease-out) 0.5s;
        }
        .reveal-section__sub.is-in { opacity: 1; transform: none; }

        .reveal-core {
          position: relative;
          width: min(720px, 92vw);
          aspect-ratio: 1 / 1;
          margin: 40px auto 0;
          transform-style: preserve-3d;
          transition: transform 0.4s var(--ease-out);
          opacity: 0; transform: scale(0.85);
          transition: opacity 1.6s var(--ease-out), transform 1.6s var(--ease-out);
        }
        .reveal-core.is-in { opacity: 1; transform: scale(1); }
        .reveal-core__center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px;
          filter: drop-shadow(0 0 60px rgba(255,91,31,0.55));
          z-index: 3;
        }
        .reveal-core__center img { animation: reveal-core-pulse 6s ease-in-out infinite; }
        .reveal-core__center-text {
          font-family: var(--font-display);
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.45em;
          color: var(--text-1);
        }
        .reveal-core__center-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--accent-1);
          letter-spacing: 0.3em;
          padding: 3px 8px;
          border: 1px solid var(--accent-1);
        }
        @keyframes reveal-core-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(255,91,31,0.5)); }
          50%      { transform: scale(1.05); filter: drop-shadow(0 0 40px rgba(255,138,76,0.7)); }
        }

        .reveal-core__orbit {
          position: absolute; inset: 0;
          margin: auto;
          border: 1px dashed var(--line-strong);
          border-radius: 50%;
          animation: reveal-orbit linear infinite;
        }
        .reveal-core__orbit--1 { width: 70%; height: 70%; animation-duration: 50s; }
        .reveal-core__orbit--2 { width: 96%; height: 96%; border-color: var(--line); animation-duration: 70s; animation-direction: reverse; }
        @keyframes reveal-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .reveal-core__chip {
          position: absolute;
          top: -10px; left: 50%;
          transform: translateX(-50%);
          padding: 6px 12px;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono);
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.18em;
          color: var(--text-1);
          background: rgba(10, 10, 12, 0.95);
          border: 1px solid var(--line-strong);
          white-space: nowrap;
          backdrop-filter: blur(8px);
          animation: reveal-orbit-counter linear infinite;
        }
        .reveal-core__chip--alt {
          color: var(--accent-1);
          border-color: rgba(255,91,31,0.4);
        }
        .reveal-core__chip-num { color: var(--accent-1); font-size: 8px; }
        .reveal-core__orbit--1 .reveal-core__chip { animation-duration: 50s; animation-direction: reverse; }
        .reveal-core__orbit--2 .reveal-core__chip { animation-duration: 70s; }
        @keyframes reveal-orbit-counter {
          from { transform: translateX(-50%) rotate(0deg); }
          to   { transform: translateX(-50%) rotate(-360deg); }
        }

        .reveal-core__orbit--1 .reveal-core__chip:nth-child(1) { top: 50%;  left: -10px;  transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(2) { top: 100%; left: 25%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(3) { top: 100%; left: 75%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(4) { top: 50%;  left: 100%;   transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(5) { top: 0%;   left: 75%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(6) { top: 0%;   left: 25%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(7) { top: -10px; left: 50%;   transform: translateX(-50%); }

        .reveal-core__orbit--2 .reveal-core__chip:nth-child(1) { top: 50%;  left: -10px;  transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(2) { top: 100%; left: 18%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(3) { top: 100%; left: 50%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(4) { top: 100%; left: 82%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(5) { top: 50%;  left: 100%;   transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(6) { top: 0%;   left: 82%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(7) { top: 0%;   left: 50%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(8) { top: 0%;   left: 18%;    transform: translate(-50%, -50%); }

        .reveal-core__halo {
          position: absolute; inset: 0;
          background: radial-gradient(50% 50% at 50% 50%, rgba(255,91,31,0.18), transparent 70%);
          filter: blur(30px);
          z-index: 0;
          animation: reveal-halo 8s ease-in-out infinite;
        }
        @keyframes reveal-halo {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-core__orbit, .reveal-core__chip, .reveal-core__center img, .reveal-core__halo { animation: none; }
          .reveal-core { opacity: 1; transform: none; }
          .reveal-section__title .reveal-mask > span { transform: none; }
        }

        @media (max-width: 600px) {
          .reveal-core__chip { font-size: 8px; padding: 4px 8px; }
        }
      `}</style>
    </section>
  );
}
