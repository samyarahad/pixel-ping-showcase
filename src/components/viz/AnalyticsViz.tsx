/**
 * AnalyticsViz — animated charts and graphs.
 * SVG line chart + bar chart that "form" slowly.
 */
export function AnalyticsViz() {
  const linePts = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 36, 44, 50, 48];
  const max = Math.max(...linePts);
  const W = 100, H = 36;
  const step = W / (linePts.length - 1);
  const linePath = linePts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${H - (p / max) * (H - 4) - 2}`)
    .join(" ");
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  const bars = [40, 65, 55, 80, 70, 95, 60, 75, 50, 85, 45, 70];

  return (
    <div className="viz" data-viz="analytics">
      <div className="analytics__grid">
        <div className="analytics__panel analytics__line">
          <div className="analytics__head">
            <span>TRAFFIC</span>
            <span className="analytics__pill">live</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="analytics__svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="an-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6e8bff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#6e8bff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#an-area)" className="an-area" />
            <path d={linePath} fill="none" stroke="#6e8bff" strokeWidth="0.7" className="an-line" />
            {linePts.map((p, i) => (
              <circle
                key={i}
                cx={i * step}
                cy={H - (p / max) * (H - 4) - 2}
                r="0.6"
                fill="#c4a6ff"
                className="an-dot"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </svg>
        </div>

        <div className="analytics__panel analytics__bars">
          <div className="analytics__head">
            <span>REQUESTS / DAY</span>
            <span className="analytics__pill analytics__pill--alt">7d</span>
          </div>
          <div className="analytics__bartrack">
            {bars.map((b, i) => (
              <div
                className="analytics__bar"
                key={i}
                style={{
                  height: `${b}%`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="viz__caption">Lines form. Charts emerge. The analytics view reveals patterns.</div>

      <style>{`
        .analytics__grid {
          display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px;
          padding: 6px 4px 14px;
        }
        .analytics__panel {
          padding: 14px;
          background: rgba(12,18,36,0.55);
          border: 1px solid var(--line);
          border-radius: 10px;
          display: flex; flex-direction: column;
          min-height: 140px;
        }
        .analytics__head {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
          color: var(--text-3);
          margin-bottom: 10px;
        }
        .analytics__pill {
          font-size: 8px; padding: 2px 6px;
          background: rgba(110,222,160,0.15); color: #6ee7a0;
          border-radius: 999px; letter-spacing: 0.18em;
        }
        .analytics__pill--alt {
          background: rgba(196,167,255,0.15); color: var(--accent-3);
        }
        .analytics__svg { width: 100%; height: 100px; display: block; }
        .an-line {
          stroke-dasharray: 200; stroke-dashoffset: 200;
          animation: an-draw 2.4s var(--ease-out) forwards;
        }
        @keyframes an-draw { to { stroke-dashoffset: 0; } }
        .an-area { opacity: 0; animation: an-fade 2s ease-out 0.6s forwards; }
        @keyframes an-fade { to { opacity: 1; } }
        .an-dot { opacity: 0; animation: an-fade 0.4s ease-out forwards; }

        .analytics__bartrack {
          flex: 1;
          display: flex; align-items: flex-end; gap: 4px;
          padding-top: 10px;
        }
        .analytics__bar {
          flex: 1;
          background: linear-gradient(to top, var(--accent-2), var(--accent-1));
          border-radius: 2px 2px 0 0;
          min-height: 4px;
          opacity: 0;
          transform: scaleY(0.2);
          transform-origin: bottom;
          animation: an-bar 1.6s var(--ease-out) forwards;
        }
        @keyframes an-bar { to { opacity: 1; transform: scaleY(1); } }

        @media (max-width: 600px) {
          .analytics__grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .an-line, .an-area, .an-dot, .analytics__bar { animation: none; opacity: 1; transform: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
