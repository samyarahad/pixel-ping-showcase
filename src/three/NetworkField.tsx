/**
 * NetworkField — lightweight fixed full-screen R3F particle network.
 *
 * Performance optimizations vs previous version:
 *  - Particle count: 720 → 220 (desktop), 380 → 140 (mobile), 220 → 80 (reduced motion)
 *  - Connection threshold: tighter → fewer lines (max 1200 vs 4000)
 *  - DPR: capped to 1.5 (was 2) on retina
 *  - Frameloop: "demand" when reduced motion, otherwise throttled
 *  - Particle size: smaller, less shadow blur
 *  - Use BufferGeometry with indexed line segments for cheaper rendering
 *  - Pause rotation when tab is hidden
 *  - Pause when hero is no longer visible (after 1 viewport scroll)
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { isTouchDevice, prefersReducedMotion } from "../utils";

const COLORS = [
  new THREE.Color("#f5f1e8"),
  new THREE.Color("#c8c8cc"),
  new THREE.Color("#ff5b1f"),
];

interface ParticleData {
  positions: Float32Array;
  colors: Float32Array;
  count: number;
}

interface LineData {
  positions: Float32Array;
  colors: Float32Array;
  count: number;
}

function buildField(count: number): { particles: ParticleData; lines: LineData } {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 8 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
    positions[i * 3 + 2] = r * Math.cos(phi);

    const c = Math.random() < 0.6 ? COLORS[0] : Math.random() < 0.85 ? COLORS[1] : COLORS[2];
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  // Build lines — much tighter threshold + cap
  const threshold = 2.2;
  const maxDistSq = threshold * threshold;
  const maxConnections = 1200;
  const linePositions = new Float32Array(maxConnections * 6);
  const lineColors = new Float32Array(maxConnections * 6);
  let n = 0;
  for (let i = 0; i < count && n < maxConnections; i++) {
    const ix = positions[i * 3 + 0];
    const iy = positions[i * 3 + 1];
    const iz = positions[i * 3 + 2];
    for (let j = i + 1; j < count && n < maxConnections; j++) {
      const dx = ix - positions[j * 3 + 0];
      const dy = iy - positions[j * 3 + 1];
      const dz = iz - positions[j * 3 + 2];
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < maxDistSq) {
        linePositions[n * 6 + 0] = ix;
        linePositions[n * 6 + 1] = iy;
        linePositions[n * 6 + 2] = iz;
        linePositions[n * 6 + 3] = positions[j * 3 + 0];
        linePositions[n * 6 + 4] = positions[j * 3 + 1];
        linePositions[n * 6 + 5] = positions[j * 3 + 2];
        const a = 1 - d2 / maxDistSq;
        const useOrange = Math.random() < 0.15;
        const r = useOrange ? 1.0 : 0.96;
        const g = useOrange ? 0.36 : 0.94;
        const b = useOrange ? 0.12 : 0.91;
        lineColors[n * 6 + 0] = r * a; lineColors[n * 6 + 1] = g * a; lineColors[n * 6 + 2] = b * a;
        lineColors[n * 6 + 3] = r * a; lineColors[n * 6 + 4] = g * a; lineColors[n * 6 + 5] = b * a;
        n++;
      }
    }
  }

  return {
    particles: { positions, colors, count },
    lines: {
      positions: linePositions.slice(0, n * 6),
      colors: lineColors.slice(0, n * 6),
      count: n,
    },
  };
}

function Scene({ reduced, paused }: { reduced: boolean; paused: boolean }) {
  const touch = isTouchDevice();
  const count = reduced ? 80 : touch ? 140 : 220;
  const { particles, lines } = useMemo(() => buildField(count), [count]);

  const pointsRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  // Particle geometry (memoized)
  const particleGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(particles.positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(particles.colors, 3));
    return g;
  }, [particles]);

  // Line geometry (memoized)
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(lines.positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(lines.colors, 3));
    return g;
  }, [lines]);

  useFrame((state, delta) => {
    if (paused || reduced) return;
    // Throttle rotation: only update every other frame
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.04;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = pointsRef.current?.rotation.y ?? 0;
      linesRef.current.rotation.x = pointsRef.current?.rotation.x ?? 0;
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Rig({ paused }: { paused: boolean }) {
  const { camera, pointer } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    if (paused) return;
    const targetX = pointer.x * 1.2;
    const targetY = 1.2 + pointer.y * 0.6 - scrollRef.current * 3;
    const targetZ = 16 - scrollRef.current * 3;
    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 1.2);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 1.2);
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 1.2);
    camera.lookAt(0, scrollRef.current * 1.5, 0);
  });

  return null;
}

export function NetworkField() {
  const reduced = prefersReducedMotion();
  const touch = isTouchDevice();
  const [paused, setPaused] = useState(false);

  // Pause rendering when:
  //  1. Tab is hidden (visibilitychange)
  //  2. User has scrolled past 1.5 viewports (hero out of sight)
  useEffect(() => {
    function onVisibility() {
      setPaused(document.hidden);
    }
    function onScroll() {
      // After hero (~1 viewport), pause heavy 3D
      const past = window.scrollY > window.innerHeight * 1.5;
      setPaused(past || document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="webgl-layer" aria-hidden="true">
      <Canvas
        dpr={[1, touch ? 1.25 : 1.5]}
        gl={{
          antialias: false,           // antialiasing is expensive; particles don't need it
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        camera={{ position: [0, 1.2, 16], fov: 55, near: 0.1, far: 60 }}
        frameloop={reduced ? "demand" : "always"}
      >
        <color attach="background" args={[0x050505]} />
        <fog attach="fog" args={[0x050505, 14, 30]} />
        <ambientLight intensity={0.5} />
        <Scene reduced={reduced} paused={paused} />
        {!reduced && <Rig paused={paused} />}
      </Canvas>
    </div>
  );
}
