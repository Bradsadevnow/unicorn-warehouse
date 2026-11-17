import Link from "next/link";
import { getTrack, helpingHandTrack, trackPath } from "@/content/careerTracks";
import type { HelpingHandPosting } from "@/content/helpingHandPostings";
import ApplyButton from "../../demandeternal/jobs/[slug]/ApplyButton";
import s from "../../demandeternal/jobs/[slug]/posting.module.css";

const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function PostingDetail({ posting }: { posting: HelpingHandPosting }) {
  const track = getTrack(helpingHandTrack(posting.site) ?? "");
  return (
    <article className={s.detail}>
      <header className={s.header}>
        <div>
          <p className={s.eyebrow}>HelpingHand · {posting.category}</p>
          <h2>{posting.title}</h2>
          <p className={s.client}>{posting.site}</p>
          <ul className={s.chips}>
            <li>{posting.duration}</li>
            <li>{posting.payout} Tokens</li>
            <li>On-site</li>
          </ul>
        </div>
        <ApplyButton key={posting.slug} />
      </header>
      <div className={s.layout}>
        <div className={s.body}>
          <section><h3>About the shift</h3><p>{posting.summary}</p></section>
          <section><h3>What you’ll do</h3><p>{posting.duties}</p></section>
          <section><h3>What you’ll bring</h3><p>{posting.requirements}</p></section>
          <section id="acceptance">
            <h3>Handoff and payout</h3>
            <p>{posting.acceptance}</p>
            <p className={s.fine}>
              Payout reflects the work accepted at handoff. See <Link href="/product-details#work">HelpingHand assignment settlement</Link> and <Link href="/terms#tokens">Token terms</Link>.
            </p>
          </section>
        </div>
        <aside className={s.side}>
          <section className={s.card}>
            <h3>Shift details</h3>
            <dl>
              <div><dt>Worksite</dt><dd>{posting.site}</dd></div>
              {track && <div><dt>Career track</dt><dd><Link href={trackPath(track)}>{track.name}</Link></dd></div>}
              <div><dt>Booked time</dt><dd>{posting.duration}</dd></div>
              <div><dt>Client pays</dt><dd>{dollars.format(posting.price)}</dd></div>
              <div><dt>You earn</dt><dd>{posting.payout} Tokens</dd></div>
            </dl>
          </section>
          <section className={s.card}>
            <h3>Questions about this shift?</h3>
            <Link className={s.support} href={`/support?posting=helpinghand:${posting.slug}&start=1`}>Chat with a support unicorn →</Link>
          </section>
        </aside>
      </div>
    </article>
  );
}
