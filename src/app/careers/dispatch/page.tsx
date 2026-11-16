import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/dispatch-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Dispatch Careers · Unicorn Warehouse",
  description: "Find local courier, depot, and dispatch coordination work.",
};

const departments = [
  {
    name: "Neighborhood Couriers",
    manager: "Pippa Pin",
    position: "Local Routes Manager",
    color: "mint",
    description: "Pick up prepaid orders from businesses in your neighborhood and help them make it to the right door.",
    quote: "I like to know the whole route before I leave home. Officially the route starts when I get there.",
    shifts: ["Collect a local supply order"],
  },
  {
    name: "Building Runners",
    manager: "Skip Stairwell",
    position: "Internal Delivery Lead",
    color: "sky",
    description: "Get parcels from the lobby to the mailroom or between departments before the next handoff.",
    quote: "The best route on a map can be the longest route in a building. Ask me which elevator works.",
    shifts: ["Run a parcel to the mailroom", "Move boxes between departments"],
  },
  {
    name: "Outbound Crew",
    manager: "Tansy Tag",
    position: "Outbound Floor Manager",
    color: "butter",
    description: "Scan each parcel and stage it in the right bay before the driver arrives.",
    quote: "Once you scan it into the bay, the customer can see it’s moving. The driver will be here shortly.",
    shifts: ["Stage outgoing shipments"],
  },
  {
    shifts: [],
    name: "Dispatch Coordination",
    manager: "Milo Mile",
    position: "Dispatch Center Manager",
    color: "lilac",
    description: "Help couriers find the right pickup point, check in on delays, and make sure the handoff reaches the account.",
    quote: "We have a clock for the member and a clock for the courier. A good coordinator knows which one they’re looking at.",
  },
] as const;

export default function DispatchCareersPage() {
  const dispatch = getBusiness("dispatch")!;
  const associate = roles.find(({ rung }) => rung === dispatch.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Dispatch · Hiring drive</p>
          <h1>Know your <em>neighborhood?</em></h1>
          <p className={s.lede}>Pick up work on streets you know, with a destination, a booked window, and a payout you can see before you leave.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the Dispatch teams ↓</a>
            <Link href="/dispatch">Visit Dispatch</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your route.</h2>
        <p>Get to know the team and see what your first assignment could look like.</p>
        <ul className={styles.departments}>
          {departments.map((department) => {
            const { name, manager, position, color, description, quote, shifts } = department;
            return (
              <li className={styles.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <figure>
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{manager}</strong><br />{position}</figcaption>
                </figure>
                {shifts.length > 0 ? <>
                <h4>Shifts · HelpingHand</h4>
                <ul className={styles.shifts}>
                  {shifts.map((title) => {
                    const job = helpingHandPostings.find((posting) => posting.title === title);
                    if (!job) throw new Error(`Missing Dispatch posting for ${title}`);
                    return <li key={title}><Link href={job.href}>{title}</Link><strong>{job.payout} Tokens</strong></li>;
                  })}
                </ul>
                </> : <a href="#path-heading">Explore the coordination role ↓</a>}
              </li>
            );
          })}
        </ul>
      </section>

      {associate && (
        <section className={s.life} aria-labelledby="path-heading">
          <div>
            <p className={s.eyebrow}>Grow with Dispatch</p>
            <h2 id="path-heading">{dispatch.role.title}</h2>
            <p>Coordinate deliveries from offer to handoff. Dispatch pays for the accepted delivery. Travel to pickup and travel home are the courier’s own time.</p>
          </div>
          <div>
            <p><strong>{associate.title} · {associate.rateNote}</strong></p>
            <Link href={rolePath(associate)}>See the career level and requirements →</Link>
            <Link href="/careers#eligibility">Check your progress toward the Herd →</Link>
          </div>
        </section>
      )}

      <footer className={s.closing}>
        <p>See you out there.</p>
        <p className={s.fine}>{dispatch.policy}</p>
        <Link href="/terms#careers">Read the Careers terms →</Link>
      </footer>
    </main>
  );
}
