/**
 * Hero — opening scene.
 * Sequence: darkness -> subtle particle field -> logo -> headline.
 */
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1: logo appears after 0.4s
    // Phase 2: headline appears after 1.4s
    // Phase 3: sub + scroll indicator after 2.2s
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="hero"
      aria-label="Pixel & Ping — opening"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
      }}
    >
      <div className="hero__inner" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Logo */}
        <div
          className={`hero__logo ${phase >= 1 ? "is-in" : ""}`}
          aria-hidden="true"
        >
          <picture>
            <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
            <img
              src="./logo/pixel-ping-logo.png"
              alt=""
              width={120}
              height={120}
              style={{ filter: "drop-shadow(0 0 60px rgba(110,139,255,0.6))" }}
            />
          </picture>
        </div>

        {/* Brand line */}
        <div
          className={`hero__brand ${phase >= 1 ? "is-in" : ""}`}
          style={{
            marginTop: 28,
            fontFamily: "var(--font-display)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.55em",
            color: "var(--accent-3)",
          }}
        >
          PIXEL &amp; PING
        </div>

        {/* Headline */}
        <h1
          className={`hero__title h-display h-1 ${phase >= 2 ? "is-in" : ""}`}
          style={{
            margin: "30px 0 24px",
            color: "var(--text-1)",
            textShadow: "0 4px 40px rgba(110,139,255,0.18)",
          }}
        >
          <span className="hero__line">Control your network.</span>
          <br />
          <span className="hero__line" style={{ color: "var(--accent-3)" }}>
            See everything.
          </span>
        </h1>

        {/* Support line */}
        <p
          className={`hero__sub ${phase >= 3 ? "is-in" : ""}`}
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            color: "var(--text-2)",
            maxWidth: "44ch",
            margin: "0 auto",
            lineHeight: 1.55,
          }}
        >
          A modern network management experience.
        </p>

        {/* Scroll indicator */}
        <div
          className={`hero__scroll ${phase >= 3 ? "is-in" : ""}`}
          aria-hidden="true"
          style={{ marginTop: 80 }}
        >
          <span className="hero__scroll-text">SCROLL</span>
          <span className="hero__scroll-line" />
        </div>
      </div>

      <style>{`
        .hero__logo, .hero__brand, .hero__title, .hero__sub, .hero__scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.4s var(--ease-out), transform 1.4s var(--ease-out);
        }
        .hero__logo.is-in { opacity: 1; transform: translateY(0); }
        .hero__brand.is-in { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        .hero__title.is-in { opacity: 1; transform: translateY(0); transition-delay: 0.1s; }
        .hero__sub.is-in   { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        .hero__scroll.is-in { opacity: 1; transform: translateY(0); transition-delay: 0.3s; }

        .hero__line { display: inline-block; }

        .hero__scroll {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .hero__scroll-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.4em; color: var(--text-3);
        }
        .hero__scroll-line {
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, var(--accent-1), transparent);
          position: relative; overflow: hidden;
        }
        .hero__scroll-line::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent, var(--accent-3), transparent);
          animation: hero-scroll-pulse 2.2s ease-in-out infinite;
        }
        @keyframes hero-scroll-pulse {
          0%   { transform: translateY(-100%); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero__logo, .hero__brand, .hero__title, .hero__sub, .hero__scroll {
            opacity: 1; transform: none;
          }
        }
      `}</style>
    </section>
  );
}
