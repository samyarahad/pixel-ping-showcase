/**
 * TrafficViz — thousands of particles moving through paths.
 * Canvas-based, performance-friendly, paused for reduced motion.
 */
import { useEffect, useRef } from "react";

export function TrafficViz() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const paths: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const particles: { pathIdx: number; t: number; speed: number; size: number; hue: number }[] = [];

    function resize() {
      const r = canvas!.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      ctx.scale(dpr, dpr);

      // build a few bezier-ish "paths" between random endpoints
      paths.length = 0;
      const N = 5;
      for (let i = 0; i < N; i++) {
        paths.push({
          x1: 0,
          y1: (i + 0.5) * (h / N) + (Math.random() - 0.5) * 20,
          x2: w,
          y2: (i + 0.5) * (h / N) + (Math.random() - 0.5) * 20,
        });
      }

      // spawn particles
      particles.length = 0;
      const P = reduced ? 60 : 220;
      for (let i = 0; i < P; i++) {
        particles.push({
          pathIdx: i % paths.length,
          t: Math.random(),
          speed: 0.0008 + Math.random() * 0.0018,
          size: 0.6 + Math.random() * 1.4,
          hue: Math.random() < 0.6 ? 0 : Math.random() < 0.5 ? 1 : 2,
        });
      }
    }

    const colors = ["#6e8bff", "#c4a6ff", "#8b5cf6"];

    function frame() {
      ctx.clearRect(0, 0, w, h);

      // draw path baselines
      ctx.lineWidth = 0.5;
      paths.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x1, p.y1);
        // gentle sine-like curve via quadratic
        const mx = (p.x1 + p.x2) / 2;
        const my = (p.y1 + p.y2) / 2 - 30;
        ctx.quadraticCurveTo(mx, my, p.x2, p.y2);
        ctx.strokeStyle = "rgba(110,139,255,0.10)";
        ctx.stroke();
      });

      // particles
      particles.forEach((pt) => {
        pt.t += pt.speed;
        if (pt.t > 1) pt.t = 0;
        const p = paths[pt.pathIdx];
        const mx = (p.x1 + p.x2) / 2;
        const my = (p.y1 + p.y2) / 2 - 30;
        const t = pt.t;
        const x = (1 - t) * (1 - t) * p.x1 + 2 * (1 - t) * t * mx + t * t * p.x2;
        const y = (1 - t) * (1 - t) * p.y1 + 2 * (1 - t) * t * my + t * t * p.y2;

        ctx.beginPath();
        ctx.arc(x, y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = colors[pt.hue];
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors[pt.hue];
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(frame);
    }

    resize();
    if (!reduced) raf = requestAnimationFrame(frame);
    else frame(); // single static frame

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="viz" data-viz="traffic">
      <canvas ref={canvasRef} className="traffic__canvas" />
      <div className="viz__caption">Thousands of particles drifting through the network paths</div>
      <style>{`
        .traffic__canvas {
          width: 100%; height: 280px;
          display: block;
          background: radial-gradient(ellipse at center, rgba(110,139,255,0.08) 0%, transparent 70%);
          border-radius: 14px;
        }
      `}</style>
    </div>
  );
}
