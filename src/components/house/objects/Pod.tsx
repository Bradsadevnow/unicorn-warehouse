"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../stage";

const R = 0.8; // cross-section radius
const L = 1.7; // length of the straight run
const DEG = Math.PI / 180;

/** Capsule outline, pole to pole, for sweeping into shell segments. */
function capsuleProfile(r: number, len: number) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.max(0.001, Math.sin(a) * r), -len / 2 - Math.cos(a) * r));
  }
  for (let i = 1; i <= 16; i++) pts.push(new THREE.Vector2(r, -len / 2 + (len * i) / 16));
  for (let i = 1; i <= 20; i++) {
    const a = (i / 20) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.max(0.001, Math.cos(a) * r), len / 2 + Math.sin(a) * r));
  }
  return pts;
}

/** A slice of the capsule between two angles around its long axis.
 *  After the group is laid on its side, 0° faces the camera and 90° is up. */
function shell(from: number, to: number, r = R) {
  return new THREE.LatheGeometry(capsuleProfile(r, L), 96, from * DEG, (to - from) * DEG);
}

export default function Pod() {
  const upper = useRef<THREE.Mesh>(null);
  const canopy = useRef<THREE.Mesh>(null);
  const lower = useRef<THREE.Mesh>(null);
  const base = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);

  const geo = useMemo(
    () => ({
      upper: shell(62, 172),
      canopy: shell(-12, 62, R - 0.004),
      lower: shell(172, 348),
      bed: new THREE.CapsuleGeometry(0.58, 1.5, 12, 32),
      plinth: new THREE.CapsuleGeometry(0.62, 1.6, 8, 32),
    }),
    [],
  );

  useFrame(() => {
    const e = stage.explode;
    if (upper.current) upper.current.position.set(0.75 * e, 0, -0.2 * e);
    if (canopy.current) canopy.current.position.set(0.35 * e, 0, 0.55 * e);
    if (lower.current) lower.current.position.set(-0.28 * e, 0, 0);
    if (base.current) base.current.position.y = -0.66 - 0.7 * e;
    if (glow.current) glow.current.intensity = 2.5 + e * 7;
  });

  const ceramic = {
    color: "#c7a8f3",
    metalness: 0,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
    envMapIntensity: 0.5,
    side: THREE.DoubleSide,
  } as const;

  return (
    <group>
      {/* The capsule is modelled upright, then laid on its side and flattened.
          In this rotated frame, local +x is world up and local +z faces forward. */}
      <group rotation={[0, 0, Math.PI / 2]} scale={[0.78, 1, 1]}>
        <mesh ref={upper} geometry={geo.upper}>
          <meshPhysicalMaterial {...ceramic} />
        </mesh>
        <mesh ref={lower} geometry={geo.lower}>
          <meshPhysicalMaterial {...ceramic} />
        </mesh>
        <mesh ref={canopy} geometry={geo.canopy}>
          <meshPhysicalMaterial
            color="#858fcd"
            metalness={0}
            roughness={0.05}
            transparent
            opacity={0.5}
            envMapIntensity={1.6}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* The bed: a lit mattress and one pillow. */}
        <mesh geometry={geo.bed} position={[-0.3, 0, 0]} scale={[0.3, 1, 1]}>
          <meshStandardMaterial color="#2a2046" emissive="#6f4fd0" emissiveIntensity={0.7} roughness={0.9} />
        </mesh>
        <mesh position={[-0.06, 0.78, 0]} scale={[0.5, 1, 1]}>
          <capsuleGeometry args={[0.2, 0.44, 8, 16]} />
          <meshStandardMaterial color="#cfc3f5" emissive="#8f6cff" emissiveIntensity={0.35} roughness={0.95} />
        </mesh>
      </group>

      <pointLight ref={glow} position={[0, 0.1, 0.1]} color="#9a78ff" intensity={2.5} distance={5} decay={2} />

      {/* Plinth with an underglow. */}
      <group ref={base} position={[0, -0.66, 0]}>
        <mesh geometry={geo.plinth} rotation={[0, 0, Math.PI / 2]} scale={[0.1, 1, 0.9]}>
          <meshPhysicalMaterial color="#e5d7f4" roughness={0.35} clearcoat={0.6} envMapIntensity={0.5} />
        </mesh>
        <mesh geometry={geo.plinth} rotation={[0, 0, Math.PI / 2]} position={[0, -0.06, 0]} scale={[0.03, 0.95, 0.82]}>
          <meshStandardMaterial color="#120c22" emissive="#8f6cff" emissiveIntensity={2.2} />
        </mesh>
      </group>
    </group>
  );
}
