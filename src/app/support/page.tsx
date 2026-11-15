import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import unicorn from "@/assets/support-unicorn.webp";
import SupportChat from "./SupportChat";
import { getMemberSession } from "@/server/memberSession";
import styles from "./support.module.css";

export const metadata: Metadata = {
  title: "Customer Support",
  description: "Ask a Unicorn Warehouse support unicorn about memberships and benefits.",
};

export default function SupportPage({ searchParams }: PageProps<"/support">) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Image src={unicorn} alt="" sizes="(max-width: 700px) 110px, 190px" />
        <div>
          <h1>Got questions?</h1>
          <p>Chat with one of our support unicorns!</p>
        </div>
      </header>
      <Suspense fallback={<p>Opening your support chat… ✨</p>}>
        <MemberSupport searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function MemberSupport({ searchParams }: Pick<PageProps<"/support">, "searchParams">) {
  const session = await getMemberSession();
  if (!session) redirect("/");
  const query = await searchParams;
  const transaction = session.account.ledger.find(({ id }) => id === query.transaction);
  if (query.transaction !== undefined && !transaction) notFound();
  const suggestions = [
    ...(transaction ? [{ id: "transaction", question: "Can you explain this transaction?" }] : []),
    ...(session.account.ledger.some(({ status }) => status === "pending")
      ? [{ id: "report-renewal", question: "Can my pending report payout cover my air renewal?" }] : []),
    { id: "account-balance", question: "How many Tokens do I have?" },
    { id: "held", question: "What’s holding my Tokens?" },
    ...(session.account.subscriptions.some(({ id }) => id === "everair")
      ? [{ id: "offline-breathing", question: "Can I breathe offline?" }] : []),
    { id: "cancellation", question: "What happens if I cancel?" },
    { id: "human-review", question: "Can I speak to a human?" },
  ];
  return <SupportChat key={session.sessionId + (transaction?.id ?? "")} sessionId={session.sessionId}
    transaction={transaction && { id: transaction.id, label: transaction.label }} suggestions={suggestions} />;
}
