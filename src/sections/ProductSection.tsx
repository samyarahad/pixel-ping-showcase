/**
 * ProductSection — generic premium section layout.
 * Used for every product capability scene in the showcase.
 *
 * For sections without a real screenshot, a unique per-section visualization
 * is rendered instead of a generic abstract panel.
 */
import { ReactNode } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { FloatingScreenshot } from "../components/FloatingScreenshot";
import {
  EndpointsViz, PortsViz, CloudflareViz, ConfigViz,
  TrafficViz, AnalyticsViz, FailoverViz, LogsViz, NotificationsViz,
} from "../components/viz";
import type { SectionCopy } from "../data/content";
import { useReveal } from "../utils";

interface Props {
  data: SectionCopy;
  accent?: string;
  layout?: "right" | "left" | "center" | "full";
  decor?: ReactNode;
  /** optional feature callouts below the headline */
  features?: string[];
  children?: ReactNode;
}

/** Map section id -> visualization component (only for sections without a real screenshot). */
function VisualizationFor({ id }: { id: string }) {
  switch (id) {
    case "endpoints":      return <EndpointsViz />;
    case "ports":          return <PortsViz />;
    case "cloudflare":     return <CloudflareViz />;
    case "config":         return <ConfigViz />;
    case "traffic":        return <TrafficViz />;
    case "analytics":      return <AnalyticsViz />;
    case "failover":       return <FailoverViz />;
    case "logs":           return <LogsViz />;
    case "notifications":  return <NotificationsViz />;
    default:               return null;
  }
}

export function ProductSection({ data, accent, layout = "right", decor, features, children }: Props) {
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
        <div className="product-section__text" style={{ flex: "1 1 420px", maxWidth: 600 }}>
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline}
            support={data.support}
            align={isCenter ? "center" : "left"}
          />

          {features && features.length > 0 && (
            <ul
              className={`features-list reveal ${visible ? "is-visible" : ""}`}
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            >
              {features.map((f) => (
                <li key={f}>
                  <span className="features-list__check" aria-hidden="true">◆</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          {children}
        </div>

        <div className="product-section__media" style={{ flex: "1 1 480px", maxWidth: 720, minWidth: 280 }}>
          {data.shot ? (
            <FloatingScreenshot
              name={data.shot}
              alt={`${data.eyebrow} — ${data.caption ?? data.headline.replace(/\n/g, " ")}`}
              caption={data.caption}
              accent={accent}
            />
          ) : (
            <div className={`viz-wrap reveal ${visible ? "is-visible" : ""}`} style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
              <VisualizationFor id={data.id} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .product-section__decor {
          position: absolute; inset: 0;
          pointer-events: none; z-index: -1;
        }

        .features-list {
          list-style: none; padding: 0;
          margin: 28px 0 0;
          display: grid; gap: 10px;
        }
        .features-list li {
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; color: var(--text-2);
          padding: 10px 14px;
          background: rgba(12,18,36,0.4);
          border: 1px solid var(--line);
          border-radius: 10px;
          transition: border-color 0.35s, color 0.35s, transform 0.35s;
        }
        .features-list li:hover {
          border-color: var(--accent);
          color: var(--text-1);
          transform: translateX(4px);
        }
        .features-list__check {
          font-size: 8px;
          color: var(--accent);
          text-shadow: 0 0 8px var(--accent-glow);
        }

        .viz-wrap {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.1s var(--ease-out), transform 1.1s var(--ease-out);
        }
        .viz-wrap.is-visible { opacity: 1; transform: none; }

        @media (max-width: 880px) {
          .product-section .shell { flex-direction: column !important; gap: 32px; }
          .product-section__text, .product-section__media {
            max-width: 100% !important; flex: 1 1 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
