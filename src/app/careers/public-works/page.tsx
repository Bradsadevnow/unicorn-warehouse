import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import art from "@/assets/public-works-hero.webp";
import { getBusiness } from "@/content/businesses";
import { getWorkListingPath } from "@/content/workListingPath";
import { rolePath, roles } from "@/content/careers";
import s from "../careers.module.css";
import w from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Public Works Careers · Unicornopolis",
  description: "Meet the crews who look after the Clover Loop, the shoreline, the fire hall, and the police station.",
};

const teams = [
  { name: "Roads & Transit", lead: "Poppy Patchwell", color: "butter", shift: "Log potholes along the Clover Loop", quote: "A pothole may open itself, but it takes two departments to close one." },
  { name: "Water & Shoreline", lead: "Fern Floodgate", color: "mint", shift: "Set out lakeside cleanup supplies", quote: "We want the lake to look like nobody’s been here, especially after a successful volunteer turnout." },
  { name: "Fire & Rescue", lead: "Ember Hoseley", color: "pink", shift: "Restock the fire hall supply room", quote: "Count the clean towels twice. Nobody ever asks for a towel because they’re having a normal day." },
  { name: "Neighborhood Police", lead: "Dottie Deskbell", color: "sky", shift: "Sort lost-property tags", quote: "We’ve recovered the umbrella. We’re still working on reuniting it with its case number." },
] as const;

export default function PublicWorksCareers() {
  const works = getBusiness("public-works")!;
  const level = roles.find(({ rung }) => rung === works.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={w.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicornopolis Public Works</p>
          <h1>Make yourself <em>useful.</em></h1>
          <p className={s.lede}>There’s a shelf to stock, a shoreline to tidy, and an umbrella that would very much like to go home.</p>
          <Link href="/public-works">Visit Public Works →</Link>
        </div>
        <Image src={art} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>
      <section className={s.section} aria-labelledby="works-teams-heading">
        <h2 id="works-teams-heading">Find your crew.</h2>
        <ul className={w.departments}>
          {teams.map(({ name, lead, color, shift, quote }) => {
            const job = works.gigs.find(({ title }) => title === shift);
            if (!job) throw new Error(`Missing Public Works listing for ${shift}`);
            return (
              <li className={w.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <figure>
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{lead}</strong> · Crew lead</figcaption>
                </figure>
                <ul className={w.shifts}>
                  <li><Link href={getWorkListingPath(job.title, job.board)}>{job.title}</Link><strong>{job.tokens} Tokens</strong></li>
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
      {level && (
        <section className={s.life}>
          <div><h2>{works.role.title}</h2><p>Prepare the crews, coordinate the forms, and help the town stay ready for whatever it has already scheduled.</p></div>
          <Link href={rolePath(level)}>{level.title} · {level.rateNote} →</Link>
        </section>
      )}
    </main>
  );
}
