/**
 * FallbackBackdrop — CSS-only particle field shown when WebGL is unavailable.
 * Pure SVG noise + radial gradients + animated dots.
 */
export function FallbackBackdrop() {
  return (
    <div className="webgl-layer fallback" aria-hidden="true">
      <div className="fallback__grid" />
      <div className="fallback__dots">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 37) % 100;
          const y = (i * 71) % 100;
          const delay = (i % 12) * 0.6;
          const dur = 4 + (i % 5);
          return (
            <span
              key={i}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${dur}s`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        .fallback { background: radial-gradient(ellipse at center, #0a1226 0%, #05070d 70%); }
        .fallback__grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(110,139,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110,139,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        }
        .fallback__dots span {
          position: absolute; width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(170,188,255,0.6);
          box-shadow: 0 0 8px rgba(110,139,255,0.6);
          animation: fallback-float linear infinite;
        }
        @keyframes fallback-float {
          0%   { transform: translateY(0);    opacity: 0; }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-60px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fallback__dots span { animation: none; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
