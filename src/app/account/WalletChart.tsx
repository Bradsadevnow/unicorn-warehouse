import type { MemberAccount } from "@/content/memberAccount";
import styles from "./account.module.css";

const day = 86_400_000;
const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export default function WalletChart({ account, days }: { account: MemberAccount; days: 30 | 90 }) {
  const start = Date.parse(account.asOf) - (days - 1) * day;
  const bucketSize = days === 30 ? 5 : 15;
  const buckets = Array.from({ length: 6 }, (_, index) => ({
    date: shortDate.format(start + index * bucketSize * day),
    credits: 0,
    spent: 0,
  }));

  for (const entry of account.ledger) {
    const elapsed = (Date.parse(entry.date) - start) / day;
    if (elapsed < 0 || elapsed >= days || entry.id === "opening") continue;
    const bucket = buckets[Math.floor(elapsed / bucketSize)];
    if (entry.status === "posted") bucket.credits += entry.amount;
    if (entry.status === "spent") bucket.spent += entry.amount;
  }
  const max = Math.max(1, ...buckets.flatMap(({ credits, spent }) => [credits, spent]));

  return (
    <section className={styles.panel} aria-labelledby="token-activity">
      <h2 id="token-activity">📊 Token activity</h2>
      <nav className={styles.shortcuts} aria-label="Chart range">
        {[30, 90].map((range) => <a key={range} href={`/account?days=${range}`} aria-current={range === days ? "page" : undefined}>{range} days</a>)}
      </nav>
      <p className={styles.muted}>Posted credits and settled spending · Tokens</p>
      <ul className={styles.chart}>
        {buckets.map(({ date, credits, spent }) => (
          <li key={date}>
            <strong>{date}</strong>
            <span className={styles.chartValues}><span>+{credits} credited</span><span>{spent} spent</span></span>
            <div className={styles.chartTrack} aria-hidden="true"><div data-series="credit" style={{ width: `${100 * credits / max}%` }} /></div>
            <div className={styles.chartTrack} aria-hidden="true"><div data-series="spent" style={{ width: `${100 * spent / max}%` }} /></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
