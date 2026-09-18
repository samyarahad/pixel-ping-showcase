/**
 * EndpointsViz — animated network graph showing endpoints converging.
 * Pure SVG + CSS, no extra deps. Reduced-motion friendly.
 */
export function EndpointsViz() {
  const nodes = Array.from({ length: 7 }, (_, i) => {
    const angle = (i / 7) * Math.PI * 2;
    return {
      x: 50 + Math.cos(angle) * 38,
      y: 50 + Math.sin(angle) * 38,
      label: `EP-${i + 1}`,
    };
  });
  return (
    <div className="viz" data-viz="endpoints">
      <svg viewBox="0 0 100 100" className="viz__svg" aria-hidden="true">
        <defs>
          <radialGradient id="ep-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6e8bff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6e8bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* center hub */}
        <circle cx="50" cy="50" r="14" fill="url(#ep-glow)" />
        <circle cx="50" cy="50" r="3.5" fill="#c4a6ff" className="viz__hub" />
        {/* edges */}
        {nodes.map((n, i) => (
          <line
            key={`l${i}`}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke="rgba(170,188,255,0.35)"
            strokeWidth="0.4"
            strokeDasharray="2 1.5"
            className="viz__edge"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={`n${i}`} className="viz__node" style={{ animationDelay: `${i * 0.4}s` }}>
            <circle cx={n.x} cy={n.y} r="2.2" fill="#6e8bff" />
            <circle cx={n.x} cy={n.y} r="4" fill="none" stroke="rgba(110,139,255,0.45)" strokeWidth="0.3" />
          </g>
        ))}
        {/* data pulses traveling along edges */}
        {nodes.map((n, i) => (
          <circle key={`p${i}`} r="0.9" fill="#c4a6ff" className="viz__pulse">
            <animateMotion dur={`${3 + (i % 3)}s`} repeatCount="indefinite" path={`M50,50 L${n.x},${n.y}`} begin={`${i * 0.5}s`} />
          </circle>
        ))}
      </svg>
      <div className="viz__caption">Endpoints converging into the network core</div>
    </div>
  );
}
