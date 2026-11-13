import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink } from "@/components/Veil";
import aero from "@/assets/aero-chibi.webp";
import sleep from "@/assets/somnara-chibi.webp";
import terminal from "@/assets/termiflux-chibi.webp";
import implant from "@/assets/undieflow-chibi.webp";
import demand from "@/assets/demandeternal-chibi.webp";
import estate from "@/assets/eternuity-chibi.webp";
import styles from "./redemption.module.css";

export const metadata: Metadata = {
  title: "Token Redemption",
  description: "Browse Portfolio rewards you can save up for with Tokens.",
};

const rewards = [
  {
    name: "A Moment of Silence",
    company: "Brightside",
    slug: "termiflux",
    tokens: 5,
    image: terminal,
    alt: "A toy-sized lavender terminal with a pink cursor",
    description: "One sponsored message, elegantly omitted. The next one is already queued.",
  },
  {
    name: "A Fresh Canister",
    company: "Everair",
    slug: "aerovitalux",
    tokens: 40,
    image: aero,
    alt: "A miniature pink air canister with a mint valve",
    description: "A sealed allocation of alpine air, presented in brushed titanium.",
  },
  {
    name: "A Real Lunch Break",
    company: "Goodshift",
    slug: "demandeternal",
    tokens: 75,
    image: demand,
    alt: "",
    description: "Thirty consecutive minutes. Any work completed during this period will be credited to your next shift.",
  },
  {
    name: "A Comfort Adjustment",
    company: "Softspace",
    slug: "comfortflow",
    tokens: 120,
    image: implant,
    alt: "A mint and pink implant with a heart indicator",
    description: "One calibrated adjustment to your installed comfort profile. Choose the meeting yourself.",
  },
  {
    name: "A Thought of Your Own",
    company: "Everair",
    slug: "aerovitalux",
    tokens: 200,
    image: aero,
    alt: "",
    description: "Keep 100% of the rights to one idea formed while breathing our air.",
  },
  {
    name: "A Family Heirloom",
    company: "Tomorrowly",
    slug: "eternuity",
    tokens: 350,
    image: estate,
    alt: "",
    description: "A framed certificate announcing that your heirs are now earning a share of your Token yield. Frame included.",
  },
];

export default function RedemptionPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <header className={styles.intro}>
          <h1>Token <em>Redemption</em></h1>
          <p>Use your Tokens now, or save for a reward you’ve had your eye on.</p>
          <a href="#rewards" className={styles.link}>Browse rewards ↓</a>
        </header>
        <article className={styles.featured}>
          <div className={styles.art}>
            <Image src={sleep} alt="A lavender egg-shaped sleep pod" fill sizes="(max-width: 700px) 24vw, 220px" />
          </div>
          <div className={styles.details}>
            <p className={styles.price}>500 Tokens</p>
            <h2>One Whole Night</h2>
            <TransitionLink href="/demandeternal" className={styles.link}>A few Tokens short? Pick up a shift →</TransitionLink>
            <p className={styles.description}>Eight consecutive hours in a private pod. Wake naturally, or at the time specified by your employer.</p>
            <TransitionLink href="/somnara" className={styles.link}>Visit Dreamwell →</TransitionLink>
          </div>
        </article>
      </div>

      <section id="rewards" className={styles.catalog} aria-label="Rewards catalog">
        {rewards.map((reward) => (
          <article className={styles.reward} key={reward.name}>
            <div className={styles.art}>
              <Image src={reward.image} alt={reward.alt} fill sizes="(max-width: 700px) 24vw, 160px" placeholder="blur" />
            </div>
            <div className={styles.details}>
              <p className="label">{reward.company}</p>
              <p className={styles.price}>{reward.tokens} Tokens</p>
              <h2>{reward.name}</h2>
              <p className={styles.description}>{reward.description}</p>
              <TransitionLink href={`/${reward.slug}`} className={styles.link}>Visit {reward.company} →</TransitionLink>
            </div>
          </article>
        ))}
      </section>

      <aside className={styles.terms}>
        <h2>Take your time.</h2>
        <p>Tokens carry over between shifts and never expire. Redeem them across the Portfolio. No cash value.</p>
        <TransitionLink href="/demandeternal" className={styles.link}>Earn Tokens at Goodshift →</TransitionLink>
      </aside>
    </main>
  );
}
