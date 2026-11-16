import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import art from "@/assets/public-works-hero.webp";
import { publicWorksCycle, publicWorksPlans, worksNotices, worksProjects } from "@/content/publicWorks";
import { townLots } from "@/content/unicornopolis";
import WorksRequestPreview from "./WorksRequestPreview";
import s from "./publicWorks.module.css";

export const metadata: Metadata = {
  title: "Unicornopolis Public Works",
  description: "Meet the crews who keep Unicornopolis moving and explore civic memberships.",
};

const [fire, police, bundle] = publicWorksPlans;
const bundleSavings = fire.price + police.price - bundle.price;
const serviceDirectory = [
  { icon: "🚧", title: "Roads & Transit", copy: "Potholes, street signs, lane closures, and Clover Loop shelters.", href: "/map#clover-loop", label: "Find a bus stop" },
  { icon: "🌊", title: "Water & Shoreline", copy: "Water service on town land, the marina ramp, and the Clover Lake walking path.", href: "/map?lot=marina", label: "Find the marina" },
  { icon: "🚒", title: "Fire & Rescue", copy: "Station visits, incident records, and household preparedness.", href: "/map?lot=fire-rescue", label: "Find the fire hall" },
  { icon: "🌷", title: "Neighborhood Police", copy: "Lost property, case updates, and the neighborhood counter.", href: "/map?lot=police", label: "Find the police station" },
] as const;

const campus = townLots.filter(({ id }) => ["public-works", "fire-rescue", "police"].includes(id));

export default function PublicWorksPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Unicornopolis Public Works</p>
          <h1>We keep this town adorable.</h1>
          <p>We patch the roads, mind the shoreline, and keep the water tower full. If a flowerpot is out of line, we’ve probably noticed.</p>
          <div className={s.links}>
            <a className={s.button} href="#requests">Find the right crew ↓</a>
            <a href="#notices">Service notices</a>
            <a href="#memberships">Civic memberships</a>
          </div>
        </div>
        <Image src={art} alt="A grinning unicorn in a yellow hard hat stands outside the Public Works campus" sizes="(max-width: 760px) 94vw, 650px" preload />
      </header>
      <section id="notices" className={s.noticeBoard} aria-labelledby="notices-heading">
        <h2 id="notices-heading">Before you head out</h2>
        <ul>
          {worksNotices.map(({ name, window, detail, href, link }) => (
            <li key={name}>
              <p className={s.window}>{window}</p>
              <h3>{name}</h3>
              <p>{detail}</p>
              <Link href={href}>{link} →</Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="services" className={s.section} aria-labelledby="services-heading">
        <h2 id="services-heading">Town services</h2>
        <div className={s.serviceGrid}>
          {serviceDirectory.map(({ icon, title, copy, href, label }) => (
            <article key={title}>
              <span aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link href={href}>{label} →</Link>
            </article>
          ))}
        </div>
      </section>

      <WorksRequestPreview />

      <section className={s.section} id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">On the work board</h2>
        <ul className={s.projectList}>
          {worksProjects.map(({ name, status, detail, next }) => (
            <li key={name}>
              <p className={s.status} data-status={status}>{status}</p>
              <div><h3>{name}</h3><p>{detail}</p><p>{next}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <section id="memberships" className={s.section} aria-labelledby="memberships-heading">
        <h2 id="memberships-heading">Good neighbors come prepared.</h2>
        <p>Pick the membership that fits your household. Civic Complete saves {bundleSavings} Tokens per cycle compared with subscribing to both separately.</p>
        <div className={s.plans}>
          {publicWorksPlans.map(({ id, name, price, line, benefit, tone }) => (
            <article id={id} key={id} className={s.plan} data-tone={tone}>
              <h3>{name}</h3>
              <p>{line}</p>
              <p className={s.price}><strong>{price} Tokens</strong> / {publicWorksCycle} days</p>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
        <p>Memberships cover household profiles, updates, and records. Emergency response is separate from membership.</p>
        <Link href="/redemption#public-works-subscriptions">Find memberships in Token Redemption →</Link>
      </section>
      <section className={s.yard} aria-labelledby="yard-heading">
        <div><h2 id="yard-heading">A little yard with a lot to do.</h2><p>Road crews, Fire &amp; Rescue, and the blue-roofed police station all share the Depot District campus.</p></div>
        <ul className={s.campusAddresses}>
          {campus.map(({ id, name, address }) => (
            <li key={id}><Link href={`/map?lot=${id}`}>{name} →</Link><span>{address}</span></li>
          ))}
        </ul>
      </section>
      <footer className={s.links}>
        <Link href="/careers/public-works">Pick up a Public Works shift →</Link>
        <Link href="/terms#public-works">Public Works Terms &amp; Conditions</Link>
        <Link href="/product-details#public-works">Public Works Product Details</Link>
      </footer>
    </main>
  );
}
