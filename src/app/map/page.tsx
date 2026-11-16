import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { cloverLoopStops, townLots } from "@/content/unicornopolis";
import TownMap from "./TownMap";
import s from "./map.module.css";

export const metadata: Metadata = {
  title: "Map of Unicornopolis",
  description: "Explore the streets, storefronts, and residential districts of Unicornopolis.",
};

const civicServices = [
  { id: "town-hall", lot: "town-hall", copy: "Stop by the bulletin board for street closures, school concerts, marina notices, and lost pets." },
  { id: "works-yard", lot: "public-works", copy: "The home base for street repairs, the water tower, the shoreline crew, and the trucks that keep it all running." },
  { id: "fire-rescue", lot: "fire-rescue", copy: "The town’s fire and rescue crews share the Public Works campus, with a road out toward the lake." },
  { id: "police-station", lot: "police", copy: "Look for the blue roof and the planter by the front door. The little counter is where you ask about lost property or speak to the neighborhood patrol." },
  { id: "clover-commons", lot: "clover-commons", copy: "A public lawn, shade trees, and a loop path on the walk from Market Square to Clover Lake." },
];

export default function MapPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <h1>Unicornopolis</h1>
          <p>Find a business, pick an address, or follow a delivery down streets where every home has a familiar face.</p>
        </div>
        <Link href="/home#businesses">Explore businesses →</Link>
      </header>
      <Suspense fallback={<p>Opening the town map…</p>}>
        <TownMap />
      </Suspense>
      <section className={s.townInfo} id="clover-loop" aria-labelledby="bus-heading">
        <h2 id="bus-heading">The Clover Loop</h2>
        <p>One loop through town. The marina stop runs on weekends.</p>
        <ol>{cloverLoopStops.map((stop) => <li key={stop.name}>{stop.name}{("weekendOnly" in stop) && " · Weekends"}</li>)}</ol>
      </section>
      <section className={s.townInfo} aria-labelledby="town-services-heading">
        <h2 id="town-services-heading">Around town</h2>
        <div className={s.civicCards}>
          {civicServices.map(({ id, lot, copy }) => {
            const place = townLots.find(({ id }) => id === lot)!;
            return <article key={id} id={id}><h3>{place.name}</h3><p>{place.address}</p><p>{copy}</p></article>;
          })}
        </div>
      </section>
    </main>
  );
}
