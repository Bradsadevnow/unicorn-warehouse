import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getRole, rolePath, roles, traineeEligibility } from "@/content/careers";
import { herdEligiblePostings, postingPath } from "@/content/goodshiftPostings";
import ApplyButton from "../../demandeternal/jobs/[slug]/ApplyButton";
import s from "../../demandeternal/jobs/[slug]/posting.module.css";
import c from "./role.module.css";

export function generateStaticParams() {
  return roles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const role = getRole((await params).slug);
  if (!role) return {};
  return { title: `${role.title} · Careers`, description: role.summary };
}

export default function RolePage({ params }: PageProps<"/careers/[slug]">) {
  return <Suspense fallback={<main className={c.page}>Opening role…</main>}>
    <RoleDetails params={params} />
  </Suspense>;
}

async function RoleDetails({ params }: Pick<PageProps<"/careers/[slug]">, "params">) {
  const role = getRole((await params).slug);
  if (!role) notFound();
  const next = roles.find(({ rung }) => rung === role.rung + 1);
  const sections = [
    ["What you’ll do", role.responsibilities],
    ["What you’ll bring", role.requirements],
    ["What you’ll receive", role.benefits],
    ["Where it leads", role.advancement],
  ] as const;

  return (
    <main className={c.page}>
      <Link className={c.back} href="/careers#path">← Careers</Link>
      <article className={s.detail}>
        <header className={s.header}>
          <div>
            <p className={s.eyebrow}>Unicorn Warehouse · Careers · {role.id}</p>
            <h1 className={c.title}>{role.title}</h1>
            <p className={s.client}>{role.tagline}</p>
            <ul className={s.chips}>
              <li>{role.rateNote}</li>
              <li>{role.horn}</li>
              <li>Level {role.rung} of {roles.length}</li>
              <li data-status={role.status}>{role.status}</li>
            </ul>
          </div>
          {role.openings > 0
            ? <ApplyButton key={role.id} applicants={role.applicants} openings={role.openings} />
            : <p className={c.invite}>Executive Unicorns are nominated. Applications are not accepted.</p>}
        </header>

        <div className={s.layout}>
          <div className={s.body}>
            <section>
              <h3>About the role</h3>
              <p>{role.summary}</p>
            </section>
            {sections.map(([title, items]) => (
              <section key={title}>
                <h3>{title}</h3>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
            {role.rung === 1 && (
              <section id="eligible" className={c.eligible}>
                <h3>Assignments that count toward your application</h3>
                <p>
                  Accepted assignments from these Goodshift postings count toward the {traineeEligibility} you
                  need. Each one counts when the client accepts it.
                </p>
                <ul>
                  {herdEligiblePostings.map((posting) => (
                    <li key={posting.id}>
                      <Link href={postingPath(posting)}>
                        <b>{posting.title}</b>
                        <span>{posting.client} · {posting.duration} · {posting.payout} Tokens</span>
                        <span className={c.counts}><i>Counts when</i> {posting.acceptance[0]}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className={s.fine}>
                  Other Goodshift postings are not counted. A posting’s designation may change while an
                  assignment is awaiting acceptance.
                </p>
              </section>
            )}
            <p className={s.fine}>
              Employment with the herd is governed by the <Link href="/terms#careers">Careers terms</Link>.
              {role.rate !== undefined && " Horns remain company property."}
            </p>
          </div>

          <aside className={s.side}>
            <section className={s.card}>
              <h3>Role details</h3>
              <dl>
                <div><dt>Role</dt><dd>{role.id}</dd></div>
                <div><dt>Pay</dt><dd>{role.rateNote}</dd></div>
                <div><dt>Horn</dt><dd>{role.horn}</dd></div>
                <div><dt>Schedule</dt><dd>{role.schedule}</dd></div>
                <div><dt>Openings</dt><dd>{role.openings}</dd></div>
                <div><dt>Applicants</dt><dd>{role.applicants.toLocaleString("en-US")}</dd></div>
              </dl>
            </section>
            {next && (
              <section className={s.card}>
                <h3>Next on the path</h3>
                <Link className={s.support} href={rolePath(next)}>{next.title} →</Link>
              </section>
            )}
            <section className={s.card}>
              <h3>Questions about this role?</h3>
              <Link className={s.support} href={`/support?role=${role.slug}`}>Ask a support unicorn →</Link>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
