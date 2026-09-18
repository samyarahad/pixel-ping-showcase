/**
 * CloudflareViz — abstract cloud with data paths flowing through it.
 * Pixel & Ping sits as the control layer.
 */
export function CloudflareViz() {
  return (
    <div className="viz" data-viz="cloudflare">
      <svg viewBox="0 0 100 60" className="viz__svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="cf-glow" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#f6821f" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f6821f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cf-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6e8bff" stopOpacity="0" />
            <stop offset="50%" stopColor="#c4a6ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6e8bff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* cloud halo */}
        <ellipse cx="50" cy="32" rx="40" ry="14" fill="url(#cf-glow)" />
        <path
          d="M 25 36 Q 18 36 18 30 Q 18 24 25 24 Q 26 18 34 18 Q 40 14 46 18 Q 52 14 58 18 Q 66 18 68 26 Q 76 26 76 32 Q 76 38 68 38 L 28 38 Q 25 38 25 36 Z"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(246,130,31,0.45)"
          strokeWidth="0.4"
          className="cf-cloud"
        />

        {/* Pixel & Ping core chip in the middle */}
        <rect x="42" y="28" width="16" height="6" rx="1.2" fill="rgba(12,18,36,0.95)" stroke="#c4a6ff" strokeWidth="0.35" />
        <text x="50" y="32.3" textAnchor="middle" fontSize="2.2" fill="#c4a6ff" fontFamily="monospace" fontWeight="700">
          P&amp;P
        </text>

        {/* data paths in/out */}
        {[10, 16, 22, 38, 44, 50, 56, 62, 78, 84, 90].map((x, i) => {
          const y = i % 3 === 0 ? 8 : i % 3 === 1 ? 50 : 56;
          const targetY = 32;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2="50"
              y2={targetY}
              stroke="url(#cf-line)"
              strokeWidth="0.35"
              className="cf-path"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          );
        })}

        {/* edge nodes */}
        {[[10, 8], [22, 8], [78, 8], [90, 8], [10, 50], [22, 56], [78, 50], [90, 56]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.1" fill="#6e8bff" className="cf-node" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </svg>
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
        @keyframes cf-dash {
          to { stroke-dashoffset: -16; }
        }
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
