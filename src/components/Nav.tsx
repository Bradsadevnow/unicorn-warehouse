import Link from "next/link";
import { productGroups } from "@/content/houses";
import { TransitionLink } from "./Veil";
import styles from "./chrome.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <TransitionLink href="/home" className={styles.wordmark}>
        Unicorn Warehouse
      </TransitionLink>
      <nav className={styles.groupLinks} aria-label="Main navigation">
        {productGroups.map((group) => (
          <Link key={group.id} href={`/home#${group.id}`}>{group.name}</Link>
        ))}
        <TransitionLink href="/tokens">Token economy</TransitionLink>
        <TransitionLink href="/market">Market</TransitionLink>
        <TransitionLink href="/support">Support</TransitionLink>
        <TransitionLink href="/account">Poppy’s account</TransitionLink>
        <TransitionLink href="/redemption" className={styles.pill}>Redemption</TransitionLink>
      </nav>
    </header>
  );
}
