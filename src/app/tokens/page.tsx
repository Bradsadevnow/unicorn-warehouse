import type { Metadata } from "next";
import Image from "next/image";
import eternuity from "@/assets/eternuity-chibi.webp";
import somnara from "@/assets/somnara-chibi.webp";
import { TransitionLink } from "@/components/Veil";
import s from "./tokens.module.css";

export const metadata: Metadata = {
  title: "Token Economy",
  description: "How to earn, save, and spend Tokens across Unicorn Warehouse.",
};

export default function TokensPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <h1>The Token economy</h1>
          <p>Earn Tokens at one Unicorn Warehouse company. Spend them at another, or tuck them away for something good.</p>
        </div>
        <Image src="/token-economy.webp" width={640} height={480} sizes="(max-width: 700px) 75vw, 400px" alt="A chibi unicorn hugging a gold star Token" />
      </header>
      <section className={s.journey} aria-labelledby="token-journey">
        <h2 id="token-journey">Earn Tokens</h2>
        <ol>
          <li>
            <TransitionLink href="/demandeternal">Clock in at Goodshift →</TransitionLink>
            <p>Finish a shift and put the Tokens you earn toward a good night’s sleep.</p>
          </li>
          <li>
            <TransitionLink href="/termiflux">Top up with Brightside →</TransitionLink>
            <p>Watch a few ads to add to the same balance. Your shift earnings carry over.</p>
          </li>
          <li>
            <TransitionLink href="/somnara">Sleep at Dreamwell →</TransitionLink>
            <p>Trade 500 Tokens for a full night’s sleep. See you bright and early for your next shift.</p>
          </li>
        </ol>
        <p>More ways to earn: <TransitionLink href="/sublaborix">Pick up work through HelpingHand →</TransitionLink></p>
      </section>
      <section className={`${s.hero} ${s.save}`} aria-labelledby="save-tokens">
        <div>
          <h2 id="save-tokens">Save Tokens</h2>
          <p>Tokens carry over between shifts and never expire. Tomorrowly policyholders can share a portion of their Token yield with their heirs.</p>
          <TransitionLink href="/eternuity">Explore heir participation →</TransitionLink>
        </div>
        <Image src={eternuity} sizes="(max-width: 700px) 70vw, 360px" alt="" />
      </section>
      <section className={`${s.hero} ${s.spend}`} aria-labelledby="spend-tokens">
        <div>
          <h2 id="spend-tokens">Spend Tokens</h2>
          <p>Trade 5 Tokens for an ad skip or save 500 for a whole night of sleep. Tokens have no cash value.</p>
          <TransitionLink href="/redemption">Browse Token Redemption →</TransitionLink>
        </div>
        <Image src={somnara} sizes="(max-width: 700px) 70vw, 360px" alt="" />
      </section>
    </main>
  );
}
