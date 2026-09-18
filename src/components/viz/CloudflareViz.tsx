/**
 * CloudflareViz — editorial cloud diagram.
 * High-contrast B/W with orange accent on Pixel & Ping control layer.
 */
export function CloudflareViz() {
  return (
    <div className="viz" data-viz="cloudflare">
      <div className="viz__head">
        <span className="viz__head-num">FIG. 07</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">CLOUDFLARE / CONTROL</span>
      </div>
      <div className="viz__body">
        <svg viewBox="0 0 100 70" className="viz__svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="cf-glow" cx="50%" cy="55%" r="55%">
              <stop offset="0%" stopColor="#ff5b1f" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ff5b1f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cf-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c8c8cc" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff5b1f" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c8c8cc" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* cloud halo */}
          <ellipse cx="50" cy="36" rx="40" ry="14" fill="url(#cf-glow)" />
          <path
            d="M 25 40 Q 18 40 18 34 Q 18 28 25 28 Q 26 22 34 22 Q 40 18 46 22 Q 52 18 58 22 Q 66 22 68 30 Q 76 30 76 36 Q 76 42 68 42 L 28 42 Q 25 42 25 40 Z"
            fill="rgba(245,241,232,0.04)"
            stroke="rgba(245,241,232,0.35)"
            strokeWidth="0.35"
            className="cf-cloud"
          />

          {/* Pixel & Ping control chip in the middle */}
          <rect x="40" y="32" width="20" height="6.5" rx="0" fill="#0a0a0c" stroke="#ff5b1f" strokeWidth="0.4" />
          <text x="50" y="36.5" textAnchor="middle" fontSize="2.6" fill="#ff5b1f" fontFamily="monospace" fontWeight="700">
            P&amp;P
          </text>

          {/* data paths in/out */}
          {[10, 16, 22, 38, 44, 50, 56, 62, 78, 84, 90].map((x, i) => {
            const y = i % 3 === 0 ? 6 : i % 3 === 1 ? 56 : 62;
            const targetY = 36;
            return (
              <line
                key={i}
                x1={x}
                y1={y}
                x2="50"
                y2={targetY}
                stroke="url(#cf-line)"
                strokeWidth="0.3"
                className="cf-path"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            );
          })}

          {/* edge nodes */}
          {[[10, 6], [22, 6], [78, 6], [90, 6], [10, 56], [22, 62], [78, 56], [90, 62]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1" fill="#f5f1e8" className="cf-node" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </svg>
      </div>
      <div className="viz__caption">Pixel &amp; Ping as the control layer over modern cloud infrastructure</div>

      <style>{`
        .cf-cloud { animation: cf-float 8s ease-in-out infinite; transform-origin: 50% 50%; }
        @keyframes cf-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.85; }
          50%      { transform: translateY(-1px) scale(1.02); opacity: 1; }
        }
        .cf-path {
          stroke-dasharray: 4 4;
          animation: cf-dash 3s linear infinite;
        }
        @keyframes cf-dash { to { stroke-dashoffset: -16; } }
        .cf-node { animation: cf-blink 2s ease-in-out infinite; }
        @keyframes cf-blink {
          0%, 100% { opacity: 0.5; r: 1; }
          50%      { opacity: 1; r: 1.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cf-cloud, .cf-path, .cf-node { animation: none; }
        }
      `}</style>
    </div>
  );
}
