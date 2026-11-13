"use client";

import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { stage } from "../stage";

const mint = "#91dccb";

export default function Implant() {
  const base = useRef<Group>(null);
  const circuit = useRef<Group>(null);
  const lid = useRef<Group>(null);

  useFrame(() => {
    const separation = stage.explode;
    base.current?.position.set(0.28 * separation, -0.4 * separation, -0.53 * separation);
    circuit.current?.position.set(0.68 * separation, 0.13 * separation, 0.05 * separation);
    lid.current?.position.set(-0.46 * separation, 0.53 * separation, 0.49 * separation);
  });

  return (
    <group rotation={[0, 0, -0.25]}>
      <group ref={base}>
        <RoundedBox args={[2.86, 1.24, 0.28]} radius={0.13} position={[0, 0, -0.16]}>
          <meshStandardMaterial color="#a3d8be" metalness={0.23} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[2.77, 1.15, 0.08]} radius={0.039} position={[0, 0, 0.005]}>
          <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.54} roughness={0.44} />
        </RoundedBox>
      </group>
      <group ref={circuit}>
        <RoundedBox args={[2.58, 0.98, 0.065]} radius={0.03} position={[0, 0, 0.05]}>
          <meshStandardMaterial color="#173e35" metalness={0.32} roughness={0.56} />
        </RoundedBox>
        <RoundedBox args={[0.59, 0.47, 0.095]} radius={0.027} position={[-0.2, 0, 0.11]}>
          <meshStandardMaterial color="#13221f" metalness={0.55} roughness={0.42} />
        </RoundedBox>
        {[-0.24, -0.12, 0, 0.12, 0.24].map((y) => (
          <mesh key={y} position={[0.54, y, 0.089]}>
            <planeGeometry args={[0.84, 0.025]} />
            <meshStandardMaterial color="#ba9d5e" metalness={0.72} roughness={0.38} />
          </mesh>
        ))}
      </group>
      <group ref={lid}>
        <RoundedBox args={[2.74, 1.12, 0.16]} radius={0.079} position={[0, 0, 0.21]}>
          <meshPhysicalMaterial color="#d586b2" transparent opacity={0.45} depthWrite={false} roughness={0.24} clearcoat={0.9} />
        </RoundedBox>
        <mesh position={[1.06, 0, 0.294]}>
          <circleGeometry args={[0.054, 24]} />
          <meshBasicMaterial color={mint} />
        </mesh>
      </group>
    </group>
  );
}
