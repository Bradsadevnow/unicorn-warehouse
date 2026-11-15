import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { posters, rolePath, roles, traineeEligibility, welcomes } from "@/content/careers";
import { getMemberSession } from "@/server/memberSession";
import s from "./careers.module.css";

export const metadata: Metadata = {
  title: "Careers · Become a Unicorn",
  description: "Join the herd at Unicorn Warehouse. Explore the path from Unicorn Trainee to Executive Unicorn.",
};

export default function CareersPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className={s.eyebrow}>Unicorn Warehouse · Careers</p>
          <h1>✨ Become a Unicorn! ✨</h1>
          <p className={s.lede}>Your horn. Your hustle. Our future.</p>
          <p>
            At Unicorn Warehouse, we believe everyone deserves the opportunity to become something greater
            than themselves. Join the herd and grow with a family that’s growing every day. 🦄
          </p>
          <div className={s.actions}>
            <a className={s.primary} href="#path">See the career path ↓</a>
            <a href="#eligibility">Check your eligibility</a>
          </div>
          <p className={s.fine}>
            Horn provided upon successful completion of probation. Horn remains company property.
          </p>
        </div>
        <Image src="/unicorn-mascot.webp" alt="" width={360} height={360} priority />
      </header>

      <section className={s.posters} aria-label="Why join the herd">
        {posters.map(({ headline, fine, tone }) => (
          <figure key={headline} data-tone={tone}>
            <p>{headline}</p>
            <figcaption>{fine}</figcaption>
          </figure>
        ))}
      </section>

      <section className={s.section} id="path" aria-labelledby="path-heading">
        <h2 id="path-heading">Your path through the herd</h2>
        <p>Every unicorn begins as a trainee. Where you go from there is up to your team lead.</p>
        <ol className={s.ladder}>
          {roles.map((role) => (
            <li key={role.id}>
              <Link href={rolePath(role)}>
                <span className={s.rung}>{role.rung}</span>
                <div>
                  <h3>{role.title}</h3>
                  <p>{role.tagline}</p>
                </div>
                <dl>
                  <div><dt>Pay</dt><dd>{role.rateNote}</dd></div>
                  <div><dt>Horn</dt><dd>{role.horn}</dd></div>
                </dl>
                <span className={s.view}>View role →</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.section} id="eligibility" aria-labelledby="eligibility-heading">
        <h2 id="eligibility-heading">Start with a shift</h2>
        <div className={s.eligibility}>
          <div>
            <p>
              The herd welcomes members who’ve shown what they can do. Applications for Unicorn Trainee
              open once you’ve completed {traineeEligibility} accepted assignments
              at <Link href="/demandeternal/jobs">Goodshift</Link> or <Link href="/sublaborix">HelpingHand</Link>.
            </p>
            <p className={s.fine}>
              Assignments awaiting client acceptance are not counted. Opportunity Hours are not counted.
              See the <Link href="/careers/unicorn-trainee#eligible">assignments that count</Link> and
              the <Link href="/terms#careers">Careers terms</Link>.
            </p>
          </div>
          <Suspense fallback={<div className={s.progress}>Checking your record… ✨</div>}>
            <Eligibility />
          </Suspense>
        </div>
      </section>

      <section className={s.section} aria-labelledby="welcome-heading">
        <h2 id="welcome-heading">A warm welcome from our leaders</h2>
        <ul className={s.welcomes}>
          {welcomes.map(({ slug, name, role, topic, message }) => (
            <li key={slug}>
              <Image src={`/governance/${slug}.webp`} alt="" width={96} height={96} />
              <div>
                <p className={s.eyebrow}>{topic}</p>
                <blockquote>“{message}”</blockquote>
                <p><Link href={`/governance/${slug}`}><b>{name}</b></Link> · {role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className={s.closing}>
        <p>✨ Become a Unicorn! ✨</p>
        <p>You can leave the herd anytime. Your horn stays with us.</p>
        <Link className={s.primary} href={rolePath(roles[0])}>Apply for Unicorn Trainee →</Link>
      </footer>
    </main>
  );
}

async function Eligibility() {
  const session = await getMemberSession();
  if (!session) {
    return (
      <div className={s.progress}>
        <h3>Your progress</h3>
        <p><Link href="/">Sign in</Link> to see how close you are to joining the herd.</p>
      </div>
    );
  }
  const { name, assignments } = session.account;
  const accepted = assignments.filter(({ status }) => status === "Client accepted" || status === "Completed").length;
  const waiting = assignments.length - accepted;
  const remaining = Math.max(0, traineeEligibility - accepted);
  return (
    <div className={s.progress}>
      <h3>{name}’s progress</h3>
      <p className={s.count}><b>{accepted}</b> of {traineeEligibility} accepted assignments</p>
      <progress value={accepted} max={traineeEligibility} aria-label="Accepted assignments" />
      <p>
        {remaining > 0
          ? `You’re ${remaining} accepted ${remaining === 1 ? "assignment" : "assignments"} away from applying. Keep going! 🦄`
          : "You’re eligible to apply for Unicorn Trainee. 🦄"}
      </p>
      {waiting > 0 && (
        <p className={s.fine}>
          {waiting} {waiting === 1 ? "assignment is" : "assignments are"} awaiting client acceptance and not counted.
        </p>
      )}
      <Link href="/account?tab=work#work">View your assignment history →</Link>
    </div>
  );
}
