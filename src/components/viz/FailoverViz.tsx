/**
 * FailoverViz — editorial route-switching visualization.
 * Primary → Switching → Alternate → Connected cycle.
 */
import { useEffect, useState } from "react";

type Phase = "primary" | "switching" | "alternate" | "connected";

const PHASES: { id: Phase; label: string; color: string }[] = [
  { id: "primary",   label: "PRIMARY ROUTE",   color: "#f5f1e8" },
  { id: "switching", label: "SWITCHING…",      color: "#ff5b1f" },
  { id: "alternate", label: "ALTERNATE ROUTE", color: "#ff8a4c" },
  { id: "connected", label: "CONNECTED",       color: "#6ee7a0" },
];

export function FailoverViz() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % PHASES.length), 2200);
    return () => clearInterval(id);
  }, []);

  const phase = PHASES[idx];
  const showPrimary = phase.id === "primary" || phase.id === "switching";
  const showAlternate = phase.id === "alternate" || phase.id === "connected" || phase.id === "switching";

  return (
    <div className="viz" data-viz="failover">
      <div className="viz__head">
        <span className="viz__head-num">FIG. 11</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">FAILOVER / RESILIENCE</span>
      </div>
      <div className="viz__body">
        <div className="failover__status">
          <span className="failover__num">0{idx + 1} / 04</span>
          <span className="failover__dot" style={{ background: phase.color, boxShadow: `0 0 12px ${phase.color}` }} />
          <span className="failover__label" style={{ color: phase.color }}>{phase.label}</span>
        </div>

        <svg viewBox="0 0 100 50" className="viz__svg" aria-hidden="true">
          {/* nodes */}
          <circle cx="6" cy="25" r="3" fill="#f5f1e8" />
          <text x="6" y="36" textAnchor="middle" fontSize="3" fill="#9a958a" fontFamily="monospace">CLIENT</text>

          <circle cx="94" cy="25" r="3" fill="#ff5b1f" />
          <text x="94" y="36" textAnchor="middle" fontSize="3" fill="#9a958a" fontFamily="monospace">SERVER</text>

          {/* primary route (top) */}
          <path
            d="M 9 25 Q 28 6 47 7 Q 70 8 91 25"
            fill="none"
            stroke={showPrimary ? phase.color : "rgba(245,241,232,0.12)"}
            strokeWidth={showPrimary ? 1.2 : 0.5}
            strokeDasharray={phase.id === "switching" ? "2 2" : undefined}
            className={phase.id === "switching" ? "failover-route failover-route--blink" : "failover-route"}
            style={showPrimary ? { filter: `drop-shadow(0 0 4px ${phase.color})` } : undefined}
          />
          <text x="50" y="3" textAnchor="middle" fontSize="2.6" fill="#9a958a" fontFamily="monospace">PRIMARY</text>

          {/* alternate route (bottom) */}
          <path
            d="M 9 25 Q 28 44 47 43 Q 70 42 91 25"
            fill="none"
            stroke={showAlternate ? phase.color : "rgba(245,241,232,0.12)"}
            strokeWidth={showAlternate ? 1.2 : 0.5}
            strokeDasharray={phase.id === "switching" ? "2 2" : undefined}
            style={showAlternate && phase.id !== "switching" ? { filter: `drop-shadow(0 0 4px ${phase.color})` } : undefined}
          />
          <text x="50" y="49" textAnchor="middle" fontSize="2.6" fill="#9a958a" fontFamily="monospace">ALTERNATE</text>

          {/* traveling pulse on active route */}
          {phase.id === "primary" && (
            <circle r="0.8" fill={phase.color}>
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 9 25 Q 28 6 47 7 Q 70 8 91 25" />
            </circle>
          )}
          {(phase.id === "alternate" || phase.id === "connected") && (
            <circle r="0.8" fill={phase.color}>
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 9 25 Q 28 44 47 43 Q 70 42 91 25" />
            </circle>
          )}
        </svg>
      </div>
      <div className="viz__caption">Educational visualization — no real failover is performed here</div>

      <style>{`
        .failover__status {
          display: grid;
          grid-template-columns: 60px 12px 1fr;
          align-items: center; gap: 12px;
          padding: 0 0 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
        }
        .failover__num {
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 0.2em;
        }
        .failover__dot {
          width: 10px; height: 10px; border-radius: 50%;
          transition: background 0.4s, box-shadow 0.4s;
        }
        .failover__label {
          font-weight: 700;
          letter-spacing: 0.22em;
          transition: color 0.4s;
        }
        .failover-route { transition: stroke 0.5s, stroke-width 0.5s, filter 0.5s; }
        .failover-route--blink { animation: failover-blink 0.5s linear infinite; }
        @keyframes failover-blink { 50% { opacity: 0.4; } }
        @media (prefers-reduced-motion: reduce) {
          .failover-route--blink { animation: none; }
        }
      `}</style>
    </div>
  );
}
