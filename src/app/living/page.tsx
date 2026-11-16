import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import hero from "@/assets/living-hero.webp";
import { livingCareersPath } from "@/content/businesses";
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
