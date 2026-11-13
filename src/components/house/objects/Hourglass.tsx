"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SplineCurve, Vector2, type Group } from "three";
import { stage } from "../stage";

const gold = { color: "#efb84f", metalness: 0.45, roughness: 0.24 };
const sand = { color: "#c5a6ec", metalness: 0.28, roughness: 0.83 };

function Cap({ top }: { top: boolean }) {
  return (
    <group position={[0, top ? 1.37 : -1.37, 0]} rotation={[top ? 0 : Math.PI, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.87, 0.83, 0.19, 80]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
        <torusGeometry args={[0.81, 0.04, 16, 80]} />
        <meshStandardMaterial {...gold} />
      </mesh>
    </group>
  );
}

export default function Hourglass() {
  const upper = useRef<Group>(null);
  const lower = useRef<Group>(null);
  const glass = useRef<Group>(null);
  const frame = useRef<Group>(null);
  const profile = useMemo(() => new SplineCurve([
    new Vector2(0.61, -1.29),
    new Vector2(0.67, -1.12),
    new Vector2(0.59, -0.82),
    new Vector2(0.34, -0.43),
    new Vector2(0.085, 0),
    new Vector2(0.34, 0.43),
    new Vector2(0.59, 0.82),
    new Vector2(0.67, 1.12),
    new Vector2(0.61, 1.29),
  ]).getPoints(80), []);

  useFrame(() => {
    const separation = stage.explode;
    upper.current?.position.set(0, 0.48 * separation, 0);
    lower.current?.position.set(0, -0.46 * separation, 0);
    glass.current?.position.set(-0.48 * separation, 0, 0.38 * separation);
    frame.current?.position.set(0.55 * separation, 0, -0.36 * separation);
  });

  return (
    <group>
      <group ref={upper}><Cap top /></group>
      <group ref={lower}><Cap top={false} /></group>
      <group ref={frame}>
        {[0, 1, 2].map((column) => {
          const angle = column * Math.PI * 2 / 3 + Math.PI / 2;
          return (
            <mesh key={column} position={[0.74 * Math.cos(angle), 0, 0.74 * Math.sin(angle)]}>
              <cylinderGeometry args={[0.038, 0.038, 2.63, 20]} />
              <meshStandardMaterial {...gold} />
            </mesh>
          );
        })}
      </group>
      <group ref={glass}>
        <mesh>
          <latheGeometry args={[profile, 80]} />
          <meshPhysicalMaterial color="#c7b698" transparent opacity={0.27} depthWrite={false} roughness={0.15} clearcoat={1} />
        </mesh>
        <mesh position={[0, -1.02, 0]}>
          <coneGeometry args={[0.56, 0.46, 64]} />
          <meshStandardMaterial {...sand} />
        </mesh>
        <mesh position={[0, 0.57, 0]}>
          <cylinderGeometry args={[0.37, 0.11, 0.61, 64]} />
          <meshStandardMaterial {...sand} />
        </mesh>
        <mesh position={[0, -0.37, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.95, 12]} />
          <meshStandardMaterial {...sand} />
        </mesh>
      </group>
    </group>
  );
}
