"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { blockMetres, cellKey, cloverLoopRoute, cloverLoopStops, isRoad, lotsByCell, roadLabel, streetRoute, townLots, townSize, zoneNames } from "@/content/unicornopolis";
import s from "./map.module.css";

const depot = townLots.find(({ id }) => id === "fulfillment")!;
const cells = Array.from({ length: townSize ** 2 }, (_, index) => {
  const point = { x: index % townSize, y: Math.floor(index / townSize) };
  const key = cellKey(point);
  return { key, lot: lotsByCell.get(key), road: isRoad(point), street: roadLabel(point) };
});
const format = new Intl.NumberFormat("en-US");
const busKeys = new Set(cloverLoopRoute.map(cellKey));
const busStops = new Map<string, string>(cloverLoopStops.map(({ name, point }) => [cellKey(point), name]));

export default function TownMap() {
  const [lotId, selectLot] = useState<string>();
  const linkedLot = useSearchParams().get("lot");
  const [routeLayer, setRouteLayer] = useState("delivery");
  const selected = townLots.find(({ id }) => id === (lotId ?? linkedLot))
    ?? townLots.find(({ id }) => id === "home-stoop-2")!;
  const route = routeLayer === "delivery" ? streetRoute(depot.entrance, selected.entrance) : [];
  const routeKeys = new Set(route.map(cellKey));
  const metres = Math.max(0, route.length - 1) * blockMetres;

  return (
    <div className={s.workspace}>
      <section className={s.boardPanel} aria-label="Unicornopolis street map">
        <div className={s.boardHeader}><span>↑ North</span><span>{townSize} × {townSize} lots · {blockMetres} m per square</span></div>
        <div className={s.scroll}>
          <div className={s.board} style={{ gridTemplateColumns: `repeat(${townSize}, minmax(0, 1fr))` }}>
            {cells.map(({ key, lot, road, street }) => lot ? (
              <button
                className={s.lot}
                type="button"
                key={key}
                data-zone={lot.zone}
                data-model={lot.model}
                aria-label={`${lot.name}, ${lot.address}`}
                title={`${lot.name} · ${lot.address}`}
                aria-pressed={lot.id === selected.id}
                tabIndex={-1}
                onClick={() => selectLot(lot.id)}
              >{lot.icon}</button>
            ) : (
              <div
                key={key}
                className={road ? s.road : s.empty}
                data-route={routeKeys.has(key) || undefined}
                data-bus={routeLayer === "bus" && busKeys.has(key) || undefined}
                data-stop={routeLayer === "bus" && busStops.has(key) || undefined}
                title={routeLayer === "bus" ? busStops.get(key) ?? street : street || undefined}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <ul className={s.legend} aria-label="Map legend">
          {Object.entries(zoneNames).map(([zone, label]) => <li key={zone}><span data-zone={zone} />{label}</li>)}
          <li><span className={s.routeKey} />Delivery route</li>
          <li><span className={s.busKey} />Clover Loop</li>
        </ul>
      </section>

      <aside className={s.sidebar} aria-label="Address and delivery details">
        <label>Choose an address
          <select value={selected.id} onChange={(event) => selectLot(event.target.value)}>
            <optgroup label="Businesses and civic buildings">
              {townLots.filter((lot) => !lot.model).map((lot) => <option key={lot.id} value={lot.id}>{lot.name}</option>)}
            </optgroup>
            <optgroup label="Residential addresses">
              {townLots.filter((lot) => lot.model).map((lot) => <option key={lot.id} value={lot.id}>{lot.name} · {lot.address}</option>)}
            </optgroup>
          </select>
        </label>
        <div className={s.address} aria-live="polite">
          <p className="label">{selected.district ?? zoneNames[selected.zone]}</p>
          <h2>{selected.name}</h2>
          <p className={s.street}>{selected.address}</p>
          {selected.model && <p>Standard plan · {format.format(selected.rent!)} Tokens / month</p>}
          <Link href={selected.href}>{selected.model ? "Browse Living rentals" : selected.href.startsWith("/map#") ? "See town information" : "Visit website"} →</Link>
        </div>
        <div className={s.route}>
          <label>Route layer
            <select value={routeLayer} onChange={(event) => setRouteLayer(event.target.value)}>
              <option value="delivery">Delivery from Fulfillment</option>
              <option value="bus">Clover Loop bus</option>
              <option value="none">No route</option>
            </select>
          </label>
          {routeLayer === "delivery" && (
            <div aria-live="polite">
              <p>{route.length <= 1 ? "At the Fulfillment entrance" : `${format.format(metres / 1000)} km by road`}</p>
              {route.length > 1 && <p className={s.muted}>{depot.address} → {selected.address}</p>}
            </div>
          )}
          {routeLayer === "bus" && <Link href="#clover-loop">See Clover Loop stops →</Link>}
        </div>
        <p className={s.muted}>Residential blocks repeat the same plan and lot spacing. Even Crown Gardens follows a standard layout.</p>
      </aside>
    </div>
  );
}
