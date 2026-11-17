import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { getPosting, postingPath } from "@/content/goodshiftPostings";
import { getTokenBalances } from "@/content/memberAccount";
import { getMemberReportStatus } from "@/server/companyWorkflows";
import { getMemberSession } from "@/server/memberSession";
import { getServiceHistory, serviceNames } from "@/server/serviceHistory";
import FunHours from "./FunHours";
import MemberCalendar from "./MemberCalendar";
import MemberDay from "./MemberDay";
import MemberHome from "./MemberHome";
import { projectCalendar } from "@/server/gameCalendar";
import PlayerObjectives from "./PlayerObjectives";
import { objectiveComplete } from "@/server/gameState";
import WalletChart from "./WalletChart";
import styles from "./account.module.css";

export const metadata = { title: "My account" };

const tabs = [
  ["overview", "✨ Overview"],
  ["calendar", "🗓️ Calendar"],
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
  const equipped = objectiveComplete(session.game, "buy-kit");
  const query = await searchParams;
  const tab = tabs.find(([id]) => id === query.tab)?.[0] ?? "overview";
  const balances = getTokenBalances(account);
  const history = getServiceHistory(account);
  const services = [...new Set(history.map(({ service }) => service))].sort();
  const selectedService = services.find((service) => service === query.service);
  const filter = ["posted", "spent", "pending", "held"].find((status) => status === query.status);
  const ledger = [...account.ledger].sort((a, b) => b.date.localeCompare(a.date));
  const selected = typeof query.transaction === "string"
    ? account.ledger.find(({ id }) => id === query.transaction)
    : undefined;
  if (query.transaction !== undefined && !selected) notFound();
  const report = selected?.status === "pending" && getMemberReportStatus(account.id, selected.id);
  const relatedEvents = selected ? history.filter(({ ledgerEntryIds }) => ledgerEntryIds?.includes(selected.id)) : [];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Member {account.id} · {account.date}</p>
          <h1>Hi, {account.name}! ✨</h1>
          <p>{account.household} · {account.employer}</p>
        </div>
        <div className={styles.stack}>
          <Link href="/member-records">Member Records →</Link>
          <Link href="/">Start a new account →</Link>
        </div>
      </header>

      {query.restored === "1" && <p role="status" className={styles.restoreNotice}>Your account is right where you left it. Welcome back, {account.name}! ✨</p>}

      <nav className={styles.shortcuts} aria-label="Account views">
        {tabs.map(([id, label]) => <Link key={id} href={id === "overview" ? "/account" : "/account?tab=" + id}
          aria-current={tab === id ? "page" : undefined}>{label}</Link>)}
      </nav>

      {tab === "wallet" && (
        <section className={styles.wallet} aria-labelledby="wallet-heading">
          <h2 id="wallet-heading">Token wallet</h2>
          <p className={styles.amount}><strong>{balances.available}</strong> Tokens available</p>
          <dl className={styles.balances}>
            <div><dt>Pending</dt><dd>{balances.pending} Tokens</dd></div>
            <div><dt>Held</dt><dd>{balances.held} Tokens</dd></div>
            <div><dt>Spent</dt><dd>{balances.spent} Tokens</dd></div>
          </dl>
          {ledger.some(({ status }) => status === "pending") && <p><Link href="/account?tab=wallet&status=pending">See pending payouts →</Link></p>}
        </section>
      )}

      {tab === "calendar" && (() => {
        const calendar = projectCalendar(session.seed, session.game);
        return (
          <section className={styles.panel} id="calendar" aria-labelledby="calendar-heading">
            <h2 id="calendar-heading">🗓️ Your calendar</h2>
            <p>Everything already on your schedule, from rent to Fun Hours. Charges show what happens if nothing else changes before they fall due.</p>
            <MemberCalendar today={calendar.today} from={calendar.from} until={calendar.until} entries={calendar.entries} />
          </section>
        );
      })()}
      {tab === "overview" && <PlayerObjectives game={session.game}
        error={!equipped && typeof query.actionError === "string" ? query.actionError : undefined} />}
      {tab === "overview" && equipped && <section className={`${styles.panel} ${styles.recognition}`}>
        <h2>🦄 Recognition</h2>
        <Link href="/quests/horn-fitting">The Horn Fitting →</Link>
      </section>}
      {tab === "overview" && <MemberHome game={session.game}
        error={typeof query.actionError === "string" ? query.actionError : undefined} />}
      {tab === "overview" && equipped && <MemberDay game={session.game} available={balances.available}
        error={typeof query.actionError === "string" ? query.actionError : undefined} />}
      {tab === "overview" && <div className={styles.columns}>
        <section className={styles.panel}>
          <h2>📬 Recent service activity</h2>
          {history.length === 0 && <p>Your first service transactions will appear here.</p>}
          <ol className={styles.timeline}>
            {history.slice(0, 5).map(({ eventId, service, date, title }) => (
              <li key={eventId}>
                <p>{serviceNames[service]} · {dateFormat.format(Date.parse(date))}</p>
                <Link href={`/account?tab=activity&service=${service}#${eventId}`}>{title} →</Link>
              </li>
            ))}
          </ol>
          <Link href="/account?tab=activity">See all service activity →</Link>
        </section>
        <div className={styles.stack}>
          <section className={styles.attention}>
            <h2>💖 Memberships</h2>
            {account.subscriptions.length === 0 && <p>Your account has no active memberships.</p>}
            {account.subscriptions.filter(({ renewal }) => renewal !== "Paused").slice().sort((a, b) => Date.parse(a.renewal) - Date.parse(b.renewal)).slice(0, 2)
                  .map(({ id, name, renewal, status }) => <p key={id}><strong>{name}</strong><br />{renewal} · {status}</p>)}
            <Link href="/account?tab=memberships">View memberships →</Link>
          </section>
          <section className={styles.panel}>
            <h2>💌 Latest notice</h2>
            <p>{account.notices.at(-1)}</p>
            <Link href="/account?tab=activity">View activity and requests →</Link>
          </section>
        </div>
        <FunHours account={account} />
      </div>}

      {tab === "wallet" && <WalletChart account={account} days={query.days === "30" ? 30 : 90} />}
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
          {relatedEvents.map(({ eventId, service, title }) => (
            <Link key={eventId} href={`/account?tab=activity&service=${service}#${eventId}`}>{title} · {eventId} →</Link>
          ))}
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
        {account.subscriptions.length === 0 && <p>Your account has no active memberships.</p>}
        <ul className={styles.cards}>
          {account.subscriptions.map(({ id, name, status, renewal, note }) => <li key={id} id={id}>
            <strong>{name}</strong><span className={styles.badge}>{status}</span>
            {renewal !== "Paused" && <span>Next renewal {renewal}</span>}<p>{note}</p>
          </li>)}
        </ul>
      </section>}

      {tab === "work" && <section className={styles.panel} id="work">
        <h2>💼 Assignment history</h2>
        {account.assignments.length === 0 && <p>Your completed extra shifts will appear here.</p>}
        <ul className={styles.cards}>
          {[...account.assignments].reverse().map(({ id, ledgerEntryId, status, postingId }) => {
            const entry = account.ledger.find((item) => item.id === ledgerEntryId);
            if (!entry) return null;
            const posting = postingId ? getPosting(postingId) : undefined;
            return <li key={id} id={id}>
              <strong>{entry.label}</strong>
              <span>{id} · {dateFormat.format(Date.parse(entry.date))} · {status}</span>
              <Link href={`/account?tab=wallet&transaction=${encodeURIComponent(entry.id)}#transaction`}>{entry.amount} Tokens · {entry.status} →</Link>
              {posting && <Link href={postingPath(posting)}>View posting {posting.id} →</Link>}
            </li>;
          })}
        </ul>
      </section>}

      {tab === "activity" && <div className={styles.columns}>
        <section className={styles.panel} id="activity">
          <h2>📬 Service history</h2>
          <nav className={styles.shortcuts} aria-label="Filter service history">
            <Link href="/account?tab=activity" aria-current={!selectedService ? "page" : undefined}>All services</Link>
            {services.map((service) => <Link key={service} href={`/account?tab=activity&service=${service}`}
              aria-current={selectedService === service ? "page" : undefined}>{serviceNames[service]}</Link>)}
          </nav>
          <ol className={styles.timeline}>
            {history.filter(({ service }) => !selectedService || service === selectedService)
              .map(({ eventId, service, date, title, detail, ledgerEntryIds }) => (
                <li id={eventId} key={eventId}>
                  <p>{serviceNames[service]} · {dateFormat.format(Date.parse(date))}</p>
                  <strong>{title}</strong><p>{detail}</p>
                  <p className={styles.muted}>Event {eventId}</p>
                  {ledgerEntryIds?.map((id) => {
                    const entry = account.ledger.find((item) => item.id === id);
                    return <p key={id}><Link href={`/account?tab=wallet&transaction=${encodeURIComponent(id)}#transaction`}>{entry?.label} →</Link></p>;
                  })}
                </li>
              ))}
          </ol>
        </section>
        <section className={styles.panel} id="requests">
          <h2>💌 Support requests</h2>
          <ul className={styles.cards}>{account.requests.map(({ id, title, date, status, ledgerEntryId }) => <li key={id} id={id}>
            <strong>{title}</strong><span>{date} · {status}</span>
            {ledgerEntryId && <Link href={`/account?tab=wallet&transaction=${encodeURIComponent(ledgerEntryId)}#transaction`}>View related transaction →</Link>}
          </li>)}</ul>
          <h2 id="notices">Member notices</h2>
          <ol className={styles.timeline}>{[...account.notices].reverse().map((notice) => <li key={notice}>{notice}</li>)}</ol>
        </section>
      </div>}
    </main>
  );
}
