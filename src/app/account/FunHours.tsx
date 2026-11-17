import Link from "next/link";
import type { MemberAccount } from "@/content/memberAccount";
import { funHourRate, funSteps } from "@/content/funplex";
import { getFunHours } from "@/server/funHours";
import styles from "./account.module.css";

const tokens = (amount: number) => `${amount.toLocaleString("en-US")} Tokens`;

export default function FunHours({ account }: { account: MemberAccount }) {
  const fun = getFunHours(account);
  return (
    <section className={styles.panel} id="fun-hours" aria-labelledby="fun-hours-heading">
      <h2 id="fun-hours-heading">🎟️ Your Fun Hours</h2>
      <div className={styles.funHours}>
        <div className={styles.stack}>
          <p><strong>{fun.completed} of {fun.required}</strong> Fun Hours enjoyed this month</p>
          <progress value={fun.completed} max={fun.required} aria-label="Fun Hours enjoyed this month" />
          {fun.scheduled.length > 0 ? <>
            <h3>We’ve scheduled the rest for you 🎉</h3>
            <ul className={styles.cards}>
              {fun.scheduled.map(({ date, time, attraction }) => (
                <li key={date}><b>{date} · {time}</b><span>{attraction}</span></li>
              ))}
            </ul>
            <p>{tokens(fun.due)} will be billed at check-in time. You have {tokens(fun.available)} available.</p>
          </> : fun.unpaid === 0 && <p>You’re all caught up on fun this month. See you soon! 🎉</p>}
          {fun.unpaid > 0 && <p>{fun.unpaid} scheduled check-in{fun.unpaid === 1 ? " is" : "s are"} awaiting payment.</p>}
          <Link href="/support">Ask a support unicorn about your Fun Hours →</Link>
        </div>
        <div className={styles.stack}>
          <ol className={styles.cards}>
            {funSteps.map(([title, text]) => <li key={title}><b>{title}</b><span>{text}</span></li>)}
          </ol>
          <p className={styles.muted}>
            A Fun Hour is {tokens(funHourRate)}, billed at check-in time. Attractions are priced separately.
            See the <Link href="/terms#funplex-visit">visit terms</Link> and <Link href="/product-details#funplex">Funplex product details</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
