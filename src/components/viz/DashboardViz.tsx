/**
 * DashboardViz — editorial dashboard overview.
 * Grid of stat cards (no fabricated numbers — qualitative labels only)
 * + 2 mini panels (Traffic Analytics + User Activity) as animated SVGs.
 */
import { useInViewport } from "../../hooks/useInViewport";

const STATS = [
  { label: "TOTAL USERS",         v: "—" },
  { label: "ACTIVE USERS",        v: "—" },
  { label: "ONLINE USERS",        v: "—" },
  { label: "DAILY REQUESTS",      v: "—" },
  { label: "ACTIVE SERVERS",      v: "—" },
  { label: "CLOUDFLARE ACCOUNTS", v: "—" },
  { label: "TOTAL TRAFFIC",       v: "—" },
  { label: "IP HEALTH",           v: "—" },
];

export function DashboardViz() {
  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.05, rootMargin: "100px" });

  const linePts = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 36, 44];
  const max = Math.max(...linePts);
  const W = 100, H = 32;
  const step = W / (linePts.length - 1);
  const linePath = linePts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${H - (p / max) * (H - 4) - 2}`).join(" ");
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="viz" data-viz="dashboard" ref={ref}>
      <div className="viz__head">
        <span className="viz__head-num">FIG. 01</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">DASHBOARD / OVERVIEW</span>
      </div>
      <div className="viz__body">
        {/* Stat grid */}
        <div className="dash__stats">
          {STATS.map((s, i) => (
            <div
              className="dash__stat"
              key={s.label}
              style={{
                animationDelay: `${i * 60}ms`,
                animationPlayState: inView ? "running" : "paused",
              } as React.CSSProperties}
            >
              <div className="dash__stat-label">{s.label}</div>
              <div className="dash__stat-val">{s.v}</div>
              <div className="dash__stat-bar" />
            </div>
          ))}
        </div>

        {/* Two mini panels */}
        <div className="dash__panels">
          <div className="dash__panel">
            <div className="dash__panel-head">
              <span>TRAFFIC ANALYTICS</span>
              <span className="dash__panel-pill">LIVE</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="dash__svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5b1f" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff5b1f" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#dash-area)" className={inView ? "is-in" : ""} />
              <path
                d={linePath}
                fill="none"
                stroke="#ff5b1f"
                strokeWidth="0.7"
                className={`dash-line ${inView ? "is-in" : ""}`}
              />
            </svg>
          </div>

          <div className="dash__panel">
            <div className="dash__panel-head">
              <span>USER ACTIVITY</span>
              <span className="dash__panel-pill dash__panel-pill--alt">7D</span>
            </div>
            <div className="dash__bars">
              {[40, 65, 55, 80, 70, 95, 60, 75, 50, 85].map((b, i) => (
                <div
                  className="dash__bar"
                  key={i}
                  style={{
                    height: `${b}%`,
                    animationDelay: `${i * 70}ms`,
                    animationPlayState: inView ? "running" : "paused",
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="viz__caption">A single surface for the moving parts of your network</div>

      <style>{`
        .dash__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          margin-bottom: 16px;
        }
        .dash__stat {
          background: var(--bg-1);
          padding: 14px 14px 12px;
          display: flex; flex-direction: column; gap: 6px;
          opacity: 0;
          transform: translateY(8px);
          animation: dash-stat-in 0.6s var(--ease-out) forwards;
        }
        @keyframes dash-stat-in { to { opacity: 1; transform: none; } }
        .dash__stat-label {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.18em;
          color: var(--text-3);
        }
        .dash__stat-val {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-1);
          line-height: 1;
        }
        .dash__stat-bar {
          height: 2px;
          background: linear-gradient(90deg, var(--accent-1), transparent);
          opacity: 0.7;
        }

        .dash__panels {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 12px;
        }
        .dash__panel {
          padding: 14px;
          background: rgba(245,241,232,0.02);
          border: 1px solid var(--line);
          display: flex; flex-direction: column;
          min-height: 130px;
        }
        .dash__panel-head {
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-mono);
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
          color: var(--text-3);
          margin-bottom: 10px;
        }
        .dash__panel-pill {
          font-size: 8px; padding: 2px 6px;
          background: rgba(255,91,31,0.15); color: var(--accent-1);
          letter-spacing: 0.18em;
        }
        .dash__panel-pill--alt {
          background: rgba(200,200,204,0.15); color: var(--accent-2);
        }
        .dash__svg { width: 100%; height: 80px; display: block; }
        .dash-line {
          stroke-dasharray: 200; stroke-dashoffset: 200;
          transition: stroke-dashoffset 2.4s var(--ease-out);
        }
        .dash-line.is-in { stroke-dashoffset: 0; }
        .dash__svg path[fill="url(#dash-area)"] {
          opacity: 0;
          transition: opacity 1.5s ease-out 0.6s;
        }
        .dash__svg path[fill="url(#dash-area)"].is-in { opacity: 1; }

        .dash__bars {
          flex: 1;
          display: flex; align-items: flex-end; gap: 4px;
          padding-top: 10px;
        }
        .dash__bar {
          flex: 1;
          background: linear-gradient(to top, var(--accent-1), var(--accent-3));
          min-height: 4px;
          opacity: 0;
          transform: scaleY(0.2);
          transform-origin: bottom;
          animation: dash-bar 1.4s var(--ease-out) forwards;
        }
        @keyframes dash-bar { to { opacity: 1; transform: scaleY(1); } }

        @media (max-width: 600px) {
          .dash__stats { grid-template-columns: repeat(2, 1fr); }
          .dash__panels { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dash__stat, .dash__bar { animation: none; opacity: 1; transform: none; }
          .dash-line { stroke-dashoffset: 0; transition: none; }
        }
      `}</style>
    </div>
  );
}
