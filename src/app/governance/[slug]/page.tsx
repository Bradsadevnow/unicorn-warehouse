import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { appointmentNotes, committees, executives } from "@/content/governance";
import { executiveProfiles } from "@/content/executiveProfiles";
import ProfessionalProfile from "./ProfessionalProfile";
import styles from "../governance.module.css";

export function generateStaticParams() {
  return executives.map(({ slug }) => ({ slug }));
}

export default async function ExecutivePage({ params }: PageProps<"/governance/[slug]">) {
  const { slug } = await params;
  const executive = executives.find((person) => person.slug === slug);
  if (!executive) notFound();
  const profile = executiveProfiles[slug];
  if (profile) return <ProfessionalProfile executive={executive} profile={profile} />;
  const { artifact, institution, sidekick } = executive;

  return (
    <main className={styles.page}>
      <Link className={styles.link} href="/governance">← Corporate governance</Link>
      <header className={`${styles.hero} ${styles.profileHero}`}>
        <div>
          <p className={styles.label}>{executive.role}</p>
          <h1>{executive.name}</h1>
          <p>{appointmentNotes[slug]}</p>
          <Link className={styles.link} href={executive.href}>Read the policy · {executive.responsibility} →</Link>
        </div>
        <Image className={styles.profilePortrait} src={`/governance/${slug}.webp`} alt={`Unicorn portrait of ${executive.name}`} width={512} height={512} sizes="(max-width: 600px) 150px, 224px" />
      </header>
      <div className={styles.roster}>
        <section className={styles.card}>
          <h2>Education & credentials</h2>
          <h3>{institution.institution_name}</h3>
          <p>{institution.field_of_study}</p>
          <p>Accredited by {institution.accreditation_body}</p>
          <blockquote>“{institution.motto}”</blockquote>
        </section>
        <section className={styles.card}>
          <h2>Leadership profile</h2>
          <p>{executive.headline}</p>
          <p>Power source · {executive.powerSource}</p>
          <p>Office · {executive.environment}</p>
          <blockquote>“{executive.quote}”</blockquote>
          {committees.filter(({ chair }) => chair === slug).map(({ id, name }) => (
            <Link key={id} className={styles.link} href={`/governance#${id}`}>{name} →</Link>
          ))}
        </section>
        <section className={styles.card}>
          <h2>Office of the executive</h2>
          <p>Chief aide · {sidekick.role_label}</p>
          <p>{sidekick.role_detail}</p>
          <p>Responsibilities · {sidekick.task_label}</p>
          <p>{sidekick.task_detail}</p>
          <details><summary>Retention assessment</summary><p>{sidekick.loyalty_detail}</p><p>{sidekick.fold_detail}</p></details>
        </section>
        <section className={styles.card}>
          <h2>Declared assets</h2>
          <h3>{artifact.label}</h3>
          <p>{artifact.public_myth}</p>
          <details><summary>Operational disclosure</summary><p>{artifact.real_function}</p><p>Personal cost · {artifact.use_cost}</p></details>
        </section>
      </div>
      <details className={styles.card}>
        <summary>Executive review and disclosures</summary>
        <h2>{executive.archetypeTitle}</h2>
        <p>{executive.exposure.summary}</p>
        <p>Primary leverage · {executive.leverage}</p>
        <p>Failure mode · {executive.failureMode}</p>
        <h3>Core competencies</h3>
        <ul className={styles.bullets}>{executive.competencies.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Reported everyday conduct</h3>
        <ul className={styles.bullets}>{executive.conduct.map((item) => <li key={item}>{item}</li>)}</ul>
        <p>{executive.memo}</p>
      </details>
    </main>
  );
}
