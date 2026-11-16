import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import hero from "@/assets/wellness-hero.webp";
import { wellnessCycleDays, wellnessPlans } from "@/content/wellness";
import Pharmacy from "./Pharmacy";
import VisitPreview from "./VisitPreview";
import s from "./wellness.module.css";

export const metadata: Metadata = {
  title: "Unicorn Warehouse Wellness",
  description: "Explore neighborhood clinics and compare Wellness memberships in Tokens.",
};

export default function WellnessPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Unicorn Warehouse Wellness</p>
          <h1>Care that feels close to home.</h1>
          <p>A familiar face, a neighborhood clinic, and a little help finding the right kind of care for your day.</p>
          <nav className={s.links} aria-label="Explore Wellness">
            <a href="#plans">Find your care plan ↓</a>
            <a href="#pharmacy">Visit the pharmacy ↓</a>
          </nav>
        </div>
        <Image src={hero} alt="A smiling unicorn welcomes a member to a sunlit neighborhood clinic" sizes="(max-width: 800px) 94vw, 700px" preload />
      </header>
      <section id="plans" className={s.section}>
        <h2>Find care that fits.</h2>
        <p>Every plan is a renewable subscription paid in Everyday Tokens.</p>
        <div className={s.plans}>
          {wellnessPlans.map(({ id, name, price, tone, line, benefit }) => (
            <article className={s.plan} key={id} data-tone={tone}>
              <h3>{name}</h3>
              <p>{line}</p>
              <p className={s.price}><strong>{price} Tokens</strong> / {wellnessCycleDays} days</p>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>
      <VisitPreview />
      <Pharmacy />
      <footer className={s.links}>
        <Link href="/tokens#bank">Pay with Everyday Tokens</Link>
        <Link href="/careers/wellness">Careers at Wellness</Link>
        <Link href="/terms#wellness">Terms &amp; Conditions</Link>
        <Link href="/product-details#wellness">Product Details</Link>
      </footer>
    </main>
  );
}
