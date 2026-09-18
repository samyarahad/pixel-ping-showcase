/**
 * NetworkField — fixed full-screen R3F particle network.
 * Acts as the persistent atmospheric backdrop for the entire showcase.
 *
 * Design notes:
 *  - Quiet, premium palette (no neon glow everywhere).
 *  - Particle count scales down on mobile and for prefers-reduced-motion.
 *  - Camera drifts subtly with scroll & pointer.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { isTouchDevice, prefersReducedMotion } from "../utils";

const COLORS = [
  new THREE.Color("#6e8bff"),
  new THREE.Color("#8b5cf6"),
  new THREE.Color("#c4a6ff"),
  new THREE.Color("#5b76ff"),
];

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  // Generate particle field
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread within a sphere shell for depth
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  // Pre-compute line indices: connect nearby particles once on mount
  const lineGeometry = useMemo(() => {
    const maxConnections = Math.min(count * 4, 4000);
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    let n = 0;
    const threshold = 2.6;
    const maxDistSq = threshold * threshold;

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
          // Dim color based on distance
          const a = 1 - d2 / maxDistSq;
          lineColors[n * 6 + 0] = 0.42 * a;
          lineColors[n * 6 + 1] = 0.52 * a;
          lineColors[n * 6 + 2] = 0.85 * a;
          lineColors[n * 6 + 3] = 0.42 * a;
          lineColors[n * 6 + 4] = 0.52 * a;
          lineColors[n * 6 + 5] = 0.85 * a;
          n++;
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions.slice(0, n * 6), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors.slice(0, n * 6), 3));
    return geo;
  }, [positions, count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.018;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = pointsRef.current?.rotation.y ?? 0;
      linesRef.current.rotation.x = pointsRef.current?.rotation.x ?? 0;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Rig() {
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
    // Camera drift with scroll & subtle pointer parallax
    const targetX = pointer.x * 1.5;
    const targetY = 1.2 + pointer.y * 0.8 - scrollRef.current * 4;
    const targetZ = 16 - scrollRef.current * 4;
    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 1.4);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 1.4);
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 1.4);
    camera.lookAt(0, scrollRef.current * 2, 0);
  });

  return null;
}

export function NetworkField() {
  const reduced = prefersReducedMotion();
  const touch = isTouchDevice();

  const count = reduced ? 220 : touch ? 380 : 720;

  return (
    <div className="webgl-layer" aria-hidden="true">
      <Canvas
        dpr={[1, touch ? 1.5 : 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 1.2, 16], fov: 55, near: 0.1, far: 60 }}
      >
        <color attach="background" args={[0x05070d]} />
        <fog attach="fog" args={[0x05070d, 12, 32]} />
        <ambientLight intensity={0.5} />
        <Particles count={count} />
        {!reduced && <Rig />}
      </Canvas>
    </div>
  );
}
