import type { Metadata } from "next";
import Image from "next/image";
import earnArt from "@/assets/tokens-earn.webp";
import spendArt from "@/assets/tokens-spend.webp";
import saveArt from "@/assets/tokens-save.webp";
import { TransitionLink } from "@/components/Veil";
import { TokenBankAccounts, TokenBankDetails } from "./TokenBank";
import s from "./tokens.module.css";

export const metadata: Metadata = {
  title: "Token Economy",
  description: "Earn, bank, and spend Tokens across Unicorn Warehouse.",
};

export default function TokensPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div className={s.intro}>
          <h1>The Token economy<span>.</span></h1>
          <p>A shift here. A treat there. Earn Tokens at any Unicorn Warehouse company. They go straight into your Unicorn Warehouse Bank account, ready to save or spend across the Portfolio.</p>
          <div className={s.actions}>
            <TransitionLink href="/redemption">Browse rewards →</TransitionLink>
            <a href="#accounts">Your accounts ↓</a>
          </div>
        </div>
        <div className={s.heroArt}>
          <Image src="/token-economy.webp" width={640} height={480} sizes="(max-width: 760px) 90vw, 480px" alt="A chibi unicorn hugging a gold star Token" />
        </div>
      </header>

      <TokenBankAccounts />

      <section className={s.guide} aria-label="How Tokens work">
        <article className={s.card}>
          <div className={s.art}><Image src={earnArt} sizes="(max-width: 760px) 100vw, 380px" alt="" /></div>
          <div className={s.cardBody}>
            <h2>Earn Tokens</h2>
            <p>Take a shift, help with a lunch rush, or turn a sponsor brief into a clip. They all pay into Everyday Tokens.</p>
            <ul>
              <li><TransitionLink href="/sublaborix">Find nearby work with HelpingHand →</TransitionLink></li>
              <li><TransitionLink href="/demandeternal">Find office work with Goodshift →</TransitionLink></li>
              <li><TransitionLink href="/termiflux">Make a clip with Brightside →</TransitionLink></li>
            </ul>
          </div>
        </article>
        <article className={s.card}>
          <div className={s.art}><Image src={saveArt} sizes="(max-width: 760px) 100vw, 380px" alt="" /></div>
          <div className={s.cardBody}>
            <h2>Save Tokens</h2>
            <p>Tokens carry over between shifts and never expire. Save 10,000 for a Saturday with nowhere to be.</p>
            <ul><li><TransitionLink href="/redemption#saturday-suite">Explore The Saturday Suite →</TransitionLink></li><li><a href="#sparkle">Explore Sparkle Savings →</a></li></ul>
          </div>
        </article>
        <article className={s.card}>
          <div className={s.art}><Image src={spendArt} sizes="(max-width: 760px) 100vw, 380px" alt="" /></div>
          <div className={s.cardBody}>
            <h2>Spend Tokens</h2>
            <p>Pick up groceries on the way home, commission a little clip, or put your Tokens toward a full night of sleep.</p>
            <ul>
              <li><TransitionLink href="/market">Shop everyday essentials →</TransitionLink></li>
              <li><TransitionLink href="/redemption#a-little-clip">Commission A Little Clip →</TransitionLink></li>
              <li><TransitionLink href="/redemption#sleep-subscriptions">Explore Dreamwell subscriptions →</TransitionLink></li>
            </ul>
          </div>
        </article>
      </section>

      <TokenBankDetails />

      <footer className={s.note}>
        <p>Use Tokens across Unicorn Warehouse. Tokens have no cash value.</p>
      </footer>
    </main>
  );
}
