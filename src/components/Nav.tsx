import Link from "next/link";
import { TransitionLink } from "./Veil";
import styles from "./chrome.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <TransitionLink href="/home" className={styles.wordmark}>
        Unicorn Warehouse
      </TransitionLink>
      <nav className={styles.groupLinks} aria-label="Main navigation">
        <TransitionLink href="/careers" className={styles.careersLink}>Careers</TransitionLink>
        <Link href="/home#businesses">Businesses</Link>
        <TransitionLink href="/tokens">Token economy</TransitionLink>
        <TransitionLink href="/market">Market</TransitionLink>
        <TransitionLink href="/funplex">Funplex</TransitionLink>
        <TransitionLink href="/welcome">Enrollment</TransitionLink>
        <TransitionLink href="/redemption" className={styles.pill}>Redemption</TransitionLink>
      </nav>
    </header>
  );
}
