import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/market-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { helpingHandJobsPath, helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Market Careers · Unicorn Warehouse",
  description: "Meet the Market managers, explore store departments, and find your first shift.",
};

const departments = [
  {
    name: "Grocery & Stock",
    manager: "Clementine Crate",
    position: "Grocery Floor Manager",
    color: "mint",
    description: "Get the floor ready for opening, keep the shelves stocked, and help shoppers find the everyday things they came in for.",
    quote: "I can tell what kind of morning we’re having by how fast we run out of bananas.",
    shifts: ["Restock the front shelves", "Apply shelf labels"],
  },
  {
    name: "Displays & Merchandising",
    manager: "Taffy Window",
    position: "Visual Merchandising Manager",
    color: "pink",
    description: "Build the displays that welcome shoppers in, from the first signs of spring to a whole aisle of things for the bathroom.",
    quote: "A good window display can make somebody remember they need a second set of towels.",
    shifts: ["Set up a window display"],
  },
  {
    name: "Online Orders & Pickup",
    manager: "Pip Parcel",
    position: "Pickup Operations Manager",
    color: "lilac",
    description: "Pick, pack, and stage orders so members can go from a long day at work to a stocked kitchen with one quick stop.",
    quote: "We track the time between ‘I’m here’ and ‘that’s everything in your order.’ The member has already done their part.",
    shifts: ["Pack online orders"],
  },
  {
    name: "Front End & Guest Services",
    manager: "Peaches Queue",
    position: "Front End Manager",
    color: "butter",
    description: "Get the entrance ready, keep the checkout area tidy, and make it easy for shoppers to find a cart or ask for help.",
    quote: "The welcome starts at the doors. We start measuring it as soon as they open.",
    shifts: ["Sweep a storefront", "Wipe down tables and counters"],
  },
  {
    name: "Receiving & Backroom",
    manager: "Junebug Pallet",
    position: "Receiving Manager",
    color: "sky",
    description: "Meet deliveries at the dock, sort cartons by department, and get fresh stock to the floor before the first rush.",
    quote: "I tell new hires to picture the person who’ll take this home. It makes the carton feel lighter.",
    shifts: ["Unload a delivery", "Sort incoming cartons"],
  },
] as const;

export default function MarketCareersPage() {
  const market = getBusiness("market")!;
  const associate = roles.find(({ rung }) => rung === market.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicorn Warehouse Market · Hiring drive</p>
          <h1>Good days <em>start here.</em></h1>
          <p className={s.lede}>There’s a whole team behind a well-stocked shelf and a grocery order that’s ready when you arrive. Come be part of it.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the store teams ↓</a>
            <Link href="/market">Visit Market</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your aisle.</h2>
        <p>Meet the managers and see what you can pick up through HelpingHand.</p>
        <ul className={styles.departments}>
          {departments.map(({ name, manager, position, color, description, quote, shifts }) => (
            <li className={styles.department} data-color={color} key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
              <figure>
                <blockquote>“{quote}”</blockquote>
                <figcaption><strong>{manager}</strong><br />{position}</figcaption>
              </figure>
              <h4>Sample shifts</h4>
              <ul className={styles.shifts}>
                {market.gigs.filter(({ title }) => shifts.some((shift) => shift === title)).map((gig) => (
                  <li key={gig.title}><Link href={helpingHandPostings.find(({ title }) => title === gig.title)?.href ?? helpingHandJobsPath}>{gig.title}</Link><strong>{gig.tokens} Tokens</strong></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <Link href={helpingHandJobsPath}>Browse HelpingHand shifts →</Link>
      </section>

      {associate && (
        <section className={s.life} aria-labelledby="path-heading">
          <div>
            <p className={s.eyebrow}>Grow with Market</p>
            <h2 id="path-heading">{market.role.title}</h2>
            <p>Help the team keep shelves full and make it easier for members to find what they need.</p>
          </div>
          <div>
            <p><strong>{associate.title} · {associate.rateNote}</strong></p>
            <Link href={rolePath(associate)}>See the career level and requirements →</Link>
            <Link href="/careers#eligibility">Check your progress toward the Herd →</Link>
          </div>
        </section>
      )}

      <footer className={s.closing}>
        <p>See you on the floor.</p>
        <p className={s.fine}>{market.policy}</p>
        <Link href="/product-details#market">Read Market product details →</Link>
      </footer>
    </main>
  );
}
