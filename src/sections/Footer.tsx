/**
 * Footer — editorial colophon.
 * Logo, brand, one-line description, social links, minimal CTA strip.
 */
import { BRAND, SOCIAL } from "../data/content";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand-block">
            <picture>
              <source srcSet="./logo/pixel-ping-logo.webp" type="image/webp" />
              <img src="./logo/pixel-ping-logo.png" alt="Pixel & Ping logo" width={56} height={56} />
            </picture>
            <div>
              <div className="footer__brand-name">{BRAND.name}</div>
              <div className="footer__tagline">{BRAND.tagline}</div>
            </div>
          </div>

          <nav aria-label="Social links" className="footer__social">
            <a
              className="footer__social-link"
              href={SOCIAL.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pixel & Ping on Telegram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21.94 4.6L18.6 19.05c-.25 1.1-.92 1.37-1.86.85l-5.13-3.78-2.47 2.38c-.27.27-.5.5-1.02.5l.36-5.2L17.6 6.4c.41-.37-.09-.57-.64-.2L6.46 13.05l-5.04-1.57c-1.1-.34-1.12-1.1.23-1.62l19.69-7.59c.91-.34 1.71.21 1.41 1.86z" fill="currentColor"/>
              </svg>
              <span>TELEGRAM</span>
              <span className="footer__arrow">↗</span>
            </a>
            <a
              className="footer__social-link"
              href={SOCIAL.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pixel & Ping on YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M23 7.5a3 3 0 0 0-2.1-2.12C19.06 5 12 5 12 5s-7.06 0-8.9.38A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.12C4.94 19 12 19 12 19s7.06 0 8.9-.38A3 3 0 0 0 23 16.5 31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.75 15.5v-7l6 3.5-6 3.5z" fill="currentColor"/>
              </svg>
              <span>YOUTUBE</span>
              <span className="footer__arrow">↗</span>
            </a>
          </nav>
        </div>

        <div className="footer__bottom">
          <span className="col-label">© {new Date().getFullYear()} PIXEL &amp; PING</span>
          <span className="footer__sep" />
          <span className="col-label">SHOWCASE EDITION</span>
          <span className="footer__sep" />
          <span className="col-label">VOL. 01</span>
          <span className="footer__sep" />
          <span className="col-label footer__set">SET IN INTER · SPACE GROTESK · FRAUNCES · JETBRAINS MONO</span>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          padding: 80px 0 40px;
          border-top: 1px solid var(--line);
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%);
        }
        .footer__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          flex-wrap: wrap;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--line);
        }
        .footer__brand-block {
          display: flex; align-items: center; gap: 18px;
        }
        .footer__brand-block img {
          filter: drop-shadow(0 0 20px rgba(255,91,31,0.4));
        }
        .footer__brand-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.35em;
          color: var(--text-1);
        }
        .footer__tagline {
          font-size: 13px;
          color: var(--text-2);
          margin-top: 4px;
          max-width: 32ch;
        }

        .footer__social {
          display: flex; gap: 12px;
          flex-wrap: wrap;
        }
        .footer__social-link {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 18px;
          border: 1px solid var(--line-strong);
          color: var(--text-2);
          font-family: var(--font-mono);
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em;
          transition: all 0.35s var(--ease);
        }
        .footer__social-link:hover {
          color: var(--text-1);
          border-color: var(--accent-1);
          background: rgba(255,91,31,0.06);
          transform: translateY(-2px);
        }
        .footer__arrow {
          color: var(--accent-1);
          transition: transform 0.3s;
        }
        .footer__social-link:hover .footer__arrow {
          transform: translate(2px, -2px);
        }

        .footer__bottom {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          padding-top: 32px;
        }
        .footer__sep {
          width: 4px; height: 4px;
          background: var(--text-3);
          border-radius: 50%;
        }
        .footer__set { color: var(--text-3); }

        @media (max-width: 720px) {
          .footer__top { flex-direction: column; }
        }
      `}</style>
    </footer>
  );
}
