/**
 * UsersViz — editorial user management visualization.
 * Search bar + filter chip + user rows with avatars + empty-state CTA.
 * Pure SVG/CSS, no real data.
 */
import { useInViewport } from "../../hooks/useInViewport";

const ROWS = [
  { id: "001", name: "admin",       role: "OWNER",  c: "#ff5b1f" },
  { id: "002", name: "user_alfa",   role: "USER",   c: "#c8c8cc" },
  { id: "003", name: "user_bravo",  role: "USER",   c: "#c8c8cc" },
  { id: "004", name: "user_charlie",role: "USER",   c: "#c8c8cc" },
  { id: "005", name: "user_delta",  role: "USER",   c: "#c8c8cc" },
];

export function UsersViz() {
  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.05, rootMargin: "100px" });

  return (
    <div className="viz" data-viz="users" ref={ref}>
      <div className="viz__head">
        <span className="viz__head-num">FIG. 02</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">USERS / DIRECTORY</span>
      </div>
      <div className="viz__body">
        {/* Toolbar */}
        <div className="users__toolbar">
          <div className="users__search">
            <span className="users__search-icon" aria-hidden="true">⌕</span>
            <span className="users__search-placeholder">Search users…</span>
            <span className="users__search-cursor" aria-hidden="true" />
          </div>
          <div className="users__filter">FILTER</div>
          <div className="users__create">+ CREATE USER</div>
        </div>

        {/* Table head */}
        <div className="users__head-row">
          <span className="users__col-id">ID</span>
          <span className="users__col-name">NAME</span>
          <span className="users__col-role">ROLE</span>
          <span className="users__col-status">STATUS</span>
        </div>

        {/* User rows */}
        <div className="users__rows">
          {ROWS.map((r, i) => (
            <div
              className="users__row"
              key={r.id}
              style={{
                animationDelay: `${i * 90}ms`,
                animationPlayState: inView ? "running" : "paused",
              } as React.CSSProperties}
            >
              <span className="users__cell-id">{r.id}</span>
              <span className="users__cell-name">
                <span className="users__avatar" style={{ background: r.c }} />
                {r.name}
              </span>
              <span className="users__cell-role" style={{ color: r.c, borderColor: r.c }}>{r.role}</span>
              <span className="users__cell-status">
                <span className="users__status-dot" />
                ACTIVE
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="viz__caption">A focused interface for creating, filtering, and finding users</div>

      <style>{`
        .users__toolbar {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 8px;
          margin-bottom: 14px;
        }
        .users__search {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 12px;
          background: rgba(245,241,232,0.03);
          border: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-3);
        }
        .users__search-icon { color: var(--accent-1); }
        .users__search-cursor {
          width: 6px; height: 12px;
          background: var(--accent-1);
          animation: users-blink 1s steps(2) infinite;
        }
        @keyframes users-blink { 50% { opacity: 0; } }
        .users__filter, .users__create {
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          border: 1px solid var(--line);
          color: var(--text-2);
        }
        .users__create {
          color: var(--bg-0);
          background: var(--accent-1);
          border-color: var(--accent-1);
        }

        .users__head-row {
          display: grid;
          grid-template-columns: 60px 1fr 100px 100px;
          gap: 12px;
          padding: 10px 12px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.22em;
          color: var(--text-3);
          border-bottom: 1px solid var(--line);
        }

        .users__rows {
          display: flex; flex-direction: column;
        }
        .users__row {
          display: grid;
          grid-template-columns: 60px 1fr 100px 100px;
          gap: 12px;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-2);
          opacity: 0;
          transform: translateX(-10px);
          animation: users-row-in 0.6s var(--ease-out) forwards;
          transition: background 0.3s;
        }
        .users__row:hover { background: rgba(255,91,31,0.04); }
        @keyframes users-row-in { to { opacity: 1; transform: none; } }

        .users__cell-id { color: var(--accent-1); font-size: 10px; }
        .users__cell-name {
          display: flex; align-items: center; gap: 10px;
          color: var(--text-1);
        }
        .users__avatar {
          width: 18px; height: 18px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .users__cell-role {
          padding: 2px 8px;
          border: 1px solid;
          font-size: 9px;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.1em;
          justify-self: start;
        }
        .users__cell-status {
          display: flex; align-items: center; gap: 6px;
          font-size: 9px;
          color: #6ee7a0;
          letter-spacing: 0.1em;
        }
        .users__status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6ee7a0;
          box-shadow: 0 0 6px #6ee7a0;
        }

        @media (max-width: 600px) {
          .users__toolbar { grid-template-columns: 1fr; }
          .users__head-row, .users__row {
            grid-template-columns: 50px 1fr 80px;
          }
          .users__col-status, .users__cell-status { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .users__row { animation: none; opacity: 1; transform: none; }
          .users__search-cursor { animation: none; }
        }
      `}</style>
    </div>
  );
}
