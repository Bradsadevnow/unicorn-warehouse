import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { getTokenBalances } from "@/content/memberAccount";
import { getMemberReportStatus } from "@/server/companyWorkflows";
import { getMemberSession } from "@/server/memberSession";
import WalletChart from "./WalletChart";
import styles from "./account.module.css";

export const metadata = { title: "My account" };

const tabs = [
  ["overview", "✨ Overview"],
  ["wallet", "🪙 Wallet"],
  ["memberships", "💖 Memberships"],
  ["work", "💼 Work"],
  ["activity", "📬 Activity & requests"],
] as const;

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function AccountPage({ searchParams }: PageProps<"/account">) {
  return <Suspense fallback={<main className={styles.page}>Opening your account… ✨</main>}>
    <MemberPortal searchParams={searchParams} />
  </Suspense>;
}

async function MemberPortal({ searchParams }: Pick<PageProps<"/account">, "searchParams">) {
  const session = await getMemberSession();
  if (!session) redirect("/");
  const { account } = session;
  const query = await searchParams;
  const tab = tabs.find(([id]) => id === query.tab)?.[0] ?? "overview";
  const balances = getTokenBalances(account);
  const filter = ["posted", "spent", "pending", "held"].find((status) => status === query.status);
  const ledger = [...account.ledger].sort((a, b) => b.date.localeCompare(a.date));
  const selected = typeof query.transaction === "string"
    ? account.ledger.find(({ id }) => id === query.transaction)
    : undefined;
  if (query.transaction !== undefined && !selected) notFound();
  const report = selected && getMemberReportStatus(account.id, selected.id);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Member {account.id} · {account.date}</p>
          <h1>Hi, {account.name}! ✨</h1>
          <p>{account.household} · {account.employer}</p>
        </div>
        <Link href="/">Switch member →</Link>
      </header>

      <nav className={styles.shortcuts} aria-label="Account views">
        {tabs.map(([id, label]) => <Link key={id} href={id === "overview" ? "/account" : "/account?tab=" + id}
          aria-current={tab === id ? "page" : undefined}>{label}</Link>)}
      </nav>

      {(tab === "overview" || tab === "wallet") && (
        <section className={styles.wallet} aria-labelledby="wallet-heading">
          <h2 id="wallet-heading">Token wallet</h2>
          <p className={styles.amount}><strong>{balances.available}</strong> Tokens available</p>
          <dl className={styles.balances}>
            <div><dt>Pending</dt><dd>{balances.pending} Tokens</dd></div>
            <div><dt>Held</dt><dd>{balances.held} Tokens</dd></div>
            <div><dt>Spent</dt><dd>{balances.spent} Tokens</dd></div>
          </dl>
          {tab === "overview" && <Link href="/account?tab=wallet">Open Wallet →</Link>}
          {ledger.some(({ status }) => status === "pending") && <p><Link href="/account?tab=wallet&status=pending">See pending payouts →</Link></p>}
        </section>
      )}

      {tab === "overview" && <div className={styles.columns}>
        <WalletChart account={account} days={query.days === "30" ? 30 : 90} />
        <div className={styles.stack}>
          <section className={styles.attention}>
            <h2>💖 Memberships</h2>
            {account.subscriptions.filter(({ renewal }) => renewal !== "Paused").slice().sort((a, b) => Date.parse(a.renewal) - Date.parse(b.renewal)).slice(0, 2)
              .map(({ id, name, renewal, status }) => <p key={id}><strong>{name}</strong><br />{renewal} · {status}</p>)}
            <Link href="/account?tab=memberships">View memberships →</Link>
          </section>
          <section className={styles.panel}>
            <h2>📬 Latest activity</h2>
            <p>{account.notices.at(-1)}</p>
            <Link href="/account?tab=activity">View activity and requests →</Link>
          </section>
        </div>
      </div>}

      {tab === "wallet" && <section id="statement" className={styles.panel}>
        <h2>🧾 Token statement</h2>
        <nav className={styles.shortcuts} aria-label="Statement filter">
          {["All", "Posted", "Spent", "Pending", "Held"].map((label) => {
            const status = label === "All" ? undefined : label.toLowerCase();
            return <Link key={label} aria-current={filter === status ? "page" : undefined}
              href={status ? "/account?tab=wallet&status=" + status : "/account?tab=wallet"}>{label}</Link>;
          })}
        </nav>
        {selected && <section id="transaction" className={styles.attention} aria-labelledby="transaction-heading">
          <h3 id="transaction-heading">{selected.label}</h3>
          <p>{selected.amount} Tokens · {selected.status} · {dateFormat.format(Date.parse(selected.date))}</p>
          {report && <p>{report.status} <Link href={`/software/${report.id}`}>View assignment {report.id} →</Link></p>}
          <Link href={"/support?transaction=" + encodeURIComponent(selected.id)}>Ask Support about this transaction →</Link>
        </section>}
        <ul className={styles.ledger}>
          {ledger.filter(({ status }) => !filter || status === filter).map(({ id, date, label, amount, status }) => (
            <li id={id} key={id}>
              <div>
                <Link href={`/account?tab=wallet${filter ? "&status=" + filter : ""}&transaction=${encodeURIComponent(id)}#transaction`}>
                  {status === "pending" ? "Why is this pending?" : label}
                </Link>
                {status === "pending" && <strong className={styles.entryLabel}>{label}</strong>}
                <span>{dateFormat.format(Date.parse(date))} · {status}</span>
              </div>
              <b data-status={status}>{status === "spent" ? "−" : status === "posted" ? "+" : ""}{amount} Tokens</b>
            </li>
          ))}
        </ul>
        {filter && !ledger.some(({ status }) => status === filter) && <p>No {filter} transactions.</p>}
      </section>}

      {tab === "memberships" && <section className={styles.panel} id="memberships">
        <h2>💖 Memberships</h2>
        <ul className={styles.cards}>
          {account.subscriptions.map(({ id, name, status, renewal, note }) => <li key={id} id={id}>
            <strong>{name}</strong><span className={styles.badge}>{status}</span>
            {renewal !== "Paused" && <span>Next renewal {renewal}</span>}<p>{note}</p>
          </li>)}
        </ul>
      </section>}

      {tab === "work" && <section className={styles.panel} id="work">
        <h2>💼 Assignment history</h2>
        <ul className={styles.cards}>
          {[...account.assignments].reverse().map(({ id, ledgerEntryId, status }) => {
            const entry = account.ledger.find((item) => item.id === ledgerEntryId);
            if (!entry) return null;
            return <li key={id} id={id}>
              <strong>{entry.label}</strong>
              <span>{id} · {dateFormat.format(Date.parse(entry.date))} · {status}</span>
              <Link href={`/account?tab=wallet&transaction=${encodeURIComponent(entry.id)}#transaction`}>{entry.amount} Tokens · {entry.status} →</Link>
            </li>;
          })}
        </ul>
      </section>}

      {tab === "activity" && <div className={styles.columns}>
        <section className={styles.panel} id="activity">
          <h2>📬 Member notices</h2>
          <ol className={styles.timeline}>{[...account.notices].reverse().map((notice) => <li key={notice}>{notice}</li>)}</ol>
        </section>
        <section className={styles.panel} id="requests">
          <h2>💌 Support requests</h2>
          <ul className={styles.cards}>{account.requests.map(({ id, title, date, status, ledgerEntryId }) => <li key={id} id={id}>
            <strong>{title}</strong><span>{date} · {status}</span>
            {ledgerEntryId && <Link href={`/account?tab=wallet&transaction=${encodeURIComponent(ledgerEntryId)}#transaction`}>View related transaction →</Link>}
          </li>)}</ul>
        </section>
      </div>}
    </main>
  );
}
