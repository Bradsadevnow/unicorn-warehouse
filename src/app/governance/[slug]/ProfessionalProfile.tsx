import Image from "next/image";
import Link from "next/link";
import type { ExecutiveProfile } from "@/content/executiveProfiles";
import { committees } from "@/content/governance";
import type { executives } from "@/content/governance";
import styles from "../governance.module.css";

const sections = [
  ["about", "About"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["achievements", "Professional achievements"],
] as const;

export default function ProfessionalProfile({ executive, profile }: {
  executive: (typeof executives)[number];
  profile: ExecutiveProfile;
}) {
  const { slug, name, institution, artifact, sidekick } = executive;
  return (
    <main className={`${styles.page} ${styles.professional}`}>
      <Link className={styles.link} href="/governance">← Corporate governance</Link>
      <header className={styles.profileIntro}>
        <div className={styles.profileCover} aria-hidden="true"><span>✦</span><span>✧</span></div>
        <div className={styles.profileIdentity}>
          <Image className={styles.avatar} src={`/governance/${slug}.webp`} alt={`Unicorn portrait of ${name}`} width={512} height={512} sizes="144px" />
          <h1>{name}</h1>
          <p>{profile.headline}</p>
          <p className={styles.profileMeta}>Office · {executive.environment}</p>
        </div>
      </header>
      <div className={styles.profileColumns}>
        <div className={styles.profileStack}>
          <section className={styles.card} id="about">
            <h2>About</h2>
            {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <blockquote>“{profile.quote ?? executive.quote}”</blockquote>
          </section>
          <section className={styles.card} id="experience">
            <h2>Experience</h2>
            <ol className={styles.profileRows}>
              {profile.experience.map(({ role, organization, period, details }) => (
                <li key={role}>
                  <h3>{role}</h3>
                  <p>{organization}</p>
                  <p className={styles.profileMeta}>{period}</p>
                  <ul className={styles.bullets}>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                </li>
              ))}
            </ol>
          </section>
          <section className={styles.card} id="education">
            <h2>Education</h2>
            <h3>{institution.institution_name}</h3>
            <p>{institution.field_of_study}</p>
            <p className={styles.profileMeta}>{profile.education.period} · Accredited by {institution.accreditation_body}</p>
            <ul className={styles.bullets}>{profile.education.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <blockquote>“{institution.motto}”</blockquote>
          </section>
          <section className={styles.card} id="skills">
            <h2>Skills</h2>
            <ul className={styles.profileRows}>
              {(profile.skillNames ?? executive.competencies).map((skill, index) => (
                <li key={skill}><h3 className={styles.skill}>{skill}</h3><p>{profile.skillHighlights[index]}</p></li>
              ))}
            </ul>
          </section>
          <section className={styles.card} id="achievements">
            <h2>Professional achievements</h2>
            <ul className={styles.profileRows}>
              {profile.achievements.map(({ title, detail }) => <li key={title}><h3>{title}</h3><p>{detail}</p></li>)}
            </ul>
          </section>
        </div>
        <aside className={styles.profileStack}>
          <nav className={styles.card} aria-label="Profile sections">
            <h2>On this profile</h2>
            {sections.map(([id, label]) => <a className={styles.link} key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <section className={styles.card}>
            <h2>Executive office</h2>
            <p>Chief aide · {sidekick.role_label}</p>
            <p>{sidekick.role_detail}.</p>
            <p>Responsibilities · {sidekick.task_label}</p>
            <Link className={styles.link} href={executive.href}>{executive.responsibility} →</Link>
            {committees.filter(({ chair }) => chair === slug).map(({ id, name: committee }) => (
              <Link key={id} className={styles.link} href={`/governance#${id}`}>{committee} →</Link>
            ))}
          </section>
          <details className={styles.card}>
            <summary>Executive disclosures</summary>
            <h3>{artifact.label}</h3>
            <p>{artifact.institutional_cover_story}.</p>
            <p>Power source · {executive.powerSource}</p>
            <h3>Reported office conduct</h3>
            <ul className={styles.bullets}>{executive.conduct.map((item) => <li key={item}>{item}</li>)}</ul>
          </details>
        </aside>
      </div>
    </main>
  );
}
