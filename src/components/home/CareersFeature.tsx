import Image from "next/image";
import campaign from "@/assets/careers-welcome.webp";
import { businessPath, getBusiness } from "@/content/businesses";
import { TransitionLink } from "@/components/Veil";
import s from "./home.module.css";

const teams = [
  { slug: "funplex", title: "Funplex" },
  { slug: "everair", title: "Everair Alpine Lodge" },
  { slug: "motorworks", title: "Motorworks" },
];

export default function CareersFeature() {
  return (
    <section className={s.careersFeature} aria-labelledby="home-careers-heading">
      <div className={s.careersCard}>
        <Image src={campaign} alt="" sizes="(max-width: 750px) 94vw, (max-width: 1250px) 47vw, 620px" />
        <div className={s.careersCopy}>
          <p className="label">Careers at Unicorn Warehouse</p>
          <h2 id="home-careers-heading">Come for a shift. Find your people.</h2>
          <TransitionLink className={s.careersButton} href="/careers">Explore Careers →</TransitionLink>
          <ul className={s.careersTeams}>
            {teams.map(({ slug, title }) => {
              const team = getBusiness(slug)!;
              return <li key={slug}>
                <TransitionLink href={businessPath(team)}>
                  <span><strong>{title}</strong><small>{team.role.title}</small></span>
                  <span aria-hidden="true">↗</span>
                </TransitionLink>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
