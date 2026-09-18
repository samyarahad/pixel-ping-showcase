/**
 * Navigation — editorial name-treatment top bar.
 * - Kinetic typography on load (letters slide up sequentially)
 * - Becomes minimal sticky on scroll
 * - Mobile: full-screen overlay menu
 */
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../data/content";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Split brand into chars for kinetic typography
  const brandChars = "PIXEL & PING".split("");

  return (
    <>
      <header
        className={`nav ${scrolled ? "nav--scrolled" : ""} ${mounted ? "is-mounted" : ""}`}
        role="banner"
      >
        <div className="shell nav__inner">
          <a href="#hero" className="nav__brand" aria-label="Pixel & Ping — Home">
            <picture>
              <source srcSet="./logo/pixel-ping-logo-nav.webp" type="image/webp" />
              <img
                src="./logo/pixel-ping-logo-nav.png"
                alt=""
                width={28}
                height={28}
                className="nav__logo"
                loading="eager"
                decoding="async"
              />
            </picture>
            <span className="nav__brand-text" aria-label="PIXEL & PING">
              {brandChars.map((ch, i) => (
                <span
                  key={i}
                  className="nav__char"
                  style={{ animationDelay: `${i * 35}ms` }}
                  aria-hidden="true"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </a>

          <nav className="nav__menu" aria-label="Primary">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav__link"
                style={{ animationDelay: `${400 + i * 80}ms` }}
              >
                <span className="nav__link-num">0{i + 1}</span>
                <span className="nav__link-label">{item.label}</span>
              </a>
            ))}
          </nav>

          <button
            className="nav__burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /> <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div className={`nav__overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu">
        <div className="nav__overlay-inner">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav__overlay-link"
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="nav__overlay-num">0{i + 1}</span>
              <span className="nav__overlay-label">{item.label}</span>
            </a>
          ))}
          <div className="nav__overlay-foot">
            <span className="col-label">PIXEL & PING — SHOWCASE</span>
          </div>
        </div>
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.5s var(--ease), border-color 0.5s, padding 0.5s;
          border-bottom: 1px solid transparent;
          padding: 18px 0;
        }
        .nav--scrolled {
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          border-bottom-color: var(--line);
          padding: 12px 0;
        }

        .nav__inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px;
        }

        .nav__brand {
          display: inline-flex; align-items: center; gap: 14px;
        }
        .nav__logo {
          filter: drop-shadow(0 0 12px rgba(255, 91, 31, 0.5));
          opacity: 0;
          transform: scale(0.7) rotate(-12deg);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
        }
        .is-mounted .nav__logo { opacity: 1; transform: scale(1) rotate(0deg); transition-delay: 0.1s; }

        .nav__brand-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.32em;
          color: var(--text-1);
          display: inline-flex;
        }
        .nav__char {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px) rotate(8deg);
          animation: nav-char-in 0.7s var(--ease-out) forwards;
        }
        @keyframes nav-char-in {
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        .nav__menu {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .nav__link {
          display: inline-flex; align-items: baseline; gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          color: var(--text-2);
          position: relative;
          padding: 6px 0;
          opacity: 0;
          transform: translateY(-8px);
          animation: nav-link-in 0.7s var(--ease-out) forwards;
          transition: color 0.3s;
        }
        @keyframes nav-link-in { to { opacity: 1; transform: translateY(0); } }
        .nav__link-num { color: var(--accent-1); font-size: 9px; }
        .nav__link-label { position: relative; }
        .nav__link-label::after {
          content: "";
          position: absolute; left: 0; bottom: -2px;
          width: 100%; height: 1px;
          background: var(--accent-1);
          transform: scaleX(0); transform-origin: 0 0;
          transition: transform 0.35s var(--ease);
        }
        .nav__link:hover { color: var(--text-1); }
        .nav__link:hover .nav__link-label::after { transform: scaleX(1); }

        .nav__burger {
          display: none; flex-direction: column; gap: 5px;
          padding: 8px;
        }
        .nav__burger span {
          display: block; width: 22px; height: 1.5px;
          background: var(--text-1);
          transition: transform 0.35s var(--ease), opacity 0.35s;
        }
        .nav__burger[aria-expanded="true"] span:nth-child(1) { transform: translateY(3.25px) rotate(45deg); }
        .nav__burger[aria-expanded="true"] span:nth-child(2) { transform: translateY(-3.25px) rotate(-45deg); }

        .nav__overlay {
          position: fixed; inset: 0; z-index: 99;
          background: var(--bg-0);
          opacity: 0; pointer-events: none;
          transition: opacity 0.45s var(--ease);
        }
        .nav__overlay.is-open { opacity: 1; pointer-events: auto; }
        .nav__overlay-inner {
          height: 100%;
          padding: 100px 32px 32px;
          display: flex; flex-direction: column;
          gap: 4px;
        }
        .nav__overlay.is-open .nav__overlay-link {
          opacity: 1; transform: translateY(0);
        }
        .nav__overlay-link {
          display: flex; align-items: baseline; gap: 16px;
          padding: 18px 0;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.8rem, 8vw, 3rem);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: var(--text-1);
          border-bottom: 1px solid var(--line);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out), color 0.3s;
        }
        .nav__overlay-link:hover { color: var(--accent-1); }
        .nav__overlay-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-1);
          letter-spacing: 0.1em;
        }
        .nav__overlay-foot { margin-top: auto; padding-top: 32px; }

        @media (max-width: 880px) {
          .nav__menu { display: none; }
          .nav__burger { display: flex; }
        }
        @media (min-width: 881px) {
          .nav__overlay { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav__char, .nav__link { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
