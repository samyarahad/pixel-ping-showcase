/**
 * FloatingScreenshot — presents a real product screenshot as a premium
 * floating glass object. Subtle perspective tilt, soft reflection,
 * reveal-on-scroll.
 *
 * NOTE: This component never claims the data shown is "live". The screenshot
 * is purely a product presentation visual.
 */
import { useEffect, useRef } from "react";
import { useReveal } from "../utils";

interface Props {
  /** screenshot basename inside /screenshots (without extension) */
  name: string;
  alt: string;
  caption?: string;
  /** optional accent color override */
  accent?: string;
}

export function FloatingScreenshot({ name, alt, caption, accent }: Props) {
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>({
    threshold: 0.25,
    rootMargin: "0px 0px -15% 0px",
  });
  const frameRef = useRef<HTMLDivElement | null>(null);

  // Subtle pointer tilt (desktop only)
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = frameRef.current;
    if (!el) return;
    const frame: HTMLDivElement = el;

    function onMove(e: MouseEvent) {
      const r = frame.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      const rx = Math.max(-6, Math.min(6, -dy * 6));
      const ry = Math.max(-8, Math.min(8, dx * 8));
      frame.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function onLeave() {
      frame.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    }

    const parent = frame.parentElement!;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={revealRef}
      className={`floating-shot ${visible ? "is-visible" : ""}`}
      data-cursor="hover"
      style={{ "--accent": accent ?? "var(--accent-1)" } as React.CSSProperties}
    >
      <div className="floating-shot__glow" aria-hidden="true" />
      <div className="floating-shot__frame" ref={frameRef}>
        <div className="floating-shot__chrome">
          <span className="floating-shot__dot" />
          <span className="floating-shot__dot" />
          <span className="floating-shot__dot" />
          <span className="floating-shot__label">PIXEL &amp; PING</span>
        </div>
        <picture>
          <source srcSet={`./screenshots/${name}.webp`} type="image/webp" />
          <img
            src={`./screenshots/${name}.jpg`}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={1920}
            height={900}
          />
        </picture>
        <div className="floating-shot__sheen" aria-hidden="true" />
      </div>
      {caption && <div className="floating-shot__caption">{caption}</div>}

      <style>{`
        .floating-shot {
          position: relative;
          margin-top: 48px;
          opacity: 0;
          transform: translateY(40px) scale(0.985);
          transition: opacity 1.2s var(--ease-out), transform 1.2s var(--ease-out);
          will-change: opacity, transform;
        }
        .floating-shot.is-visible { opacity: 1; transform: translateY(0) scale(1); }

        .floating-shot__glow {
          position: absolute; inset: -12% -6% -18% -6%;
          background: radial-gradient(60% 60% at 50% 50%, var(--accent-glow), transparent 70%);
          filter: blur(40px);
          opacity: 0.6;
          z-index: -1;
          pointer-events: none;
        }

        .floating-shot__frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(180deg, #0c1226 0%, #060812 100%);
          border: 1px solid var(--line-strong);
          box-shadow:
            0 60px 100px -40px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.02) inset,
            0 0 80px -20px var(--accent-glow);
          transform: perspective(1400px) rotateX(0deg) rotateY(0deg);
          transition: transform 0.35s var(--ease-out);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .floating-shot__chrome {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line);
          background: rgba(8, 12, 26, 0.6);
          backdrop-filter: blur(6px);
        }
        .floating-shot__dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(170, 188, 255, 0.18);
        }
        .floating-shot__dot:nth-child(1) { background: rgba(255, 110, 130, 0.4); }
        .floating-shot__dot:nth-child(2) { background: rgba(255, 200, 110, 0.4); }
        .floating-shot__dot:nth-child(3) { background: rgba(110, 220, 160, 0.4); }
        .floating-shot__label {
          margin-left: auto;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.28em;
          color: var(--text-3);
        }

        .floating-shot__frame img {
          width: 100%; height: auto; display: block;
          border-radius: 0 0 16px 16px;
        }

        .floating-shot__sheen {
          position: absolute; inset: 0;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 255, 255, 0.08) 50%,
            transparent 70%
          );
          background-size: 250% 250%;
          background-position: 0% 0%;
          pointer-events: none;
          mix-blend-mode: screen;
          transition: background-position 1.2s var(--ease);
        }
        .floating-shot.is-visible .floating-shot__sheen {
          background-position: 100% 100%;
        }

        .floating-shot__caption {
          margin-top: 18px;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--text-3);
        }
      `}</style>
    </div>
  );
}
