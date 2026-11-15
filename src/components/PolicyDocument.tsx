import Link from "next/link";
import styles from "./policy-document.module.css";

export default function PolicyDocument({ title, intro, related, sections }: {
  title: string;
  intro: string;
  related: { href: string; label: string };
  sections: readonly { id: string; title: string; paragraphs: readonly string[] }[];
}) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className="label">Unicorn Warehouse · Member documents</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <Link href={related.href}>{related.label} →</Link>
      </header>
      <div className={styles.layout}>
        <nav className={styles.contents} aria-label="Contents">
          <ol>
            {sections.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
          </ol>
        </nav>
        <div>
          {sections.map(({ id, title, paragraphs }, index) => (
            <section id={id} key={id} className={styles.section}>
              <h2>{index + 1}. {title}</h2>
              <ol>
                {paragraphs.map((paragraph, clause) => (
                  <li key={clause}>
                    <span className={styles.clause}>{index + 1}.{clause + 1}</span>
                    <p>{paragraph}</p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
