/**
 * ConfigViz — editorial parameter flow into organized YAML.
 * Monograph-style: numbered tokens flowing into a code block.
 */
const PARAMS = [
  { k: "host",      v: "edge-01.pp" },
  { k: "port",      v: "443" },
  { k: "protocol",  v: "wireguard" },
  { k: "dns",       v: "1.1.1.1" },
  { k: "mtu",       v: "1280" },
  { k: "endpoint",  v: "auto" },
];

export function ConfigViz() {
  return (
    <div className="viz" data-viz="config">
      <div className="viz__head">
        <span className="viz__head-num">FIG. 08</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">CONFIG / FLOW</span>
      </div>
      <div className="viz__body">
        <div className="config__scene">
          {/* Left: parameter tokens flowing in */}
          <div className="config__stream">
            <div className="config__stream-head col-label">PARAMETERS</div>
            {PARAMS.map((p, i) => (
              <div
                className="config__token"
                key={p.k}
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <span className="config__num">0{i + 1}</span>
                <span className="config__key">{p.k}</span>
                <span className="config__eq">=</span>
                <span className="config__val">{p.v}</span>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="config__arrow" aria-hidden="true">→</div>

          {/* Right: assembled config */}
          <div className="config__result">
            <div className="config__result-head">
              <span className="config__dot" />
              <span>config.yaml</span>
              <span className="config__check">✓ ORGANIZED</span>
            </div>
            <pre className="config__code">
{PARAMS.map((p) => `  ${p.k}: ${p.v}`).join("\n")}
            </pre>
          </div>
        </div>
      </div>
      <div className="viz__caption">Abstract parameters flowing into a central, organized configuration</div>

      <style>{`
        .config__scene {
          display: grid; grid-template-columns: 1fr 24px 1fr; gap: 16px;
          align-items: center;
        }
        .config__stream {
          display: flex; flex-direction: column; gap: 6px;
        }
        .config__stream-head {
          margin-bottom: 6px;
        }
        .config__token {
          display: grid;
          grid-template-columns: 24px 1fr 12px 1fr;
          align-items: center; gap: 6px;
          padding: 8px 10px;
          background: rgba(245,241,232,0.03);
          border: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 11px;
          opacity: 0;
          transform: translateX(-12px);
          animation: config-flow 4s ease-in-out infinite;
        }
        .config__num { color: var(--accent-1); font-size: 9px; }
        .config__key { color: var(--text-1); font-weight: 500; }
        .config__eq  { color: var(--text-3); }
        .config__val { color: var(--text-2); }
        @keyframes config-flow {
          0%   { opacity: 0; transform: translateX(-12px); }
          15%  { opacity: 1; transform: translateX(0); }
          85%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(12px); }
        }

        .config__arrow {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--accent-1);
          text-align: center;
        }

        .config__result {
          padding: 14px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--line-strong);
        }
        .config__result-head {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px; color: var(--text-3);
          letter-spacing: 0.12em;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 8px;
        }
        .config__dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6ee7a0;
          box-shadow: 0 0 8px #6ee7a0;
        }
        .config__check {
          margin-left: auto;
          color: #6ee7a0;
          font-size: 9px;
        }
        .config__code {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 11px; line-height: 1.7;
          color: var(--text-2);
        }

        @media (max-width: 700px) {
          .config__scene { grid-template-columns: 1fr; }
          .config__arrow { transform: rotate(90deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .config__token { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
