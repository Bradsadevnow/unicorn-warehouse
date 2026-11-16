"use client";

import { Html, Line, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { BoxGeometry } from "three";
import type { OrbitControls as OrbitControlsInstance } from "three-stdlib";
import locations from "@/content/unicornopolisScene.json";
import type { Point } from "@/content/unicornopolis";
import s from "./map.module.css";

type Target = (typeof locations)[number];
type Coordinates = [number, number, number];
type SceneProps = {
  selected: string | undefined;
  onSelect: (id: string) => void;
  names: Record<string, string>;
  route: readonly Point[];
  bus: boolean;
};

const modelPath = "/unicornopolis/town.glb";
const hitGeometry = new BoxGeometry(1, 1, 1);
const vector = (values: number[]): Coordinates => [values[0], values[1], values[2]];
const overview: Coordinates = [0, 5, -34];
const offset: Coordinates = [142, 166, 225];

function roadPosition({ x, y }: Point): Coordinates {
  return [(x + Number(x >= 6) - 10) * 10, 0.5, (y + Number(y >= 6) - 10) * 10];
}

function CameraSetup({ reset, controls }: { reset: number; controls: OrbitControlsInstance | null }) {
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const get = useThree((state) => state.get);

  useLayoutEffect(() => {
    if (!controls) return;
    // Read the camera from the store so the effect does not mutate a hook return value.
    const { camera } = get();
    camera.position.set(overview[0] + offset[0], overview[1] + offset[1], overview[2] + offset[2]);
    controls.target.set(...overview);
    camera.lookAt(...overview);
    if ("zoom" in camera) camera.zoom = Math.min(size.width / 390, size.height / 300);
    camera.updateProjectionMatrix();
    controls.update();
    invalidate();
  }, [controls, get, invalidate, reset, size.height, size.width]);

  return null;
}

function TownGeometry({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(modelPath, false, true);
  useEffect(() => { onReady(); }, [onReady]);
  return <primitive object={scene} dispose={null} />;
}

function HitRegion({ target, highlighted, onEnter, onLeave, onSelect }: {
  target: Target;
  highlighted: boolean;
  onEnter: (id: string) => void;
  onLeave: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <mesh
      geometry={hitGeometry}
      dispose={null}
      name={target.id}
      position={vector(target.center)}
      scale={vector(target.size)}
      onPointerOver={(event) => { event.stopPropagation(); onEnter(target.id); }}
      onPointerOut={() => onLeave(target.id)}
      onClick={(event) => {
        event.stopPropagation();
        if (event.delta <= 5) onSelect(target.id);
      }}
    >
      <meshBasicMaterial color="#ffdb84" transparent opacity={highlighted ? 0.3 : 0} depthWrite={false} />
    </mesh>
  );
}

function Poster({ children }: { children?: ReactNode }) {
  return <div className={s.poster}>{children && <span>{children}</span>}</div>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <Poster>Use the address picker to explore town.</Poster> : this.props.children;
  }
}

function Viewer({ selected, onSelect, names, route, bus }: SceneProps) {
  const [hovered, setHovered] = useState<string>();
  const [ready, setReady] = useState(false);
  const [reset, setReset] = useState(0);
  const [controls, setControls] = useState<OrbitControlsInstance | null>(null);
  const active = locations.find(({ id }) => id === (hovered ?? selected));

  return (
    <div className={s.viewer} data-interactive={Boolean(hovered)}>
      <Canvas
        orthographic
        camera={{ near: 0.1, far: 1400, position: offset }}
        dpr={[1, 1.5]}
        frameloop="demand"
        fallback={<Poster>Use the address picker to explore town.</Poster>}
        gl={{ antialias: true, powerPreference: "default" }}
        onPointerMissed={() => setHovered(undefined)}
      >
        <color attach="background" args={["#dce8f1"]} />
        <ambientLight intensity={2.1} />
        <directionalLight position={[-115, 180, 85]} intensity={2.25} />
        <directionalLight position={[70, 65, -110]} intensity={0.65} color="#d7eaff" />
        <OrbitControls
          ref={setControls}
          minZoom={0.42}
          maxZoom={7}
          minPolarAngle={0.12}
          maxPolarAngle={Math.PI / 2.35}
          zoomSpeed={0.65}
          enableDamping
          dampingFactor={0.15}
        />
        <CameraSetup reset={reset} controls={controls} />
        <Suspense fallback={null}>
          <TownGeometry onReady={flagReady} />
          {locations.map((target) => (
            <HitRegion
              key={target.id}
              target={target}
              highlighted={target.id === hovered || target.id === selected}
              onEnter={setHovered}
              onLeave={(id) => setHovered((current) => current === id ? undefined : current)}
              onSelect={onSelect}
            />
          ))}
          {route.length > 1 && <Line points={route.map(roadPosition)} color={bus ? "#008454" : "#e6a643"} lineWidth={3} depthWrite={false} />}
          {active && names[active.id] && <Html
            position={[active.center[0], active.center[1] + active.size[1] / 2 + 4, active.center[2]]}
            center
            style={{ pointerEvents: "none" }}
          ><span className={s.mapLabel}>{names[active.id]}</span></Html>}
        </Suspense>
      </Canvas>
      {!ready && <div className={s.loadingOverlay} aria-hidden="true"><Poster>Loading the 3D town…</Poster></div>}
      {ready && <button className={s.reset} type="button" onClick={() => setReset((current) => current + 1)}>Reset view</button>}
    </div>
  );

  function flagReady() {
    setReady(true);
  }
}

export default function TownScene(props: SceneProps) {
  return <SceneBoundary><Viewer {...props} /></SceneBoundary>;
}
