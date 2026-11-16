import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import campaign from "@/assets/careers-welcome.webp";
import lodge from "@/assets/everair-careers.webp";
import gatheringsTeam from "@/assets/gatherings-careers.webp";
import motorsTeam from "@/assets/motors-careers.webp";
import livingTeam from "@/assets/living-careers.webp";
import wellnessTeam from "@/assets/wellness-careers.webp";
import schoolTeam from "@/assets/cloverfield-school.webp";
import worksTeam from "@/assets/public-works-hero.webp";
import constructionTeam from "@/assets/construction-site.webp";
import fulfillmentTeam from "@/assets/fulfillment-careers.webp";
import dispatchTeam from "@/assets/dispatch-careers.webp";
import quickserveTeam from "@/assets/quickserve-careers.webp";
import brightsideTeam from "@/assets/brightside-careers.webp";
import dreamwellTeam from "@/assets/dreamwell-careers.webp";
import funplexTeam from "@/assets/funplex-careers.webp";
import marketTeam from "@/assets/market-careers.webp";
import { businessPath, getBusiness } from "@/content/businesses";
import { rolePath, roles, traineeEligibility, welcomes } from "@/content/careers";
import { schoolName } from "@/content/school";
import { getHerdEligibility } from "@/server/herdEligibility";
import { getMemberSession } from "@/server/memberSession";
import s from "./careers.module.css";

export const metadata: Metadata = {
  title: "Careers · Become a Unicorn",
  description: "Join the herd at Unicorn Warehouse. Explore the path from Unicorn Trainee to Executive Unicorn.",
};

const teams = [
  { slug: "funplex", name: "Funplex", image: funplexTeam },
  { slug: "market", name: "Market", image: marketTeam },
  { slug: "everair", name: "Everair Alpine Lodge", image: lodge },
  { slug: "dreamwell", name: "Dreamwell", image: dreamwellTeam },
  { slug: "brightside", name: "Brightside", image: brightsideTeam },
  { slug: "quickserve", name: "Horn & Fries", image: quickserveTeam },
  { slug: "dispatch", name: "Dispatch", image: dispatchTeam },
  { slug: "fulfillment", name: "Fulfillment", image: fulfillmentTeam },
  { slug: "gatherings", name: "Gatherings", image: gatheringsTeam },
  { slug: "motorworks", name: "Motors & Motorworks", image: motorsTeam },
  { slug: "living", name: "Living", image: livingTeam },
  { slug: "wellness", name: "Wellness", image: wellnessTeam },
  { slug: "school", name: schoolName, image: schoolTeam },
  { slug: "public-works", name: "Public Works", image: worksTeam },
  { slug: "construction", name: "Construction", image: constructionTeam },
] as const;

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
            <a className={s.primary} href="#teams">Find your team ↓</a>
            <a href="#path">Explore career levels</a>
            <a href="#eligibility">Check your progress</a>
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

      <section id="teams" className={s.section} aria-labelledby="teams-heading">
        <h2 id="teams-heading">Find your team</h2>
        <ul className={s.teams}>
          {teams.map(({ slug, name, image }) => {
            const business = getBusiness(slug);
            if (!business) return null;
            return (
              <li key={slug}>
                <Link href={businessPath(business)}>
                  <Image src={image} alt="" sizes="(max-width: 520px) 94vw, (max-width: 1100px) 46vw, 250px" />
                  <div>
                    <h3>{name}</h3>
                    <p>{business.role.title}</p>
                    <span>Meet the team →</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/home#businesses">Explore all businesses →</Link>
      </section>

      <section className={s.section} id="path" aria-labelledby="path-heading">
        <h2 id="path-heading">Your path through the Herd</h2>
        <p>
          Every unicorn begins as a trainee. Where you go from there is up to your team lead.
          Roles are open across <Link href="/home#businesses">our family of businesses</Link>.
        </p>
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
        <p className={s.fine}>Horns are issued after probation. See the <Link href="/terms#careers">Careers terms</Link> for horn custody.</p>
      </section>

      <section className={s.testimonial} aria-label="A word from our Chief Product Officer">
        <Image src={`/governance/${welcome.slug}.webp`} alt="" width={360} height={360} />
        <figure>
          <blockquote>“{welcome.message}”</blockquote>
          <figcaption><Link href={`/governance/${welcome.slug}`}>{welcome.name}</Link> · {welcome.role}</figcaption>
        </figure>
      </section>

      <section className={s.section} id="eligibility" aria-labelledby="eligibility-heading">
        <h2 id="eligibility-heading">Your first step</h2>
        <div className={s.eligibility}>
          <div>
            <p>
              The herd welcomes members who’ve shown what they can do. Applications for Unicorn Trainee
              open once you’ve completed {traineeEligibility} eligible assignments that clients have accepted
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

      <footer className={s.closing}>
        <p>See where your first shift takes you.</p>
        <p>Explore the Unicorn Trainee role and see which assignments count.</p>
        <Link className={s.primary} href={rolePath(roles[0])}>Explore Unicorn Trainee →</Link>
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
  const { counted, awaitingAcceptance, notEligible, remaining } = getHerdEligibility(session.account);
  const plural = (count: number) => (count === 1 ? "assignment" : "assignments");
  return (
    <div className={s.progress}>
      <h3>{session.account.name}’s progress</h3>
      <p className={s.count}><b>{counted.length}</b> of {traineeEligibility} accepted assignments</p>
      <progress value={counted.length} max={traineeEligibility} aria-label="Accepted assignments" />
      <p>
        {remaining > 0
          ? `You’re ${remaining} accepted ${plural(remaining)} away from applying. Keep going! 🦄`
          : "You’re eligible to apply for Unicorn Trainee. 🦄"}
      </p>
      {awaitingAcceptance.length > 0 && (
        <p className={s.fine}>
          {awaitingAcceptance.length} {plural(awaitingAcceptance.length)} awaiting client acceptance, not counted.
        </p>
      )}
      {notEligible.length > 0 && (
        <p className={s.fine}>
          {notEligible.length} completed {plural(notEligible.length)} from postings that are not herd-eligible, not counted.
        </p>
      )}
      <Link href="/account?tab=work#work">View your assignment history →</Link>
    </div>
  );
}
