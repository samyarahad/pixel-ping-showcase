/**
 * Capabilities — a band of 4 glass stat-cards between the network scene
 * and the first product section. Purely qualitative — no fabricated numbers.
 */
import { CAPABILITIES } from "../data/content";
import { useReveal } from "../utils";

function Icon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true } as const;
  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 18a5 5 0 1 1 1.7-9.7A6 6 0 0 1 20 11a4 4 0 0 1-1 7H7z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-7 4 14 2-7h6" />
        </svg>
      );
    default:
      return null;
  }
}

export function Capabilities() {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.25 });
  return (
    <section
      ref={ref}
      id="capabilities"
      className={`section capabilities ${visible ? "is-visible" : ""}`}
      style={{ minHeight: "auto", padding: "80px 0 100px" }}
    >
      <div className="shell">
        <div className="capabilities__head" style={{ textAlign: "center", marginBottom: 50 }}>
          <div className={`eyebrow ${visible ? "is-visible" : ""}`} style={{ justifyContent: "center", display: "inline-flex", marginBottom: 16 }}>
            The Product
          </div>
          <h2 className={`h-display h-3 ${visible ? "is-visible" : ""}`} style={{ margin: 0, color: "var(--text-1)" }}>
            A modern network management experience.
          </h2>
        </div>

        <div className="capabilities__grid">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.title}
              className={`capabilities__card glass reveal ${visible ? "is-visible" : ""}`}
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="capabilities__icon"><Icon name={cap.icon} /></div>
              <div className="capabilities__title">{cap.title}</div>
              <div className="capabilities__desc">{cap.desc}</div>
              <div className="capabilities__shine" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .capabilities__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .capabilities__card {
          position: relative;
          padding: 28px 24px;
          display: flex; flex-direction: column;
          gap: 12px;
          overflow: hidden;
          transition: transform 0.45s var(--ease), border-color 0.45s, box-shadow 0.45s;
        }
        .capabilities__card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-1);
          box-shadow: 0 30px 60px -25px rgba(110,139,255,0.4), 0 0 0 1px rgba(255,255,255,0.02) inset;
        }
        .capabilities__icon {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          background: rgba(110,139,255,0.12);
          color: var(--accent-1);
          box-shadow: 0 0 24px -8px var(--accent-glow);
        }
        .capabilities__title {
          font-family: var(--font-display);
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--text-1);
        }
        .capabilities__desc {
          font-size: 13px; color: var(--text-2);
          line-height: 1.55;
        }
        .capabilities__shine {
          position: absolute; top: -50%; left: -20%;
          width: 40%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          transform: rotate(20deg);
          pointer-events: none;
          transition: left 1.2s var(--ease);
        }
        .capabilities__card:hover .capabilities__shine { left: 110%; }

        @media (max-width: 980px) {
          .capabilities__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .capabilities__grid { grid-template-columns: 1fr; }
        }

        .capabilities h2, .capabilities .eyebrow {
          opacity: 0; transform: translateY(20px);
          transition: opacity 1.1s var(--ease-out), transform 1.1s var(--ease-out);
        }
        .capabilities.is-visible h2 { opacity: 1; transform: none; transition-delay: 0.15s; }
        .capabilities.is-visible .eyebrow { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .capabilities h2, .capabilities .eyebrow, .capabilities__card { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
