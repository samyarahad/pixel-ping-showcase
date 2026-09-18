/**
 * IPScannerViz — editorial IP scanner visualization.
 * Clean IP pool table + scan progress bar + endpoint health grid.
 */
import { useInViewport } from "../../hooks/useInViewport";

const POOL = [
  { ip: "162.159.92.0",  label: "cf-range-1",  c: "#ff5b1f" },
  { ip: "172.64.0.0",    label: "cf-range-2",  c: "#ff5b1f" },
  { ip: "104.16.0.0",    label: "cf-range-3",  c: "#ff5b1f" },
  { ip: "188.114.96.0",  label: "edge-clean",  c: "#6ee7a0" },
  { ip: "188.114.97.0",  label: "edge-clean",  c: "#6ee7a0" },
];

export function IPScannerViz() {
  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.05, rootMargin: "100px" });

  return (
    <div className="viz" data-viz="ip-scanner" ref={ref}>
      <div className="viz__head">
        <span className="viz__head-num">FIG. 05</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">IP SCANNER / HEALTH</span>
      </div>
      <div className="viz__body">
        {/* Clean IP pool table */}
        <div className="ips__section">
          <div className="ips__head">
            <span>CLEAN IP POOL</span>
            <div className="ips__actions">
              <span className="ips__action">+ ADD IP</span>
              <span className="ips__action ips__action--accent">+ CF RANGES</span>
            </div>
          </div>
          <div className="ips__table">
            <div className="ips__row ips__row--head">
              <span>IP</span>
              <span>LABEL</span>
              <span>STATUS</span>
            </div>
            {POOL.map((p, i) => (
              <div
                className="ips__row"
                key={p.ip}
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationPlayState: inView ? "running" : "paused",
                } as React.CSSProperties}
              >
                <span className="ips__ip">{p.ip}</span>
                <span className="ips__label">
                  <span className="ips__label-dot" style={{ background: p.c }} />
                  {p.label}
                </span>
                <span className="ips__status" style={{ color: p.c }}>
                  <span className="ips__status-dot" style={{ background: p.c }} />
                  CLEAN
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scan progress */}
        <div className="ips__scan">
          <div className="ips__scan-head">
            <span>SCANNING</span>
            <span className="ips__scan-pct">68%</span>
          </div>
          <div className="ips__scan-bar">
            <div className={`ips__scan-fill ${inView ? "is-in" : ""}`} />
          </div>
          <div className="ips__scan-meta">
            <span>256 IPs / 372</span>
            <span className="ips__scan-sep">·</span>
            <span>2.4s remaining</span>
          </div>
        </div>
      </div>
      <div className="viz__caption">A focused scanner for clean IP pools and endpoint health</div>

      <style>{`
        .ips__section {
          margin-bottom: 18px;
        }
        .ips__head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.22em;
          color: var(--text-3);
          border-bottom: 1px solid var(--line);
          background: rgba(0,0,0,0.3);
        }
        .ips__actions { display: flex; gap: 8px; }
        .ips__action {
          padding: 4px 10px;
          border: 1px solid var(--line);
          font-size: 9px;
          font-weight: 700;
          color: var(--text-2);
        }
        .ips__action--accent {
          color: var(--accent-1);
          border-color: var(--accent-1);
        }

        .ips__table {
          border: 1px solid var(--line);
          border-top: 0;
        }
        .ips__row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 80px;
          gap: 12px;
          align-items: center;
          padding: 10px 14px;
          border-bottom: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-2);
          opacity: 0;
          transform: translateX(-8px);
          animation: ips-row-in 0.5s var(--ease-out) forwards;
        }
        .ips__row:last-child { border-bottom: 0; }
        .ips__row--head {
          font-size: 9px;
          letter-spacing: 0.22em;
          color: var(--text-3);
          background: rgba(0,0,0,0.2);
          animation: none;
          opacity: 1;
          transform: none;
        }
        @keyframes ips-row-in { to { opacity: 1; transform: none; } }
        .ips__ip { color: var(--text-1); }
        .ips__label {
          display: flex; align-items: center; gap: 8px;
          color: var(--text-2);
        }
        .ips__label-dot {
          width: 6px; height: 6px; border-radius: 50%;
        }
        .ips__status {
          display: flex; align-items: center; gap: 6px;
          font-size: 9px;
          letter-spacing: 0.1em;
        }
        .ips__status-dot {
          width: 6px; height: 6px; border-radius: 50%;
        }

        .ips__scan {
          padding: 14px;
          background: rgba(245,241,232,0.02);
          border: 1px solid var(--line);
        }
        .ips__scan-head {
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--text-3);
          margin-bottom: 10px;
        }
        .ips__scan-pct {
          color: var(--accent-1);
          font-size: 13px;
          font-weight: 700;
        }
        .ips__scan-bar {
          height: 4px;
          background: rgba(245,241,232,0.06);
          overflow: hidden;
          margin-bottom: 8px;
        }
        .ips__scan-fill {
          height: 100%;
          width: 68%;
          background: linear-gradient(90deg, var(--accent-1), var(--accent-3));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.6s var(--ease-out) 0.3s;
        }
        .ips__scan-fill.is-in { transform: scaleX(1); }
        .ips__scan-meta {
          display: flex; gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-3);
        }
        .ips__scan-sep { color: var(--text-3); }

        @media (max-width: 500px) {
          .ips__row { grid-template-columns: 1fr 80px; }
          .ips__label { display: none; }
          .ips__row--head span:nth-child(2) { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ips__row { animation: none; opacity: 1; transform: none; }
          .ips__scan-fill { transform: scaleX(1); transition: none; }
        }
      `}</style>
    </div>
  );
}
