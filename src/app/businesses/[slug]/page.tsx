import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { businessPath, businesses, getBusiness } from "@/content/businesses";
import { rolePath, roles } from "@/content/careers";
import { postingPath, postings } from "@/content/goodshiftPostings";
import { helpingHandJobsPath, helpingHandPostings } from "@/content/helpingHandPostings";
import s from "../businesses.module.css";

export function generateStaticParams() {
  return businesses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/businesses/[slug]">): Promise<Metadata> {
  const business = getBusiness((await params).slug);
  if (!business) return {};
  return { title: business.name, description: business.summary };
}

const boards = {
  HelpingHand: helpingHandJobsPath,
  Goodshift: "/demandeternal/jobs",
  Brightside: "/termiflux",
} as const;

export default function BusinessPage({ params }: PageProps<"/businesses/[slug]">) {
  return <Suspense fallback={<main className={s.page}>Opening…</main>}>
    <BusinessDetails params={params} />
  </Suspense>;
}

async function BusinessDetails({ params }: Pick<PageProps<"/businesses/[slug]">, "params">) {
  const business = getBusiness((await params).slug);
  if (!business) notFound();
  if (business.careersHref) permanentRedirect(business.careersHref);
  const level = roles.find(({ rung }) => rung === business.role.rung);
  const open = business.status === "Open";

  return (
    <main className={s.page}>
      <Link className={s.back} href="/home#businesses">← Explore businesses</Link>
      <header className={s.hero} data-tone={business.tone}>
        <span className={s.icon} aria-hidden="true">{business.icon}</span>
        <p className={s.eyebrow}>{business.industry} · {business.status}</p>
        <h1>{business.name}</h1>
        <p className={s.tagline}>{business.tagline}</p>
        <p>{business.summary}</p>
        {open && business.href
          ? <Link className={s.primary} href={business.href}>Visit {business.name} →</Link>
          : <p className={s.fine}>Doors open soon. Shifts are available to members now.</p>}
      </header>

      <div className={s.columns}>
        <section className={s.card} aria-labelledby="gigs-heading">
          <h2 id="gigs-heading">Pick up a shift here</h2>
          <ul className={s.gigs}>
            {business.gigs.map(({ title, tokens, board }) => {
              const posting = board === "Goodshift" ? postings.find((item) => item.title === title) : undefined;
              const helpingHand = board === "HelpingHand" ? helpingHandPostings.find((job) => job.title === title) : undefined;
              const href = posting ? postingPath(posting) : helpingHand?.href;
              return (
                <li key={title}>
                  <div>
                    <b>{href ? <Link href={href}>{title}</Link> : title}</b>
                    <span>Listed on <Link href={boards[board]}>{board}</Link></span>
                  </div>
                  <small>{posting?.payout ?? tokens} Tokens</small>
                </li>
              );
            })}
          </ul>
        </section>

        <div className={s.stack}>
          <section className={s.card} aria-labelledby="career-heading">
            <h2 id="career-heading">Build a career here</h2>
            <p className={s.role}>{business.role.title}</p>
            {level && (
              <p>
                A <Link href={rolePath(level)}>{level.title}</Link> role · {level.rateNote} · {level.horn}
              </p>
            )}
            <Link href="/careers#eligibility">Check your eligibility →</Link>
          </section>

          <section className={s.card} aria-labelledby="policy-heading">
            <h2 id="policy-heading">Good to know</h2>
            <p>{business.policy}</p>
          </section>

          <section className={s.card} aria-labelledby="family-heading">
            <h2 id="family-heading">Part of the family</h2>
            <ul className={s.bullets}>{business.connections.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </div>

      <nav className={s.others} aria-label="More businesses">
        {businesses.filter(({ slug }) => slug !== business.slug).map((other) => (
          <Link key={other.slug} href={businessPath(other)}>{other.icon} {other.name.replace("Unicorn Warehouse ", "")}</Link>
        ))}
      </nav>
    </main>
  );
}
