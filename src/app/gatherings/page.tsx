import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import orchard from "@/assets/gatherings-orchard.webp";
import { gatheringsCareersPath } from "@/content/businesses";
import VenueCatalog from "./VenueCatalog";
import s from "./gatherings.module.css";

export const metadata: Metadata = {
  title: "Gatherings · Unicorn Warehouse",
  description: "Find a venue for birthdays, private dinners, weddings, and sunset charters.",
};

export default function GatheringsPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Unicorn Warehouse Gatherings</p>
          <h1>Make it <em>an occasion.</em></h1>
          <p>From birthday candles at Funplex to dinner on the water. Find the room, the table, and the people who’ll bring it all together.</p>
          <a className={s.button} href="#venues">Explore venues ↓</a>
        </div>
        <Image src={orchard} alt="A long dinner table set under the glass roof of The Glass Orchard" sizes="(max-width: 800px) 95vw, 640px" preload />
      </header>
      <VenueCatalog />
      <footer className={s.links}>
        <Link href={gatheringsCareersPath}>Work at Gatherings →</Link>
        <Link href="/terms#gatherings">Gatherings Terms &amp; Conditions →</Link>
        <Link href="/product-details#gatherings">Gatherings Product Details →</Link>
      </footer>
    </main>
  );
}
