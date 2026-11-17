import Link from "next/link";
import { getRole, rolePath } from "@/content/careers";
import { employers, getTrack, levelNames, payByLevel, positions, trackPath } from "@/content/careerTracks";
import s from "./track-callout.module.css";

/** "Part of the X track": the positions at one employer, with pay and the horn rank each one requires. */
export default function TrackCallout({ business }: { business: string }) {
  const here = positions.filter((position) => position.business === business).sort((a, b) => a.level - b.level);
  const track = here[0] && getTrack(here[0].track);
  if (!track) return null;
  const employer = employers[business]?.name ?? business;

  return (
    <section className={s.callout} aria-labelledby={`track-${business}`}>
      <div className={s.intro}>
        <p className={s.eyebrow}>Part of the {track.name} track</p>
        <h2 id={`track-${business}`}>Grow with {employer}</h2>
        <p>{track.summary}</p>
        <div className={s.links}>
          <Link className={s.primary} href={trackPath(track)}>Explore the {track.name} track →</Link>
          <Link href="/careers#ranks">How horn ranks work</Link>
        </div>
      </div>
      <ol className={s.positions}>
        {here.map((position) => {
          const rank = getRole(position.minRank);
          return (
            <li key={position.id} data-level={position.level}>
              <b>{position.title}</b>
              <span>{levelNames[position.level]} · {payByLevel[position.level]} Tokens an hour</span>
              <span>
                {position.level === 1
                  ? `Entry job · ${position.vacancies} open`
                  : <>Requires {rank ? <Link href={rolePath(rank)}>{rank.title}</Link> : position.minRank} · {position.vacancies > 0 ? `${position.vacancies} open` : "Consideration list"}</>}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
