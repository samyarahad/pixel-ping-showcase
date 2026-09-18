/**
 * ScrollProgress — thin top-bar showing scroll progress through the story.
 */
import { useScrollProgress } from "../hooks/useScrollProgress";

export function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(p * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      style={{ transform: `scaleX(${p})` }}
    />
  );
}
