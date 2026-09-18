/**
 * useInViewport — returns whether an element is currently in the viewport.
 * Used to pause canvas/interval animations when offscreen (perf).
 */
import { useEffect, useRef, useState } from "react";

export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): { ref: React.RefObject<T>; inView: boolean } {
  const ref = useRef<T | null>(null) as React.RefObject<T>;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting);
        }
      },
      options ?? { threshold: 0.01, rootMargin: "100px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
