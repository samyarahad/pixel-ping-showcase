/**
 * ServersViz — editorial server registration visualization.
 * Map of server nodes + add-server CTA + status grid.
 */
import { useInViewport } from "../../hooks/useInViewport";

const SERVERS = [
  { id: "S_01", name: "edge-01.pp",   loc: "FRA", status: "ONLINE",  c: "#6ee7a0" },
  { id: "S_02", name: "edge-02.pp",   loc: "AMS", status: "ONLINE",  c: "#6ee7a0" },
  { id: "S_03", name: "edge-03.pp",   loc: "LON", status: "DEGRADED",c: "#ff8a4c" },
  { id: "S_04", name: "core-01.pp",   loc: "NYC", status: "ONLINE",  c: "#6ee7a0" },
];

export function ServersViz() {
  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.05, rootMargin: "100px" });

  return (
    <div className="viz" data-viz="servers" ref={ref}>
      <div className="viz__head">
        <span className="viz__head-num">FIG. 03</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">SERVERS / REGISTRY</span>
      </div>
      <div className="viz__body">
        <div className="servers__grid">
          {/* Left: server list */}
          <div className="servers__list">
            <div className="servers__list-head">
              <span>REGISTERED</span>
              <span className="servers__list-count">04</span>
            </div>
            {SERVERS.map((s, i) => (
              <div
                className="servers__item"
                key={s.id}
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationPlayState: inView ? "running" : "paused",
                } as React.CSSProperties}
              >
                <div className="servers__item-id">{s.id}</div>
                <div className="servers__item-info">
                  <div className="servers__item-name">{s.name}</div>
                  <div className="servers__item-loc">{s.loc}</div>
                </div>
                <div className="servers__item-status" style={{ color: s.c }}>
                  <span className="servers__status-dot" style={{ background: s.c, boxShadow: `0 0 6px ${s.c}` }} />
                  {s.status}
                </div>
              </div>
            ))}
            <div className="servers__add">
              <span className="servers__add-plus">+</span>
              <span>ADD SERVER</span>
            </div>
          </div>

          {/* Right: network map */}
          <div className="servers__map">
            <svg viewBox="0 0 100 80" className="servers__svg" aria-hidden="true">
              <defs>
                <radialGradient id="srv-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff5b1f" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ff5b1f" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* center hub */}
              <circle cx="50" cy="40" r="12" fill="url(#srv-glow)" />
              <circle cx="50" cy="40" r="2.5" fill="#ff5b1f" className={`viz__hub ${inView ? "is-in" : ""}`} />
              <text x="50" y="41" textAnchor="middle" fontSize="2" fill="#0a0a0c" fontFamily="monospace" fontWeight="700">P&amp;P</text>

              {/* server nodes positioned around */}
              {[
                { x: 18, y: 18, id: "01" },
                { x: 82, y: 18, id: "02" },
                { x: 18, y: 62, id: "03" },
                { x: 82, y: 62, id: "04" },
              ].map((n, i) => (
                <g key={n.id} className={`viz__node ${inView ? "is-in" : ""}`} style={{ animationDelay: `${i * 0.3}s` }}>
                  <line x1="50" y1="40" x2={n.x} y2={n.y} stroke="rgba(245,241,232,0.2)" strokeWidth="0.3" strokeDasharray="1.5 1" className="viz__edge" />
                  <rect x={n.x - 3} y={n.y - 3} width="6" height="6" fill="none" stroke="#f5f1e8" strokeWidth="0.4" />
                  <circle cx={n.x} cy={n.y} r="1" fill="#6ee7a0" />
                  <text x={n.x} y={n.y + 7} textAnchor="middle" fontSize="2.2" fill="#9a958a" fontFamily="monospace">S_{n.id}</text>
                </g>
              ))}

              {/* data pulses */}
              {[
                { x: 18, y: 18 }, { x: 82, y: 18 }, { x: 18, y: 62 }, { x: 82, y: 62 },
              ].map((n, i) => (
                <circle key={i} r="0.7" fill="#ff5b1f" className="viz__pulse">
                  <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={`M50,40 L${n.x},${n.y}`} begin={`${i * 0.5}s`} />
                </circle>
              ))}
            </svg>
          </div>
        </div>
      </div>
      <div className="viz__caption">Each server becomes a node — visible, contextual, paired with the network</div>

      <style>{`
        .servers__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .servers__list {
          display: flex; flex-direction: column;
          border: 1px solid var(--line);
        }
        .servers__list-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.22em;
          color: var(--text-3);
          border-bottom: 1px solid var(--line);
          background: rgba(0,0,0,0.3);
        }
        .servers__list-count {
          color: var(--accent-1);
          font-size: 11px;
        }
        .servers__item {
          display: grid;
          grid-template-columns: 50px 1fr 80px;
          gap: 10px;
          align-items: center;
          padding: 12px 14px;
          border-bottom: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 11px;
          opacity: 0;
          transform: translateX(-10px);
          animation: servers-item-in 0.5s var(--ease-out) forwards;
        }
        @keyframes servers-item-in { to { opacity: 1; transform: none; } }
        .servers__item-id {
          color: var(--accent-1);
          font-size: 10px;
        }
        .servers__item-name {
          color: var(--text-1);
          font-size: 11px;
        }
        .servers__item-loc {
          color: var(--text-3);
          font-size: 9px;
          margin-top: 2px;
        }
        .servers__item-status {
          display: flex; align-items: center; gap: 6px;
          font-size: 9px;
          letter-spacing: 0.1em;
        }
        .servers__status-dot {
          width: 6px; height: 6px; border-radius: 50%;
        }
        .servers__add {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--text-2);
          border: 1px dashed var(--line-strong);
          margin: 12px;
          transition: all 0.3s;
        }
        .servers__add:hover {
          color: var(--accent-1);
          border-color: var(--accent-1);
          background: rgba(255,91,31,0.04);
        }
        .servers__add-plus { color: var(--accent-1); font-size: 14px; }

        .servers__map {
          border: 1px solid var(--line);
          background: rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          min-height: 280px;
        }
        .servers__svg {
          width: 100%; height: 100%;
          max-height: 280px;
        }

        @media (max-width: 600px) {
          .servers__grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .servers__item { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
