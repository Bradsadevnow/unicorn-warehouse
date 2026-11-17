"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./welcome.module.css";

type Stage = "welcome" | "consent" | "handoff" | "career" | "position";

type TrackOption = {
  id: string;
  name: string;
  tagline: string;
  image: StaticImageData;
  jobs: { id: string; title: string; business: string; department: string; summary: string; pay: number }[];
};

export default function WelcomeFlow({ tracks }: { tracks: TrackOption[] }) {
  const [name, setName] = useState("");
  const [track, setTrack] = useState<TrackOption>();
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
            {track.jobs.map((job) => (
              <form key={job.id} action="/welcome/continue" method="post" className={styles.job}>
                <input type="hidden" name="name" value={name} />
                <input type="hidden" name="track" value={track.id} />
                <input type="hidden" name="position" value={job.id} />
                <span>{job.business} · {job.department}</span>
                <h2>{job.title}</h2>
                <p>{job.summary}</p>
                <strong>{job.pay} Tokens per hour</strong>
                <button className={styles.primary} type="submit" aria-label={`Accept ${job.title}`}>Accept position ✨</button>
              </form>
            ))}
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary} type="button" onClick={() => setStage("career")}>Back to tracks</button>
          </div>
        </>}
      </div>
    </main>
  );
}
