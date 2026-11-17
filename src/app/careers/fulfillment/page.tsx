import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/fulfillment-careers.webp";
import { getBusiness } from "@/content/businesses";
import TrackCallout from "@/components/TrackCallout";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Fulfillment Careers · Unicorn Warehouse",
  description: "Meet the receiving, inventory, pack, and outbound teams behind every parcel.",
};

const departments = [
  { name: "Receiving & Stow", manager: "Kit Carton", position: "Inbound Manager", color: "mint", description: "Welcome inventory into the warehouse, scan each carton, and get it into the right bin.", quote: "There’s a place for everything. If there are two places, put it in the one the scanner likes.", shift: "Receive an inbound pallet" },
  { name: "Inventory", manager: "Tess Tally", position: "Inventory Accuracy Lead", color: "sky", description: "Count stock and resolve mismatches before they become somebody’s missing order.", quote: "When the shelf and the system disagree, we give the shelf another chance.", shift: "Count one aisle of stock" },
  { name: "Pick & Pack", manager: "Piper Pick", position: "Packing Floor Manager", color: "lilac", description: "Turn a pick list into a parcel that’s ready to make someone’s day.", quote: "I love a personal best. It gives the rest of the floor something to look forward to on Monday.", shift: "Pack Market orders on the line" },
  { name: "Outbound", manager: "Bix Bay", position: "Outbound Manager", color: "butter", description: "Stage orders by bay and get the right parcels to the next courier.", quote: "Once it reaches the bay, I get to send the customer the good news. They love the good news.", shift: "Stage pickup orders" },
] as const;

export default function FulfillmentCareersPage() {
  const fulfillment = getBusiness("fulfillment")!;

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicorn Warehouse Fulfillment · Hiring drive</p>
          <h1>Put good things <em>in motion.</em></h1>
          <p className={s.lede}>Every parcel starts with someone who knows where to find the right thing. Join the team that gets it from our shelf to somebody’s door.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the floor teams ↓</a>
            <Link href="/fulfillment">Visit Fulfillment</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your place on the floor.</h2>
        <p>Get to know the team and see what your first assignment could look like.</p>
        <ul className={styles.departments}>
          {departments.map(({ name, manager, position, color, description, quote, shift }) => {
            const gig = fulfillment.gigs.find(({ title }) => title === shift);
            if (!gig) throw new Error(`Missing Fulfillment listing for ${shift}`);
            const href = helpingHandPostings.find(({ title }) => title === gig.title)?.href;
            if (!href) throw new Error(`Missing posting link for ${shift}`);

            return (
              <li className={styles.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <figure>
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{manager}</strong><br />{position}</figcaption>
                </figure>
                <h4>Shift · HelpingHand</h4>
                <ul className={styles.shifts}>
                  <li><Link href={href}>{gig.title}</Link><strong>{gig.tokens} Tokens</strong></li>
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={s.life} aria-labelledby="shift-dashboard-heading">
        <div>
          <p className={s.eyebrow}>Sample shift dashboard</p>
          <h2 id="shift-dashboard-heading">See your progress in real time.</h2>
          <p>Every scan goes on your shift record. Personal bests go on the team board.</p>
        </div>
        <ul className={s.perks}>
          <li><h3>112 picks per hour ✨</h3><p>Personal best. Your team’s new target will be available Monday.</p></li>
          <li><h3>32 seconds between scans</h3><p>Based on your last hour of work.</p></li>
          <li><h3>4 minutes · Time Off Task</h3><p>Reason submitted: conveyor jam. Review pending.</p></li>
        </ul>
      </section>

      <TrackCallout business="fulfillment" />

      <footer className={s.closing}>
        <p>See you on the floor.</p>
        <p className={s.fine}>{fulfillment.policy}</p>
        <Link href="/terms#fulfillment">Read the Fulfillment terms →</Link>
      </footer>
    </main>
  );
}
