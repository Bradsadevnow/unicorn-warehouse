import type { Metadata } from "next";
import Link from "next/link";
import { businessPath, businesses } from "@/content/businesses";
import s from "./businesses.module.css";

export const metadata: Metadata = {
  title: "Our businesses",
  description: "Explore the Unicorn Warehouse family of businesses, from groceries and air to homes, banking, and care.",
};

const groups = [
  { status: "Open", title: "Open now", note: "Visit, shop, and pick up a shift today." },
  { status: "Opening soon", title: "Opening soon", note: "Shifts are available now. Doors open shortly." },
] as const;

export default function BusinessesPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <p className={s.eyebrow}>Unicorn Warehouse · Our businesses</p>
        <h1>One family. Every part of your day.</h1>
        <p>
          Wherever you eat, shop, live, bank, or get well, there’s a Unicorn Warehouse business ready to
          welcome you as a member and as a member of the team.
        </p>
      </header>

      {groups.map(({ status, title, note }) => (
        <section className={s.section} key={status} aria-labelledby={`group-${status}`}>
          <h2 id={`group-${status}`}>{title}</h2>
          <p>{note}</p>
          <ul className={s.grid}>
            {businesses.filter((business) => business.status === status).map((business) => (
              <li key={business.slug}>
                <Link href={businessPath(business)} data-tone={business.tone}>
                  <span className={s.icon} aria-hidden="true">{business.icon}</span>
                  <span className={s.eyebrow}>{business.industry}</span>
                  <b>{business.name}</b>
                  <span>{business.tagline}</span>
                  <small>{business.gigs.length} {business.gigs.length === 1 ? "shift" : "shifts"} available →</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
