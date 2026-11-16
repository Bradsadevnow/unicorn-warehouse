import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import campaign from "@/assets/motors-careers.webp";
import { getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { postingPath, postings } from "@/content/goodshiftPostings";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Motors Careers · Unicorn Warehouse",
  description: "Find dealership and service department openings at Unicorn Warehouse Motors.",
};

const departments = [
  { name: "Sales", color: "pink", manager: "Biscuit Bonnet", position: "Showroom Manager", description: "Get cars ready to drive and help members picture what comes next.", quote: "You’ll know they like the car when they stop asking about the car and start asking about the payment.", board: "HelpingHand", shift: "Prepare a showroom vehicle" },
  { name: "Appraisals & Finance", color: "butter", manager: "Penny Residual", position: "Appraisal Manager", description: "Document trades and get the numbers in front of the Bank.", quote: "The member has had eight good years with the car. We’re looking at how many good years it has left for us.", board: "HelpingHand", shift: "Photograph a trade-in" },
  { name: "Parts", color: "mint", manager: "Bitsy Socket", position: "Parts Counter Lead", description: "Match incoming parts to the technicians and bays that need them.", quote: "If a part is on backorder, leave room for it on the shelf. It helps the member see that we were expecting it.", board: "HelpingHand", shift: "Sort incoming parts" },
  { name: "Motorworks Service", color: "sky", manager: "Torque Tinsel", position: "Service Manager", description: "Give members a clear inspection report and help them plan their next visit.", quote: "Call with the good news first. The lights usually work.", board: "Goodshift", shift: "Call customers about recommended services" },
] as const;

export default function MotorsCareersPage() {
  const motors = getBusiness("motorworks")!;
  const level = roles.find(({ rung }) => rung === motors.role.rung);

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicorn Warehouse Motors · Hiring drive</p>
          <h1>Help good things <em>get moving.</em></h1>
          <p className={s.lede}>From the first test drive to the hundredth oil change, there’s a whole team behind every mile.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#departments">Meet the teams ↓</a>
            <Link href="/motorworks">Visit the dealership</Link>
          </div>
        </div>
        <Image src={campaign} alt="The Motors showroom and service crew smiling together" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>
      <section className={s.section} id="departments" aria-labelledby="departments-heading">
        <h2 id="departments-heading">Find your place at Motors.</h2>
        <ul className={styles.departments}>
          {departments.map(({ name, color, manager, position, description, quote, board, shift }) => {
            const hourly = helpingHandPostings.find(({ title }) => title === shift);
            const assignment = postings.find(({ title }) => title === shift);
            const job = board === "HelpingHand" ? hourly : assignment;
            const href = board === "HelpingHand" ? hourly?.href : assignment && postingPath(assignment);
            if (!job || !href) throw new Error(`Missing Motors posting for ${shift}`);

            return (
              <li className={styles.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <figure>
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{manager}</strong><br />{position}</figcaption>
                </figure>
                <h4>Openings · {board}</h4>
                <ul className={styles.shifts}>
                  <li><Link href={href}>{job.title}</Link><strong>{job.payout} Tokens</strong></li>
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
      {level && (
        <section className={s.life} aria-labelledby="career-heading">
          <div>
            <p className={s.eyebrow}>Grow with Motorworks</p>
            <h2 id="career-heading">{motors.role.title}</h2>
            <p>Own the inspection process, review service recommendations, and help the next technician understand what the member deferred.</p>
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
