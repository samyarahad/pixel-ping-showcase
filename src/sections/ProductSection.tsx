/**
 * ProductSection — generic premium section layout.
 * Used for every product capability scene in the showcase.
 *
 * Layout: header on the left (or center), optional floating screenshot on the
 * right with abstract visualization behind.
 */
import { ReactNode } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { FloatingScreenshot } from "../components/FloatingScreenshot";
import type { SectionCopy } from "../data/content";
import { useReveal } from "../utils";

interface Props {
  data: SectionCopy;
  /** optional accent color (CSS var or hex) */
  accent?: string;
  /** layout variant */
  layout?: "right" | "left" | "center" | "full";
  /** optional inline visualization node rendered behind/around the screenshot */
  decor?: ReactNode;
  /** optional extra content below header (e.g. feature list) */
  children?: ReactNode;
}

export function ProductSection({ data, accent, layout = "right", decor, children }: Props) {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.1, rootMargin: "0px 0px -10% 0px" });

  const isCenter = layout === "center";
  const isFull = layout === "full";
  const reverse = layout === "left";

  return (
    <section
      ref={ref}
      id={data.id}
      className={`section product-section ${visible ? "is-visible" : ""}`}
      data-section={data.id}
      style={{
        "--accent": accent ?? "var(--accent-1)",
        flexDirection: isCenter || isFull ? "column" : "row",
        alignItems: isCenter || isFull ? "center" : "center",
      } as React.CSSProperties}
    >
      {decor && <div className="product-section__decor" aria-hidden="true">{decor}</div>}

      <div
        className="shell"
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          flexDirection: reverse ? "row-reverse" : "row",
          flexWrap: "wrap",
          justifyContent: isCenter ? "center" : "space-between",
        }}
      >
        <div style={{ flex: "1 1 420px", maxWidth: 600 }}>
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline}
            support={data.support}
            align={isCenter ? "center" : "left"}
          />
          {children}
        </div>

        {data.shot && (
          <div style={{ flex: "1 1 480px", maxWidth: 720, minWidth: 280 }}>
            <FloatingScreenshot
              name={data.shot}
              alt={`${data.eyebrow} — ${data.caption ?? data.headline.replace(/\n/g, " ")}`}
              caption={data.caption}
              accent={accent}
            />
          </div>
        )}

        {!data.shot && (
          <div style={{ flex: "1 1 380px", maxWidth: 520, minWidth: 280 }}>
            <AbstractPanel id={data.id} accent={accent} />
          </div>
        )}
      </div>

      <style>{`
        .product-section__decor {
          position: absolute; inset: 0;
          pointer-events: none; z-index: -1;
        }
        @media (max-width: 880px) {
          .product-section .shell { flex-direction: column !important; gap: 32px; }
          .product-section .shell > div { max-width: 100% !important; flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  );
}

/** Minimal abstract visualization panel for sections without a real screenshot. */
function AbstractPanel({ id, accent }: { id: string; accent?: string }) {
  return (
    <div
      className="abstract-panel glass"
      data-cursor="hover"
      style={{
        position: "relative",
        height: 360,
        borderRadius: 18,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "--accent": accent ?? "var(--accent-1)",
      } as React.CSSProperties}
    >
      <div className="abstract-panel__pulse" />
      <div className="abstract-panel__rings">
        <span /> <span /> <span />
      </div>
      <div className="abstract-panel__label">{id.toUpperCase()}</div>

      <style>{`
        .abstract-panel__pulse {
          position: absolute; width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          filter: blur(20px);
          animation: abstract-pulse 4s ease-in-out infinite;
        }
        @keyframes abstract-pulse {
          0%,100% { transform: scale(0.85); opacity: 0.55; }
          50%     { transform: scale(1.15); opacity: 0.95; }
        }
        .abstract-panel__rings {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .abstract-panel__rings span {
          position: absolute; border: 1px solid var(--line-strong);
          border-radius: 50%;
          animation: abstract-rotate 18s linear infinite;
        }
        .abstract-panel__rings span:nth-child(1) { width: 240px; height: 240px; }
        .abstract-panel__rings span:nth-child(2) { width: 320px; height: 320px;
          animation-duration: 26s; animation-direction: reverse; border-color: var(--line); }
        .abstract-panel__rings span:nth-child(3) { width: 400px; height: 400px;
          animation-duration: 36s; border-color: var(--line); opacity: 0.6; }
        @keyframes abstract-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .abstract-panel__label {
          position: relative; z-index: 1;
          font-family: var(--font-display);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.32em;
          color: var(--text-2);
          text-shadow: 0 0 20px var(--accent-glow);
        }
        @media (prefers-reduced-motion: reduce) {
          .abstract-panel__pulse, .abstract-panel__rings span { animation: none; }
        }
      `}</style>
    </div>
  );
}
