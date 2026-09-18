/**
 * Capabilities — editorial band of 4 capability cards.
 * Type-led, high-density, with monograph-style numbering and orange accents.
 */
import { CAPABILITIES } from "../data/content";
import { useReveal } from "../utils";

function Icon({ name }: { name: string }) {
  const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true } as const;
  switch (name) {
    case "grid":    return (<svg {...c}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>);
    case "cloud":   return (<svg {...c}><path d="M7 18a5 5 0 1 1 1.7-9.7A6 6 0 0 1 20 11a4 4 0 0 1-1 7H7z" /></svg>);
    case "shield":  return (<svg {...c}><path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" /><path d="M9 12l2 2 4-4" /></svg>);
    case "pulse":   return (<svg {...c}><path d="M3 12h4l2-7 4 14 2-7h6" /></svg>);
    default: return null;
  }
}

export function Capabilities() {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.25 });
  return (
    <section
      ref={ref}
      id="capabilities"
      className={`capabilities ${visible ? "is-visible" : ""}`}
    >
      <div className="shell">
        <div className="capabilities__head">
          <div className={`capabilities__chapter ${visible ? "is-in" : ""}`}>
            <span className="num-tag">CH. 03</span>
            <span className="rule-strong" style={{ width: 80, margin: "0 16px" }} />
            <span className="col-label">THE PRODUCT</span>
          </div>
          <h2 className={`capabilities__title h-display ${visible ? "is-in" : ""}`}>
            <span className="reveal-mask"><span>A modern network</span></span>
            <span className="reveal-mask"><span>management experience.</span></span>
          </h2>
        </div>

        <div className="capabilities__grid">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.title}
              className={`capabilities__card ${visible ? "is-in" : ""}`}
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              data-cursor="hover"
            >
              <div className="capabilities__num">0{i + 1}</div>
              <div className="capabilities__icon"><Icon name={cap.icon} /></div>
              <div className="capabilities__title">{cap.title}</div>
              <div className="capabilities__desc">{cap.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .capabilities {
          position: relative;
          padding: 100px 0 120px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .capabilities__head {
          margin-bottom: 60px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .capabilities__chapter {
          display: flex; align-items: center;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
        }
        .capabilities__chapter.is-in { opacity: 1; transform: none; }

        .capabilities__title {
          margin: 0;
          font-size: clamp(2rem, 6vw, 5rem);
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: var(--text-1);
          display: flex; flex-direction: column;
        }
        .capabilities__title .reveal-mask { display: block; }
        .capabilities__title .reveal-mask > span {
          display: block;
          transform: translateY(110%);
          transition: transform 1.1s var(--ease-out);
        }
        .capabilities__title.is-in .reveal-mask:nth-child(1) > span { transform: translateY(0); }
        .capabilities__title.is-in .reveal-mask:nth-child(2) > span { transform: translateY(0); transition-delay: 0.15s; }

        .capabilities__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
        }
        .capabilities__card {
          position: relative;
          padding: 36px 28px;
          border-right: 1px solid var(--line);
          display: flex; flex-direction: column;
          gap: 16px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out), background 0.4s;
        }
        .capabilities__card:last-child { border-right: 0; }
        .capabilities__card.is-in { opacity: 1; transform: none; }
        .capabilities__card:hover { background: rgba(255, 91, 31, 0.04); }

        .capabilities__num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-1);
          letter-spacing: 0.18em;
        }
        .capabilities__icon {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line-strong);
          color: var(--accent-1);
        }
        .capabilities__title-text {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.24em;
          color: var(--text-1);
        }
        .capabilities__desc {
          font-size: 13px;
          color: var(--text-2);
          line-height: 1.55;
        }
        .capabilities__card .capabilities__title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.24em;
          color: var(--text-1);
          margin: 0;
        }

        @media (max-width: 980px) {
          .capabilities__grid { grid-template-columns: repeat(2, 1fr); }
          .capabilities__card:nth-child(2) { border-right: 0; }
          .capabilities__card:nth-child(1), .capabilities__card:nth-child(2) { border-bottom: 1px solid var(--line); }
        }
        @media (max-width: 600px) {
          .capabilities__grid { grid-template-columns: 1fr; }
          .capabilities__card { border-right: 0 !important; border-bottom: 1px solid var(--line); }
          .capabilities__card:last-child { border-bottom: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .capabilities__chapter, .capabilities__title, .capabilities__card { opacity: 1; transform: none; }
          .capabilities__title .reveal-mask > span { transform: none; }
        }
      `}</style>
    </section>
  );
}
