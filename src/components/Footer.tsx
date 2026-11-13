import { TransitionLink } from "./Veil";
import { houses } from "@/content/houses";
import styles from "./chrome.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footTop}>
        <p className={styles.footLine}>
          A little something
          <br />
          <em>for every part of your day.</em>
        </p>
        <ul className={styles.footList}>
          <li className="label">Memberships</li>
          {houses.map((h) => (
            <li key={h.slug}>
              {h.open ? <TransitionLink href={`/${h.slug}`}>{h.name}</TransitionLink> : <span>{h.name}</span>}
            </li>
          ))}
          <li><TransitionLink href="/redemption">Token Redemption</TransitionLink></li>
        </ul>
      </div>
      <div className={styles.footBase}>
        <span>© Unicorn Warehouse</span>
        <span className={styles.disclaimer}>
          A work of satire. Nothing here is real, for sale, or advisable.
        </span>
      </div>
    </footer>
  );
}
