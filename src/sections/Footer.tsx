/**
 * Footer — minimal premium footer.
 * Logo, brand, one-line description, social links.
 * No CTAs, no panel link, no login.
 */
import { BRAND, SOCIAL } from "../data/content";

export function Footer() {
  return (
    <footer
      className="footer"
      role="contentinfo"
      style={{
        position: "relative",
        padding: "80px 24px 60px",
        borderTop: "1px solid var(--line)",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(5,7,13,0.7) 100%)",
      }}
    >
      <div
        className="shell"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
        }}
      >
        <picture>
          <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
          <img
            src="./logo/pixel-ping-logo.png"
            alt="Pixel & Ping logo"
            width={56}
            height={56}
            style={{ filter: "drop-shadow(0 0 24px rgba(110,139,255,0.45))" }}
          />
        </picture>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "0.35em",
            fontSize: 13,
            color: "var(--text-1)",
          }}
        >
          {BRAND.name}
        </div>
        <p
          className="muted"
          style={{
            margin: 0,
            fontSize: 13,
            maxWidth: "44ch",
            lineHeight: 1.55,
          }}
        >
          {BRAND.tagline}
        </p>

        <nav aria-label="Social links" style={{ display: "flex", gap: 28, marginTop: 8 }}>
          <a
            className="footer__social"
            href={SOCIAL.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pixel & Ping on Telegram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21.94 4.6L18.6 19.05c-.25 1.1-.92 1.37-1.86.85l-5.13-3.78-2.47 2.38c-.27.27-.5.5-1.02.5l.36-5.2L17.6 6.4c.41-.37-.09-.57-.64-.2L6.46 13.05l-5.04-1.57c-1.1-.34-1.12-1.1.23-1.62l19.69-7.59c.91-.34 1.71.21 1.41 1.86z"
                fill="currentColor"
              />
            </svg>
            <span>Telegram</span>
          </a>
          <a
            className="footer__social"
            href={SOCIAL.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pixel & Ping on YouTube"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M23 7.5a3 3 0 0 0-2.1-2.12C19.06 5 12 5 12 5s-7.06 0-8.9.38A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.12C4.94 19 12 19 12 19s7.06 0 8.9-.38A3 3 0 0 0 23 16.5 31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.75 15.5v-7l6 3.5-6 3.5z"
                fill="currentColor"
              />
            </svg>
            <span>YouTube</span>
          </a>
        </nav>

        <div
          style={{
            marginTop: 32,
            fontSize: 11,
            color: "var(--text-3)",
            letterSpacing: "0.15em",
          }}
        >
          © {new Date().getFullYear()} PIXEL &amp; PING · SHOWCASE
        </div>
      </div>

      <style>{`
        .footer__social {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px;
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--text-2);
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.12em;
          transition: all 0.35s var(--ease);
        }
        .footer__social:hover {
          color: var(--text-1);
          border-color: var(--accent-1);
          box-shadow: 0 0 24px -8px var(--accent-glow);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
