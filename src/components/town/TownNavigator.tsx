"use client";

import dynamic from "next/dynamic";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TransitionLink } from "@/components/Veil";
import s from "./town.module.css";

const TownScene = dynamic(() => import("./TownScene"), { ssr: false });

export type TownPlace = {
  id: string;
  name: string;
  description: string;
  address: string;
  district?: string;
  zone: string;
  rent?: number;
  model?: string;
  href: string;
  openLabel: string;
  image?: StaticImageData | string;
  careersHref?: string;
};

export type TownGroup = { id: string; name: string; places: readonly string[] };

const tokens = new Intl.NumberFormat("en-US");

function subscribeToHistory(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readLinkedLot() {
  return new URLSearchParams(window.location.search).get("lot");
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function TownNavigator({ places, groups, featured, poster }: {
  places: readonly TownPlace[];
  groups: readonly TownGroup[];
  featured: readonly string[];
  poster: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"map" | "list">("map");
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  // undefined: nothing chosen yet, so a linked place may show. null: the card was closed.
  const [chosenId, setSelectedId] = useState<string | null>();
  // Links such as /home?lot=marina#town open with that place selected.
  const linkedId = useSyncExternalStore(subscribeToHistory, readLinkedLot, () => null);
  const byId = new Map(places.map((place) => [place.id, place]));
  const selectedId = chosenId === undefined
    ? (linkedId && byId.has(linkedId) ? linkedId : undefined)
    : chosenId ?? undefined;
  const selected = selectedId ? byId.get(selectedId) : undefined;
  const names = Object.fromEntries(places.map(({ id, name }) => [id, name]));

  const markReady = useCallback(() => setReady(true), []);
  const markUnavailable = useCallback(() => {
    setUnavailable(true);
    setView("list");
  }, []);

  // Load the 3D town only when the section approaches the viewport.
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!hasWebGL()) markUnavailable();
        setNear(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [markUnavailable]);


  const select = useCallback((id: string | undefined) => {
    setSelectedId(id ?? null);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("lot", id);
    else url.searchParams.delete("lot");
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const showMap = view === "map" && !unavailable;

  return (
    <div className={s.navigator} ref={root}>
      <div className={s.toolbar}>
        <p>{showMap ? "Drag to look around. Tap a building to see what’s inside." : "Every address in Unicornopolis, by neighborhood."}</p>
        {!unavailable && (
          <div className={s.toggle} role="group" aria-label="Town view">
            <button type="button" aria-pressed={view === "map"} onClick={() => setView("map")}>3D map</button>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>List</button>
          </div>
        )}
      </div>

      <div className={s.layout}>
        <div className={s.stage}>
          {showMap ? (
            <div className={s.mapFrame}>
              {!ready && (
                <div className={s.poster}>
                  <Image src={poster} alt="" fill sizes="(max-width: 900px) 100vw, 66vw" />
                  <span>{near ? "Loading the 3D town…" : "Unicornopolis"}</span>
                </div>
              )}
              {near && (
                <TownScene
                  selected={selectedId}
                  onSelect={select}
                  onReady={markReady}
                  onUnavailable={markUnavailable}
                  names={names}
                />
              )}
            </div>
          ) : (
            <div className={s.list}>
              {unavailable && <p className={s.fine}>The 3D map isn’t available on this device, so here’s every address instead.</p>}
              {groups.map(({ id, name, places: ids }) => (
                <section key={id} aria-labelledby={`town-group-${id}`}>
                  <h3 id={`town-group-${id}`}>{name}</h3>
                  <ul>
                    {ids.map((placeId) => {
                      const place = byId.get(placeId);
                      if (!place) return null;
                      return (
                        <li key={place.id}>
                          <button type="button" aria-pressed={place.id === selectedId} onClick={() => select(place.id)}>
                            <b>{place.name}</b>
                            <span>{place.model ? `${place.district} · ${tokens.format(place.rent ?? 0)} Tokens a month` : place.address}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        <aside className={s.card} aria-live="polite" aria-label="Selected place">
          {selected ? (
            <>
              {selected.image && (
                <div className={s.cardArt}>
                  <Image src={selected.image} alt="" fill sizes="(max-width: 900px) 100vw, 360px" />
                </div>
              )}
              <div className={s.cardBody}>
                <p className="label">{selected.district ?? selected.zone}</p>
                <h3>{selected.name}</h3>
                <p className={s.address}>{selected.address}</p>
                {selected.model && selected.rent !== undefined && <p className={s.rent}>{tokens.format(selected.rent)} Tokens a month</p>}
                <p>{selected.description}</p>
                <div className={s.cardLinks}>
                  <TransitionLink href={selected.href} className={s.primary}>{selected.openLabel} →</TransitionLink>
                  {selected.careersHref && <TransitionLink href={selected.careersHref}>Work here →</TransitionLink>}
                </div>
                <button type="button" className={s.close} onClick={() => select(undefined)}>Close</button>
              </div>
            </>
          ) : (
            <div className={s.cardBody}>
              <p className="label">Welcome to Unicornopolis</p>
              <h3>Where would you like to go?</h3>
              <p>{showMap ? "Tap any building on the map, or start with a favorite." : "Pick an address from the list, or start with a favorite."}</p>
              <ul className={s.featured}>
                {featured.map((id) => {
                  const place = byId.get(id);
                  return place && <li key={id}><button type="button" onClick={() => select(id)}>{place.name}</button></li>;
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
