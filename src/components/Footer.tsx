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
          <li><TransitionLink href="/support">Customer Support</TransitionLink></li>
          <li><TransitionLink href="/terms">Terms &amp; Conditions</TransitionLink></li>
          <li><TransitionLink href="/product-details">Product Details</TransitionLink></li>
          <li><TransitionLink href="/product-details#harmony">Portfolio Harmony™</TransitionLink></li>
          <li><TransitionLink href="/governance">Corporate Governance</TransitionLink></li>
          <li><TransitionLink href="/tokens">Token Economy</TransitionLink></li>
          <li><TransitionLink href="/funplex">Unicorn Warehouse Funplex</TransitionLink></li>
          <li><TransitionLink href="/home#businesses">Explore businesses</TransitionLink></li>
          <li><TransitionLink href="/careers">Careers</TransitionLink></li>
        </ul>
      </div>
      <div className={styles.footBase}>
        <span>© Unicorn Warehouse</span>
      </div>
    </footer>
  );
}
