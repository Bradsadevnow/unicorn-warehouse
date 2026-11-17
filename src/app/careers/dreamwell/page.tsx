import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/dreamwell-careers.webp";
import { getBusiness } from "@/content/businesses";
import TrackCallout from "@/components/TrackCallout";
import { brightsideBriefId } from "@/content/gigCatalogs";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Dreamwell Careers · Unicorn Warehouse",
  description: "Meet the evening team behind the Dreamwell Retreat and browse available assignments.",
};

const departments = [
  {
    name: "Evening Reception",
    manager: "Della Dusk",
    position: "Guest Arrivals Manager",
    color: "lilac",
    description: "Welcome guests, show them around the lounge, and help them settle in for the night.",
    quote: "A guest should never have to look at the clock. That’s why we keep it where only staff can see it.",
    shift: "Welcome evening guests at Dreamwell",
  },
  {
    name: "Guest Suites",
    manager: "Clover Quilt",
    position: "Suite Turnover Manager",
    color: "pink",
    description: "Put the little things back where guests expect them, from the lighting controls to the folded quilt.",
    quote: "The best compliment is when the next guest feels like they’re the first person ever to sleep here.",
    shift: "Reset a sleep suite between sessions",
  },
  {
    name: "Linen & Comfort",
    manager: "Rue Cotton",
    position: "Linen Service Manager",
    color: "mint",
    description: "Keep the suite teams supplied with fresh linens, fluffy towels, and the correct number of pillows.",
    quote: "The difference between a good night and a great one is often a pillow. That’s why we keep such careful track of them.",
    shift: "Restock the Dreamwell linen station",
  },
  {
    name: "Morning Stories",
    manager: "Goldie Rise",
    position: "Dreamwell Brightside Producer",
    color: "butter",
    description: "Help Brightside tell the story of a better morning. We’re looking for creators who can show how a little rest feels.",
    quote: "I love a genuine yawn. We usually get the best one on take three.",
    shift: "Show us your morning face",
  },
] as const;

export default function DreamwellCareersPage() {
  const dreamwell = getBusiness("dreamwell")!;

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Dreamwell Retreat · Hiring drive</p>
          <h1>Make room for <em>a better night.</em></h1>
          <p className={s.lede}>A fresh quilt. A quiet room. A warm welcome at the end of a long day. Join the team that makes rest feel like something to look forward to.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the Retreat teams ↓</a>
            <Link href="/somnara">Visit Dreamwell</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your place at the Retreat.</h2>
        <p>Get to know the team and see what your first assignment could look like.</p>
        <ul className={styles.departments}>
          {departments.map(({ name, manager, position, color, description, quote, shift }) => {
            const gig = dreamwell.gigs.find(({ title }) => title === shift);
            if (!gig) throw new Error(`Missing Dreamwell listing for ${shift}`);
            const href = gig.board === "Brightside"
              ? `/termiflux#${brightsideBriefId(gig.title)}`
              : helpingHandPostings.find(({ title }) => title === gig.title)?.href;
            if (!href) throw new Error(`Missing posting link for ${shift}`);

            return (
              <li className={styles.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <figure>
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{manager}</strong><br />{position}</figcaption>
                </figure>
                <h4>{gig.board === "Brightside" ? "Creator brief" : "Shift"} · {gig.board}</h4>
                <ul className={styles.shifts}>
                  <li><Link href={href}>{gig.title}</Link><strong>{gig.tokens} Tokens</strong></li>
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <TrackCallout business="dreamwell" />

      <footer className={s.closing}>
        <p>See you this evening.</p>
        <p className={s.fine}>{dreamwell.policy}</p>
        <Link href="/product-details#dreamwell">Read Dreamwell Product Details →</Link>
      </footer>
    </main>
  );
}
