/**
 * SectionHeader — eyebrow + headline (with mask-reveal) + support paragraph.
 * Animates in via IntersectionObserver.
 */
import { ReactNode } from "react";
import { useReveal } from "../utils";

interface Props {
  eyebrow: string;
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
      <div className={`eyebrow ${visible ? "is-visible" : ""}`}>{eyebrow}</div>

      <h2 className="h-display h-2" style={{ margin: "18px 0 22px" }}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={`reveal-mask ${visible ? "is-visible" : ""}`}
            style={{ display: "block", "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <span>{line}</span>
          </span>
        ))}
      </h2>

      {support && (
        <p
          className={`lead reveal ${visible ? "is-visible" : ""}`}
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          {support}
        </p>
      )}

      {children}
    </div>
  );
}
