/**
 * LogsViz — cinematic stream of system events.
 * Auto-scrolling log lines, paused for reduced motion.
 */
import { useEffect, useRef, useState } from "react";

const SAMPLE = [
  { lvl: "INFO",  msg: "edge-01.pp  handshake established",  c: "#6e8bff" },
  { lvl: "OK",    msg: "user:admin  authenticated",          c: "#6ee7a0" },
  { lvl: "INFO",  msg: "endpoint  EP-3  reachable",          c: "#6e8bff" },
  { lvl: "WARN",  msg: "endpoint  EP-7  slow response 480ms",c: "#f6c945" },
  { lvl: "INFO",  msg: "config  applied  v1.1.1",            c: "#6e8bff" },
  { lvl: "OK",    msg: "failover  primary → alternate",      c: "#6ee7a0" },
  { lvl: "INFO",  msg: "traffic  4.2 MB/s  peak",            c: "#6e8bff" },
  { lvl: "WARN",  msg: "port :443  high load",               c: "#f6c945" },
  { lvl: "INFO",  msg: "scanner  256 IPs  clean",            c: "#6e8bff" },
  { lvl: "OK",    msg: "backup  completed",                  c: "#6ee7a0" },
  { lvl: "INFO",  msg: "cloudflare  api  sync",              c: "#6e8bff" },
  { lvl: "ERR",   msg: "endpoint  EP-2  timeout  retrying",  c: "#ff6b8a" },
];

export function LogsViz() {
  const [lines, setLines] = useState<{ id: number; lvl: string; msg: string; c: string; ts: string }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // seed with a few lines
    const seed = Array.from({ length: 6 }).map(() => makeLine());
    setLines(seed);

    if (reduced) return;
    const id = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, makeLine()];
        return next.slice(-9);
      });
    }, 1100);
    return () => clearInterval(id);

    function makeLine() {
      const s = SAMPLE[Math.floor(Math.random() * SAMPLE.length)];
      const d = new Date();
      const ts = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
      idRef.current += 1;
      return { id: idRef.current, lvl: s.lvl, msg: s.msg, c: s.c, ts };
    }
  }, []);

  return (
    <div className="viz" data-viz="logs">
      <div className="logs__frame glass">
        <div className="logs__head">
          <span className="logs__dot" /> <span className="logs__dot" /> <span className="logs__dot" />
          <span className="logs__title">/var/log/pp/activity.log</span>
        </div>
        <div className="logs__body">
          {lines.map((l) => (
            <div className="logs__line" key={l.id}>
              <span className="logs__ts">{l.ts}</span>
              <span className="logs__lvl" style={{ color: l.c, borderColor: l.c }}>{l.lvl}</span>
              <span className="logs__msg">{l.msg}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="viz__caption">A cinematic stream of system events</div>
      <style>{`
        .logs__frame {
          padding: 14px;
          border-radius: 12px;
          font-family: ui-monospace, "SF Mono", monospace;
          font-size: 11px;
        }
        .logs__head {
          display: flex; align-items: center; gap: 6px;
          padding-bottom: 10px; margin-bottom: 10px;
          border-bottom: 1px solid var(--line);
        }
        .logs__dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(170,188,255,0.2);
        }
        .logs__dot:nth-child(1) { background: rgba(255,110,130,0.4); }
        .logs__dot:nth-child(2) { background: rgba(255,200,110,0.4); }
        .logs__dot:nth-child(3) { background: rgba(110,220,160,0.4); }
        .logs__title {
          margin-left: auto;
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 0.12em;
        }
        .logs__body { display: flex; flex-direction: column; gap: 4px; min-height: 200px; }
        .logs__line {
          display: grid;
          grid-template-columns: 60px 64px 1fr;
          gap: 10px;
          align-items: center;
          animation: logs-enter 0.45s var(--ease-out);
        }
        @keyframes logs-enter {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .logs__ts  { color: var(--text-3); }
        .logs__lvl {
          padding: 1px 6px;
          border: 1px solid;
          border-radius: 3px;
          font-size: 9px; font-weight: 700;
          text-align: center; letter-spacing: 0.1em;
        }
        .logs__msg { color: var(--text-2); }
        @media (prefers-reduced-motion: reduce) {
          .logs__line { animation: none; }
        }
      `}</style>
    </div>
  );
}
