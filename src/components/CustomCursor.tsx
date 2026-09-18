/**
 * CustomCursor — desktop-only.
 * - Subtle dot + magnetic ring (editorial / monograph)
 * - Risograph dot trail (faint, fades out)
 */
import { useEffect, useRef } from "react";
import { isTouchDevice } from "../utils";

const MAX_DOTS = 8;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const dotsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot = dotRef.current!;
    const trail = trailRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx;
    let ty = my;
    let raf = 0;
    let lastDotTime = 0;

    // Pre-create dot trail pool
    const dots: HTMLDivElement[] = [];
    const container = dotsContainerRef.current!;
    for (let i = 0; i < MAX_DOTS; i++) {
      const d = document.createElement("div");
      d.className = "riso-dot";
      d.style.opacity = "0";
      container.appendChild(d);
      dots.push(d);
    }
    let dotIdx = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest('a, button, [data-cursor="hover"], input, textarea, select');
      trail.classList.toggle("is-hover", interactive);

      // Spawn risograph dots periodically while moving (throttled)
      const now = performance.now();
      if (now - lastDotTime > 60) {
        lastDotTime = now;
        const d = dots[dotIdx % MAX_DOTS];
        dotIdx++;
        const jitter = 4;
        d.style.opacity = "0.55";
        d.style.transform = `translate3d(${mx + (Math.random() - 0.5) * jitter}px, ${my + (Math.random() - 0.5) * jitter}px, 0) translate(-50%, -50%) scale(1)`;
        // fade out via CSS transition by toggling opacity later
        setTimeout(() => {
          d.style.opacity = "0";
          d.style.transform = `translate3d(${mx + (Math.random() - 0.5) * 8}px, ${my + (Math.random() - 0.5) * 8}px, 0) translate(-50%, -50%) scale(0.4)`;
        }, 80);
      }
    }

    function loop() {
      tx += (mx - tx) * 0.20;
      ty += (my - ty) * 0.20;
      trail.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      dots.forEach((d) => d.remove());
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div ref={dotsContainerRef} aria-hidden="true" />
      <div className="cursor-trail" ref={trailRef} aria-hidden="true" />
      <div className="cursor" ref={dotRef} aria-hidden="true" />
    </>
  );
}
