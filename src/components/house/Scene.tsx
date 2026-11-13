"use client";

import { useRef, type ComponentType } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { ObjectKind } from "@/content/houseContent";
import Canister from "./objects/Canister";
import Pod from "./objects/Pod";
import Badge from "./objects/Badge";
import Terminal from "./objects/Terminal";
import Implant from "./objects/Implant";
import Chain from "./objects/Chain";
import Hourglass from "./objects/Hourglass";
import { stage } from "./stage";

const OBJECTS: Record<ObjectKind, ComponentType> = {
  canister: Canister,
  pod: Pod,
  badge: Badge,
  terminal: Terminal,
  implant: Implant,
  chain: Chain,
  hourglass: Hourglass,
};

/** Studio lighting built from light panels, so nothing is fetched. Matches
 *  the campaign stills: soft key upper left, warm rim on the right. */
function Studio({ accent }: { accent: string }) {
  return (
    <Environment resolution={512} frames={1}>
      <color attach="background" args={["#000000"]} />
      {/* Soft key, upper left */}
      <Lightformer form="rect" intensity={10} color="#f4f6ff" position={[-4.5, 3, 4.5]} scale={[3.2, 10, 1]} target={[0, 0, 0]} />
      {/* Narrow strip for a crisp vertical highlight */}
      <Lightformer form="rect" intensity={22} color="#ffffff" position={[-1.6, 0.5, 6]} scale={[0.28, 9, 1]} target={[0, 0, 0]} />
      {/* Warm rim, right */}
      <Lightformer form="rect" intensity={26} color="#ffab6e" position={[5, 0.5, -1.2]} scale={[0.7, 10, 1]} target={[0, 0, 0]} />
      {/* Low fill and top */}
      <Lightformer form="rect" intensity={2} color="#dfe8ff" position={[2.5, -4, 4]} scale={[8, 2, 1]} target={[0, 0, 0]} />
      <Lightformer form="circle" intensity={5} color="#ffffff" position={[0, 7, 1]} scale={[5, 5, 1]} target={[0, 0, 0]} />
      {/* Kicker behind, in the house colour */}
      <Lightformer form="rect" intensity={5} color={accent} position={[-3.5, 1, -5]} scale={[1.5, 9, 1]} target={[0, 0, 0]} />
    </Environment>
  );
}

function Rig({ kind }: { kind: ObjectKind }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pose = useRef({ x: 0, y: -1.6, s: 1, ry: -2.2, rz: 0, tx: 0, ty: 0 });
  const Model = OBJECTS[kind];

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = pose.current;
    const k = 1 - Math.pow(0.0015, Math.min(dt, 0.05)); // frame-rate independent ease

    const intro = stage.intro;
    const fit = Math.min(1, viewport.width / stage.fitWidth);
    const targetX = (stage.x * viewport.width) / 2;
    const targetY = (stage.y * viewport.height) / 2 - (1 - intro) * viewport.height * 0.9;

    p.x += (targetX - p.x) * k;
    p.y += (targetY - p.y) * k;
    p.s += (stage.s * fit - p.s) * k;
    p.ry += (stage.ry - (1 - intro) * 2.4 - p.ry) * k;
    p.rz += (stage.rz - p.rz) * k;
    p.tx += (stage.my * 0.06 - p.tx) * k * 0.5;
    p.ty += (stage.mx * 0.22 - p.ty) * k * 0.5;

    g.position.set(p.x, p.y, 0);
    g.scale.setScalar(p.s);
    const t = state.clock.elapsedTime;
    const drift = stage.sway ? Math.sin(t * 0.35) * 0.22 : t * 0.1;
    g.rotation.set(p.tx + stage.tilt, stage.baseYaw + p.ry + p.ty + drift, p.rz);
  });

  return (
    <group ref={group}>
      <Model />
    </group>
  );
}

export default function Scene({ kind, accent }: { kind: ObjectKind; accent: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 30, position: [0, 0, 9], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Studio accent={accent} />
      <ambientLight intensity={0.08} />
      <Rig kind={kind} />
    </Canvas>
  );
}
