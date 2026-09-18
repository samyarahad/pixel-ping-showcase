/**
 * NetworkScene — bridge scene between hero and capabilities.
 * Editorial chapter divider style: oversized number + serif italic + mono label.
 */
import { useReveal } from "../utils";

export function NetworkScene() {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.35 });
  return (
    <section
      ref={ref}
      id="network"
      className={`network-scene ${visible ? "is-visible" : ""}`}
    >
      <div className="shell">
        <div className="network-scene__inner">
          <div className={`network-scene__chapter ${visible ? "is-in" : ""}`}>
            <span className="num-tag">CH. 02</span>
            <span className="rule-strong" style={{ width: 80, margin: "0 16px" }} />
            <span className="col-label">THE NETWORK</span>
          </div>

          <h2 className={`network-scene__title ${visible ? "is-in" : ""}`}>
            <span className="reveal-mask"><span>Everything</span></span>
            <span className="reveal-mask">
              <span className="h-serif network-scene__title-accent">connected.</span>
            </span>
          </h2>

          <div className={`network-scene__meta ${visible ? "is-in" : ""}`}>
            <p className="lead" style={{ maxWidth: "46ch" }}>
              One place to understand the moving parts of your network.
            </p>
            <div className="network-scene__stats">
              <div className="network-scene__stat">
                <div className="network-scene__stat-num">01</div>
                <div className="network-scene__stat-label">Dashboard</div>
              </div>
              <div className="network-scene__stat">
                <div className="network-scene__stat-num">14</div>
                <div className="network-scene__stat-label">Surfaces</div>
              </div>
              <div className="network-scene__stat">
                <div className="network-scene__stat-num">∞</div>
                <div className="network-scene__stat-label">Connections</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .network-scene {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 100px 0;
        }
        .network-scene__inner {
          display: flex; flex-direction: column;
          gap: 40px;
        }
        .network-scene__chapter {
          display: flex; align-items: center;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
        }
        .network-scene__chapter.is-in { opacity: 1; transform: none; }

        .network-scene__title {
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
        .network-scene__title .reveal-mask { display: block; }
        .network-scene__title .reveal-mask > span {
          display: block;
          transform: translateY(110%);
          transition: transform 1.2s var(--ease-out);
        }
        .network-scene__title.is-in .reveal-mask:nth-child(1) > span { transform: translateY(0); }
        .network-scene__title.is-in .reveal-mask:nth-child(2) > span { transform: translateY(0); transition-delay: 0.2s; }
        .network-scene__title-accent {
          color: var(--accent-1);
          text-transform: none;
          font-style: italic;
          font-weight: 300;
        }

        .network-scene__meta {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: end;
          opacity: 0; transform: translateY(20px);
          transition: opacity 1s var(--ease-out) 0.4s, transform 1s var(--ease-out) 0.4s;
        }
        .network-scene__meta.is-in { opacity: 1; transform: none; }

        .network-scene__stats {
          display: flex; gap: 32px;
        }
        .network-scene__stat {
          display: flex; flex-direction: column;
          border-left: 1px solid var(--line-strong);
          padding-left: 16px;
        }
        .network-scene__stat-num {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700;
          color: var(--accent-1);
          line-height: 1;
        }
        .network-scene__stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-3);
          margin-top: 6px;
        }

        @media (max-width: 720px) {
          .network-scene__meta { grid-template-columns: 1fr; }
          .network-scene__stats { gap: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .network-scene__chapter, .network-scene__title, .network-scene__meta { opacity: 1; transform: none; }
          .network-scene__title .reveal-mask > span { transform: none; }
        }
      `}</style>
    </section>
  );
}
