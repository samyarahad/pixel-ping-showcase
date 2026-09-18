/**
 * NotificationsViz — editorial stacked notification cards.
 * Type-led, sharp corners, color-coded by type.
 */
import { useEffect, useRef, useState } from "react";

const NOTES = [
  { icon: "✓", title: "Server online",       body: "edge-01.pp  registered",         c: "#6ee7a0" },
  { icon: "⚠", title: "High traffic",        body: "port :443  82% load",             c: "#ff8a4c" },
  { icon: "↻", title: "Failover triggered",  body: "primary → alternate",             c: "#ff5b1f" },
  { icon: "✓", title: "Backup complete",     body: "config snapshot saved",           c: "#6ee7a0" },
  { icon: "ℹ", title: "New endpoint",        body: "EP-7  added to clean pool",       c: "#f5f1e8" },
  { icon: "⚠", title: "Slow response",       body: "EP-2  480ms",                     c: "#ff8a4c" },
];

export function NotificationsViz() {
  const [queue, setQueue] = useState<number[]>([0, 1, 2]);
  const idxRef = useRef(3);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => {
      const next = idxRef.current % NOTES.length;
      idxRef.current += 1;
      setQueue((prev) => [...prev.slice(-2), next]);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="viz" data-viz="notifications">
      <div className="viz__head">
        <span className="viz__head-num">FIG. 13</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">NOTIFICATIONS / STACK</span>
      </div>
      <div className="viz__body">
        <div className="notes__stack">
          {queue.map((noteIdx, pos) => {
            const n = NOTES[noteIdx];
            const isFront = pos === queue.length - 1;
            return (
              <div
                className={`notes__card ${isFront ? "notes__card--front" : ""}`}
                key={`${pos}-${noteIdx}`}
                style={{
                  "--c": n.c,
                  transform: `translateY(${(queue.length - 1 - pos) * -10}px) scale(${1 - (queue.length - 1 - pos) * 0.05})`,
                  opacity: 1 - (queue.length - 1 - pos) * 0.25,
                  zIndex: pos,
                } as React.CSSProperties}
              >
                <div className="notes__num">0{pos + 1}</div>
                <div className="notes__icon" style={{ background: n.c, color: "#0a0a0c" }}>{n.icon}</div>
                <div className="notes__body">
                  <div className="notes__title">{n.title}</div>
                  <div className="notes__text">{n.body}</div>
                </div>
                <div className="notes__time">NOW</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="viz__caption">Stay informed — only the moments that matter</div>

      <style>{`
        .notes__stack {
          position: relative;
          height: 240px;
          display: flex; align-items: flex-end; justify-content: center;
          padding: 16px 0;
        }
        .notes__card {
          position: absolute;
          bottom: 16px;
          left: 50%; transform-origin: bottom center;
          margin-left: -200px;
          width: 400px; max-width: 92%;
          display: grid;
          grid-template-columns: 24px 36px 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 14px 16px;
          background: rgba(10, 10, 12, 0.92);
          border: 1px solid var(--line);
          border-left: 3px solid var(--c);
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.7);
          animation: notes-enter 0.5s var(--ease-out);
        }
        @keyframes notes-enter {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; }
        }
        .notes__num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-1);
          letter-spacing: 0.15em;
        }
        .notes__icon {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 16px;
        }
        .notes__title {
          font-family: var(--font-display);
          font-size: 13px; font-weight: 700;
          color: var(--text-1);
          letter-spacing: 0.02em;
        }
        .notes__text {
          font-family: var(--font-mono);
          font-size: 11px; color: var(--text-2);
          margin-top: 2px;
        }
        .notes__time {
          font-family: var(--font-mono);
          font-size: 10px; color: var(--text-3);
          letter-spacing: 0.15em;
        }
        @media (max-width: 500px) {
          .notes__card { width: 88%; margin-left: -44%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .notes__card { animation: none; }
        }
      `}</style>
    </div>
  );
}
