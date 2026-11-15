import type { Metadata } from "next";
import Image from "next/image";
import market from "@/assets/market-unicorn.webp";
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
            <TransitionLink href="/termiflux">Make a clip with Brightside →</TransitionLink>
            <p>Turn a sponsor brief into a short clip. When it’s approved, the Tokens land in the same balance as your shift earnings.</p>
          </li>
          <li>
            <TransitionLink href="/sublaborix">Pick up work through HelpingHand →</TransitionLink>
            <p>Unload a delivery for 12 Tokens. Pick up a six-roll pack on your way home.</p>
          </li>
        </ol>
      </section>
      <section className={`${s.hero} ${s.save}`} aria-labelledby="save-tokens">
        <div>
          <h2 id="save-tokens">Save Tokens</h2>
          <p>Tokens carry over between shifts and never expire. Save 10,000 for a Saturday with nowhere to be.</p>
          <TransitionLink href="/redemption#saturday-suite">Explore The Saturday Suite →</TransitionLink>
        </div>
        <Image src={market} sizes="(max-width: 700px) 70vw, 360px" alt="" />
      </section>
      <section className={`${s.hero} ${s.spend}`} aria-labelledby="spend-tokens">
        <div>
          <h2 id="spend-tokens">Spend Tokens</h2>
          <p>Shop for groceries and household essentials at Market, commission a short Brightside clip for 5 Tokens, or put 500 a day toward a full night of sleep. Tokens have no cash value.</p>
          <TransitionLink href="/market">Shop Unicorn Warehouse Market →</TransitionLink>
          <TransitionLink href="/redemption">Browse Token Redemption →</TransitionLink>
        </div>
        <Image src={somnara} sizes="(max-width: 700px) 70vw, 360px" alt="" />
      </section>
    </main>
  );
}
