/**
 * FinalScene — closing statement before the footer.
 * Darkness returns. Pixel & Ping logo remains. Final headline.
 */
import { useReveal } from "../utils";

export function FinalScene() {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.4 });
  return (
    <section
      ref={ref}
      id="final"
      className={`section final ${visible ? "is-visible" : ""}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          className={`final__logo ${visible ? "is-in" : ""}`}
          style={{
            marginBottom: 40,
            display: "inline-block",
          }}
        >
          <picture>
            <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
            <img
              src="./logo/pixel-ping-logo.png"
              alt=""
              width={96}
              height={96}
              style={{ filter: "drop-shadow(0 0 50px rgba(110,139,255,0.55))" }}
            />
          </picture>
        </div>

        <div
          className={`final__brand ${visible ? "is-in" : ""}`}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.55em",
            color: "var(--accent-3)",
            marginBottom: 32,
          }}
        >
          PIXEL &amp; PING
        </div>

        <h2
          className={`h-display h-1 final__title ${visible ? "is-in" : ""}`}
          style={{ margin: 0, lineHeight: 1.05 }}
        >
          One view.
          <br />
          <span style={{ color: "var(--accent-3)" }}>One network.</span>
        </h2>
      </div>

      <style>{`
        .final__logo, .final__brand, .final__title {
          opacity: 0; transform: translateY(24px);
          transition: opacity 1.4s var(--ease-out), transform 1.4s var(--ease-out);
        }
        .final__logo.is-in   { opacity: 1; transform: none; transition-delay: 0.1s; }
        .final__brand.is-in  { opacity: 1; transform: none; transition-delay: 0.3s; }
        .final__title.is-in  { opacity: 1; transform: none; transition-delay: 0.5s; }

        @media (prefers-reduced-motion: reduce) {
          .final__logo, .final__brand, .final__title { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
