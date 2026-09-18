/**
 * FullReveal — visual climax.
 * All previously shown product surfaces orbit a central Pixel & Ping core.
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

  // Subtle pointer parallax on the whole system
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
      core.style.transform = `rotateX(${-dy * 4}deg) rotateY(${dx * 6}deg)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      id="reveal"
      className={`section reveal-section ${visible ? "is-visible" : ""}`}
      style={{ minHeight: "120vh", textAlign: "center", alignItems: "center" }}
    >
      <div className="shell" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className={`eyebrow ${visible ? "is-visible" : ""}`} style={{ marginBottom: 24 }}>
          The Full System
        </div>

        <h2 className={`h-display h-1 ${visible ? "is-visible" : ""}`} style={{ margin: "0 0 18px", maxWidth: 900 }}>
          Everything is connected.
          <br />
          <span style={{ color: "var(--accent-3)" }}>Everything is visible.</span>
        </h2>

        <p className={`lead reveal ${visible ? "is-visible" : ""}`} style={{ margin: "0 auto 80px", textAlign: "center" }}>
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
              <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
              <img src="./logo/pixel-ping-logo.png" alt="" width={120} height={120} />
            </picture>
            <div className="reveal-core__center-text">PIXEL &amp; PING</div>
          </div>

          <div className="reveal-core__orbit reveal-core__orbit--1">
            {ORBIT_LABELS.slice(0, 7).map((label) => (
              <span key={label} className="reveal-core__chip">
                {label}
              </span>
            ))}
          </div>
          <div className="reveal-core__orbit reveal-core__orbit--2">
            {ORBIT_LABELS.slice(7).map((label) => (
              <span key={label} className="reveal-core__chip reveal-core__chip--alt">
                {label}
              </span>
            ))}
          </div>
          <div className="reveal-core__halo" />
        </div>
      </div>

      <style>{`
        .reveal-core {
          position: relative;
          width: min(720px, 92vw);
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          transform-style: preserve-3d;
          transition: transform 0.4s var(--ease-out);
        }
        .reveal-core__center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 18px;
          filter: drop-shadow(0 0 60px rgba(110,139,255,0.6));
          z-index: 3;
        }
        .reveal-core__center img { animation: reveal-core-pulse 6s ease-in-out infinite; }
        .reveal-core__center-text {
          font-family: var(--font-display);
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.5em;
          color: var(--accent-3);
        }
        @keyframes reveal-core-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(110,139,255,0.5)); }
          50%      { transform: scale(1.05); filter: drop-shadow(0 0 40px rgba(196,167,255,0.7)); }
        }

        .reveal-core__orbit {
          position: absolute; inset: 0;
          margin: auto;
          border: 1px dashed var(--line-strong);
          border-radius: 50%;
          animation: reveal-orbit linear infinite;
        }
        .reveal-core__orbit--1 {
          width: 70%; height: 70%;
          animation-duration: 40s;
        }
        .reveal-core__orbit--2 {
          width: 96%; height: 96%;
          border-color: var(--line);
          animation-duration: 60s;
          animation-direction: reverse;
        }
        @keyframes reveal-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .reveal-core__chip {
          position: absolute;
          top: -10px; left: 50%;
          transform: translateX(-50%);
          padding: 7px 14px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.24em;
          color: var(--text-1);
          background: rgba(12, 18, 36, 0.85);
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          box-shadow: 0 8px 20px -10px rgba(110,139,255,0.6);
          animation: reveal-orbit-counter linear infinite;
        }
        .reveal-core__chip--alt {
          color: var(--accent-3);
          border-color: rgba(196,167,255,0.4);
        }
        /* counter-rotate so the chip text stays upright */
        .reveal-core__orbit--1 .reveal-core__chip { animation-duration: 40s; animation-direction: reverse; }
        .reveal-core__orbit--2 .reveal-core__chip { animation-duration: 60s; }
        @keyframes reveal-orbit-counter {
          from { transform: translateX(-50%) rotate(0deg); }
          to   { transform: translateX(-50%) rotate(-360deg); }
        }

        /* Distribute chips around the orbit */
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(1) { top: 50%;  left: -10px;  transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(2) { top: 100%; left: 25%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(3) { top: 100%; left: 75%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(4) { top: 50%;  left: 100%;   transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(5) { top: 0%;   left: 75%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(6) { top: 0%;   left: 25%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--1 .reveal-core__chip:nth-child(7) { top: -10px; left: 50%;   transform: translateX(-50%); }

        .reveal-core__orbit--2 .reveal-core__chip:nth-child(1)  { top: 50%;  left: -10px;  transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(2)  { top: 100%; left: 18%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(3)  { top: 100%; left: 50%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(4)  { top: 100%; left: 82%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(5)  { top: 50%;  left: 100%;   transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(6)  { top: 0%;   left: 82%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(7)  { top: 0%;   left: 50%;    transform: translate(-50%, -50%); }
        .reveal-core__orbit--2 .reveal-core__chip:nth-child(8)  { top: 0%;   left: 18%;    transform: translate(-50%, -50%); }

        .reveal-core__halo {
          position: absolute; inset: 0;
          background: radial-gradient(50% 50% at 50% 50%, rgba(110,139,255,0.18), transparent 70%);
          filter: blur(30px);
          z-index: 0;
          animation: reveal-halo 8s ease-in-out infinite;
        }
        @keyframes reveal-halo {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }

        /* reveal animation on scroll */
        .reveal-core { opacity: 0; transform: scale(0.85); transition: opacity 1.6s var(--ease-out), transform 1.6s var(--ease-out); }
        .reveal-core.is-in { opacity: 1; transform: scale(1); }

        @media (prefers-reduced-motion: reduce) {
          .reveal-core__orbit, .reveal-core__chip, .reveal-core__center img, .reveal-core__halo { animation: none; }
          .reveal-core { opacity: 1; transform: none; }
        }

        @media (max-width: 600px) {
          .reveal-core__chip { font-size: 8px; padding: 5px 10px; }
        }
      `}</style>
    </section>
  );
}
