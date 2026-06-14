"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

function ParticleField({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random positions inside a sphere
  const [positions] = useState(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 8; // Sphere radius up to 8
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate base particles
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.015;

      // Parallax effect based on mouse coordinate
      if (mouse.current) {
        const targetX = mouse.current.x * 0.6;
        const targetY = mouse.current.y * 0.6;
        pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
        pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#7CFF4D"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
}

export default function HeroBackground() {
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions to [-1, 1]
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField mouse={mouse} />
      </Canvas>
    </div>
  );
}
