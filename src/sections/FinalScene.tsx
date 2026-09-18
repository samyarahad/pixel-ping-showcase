/**
 * FinalScene — closing statement. Editorial colophon style.
 * Oversized headline + colophon block.
 */
import { useReveal } from "../utils";

export function FinalScene() {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.4 });
  return (
    <section
      ref={ref}
      id="final"
      className={`final ${visible ? "is-visible" : ""}`}
    >
      <div className="shell">
        <div className={`final__chapter ${visible ? "is-in" : ""}`}>
          <span className="num-tag">CH. 22</span>
          <span className="rule-strong" style={{ width: 80, margin: "0 16px" }} />
          <span className="col-label">END / COLOPHON</span>
        </div>

        <div className="final__brand-block">
          <div className={`final__logo ${visible ? "is-in" : ""}`}>
            <picture>
              <source srcSet="./logo/pixel-ping-logo.avif" type="image/avif" />
              <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
              <img src="./logo/pixel-ping-logo.png" alt="" width={80} height={80} loading="lazy" decoding="async" />
            </picture>
          </div>
          <div className={`final__brand-text ${visible ? "is-in" : ""}`}>PIXEL &amp; PING</div>
        </div>

        <h2 className={`final__title ${visible ? "is-in" : ""}`}>
          <span className="reveal-mask"><span>One view.</span></span>
          <span className="reveal-mask">
            <span className="h-serif final__title-accent">One network.</span>
          </span>
        </h2>

        <div className={`final__colophon ${visible ? "is-in" : ""}`}>
          <div className="final__col">
            <span className="col-label">VOLUME</span>
            <span className="final__val">01</span>
          </div>
          <div className="final__col">
            <span className="col-label">CHAPTERS</span>
            <span className="final__val">22</span>
          </div>
          <div className="final__col">
            <span className="col-label">SURFACES</span>
            <span className="final__val">14</span>
          </div>
          <div className="final__col">
            <span className="col-label">YEAR</span>
            <span className="final__val">{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      <style>{`
        .final {
          position: relative;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 120px 0;
          text-align: center;
          border-top: 1px solid var(--line);
        }
        .final .shell {
          display: flex; flex-direction: column; align-items: center; gap: 36px;
        }

        .final__chapter {
          display: flex; align-items: center;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
        }
        .final__chapter.is-in { opacity: 1; transform: none; }

        .final__brand-block {
          display: flex; align-items: center; gap: 24px;
          margin-top: 16px;
        }
        .final__logo {
          opacity: 0; transform: scale(0.85);
          transition: opacity 0.9s var(--ease-out) 0.2s, transform 0.9s var(--ease-out) 0.2s;
        }
        .final__logo.is-in { opacity: 1; transform: scale(1); }
        .final__logo img {
          filter: drop-shadow(0 0 30px rgba(255,91,31,0.45));
        }

        .final__brand-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          letter-spacing: 0.45em;
          color: var(--text-1);
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.9s var(--ease-out) 0.3s, transform 0.9s var(--ease-out) 0.3s;
        }
        .final__brand-text.is-in { opacity: 1; transform: none; }

        .final__title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(3rem, 11vw, 11rem);
          letter-spacing: -0.04em;
          line-height: 0.92;
          text-transform: uppercase;
          color: var(--text-1);
          display: flex; flex-direction: column;
        }
        .final__title .reveal-mask { display: block; }
        .final__title .reveal-mask > span {
          display: block;
          transform: translateY(110%);
          transition: transform 1.2s var(--ease-out);
        }
        .final__title.is-in .reveal-mask:nth-child(1) > span { transform: translateY(0); transition-delay: 0.4s; }
        .final__title.is-in .reveal-mask:nth-child(2) > span { transform: translateY(0); transition-delay: 0.55s; }
        .final__title-accent {
          color: var(--accent-1);
          text-transform: none;
          font-style: italic;
          font-weight: 300;
        }

        .final__colophon {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding-top: 40px;
          margin-top: 20px;
          border-top: 1px solid var(--line);
          width: 100%;
          max-width: 600px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 1s var(--ease-out) 0.8s, transform 1s var(--ease-out) 0.8s;
        }
        .final__colophon.is-in { opacity: 1; transform: none; }
        .final__col {
          display: flex; flex-direction: column; gap: 6px;
        }
        .final__val {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--accent-1);
        }

        @media (max-width: 600px) {
          .final__brand-block { flex-direction: column; gap: 14px; }
          .final__colophon { grid-template-columns: repeat(2, 1fr); }
        }
        @media (prefers-reduced-motion: reduce) {
          .final__chapter, .final__logo, .final__brand-text, .final__title, .final__colophon { opacity: 1; transform: none; }
          .final__title .reveal-mask > span { transform: none; }
        }
      `}</style>
    </section>
  );
}
