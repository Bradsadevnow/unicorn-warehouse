import Link from "next/link";
import Image from "next/image";
import { committees, executives, leadershipHighlights } from "@/content/governance";
import styles from "./governance.module.css";

export const metadata = { title: "Corporate Governance" };

export default function GovernancePage() {
  return (
    <main className={`${styles.page} ${styles.governance}`}>
      <header className={`${styles.hero} ${styles.landingHero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.label}>Unicorn Warehouse</p>
          <h1>Corporate<br />governance<span aria-hidden="true"> ✦</span></h1>
          <p>Meet the unicorns entrusted with keeping your benefits working together.</p>
          <a className={styles.heroAction} href="#leadership">Meet the team <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          {["marigold-thistle", "vesper-caldera", "morrow-vale"].map((slug) => (
            <Image key={slug} src={`/governance/${slug}.webp`} alt="" width={512} height={512} sizes="(max-width: 600px) 120px, 185px" />
          ))}
          <span className={styles.sparkle}>✦</span>
          <span className={styles.sparkle}>✧</span>
          <span className={styles.sparkle}>✦</span>
        </div>
      </header>
      <section className={styles.section} id="leadership">
        <h2>Executive leadership</h2>
        <ul className={styles.leadership}>
          {executives.map(({ slug, name, role }) => (
            <li key={slug}>
              <Link className={styles.executiveCard} href={`/governance/${slug}`}>
                <Image className={styles.rosterPortrait} src={`/governance/${slug}.webp`} alt="" width={512} height={512} sizes="(max-width: 640px) 44vw, (max-width: 900px) 30vw, 210px" />
                <span className={styles.executiveCopy}>
                  <span className={styles.label}>{role}</span>
                  <strong>{name}</strong>
                  <span className={styles.highlight}>{leadershipHighlights[slug]}</span>
                  <span className={styles.profileLink}>View profile <span aria-hidden="true">↗</span></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section} id="committees">
        <h2>Board committees</h2>
        <div className={styles.roster}>
          {committees.map(({ id, name, chair, mandate, minutes }) => (
            <article key={id} id={id} className={`${styles.card} ${styles.committee}`}>
              <h3>{name}</h3>
              <p>{mandate}</p>
              <Link className={styles.link} href={`/governance/${chair}`}>Chair · {executives.find(({ slug }) => slug === chair)?.name}</Link>
              <details><summary>Latest meeting minutes</summary><p>{minutes}</p></details>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
