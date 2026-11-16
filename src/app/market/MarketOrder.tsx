import Link from "next/link";
import { sampleParcel } from "@/content/fulfillment";
import { departments } from "./catalog";
import s from "./market.module.css";

const items = ["Sandwich bread", "Large eggs", "Tomato soup"].map((name) => {
  const item = departments.flatMap(({ products }) => products).find(([product]) => product === name);
  if (!item) throw new Error(`Missing sample Market item ${name}`);
  return item;
});

export default function MarketOrder() {
  return (
    <section id="orders" className={s.orderHub} aria-labelledby="orders-heading">
      <header>
        <p className="label">Sample order · {sampleParcel.id}</p>
        <h2 id="orders-heading">Follow your order</h2>
        <p>One order reference, from the Market cart to your front door.</p>
      </header>
      <div className={s.orderStages}>
        <article>
          <h3>Market</h3>
          <p>Order received</p>
          <ul>{items.map(([name, , tokens]) => <li key={name}>{name} · {tokens} Tokens</li>)}</ul>
          <p><strong>{items.reduce((sum, [, , tokens]) => sum + tokens, 0)} Tokens</strong> · Items subtotal</p>
        </article>
        <article>
          <h3>Fulfillment</h3>
          <p>Inventory, packing, and outbound scans</p>
          <ol>{sampleParcel.scans.map(({ time, title, detail }) => <li key={title}><strong>{time} · {title}</strong><br />{detail}</li>)}</ol>
          <Link href="/fulfillment#tracking">Track this parcel at Fulfillment →</Link>
        </article>
        <article>
          <h3>Dispatch</h3>
          <p>Courier matching, transit, and handoff</p>
          <p><strong>{sampleParcel.pickup.time} · {sampleParcel.pickup.title}</strong></p>
          <p>{sampleParcel.pickup.detail} {sampleParcel.handoff}.</p>
          <Link href="/dispatch#market-delivery">See the Dispatch handoff →</Link>
        </article>
      </div>
      <p>Starting a return? <Link href="/fulfillment#returns">Preview a drop-off and inspection at Fulfillment →</Link></p>
    </section>
  );
}
