import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/gatherings-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Gatherings Careers · Unicorn Warehouse",
  description: "Join the teams behind the parties, private dinners, and charters.",
};

const departments = [
  { name: "Party Hosts", manager: "Pippa Popper", position: "Funplex Parties Manager", color: "pink", description: "Get the room ready, greet the guests, and make sure cake arrives before the candles do.", quote: "If the birthday child asks for another minute, check with the booking holder.", shifts: ["Host arrivals at the Funplex suite", "Staff the check-in desk"] },
  { name: "Room Turnover", manager: "Tansy Tinsel", position: "Venue Turnover Lead", color: "butter", description: "Reset Confetti Hall between bookings and keep the next celebration moving.", quote: "The photographer gets the first seven minutes of the reset. We make the rest count.", shifts: ["Clear the room after an event"] },
  { name: "Private Events", manager: "Olive Placecard", position: "Private Events Manager", color: "mint", description: "Set the table, confirm the guest list, and coordinate with the teams making dinner look effortless.", quote: "Please let guests finish their private conversations before asking them to repeat them for the venue reel.", shifts: ["Set up tables", "Arrange chairs"] },
  { name: "Yacht Guest Services", manager: "Marina Ledger", position: "Charter Hospitality Lead", color: "sky", description: "Welcome guests aboard The Vesting Period and make sure the chef has the final headcount.", quote: "Departure is determined by the charter package. Seasickness while docked is handled by Wellness.", shifts: ["Welcome guests aboard the yacht"] },
] as const;

export default function GatheringsCareersPage() {
  const gatherings = getBusiness("gatherings")!;
  const associate = roles.find(({ rung }) => rung === gatherings.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Gatherings · Hiring drive</p>
          <h1>Be there for <em>the big moments.</em></h1>
          <p className={s.lede}>From the first birthday candle to the last toast on deck. Join the team that makes the important days look effortless.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the venue teams ↓</a>
            <Link href="/gatherings">Visit Gatherings</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your place at the party.</h2>
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
                <h4>Shifts · HelpingHand</h4>
                <ul className={styles.shifts}>
                  {shifts.map((title) => {
                    const job = helpingHandPostings.find((posting) => posting.title === title);
                    if (!job) throw new Error(`Missing Gatherings posting for ${title}`);
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
            <p className={s.eyebrow}>Grow with Gatherings</p>
            <h2 id="path-heading">{gatherings.role.title}</h2>
            <p>Coordinate the venue, the guest experience, and the crew’s handoff. The event ends when the last guest leaves. Your assignment ends at its scheduled time.</p>
          </div>
          <div>
            <p><strong>{associate.title} · {associate.rateNote}</strong></p>
            <Link href={rolePath(associate)}>See the career level and requirements →</Link>
            <Link href="/careers#eligibility">Check your progress toward the Herd →</Link>
          </div>
        </section>
      )}

      <footer className={s.closing}>
        <p>See you at the party.</p>
        <p className={s.fine}>{gatherings.policy}</p>
        <Link href="/terms#gatherings">Read the Gatherings terms →</Link>
      </footer>
    </main>
  );
}
