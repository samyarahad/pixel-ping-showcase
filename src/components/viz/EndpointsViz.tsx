/**
 * EndpointsViz — editorial network graph.
 * SVG with numbered nodes, mono labels, orange accent.
 */
export function EndpointsViz() {
  const nodes = Array.from({ length: 7 }, (_, i) => {
    const angle = (i / 7) * Math.PI * 2;
    return {
      x: 50 + Math.cos(angle) * 36,
      y: 50 + Math.sin(angle) * 36,
      label: `EP_0${i + 1}`,
      num: `0${i + 1}`,
    };
  });
  return (
    <div className="viz" data-viz="endpoints">
      <div className="viz__head">
        <span className="viz__head-num">FIG. 05</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">ENDPOINTS / GRAPH</span>
      </div>
      <div className="viz__body">
        <svg viewBox="0 0 100 70" className="viz__svg" aria-hidden="true">
          <defs>
            <radialGradient id="ep-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff5b1f" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff5b1f" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* center hub */}
          <circle cx="50" cy="35" r="14" fill="url(#ep-glow)" />
          <circle cx="50" cy="35" r="3" fill="#ff5b1f" className="viz__hub" />
          <text x="50" y="36.5" textAnchor="middle" fontSize="2" fill="#0a0a0c" fontFamily="monospace" fontWeight="700">P&P</text>
          {/* edges */}
          {nodes.map((n, i) => (
            <line
              key={`l${i}`}
              x1="50" y1="35" x2={n.x} y2={n.y}
              stroke="rgba(245,241,232,0.25)"
              strokeWidth="0.3"
              strokeDasharray="1.5 1"
              className="viz__edge"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
          {/* nodes */}
          {nodes.map((n, i) => (
            <g key={`n${i}`} className="viz__node" style={{ animationDelay: `${i * 0.4}s` }}>
              <circle cx={n.x} cy={n.y} r="2.4" fill="#f5f1e8" />
              <circle cx={n.x} cy={n.y} r="4.2" fill="none" stroke="#ff5b1f" strokeWidth="0.3" />
              <text x={n.x} y={n.y - 6} textAnchor="middle" fontSize="2.2" fill="#9a958a" fontFamily="monospace">{n.num}</text>
            </g>
          ))}
          {/* data pulses traveling along edges */}
          {nodes.map((n, i) => (
            <circle key={`p${i}`} r="0.8" fill="#ff5b1f" className="viz__pulse">
              <animateMotion dur={`${3 + (i % 3)}s`} repeatCount="indefinite" path={`M50,35 L${n.x},${n.y}`} begin={`${i * 0.5}s`} />
            </circle>
          ))}
        </svg>
      </div>
      <div className="viz__caption">Endpoints converging into the network core</div>
    </div>
  );
}
