/**
 * SectionHeader — editorial headline with mask-reveal + support paragraph.
 * Headlines support multi-line via \n. The first line gets bold display,
 * subsequent lines can use serif italic accents via the `accent` style.
 */
import { ReactNode } from "react";
import { useReveal } from "../utils";

interface Props {
  eyebrow?: string;
  headline: string;
  support?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export function SectionHeader({ eyebrow, headline, support, align = "left", children }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const lines = headline.split("\n");
  return (
    <div
      ref={ref}
      className={`section__head ${visible ? "is-visible" : ""}`}
      style={align === "center" ? { margin: "0 auto", textAlign: "center" } : undefined}
    >
      {eyebrow && <div className={`eyebrow ${visible ? "is-visible" : ""}`}>{eyebrow}</div>}

      <h2 className="h-display h-2" style={{ margin: "0 0 22px" }}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={`reveal-mask ${visible ? "is-visible" : ""} ${i % 2 === 1 ? "is-accent" : ""}`}
            style={{ display: "block", "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <span>{line}</span>
          </span>
        ))}
      </h2>

      {support && (
        <p
          className={`lead reveal-soft ${visible ? "is-visible" : ""}`}
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          {support}
        </p>
      )}

      {children}

      <style>{`
        .section__head h2 .reveal-mask.is-accent > span {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 300;
          color: var(--accent-1);
          text-transform: none;
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  );
}
