/**
 * Navigation — minimal premium top bar.
 * Becomes transparent at the top, gains a subtle glass tint on scroll.
 * Mobile: compact elegant menu.
 */
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../data/content";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`nav ${scrolled ? "nav--scrolled" : ""}`}
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.5s var(--ease), border-color 0.5s var(--ease), backdrop-filter 0.5s",
          borderBottom: "1px solid transparent",
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <a href="#hero" className="nav__brand" aria-label="Pixel & Ping — Home">
            <img
              src="./logo/pixel-ping-logo-nav.png"
              alt=""
              width={28}
              height={28}
              style={{ filter: "drop-shadow(0 0 10px rgba(110,139,255,0.6))" }}
            />
            <span className="nav__brand-text">PIXEL &amp; PING</span>
          </a>

          <nav
            className="nav__menu"
            aria-label="Primary"
            style={{ display: "flex", gap: 36 }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav__link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="nav__burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /> <span /> <span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`nav__drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="nav__drawer-inner glass">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav__drawer-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .nav--scrolled {
          background: rgba(5, 7, 13, 0.55);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border-bottom-color: var(--line) !important;
        }
        .nav__brand {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--font-display);
          font-weight: 600; letter-spacing: 0.18em;
          font-size: 13px; color: var(--text-1);
        }
        .nav__brand-text { white-space: nowrap; }
        .nav__link {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.22em; color: var(--text-2);
          position: relative; padding: 6px 2px;
          transition: color 0.3s var(--ease);
        }
        .nav__link::after {
          content: ""; position: absolute; left: 0; bottom: 0;
          width: 100%; height: 1px; background: var(--accent-1);
          transform: scaleX(0); transform-origin: 0 0;
          transition: transform 0.4s var(--ease);
        }
        .nav__link:hover { color: var(--text-1); }
        .nav__link:hover::after { transform: scaleX(1); }

        .nav__burger {
          display: none; flex-direction: column; gap: 5px;
          padding: 8px; background: transparent;
        }
        .nav__burger span {
          width: 22px; height: 1.5px; background: var(--text-1);
          transition: transform 0.3s var(--ease), opacity 0.3s;
        }
        .nav__burger[aria-expanded="true"] span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .nav__burger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
        .nav__burger[aria-expanded="true"] span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        .nav__drawer {
          position: fixed; inset: 0; z-index: 99;
          background: rgba(5,7,13,0.85);
          backdrop-filter: blur(20px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.5s var(--ease);
        }
        .nav__drawer.is-open { opacity: 1; pointer-events: auto; }
        .nav__drawer-inner {
          position: absolute; top: 84px; right: 16px; left: 16px;
          padding: 12px 20px; border-radius: 18px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .nav__drawer-link {
          padding: 14px 6px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.24em;
          color: var(--text-1);
          border-bottom: 1px solid var(--line);
        }
        .nav__drawer-link:last-child { border-bottom: 0; }

        @media (max-width: 880px) {
          .nav__menu { display: none !important; }
          .nav__burger { display: flex; }
        }
        @media (min-width: 881px) {
          .nav__drawer { display: none; }
        }
      `}</style>
    </>
  );
}
