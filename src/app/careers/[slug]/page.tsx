import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getRole, promotionSummary, rolePath, roles } from "@/content/careers";
import { employers, levelNames, payByLevel, positions, trackPath, tracks } from "@/content/careerTracks";
import c from "./role.module.css";

export function generateStaticParams() {
  return roles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const role = getRole((await params).slug);
  if (!role) return {};
  return { title: `${role.title} · Horn ranks`, description: role.summary };
}

export default function RankPage({ params }: PageProps<"/careers/[slug]">) {
  return <Suspense fallback={<main className={c.page}>Opening rank…</main>}>
    <RankDetails params={params} />
  </Suspense>;
}

async function RankDetails({ params }: Pick<PageProps<"/careers/[slug]">, "params">) {
  const rank = getRole((await params).slug);
  if (!rank) notFound();
  const next = roles.find(({ rung }) => rung === rank.rung + 1);
  const previous = roles.find(({ rung }) => rung === rank.rung - 1);
  const { promotion } = rank;
  const unlocked = tracks
    .map((track) => ({ track, positions: positions.filter((position) => position.track === track.id && position.minRank === rank.slug) }))
    .filter(({ positions: list }) => list.length);

  return (
    <main className={c.page}>
      <Link className={c.back} href="/careers#ranks">← Horn ranks</Link>
      <article className={c.role}>
        <header className={c.hero} data-level={rank.rung}>
          <div className={c.heroCopy}>
            <p className={c.eyebrow}>Horn rank · {rank.rung} of {roles.length}</p>
            <h1 className={c.title}>{rank.title}</h1>
            <p className={c.tagline}>{rank.tagline}</p>
            <p className={c.summary}>{rank.summary}</p>
          </div>
          <section className={c.application} aria-label="How this rank is earned">
            <p className={c.eyebrow}>{rank.horn}</p>
            <p className={c.pay}>How it’s earned</p>
            <p>{promotionSummary(rank)}</p>
          </section>
        </header>

        <div className={c.layout}>
          <div className={c.body}>
            {promotion.by !== "hire" && (
              <section>
                <h2>How to earn it</h2>
                <ul>
                  {promotion.by === "qualification" ? (
                    <>
                      <li>Hold the rank of {previous?.title}.</li>
                      <li>Complete {promotion.qualifyingShifts} accepted extra shifts in your own career track. Shifts in another track are part of your record and are not counted.</li>
                      <li>Receive your department manager’s approval.</li>
                      <li>Complete the Recognition Quest <b>{promotion.quest.title}</b>. Recognition Quests are completed personally, outside working hours.</li>
                    </>
                  ) : (
                    <>
                      <li>Receive a nomination from an Executive Unicorn.</li>
                      <li>Complete the Recognition Quest <b>{promotion.quest.title}</b>.</li>
                    </>
                  )}
                </ul>
              </section>
            )}
            <section>
              <h2>What the rank asks of you</h2>
              <ul>{rank.expectations.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section>
              <h2>What the rank recognizes</h2>
              <ul>{rank.benefits.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            {unlocked.length > 0 && (
              <section id="positions">
                <h2>Positions you could be considered for</h2>
                <p>
                  Holding this rank makes you eligible to be considered for these positions when a vacancy opens.
                  {rank.promotion.by === "hire" ? " These are the entry jobs every employee starts in." : ""}
                </p>
                <div className={c.unlocks}>
                  {unlocked.map(({ track, positions: list }) => (
                    <div key={track.id}>
                      <h3><Link href={trackPath(track)}>{track.name}</Link></h3>
                      <ul>
                        {list.map((position) => (
                          <li key={position.id}>
                            <b>{position.title}</b>
                            <span>{employers[position.business]?.name} · {levelNames[position.level]} · {payByLevel[position.level]} Tokens an hour</span>
                            <span>{position.vacancies > 0 ? `${position.vacancies} open` : "Consideration list"}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <p className={c.fine}>
              A horn rank does not change your position or pay. Horn ranks are governed by the <Link href="/terms#careers">Careers terms</Link>.
            </p>
          </div>

          <aside className={c.side}>
            <section className={c.card}>
              <h2>Rank details</h2>
              <dl>
                <div><dt>Rank</dt><dd>{rank.id}</dd></div>
                <div><dt>Horn</dt><dd>{rank.horn}</dd></div>
                <div><dt>Pay</dt><dd>Set by your position</dd></div>
                {promotion.by === "qualification" && <div><dt>Qualifying shifts</dt><dd>{promotion.qualifyingShifts}</dd></div>}
                {promotion.by !== "hire" && <div><dt>Quest</dt><dd>{promotion.quest.title}</dd></div>}
              </dl>
            </section>
            {next && (
              <section className={c.card}>
                <h2>Next rank</h2>
                <Link className={c.support} href={rolePath(next)}>{next.title} →</Link>
              </section>
            )}
            <section className={c.card}>
              <h2>Questions about horn ranks?</h2>
              <Link className={c.support} href={`/support?role=${rank.slug}`}>Ask a support unicorn →</Link>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
