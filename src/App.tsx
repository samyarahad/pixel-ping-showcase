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
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />

      <main id="main">
        <Hero />
        <NetworkScene />
        <Capabilities />

        {SECTIONS.map((s, idx) => {
          // alternate left/right layout for editorial spread rhythm
          const layout: "right" | "left" = idx % 2 === 0 ? "right" : "left";
          return (
            <ProductSection
              key={s.id}
              data={s}
              layout={layout}
              accent="var(--accent-1)"
              index={idx}
              features={s.features}
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
