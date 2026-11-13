"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { stage } from "../stage";

function Link() {
  return (
    <mesh scale={[1.3, 0.88, 1]}>
      <torusGeometry args={[0.58, 0.145, 32, 96]} />
      <meshStandardMaterial color="#ffd471" metalness={0.33} roughness={0.27} />
    </mesh>
  );
}

export default function Chain() {
  const left = useRef<Group>(null);
  const center = useRef<Group>(null);
  const right = useRef<Group>(null);

  useFrame(() => {
    const separation = stage.explode;
    left.current?.position.set(-1.15 - 0.47 * separation, 0.27 * separation, -0.22 * separation);
    right.current?.position.set(1.15 + 0.47 * separation, -0.23 * separation, 0.19 * separation);
    if (center.current) {
      center.current.rotation.x = 1.13 - 0.66 * separation;
      center.current.position.z = 0.36 * separation;
    }
  });

  return (
    <group rotation={[0, 0, -0.32]}>
      <group ref={left} position={[-1.15, 0, 0]} rotation={[-0.32, 0, 0]}>
        <Link />
      </group>
      <group ref={center} rotation={[1.13, 0, 0]}>
        <Link />
      </group>
      <group ref={right} position={[1.15, 0, 0]} rotation={[-0.32, 0, 0]}>
        <Link />
      </group>
    </group>
  );
}
