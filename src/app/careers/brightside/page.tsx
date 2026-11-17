import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/brightside-careers.webp";
import { getBusiness } from "@/content/businesses";
import TrackCallout from "@/components/TrackCallout";
import { brightsideBriefId } from "@/content/gigCatalogs";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Brightside Careers · Unicorn Warehouse",
  description: "Meet the producers, editors, and creative teams behind Brightside’s sponsored clips.",
};

const departments = [
  {
    name: "On-Location Production",
    manager: "Sunny Slate",
    position: "Field Producer",
    color: "pink",
    description: "Find the good light in a real workplace and help the people who clock in there look at home on camera.",
    quote: "We keep filming until the lunch rush looks like the kind of shift you’d recommend to a friend.",
    shift: "Make a lunch rush look easy",
  },
  {
    name: "Creative Development",
    manager: "Poppy Cutaway",
    position: "Head of Opening Seconds",
    color: "lilac",
    description: "Write and test the first few seconds of a clip. Give a viewer a reason to stick around before they’ve decided to.",
    quote: "The viewer is free to leave whenever they like. I just need them to decide that a little later.",
    shift: "Stop the Scroll",
  },
  {
    name: "Product Studio",
    manager: "Mika Softbox",
    position: "Studio Production Manager",
    color: "mint",
    description: "Show how a product fits into somebody’s day, from the first time it comes out of the box to the small rituals that make it feel familiar.",
    quote: "We want a countertop that looks like someone lives there. We have six approved examples.",
    shift: "Casual Countertop Demo",
  },
  {
    name: "Campaign Launches",
    manager: "Cleo Countdown",
    position: "Launch Producer",
    color: "butter",
    description: "Work with editors and creators to give a new product a week of short videos worth coming back for.",
    quote: "Every launch needs a moment that feels like everybody just happened to think of it at once.",
    shift: "Launch Day Takeover",
  },
] as const;

export default function BrightsideCareersPage() {
  const brightside = getBusiness("brightside")!;

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Brightside Studio · Hiring drive</p>
          <h1>Make something <em>worth watching.</em></h1>
          <p className={s.lede}>A great opening. A tiny detail you can’t stop thinking about. Join the people who make the moments that stay with you.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the studio teams ↓</a>
            <Link href="/termiflux">Visit Brightside</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your place in the studio.</h2>
        <p>Get to know the team and see what your first assignment could look like.</p>
        <ul className={styles.departments}>
          {departments.map(({ name, manager, position, color, description, quote, shift }) => {
            const gig = brightside.gigs.find(({ title }) => title === shift);
            if (!gig) throw new Error(`Missing Brightside listing for ${shift}`);
            const href = `/termiflux#${brightsideBriefId(gig.title)}`;

            return (
              <li className={styles.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <figure>
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{manager}</strong><br />{position}</figcaption>
                </figure>
                <h4>Creator brief</h4>
                <ul className={styles.shifts}>
                  <li><Link href={href}>{gig.title}</Link><strong>{gig.tokens} Tokens</strong></li>
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <TrackCallout business="brightside" />

      <footer className={s.closing}>
        <p>See you on set.</p>
        <p className={s.fine}>{brightside.policy}</p>
        <Link href="/product-details#brightside">Read Brightside Product Details →</Link>
      </footer>
    </main>
  );
}
