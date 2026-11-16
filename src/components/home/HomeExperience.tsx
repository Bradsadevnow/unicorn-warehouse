"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import GlitterLogo from "./GlitterLogo";
import { TransitionLink } from "@/components/Veil";
import { houses } from "@/content/houses";
import type { businessGroups as homeBusinessGroups } from "@/content/homeBusinesses";
import s from "./home.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function HomeExperience({ careers, businessGroups }: { careers: ReactNode; businessGroups: typeof homeBusinessGroups }) {
  const root = useRef<HTMLDivElement>(null);
  const products = businessGroups.flatMap((group) => [...group.businesses]);
  const [active, setActive] = useState(products[0].slug);
  const current = products.find(({ slug }) => slug === active) ?? products[0];
  const [word, setWord] = useState(0);

  // "Now subscribing" cycles through what we hold.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setWord((w) => (w + 1) % houses.length), 1900);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The preview follows whichever house is crossing the middle of the screen.
      gsap.utils.toArray<HTMLElement>("[data-house]").forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 58%",
          end: "bottom 58%",
          onToggle: (self) => {
            if (self.isActive && row.dataset.house) setActive(row.dataset.house);
          },
        });
      });

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={s.root}>
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

      <section className={s.houses} id="houses" aria-labelledby="businesses-heading">
        <div className={s.housesHead} id="businesses">
          <h2 className={s.suiteTitle} id="businesses-heading">The good stuff <span aria-hidden="true">✦</span></h2>
        </div>
        <nav className={s.businessJump} aria-label="Business categories">
          {businessGroups.map(({ id, name }) => <a key={id} href={`#${id}`}>{name}</a>)}
        </nav>
        <div className={s.housesGrid}>
          <div>
            {businessGroups.map(({ id, name, businesses }) => (
              <section className={s.suiteGroup} id={id} key={id}>
                <h3>{name}</h3>
                <ul className={s.list}>
                  {businesses.map((business) => (
                    <li key={business.slug} data-house={business.slug} onPointerEnter={() => setActive(business.slug)} onFocus={() => setActive(business.slug)}>
                      <TransitionLink href={business.href} className={`${s.row} ${s.rowOpen} ${business.slug === active ? s.rowActive : ""}`}>
                        <Image className={s.thumbnail} src={business.still} alt="" width={72} height={72} />
                        <span className={s.meta}>
                          <span className={s.name}>{business.name}</span>
                          <span>{business.line}</span>
                        </span>
                        <span className={s.state} aria-hidden="true">↗</span>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside className={s.preview} aria-hidden>
            <div className={s.frame}>
              {products.map((h) => (
                <div key={h.slug} className={`${s.plate} ${h.slug === current.slug ? s.plateOn : ""}`}>
                  <Image src={h.still} alt="" fill sizes="(max-width: 900px) 0px, 34vw" placeholder="blur" />
                </div>
              ))}
            </div>
            <div className={s.caption}>
              <span className="label">{current.domain}</span>
              <p key={current.slug} className={s.captionLine}>
                {current.category}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
