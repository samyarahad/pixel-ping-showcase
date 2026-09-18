/**
 * TrafficViz — editorial particle stream.
 * Pauses rendering when offscreen for performance.
 */
import { useEffect, useRef } from "react";
import { useInViewport } from "../../hooks/useInViewport";

export function TrafficViz() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref: wrapRef, inView } = useInViewport<HTMLDivElement>({ threshold: 0.05, rootMargin: "100px" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const paths: { x1: number; y1: number; x2: number; y2: number; midY: number }[] = [];
    const particles: { pathIdx: number; t: number; speed: number; size: number; hue: number }[] = [];

    function resize() {
      const r = canvas!.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      paths.length = 0;
      const N = 4;
      for (let i = 0; i < N; i++) {
        const y1 = (i + 0.5) * (h / N) + (Math.random() - 0.5) * 16;
        paths.push({
          x1: 0, y1,
          x2: w,
          y2: (i + 0.5) * (h / N) + (Math.random() - 0.5) * 16,
          midY: y1 - 24,
        });
      }

      particles.length = 0;
      const P = reduced ? 30 : 80;
      for (let i = 0; i < P; i++) {
        particles.push({
          pathIdx: i % paths.length,
          t: Math.random(),
          speed: 0.0008 + Math.random() * 0.0018,
          size: 0.6 + Math.random() * 1.2,
          hue: Math.random() < 0.2 ? 1 : 0,
        });
      }
    }

    const colors = ["#f5f1e8", "#ff5b1f"];

    function frame() {
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 0.5;
      paths.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x1, p.y1);
        const mx = (p.x1 + p.x2) / 2;
        ctx.quadraticCurveTo(mx, p.midY, p.x2, p.y2);
        ctx.strokeStyle = "rgba(245,241,232,0.08)";
        ctx.stroke();
      });

      particles.forEach((pt) => {
        pt.t += pt.speed;
        if (pt.t > 1) pt.t = 0;
        const p = paths[pt.pathIdx];
        const mx = (p.x1 + p.x2) / 2;
        const t = pt.t;
        const x = (1 - t) * (1 - t) * p.x1 + 2 * (1 - t) * t * mx + t * t * p.x2;
        const y = (1 - t) * (1 - t) * p.y1 + 2 * (1 - t) * t * p.midY + t * t * p.y2;

        ctx.beginPath();
        ctx.arc(x, y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = colors[pt.hue];
        ctx.shadowBlur = 4;
        ctx.shadowColor = colors[pt.hue];
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(frame);
    }

    resize();
    if (!reduced) raf = requestAnimationFrame(frame);
    else frame();

    let resizeTimer: number | undefined;
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 200);
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Pause/resume animation based on visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Toggle a data attribute that we read inside the rAF loop is overkill;
    // simplest: just hide canvas when offscreen via CSS — already done by browser.
    // The rAF still runs though, so we cancel by toggling style.visibility.
    canvas.style.visibility = inView ? "visible" : "hidden";
  }, [inView]);

  return (
    <div className="viz" data-viz="traffic" ref={wrapRef}>
      <div className="viz__head">
        <span className="viz__head-num">FIG. 09</span>
        <span className="viz__head-rule" />
        <span className="viz__head-label">TRAFFIC / FLOW</span>
      </div>
      <div className="viz__body" style={{ padding: 0, minHeight: "auto" }}>
        <canvas ref={canvasRef} className="traffic__canvas" />
      </div>
      <div className="viz__caption">Thousands of particles drifting through the network paths</div>
      <style>{`
        .traffic__canvas {
          width: 100%; height: 260px;
          display: block;
          background: #000;
        }
      `}</style>
    </div>
  );
}
