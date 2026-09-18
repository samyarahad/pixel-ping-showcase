/**
 * NetworkScene — bridge scene between the hero and the first product section.
 * Headline: "Everything connected."
 */
import { useReveal } from "../utils";

export function NetworkScene() {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.35 });
  return (
    <section
      ref={ref}
      id="network"
      className={`section network-scene ${visible ? "is-visible" : ""}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="shell" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className={`eyebrow ${visible ? "is-visible" : ""}`} style={{ marginBottom: 24, justifyContent: "center", display: "inline-flex" }}>
          The Network
        </div>

        <h2 className={`h-display h-1 ${visible ? "is-visible" : ""}`} style={{ margin: "0 0 28px" }}>
          Everything <span style={{ color: "var(--accent-3)" }}>connected.</span>
        </h2>

        <p className={`lead reveal ${visible ? "is-visible" : ""}`} style={{ margin: "0 auto", textAlign: "center" }}>
          One place to understand the moving parts of your network.
        </p>
      </div>

      <style>{`
        .network-scene h2, .network-scene .lead {
          opacity: 0; transform: translateY(24px);
          transition: opacity 1.4s var(--ease-out), transform 1.4s var(--ease-out);
        }
        .network-scene.is-visible h2 { opacity: 1; transform: none; }
        .network-scene.is-visible .lead { opacity: 1; transform: none; transition-delay: 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .network-scene h2, .network-scene .lead { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
