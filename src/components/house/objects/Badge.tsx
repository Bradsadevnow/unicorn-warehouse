"use client";

import { useEffect, useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, SRGBColorSpace, type Group } from "three";
import { stage } from "../stage";

function makeCredentialTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 896;
  const ink = canvas.getContext("2d");
  if (ink) {
    ink.fillStyle = "#171b20";
    ink.font = "bold 56px sans-serif";
    ink.fillText("HelpingHand", 36, 176);
    ink.font = "24px monospace";
    ink.fillText("WORKFORCE CREDENTIAL", 38, 225);
    ink.fillRect(38, 251, 564, 3);
    ink.fillText("UNIT OF EFFORT", 38, 596);
    ink.font = "bold 42px monospace";
    ink.fillText("SLX-0003", 38, 654);

    let x = 39;
    for (const width of [9, 4, 15, 6, 4, 12, 6, 10, 4, 16, 6, 10, 4, 8, 16, 5, 8, 12, 4, 7, 12, 5]) {
      ink.fillRect(x, 702, width, 78);
      x += width + 7;
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export default function Badge() {
  const plate = useRef<Group>(null);
  const chip = useRef<Group>(null);
  const backing = useRef<Group>(null);
  const label = useMemo(() => makeCredentialTexture(), []);
  useEffect(() => () => label.dispose(), [label]);

  useFrame(() => {
    const separation = stage.explode;
    plate.current?.position.set(-0.66 * separation, 0.19 * separation, 0.32 * separation);
    chip.current?.position.set(0.76 * separation, -0.24 * separation, 0.55 * separation);
    backing.current?.position.set(0.59 * separation, 0.36 * separation, -0.32 * separation);
  });

  return (
    <group>
      <group ref={backing}>
        <RoundedBox args={[1.85, 2.55, 0.14]} radius={0.1} position={[0, 0, -0.09]}>
          <meshStandardMaterial color="#69aa94" metalness={0.75} roughness={0.35} />
        </RoundedBox>
      </group>
      <group ref={plate}>
        <RoundedBox args={[1.86, 2.56, 0.12]} radius={0.09}>
          <meshStandardMaterial color="#a8e0c4" metalness={0.18} roughness={0.34} />
        </RoundedBox>
        <mesh position={[0, 0, 0.062]}>
          <planeGeometry args={[1.64, 2.3]} />
          <meshBasicMaterial map={label} transparent depthWrite={false} />
        </mesh>
        <RoundedBox args={[0.36, 0.09, 0.02]} radius={0.02} position={[0, 1.07, 0.061]}>
          <meshStandardMaterial color="#232725" roughness={0.6} />
        </RoundedBox>
      </group>
      <group ref={chip}>
        <RoundedBox args={[0.6, 0.43, 0.075]} radius={0.035} position={[-0.44, 0.02, 0.08]}>
          <meshStandardMaterial color="#b78c47" metalness={0.74} roughness={0.36} />
        </RoundedBox>
        {[-0.61, -0.44, -0.27].map((x) => (
          <mesh key={x} position={[x, 0.02, 0.12]}>
            <planeGeometry args={[0.012, 0.36]} />
            <meshBasicMaterial color="#544222" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
