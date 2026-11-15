"use client";

import { useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import foodArt from "@/assets/market-food.webp";
import bathroomArt from "@/assets/market-bathroom.webp";
import clothesArt from "@/assets/market-clothes.webp";
import cleaningArt from "@/assets/market-cleaning.webp";
import organicArt from "@/assets/market-organic.webp";
import { departments } from "./catalog";
import styles from "./market.module.css";

const inventory = departments.flatMap(({ products }) => products);
const departmentArt: Partial<Record<string, StaticImageData>> = {
  Food: foodArt,
  Bathroom: bathroomArt,
  Clothes: clothesArt,
  "Home & Cleaning": cleaningArt,
  "Vegan & Organic": organicArt,
};
const tokenPrice = (amount: number) => `${amount} ${amount === 1 ? "Token" : "Tokens"}`;

export default function MarketCatalog() {
  const [department, setDepartment] = useState("");
  const [query, setQuery] = useState("");
  const [basket, setBasket] = useState<Record<string, number>>({});
  const selected = inventory.filter(([name]) => basket[name] > 0);
  const count = selected.reduce((sum, [name]) => sum + basket[name], 0);
  const total = selected.reduce((sum, [name, , price]) => sum + basket[name] * price, 0);
  const search = query.trim().toLowerCase();
  const shelves = departments
    .filter(({ name }) => !department || name === department)
    .map((shelf) => ({
      ...shelf,
      products: shelf.products.filter(([name]) => `${name} ${shelf.name}`.toLowerCase().includes(search)),
    }))
    .filter(({ products }) => products.length > 0);

  function changeQuantity(name: string, change: number) {
    setBasket((current) => ({ ...current, [name]: Math.max(0, (current[name] ?? 0) + change) }));
  }

  return (
    <section id="departments" className={styles.shop} aria-labelledby="departments-title">
      <div className={styles.toolbar}>
        <h2 id="departments-title">Shop by department</h2>
        <a href="#market-cart" aria-live="polite">Cart ({count})</a>
      </div>
      <label className={styles.search}>
        Search the Market
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try banana, socks, or dish soap" />
      </label>
      <div className={styles.departments} aria-label="Filter by department" role="group">
        <button type="button" aria-pressed={!department} onClick={() => setDepartment("")}>All departments</button>
        {departments.map(({ name, icon, color }) => (
          <button type="button" key={name} aria-pressed={department === name} onClick={() => setDepartment(name)} style={{ backgroundColor: color }}>
            <span aria-hidden="true">{icon}</span> {name}
          </button>
        ))}
      </div>
      <div className={styles.layout}>
        <div className={styles.shelves}>
          {shelves.length === 0 && <p role="status">No matching products. Try another search or department.</p>}
          {shelves.map(({ name, products, color }) => {
            const art = departmentArt[name];
            return (
            <section key={name} className={styles.shelf}>
              <h3 style={{ backgroundColor: color }}>{name}</h3>
              {art && <Image className={styles.departmentArt} src={art} alt="" sizes="(max-width: 760px) 94vw, 65vw" />}
              <ul className={styles.products}>
                {products.map(([product, size, price]) => (
                  <li key={product}>
                    <small>Warehouse Basics</small>
                    <h4>{product}</h4>
                    <p>{size}</p>
                    <strong>{tokenPrice(price)}</strong>
                    <button type="button" aria-label={`Add ${product} to cart`} onClick={() => changeQuantity(product, 1)}>Add to cart</button>
                  </li>
                ))}
              </ul>
            </section>
            );
          })}
        </div>
        <aside className={styles.cart} id="market-cart" aria-labelledby="market-cart-title">
          <h3 id="market-cart-title">Your cart</h3>
          {selected.length === 0 ? <p>Your cart is empty.</p> : (
            <ul>
              {selected.map(([name, , price]) => (
                <li key={name}>
                  <div><strong>{name}</strong><br />{basket[name]} × {tokenPrice(price)}</div>
                  <button type="button" aria-label={`Remove one ${name}`} onClick={() => changeQuantity(name, -1)}>−</button>
                </li>
              ))}
            </ul>
          )}
          <p className={styles.total} aria-live="polite">Subtotal <strong>{tokenPrice(total)}</strong></p>
          <small>Preview cart</small>
          <Link href="/tokens">See how to earn Tokens →</Link>
        </aside>
      </div>
    </section>
  );
}
