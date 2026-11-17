import Link from "next/link";
import { getTrack, goodshiftTrack, trackPath } from "@/content/careerTracks";

const officeTrack = getTrack(goodshiftTrack)!;
import { type Posting, standardAcceptance } from "@/content/goodshiftPostings";
import ApplyButton from "./[slug]/ApplyButton";
import s from "./[slug]/posting.module.css";

const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function PostingDetail({ posting }: { posting: Posting }) {
  const sections = [
    ["What you’ll do", posting.responsibilities],
    ["What you’ll bring", posting.requirements],
    ["What success looks like", posting.success],
  ] as const;

  return (
    <article className={s.detail}>
      <header className={s.header}>
        <div>
          <p className={s.eyebrow}>Goodshift · {posting.category} · {posting.id}</p>
          <h2>{posting.title}</h2>
          <p className={s.client}>{posting.client}</p>
          <ul className={s.chips}>
            <li>{posting.duration}</li>
            <li>{posting.payout} Tokens</li>
            <li>Remote</li>
            <li>{posting.level}</li>
            <li data-status={posting.status}>{posting.status}</li>
          </ul>
        </div>
        <ApplyButton key={posting.id} applicants={posting.applicants} openings={posting.openings} />
      </header>

      <div className={s.layout}>
        <div className={s.body}>
          <section>
            <h3>About the assignment</h3>
            <p>{posting.summary}</p>
          </section>
          {sections.map(([title, items]) => (
            <section key={title}>
              <h3>{title}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
          <section id="acceptance">
            <h3>Payout and acceptance</h3>
            <ul>{[...posting.acceptance, ...standardAcceptance].map((item) => <li key={item}>{item}</li>)}</ul>
            <p className={s.fine}>
              Assignments are governed by the <Link href="/terms#goodshift">Goodshift terms</Link> and
              the <Link href="/terms#tokens">Token terms</Link>.
            </p>
          </section>
          <section>
            <h3>About the client</h3>
            <p>{posting.clientBlurb}</p>
          </section>
        </div>

        <aside className={s.side}>
          <section className={s.card}>
            <h3>Assignment details</h3>
            <dl>
              <div><dt>Posting</dt><dd>{posting.id}</dd></div>
              <div><dt>Posted</dt><dd>{posting.posted}</dd></div>
              <div><dt>Schedule</dt><dd>{posting.schedule}</dd></div>
              <div><dt>Length</dt><dd>{posting.duration}</dd></div>
              <div><dt>Openings</dt><dd>{posting.openings}</dd></div>
              <div><dt>Applicants</dt><dd>{posting.applicants}</dd></div>
              <div><dt>Career track</dt><dd><Link href={trackPath(officeTrack)}>{officeTrack.name}</Link></dd></div>
            </dl>
          </section>
          <section className={s.card}>
            <h3>Transparent pricing</h3>
            <dl>
              <div><dt>Client pays</dt><dd>{dollars.format(posting.price)}</dd></div>
              <div><dt>You earn</dt><dd>{posting.payout} Tokens</dd></div>
            </dl>
            <p className={s.fine}>Dollars and Tokens are separate units. They are not compared.</p>
          </section>
          <section className={s.card}>
            <h3>Questions about this posting?</h3>
            <Link className={s.support} href={`/support?posting=${posting.slug}&start=1`}>Chat with a support unicorn →</Link>
          </section>
        </aside>
      </div>
    </article>
  );
}
