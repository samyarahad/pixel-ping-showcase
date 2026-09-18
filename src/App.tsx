/**
 * App — Pixel & Ping showcase root.
 *
 * Architecture:
 *  - NetworkField: fixed full-screen WebGL particle backdrop (or CSS fallback)
 *  - ScrollProgress: thin top progress bar
 *  - CustomCursor: desktop-only glow trail
 *  - Navigation: minimal premium top bar
 *  - Sections (in story order):
 *      Hero → Network → ProductSections[] → FullReveal → FinalScene → Footer
 */
import { useEffect, useState } from "react";
import { NetworkField } from "./three/NetworkField";
import { FallbackBackdrop } from "./components/FallbackBackdrop";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import { Navigation } from "./components/Navigation";
import { Hero } from "./sections/Hero";
import { NetworkScene } from "./sections/NetworkScene";
import { Capabilities } from "./sections/Capabilities";
import { ProductSection } from "./sections/ProductSection";
import { FullReveal } from "./sections/FullReveal";
import { FinalScene } from "./sections/FinalScene";
import { Footer } from "./sections/Footer";
import { SECTIONS } from "./data/content";
import { useLenis } from "./hooks/useLenis";
import { hasWebGL } from "./utils";

export default function App() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  useLenis();

  useEffect(() => {
    setWebglOk(hasWebGL());

    // Hide the inline loader once React mounts
    const loader = document.getElementById("app-loader");
    if (loader) {
      requestAnimationFrame(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 900);
      });
    }
  }, []);

  return (
    <>
      {webglOk === false ? <FallbackBackdrop /> : <NetworkField />}
      <div className="noise" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />

      <main id="main">
        <Hero />
        <NetworkScene />
        <Capabilities />

        {SECTIONS.map((s, idx) => {
          // alternate layout & accent color for visual rhythm
          const layouts: Array<"right" | "left" | "center"> = ["right", "left", "right", "left", "right", "left"];
          const accents = [
            "var(--accent-1)",
            "#8b5cf6",
            "#c4a6ff",
            "#6e8bff",
            "#8b5cf6",
            "#c4a6ff",
          ];
          return (
            <ProductSection
              key={s.id}
              data={s}
              layout={idx === 0 ? "right" : layouts[idx % layouts.length]}
              accent={accents[idx % accents.length]}
            />
          );
        })}

        <FullReveal />
        <FinalScene />
      </main>

      <Footer />
    </>
  );
}
