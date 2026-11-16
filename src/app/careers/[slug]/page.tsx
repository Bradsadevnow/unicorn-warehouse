import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getRole, rolePath, roles, traineeEligibility } from "@/content/careers";
import { herdEligiblePostings, postingPath } from "@/content/goodshiftPostings";
import ApplyButton from "../../demandeternal/jobs/[slug]/ApplyButton";
import { getHerdEligibility } from "@/server/herdEligibility";
import { getMemberSession } from "@/server/memberSession";
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
    ["What you’ll receive", role.benefits],
    ["What you’ll do", role.responsibilities],
    ["What you’ll bring", role.requirements],
    ["Where it leads", role.advancement],
  ] as const;

  return (
    <main className={c.page}>
      <Link className={c.back} href="/careers#path">← Careers</Link>
      <article className={c.role}>
        <header className={c.hero} data-level={role.rung}>
          <div className={c.heroCopy}>
            <p className={c.eyebrow}>Unicorn Warehouse Careers · Level {role.rung} of {roles.length}</p>
            <h1 className={c.title}>{role.title}</h1>
            <p className={c.tagline}>{role.tagline}</p>
            <p className={c.summary}>{role.summary}</p>
          </div>
          <section className={c.application} aria-label="Application">
            <p className={c.eyebrow}>{role.status}</p>
            <p className={c.pay}>{role.rateNote}</p>
            <p>{role.schedule}</p>
            {role.rung === 1 ? (
              <Suspense fallback={<p>Checking application eligibility…</p>}>
                <TraineeApplication applicants={role.applicants} openings={role.openings} />
              </Suspense>
            ) : role.openings > 0 ? (
              <ApplyButton key={role.id} applicants={role.applicants} openings={role.openings} />
            ) : (
              <p className={c.invite}>Executive Unicorns are nominated by an Executive Unicorn.</p>
            )}
          </section>
        </header>

        <div className={c.layout}>
          <div className={c.body}>
            {sections.map(([title, items]) => (
              <section key={title}>
                <h2>{title}</h2>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
            {role.rung === 1 && (
              <section id="eligible" className={c.eligible}>
                <h2>Assignments that count toward your application</h2>
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
                <p className={c.fine}>
                  Other Goodshift postings are not counted. A posting’s designation may change while an
                  assignment is awaiting acceptance.
                </p>
              </section>
            )}
            <p className={c.fine}>
              Employment with the herd is governed by the <Link href="/terms#careers">Careers terms</Link>.
              {role.rate !== undefined && " Horns remain company property."}
            </p>
          </div>

          <aside className={c.side}>
            <section className={c.card}>
              <h2>Role details</h2>
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
              <section className={c.card}>
                <h2>Next on the path</h2>
                <Link className={c.support} href={rolePath(next)}>{next.title} →</Link>
              </section>
            )}
            <section className={c.card}>
              <h2>Questions about this role?</h2>
              <Link className={c.support} href={`/support?role=${role.slug}`}>Ask a support unicorn →</Link>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}

async function TraineeApplication({ applicants, openings }: { applicants: number; openings: number }) {
  const session = await getMemberSession();
  if (!session) return <Link className={c.action} href="/">Sign in to check eligibility →</Link>;

  const { remaining } = getHerdEligibility(session.account);
  if (remaining === 0) return <ApplyButton applicants={applicants} openings={openings} />;

  return (
    <div className={c.gate}>
      <p>You have {traineeEligibility - remaining} of {traineeEligibility} accepted assignments toward your application.</p>
      <a className={c.action} href="#eligible">Find assignments that count ↓</a>
    </div>
  );
}
