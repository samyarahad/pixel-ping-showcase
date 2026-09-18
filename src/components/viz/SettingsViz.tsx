/**
 * SettingsViz — editorial settings panel visualization.
 * Profile + Appearance theme switcher + General form + Change password.
 */
import { useInViewport } from "../../hooks/useInViewport";

const THEMES = [
  { name: "PIXEL NEON",  c: "#ff5b1f", active: true },
  { name: "DARK",        c: "#1a1a1f", active: false },
  { name: "LIGHT",       c: "#f5f1e8", active: false },
  { name: "MIDNIGHT",    c: "#0a0a2a", active: false },
];

const AVATARS = ["#ff5b1f", "#c8c8cc", "#6ee7a0", "#ff8a4c", "#9a958a"];

export function SettingsViz() {
  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.05, rootMargin: "100px" });

  return (
    <div className="viz" data-viz="settings" ref={ref}>
      <div className="viz__head">
        <span className="viz__head-num">FIG. 14</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">SETTINGS / PERSONAL</span>
      </div>
      <div className="viz__body">
        <div className="settings__grid">
          {/* Profile */}
          <div className={`settings__panel ${inView ? "is-in" : ""}`}>
            <div className="settings__panel-head">PROFILE</div>
            <div className="settings__avatars">
              {AVATARS.map((c, i) => (
                <div
                  className={`settings__avatar ${i === 0 ? "is-active" : ""}`}
                  key={i}
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="settings__field">
              <span className="settings__field-label">USERNAME</span>
              <span className="settings__field-val">admin</span>
            </div>
            <div className="settings__field">
              <span className="settings__field-label">EMAIL</span>
              <span className="settings__field-val">admin@pp.local</span>
            </div>
          </div>

          {/* Appearance */}
          <div className={`settings__panel ${inView ? "is-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <div className="settings__panel-head">APPEARANCE</div>
            <div className="settings__themes">
              {THEMES.map((t, i) => (
                <div
                  className={`settings__theme ${t.active ? "is-active" : ""}`}
                  key={t.name}
                  style={{
                    animationDelay: `${i * 80}ms`,
                    animationPlayState: inView ? "running" : "paused",
                  } as React.CSSProperties}
                >
                  <span className="settings__theme-swatch" style={{ background: t.c }} />
                  <span className="settings__theme-name">{t.name}</span>
                  {t.active && <span className="settings__theme-check">✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* General */}
          <div className={`settings__panel ${inView ? "is-in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="settings__panel-head">GENERAL</div>
            <div className="settings__field">
              <span className="settings__field-label">LANGUAGE</span>
              <span className="settings__field-val">ENGLISH ▾</span>
            </div>
            <div className="settings__field">
              <span className="settings__field-label">PANEL NAME</span>
              <span className="settings__field-val">Pixel & Ping</span>
            </div>
            <div className="settings__field">
              <span className="settings__field-label">TIMEZONE</span>
              <span className="settings__field-val">UTC ▾</span>
            </div>
          </div>

          {/* Change password */}
          <div className={`settings__panel ${inView ? "is-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
            <div className="settings__panel-head">CHANGE PASSWORD</div>
            <div className="settings__pwd-field">
              <span className="settings__pwd-label">CURRENT</span>
              <span className="settings__pwd-dots">••••••••</span>
            </div>
            <div className="settings__pwd-field">
              <span className="settings__pwd-label">NEW</span>
              <span className="settings__pwd-dots">••••••••</span>
            </div>
            <div className="settings__pwd-action">UPDATE PASSWORD →</div>
          </div>
        </div>
      </div>
      <div className="viz__caption">Profile, appearance, language, panel name, and password</div>

      <style>{`
        .settings__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .settings__panel {
          padding: 16px;
          background: rgba(245,241,232,0.02);
          border: 1px solid var(--line);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
        }
        .settings__panel.is-in { opacity: 1; transform: none; }
        .settings__panel-head {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.24em;
          color: var(--accent-1);
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--line);
        }

        .settings__avatars {
          display: flex; gap: 8px;
          margin-bottom: 14px;
        }
        .settings__avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          opacity: 0.6;
          transition: opacity 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .settings__avatar.is-active {
          opacity: 1;
          transform: scale(1.1);
          box-shadow: 0 0 0 2px var(--bg-1), 0 0 0 3px currentColor;
        }
        .settings__avatar:hover { opacity: 1; }

        .settings__field {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--line);
        }
        .settings__field:last-child { border-bottom: 0; }
        .settings__field-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--text-3);
        }
        .settings__field-val {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-1);
        }

        .settings__themes {
          display: flex; flex-direction: column;
          gap: 6px;
        }
        .settings__theme {
          display: grid;
          grid-template-columns: 24px 1fr 16px;
          align-items: center; gap: 10px;
          padding: 8px 10px;
          border: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-2);
          opacity: 0;
          transform: translateX(-8px);
          animation: settings-theme-in 0.5s var(--ease-out) forwards;
        }
        @keyframes settings-theme-in { to { opacity: 1; transform: none; } }
        .settings__theme.is-active {
          border-color: var(--accent-1);
          background: rgba(255,91,31,0.06);
          color: var(--text-1);
        }
        .settings__theme-swatch {
          width: 16px; height: 16px;
          border: 1px solid var(--line-strong);
        }
        .settings__theme-name { letter-spacing: 0.16em; }
        .settings__theme-check { color: var(--accent-1); }

        .settings__pwd-field {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--line);
        }
        .settings__pwd-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--text-3);
        }
        .settings__pwd-dots {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-1);
          letter-spacing: 0.1em;
        }
        .settings__pwd-action {
          margin-top: 12px;
          padding: 10px;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--bg-0);
          background: var(--accent-1);
          transition: transform 0.3s;
        }
        .settings__pwd-action:hover { transform: translateY(-1px); }

        @media (max-width: 700px) {
          .settings__grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .settings__panel, .settings__theme { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
