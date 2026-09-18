/**
 * ProductSection — editorial "spread" layout.
 * Type-led, oversized headline, alternating left/right asymmetric layout,
 * with chapter numbering and feature callouts as a numbered list.
 *
 * Combines: hardcore editorial density + monograph type treatment +
 *           yoga-calm soft fade-up reveal.
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
  features?: string[];
  index?: number;
  children?: ReactNode;
}

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

export function ProductSection({ data, accent, layout = "right", decor, features, index = 0, children }: Props) {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.1, rootMargin: "0px 0px -10% 0px" });

  const isCenter = layout === "center";
  const isFull = layout === "full";
  const reverse = layout === "left";
  const chapterNum = String(index + 4).padStart(2, "0"); // chapters start at 04

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

      <div className={`shell product-section__inner ${reverse ? "is-reverse" : ""}`}>
        {/* Text column */}
        <div className="product-section__text">
          <div className={`product-section__chapter ${visible ? "is-in" : ""}`}>
            <span className="num-tag">CH. {chapterNum}</span>
            <span className="rule-strong" style={{ width: 60, margin: "0 14px" }} />
            <span className="col-label">{data.eyebrow}</span>
          </div>

          <SectionHeader
            eyebrow=""
            headline={data.headline}
            support={data.support}
            align={isCenter ? "center" : "left"}
          />

          {features && features.length > 0 && (
            <ul className={`features-list ${visible ? "is-in" : ""}`}>
              {features.map((f, i) => (
                <li key={f} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="features-list__num">0{i + 1}</span>
                  <span className="features-list__text">{f}</span>
                  <span className="features-list__arrow" aria-hidden="true">→</span>
                </li>
              ))}
            </ul>
          )}

          {children}
        </div>

        {/* Media column */}
        <div className="product-section__media">
          {data.shot ? (
            <FloatingScreenshot
              name={data.shot}
              alt={`${data.eyebrow} — ${data.caption ?? data.headline.replace(/\n/g, " ")}`}
              caption={data.caption}
              accent={accent}
              index={index}
            />
          ) : (
            <div className={`viz-wrap ${visible ? "is-in" : ""}`}>
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

        .product-section__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .product-section__inner.is-reverse {
          grid-template-columns: 1fr 1fr;
          direction: rtl;
        }
        .product-section__inner.is-reverse > * { direction: ltr; }

        .product-section__chapter {
          display: flex; align-items: center;
          margin-bottom: 32px;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
        }
        .product-section__chapter.is-in { opacity: 1; transform: none; }

        .features-list {
          list-style: none; padding: 0; margin: 36px 0 0;
          display: grid; gap: 0;
          border-top: 1px solid var(--line);
        }
        .features-list li {
          display: grid;
          grid-template-columns: 32px 1fr 16px;
          align-items: center; gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
          font-size: 13px;
          color: var(--text-2);
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out), color 0.3s, padding 0.3s;
        }
        .features-list.is-in li {
          opacity: 1;
          transform: translateX(0);
        }
        .features-list li:hover {
          color: var(--text-1);
          padding-left: 8px;
        }
        .features-list li:hover .features-list__arrow {
          color: var(--accent-1);
          transform: translateX(4px);
        }
        @keyframes feature-in {
          to { opacity: 1; transform: translateX(0); }
        }
        .features-list__num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-1);
          letter-spacing: 0.1em;
        }
        .features-list__text { line-height: 1.5; }
        .features-list__arrow {
          font-family: var(--font-mono);
          color: var(--text-3);
          transition: color 0.3s, transform 0.3s;
        }

        .viz-wrap {
          opacity: 0;
          transform: translateY(30px) translateX(20px);
          transition: opacity 1.1s var(--ease-out), transform 1.1s var(--ease-out);
          transition-delay: 0.2s;
        }
        .viz-wrap.is-in { opacity: 1; transform: none; }

        @media (max-width: 980px) {
          .product-section__inner,
          .product-section__inner.is-reverse {
            grid-template-columns: 1fr;
            direction: ltr;
            gap: 40px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .product-section__chapter, .viz-wrap { opacity: 1; transform: none; }
          .features-list li { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
