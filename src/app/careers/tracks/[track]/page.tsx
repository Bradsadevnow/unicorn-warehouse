import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getRole, rolePath } from "@/content/careers";
import {
  employers, getTrack, levelNames, payByLevel, trackPositions, tracks,
  helpingHandTrack, type PositionLevel, type TrackId,
} from "@/content/careerTracks";
import { brightsideBriefId, brightsideCatalog } from "@/content/gigCatalogs";
import { postingPath, postings as goodshiftPostings } from "@/content/goodshiftPostings";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import { trackArt as art } from "@/content/trackArt";
import s from "./track.module.css";


export function generateStaticParams() {
  return tracks.map(({ id }) => ({ track: id }));
}

export async function generateMetadata({ params }: PageProps<"/careers/tracks/[track]">): Promise<Metadata> {
  const track = getTrack((await params).track);
  if (!track) return {};
  return { title: `${track.name} · Career tracks`, description: track.summary };
}

export default function TrackPage({ params }: PageProps<"/careers/tracks/[track]">) {
  return <Suspense fallback={<main className={s.page}>Opening track…</main>}>
    <TrackDetails params={params} />
  </Suspense>;
}

/** Extra shifts posted on the internal boards that count toward horn rank in this track. */
function qualifyingShifts(id: TrackId) {
  const track = getTrack(id)!;
  return [
    ...helpingHandPostings
      .filter(({ site }) => helpingHandTrack(site) === id)
      .map(({ title, site, payout, href }) => ({ title, where: site, payout, href, board: "HelpingHand" })),
    ...(track.goodshift ? goodshiftPostings.map((posting) => ({ title: posting.title, where: posting.client, payout: posting.payout, href: postingPath(posting), board: "Goodshift" })) : []),
    ...(track.brightside ? brightsideCatalog.flatMap(({ category, jobs }) => jobs.map(([title, , , payout]) => ({
      title, where: `Brightside · ${category}`, payout, href: `/termiflux#${brightsideBriefId(title)}`, board: "Brightside",
    }))) : []),
  ];
}

async function TrackDetails({ params }: Pick<PageProps<"/careers/tracks/[track]">, "params">) {
  const track = getTrack((await params).track);
  if (!track) notFound();
  const all = trackPositions(track.id);
  const entry = all.filter(({ level }) => level === 1);
  const ladder = ([2, 3, 4] as PositionLevel[]).map((level) => ({ level, positions: all.filter((position) => position.level === level) }));
  const shifts = qualifyingShifts(track.id);
  const departments = [...new Set(all.map(({ business }) => business))];
  const others = tracks.filter(({ id }) => id !== track.id);

  return (
    <main className={s.page}>
      <Link className={s.back} href="/careers#tracks">← All career tracks</Link>
      <header className={s.hero}>
        <div>
          <p className={s.eyebrow}>Career track</p>
          <h1>{track.name}</h1>
          <p className={s.tagline}>{track.tagline}</p>
          <p>{track.summary}</p>
          <div className={s.actions}>
            <a className={s.primary} href="#start">See entry jobs ↓</a>
            <a href="#ladder">Where it leads</a>
            <a href="#kit">Pathway Kit</a>
          </div>
        </div>
        <Image src={art[track.id]} alt="" sizes="(max-width: 860px) 94vw, 520px" preload />
      </header>

      <section className={s.section} id="start" aria-labelledby="start-heading">
        <h2 id="start-heading">Start here</h2>
        <p>Every {track.name} career starts in one of these jobs, at {payByLevel[1]} Tokens an hour, with the rank of Unicorn Trainee.</p>
        <ul className={s.entry}>
          {entry.map((position) => (
            <li key={position.id} id={position.id}>
              <p className={s.eyebrow}>{employers[position.business]?.name} · {position.department}</p>
              <h3>{position.title}</h3>
              <p>{position.summary}</p>
              <dl>
                <div><dt>Base pay</dt><dd>{payByLevel[position.level]} Tokens an hour</dd></div>
                <div><dt>Your manager</dt><dd>{position.manager}, {position.managerTitle}</dd></div>
                <div><dt>Openings</dt><dd>{position.vacancies}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} id="ladder" aria-labelledby="ladder-heading">
        <h2 id="ladder-heading">Where it leads</h2>
        <p>
          Positions above entry level need a minimum horn rank and an open vacancy. Holding the rank makes you eligible to be
          considered. Your horn rank never changes your pay. Your position does.
        </p>
        <ol className={s.ladder}>
          {ladder.map(({ level, positions: list }) => (
            <li key={level} data-level={level}>
              <div className={s.level}>
                <span>{level}</span>
                <div><b>{levelNames[level]}</b><small>{payByLevel[level]} Tokens an hour</small></div>
              </div>
              <ul>
                {list.map((position) => {
                  const rank = getRole(position.minRank);
                  return (
                    <li key={position.id} id={position.id}>
                      <h3>{position.title}</h3>
                      <p className={s.where}>{employers[position.business]?.name} · {position.department}</p>
                      <p>{position.summary}</p>
                      <p className={s.gate}>
                        Requires {rank ? <Link href={rolePath(rank)}>{rank.title}</Link> : position.minRank} · {position.vacancies > 0 ? `${position.vacancies} open` : "Consideration list"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.kit} id="kit" aria-labelledby="kit-heading">
        <div>
          <p className={s.eyebrow}>Required before your first shift</p>
          <h2 id="kit-heading">{track.pathwayKit.name}</h2>
          <p className={s.price}>{track.pathwayKit.tokens} Tokens at Market</p>
          <p className={s.fine}>The kit is yours to keep. Replacement components are sold separately.</p>
        </div>
        <ul>{track.pathwayKit.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className={s.section} id="shifts" aria-labelledby="shifts-heading">
        <h2 id="shifts-heading">Extra shifts that count</h2>
        <p>
          Pick up extra shifts on the internal boards to work toward your next horn rank. Only accepted extra shifts
          in your own track count. {shifts.length} are posted for {track.name} right now.
        </p>
        <ul className={s.shifts}>
          {shifts.map(({ title, where, payout, href, board }) => (
            <li key={`${board}-${title}`}>
              <Link href={href}>
                <b>{title}</b>
                <span>{board} · {where}</span>
                <small>{payout} Tokens</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} aria-labelledby="departments-heading">
        <h2 id="departments-heading">Meet the departments</h2>
        <ul className={s.departments}>
          {departments.map((slug) => {
            const employer = employers[slug];
            if (!employer) return null;
            return (
              <li key={slug}>
                {employer.careersHref ? <Link href={employer.careersHref}>{employer.name} →</Link> : <Link href={employer.href}>{employer.name} →</Link>}
              </li>
            );
          })}
        </ul>
      </section>

      <footer className={s.footer}>
        <p>
          Switching tracks keeps your horn rank and restarts probation and track progress. See
          the <Link href="/terms#careers">Careers terms</Link>.
        </p>
        <nav aria-label="Other career tracks">
          {others.map((other) => <Link key={other.id} href={`/careers/tracks/${other.id}`}>{other.name}</Link>)}
        </nav>
      </footer>
    </main>
  );
}
