import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompanyWorkflow } from "@/server/companyWorkflows";
import DepartmentNote from "./DepartmentNote";
import styles from "./software.module.css";

export function generateStaticParams() {
  return [{ id: "GS-1113-02" }];
}

export default async function AssignmentPage({ params }: PageProps<"/software/[id]">) {
  const { id } = await params;
  const workflow = getCompanyWorkflow(id);
  if (!workflow) notFound();

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
        <Link href="/account#report">Open Token statement →</Link>
        <Link href="/support">Ask a support unicorn →</Link>
      </div>
    </main>
  );
}
