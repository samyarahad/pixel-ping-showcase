/**
 * LogsViz — editorial terminal log stream.
 * High-contrast mono, color-coded levels, auto-scroll.
 */
import { useEffect, useRef, useState } from "react";
import { useInViewport } from "../../hooks/useInViewport";

const SAMPLE = [
  { lvl: "INFO",  msg: "edge-01.pp  handshake established",  c: "#f5f1e8" },
  { lvl: "OK",    msg: "user:admin  authenticated",          c: "#6ee7a0" },
  { lvl: "INFO",  msg: "endpoint  EP-3  reachable",          c: "#f5f1e8" },
  { lvl: "WARN",  msg: "endpoint  EP-7  slow response 480ms",c: "#ff8a4c" },
  { lvl: "INFO",  msg: "config  applied  v1.1.1",            c: "#f5f1e8" },
  { lvl: "OK",    msg: "failover  primary → alternate",      c: "#6ee7a0" },
  { lvl: "INFO",  msg: "traffic  4.2 MB/s  peak",            c: "#f5f1e8" },
  { lvl: "WARN",  msg: "port :443  high load",               c: "#ff8a4c" },
  { lvl: "INFO",  msg: "scanner  256 IPs  clean",            c: "#f5f1e8" },
  { lvl: "OK",    msg: "backup  completed",                  c: "#6ee7a0" },
  { lvl: "INFO",  msg: "cloudflare  api  sync",              c: "#f5f1e8" },
  { lvl: "ERR",   msg: "endpoint  EP-2  timeout  retrying",  c: "#ff5b1f" },
];

export function LogsViz() {
  const [lines, setLines] = useState<{ id: number; lvl: string; msg: string; c: string; ts: string }[]>([]);
  const idRef = useRef(0);
  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.05, rootMargin: "100px" });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seed = Array.from({ length: 6 }).map(() => makeLine());
    setLines(seed);

    if (reduced || !inView) return;
    const id = setInterval(() => {
      setLines((prev) => [...prev, makeLine()].slice(-9));
    }, 1100);
    return () => clearInterval(id);

    function makeLine() {
      const s = SAMPLE[Math.floor(Math.random() * SAMPLE.length)];
      const d = new Date();
      const ts = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
      idRef.current += 1;
      return { id: idRef.current, lvl: s.lvl, msg: s.msg, c: s.c, ts };
    }
  }, [inView]);

  return (
    <div className="viz" data-viz="logs" ref={ref}>
      <div className="viz__head">
        <span className="viz__head-num">FIG. 12</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">LOGS / ACTIVITY</span>
      </div>
      <div className="viz__body" style={{ padding: 0 }}>
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
        .logs__body {
          padding: 18px;
          font-family: var(--font-mono);
          font-size: 11px;
          min-height: 220px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .logs__line {
          display: grid;
          grid-template-columns: 64px 60px 1fr;
          gap: 12px;
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
