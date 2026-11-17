import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/wellness-careers.webp";
import TrackCallout from "@/components/TrackCallout";
import { postingPath, postings } from "@/content/goodshiftPostings";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Wellness Careers · Unicorn Warehouse",
  description: "Find work in reception, clinic operations, and coverage administration.",
};

const departments = [
  { name: "Reception", color: "pink", lead: "Pippa Paperclip", note: "A warm welcome can begin while we verify that the visit can.", title: "Set out clinic welcome packets", board: "HelpingHand" },
  { name: "Clinic Operations", color: "mint", lead: "Fern Foldwell", note: "If the room turns over before the member arrives, leave it ready. That still counts as a successful turnover.", title: "Reset an exam room", board: "HelpingHand" },
  { name: "Coverage Administration", color: "sky", lead: "Mabel Margin", note: "A visit has a request date, a booking date, and a service date. Always ask which one they mean by ‘today.’", title: "Reconcile appointment records", board: "Goodshift" },
] as const;

export default function WellnessCareersPage() {

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicorn Warehouse Wellness</p>
          <h1>Make someone’s day feel <em>a little better.</em></h1>
          <p className={s.lede}>Join the team behind the welcome desk, the clinic rooms, and everything that makes a visit possible.</p>
          <Link href="/wellness">Visit Wellness →</Link>
        </div>
        <Image src={campaign} alt="Two unicorn coworkers prepare a sunlit clinic room" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>
      <section className={s.section} aria-labelledby="teams-heading">
        <h2 id="teams-heading">Meet the clinic teams.</h2>
        <ul className={styles.departments}>
          {departments.map(({ name, color, lead, note, title, board }) => {
            const shift = helpingHandPostings.find((job) => job.title === title);
            const assignment = postings.find((job) => job.title === title);
            const job = board === "HelpingHand" ? shift : assignment;
            const href = board === "HelpingHand" ? shift?.href : assignment && postingPath(assignment);
            if (!job || !href) throw new Error(`Missing Wellness posting for ${title}`);
            return (
              <li className={styles.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <figure>
                  <blockquote>“{note}”</blockquote>
                  <figcaption><strong>{lead}</strong> · Team lead</figcaption>
                </figure>
                <p>{board}</p>
                <ul className={styles.shifts}><li><Link href={href}>{title}</Link><strong>{job.payout} Tokens</strong></li></ul>
              </li>
            );
          })}
        </ul>
      </section>
      <TrackCallout business="wellness" />
    </main>
  );
}
