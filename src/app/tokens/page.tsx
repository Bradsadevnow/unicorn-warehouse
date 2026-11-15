import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import earnArt from "@/assets/tokens-earn.webp";
import spendArt from "@/assets/tokens-spend.webp";
import saveArt from "@/assets/tokens-save.webp";
import { TransitionLink } from "@/components/Veil";
import { getTokenBalances } from "@/content/memberAccount";
import { getMemberSession } from "@/server/memberSession";
import s from "./tokens.module.css";

export const metadata: Metadata = {
  title: "Token Economy",
  description: "How to earn, save, and spend Tokens across Unicorn Warehouse.",
};

const formatTokens = new Intl.NumberFormat("en-US");

function WalletCard({ balances }: { balances?: ReturnType<typeof getTokenBalances> }) {
  return (
    <aside className={s.wallet} aria-label="Token wallet">
      <h2>🪙 Your Token wallet</h2>
      {balances && (
        <>
          <p className={s.balance}><strong>{formatTokens.format(balances.available)}</strong> Tokens available</p>
          <dl className={s.walletDetails}>
            <div><dt>Pending</dt><dd>{formatTokens.format(balances.pending)} Tokens</dd></div>
            <div><dt>Held</dt><dd>{formatTokens.format(balances.held)} Tokens</dd></div>
          </dl>
        </>
      )}
      <TransitionLink href="/account?tab=wallet">Open wallet →</TransitionLink>
    </aside>
  );
}

async function MemberWallet() {
  const session = await getMemberSession();
  return <WalletCard balances={session && getTokenBalances(session.account)} />;
}

export default function TokensPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div className={s.intro}>
          <h1>The Token economy<span>.</span></h1>
          <p>A shift here. A treat there. Earn Tokens at one Unicorn Warehouse company and spend them at another, or save them for something good.</p>
          <div className={s.actions}>
            <TransitionLink href="/redemption">Browse rewards →</TransitionLink>
            <TransitionLink href="/market">Shop Market</TransitionLink>
          </div>
        </div>
        <div className={s.heroArt}>
          <Image src="/token-economy.webp" width={640} height={480} sizes="(max-width: 760px) 90vw, 480px" alt="A chibi unicorn hugging a gold star Token" />
          <Suspense fallback={<WalletCard />}><MemberWallet /></Suspense>
        </div>
      </header>

      <section className={s.guide} aria-label="How Tokens work">
        <article className={s.card}>
          <div className={s.art}><Image src={earnArt} sizes="(max-width: 760px) 100vw, 380px" alt="" /></div>
          <div className={s.cardBody}>
            <h2>Earn Tokens</h2>
            <p>Take a shift, help with a lunch rush, or turn a sponsor brief into a clip. They all pay into the same wallet.</p>
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
            <ul><li><TransitionLink href="/redemption#saturday-suite">Explore The Saturday Suite →</TransitionLink></li></ul>
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

      <footer className={s.note}>
        <p>Use Tokens across Unicorn Warehouse. Tokens have no cash value.</p>
      </footer>
    </main>
  );
}
