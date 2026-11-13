"use client";

import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { stage } from "../stage";

const phosphor = "#f7acd7";

export default function Terminal() {
  const housing = useRef<Group>(null);
  const glass = useRef<Group>(null);
  const prompt = useRef<Group>(null);

  useFrame(() => {
    const separation = stage.explode;
    housing.current?.position.set(0.58 * separation, -0.43 * separation, -0.65 * separation);
    glass.current?.position.set(-0.46 * separation, 0.13 * separation, 0.18 * separation);
    prompt.current?.position.set(0.16 * separation, 0.63 * separation, 0.78 * separation);
  });

  return (
    <group>
      <group ref={housing}>
        <RoundedBox args={[3.25, 2.13, 0.32]} radius={0.12} position={[0, 0, -0.12]}>
          <meshStandardMaterial color="#c4a4e9" metalness={0.2} roughness={0.36} />
        </RoundedBox>
        <RoundedBox args={[3.09, 1.97, 0.06]} radius={0.09} position={[0, 0, 0.052]}>
          <meshStandardMaterial color="#efc4e5" metalness={0.48} roughness={0.4} />
        </RoundedBox>
      </group>
      <group ref={glass}>
        <RoundedBox args={[2.97, 1.85, 0.07]} radius={0.08} position={[0, 0, 0.09]}>
          <meshPhysicalMaterial color="#0b1710" metalness={0.42} roughness={0.26} clearcoat={0.65} />
        </RoundedBox>
        <mesh position={[0, 0.58, 0.127]}>
          <planeGeometry args={[2.73, 0.012]} />
          <meshBasicMaterial color="#354839" />
        </mesh>
        {[-1.24, -1.1, -0.96].map((x) => (
          <mesh key={x} position={[x, 0.73, 0.127]}>
            <circleGeometry args={[0.034, 16]} />
            <meshBasicMaterial color={x === -1.24 ? phosphor : "#597962"} />
          </mesh>
        ))}
      </group>
      <group ref={prompt}>
        <group position={[-0.28, -0.06, 0.18]}>
          <RoundedBox args={[0.61, 0.095, 0.055]} radius={0.025} position={[0, 0.17, 0]} rotation={[0, 0, -Math.PI / 5]}>
            <meshBasicMaterial color={phosphor} />
          </RoundedBox>
          <RoundedBox args={[0.61, 0.095, 0.055]} radius={0.025} position={[0, -0.17, 0]} rotation={[0, 0, Math.PI / 5]}>
            <meshBasicMaterial color={phosphor} />
          </RoundedBox>
          <RoundedBox args={[0.49, 0.086, 0.055]} radius={0.024} position={[0.64, -0.31, 0]}>
            <meshBasicMaterial color={phosphor} />
          </RoundedBox>
        </group>
        <pointLight color={phosphor} intensity={1.8} distance={1.4} position={[0, 0, 0.4]} />
      </group>
    </group>
  );
}
