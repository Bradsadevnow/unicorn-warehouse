import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import center from "@/assets/fulfillment-store.webp";
import { fulfillmentCareersPath } from "@/content/businesses";
import { fulfillmentRates } from "@/content/fulfillment";
import ParcelTools from "./ParcelTools";
import s from "./fulfillment.module.css";

export const metadata: Metadata = {
  title: "Fulfillment · Unicorn Warehouse",
  description: "Track a parcel, preview a return, and explore shipping services.",
};

export default function FulfillmentPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <p className="label">Unicorn Warehouse Fulfillment</p>
          <h1>It’s on <em>its way.</em></h1>
          <p>From our shelf to your door. Track what’s coming, send something back, or let us do the packing.</p>
          <div className={s.links}>
            <a className={s.button} href="#tracking">Track a parcel ↓</a>
            <a href="#returns">Start a return</a>
            <a href="#merchants">Ship with us</a>
          </div>
        </div>
        <Image src={center} alt="" sizes="(max-width: 780px) 95vw, 650px" preload />
      </header>
      <ParcelTools />
      <section className={s.merchants} id="merchants" aria-labelledby="merchant-heading">
        <div>
          <p className="label">Merchant services</p>
          <h2 id="merchant-heading">You sell it. We’ll send it.</h2>
          <p>Store your inventory with us. We’ll pick, pack, and stage your orders for Dispatch. Give your customers a place to pick up or drop off at the same time.</p>
        </div>
        <dl>
          <div><dt>Storage</dt><dd>{fulfillmentRates.storage} Tokens per bin / 30 days</dd></div>
          <div><dt>Pick &amp; pack</dt><dd>{fulfillmentRates.pickAndPack} Tokens per parcel</dd></div>
          <div><dt>Return inspection</dt><dd>{fulfillmentRates.inspection} Tokens per item</dd></div>
        </dl>
      </section>
      <footer className={s.links}>
        <Link href={fulfillmentCareersPath}>Work at Fulfillment →</Link>
        <Link href="/terms#fulfillment">Fulfillment Terms &amp; Conditions →</Link>
        <Link href="/product-details#fulfillment">Fulfillment Product Details →</Link>
      </footer>
    </main>
  );
}
