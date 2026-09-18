/**
 * PortsViz — animated port matrix. Grid of port cells with periodic
 * connection flashes along port-type columns.
 */
const PORT_TYPES = [
  { name: "HTTP", color: "#6e8bff" },
  { name: "HTTPS", color: "#c4a6ff" },
  { name: "SSH", color: "#8b5cf6" },
  { name: "WIREGUARD", color: "#5b76ff" },
];

export function PortsViz() {
  const rows = 6;
  return (
    <div className="viz" data-viz="ports">
      <div className="ports__grid">
        {PORT_TYPES.map((p, ci) => (
          <div className="ports__col" key={p.name}>
            <div className="ports__head" style={{ color: p.color }}>{p.name}</div>
            {Array.from({ length: rows }).map((_, ri) => {
              const num = 80 + ci * 100 + ri * 11;
              return (
                <div
                  className="ports__cell"
                  key={ri}
                  style={{
                    animationDelay: `${(ci * rows + ri) * 0.15}s`,
                    "--c": p.color,
                  } as React.CSSProperties}
                >
                  <span className="ports__dot" />
                  <span className="ports__num">:{num}</span>
                  <span className="ports__bar" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="viz__caption">Organized connections across port types</div>

      <style>{`
        .ports__grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 14px; padding: 8px 4px 16px;
        }
        .ports__col { display: flex; flex-direction: column; gap: 6px; }
        .ports__head {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.18em;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
          text-align: center;
        }
        .ports__cell {
          display: grid;
          grid-template-columns: 8px 1fr 24px;
          align-items: center; gap: 6px;
          padding: 6px 8px;
          background: rgba(12,18,36,0.5);
          border: 1px solid var(--line);
          border-radius: 6px;
          font-size: 10px;
          font-family: ui-monospace, "SF Mono", monospace;
          color: var(--text-2);
          animation: ports-cell-pulse 3.5s ease-in-out infinite;
        }
        .ports__dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c);
          box-shadow: 0 0 8px var(--c);
        }
        .ports__num { font-weight: 500; }
        .ports__bar {
          height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, var(--c), transparent);
          opacity: 0.6;
        }
        @keyframes ports-cell-pulse {
          0%, 100% { opacity: 0.55; border-color: var(--line); }
          50%      { opacity: 1; border-color: var(--c); box-shadow: 0 0 14px -4px var(--c); }
        }
        @media (prefers-reduced-motion: reduce) { .ports__cell { animation: none; opacity: 0.9; } }
      `}</style>
    </div>
  );
}
