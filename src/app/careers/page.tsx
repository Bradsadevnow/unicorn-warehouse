import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import campaign from "@/assets/careers-welcome.webp";
import { promotionSummary, rolePath, roles, welcomes } from "@/content/careers";
import { entryPositions, payByLevel, trackPath, tracks } from "@/content/careerTracks";
import { trackArt } from "@/content/trackArt";
import { getEmployeeRecord, type EmployeeRecord } from "@/server/employeeRecord";
import { getMemberSession } from "@/server/memberSession";
import s from "./careers.module.css";

export const metadata: Metadata = {
  title: "Careers · Become a Unicorn",
  description: "Pick a career track at Unicorn Warehouse and see where your first shift can take you.",
};


const welcome = welcomes[3];

export default function CareersPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className={s.eyebrow}>Careers at Unicorn Warehouse</p>
          <h1>See what you <em>could become.</em></h1>
          <p className={s.lede}>Find a team you’re proud to call yours. Do work that makes someone’s day. Join the herd and see where your first shift can take you.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#tracks">Pick your track ↓</a>
            <a href="#profile">How careers work</a>
            <a href="#ranks">Horn ranks</a>
          </div>
        </div>
        <Image src={campaign} alt="" sizes="(max-width: 860px) 94vw, 640px" preload />
      </header>

      <section id="benefits" className={s.life} aria-labelledby="life-heading">
        <div>
          <p className={s.eyebrow}>Life in the Herd</p>
          <h2 id="life-heading">Come for a shift.<br />Find your people.</h2>
          <p>Make a guest’s first visit feel special. Help someone find the one thing they came in for. Every team has its own way to make the everyday a little brighter.</p>
        </div>
        <ul className={s.perks}>
          <li><h3>A little recognition</h3><p>Finish probation and get fitted for your horn.</p></li>
          <li><h3>Room to grow</h3><p>Work toward quarterly horn polishing as a Senior Unicorn.</p></li>
          <li><h3>Feel good at work</h3><p>Standard happiness is included during working hours for Junior Unicorn Associates.</p></li>
          <li><h3>A little company on the way home</h3><p>Eligible employees get Flock check-ins from Clover Cloud. <Link href="/flock">Meet your flock →</Link></p></li>
        </ul>
      </section>

      <section id="profile" className={s.profile} aria-labelledby="profile-heading">
        <div>
          <p className={s.eyebrow}>Two records. One unicorn.</p>
          <h2 id="profile-heading">Your job determines what you contribute. Your horn determines what you’re worth.</h2>
          <p>
            Every employee has a <b>position</b>, the job you do in your career track, which sets your pay and comes with a
            manager. Every employee also has a <b>horn rank</b>, the herd’s recognition of your value, which unlocks
            benefits and makes you eligible for higher positions.
          </p>
          <p className={s.fine}>The two records are kept separately, and neither determines the other. See the <Link href="/terms#careers">Careers terms</Link>.</p>
        </div>
        <Suspense fallback={<ProfileCard heading="Employee profile" record={sampleRecord} sample />}>
          <MemberProfile />
        </Suspense>
      </section>

      <section id="tracks" className={s.section} aria-labelledby="tracks-heading">
        <h2 id="tracks-heading">Pick your track</h2>
        <p>Six career tracks, one employer. Every track starts on the floor at {payByLevel[1]} Tokens an hour and leads somewhere.</p>
        <ul className={s.teams}>
          {tracks.map((track) => (
            <li key={track.id}>
              <Link href={trackPath(track)}>
                <Image src={trackArt[track.id]} alt="" sizes="(max-width: 520px) 94vw, (max-width: 1100px) 46vw, 400px" />
                <div>
                  <h3>{track.name}</h3>
                  <p>{track.tagline}</p>
                  <p className={s.entryJobs}>Start as {entryPositions(track.id).map(({ title }) => title).join(", ")}</p>
                  <span>Explore the track →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="promotion" className={s.section} aria-labelledby="promotion-heading">
        <h2 id="promotion-heading">How you move up</h2>
        <ol className={s.steps}>
          <li><span>1</span><h3>Pick up extra shifts</h3><p>Accepted extra shifts in your own track count toward your next horn rank. Find them on HelpingHand and Goodshift.</p></li>
          <li><span>2</span><h3>Earn your next horn rank</h3><p>Reach the qualifying shifts, get your manager’s approval, and complete the rank’s Recognition Quest.</p></li>
          <li><span>3</span><h3>Be considered</h3><p>Your rank makes you eligible to be considered for a higher position when a vacancy opens. Eligibility to be considered is not an offer of consideration.</p></li>
        </ol>
      </section>

      <section className={s.section} id="ranks" aria-labelledby="ranks-heading">
        <h2 id="ranks-heading">Horn ranks</h2>
        <p>Recognition for the whole herd, from your first day to the Executive Floor. A horn rank never changes your pay.</p>
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
                  <div><dt>Horn</dt><dd>{role.horn}</dd></div>
                  <div><dt>Earned</dt><dd>{promotionSummary(role)}</dd></div>
                </dl>
                <span className={s.view}>View rank →</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className={s.fine}>Horns remain company property. See the <Link href="/terms#careers">Careers terms</Link> for horn custody.</p>
      </section>

      <section className={s.testimonial} aria-label="A word from our Chief Product Officer">
        <Image src={`/governance/${welcome.slug}.webp`} alt="" width={360} height={360} />
        <figure>
          <blockquote>“{welcome.message}”</blockquote>
          <figcaption><Link href={`/governance/${welcome.slug}`}>{welcome.name}</Link> · {welcome.role}</figcaption>
        </figure>
      </section>

      <footer className={s.closing}>
        <p>See where your first shift takes you.</p>
        <p>Pick a track, meet your manager, and start as a Unicorn Trainee on day one.</p>
        <a className={s.primary} href="#tracks">Pick your track →</a>
      </footer>
    </main>
  );
}

type ProfileRecord = {
  position: { title: string; department: string };
  employer: string;
  manager: { name: string; title: string };
  track: { name: string };
  basePay: number;
  hornRank: { title: string; horn: string };
  nextRank?: { title: string };
  qualifyingShifts: Pick<EmployeeRecord["qualifyingShifts"], "counted" | "awaitingAcceptance" | "otherTrack" | "required">;
  probation: EmployeeRecord["probation"];
};

/** Shown to signed-out visitors: what a first-day profile looks like. */
const sampleRecord: ProfileRecord = {
  position: { title: "Line Unicorn", department: "Lunch Rush Crew" },
  employer: "Horn & Fries",
  manager: { name: "Pippa Pickle", title: "Lunch Shift Manager" },
  track: { name: "Food & Fun" },
  basePay: payByLevel[1],
  hornRank: { title: "Unicorn Trainee", horn: "Horn pending" },
  nextRank: { title: "Junior Unicorn Associate" },
  qualifyingShifts: { counted: [], awaitingAcceptance: [], otherTrack: [], required: 40 },
  probation: { day: 1, of: 90, complete: false },
};

async function MemberProfile() {
  const session = await getMemberSession();
  if (!session) return <ProfileCard heading="Employee profile" record={sampleRecord} sample />;
  return <ProfileCard heading={`${session.account.name}’s employee profile`} record={getEmployeeRecord(session.account)} />;
}

function ProfileCard({ heading, record, sample = false }: { heading: string; record: ProfileRecord; sample?: boolean }) {
  const { counted, awaitingAcceptance, otherTrack, required } = record.qualifyingShifts;
  return (
    <article className={s.profileCard} aria-label={heading}>
      <p className={s.eyebrow}>{sample ? "Sample · your first day" : "Unicorn Warehouse · Employee profile"}</p>
      <h3>{heading}</h3>
      <dl>
        <div><dt>Position</dt><dd>{record.position.title}</dd></div>
        <div><dt>Department</dt><dd>{record.employer} · {record.position.department}</dd></div>
        <div><dt>Manager</dt><dd>{record.manager.name}, {record.manager.title}</dd></div>
        <div><dt>Track</dt><dd>{record.track.name}</dd></div>
        <div><dt>Base pay</dt><dd>{record.basePay} Tokens an hour</dd></div>
        <div className={s.rankRow}><dt>Horn rank</dt><dd>{record.hornRank.title} · {record.hornRank.horn}</dd></div>
        <div><dt>Probation</dt><dd>{record.probation.complete ? "Complete" : `Day ${record.probation.day} of ${record.probation.of}`}</dd></div>
      </dl>
      {record.nextRank && required !== undefined && (
        <div className={s.toward}>
          <p><b>{counted.length}</b> of {required} qualifying shifts toward {record.nextRank.title}</p>
          <progress value={counted.length} max={required} aria-label={`Qualifying shifts toward ${record.nextRank.title}`} />
          {awaitingAcceptance.length > 0 && <p className={s.fine}>{awaitingAcceptance.length} awaiting client acceptance, not counted.</p>}
          {otherTrack.length > 0 && <p className={s.fine}>{otherTrack.length} from another track, part of your record and not counted.</p>}
        </div>
      )}
      <p className={s.fine}>Your position reflects your assigned responsibilities. Your horn rank reflects your recognized value to the herd. 💖</p>
    </article>
  );
}
