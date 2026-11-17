"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { introductoryDays, membershipOffers } from "@/content/memberships";
import styles from "./welcome.module.css";

type Stage = "welcome" | "consent" | "handoff" | "career" | "position" | "home" | "memberships";

type TrackOption = {
  id: string;
  name: string;
  tagline: string;
  image: StaticImageData;
  jobs: Job[];
};

type Job = { id: string; title: string; businessId: string; business: string; department: string; summary: string; pay: number };

type HomeOption = {
  id: string; name: string; neighborhood: string; kind: string; area: number; weeklyRent: number;
  tagline: string; description: string; amenities: string[]; finePrint: string; address: string;
  walks: Record<string, number | null>;
};

export default function WelcomeFlow({ tracks, homes }: { tracks: TrackOption[]; homes: HomeOption[] }) {
  const [name, setName] = useState("");
  const [track, setTrack] = useState<TrackOption>();
  const [job, setJob] = useState<Job>();
  const [home, setHome] = useState<HomeOption>();
  const [stage, setStage] = useState<Stage>("welcome");
  const [seconds, setSeconds] = useState(8);
  const [declined, setDeclined] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (stage === "welcome") return;
    heading.current?.focus();

    if (stage === "consent") {
      const started = Date.now();
      const timer = window.setInterval(() => {
        const remaining = Math.max(0, 8 - Math.floor((Date.now() - started) / 1000));
        setSeconds(remaining);
        if (remaining === 0) setStage("handoff");
      }, 250);
      return () => window.clearInterval(timer);
    }

    if (stage === "handoff") {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const timer = window.setTimeout(() => setStage("career"), reducedMotion ? 0 : 1300);
      return () => window.clearTimeout(timer);
    }
  }, [stage]);

  return (
    <main className={styles.splash} data-uw-welcome data-stage={stage}>
      <div className={styles.card}>
        <p className={styles.brand}>✦ Unicorn Warehouse</p>
        {stage === "welcome" && <>
          <Image className={styles.mascot} src="/sign-in-unicorn.png" alt="" width={240} height={240} priority />
          <h1>Welcome to Unicorn Warehouse!</h1>
          <p>Every bright future starts with a name. ✨</p>
          <form className={styles.signIn} onSubmit={(event) => {
            event.preventDefault();
            const clean = name.trim().replace(/\s+/g, " ");
            if (!clean) return;
            setName(clean);
            setStage("consent");
          }}>
            <label htmlFor="member-name">What should we call you?</label>
            <input id="member-name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={48} autoComplete="off" />
            <label htmlFor="member-ssn">Social Security number</label>
            <input id="member-ssn" type="text" value="•••-••-••••" readOnly aria-describedby="member-ssn-note" />
            <small id="member-ssn-note">We remembered it for you. One less thing to forget! 💖</small>
            <button className={styles.primary} type="submit" disabled={!name.trim()}>Continue ✨</button>
          </form>
          <p><Link href="/member-records">Resume from a statement →</Link></p>
        </>}
        {stage === "consent" && <>
          <h1 ref={heading} tabIndex={-1}>Unicorn Warehouse wants access to {name}’s account</h1>
          <p>Let’s get all your preferences in one place, including the ones you haven’t formed yet. 💖</p>
          <ul className={styles.scopes}>
            <li>See purchases you almost made and what might change your mind.</li>
            <li>Share your Dreamwell sleep history with Goodshift to find hours you could be earning.</li>
            <li>Read your Everair breathing history, including breaths attempted outside coverage.</li>
          </ul>
          <details className={styles.more}>
            <summary>See additional permissions</summary>
            <ul>
              <li>Use dreams you chose to forget to improve recommendations for your household.</li>
              <li>Share your expected Token earnings with Tomorrowly before your assignments are posted.</li>
              <li>Remember why you declined so we can personalize the next time we ask.</li>
            </ul>
          </details>
          <div className={styles.actions}>
            <button className={styles.secondary} type="button" disabled={declined} onClick={() => setDeclined(true)}>{declined ? "Preference noted" : "Decline"}</button>
            <button className={styles.primary} type="button" onClick={() => setStage("handoff")}>Allow ✨</button>
          </div>
          <p className={styles.note}>Continuing automatically in {seconds}s. Take your time! ✨</p>
        </>}
        {stage === "handoff" && <>
          <Image className={styles.mascot} src="/unicorn-mascot.webp" alt="" width={240} height={240} />
          <h1 ref={heading} tabIndex={-1}>You’re in, {name}! ✨</h1>
          <p role="status">Finding a place for you in the herd…</p>
          <button className={styles.secondary} type="button" onClick={() => setStage("career")}>See career tracks</button>
        </>}
        {stage === "career" && <>
          <h1 ref={heading} tabIndex={-1}>Find your place in the herd</h1>
          <p>Pick a track to see where you can start, {name}. 💖</p>
          <div className={styles.trackGrid}>
            {tracks.map((option) => (
              <button key={option.id} type="button" className={styles.track} onClick={() => { setTrack(option); setStage("position"); }}>
                <Image src={option.image} alt="" sizes="(max-width: 560px) 85vw, (max-width: 850px) 42vw, 310px" />
                <span><strong>{option.name}</strong><small>{option.tagline}</small></span>
              </button>
            ))}
          </div>
        </>}
        {stage === "position" && track && <>
          <h1 ref={heading} tabIndex={-1}>{track.name}</h1>
          <p>Choose an opening to start as a Unicorn Trainee. ✨</p>
          <div className={styles.jobGrid}>
            {track.jobs.map((option) => (
              <div key={option.id} className={styles.job}>
                <span>{option.business} · {option.department}</span>
                <h2>{option.title}</h2>
                <p>{option.summary}</p>
                <strong>{option.pay} Tokens per hour</strong>
                <button className={styles.primary} type="button" aria-label={`Accept ${option.title}`}
                  onClick={() => { setJob(option); setStage("home"); }}>Accept position ✨</button>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary} type="button" onClick={() => setStage("career")}>Back to tracks</button>
          </div>
        </>}
        {stage === "home" && track && job && <>
          <h1 ref={heading} tabIndex={-1}>Welcome home, {name}!</h1>
          <p>Every new {job.title} gets a place to land. Pick one of our starter homes. Rent is weekly, and your first week is on us. ✨</p>
          <div className={styles.homeGrid}>
            {homes.map((option) => {
              const walk = option.walks[job.businessId];
              return (
                <div key={option.id} className={styles.home}>
                  <span>{option.neighborhood} · {option.kind} · {option.area} sq ft</span>
                  <h2>{option.name}</h2>
                  <p className={styles.homeTagline}>{option.tagline}</p>
                  <p>{option.description}</p>
                  <ul>{option.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
                  <dl>
                    <div><dt>Address</dt><dd>{option.address}</dd></div>
                    <div><dt>Rent</dt><dd>{option.weeklyRent} Tokens a week</dd></div>
                    <div><dt>Walk to {job.business}</dt><dd>{walk === null || walk === undefined ? "—" : walk === 0 ? "You live upstairs" : `${walk} minute${walk === 1 ? "" : "s"}`}</dd></div>
                  </dl>
                  <small>{option.finePrint}</small>
                  <button className={styles.primary} type="button" aria-label={`Move into ${option.name}`}
                    onClick={() => { setHome(option); setStage("memberships"); }}>Move in ✨</button>
                </div>
              );
            })}
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary} type="button" onClick={() => setStage("position")}>Back to jobs</button>
          </div>
        </>}
        {stage === "memberships" && track && job && home && <form action="/welcome/continue" method="post">
          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="track" value={track.id} />
          <input type="hidden" name="position" value={job.id} />
          <input type="hidden" name="home" value={home.id} />
          <h1 ref={heading} tabIndex={-1}>Your wellbeing, included.</h1>
          <p>New team members receive their first {introductoryDays} days of Everair and Softspace with enrollment, so you arrive at {home.name} breathing easy and feeling just right. Memberships renew automatically after the introductory period. ✨</p>
          <div className={styles.homeGrid}>
            {membershipOffers.map((offer) => (
              <label key={offer.id} className={styles.home}>
                <span>{offer.icon} Included with enrollment</span>
                <h2>{offer.name}</h2>
                <p className={styles.homeTagline}>{offer.summary}</p>
                <p>{offer.benefit}</p>
                <dl>
                  <div><dt>First {introductoryDays} days</dt><dd>Included</dd></div>
                  <div><dt>Then</dt><dd>{offer.price} Tokens every {offer.days} days</dd></div>
                </dl>
                <small>{offer.finePrint}</small>
                <span className={styles.include}><input type="checkbox" name="membership" value={offer.id} defaultChecked /> Include {offer.name}</span>
              </label>
            ))}
          </div>
          <div className={styles.actions}>
            <button className={styles.primary} type="submit">Finish enrollment ✨</button>
            <button className={styles.secondary} type="button" onClick={() => setStage("home")}>Back to homes</button>
          </div>
        </form>}
      </div>
    </main>
  );
}
