/**
 * FloatingScreenshot — editorial "spread" treatment with responsive AVIF/WebP/JPG.
 *
 * Image optimization:
 *  - <picture> with AVIF → WebP → JPG fallback chain
 *  - srcset for 3 widths (800/1600/2400) so mobile gets smaller images
 *  - loading="lazy" + decoding="async"
 *  - width/height set to prevent layout shift
 */
import { useEffect, useRef } from "react";
import { useReveal } from "../utils";

interface Props {
  name: string;
  alt: string;
  caption?: string;
  accent?: string;
  index?: number;
}

export function FloatingScreenshot({ name, alt, caption, accent, index = 0 }: Props) {
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>({
    threshold: 0.25,
    rootMargin: "0px 0px -15% 0px",
  });
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = frameRef.current;
    if (!el) return;
    const frame: HTMLDivElement = el;

    let raf = 0;
    function onMove(e: MouseEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = frame.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        const rx = Math.max(-3, Math.min(3, -dy * 3));
        const ry = Math.max(-5, Math.min(5, dx * 5));
        frame.style.transform = `perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        raf = 0;
      });
    }
    function onLeave() {
      frame.style.transform = "perspective(1600px) rotateX(0deg) rotateY(0deg)";
    }

    const parent = frame.parentElement!;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={revealRef}
      className={`floating-shot ${visible ? "is-visible" : ""}`}
      data-cursor="hover"
      style={{ "--accent": accent ?? "var(--accent-1)" } as React.CSSProperties}
    >
      <div className="floating-shot__head">
        <span className="floating-shot__num">FIG. 0{index + 1}</span>
        <span className="floating-shot__rule" />
        <span className="floating-shot__label">PIXEL & PING</span>
      </div>

      <div className="floating-shot__frame" ref={frameRef}>
        <picture>
          {/* AVIF — best compression (modern browsers) */}
          <source
            type="image/avif"
            srcSet={`./screenshots/${name}-800.avif 800w, ./screenshots/${name}-1600.avif 1600w, ./screenshots/${name}-2400.avif 2400w`}
            sizes="(max-width: 880px) 100vw, 50vw"
          />
          {/* WebP — fallback */}
          <source
            type="image/webp"
            srcSet={`./screenshots/${name}-800.webp 800w, ./screenshots/${name}-1600.webp 1600w, ./screenshots/${name}-2400.webp 2400w`}
            sizes="(max-width: 880px) 100vw, 50vw"
          />
          {/* JPG — last resort */}
          <img
            src={`./screenshots/${name}-1600.jpg`}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={1920}
            height={900}
          />
        </picture>
        <div className="floating-shot__sheen" aria-hidden="true" />
      </div>

      {caption && (
        <div className="floating-shot__caption">
          <span className="floating-shot__caption-num">▲</span>
          <span>{caption}</span>
        </div>
      )}

      <style>{`
        .floating-shot {
          position: relative;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s var(--ease-out), transform 1.2s var(--ease-out);
          will-change: opacity, transform;
        }
        .floating-shot.is-visible { opacity: 1; transform: translateY(0); }

        .floating-shot__head {
          display: flex; align-items: center; gap: 14px;
          padding: 0 0 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--line-strong);
        }
        .floating-shot__num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-1);
          letter-spacing: 0.2em;
        }
        .floating-shot__rule { flex: 1; height: 1px; background: var(--line); }
        .floating-shot__label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 0.24em;
        }

        .floating-shot__frame {
          position: relative;
          overflow: hidden;
          background: #000;
          border: 1px solid var(--line-strong);
          box-shadow:
            0 60px 100px -40px rgba(0,0,0,0.8),
            0 0 0 1px rgba(255,255,255,0.02) inset;
          transform: perspective(1600px) rotateX(0deg) rotateY(0deg);
          transition: transform 0.4s var(--ease-out);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .floating-shot__frame img {
          width: 100%; height: auto; display: block;
        }

        .floating-shot__sheen {
          position: absolute; inset: 0;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 255, 255, 0.06) 50%,
            transparent 70%
          );
          background-size: 250% 250%;
          background-position: 0% 0%;
          pointer-events: none;
          mix-blend-mode: screen;
          transition: background-position 1.4s var(--ease);
        }
        .floating-shot.is-visible .floating-shot__sheen {
          background-position: 100% 100%;
        }

        .floating-shot__caption {
          margin-top: 16px;
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-2);
          letter-spacing: 0.04em;
        }
        .floating-shot__caption-num { color: var(--accent-1); }
      `}</style>
    </div>
  );
}
