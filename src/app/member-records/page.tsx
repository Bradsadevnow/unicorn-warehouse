import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getMemberSession } from "@/server/memberSession";
import styles from "../welcome/welcome.module.css";

export const metadata: Metadata = { title: "Member Records Request" };

const notices: Record<string, string> = {
  invalid: "Member Records couldn’t verify this statement. Please upload the original PDF issued to your account.",
  unavailable: "The Member Records desk is temporarily unavailable. Please keep your statement and try again later.",
  "sign-in": "Open a member account to request its statement. You can resume an existing account below.",
};

export default function MemberRecordsPage({ searchParams }: PageProps<"/member-records">) {
  return (
    <main className={styles.splash}>
      <section className={styles.card} aria-labelledby="records-heading">
        <p className={styles.brand}>✦ Unicorn Warehouse</p>
        <h1 id="records-heading">Member Records Request</h1>
        <Suspense fallback={<p>Opening the records desk… ✨</p>}>
          <RecordsDesk searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}

async function RecordsDesk({ searchParams }: Pick<PageProps<"/member-records">, "searchParams">) {
  const [session, query] = await Promise.all([getMemberSession(), searchParams]);
  const status = typeof query.status === "string" && Object.hasOwn(notices, query.status) ? notices[query.status] : undefined;
  return <>
    {status && <p className={styles.recordsNotice} role="alert">{status}</p>}
    {session && <section className={styles.recordsSection}>
      <h2>{session.account.name}’s statement</h2>
      <p>Your Token statement includes a copy of your account as of {session.account.date}.</p>
      <a className={styles.primary} href="/member-records/file" download>Download statement ↓</a>
    </section>}
    <section className={styles.recordsSection}>
      <h2>Resume from a statement</h2>
      <p>{session
        ? "Uploading a statement opens the account saved in that file and replaces the account open in this browser."
        : "Upload your original Member Records PDF to pick up from the day it was issued."}</p>
      <form className={styles.signIn} action="/member-records/file" method="post" encType="multipart/form-data">
        <label htmlFor="member-statement">Member Records PDF</label>
        <input id="member-statement" name="statement" type="file" accept=".pdf,application/pdf" required />
        <button className={styles.primary} type="submit">Open account ✨</button>
      </form>
    </section>
    <p><Link href={session ? "/account" : "/"}>{session ? "Back to your account" : "Start a new account"} →</Link></p>
  </>;
}
