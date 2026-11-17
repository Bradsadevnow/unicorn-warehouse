"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { interiorAssets, interiors } from "@/content/interiors";
import type { InteriorData } from "./InteriorScene";
import s from "./interior.module.css";

const InteriorScene = dynamic(() => import("./InteriorScene"), { ssr: false });

/** "Step inside": a still render that opens the walkable interior on demand. */
export default function InteriorPanel({ id, title, hotspotActions }: { id: string; title?: string; hotspotActions?: Record<string, ReactNode> }) {
  const interior = interiors[id];
  const name = title ?? interior.name;
  const assets = interiorAssets(id);
  const router = useRouter();
  const [inside, setInside] = useState(false);
  const [data, setData] = useState<InteriorData>();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState<string>();
  const interaction = open ? interior.interactions[open] : undefined;

  useEffect(() => {
    if (!inside || data) return;
    let cancelled = false;
    fetch(assets.data)
      .then((response) => {
        if (!response.ok) throw new Error(`Interior data ${response.status}`);
        return response.json() as Promise<InteriorData>;
      })
      .then((json) => { if (!cancelled) setData(json); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [assets.data, data, inside]);

  const markReady = useCallback(() => setReady(true), []);
  const leave = useCallback(() => {
    setInside(false);
    setOpen(undefined);
  }, []);

  return (
    <section className={s.panel} aria-labelledby={`interior-${id}-heading`}>
      <div className={s.head}>
        <div>
          <p className="label">Step inside</p>
          <h2 id={`interior-${id}-heading`}>{name}</h2>
        </div>
        {inside && <button type="button" className={s.leave} onClick={leave}>Leave</button>}
      </div>

      <div className={s.frame}>
        {(!inside || !ready) && (
          <div className={s.still}>
            <Image src={assets.still} alt={`Inside ${name}`} fill sizes="(max-width: 900px) 100vw, 1100px" />
            {!inside && <button type="button" className={s.enter} onClick={() => setInside(true)}>Step inside →</button>}
            {inside && !failed && <span className={s.loading}>Opening the doors…</span>}
            {failed && <span className={s.loading}>The doors are stuck. Try again later.</span>}
          </div>
        )}
        {inside && data && (
          <div className={s.scene}>
            <InteriorScene
              data={data}
              sceneUrl={assets.scene}
              onReady={markReady}
              onInteract={setOpen}
              onExit={(href) => router.push(href)}
            />
          </div>
        )}
        {inside && ready && !interaction && (
          <p className={s.hint}>Tap the floor to walk. Tap a glowing ring to take a closer look.</p>
        )}
        {interaction && (
          <aside className={s.dialog} aria-live="polite">
            <h3>{interaction.title}</h3>
            <p>{interaction.body}</p>
            {open && hotspotActions?.[open]}
            <div className={s.dialogLinks}>
              {interaction.link && <Link href={interaction.link.href} onClick={leave}>{interaction.link.label} →</Link>}
              <button type="button" onClick={() => setOpen(undefined)}>Close</button>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
