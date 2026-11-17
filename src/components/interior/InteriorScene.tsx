"use client";

import { Html, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { buildGrid, findPath, type Point, type Rect } from "./pathfinding";
import s from "./interior.module.css";

export type InteriorData = {
  id: string;
  name: string;
  floor: Rect;
  blockers: Rect[];
  spawn: { x: number; z: number; facing: number };
  hotspots: { id: string; label: string; x: number; z: number; radius: number }[];
  exits: { id: string; label: string; href: string; x: number; z: number }[];
};

type Target = { kind: "hotspot" | "exit"; id: string } | undefined;

const SPEED = 3.4; // metres per second

function Room({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url, false, true);
  useEffect(() => { onReady(); }, [onReady]);
  return <primitive object={scene} dispose={null} />;
}

/** Frames the whole room from the front, above the open side. */
function CameraRig({ floor }: { floor: Rect }) {
  const size = useThree((state) => state.size);
  const get = useThree((state) => state.get);
  useLayoutEffect(() => {
    const { camera } = get();
    const cx = (floor.minX + floor.maxX) / 2;
    const cz = (floor.minZ + floor.maxZ) / 2;
    const width = floor.maxX - floor.minX;
    const depth = floor.maxZ - floor.minZ;
    camera.position.set(cx, 22, cz + 19);
    camera.lookAt(cx, 0.6, cz);
    if ("zoom" in camera) camera.zoom = Math.min(size.width / (width + 2.5), size.height / (depth * 0.82 + 5));
    camera.updateProjectionMatrix();
  }, [floor, get, size.height, size.width]);
  return null;
}

/** A small low-poly unicorn. It faces +Z. */
function Unicorn({ movingRef }: { movingRef: React.RefObject<boolean> }) {
  const body = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!body.current) return;
    body.current.position.y = movingRef.current ? Math.abs(Math.sin(clock.elapsedTime * 11)) * 0.07 : 0;
  });
  const white = "#fffaff";
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position-y={0.01}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#5b3f78" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <group ref={body}>
        <mesh position={[0, 0.62, 0]} scale={[1, 0.85, 1.25]}><sphereGeometry args={[0.36, 20, 14]} /><meshStandardMaterial color={white} /></mesh>
        {[[-0.16, 0.22], [0.16, 0.22], [-0.16, -0.24], [0.16, -0.24]].map(([x, z]) => (
          <mesh key={`${x}${z}`} position={[x, 0.22, z]}><cylinderGeometry args={[0.07, 0.07, 0.44, 10]} /><meshStandardMaterial color={white} /></mesh>
        ))}
        <mesh position={[0, 1.05, 0.4]}><sphereGeometry args={[0.29, 20, 14]} /><meshStandardMaterial color={white} /></mesh>
        <mesh position={[0, 0.97, 0.64]}><sphereGeometry args={[0.15, 16, 10]} /><meshStandardMaterial color="#ffd6ea" /></mesh>
        <mesh position={[0, 1.42, 0.47]} rotation-x={0.35}><coneGeometry args={[0.07, 0.38, 10]} /><meshStandardMaterial color="#f5c84c" /></mesh>
        {[-1, 1].map((side) => (
          <mesh key={`ear${side}`} position={[side * 0.17, 1.3, 0.3]} rotation-z={-side * 0.3}><coneGeometry args={[0.06, 0.16, 8]} /><meshStandardMaterial color={white} /></mesh>
        ))}
        {[-1, 1].map((side) => (
          <mesh key={`eye${side}`} position={[side * 0.13, 1.1, 0.64]}><sphereGeometry args={[0.045, 10, 8]} /><meshStandardMaterial color="#3b2153" /></mesh>
        ))}
        {[[0, 1.28, 0.22, "#c9a7ff"], [0, 1.16, 0.06, "#ff9fd0"], [0, 1.0, -0.06, "#9fd9ff"]].map(([x, y, z, color]) => (
          <mesh key={`mane${z}`} position={[x as number, y as number, z as number]}><sphereGeometry args={[0.14, 12, 10]} /><meshStandardMaterial color={color as string} /></mesh>
        ))}
        <mesh position={[0, 0.74, -0.5]}><sphereGeometry args={[0.15, 12, 10]} /><meshStandardMaterial color="#ff9fd0" /></mesh>
      </group>
    </group>
  );
}

function Player({ data, pathRef, onArrive, movingRef }: {
  data: InteriorData;
  pathRef: React.RefObject<Point[]>;
  onArrive: () => void;
  movingRef: React.RefObject<boolean>;
}) {
  const ref = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.position.set(data.spawn.x, 0, data.spawn.z);
    // Face into the room, away from the entrance.
    ref.current.rotation.y = Math.PI;
  }, [data]);

  useFrame((_, delta) => {
    const player = ref.current;
    const waypoints = pathRef.current;
    if (!player || !waypoints.length) {
      movingRef.current = false;
      return;
    }
    movingRef.current = true;
    const next = waypoints[0];
    const dx = next.x - player.position.x;
    const dz = next.z - player.position.z;
    const distance = Math.hypot(dx, dz);
    const step = SPEED * Math.min(delta, 0.05);
    if (distance <= step) {
      player.position.set(next.x, 0, next.z);
      waypoints.shift();
      if (!waypoints.length) onArrive();
    } else {
      player.position.x += (dx / distance) * step;
      player.position.z += (dz / distance) * step;
      player.rotation.y = Math.atan2(dx, dz);
    }
    invalidate();
  });

  return <group ref={ref} name="player"><Unicorn movingRef={movingRef} /></group>;
}

function Marker({ x, z, label, kind, onSelect }: { x: number; z: number; label: string; kind: "hotspot" | "exit"; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ring = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ring.current) ring.current.position.y = 0.05 + Math.sin(clock.elapsedTime * 2.4 + x) * 0.03;
  });
  const color = kind === "exit" ? "#7839aa" : "#f5c84c";
  return (
    <group position={[x, 0, z]}>
      <group ref={ring}>
        <mesh rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.38, 0.6, 32]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.95 : 0.7} depthWrite={false} />
        </mesh>
        {/* A solid, invisible disc is the click target, so clicking the middle of the ring counts. */}
        <mesh rotation-x={-Math.PI / 2} position-y={0.01}
          onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
          onClick={(event) => { event.stopPropagation(); onSelect(); }}
        >
          <circleGeometry args={[0.75, 24]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
      <Html position={[0, 1.6, 0]} center style={{ pointerEvents: "none" }}>
        <span className={s.label} data-visible={hovered}>{label}</span>
      </Html>
    </group>
  );
}

function World({ data, sceneUrl, onReady, onInteract, onExit }: {
  data: InteriorData;
  sceneUrl: string;
  onReady: () => void;
  onInteract: (id: string) => void;
  onExit: (href: string) => void;
}) {
  const grid = useMemo(() => buildGrid(data.floor, data.blockers), [data]);
  const pathRef = useRef<Point[]>([]);
  const movingRef = useRef(false);
  const target = useRef<Target>(undefined);
  const scene = useThree((state) => state.scene);
  const invalidate = useThree((state) => state.invalidate);

  function walkTo(point: Point, next: Target) {
    const player = scene.getObjectByName("player");
    if (!player) return;
    pathRef.current = findPath(grid, { x: player.position.x, z: player.position.z }, point);
    target.current = next;
    if (!pathRef.current.length) arrive();
    invalidate();
  }

  function arrive() {
    const reached = target.current;
    target.current = undefined;
    if (reached?.kind === "hotspot") onInteract(reached.id);
    if (reached?.kind === "exit") onExit(data.exits.find(({ id }) => id === reached.id)?.href ?? "/home#town");
  }

  const { floor } = data;
  return (
    <>
      <CameraRig floor={floor} />
      <Room url={sceneUrl} onReady={onReady} />
      <mesh
        rotation-x={-Math.PI / 2}
        position={[(floor.minX + floor.maxX) / 2, 0.02, (floor.minZ + floor.maxZ) / 2]}
        onClick={(event: ThreeEvent<MouseEvent>) => walkTo({ x: event.point.x, z: event.point.z }, undefined)}
      >
        <planeGeometry args={[floor.maxX - floor.minX, floor.maxZ - floor.minZ]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {data.hotspots.map((hotspot) => (
        <Marker key={hotspot.id} {...hotspot} kind="hotspot" onSelect={() => walkTo(hotspot, { kind: "hotspot", id: hotspot.id })} />
      ))}
      {data.exits.map((exit) => (
        <Marker key={exit.id} {...exit} kind="exit" onSelect={() => walkTo(exit, { kind: "exit", id: exit.id })} />
      ))}
      <Player data={data} pathRef={pathRef} onArrive={arrive} movingRef={movingRef} />
    </>
  );
}

export default function InteriorScene({ data, sceneUrl, onReady, onInteract, onExit }: {
  data: InteriorData;
  sceneUrl: string;
  onReady: () => void;
  onInteract: (id: string) => void;
  onExit: (href: string) => void;
}) {
  return (
    <Canvas
      // No tone mapping: the default ACES curve desaturates the pastel materials.
      flat
      orthographic
      camera={{ near: 0.1, far: 200, position: [0, 22, 19] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#efe6f7"]} />
      <hemisphereLight args={["#fff6fb", "#c9b8dc", 1.2]} />
      <directionalLight position={[-8, 16, 10]} intensity={2} color="#fff4e6" />
      <directionalLight position={[8, 10, -8]} intensity={0.4} color="#d7eaff" />
      <Suspense fallback={null}>
        <World data={data} sceneUrl={sceneUrl} onReady={onReady} onInteract={onInteract} onExit={onExit} />
      </Suspense>
    </Canvas>
  );
}
