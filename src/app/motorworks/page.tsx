import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import showroom from "@/assets/motors-showroom.webp";
import { motorworksCareersPath } from "@/content/businesses";
import DealershipTools from "./DealershipTools";
import s from "./motorworks.module.css";

export const metadata: Metadata = {
  title: "Unicorn Warehouse Motors",
  description: "Shop vehicles, compare Token payments, and plan your next visit to Motorworks.",
};

export default function MotorsPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Unicorn Warehouse Motors</p>
          <h1>Good things are <em>down the road.</em></h1>
          <p>Find a car for wherever work, life, or the next delivery takes you. We’ll take care of it right here at Motorworks.</p>
          <nav className={s.links} aria-label="Explore Motors">
            <a className={s.cta} href="#inventory">Shop vehicles ↓</a>
            <a href="#service">Motorworks Service</a>
            <a href="#financing">Financing</a>
          </nav>
        </div>
        <Image src={showroom} alt="A cheerful unicorn showing off a mint hatchback in the dealership" sizes="(max-width: 760px) 94vw, 660px" preload />
      </header>
      <DealershipTools />
      <footer className={s.links}>
        <Link href={motorworksCareersPath}>Careers at Motors →</Link>
        <Link href="/terms#motorworks">Terms &amp; Conditions</Link>
        <Link href="/product-details#motorworks">Product Details</Link>
      </footer>
    </main>
  );
}
