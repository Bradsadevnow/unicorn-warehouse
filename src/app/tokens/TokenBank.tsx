import Link from "next/link";
import { bankWork, fees, products, welcomePeriodEnds } from "@/content/bank";
import { bankAutoFinancing, quoteAutoFinancing } from "@/content/autoFinancing";
import { getPosition, payByLevel, trackPath, tracks } from "@/content/careerTracks";
import { sampleRepairTotal, vehicles } from "@/content/motorworks";
import s from "./bank.module.css";

const tokens = (amount: number) => `${amount.toLocaleString("en-US")} Tokens`;

export function TokenBankAccounts() {
  return (
    <section className={s.bank} id="bank" aria-labelledby="accounts-heading">
      <div className={s.section} id="accounts">
        <h2 id="accounts-heading">Your Unicorn Warehouse Bank accounts</h2>
        <p>Your payouts land here automatically. Banking comes with every membership.</p>
        <p className={s.card}>Member enrollment opens soon. Your Everyday Tokens and Sparkle Savings accounts will be ready on your first day. ✨</p>
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

