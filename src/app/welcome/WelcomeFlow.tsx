"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./welcome.module.css";

type Stage = "welcome" | "consent" | "handoff";

type SignInProfile = { id: string; name: string; maskedNumber: string };

export default function WelcomeFlow({ profiles }: { profiles: readonly SignInProfile[] }) {
  const [profileIndex, setProfileIndex] = useState(0);
  const profile = profiles[profileIndex];
  const [stage, setStage] = useState<Stage>("welcome");
  const [seconds, setSeconds] = useState(8);
  const [declined, setDeclined] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);

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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => form.current?.requestSubmit(), reducedMotion ? 0 : 1300);
    return () => window.clearTimeout(timer);
  }, [stage]);

  return (
    <main className={styles.splash} data-uw-welcome data-stage={stage}>
      <div className={styles.card}>
        <p className={styles.brand}>✦ Unicorn Warehouse</p>
        {stage === "welcome" && <>
          <Image className={styles.mascot} src="/sign-in-unicorn.png" alt="" width={240} height={240} priority />
          <h1>Welcome back, {profile.name}!</h1>
          <p>Your memberships are right where you left them. So is your identity. ✨</p>
          <form className={styles.signIn} onSubmit={(event) => {
            event.preventDefault();
            setStage("consent");
          }}>
            <label htmlFor="member-ssn">Social Security number</label>
            <input id="member-ssn" type="text" value={profile.maskedNumber} readOnly aria-describedby="member-ssn-note" />
            <small id="member-ssn-note">We remembered it for you. One less thing to forget! 💖</small>
            <button className={styles.primary} type="submit">Sign in as {profile.name} ✨</button>
            {profiles.length > 1 && <label>
              Switch member
              <select value={profileIndex} onChange={(event) => setProfileIndex(Number(event.target.value))}>
                {profiles.map(({ id, name }, index) => <option key={id} value={index}>{name}</option>)}
              </select>
            </label>}
          </form>
        </>}
        {stage === "consent" && <>
          <h1 ref={heading} tabIndex={-1}>Unicorn Warehouse wants access to {profile.name}’s account</h1>
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
          <h1 ref={heading} tabIndex={-1}>You’re in, {profile.name}! ✨</h1>
          <p role="status">Getting your Unicorn Warehouse ready…</p>
          <form ref={form} method="post" action="/welcome/continue">
            <input type="hidden" name="profile" value={profile.id} />
            <button className={styles.secondary} type="submit">Continue to homepage</button>
          </form>
        </>}
      </div>
    </main>
  );
}
