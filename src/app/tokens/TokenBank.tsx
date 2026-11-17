import Link from "next/link";
import { Suspense } from "react";
import InteriorPanel from "@/components/interior/InteriorPanel";
import { annualPercentageSparkle, bankWork, fees, products, welcomePeriodEnds } from "@/content/bank";
import { bankAutoFinancing, quoteAutoFinancing } from "@/content/autoFinancing";
import { getPosition, payByLevel, trackPath, tracks } from "@/content/careerTracks";
import { sampleRepairTotal, vehicles } from "@/content/motorworks";
import { getBankAccount } from "@/server/bankAccount";
import { getMemberSession } from "@/server/memberSession";
import s from "./bank.module.css";

const tokens = (amount: number) => `${amount.toLocaleString("en-US")} Tokens`;

export function TokenBankAccounts() {
  return (
    <section className={s.bank} id="bank" aria-labelledby="accounts-heading">
      <div className={s.section} id="accounts">
        <h2 id="accounts-heading">Your Unicorn Warehouse Bank accounts</h2>
        <p>Your payouts land here automatically. Banking comes with every membership.</p>
        <Suspense fallback={<p className={s.card}>Opening the vault… ✨</p>}>
          <Accounts />
        </Suspense>
      </div>
    </section>
  );
}

export function TokenBankDetails() {
  const teller = getPosition("teller-unicorn")!;
  const officeTrack = tracks.find(({ id }) => id === teller.track)!;
  const city = vehicles[0];
  const vehicleQuote = quoteAutoFinancing("vehicle", city.price, 0, 60);
  const repairQuote = quoteAutoFinancing("repair", sampleRepairTotal, 0, 12);
  return (
    <div className={s.bank}>
      <InteriorPanel id="bank" />
      <section className={s.section} aria-labelledby="products-heading">
        <h2 id="products-heading">Banking that’s already yours</h2>
        <ul className={s.products}>
          {products.map(({ id, name, kind, tone, line, points, fine }) => (
            <li key={id} id={id} data-tone={tone}>
              <p className={s.eyebrow}>{kind}</p>
              <h3>{name}</h3>
              <p className={s.line}>{line}</p>
              <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
              <p className={s.fine}>{fine}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} id="auto-financing" aria-labelledby="auto-financing-heading">
        <h2 id="auto-financing-heading">Auto financing</h2>
        <p>Finance a car at Unicorn Warehouse Motors or a repair at Motorworks. Monthly payments draw from available Everyday Tokens after your earnings settle.</p>
        <div className={s.work}>
          <article className={s.card}>
            <h3>Vehicle financing</h3>
            <p>{vehicleQuote.apr}% fixed APR · {bankAutoFinancing.vehicle.terms.join(", ")} months</p>
            <p>{city.name} at {tokens(city.price)} comes to {vehicleQuote.monthly.toFixed(2)} Tokens/month for 60 months with no trade-in.</p>
            <Link href="/motorworks#financing">Compare vehicle payments and trade-ins →</Link>
          </article>
          <article className={s.card}>
            <h3>Repair financing</h3>
            <p>{repairQuote.apr}% fixed APR · {bankAutoFinancing.repair.terms.join(", ")} months</p>
            <p>A {tokens(sampleRepairTotal)} service estimate comes to {repairQuote.monthly.toFixed(2)} Tokens/month for 12 months.</p>
            <Link href="/motorworks#repair-financing">Compare repair payments →</Link>
          </article>
        </div>
        <p className={s.fine}>Estimates are before any additional fees. <Link href="/product-details#motorworks">See financing details</Link>.</p>
      </section>

      <section className={s.section} id="fees" aria-labelledby="fees-heading">
        <h2 id="fees-heading">Simple, transparent fees</h2>
        <div className={s.tableWrap}>
          <table className={s.fees}>
            <thead><tr><th scope="col">Service</th><th scope="col">Fee</th><th scope="col">Good to know</th></tr></thead>
            <tbody>
              {fees.map(([service, fee, note]) => (
                <tr key={service}><th scope="row">{service}</th><td>{fee}</td><td>{note}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.fine}>
          All fees are waived through {welcomePeriodEnds}. See the <Link href="/product-details#bank">Bank terms</Link>.
        </p>
      </section>

      <section className={s.section} aria-labelledby="work-heading">
        <h2 id="work-heading">Work at the Bank</h2>
        <div className={s.work}>
          <ul className={s.gigs}>
            {bankWork.gigs.map(({ title, tokens: payout, board }) => (
              <li key={title}><div><b>{title}</b><span>Listed on {board}</span></div><small>{tokens(payout)}</small></li>
            ))}
          </ul>
          <div className={s.card}>
            <p className={s.eyebrow}>Build a career here</p>
            <h3>{teller.title}</h3>
            <p>{teller.department} · {payByLevel[teller.level]} Tokens an hour · Part of the <Link href={trackPath(officeTrack)}>{officeTrack.name}</Link> track</p>
            <p className={s.fine}>Your pay is deposited to Everyday Tokens after client acceptance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

async function Accounts() {
  const session = await getMemberSession();
  if (!session) {
    return <p className={s.card}><Link href="/">Sign in</Link> to see your accounts. Your Tokens are already here.</p>;
  }
  const bank = getBankAccount(session.account);
  const { goal } = bank;
  const years = goal.monthsToGoal ? goal.monthsToGoal / 12 : undefined;
  const pace = years === undefined
    ? "A date isn’t available at your current pace."
    : years >= 2
      ? `At your current pace, you’ll get there in about ${Math.ceil(years).toLocaleString("en-US")} years.`
      : `At your current pace, you’ll get there in about ${goal.monthsToGoal} months.`;

  return (
    <div className={s.accounts}>
      <article className={s.account} data-tone="mint">
        <p className={s.eyebrow}>Everyday Tokens · {session.account.id}</p>
        <p className={s.balance}>{tokens(bank.available)}</p>
        <p>Available balance</p>
        <dl>
          <div><dt>Total balance</dt><dd>{tokens(bank.total)}</dd></div>
          <div><dt>On hold</dt><dd>{tokens(bank.held)}</dd></div>
          <div><dt>Pending, not deposited</dt><dd>{tokens(bank.pending)}</dd></div>
        </dl>
        <Link href="/account?tab=wallet#statement">View statement →</Link>
      </article>

      <article className={s.account} data-tone="lilac">
        <p className={s.eyebrow}>Sparkle Savings</p>
        <p className={s.balance}>{bank.sparkle.toLocaleString("en-US")} ✨</p>
        <p>Sparkle earned in {bank.daysOpen} days</p>
        <dl>
          <div><dt>Annual Percentage Sparkle</dt><dd>{(annualPercentageSparkle * 100).toFixed(2)}%</dd></div>
          <div><dt>Goal</dt><dd><Link href={goal.href}>{goal.name}</Link></dd></div>
          <div><dt>Saved</dt><dd>{tokens(goal.saved)} of {tokens(goal.tokens)}</dd></div>
        </dl>
        <progress value={goal.saved} max={goal.tokens} aria-label={`Progress toward ${goal.name}`} />
        <p className={s.fine}>{pace} Sparkle is not redeemable.</p>
      </article>

      <article className={s.account} data-tone="butter">
        <p className={s.eyebrow}>Early Payday</p>
        {bank.advances.length === 0 && <>
          <p className={s.balance}>0 Tokens</p>
          <p>No pending payouts to advance. Submit an assignment to unlock Early Payday.</p>
        </>}
        {bank.advances.map(({ ledgerEntryId, label, payout, advance, fee, deposited }) => (
          <div key={ledgerEntryId} className={s.advance}>
            <p className={s.balance}>{tokens(deposited)}</p>
            <p>Available today against {label}</p>
            <dl>
              <div><dt>Pending payout</dt><dd>{tokens(payout)}</dd></div>
              <div><dt>Advance</dt><dd>{tokens(advance)}</dd></div>
              <div><dt>Fee</dt><dd>{tokens(fee)}</dd></div>
              <div><dt>You repay</dt><dd>{tokens(advance)}</dd></div>
            </dl>
            <Link href={`/support?transaction=${encodeURIComponent(ledgerEntryId)}`}>Ask a support unicorn about this advance →</Link>
          </div>
        ))}
        <p className={s.fine}>If the payout is not accepted, the advance settles against future earnings.</p>
      </article>
    </div>
  );
}
