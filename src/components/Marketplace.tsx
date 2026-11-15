"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./marketplace.module.css";

type Catalog = readonly {
  category: string;
  jobs: readonly (readonly [task: string, price: number, detail?: string])[];
}[];

const badges: Record<string, string> = {
  "Unload a delivery": "Most popular",
  "Clean a break room": "Frequently reordered",
  "Restock the front shelves": "Quick fulfillment",
  "Set up tables": "Best value",
};

const recommendations = [
  {
    title: "Frequently bought together",
    tasks: ["Unload a delivery", "Restock the front shelves", "Sweep a storefront"],
  },
  {
    title: "Customers who purchased this labor also purchased",
    tasks: ["Count one aisle of stock", "Bag orders during the lunch rush", "Cover dinner rush pickup"],
  },
];

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function Marketplace({
  catalog,
  workerPath,
  brand,
}: {
  catalog: Catalog;
  workerPath: string;
  brand: "HelpingHand" | "Brightside" | "Goodshift";
}) {
  const isBrightside = brand === "Brightside";
  const isGoodshift = brand === "Goodshift";
  const shelves = isBrightside ? [
    { title: "Frequently bought together", tasks: catalog.flatMap(({ jobs }) => jobs.slice(0, 1).map(([task]) => task)) },
    { title: "Customers who bought attention also bought", tasks: catalog.flatMap(({ jobs }) => jobs.slice(1).map(([task]) => task)) },
  ] : isGoodshift ? [
    { title: "Frequently bought together", tasks: ["Triage the support inbox", "Reconcile the weekly report", "Update the team records"] },
    { title: "Customers also bought", tasks: ["Format a slide deck", "Write up meeting notes", "Prepare the shift handoff"] },
  ] : recommendations;
  const reviews = isBrightside ? [
    [5, "The ad looked so much like a real recommendation that even our legal team watched to the end."],
    [3, "Great watch time. Several viewers remembered the creator instead of the product."],
  ] as const : isGoodshift ? [
    [5, "The weekly report arrived on time while we were still interviewing for the role."],
    [3, "The handoff was thorough. We had to add the follow-up meeting to a separate order."],
  ] as const : [
    [5, "Worker was excellent. Replacement arrived quickly after the first one became unavailable."],
    [3, "Productivity was good, but the human kept asking about breaks."],
  ] as const;
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [recurring, setRecurring] = useState(false);
  const prices = new Map(catalog.flatMap(({ jobs }) => jobs.map(([task, price]) => [task, price] as const)));
  const cart = [...prices].filter(([task]) => quantities[task] > 0);
  const itemCount = cart.reduce((count, [task]) => count + quantities[task], 0);
  const subtotal = cart.reduce((total, [task, price]) => total + quantities[task] * price, 0);

  function addToCart(tasks: readonly string[]) {
    setQuantities((current) => {
      const next = { ...current };
      for (const task of tasks) next[task] = (next[task] ?? 0) + 1;
      return next;
    });
  }

  function removeOne(task: string) {
    setQuantities((current) => ({ ...current, [task]: Math.max(0, (current[task] ?? 0) - 1) }));
  }

  return (
    <div className={s.marketplace}>
      <header className={s.header}>
        <div>
          <Link href={workerPath}>← {isBrightside ? "Sell content" : "Find work"}</Link>
          <h1>{brand} Marketplace</h1>
          <p>{isBrightside ? "Make every second billable.™" : isGoodshift ? "Fill your backlog without filling a seat." : "People change. Productivity doesn’t.™"}</p>
        </div>
        <a href="#cart" className={s.cartLink} aria-live="polite">
          {itemCount} {itemCount === 1 ? "item" : "items"} in cart
        </a>
      </header>

      <div className={s.layout}>
        <div>
          <nav className={s.categories} aria-label="Shop by category">
            {catalog.map(({ category }, index) => <a key={category} href={`#category-${index}`}>{category}</a>)}
          </nav>
          {catalog.map(({ category, jobs }, index) => (
            <section className={s.category} key={category} id={`category-${index}`}>
              <h2>{category}</h2>
              <ul className={s.products}>
                {jobs.map(([task, price, detail]) => (
                  <li className={s.product} key={task}>
                    {badges[task] && <span className={s.badge}>{badges[task]}</span>}
                    <h3>{task}</h3>
                    {detail && <p className={s.note}>{detail}</p>}
                    <p className={s.price}>{dollars.format(price)} <span>{isBrightside ? "per package" : "per job"}</span></p>
                    <button type="button" onClick={() => addToCart([task])} aria-label={`Add ${task} to cart`}>Add to cart</button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className={s.cart} id="cart" aria-labelledby="cart-heading">
          <h2 id="cart-heading">Your cart</h2>
          {cart.length === 0 && <p>Your cart is empty.</p>}
          <ul>
            {cart.map(([task, price]) => (
              <li key={task}>
                <div><strong>{task}</strong><span>{quantities[task]} × {dollars.format(price)}</span></div>
                <button type="button" onClick={() => removeOne(task)} aria-label={`Remove one ${task}`}>Remove one</button>
              </li>
            ))}
          </ul>
          <label className={s.subscription}>
            <input type="checkbox" checked={recurring} onChange={(event) => setRecurring(event.target.checked)} />
            <span><strong>Subscribe &amp; Save</strong><br />Schedule recurring {isBrightside ? "campaigns" : isGoodshift ? "office assignments" : "labor orders"} and save 10%.</span>
          </label>
          <p className={s.total} aria-live="polite">
            <span>{recurring ? "Total per order" : "Subtotal"}</span>
            <strong>{dollars.format(recurring ? (subtotal * 9) / 10 : subtotal)}</strong>
          </p>
          <p className={s.note}>{isBrightside ? "Your order may be fulfilled by multiple creators. Genuine enthusiasm is not guaranteed." : isGoodshift ? "Meeting notes include action items. Completing the action items requires a separate order." : "Your order may be fulfilled by multiple workers. Individual workers are not guaranteed."}</p>
          <p className={s.note}>Illustrative catalog. Cart totals are for preview only.</p>
        </aside>
      </div>

      <div className={s.extras}>
        {shelves.map(({ title, tasks }, index) => (
          <section className={s.panel} key={title}>
            <h2>{title}</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task}>
                  <span>{task} · {dollars.format(prices.get(task)!)}</span>
                  {index === 1 && <button type="button" onClick={() => addToCart([task])} aria-label={`Add ${task} from recommendations`}>Add to cart</button>}
                </li>
              ))}
            </ul>
            {index === 0 && <button type="button" onClick={() => addToCart(tasks)}>Add all {tasks.length} to cart</button>}
          </section>
        ))}
      </div>
      <section className={s.reviews}>
        <h2>Customer reviews</h2>
        <div className={s.extras}>
          {reviews.map(([rating, quote]) => (
            <blockquote className={s.panel} key={quote}>
              <p className={s.stars} role="img" aria-label={`${rating} out of 5 stars`}>{"★".repeat(rating)}{"☆".repeat(5 - rating)}</p>
              <p>“{quote}”</p>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
