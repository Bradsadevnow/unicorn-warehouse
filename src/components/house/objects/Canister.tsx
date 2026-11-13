"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "../stage";

const R = 0.5; // body radius
const SEAM = 1.9; // height where the two shells meet
const NECK = 2.75; // height where the dome ends

/** Fine circumferential streaks, used for roughness and bump. */
function brushedTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const g = c.getContext("2d")!;
  g.fillStyle = "#9a9a9a";
  g.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 9000; i++) {
    const y = Math.random() * c.height;
    const x = Math.random() * c.width;
    const len = 80 + Math.random() * 700;
    const v = 90 + Math.random() * 150;
    g.strokeStyle = `rgba(${v},${v},${v},${0.03 + Math.random() * 0.05})`;
    g.lineWidth = Math.random() < 0.9 ? 1 : 2;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + len, y);
    g.stroke();
    if (x + len > c.width) {
      g.beginPath();
      g.moveTo(x - c.width, y);
      g.lineTo(x + len - c.width, y);
      g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 2);
  t.anisotropy = 8;
  return t;
}

/** Colour map for the upper shell carrying the engraved serial. */
function serialTexture() {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 640;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#3a3a3a";
  g.font = "500 44px 'Geist Mono', ui-monospace, Consolas, monospace";
  g.textAlign = "center";
  g.textBaseline = "middle";
  // The shell's v runs bottom to top; the cylinder part is the lower third.
  const y = c.height * (1 - 0.17);
  // Letter-space by hand: canvas letterSpacing is not universal.
  const text = "S/N 0X7-884219";
  const step = 34;
  const x0 = c.width / 2 - ((text.length - 1) * step) / 2;
  for (let i = 0; i < text.length; i++) g.fillText(text[i], x0 + i * step, y);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.offset.x = 0.5;
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function lowerProfile() {
  const pts: THREE.Vector2[] = [new THREE.Vector2(0.001, 0)];
  pts.push(new THREE.Vector2(R - 0.06, 0));
  for (let i = 1; i <= 8; i++) {
    const a = (i / 8) * (Math.PI / 2);
    pts.push(new THREE.Vector2(R - 0.06 + Math.sin(a) * 0.06, 0.06 - Math.cos(a) * 0.06));
  }
  for (let i = 1; i <= 24; i++) pts.push(new THREE.Vector2(R, 0.06 + ((SEAM - 0.06) * i) / 24));
  return pts;
}

function upperProfile() {
  const pts: THREE.Vector2[] = [];
  const straight = 2.25 - SEAM;
  for (let i = 0; i <= 12; i++) pts.push(new THREE.Vector2(R, SEAM + (straight * i) / 12));
  for (let i = 1; i <= 24; i++) {
    const a = (i / 24) * (Math.PI / 2);
    pts.push(new THREE.Vector2(0.2 + Math.cos(a) * (R - 0.2), 2.25 + Math.sin(a) * (NECK - 2.25)));
  }
  return pts;
}

/** Condensation: flattened beads scattered over a band of the body. */
function Droplets({ count, y0, y1, seed }: { count: number; y0: number; y1: number; seed: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    let s = seed;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const a = rnd() * Math.PI * 2;
      const y = y0 + rnd() * (y1 - y0);
      const size = 0.004 + Math.pow(rnd(), 3) * 0.018;
      dummy.position.set(Math.sin(a) * R, y, Math.cos(a) * R);
      dummy.lookAt(0, y, 0);
      dummy.scale.set(size, size * (1 + rnd() * 0.7), size * 0.45);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, y0, y1, seed]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshPhysicalMaterial
        color="#0c0c0c"
        metalness={0.2}
        roughness={0.03}
        transparent
        opacity={0.55}
        envMapIntensity={3}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function Canister() {
  const lower = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);
  const collar = useRef<THREE.Group>(null);
  const valve = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.PointLight>(null);

  const { brushed, serial, lowerGeo, upperGeo } = useMemo(
    () => ({
      brushed: brushedTexture(),
      serial: serialTexture(),
      lowerGeo: new THREE.LatheGeometry(lowerProfile(), 128),
      upperGeo: new THREE.LatheGeometry(upperProfile(), 128),
    }),
    [],
  );

  useFrame(() => {
    const e = stage.explode;
    if (lower.current) lower.current.position.y = -0.55 * e;
    if (upper.current) upper.current.position.y = 0.55 * e;
    if (collar.current) collar.current.position.y = 0.95 * e;
    if (valve.current) {
      valve.current.position.y = 1.4 * e;
      valve.current.rotation.y = e * Math.PI * 0.5;
    }
    if (core.current) core.current.visible = e > 0.01;
    if (glow.current) glow.current.intensity = e * 6;
  });

  const titanium = {
    color: "#efaacb",
    metalness: 0.25,
    roughness: 0.3,
    bumpMap: brushed,
    bumpScale: 0.015,
    envMapIntensity: 1,
    side: THREE.DoubleSide,
  } as const;

  const steel = { color: "#82c7ad", metalness: 0.25, roughness: 0.34, envMapIntensity: 1.2 } as const;

  return (
    // Centre the 3.4-unit-tall object on the origin.
    <group position={[0, -1.68, 0]}>
      <group ref={lower}>
        <mesh geometry={lowerGeo}>
          <meshPhysicalMaterial {...titanium} />
        </mesh>
        <Droplets count={300} y0={0.12} y1={SEAM - 0.04} seed={7} />
      </group>

      <group ref={upper}>
        <mesh geometry={upperGeo}>
          <meshPhysicalMaterial {...titanium} map={serial} />
        </mesh>
        {/* Seam line */}
        <mesh position={[0, SEAM, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[R + 0.001, 0.004, 8, 128]} />
          <meshStandardMaterial color="#f3d7ae" metalness={0.8} roughness={0.5} />
        </mesh>
        <Droplets count={70} y0={SEAM + 0.04} y1={2.3} seed={19} />
      </group>

      {/* Isotopic core, only seen once the shells part. */}
      <mesh ref={core} position={[0, 1.55, 0]} visible={false}>
        <cylinderGeometry args={[0.3, 0.3, 2.1, 64, 1, true]} />
        <meshStandardMaterial
          color="#0b1114"
          emissive="#bfe0f2"
          emissiveIntensity={1.6}
          roughness={0.35}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight ref={glow} position={[0, 1.6, 0]} color="#bfe0f2" intensity={0} distance={4} decay={2} />

      <group ref={collar}>
        <mesh position={[0, NECK + 0.14, 0]}>
          <cylinderGeometry args={[0.235, 0.255, 0.28, 96]} />
          <meshStandardMaterial color="#0b0b0b" metalness={0.35} roughness={0.55} />
        </mesh>
      </group>

      <group ref={valve}>
        <mesh position={[0, NECK + 0.34, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.12, 64]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, NECK + 0.48, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.18, 48]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, NECK + 0.62, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.1, 6]} />
          <meshStandardMaterial {...steel} flatShading />
        </mesh>
        <mesh position={[0, NECK + 0.69, 0]}>
          <cylinderGeometry args={[0.1, 0.11, 0.04, 48]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        {/* Side stem and knurled knob */}
        <mesh position={[0.17, NECK + 0.46, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 24]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0.32, NECK + 0.46, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.115, 0.115, 0.13, 44]} />
          <meshStandardMaterial {...steel} roughness={0.45} flatShading />
        </mesh>
      </group>
    </group>
  );
}
