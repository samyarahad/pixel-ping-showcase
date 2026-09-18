/**
 * ConfigViz — parameters flow into a central config object that becomes
 * organized. Animated tokens + assembling form.
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
      <div className="config__scene">
        {/* Left: parameter tokens flowing in */}
        <div className="config__stream">
          {PARAMS.map((p, i) => (
            <div
              className="config__token"
              key={p.k}
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <span className="config__key">{p.k}</span>
              <span className="config__eq">=</span>
              <span className="config__val">{p.v}</span>
            </div>
          ))}
        </div>

        {/* Right: assembled config object */}
        <div className="config__result glass">
          <div className="config__result-head">
            <span className="config__dot" />
            <span>config.yaml</span>
          </div>
          <pre className="config__code">
{PARAMS.map((p) => `  ${p.k}: ${p.v}`).join("\n")}
          </pre>
          <div className="config__check">✓ organized</div>
        </div>
      </div>
      <div className="viz__caption">Abstract parameters flowing into a central, organized configuration</div>

      <style>{`
        .config__scene {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
          padding: 6px 4px 14px; align-items: center;
        }
        .config__stream {
          display: flex; flex-direction: column; gap: 6px;
        }
        .config__token {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 10px;
          background: rgba(12,18,36,0.55);
          border: 1px solid var(--line);
          border-radius: 6px;
          font-family: ui-monospace, "SF Mono", monospace;
          font-size: 11px;
          opacity: 0;
          transform: translateX(-12px);
          animation: config-flow 4s ease-in-out infinite;
        }
        .config__key { color: var(--accent-1); }
        .config__eq  { color: var(--text-3); }
        .config__val { color: var(--text-1); }
        @keyframes config-flow {
          0%   { opacity: 0; transform: translateX(-12px); }
          15%  { opacity: 1; transform: translateX(0); }
          85%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(12px); }
        }

        .config__result {
          padding: 12px;
          border-radius: 10px;
          font-size: 11px;
        }
        .config__result-head {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; color: var(--text-3);
          letter-spacing: 0.18em;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 8px;
        }
        .config__dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6ee7a0;
          box-shadow: 0 0 8px #6ee7a0;
        }
        .config__code {
          margin: 0;
          font-family: ui-monospace, "SF Mono", monospace;
          font-size: 11px; line-height: 1.7;
          color: var(--text-2);
        }
        .config__check {
          margin-top: 8px;
          font-size: 10px; color: #6ee7a0;
          font-weight: 600; letter-spacing: 0.18em;
        }

        @media (max-width: 600px) {
          .config__scene { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .config__token { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
