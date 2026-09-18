/**
 * CustomCursor — desktop-only subtle glow + magnetic trail.
 * Disabled automatically on touch / coarse pointers via CSS.
 */
import { useEffect, useRef } from "react";
import { isTouchDevice } from "../utils";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot = dotRef.current!;
    const trail = trailRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx;
    let ty = my;
    let raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest('a, button, [data-cursor="hover"], input, textarea, select');
      trail.classList.toggle("is-hover", interactive);
    }

    function loop() {
      tx += (mx - tx) * 0.18;
      ty += (my - ty) * 0.18;
      trail.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div className="cursor-trail" ref={trailRef} aria-hidden="true" />
      <div className="cursor" ref={dotRef} aria-hidden="true" />
    </>
  );
}
