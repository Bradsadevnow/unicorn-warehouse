import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import courier from "@/assets/dispatch-store.webp";
import { dispatchCareersPath } from "@/content/businesses";
import { dispatchPlus } from "@/content/dispatch";
import { sampleParcel } from "@/content/fulfillment";
import DeliveryPreview from "./DeliveryPreview";
import s from "./dispatch.module.css";

export const metadata: Metadata = {
  title: "Dispatch · Unicorn Warehouse",
  description: "Get a same-day delivery quote for a parcel, groceries, or dinner.",
};

export default function DispatchPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Unicorn Warehouse Dispatch</p>
          <h1>Right to <em>your door.</em></h1>
          <p>Send a parcel, bring the groceries home, or get dinner across town while it’s still dinner.</p>
          <a className={s.button} href="#quote">Get a quote ↓</a>
        </div>
        <Image src={courier} alt="A unicorn courier on a mint scooter with a lavender delivery box" sizes="(max-width: 740px) 96vw, 50vw" preload />
      </header>
      <DeliveryPreview />
      <section className={s.plus} id="market-delivery" aria-labelledby="market-delivery-heading">
        <div>
          <p className="label">Sample delivery · {sampleParcel.id}</p>
          <h2 id="market-delivery-heading">{sampleParcel.item}</h2>
          <p>{sampleParcel.pickup.detail}</p>
        </div>
        <div>
          <p><strong>{sampleParcel.pickup.time} · {sampleParcel.pickup.title}</strong></p>
          <p>{sampleParcel.handoff}</p>
          <Link href="/market#orders">View the complete Market order →</Link>
        </div>
      </section>
      <section className={s.plus} id="dispatch-plus" aria-labelledby="plus-heading">
        <div>
          <h2 id="plus-heading">{dispatchPlus.name}</h2>
          <p>{dispatchPlus.description}</p>
        </div>
        <div>
          <p><strong>{dispatchPlus.tokens} Tokens / {dispatchPlus.interval}</strong></p>
          <p>{dispatchPlus.boosts} Priority Matching boosts per cycle.</p>
          <p>{dispatchPlus.fine}</p>
          <Link href="/redemption#dispatch-subscriptions">See Dispatch Plus in Token Redemption →</Link>
        </div>
      </section>
      <footer className={s.links}>
        <Link href={dispatchCareersPath}>Work with Dispatch →</Link>
        <Link href="/product-details#dispatch">Dispatch Product Details →</Link>
        <Link href="/terms#dispatch">Dispatch Terms &amp; Conditions →</Link>
      </footer>
    </main>
  );
}
