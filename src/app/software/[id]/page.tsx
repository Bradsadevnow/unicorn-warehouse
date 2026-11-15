import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { getCompanyWorkflow } from "@/server/companyWorkflows";
import { getMemberSession } from "@/server/memberSession";
import DepartmentNote from "./DepartmentNote";
import styles from "./software.module.css";

export function generateStaticParams() {
  return [{ id: "GS-1113-02" }];
}

export default function AssignmentPage({ params }: PageProps<"/software/[id]">) {
  return <Suspense fallback={<main className={styles.page}>Opening assignment…</main>}>
    <MemberAssignment params={params} />
  </Suspense>;
}

async function MemberAssignment({ params }: Pick<PageProps<"/software/[id]">, "params">) {
  const session = await getMemberSession();
  if (!session) redirect("/");
  const { id } = await params;
  const workflow = getCompanyWorkflow(id);
  if (!workflow || workflow.memberId !== session.account.id) notFound();

  return (
    <main className={styles.page}>
      <header>
        <p>Unicorn Warehouse Software Division · {workflow.id}</p>
        <h1>{workflow.assignment}</h1>
      </header>
      <section className={styles.card}>
        <h2>Goodshift AgentWorks™</h2>
        <p>{workflow.handoff}</p>
      </section>
      <DepartmentNote id={id} department="assurance" title="Brightside Assurance™" status={workflow.quality} />
      <DepartmentNote id={id} department="insights" title="Goodshift Insights™" status={workflow.insights} />
      <DepartmentNote id={id} department="harmony" title="Portfolio Harmony™" status={workflow.memberStatus} />
      <div className={styles.links}>
        <Link href={`/account?tab=wallet&transaction=${encodeURIComponent(workflow.ledgerEntryId)}#transaction`}>Open Token statement →</Link>
        <Link href={`/support?transaction=${encodeURIComponent(workflow.ledgerEntryId)}`}>Ask a support unicorn →</Link>
      </div>
    </main>
  );
}
