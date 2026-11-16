"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import GlitterLogo from "./GlitterLogo";
import { TransitionLink } from "@/components/Veil";
import { houses } from "@/content/houses";
import s from "./home.module.css";

export default function HomeExperience({ careers, town }: { careers: ReactNode; town: ReactNode }) {
  const [word, setWord] = useState(0);

  // "Now subscribing" cycles through what we hold.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setWord((w) => (w + 1) % houses.length), 1900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={s.root}>
      {/* ---------- Hero ---------- */}
      <section className={s.hero}>
        <div className={s.aurora} aria-hidden />
        <GlitterLogo />
        <TransitionLink href="/support" className={s.supportLink}>
          <span aria-hidden="true">✦</span> Got questions? Chat with a support unicorn! <span aria-hidden="true">✦</span>
        </TransitionLink>
        <div className={s.heroFoot}>
          <p className={s.now} aria-live="off">
            <span className="label">Now subscribing</span>
            <span className={s.nowWord} key={word}>
              {houses[word].domain}
            </span>
          </p>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className={s.statement}>
        <Reveal
          as="p"
          className={s.statementText}
          stagger={0.03}
          text="A little more comfort, a little more rest. Explore memberships for the things that make your day."
        />
        <TransitionLink href="/tokens" className={s.tokenSticker} id="tokens">
          <Image src="/token-economy.webp" alt="" width={640} height={480} sizes="(max-width: 600px) 80vw, 280px" />
          <span>Explore the Token economy →</span>
        </TransitionLink>
      </section>

      {careers}

      {/* ---------- The good stuff: the town is the directory ---------- */}
      <section className={s.houses} id="town" aria-labelledby="businesses-heading">
        <div className={s.housesHead} id="businesses">
          <h2 className={s.suiteTitle} id="businesses-heading">The good stuff <span aria-hidden="true">✦</span></h2>
        </div>
        {town}
      </section>
    </div>
  );
}
