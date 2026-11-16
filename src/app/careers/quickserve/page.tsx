import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/quickserve-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Horn & Fries Careers · Unicorn Warehouse",
  description: "Join the Grill Wizards, Drive-Thru Dynamos, and the teams behind the Horn & Fries rush.",
};

const departments = [
  {
    name: "Drive-Thru Dynamos",
    manager: "Dottie Dash",
    position: "Drive-Thru Manager",
    color: "sky",
    description: "Keep the dinner line moving and make the last handoff of a long day feel like a little treat.",
    quote: "At dinner rush, I like to greet every car like it’s the first one. We count them from the second they arrive.",
    shift: "Cover dinner rush pickup",
  },
  {
    name: "Grill Wizards",
    manager: "Benny Sizzle",
    position: "Grill & Assembly Lead",
    color: "pink",
    description: "Keep the burger line stocked and pass finished orders to the team calling the numbers.",
    quote: "When we’re all in rhythm, I can hear a House Double coming before I see the ticket.",
    shift: "Stage burger orders at the grill",
  },
  {
    name: "Lunch Rush Crew",
    manager: "Pippa Pickle",
    position: "Lunch Shift Manager",
    color: "mint",
    description: "Get the right sandwich, fries, and sauce into every bag while the lunch orders roll in.",
    quote: "You can always tell when there’s an extra sauce in the bag. I’m happy to show you how to check before it becomes an inventory event.",
    shift: "Bag orders during the lunch rush",
  },
  {
    name: "Dining Room Crew",
    manager: "Marnie Mop",
    position: "Dining Room Manager",
    color: "butter",
    description: "Make room for the next table and keep the condiment station looking as fresh as it did at opening.",
    quote: "The goal is for every booth to feel like it was waiting just for you.",
    shift: "Reset the dining room",
    extraShift: "Restock the condiment station",
  },
] as const;

export default function QuickserveCareersPage() {
  const quickserve = getBusiness("quickserve")!;
  const associate = roles.find(({ rung }) => rung === quickserve.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Horn & Fries · Hiring drive</p>
          <h1>Good at <em>the rush?</em></h1>
          <p className={s.lede}>Some people hear the lunch bell. You hear a team getting into rhythm. Join us from the first burger off the grill to the last car through at dinner.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the crews ↓</a>
            <Link href="/quickserve">Visit Horn & Fries</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your place on the line.</h2>
        <p>Get to know the team and see what your first assignment could look like.</p>
        <ul className={styles.departments}>
          {departments.map((department) => {
            const { name, manager, position, color, description, quote, shift } = department;
            const shifts = "extraShift" in department ? [shift, department.extraShift] : [shift];
            return (
              <li className={styles.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <figure>
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{manager}</strong><br />{position}</figcaption>
                </figure>
                <h4>Shifts · HelpingHand</h4>
                <ul className={styles.shifts}>
                  {shifts.map((title) => {
                    const job = helpingHandPostings.find((posting) => posting.title === title);
                    if (!job) throw new Error(`Missing Horn & Fries posting for ${title}`);
                    return <li key={title}><Link href={job.href}>{title}</Link><strong>{job.payout} Tokens</strong></li>;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      {associate && (
        <section className={s.life} aria-labelledby="path-heading">
          <div>
            <p className={s.eyebrow}>Grow with Horn & Fries</p>
            <h2 id="path-heading">{quickserve.role.title}</h2>
            <p>Coach new teammates, keep the line moving, and help every order leave the counter with a little delight.</p>
          </div>
          <div>
            <p><strong>{associate.title} · {associate.rateNote}</strong></p>
            <Link href={rolePath(associate)}>See the career level and requirements →</Link>
            <Link href="/careers#eligibility">Check your progress toward the Herd →</Link>
          </div>
        </section>
      )}

      <footer className={s.closing}>
        <p>See you at the counter.</p>
        <p className={s.fine}>{quickserve.policy}</p>
        <Link href="/terms#careers">Read the Careers terms →</Link>
      </footer>
    </main>
  );
}
