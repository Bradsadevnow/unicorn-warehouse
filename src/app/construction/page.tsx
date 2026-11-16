import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import site from "@/assets/construction-site.webp";
import { constructionProjects } from "@/content/construction";
import s from "./construction.module.css";

export const metadata: Metadata = {
  title: "Unicorn Warehouse Construction",
  description: "See what Unicorn Warehouse is building, from neighborhood homes to working warehouses.",
};

export default function ConstructionPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Unicorn Warehouse Construction</p>
          <h1>Building what comes next.</h1>
          <p>Homes to live in. Clinics to feel welcome in. Loading bays that make Monday morning a little easier.</p>
          <a href="#projects">See our projects ↓</a>
        </div>
        <Image src={site} alt="A unicorn engineer beside pastel townhouses under construction" sizes="(max-width: 740px) 94vw, 660px" preload />
      </header>
      <section id="projects" className={s.projects} aria-labelledby="projects-heading">
        <h2 id="projects-heading">What we’re building</h2>
        <div className={s.cards}>
          {constructionProjects.map(({ id, name, client, description, plan, milestones, href }) => (
            <article className={s.card} key={id}>
              <p className="label">{client}</p>
              <h3>{name}</h3>
              <p>{description}</p>
              <details>
                <summary>See the layout and schedule</summary>
                <ul aria-label="Illustrative layout">{plan.map((room) => <li key={room}>{room}</li>)}</ul>
                <ol aria-label="Project milestones">{milestones.map((milestone) => <li key={milestone}>{milestone}</li>)}</ol>
              </details>
              <Link href={href}>Visit {client} →</Link>
            </article>
          ))}
        </div>
      </section>
      <footer className={s.links}>
        <Link href="/careers/construction">Build with us →</Link>
        <Link href="/terms#construction">Construction terms</Link>
        <Link href="/product-details#construction">Project details</Link>
      </footer>
    </main>
  );
}
