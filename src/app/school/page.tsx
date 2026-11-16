import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import school from "@/assets/cloverfield-school.webp";
import { gradeBands, schoolCareersPath, schoolName } from "@/content/school";
import FamilyVisit from "./FamilyVisit";
import s from "./school.module.css";

export const metadata: Metadata = {
  title: schoolName,
  description: "A welcoming K–12 school with time to learn, play, and grow together.",
};

export default function SchoolPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div className={s.intro}>
          <p className="label">{schoolName} · Kindergarten through Grade 12</p>
          <h1>A little room to grow.</h1>
          <p>There’s a place for you here. Come read under a tree, make a friend in the garden, and find out what you love to learn.</p>
          <nav className={s.actions} aria-label="Explore Cloverfield">
            <a className={s.button} href="#family-visit">Plan a family visit</a>
            <a href="#learning">Explore the grades ↓</a>
          </nav>
        </div>
        <Image src={school} alt="Unicorn students and their teacher spend time in the sunny Cloverfield school garden" preload sizes="(max-width: 760px) 94vw, 660px" />
      </header>

      <section className={s.section} id="learning" aria-labelledby="learning-heading">
        <h2 id="learning-heading">Growing up at Cloverfield</h2>
        <div className={s.cards}>
          {gradeBands.map((band) => (
            <article key={band.id}>
              <p className={s.kicker}>Grades {band.grades}</p>
              <h3>{band.name}</h3>
              <p><strong>{band.line}</strong></p>
              <p>{band.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={s.life} aria-labelledby="life-heading">
        <div>
          <h2 id="life-heading">Good days together.</h2>
          <p>At lunch, you might hear a ukulele from the music room or spot the garden club bringing in the first strawberries. Some kids head out to play. Others find a favorite chair in the library.</p>
        </div>
        <ul>
          <li><strong>Clubs and play</strong><span>Garden club, choir, school plays, pickup games, and an open art table.</span></li>
          <li><strong>Care for every learner</strong><span>Reading support, quiet spaces, and a counselor students know by name.</span></li>
          <li><strong>Families are welcome</strong><span>Come for a classroom open morning, a concert, or the end-of-year picnic.</span></li>
        </ul>
      </section>

      <FamilyVisit />

      <footer className={s.actions}>
        <Link href={schoolCareersPath}>Work at Cloverfield →</Link>
        <Link href="/home#businesses">Explore the neighborhood →</Link>
      </footer>
    </main>
  );
}
