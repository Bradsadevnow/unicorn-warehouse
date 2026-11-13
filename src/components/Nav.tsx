import Link from "next/link";
import { productGroups } from "@/content/houses";
import { TransitionLink } from "./Veil";
import styles from "./chrome.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <TransitionLink href="/" className={styles.wordmark}>
        Unicorn Warehouse
      </TransitionLink>
      <nav className={styles.groupLinks} aria-label="Main navigation">
        {productGroups.map((group) => (
          <Link key={group.id} href={`/#${group.id}`}>{group.name}</Link>
        ))}
        <TransitionLink href="/tokens">Token economy</TransitionLink>
        <TransitionLink href="/redemption" className={styles.pill}>Redemption</TransitionLink>
      </nav>
    </header>
  );
}
