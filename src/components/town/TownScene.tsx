"use client";

import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { BoxGeometry } from "three";
import type { OrbitControls as OrbitControlsInstance } from "three-stdlib";
import locations from "@/content/unicornopolisScene.json";
import s from "./town.module.css";

type Target = (typeof locations)[number];
type Coordinates = [number, number, number];
export type TownSceneProps = {
  selected: string | undefined;
  onSelect: (id: string) => void;
  onReady: () => void;
  onUnavailable: () => void;
  names: Record<string, string>;
};

const modelPath = "/unicornopolis/town.glb";
const hitGeometry = new BoxGeometry(1, 1, 1);
const vector = (values: number[]): Coordinates => [values[0], values[1], values[2]];
const overview: Coordinates = [0, 5, -34];
const offset: Coordinates = [142, 166, 225];
const minZoom = 0.42;
const maxZoom = 7;

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
    if ("zoom" in camera) camera.zoom = Math.min(size.width / 330, size.height / 250);
    camera.updateProjectionMatrix();
    controls.update();
    invalidate();
  }, [controls, get, invalidate, reset, size.height, size.width]);

  return null;
}

/** Applies a zoom step from the on-screen buttons. Wheel zoom is off so the page scrolls over the map. */
function ZoomStep({ request, controls }: { request: { count: number; factor: number }; controls: OrbitControlsInstance | null }) {
  const get = useThree((state) => state.get);

  useEffect(() => {
    if (!request.count || !controls) return;
    const { camera, invalidate } = get();
    camera.zoom = Math.min(maxZoom, Math.max(minZoom, camera.zoom * request.factor));
    camera.updateProjectionMatrix();
    controls.update();
    invalidate();
  }, [controls, get, request]);

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
      <meshBasicMaterial color="#ffdb84" transparent opacity={highlighted ? 0.35 : 0} depthWrite={false} />
    </mesh>
  );
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Viewer({ selected, onSelect, onReady, names }: TownSceneProps) {
  const [hovered, setHovered] = useState<string>();
  const [ready, setReady] = useState(false);
  const [reset, setReset] = useState(0);
  const [controls, setControls] = useState<OrbitControlsInstance | null>(null);
  const [zoomRequest, setZoomRequest] = useState({ count: 0, factor: 1 });
  const zoom = (factor: number) => setZoomRequest(({ count }) => ({ count: count + 1, factor }));
  const active = locations.find(({ id }) => id === (hovered ?? selected));

  return (
    <div className={s.viewer} data-interactive={Boolean(hovered)}>
      <Canvas
        // No tone mapping: the default ACES curve desaturates the pastel materials.
        flat
        orthographic
        camera={{ near: 0.1, far: 1400, position: offset }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: true, powerPreference: "default" }}
        onPointerMissed={() => setHovered(undefined)}
      >
        <color attach="background" args={["#dce8f1"]} />
        <hemisphereLight args={["#fff6fb", "#c9b8dc", 1.15]} />
        <directionalLight position={[-115, 180, 85]} intensity={2.1} color="#fff4e6" />
        <directionalLight position={[70, 65, -110]} intensity={0.45} color="#d7eaff" />
        <OrbitControls
          ref={setControls}
          minZoom={minZoom}
          maxZoom={maxZoom}
          enableZoom={false}
          minPolarAngle={0.12}
          maxPolarAngle={Math.PI / 2.35}
          enableDamping
          dampingFactor={0.15}
        />
        <CameraSetup reset={reset} controls={controls} />
        <ZoomStep request={zoomRequest} controls={controls} />
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
          {active && names[active.id] && <Html
            position={[active.center[0], active.center[1] + active.size[1] / 2 + 4, active.center[2]]}
            center
            style={{ pointerEvents: "none" }}
          ><span className={s.mapLabel}>{names[active.id]}</span></Html>}
        </Suspense>
      </Canvas>
      {ready && (
        <div className={s.controls}>
          <button type="button" aria-label="Zoom in" onClick={() => zoom(1.35)}>+</button>
          <button type="button" aria-label="Zoom out" onClick={() => zoom(1 / 1.35)}>−</button>
          <button type="button" onClick={() => setReset((current) => current + 1)}>Reset view</button>
        </div>
      )}
    </div>
  );

  function flagReady() {
    setReady(true);
    onReady();
  }
}

export default function TownScene(props: TownSceneProps) {
  return <SceneBoundary onError={props.onUnavailable}><Viewer {...props} /></SceneBoundary>;
}
