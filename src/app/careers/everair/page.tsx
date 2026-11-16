import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/everair-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { getWorkListingPath } from "@/content/workListingPath";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Everair Careers · Unicorn Warehouse",
  description: "Meet the people behind every breath at the Everair Alpine Lodge.",
};

const departments = [
  {
    name: "Bottling & Dispatch",
    manager: "Alba Drift",
    position: "Bottling Floor Manager",
    color: "sky",
    description: "Prepare canisters for the bottling line, label the finished batches, and get the morning orders ready to leave the lodge.",
    quote: "The first thing I teach new hires is to hold a full canister and an empty one. Then we look at the labels.",
    shifts: ["Refill canisters at the Lodge"],
  },
  {
    name: "Seasonal Blends",
    manager: "Juniper Sillage",
    position: "Lodge Collection Manager",
    color: "mint",
    description: "Keep the tasting room ready for guests and help the team prepare sample sets for the next seasonal release.",
    quote: "The names start with a place someone wants to be. The blend has to remind them they were there.",
    shifts: ["Set out seasonal blend samples"],
  },
  {
    name: "AirLink Member Experience",
    manager: "Cirrus Bell",
    position: "AirLink Service Manager",
    color: "lilac",
    description: "Help the service team keep pairing appointments and canister deliveries in order, so members know what to expect before they arrive.",
    quote: "A member should always know where their next breath is coming from. We put it in the confirmation email.",
    shifts: ["Reconcile AirLink pairing appointments"],
  },
  {
    name: "Lodge Stories",
    manager: "Lumi Postcard",
    position: "Brightside Lodge Producer",
    color: "pink",
    description: "Work with Brightside creators to bring the lodge to people who’ve only ever experienced it through a canister.",
    quote: "When we shoot a first breath, I ask for one quiet moment before the reaction. It gives the audience somewhere to put themselves.",
    shifts: ["Unbox the Lodge Collection"],
  },
] as const;

export default function EverairCareersPage() {
  const everair = getBusiness("everair")!;
  const associate = roles.find(({ rung }) => rung === everair.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Everair Alpine Lodge · Hiring drive</p>
          <h1>Take your career <em>a little higher.</em></h1>
          <p className={s.lede}>Start your day above the clouds. Join the team that brings a little mountain morning to members everywhere.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the Lodge teams ↓</a>
            <Link href="/aerovitalux/lodge-collection">Visit the Lodge Collection</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your place at the Lodge.</h2>
        <p>Meet the teams who bottle, blend, deliver, and share a little alpine air.</p>
        <ul className={styles.departments}>
          {departments.map(({ name, manager, position, color, description, quote, shifts }) => (
            <li className={styles.department} data-color={color} key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
              <figure>
                <blockquote>“{quote}”</blockquote>
                <figcaption><strong>{manager}</strong><br />{position}</figcaption>
              </figure>
              <h4>Open assignments</h4>
              <ul className={styles.shifts}>
                {everair.gigs.filter(({ title }) => shifts.some((shift) => shift === title)).map(({ title, tokens, board }) => (
                  <li key={title}>
                    <span><Link href={getWorkListingPath(title, board)}>{title}</Link> · {board}</span>
                    <strong>{tokens} Tokens</strong>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {associate && (
        <section className={s.life} aria-labelledby="path-heading">
          <div>
            <p className={s.eyebrow}>Grow with Everair</p>
            <h2 id="path-heading">{everair.role.title}</h2>
            <p>Guide members through their first canister, help them find a favorite blend, and get their next delivery on the calendar.</p>
          </div>
          <div>
            <p><strong>{associate.title} · {associate.rateNote}</strong></p>
            <Link href={rolePath(associate)}>See the career level and requirements →</Link>
            <Link href="/careers#eligibility">Check your progress toward the Herd →</Link>
          </div>
        </section>
      )}

      <footer className={s.closing}>
        <p>See you above the clouds.</p>
        <p className={s.fine}>{everair.policy}</p>
        <Link href="/product-details#everair">Read Everair Product Details →</Link>
      </footer>
    </main>
  );
}
