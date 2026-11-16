import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import art from "@/assets/flock-hero.webp";
import { flockContinuity } from "@/content/flock";
import CheckInPreview from "./CheckInPreview";
import s from "./flock.module.css";

export const metadata: Metadata = {
  title: "Flock by Clover Cloud",
  description: "An employee benefit that helps your people know you made it home.",
};

export default function FlockPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Flock™ by Clover Cloud</p>
          <h1>A little company on the way home.</h1>
          <p>Pick the people you’d like to check in with. Flock can send a little note when you make it home, or let someone know if you’re running late.</p>
          <a href="#check-in">See a check-in ↓</a>
        </div>
        <Image src={art} alt="Pastel birds on little birdhouses outside the Clover Cloud campus" preload sizes="(max-width: 740px) 95vw, 660px" />
      </header>
      <CheckInPreview />
      <section className={s.campus} aria-labelledby="campus-heading">
        <div>
          <h2 id="campus-heading">Clover Cloud Data Center</h2>
          <p>Flock has a home of its own in the Depot District, right by Fulfillment. Look for the teal roof and the little row of birdhouses.</p>
          <Link href="/home?lot=clover-cloud#town">Find Clover Cloud on the town map →</Link>
        </div>
        <div>
          <h3>Keep your flock together.</h3>
          <p>Flock comes with eligible employment. If that changes, Household Continuity keeps household check-ins going for {flockContinuity.price} Tokens every {flockContinuity.days} days.</p>
          <Link href="/careers#benefits">Explore employee benefits →</Link>
        </div>
      </section>
      <footer className={s.links}>
        <Link href="/terms#flock">Flock Terms &amp; Conditions</Link>
        <Link href="/product-details#flock">Flock Product Details</Link>
      </footer>
    </main>
  );
}
