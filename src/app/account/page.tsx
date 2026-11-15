import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import poppy from "@/assets/poppy-unicorn.webp";
import support from "@/assets/support-unicorn.webp";
import { balances, memberAccount } from "@/content/memberAccount";
import { getMemberReportStatus } from "@/server/companyWorkflows";
import s from "./account.module.css";

export const metadata: Metadata = { title: "Poppy’s Account" };

const [dreamwell, everair, estate] = memberAccount.subscriptions;
const report = getMemberReportStatus(memberAccount.id, "report");
const shortcuts = [
  ["#requests", "Open requests"],
  ["#activity", "Activity"],
];

export default function AccountPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className={s.eyebrow}>Member {memberAccount.id} · {memberAccount.date}</p>
          <h1>Good morning, {memberAccount.name}!</h1>
          <p>You’re all caught up on notices. ✨</p>
        </div>
        <Image src={poppy} alt="" sizes="(max-width: 600px) 100px, 220px" priority />
      </header>
      <nav className={s.shortcuts} aria-label="Account sections">
        {shortcuts.map(([href, label]) => <a key={href} href={href}>{label} ↓</a>)}
      </nav>

      <div className={s.overview}>
        <section className={s.wallet} aria-labelledby="wallet-heading">
          <h2 id="wallet-heading">Token wallet</h2>
          <p className={s.amount}><strong>{balances.available}</strong> Tokens available</p>
          <dl className={s.balances}>
            <div><dt>Pending</dt><dd>{balances.pending} Tokens</dd></div>
            <div><dt>Held</dt><dd>{balances.held} Tokens</dd></div>
            <div><dt>Spent</dt><dd>{balances.spent} Tokens</dd></div>
          </dl>
          {report && <a href="#report">Why is my report payout pending? ↓</a>}
        </section>
        <section className={s.attention} aria-labelledby="renewal-heading">
          <span className={s.badge}>Due today</span>
          <h2 id="renewal-heading">Your Everair renewal</h2>
          <p>{everair.name} · {everair.renewal}</p>
          <p className={s.muted}>{everair.status}</p>
        </section>
      </div>

      <div className={s.columns}>
        <div className={s.stack}>
          <section id="statement" className={s.panel}>
            <h2>Token statement</h2>
            <ul className={s.ledger}>
              {memberAccount.ledger.map(({ id, date, label, amount, status }) => (
                <li id={id} key={id}>
                  <div>
                    <strong>{label}</strong><span>{date} · {status}</span>
                    {id === "report" && report && <>
                      <p>{report.status}</p>
                      <Link href={`/software/${report.id}`}>View Goodshift assignment {report.id} →</Link>
                    </>}
                  </div>
                  <b data-status={status}>{status === "spent" ? "−" : status === "posted" ? "+" : ""}{amount} Tokens</b>
                </li>
              ))}
            </ul>
          </section>
          <section id="activity" className={s.panel}>
            <h2>Read notices</h2>
            <ol className={s.timeline}>{memberAccount.notices.map((notice) => {
              const separator = notice.indexOf(" · ");
              return <li key={notice}><strong>{notice.slice(0, separator)}</strong><p>{notice.slice(separator + 3)}</p></li>;
            })}</ol>
          </section>
        </div>

        <div className={s.stack}>
          <section id="memberships" className={s.panel}>
            <h2>Memberships</h2>
            <ul className={s.cards}>
              {[everair, dreamwell, estate].map(({ id, name, renewal, status, note }) => (
                <li id={id} key={id}>
                  <strong>{name}</strong>
                  <span className={s.badge}>{status}</span>
                  <span className={s.muted}>Next renewal {renewal}</span>
                  <p>{note}</p>
                </li>
              ))}
            </ul>
          </section>
          <section id="requests" className={s.panel}>
            <h2>Open requests <span className={s.badge}>{memberAccount.requests.length}</span></h2>
            <ul className={s.cards}>
              {memberAccount.requests.map(({ id, title, status, date }) => (
                <li id={id} key={id}><strong>{title}</strong><span className={s.muted}>{date} · {status}</span></li>
              ))}
            </ul>
          </section>
          <section className={s.panel}>
            <h2>Household &amp; work</h2>
            <p>{memberAccount.household}</p>
            <p className={s.muted}>{memberAccount.employer}</p>
          </section>
          <Link href="/support" className={s.support}>
            <Image src={support} alt="" sizes="64px" />
            <span>Ask a support unicorn →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
