import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/funplex-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { helpingHandJobsPath } from "@/content/helpingHandPostings";
import { getWorkListingPath } from "@/content/workListingPath";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Funplex Careers · Unicorn Warehouse",
  description: "Meet the teams behind the lanes, the cinema, and the Prize Counter.",
};

const departments = [
  {
    name: "Games & Attractions",
    manager: "Bumper Bloom",
    position: "Attractions Operations Manager",
    color: "mint",
    description: "Get the lanes and greens ready for the next group. Help guests get from their first frame to their last hole with a smile.",
    quote: "Whether they play twelve holes or eighteen, we want them to feel like they got a whole round.",
    shifts: ["Clear lanes between games", "Retrieve balls from the water hazard"],
  },
  {
    name: "Arcade & Prize Counter",
    manager: "Tilly Ticket",
    position: "Prize Counter Manager",
    color: "pink",
    description: "Count tickets, keep the shelves full, and help guests choose something to take home.",
    quote: "My favorite moment is when a guest realizes they’re only one game away. It happens more than you’d think.",
    shifts: ["Staff the Prize Counter"],
  },
  {
    name: "Starlight Cinema",
    manager: "Matinée Mallow",
    position: "Cinema Floor Manager",
    color: "lilac",
    description: "Turn the auditorium over between features so the next audience gets a clean seat and somewhere to put their popcorn.",
    quote: "The show starts the moment the doors open. For the floor team, it starts when the last guest stands up.",
    shifts: ["Sweep a theater between features"],
  },
  {
    name: "Guest Moments",
    manager: "Posie Flash",
    position: "On-Site Brightside Producer",
    color: "butter",
    description: "Help our Brightside crew capture the little moments that make people want to come back for another night out.",
    quote: "I like to get the first reaction twice. The second one usually feels more spontaneous.",
    shifts: ["Look delighted at the Funplex"],
  },
] as const;

export default function FunplexCareersPage() {
  const funplex = getBusiness("funplex")!;
  const associate = roles.find(({ rung }) => rung === funplex.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicorn Warehouse Funplex · Hiring drive</p>
          <h1>Make someone’s <em>night.</em></h1>
          <p className={s.lede}>Someone’s first strike. Their new favorite movie. The prize they’ve been saving for all night. Join the team that gets to see it happen.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the teams ↓</a>
            <Link href="/funplex">Visit Funplex</Link>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your spot.</h2>
        <p>Meet the people behind a great night out and see what their teams are hiring for.</p>
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
                {funplex.gigs.filter(({ title }) => shifts.some((shift) => shift === title)).map((gig) => (
                  <li key={gig.title}>
                    <span><Link href={getWorkListingPath(gig.title, gig.board)}>{gig.title}</Link> · {gig.board}</span>
                    <strong>{gig.tokens} Tokens</strong>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className={s.actions}>
          <Link href={helpingHandJobsPath}>Browse HelpingHand shifts →</Link>
          <Link href="/termiflux#platform-preview">Browse Brightside briefs →</Link>
        </div>
      </section>

      {associate && (
        <section className={s.life} aria-labelledby="path-heading">
          <div>
            <p className={s.eyebrow}>Grow with Funplex</p>
            <h2 id="path-heading">{funplex.role.title}</h2>
            <p>Welcome guests, help them find their next activity, and make sure every visit is recorded before they head home.</p>
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
        <p className={s.fine}>Shifts at the Funplex are paid work and are not recorded as Fun Hours.</p>
        <Link href="/terms#careers">Read the Careers terms →</Link>
      </footer>
    </main>
  );
}
