import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import school from "@/assets/cloverfield-school.webp";
import { schoolName, schoolRoles } from "@/content/school";
import s from "../careers.module.css";
import styles from "../worksite.module.css";

export const metadata: Metadata = {
  title: `Careers at ${schoolName}`,
  description: "Meet the teachers, counselors, and staff who help students grow at Cloverfield.",
};

export default function SchoolCareersPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={styles.back} href="/school">← Visit Cloverfield</Link>
          <p className={s.eyebrow}>{schoolName}</p>
          <h1>Help children find <em>what they love.</em></h1>
          <p className={s.lede}>We make time for teachers to plan together, give new colleagues a mentor, and value the quiet work that makes a classroom feel welcoming.</p>
          <a className={s.primary} href="#school-roles">Explore school roles ↓</a>
        </div>
        <Image src={school} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>
      <section className={s.section} id="school-roles" aria-labelledby="school-roles-heading">
        <h2 id="school-roles-heading">Find your place at Cloverfield.</h2>
        <ul className={styles.departments}>
          {schoolRoles.map(({ title, team, detail }) => (
            <li key={title} className={styles.department} data-color="mint">
              <p>{team}</p>
              <h3>{title}</h3>
              <p>{detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
