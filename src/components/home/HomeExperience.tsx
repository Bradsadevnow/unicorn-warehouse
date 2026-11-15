"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import GlitterLogo from "./GlitterLogo";
import { TransitionLink } from "@/components/Veil";
import { houses, market, productGroups } from "@/content/houses";
import s from "./home.module.css";

gsap.registerPlugin(ScrollTrigger);

const products = [...houses, market];

export default function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
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
          onToggle: (self) => self.isActive && setActive(Number(row.dataset.house)),
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

      {/* ---------- Houses ---------- */}
      <section className={s.houses} id="houses">
        <div className={s.housesHead}>
          <h2 className={s.suiteTitle}>The good stuff <span aria-hidden="true">✦</span></h2>
        </div>
        <div className={s.housesGrid}>
          <div>
          {productGroups.map((group) => (
            <section className={s.suiteGroup} id={group.id} key={group.id}>
            <h3>{group.name}</h3>
            <ul className={s.list}>
            {group.products.map((slug) => {
              const i = products.findIndex((product) => product.slug === slug);
              const h = products[i];
              const inner = (
                <>
                  <Image className={s.thumbnail} src={h.still} alt="" width={72} height={72} />
                  <span className={s.meta}>
                    <span className={s.name}>{h.name}</span>
                    <span>{h.line}</span>
                  </span>
                  <span className={s.state} aria-hidden={h.open}>{h.open ? "↗" : "In preparation"}</span>
                </>
              );
              const cls = `${s.row} ${i === active ? s.rowActive : ""} ${h.open ? s.rowOpen : ""}`;
              return (
                <li key={h.slug} data-house={i} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                  {h.open ? (
                    <TransitionLink href={`/${h.slug}`} className={cls}>
                      {inner}
                    </TransitionLink>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
            </ul>
            </section>
          ))}
          </div>

          <aside className={s.preview} aria-hidden>
            <div className={s.frame}>
              {products.map((h, i) => (
                <div key={h.slug} className={`${s.plate} ${i === active ? s.plateOn : ""}`}>
                  <Image src={h.still} alt="" fill sizes="(max-width: 900px) 0px, 34vw" placeholder="blur" />
                </div>
              ))}
            </div>
            <div className={s.caption}>
              <span className="label">
                  {products[active].domain}
              </span>
              <p key={active} className={s.captionLine}>
                {products[active].category}
              </p>
            </div>
          </aside>
        </div>
      </section>


    </div>
  );
}
