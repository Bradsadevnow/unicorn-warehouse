import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import site from "@/assets/construction-site.webp";
import { getBusiness } from "@/content/businesses";
import TrackCallout from "@/components/TrackCallout";
import { getWorkListingPath } from "@/content/workListingPath";
import s from "../careers.module.css";
import w from "../worksite.module.css";

export const metadata: Metadata = {
  title: "Construction Careers · Unicorn Warehouse",
  description: "Meet the logistics, site operations, closeout, and scheduling teams.",
};

const departments = [
  { name: "Materials & Logistics", lead: "Poppy Plumbline", title: "Carry materials to the upper floors", description: "Get the right materials to the right floor before the crew needs them.", color: "peach" },
  { name: "Site Operations", lead: "Wren Hardhat", title: "Direct traffic at the site entrance", description: "Help drivers find their assigned bay and keep the entrance clear.", color: "mint" },
  { name: "Closeout", lead: "Dusty Dovetail", title: "Sweep the site at close", description: "Give the next crew clear walkways and a clean place to start.", color: "butter" },
  { name: "Project Scheduling", lead: "Mabel Milestone", title: "Update the completion schedule", description: "Update the schedule to reflect work completed and the work still depending on it.", color: "sky" },
] as const;

export default function ConstructionCareersPage() {
  const construction = getBusiness("construction")!;

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <Link className={w.back} href="/careers">← Careers</Link>
          <p className={s.eyebrow}>Unicorn Warehouse Construction</p>
          <h1>Make something <em>that stays.</em></h1>
          <p className={s.lede}>Build a place someone will be glad to come home to. Or the bay their parcel will pass through on the way.</p>
          <Link href="/construction">See the project portfolio →</Link>
        </div>
        <Image src={site} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>
      <section className={s.section} aria-labelledby="crew-heading">
        <h2 id="crew-heading">Meet the site crews.</h2>
        <ul className={w.departments}>
          {departments.map(({ name, lead, title, description, color }) => {
            const gig = construction.gigs.find((listing) => listing.title === title);
            if (!gig) throw new Error(`Missing Construction posting for ${title}`);
            return (
              <li className={w.department} data-color={color} key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <p><strong>{lead}</strong> · Team lead</p>
                <ul className={w.shifts}><li><Link href={getWorkListingPath(title, gig.board)}>{title}</Link><strong>{gig.tokens} Tokens</strong></li></ul>
              </li>
            );
          })}
        </ul>
      </section>
      <TrackCallout business="construction" />
    </main>
  );
}
