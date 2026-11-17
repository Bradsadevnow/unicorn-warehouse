import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import hero from "@/assets/living-hero.webp";
import { livingCareersPath } from "@/content/businesses";
import { starterHomes } from "@/content/living";
import { starterHomeAddress } from "@/server/starterHomes";
import RentalFinder from "./RentalFinder";
import s from "./living.module.css";

export const metadata: Metadata = {
  title: "Unicorn Warehouse Living",
  description: "Find a rental home and compare monthly rent, floor plans, and move-in costs in Tokens.",
};

export default function LivingPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div className={s.heroCopy}>
          <p className="label">Unicorn Warehouse Living</p>
          <h1>Feel right at home.</h1>
          <p className={s.lede}>Find a place that fits the life you live today. Leave the details to us.</p>
          <a className={s.button} href="#rentals">Find a rental ↓</a>
        </div>
        <Image src={hero} alt="A unicorn moves into a pastel neighborhood with townhouses and a bus stop" sizes="(max-width: 800px) 94vw, 720px" preload />
      </header>
      <RentalFinder />
      <section id="starter-homes" className={s.starter}>
        <div className={s.starterIntro}>
          <p className="label">Starter Homes</p>
          <h2>Somewhere to start.</h2>
          <p>New team members choose a starter home when they accept a position. Rent is weekly, so you never commit to more home than you need. Your first week is on us.</p>
        </div>
        <div className={s.cards}>
          {starterHomes.map((home) => (
            <article key={home.id} id={`starter-${home.id}`} className={s.card}>
              <div className={s.cardBody}>
                <span className={s.neighborhood}>{home.neighborhood} · {home.kind} · {home.area} sq ft</span>
                <h3>{home.name}</h3>
                <p>{home.description}</p>
                <ul className={s.tags}>{home.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
                <p className={s.note}>{home.finePrint}</p>
                <strong>{home.weeklyRent} Tokens a week</strong>
                <span className={s.neighborhood}>{starterHomeAddress(home)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={s.reassurance}>
        <div>
          <h2>Your life can change.<br />Your address can, too.</h2>
          <p>Planning for a new shift, a bigger household, or a quieter block? Ask about a move within Living. We’ll help you find a place for what’s next and take care of maintenance while you’re here.</p>
        </div>
        <Link href="/tokens#bank">See how to pay rent with Everyday Tokens →</Link>
      </section>
      <footer className={s.footer}>
        <Link href={livingCareersPath}>Careers at Living</Link>
        <Link href="/terms#living">Terms &amp; Conditions</Link>
        <Link href="/product-details#living">Product Details</Link>
      </footer>
    </main>
  );
}
