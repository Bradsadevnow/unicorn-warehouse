import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/living-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { postingPath, postings } from "@/content/goodshiftPostings";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Living Careers · Unicorn Warehouse",
  description: "Find your team in leasing, property care, resident services, or acquisitions and valuation.",
};

const departments = [
  { name: "Leasing", color: "pink", manager: "Maple Keyring", position: "Leasing Manager", description: "Get the model home ready, lead tours, and help residents find the floor plan that fits.", quote: "Show them where the morning light comes in. We can talk about renewal after they’ve seen the windows.", shifts: ["Set up a rental tour"] },
  { name: "Property Care", color: "mint", manager: "Ivy Latch", position: "Property Care Lead", description: "Make sure fixtures work, coordinate repairs, and get units ready for their next inspection.", quote: "If the tap stops dripping while you’re there, give it a minute. It knows when it’s being watched.", shifts: ["Prepare a unit for inspection"] },
  { name: "Resident Services", color: "butter", manager: "Clover Bell", position: "Resident Services Manager", description: "Coordinate keys, move-outs, and transfers between Living addresses.", quote: "The resident gets a goodbye card. Deposit Review gets the photos.", shifts: ["Photograph a unit before move-out"] },
  { name: "Homes", color: "sky", manager: "Pearl Plotline", position: "Acquisitions & Valuation Director", description: "Acquire homes for the rental portfolio and keep the floor plans and valuations up to date.", quote: "If we discover more square footage at renewal, send a congratulations before you send the new rate.", shifts: ["Verify listing measurements", "Review valuation appeals"] },
] as const;

const jobs = new Map<string, { href: string; payout: number; board: "HelpingHand" | "Goodshift" }>([
  ...helpingHandPostings.map((job) => [job.title, { href: job.href, payout: job.payout, board: "HelpingHand" }] as const),
  ...postings.map((job) => [job.title, { href: postingPath(job), payout: job.payout, board: "Goodshift" }] as const),
]);

export default function LivingCareersPage() {
  const living = getBusiness("living")!;
  const level = roles.find(({ rung }) => rung === living.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicorn Warehouse Living · Hiring drive</p>
          <h1>Make yourself <em>at home.</em></h1>
          <p className={s.lede}>From the first tour to the last set of keys, help make moving day feel like a good day.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the teams ↓</a>
            <Link href="/living">Browse the neighborhood</Link>
          </div>
        </div>
        <Image src={campaign} alt="Two unicorns welcome residents at the Living leasing office" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>
      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Who keeps Living running?</h2>
        <ul className={styles.departments}>
          {departments.map(({ name, color, manager, position, description, quote, shifts }) => (
            <li className={styles.department} data-color={color} key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
              <figure>
                <blockquote>“{quote}”</blockquote>
                <figcaption><strong>{manager}</strong><br />{position}</figcaption>
              </figure>
              <ul className={styles.shifts}>
                {shifts.map((title) => {
                  const job = jobs.get(title);
                  if (!job) throw new Error(`Missing Living posting for ${title}`);
                  return <li key={title}><div><Link href={job.href}>{title}</Link><br /><small>{job.board}</small></div><strong>{job.payout} Tokens</strong></li>;
                })}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      {level && (
        <section className={s.life}>
          <div>
            <p className={s.eyebrow}>Grow with Living</p>
            <h2>{living.role.title}</h2>
            <p>Help households find a new reason to stay as renewal approaches.</p>
          </div>
          <div>
            <p><strong>{level.title} · {level.rateNote}</strong></p>
            <Link href={rolePath(level)}>See the career level and requirements →</Link>
          </div>
        </section>
      )}
    </main>
  );
}
