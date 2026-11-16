"use client";

import Image from "next/image";
import { useState } from "react";
import houseDouble from "@/assets/quickserve-double.webp";
import goldenCrunch from "@/assets/quickserve-combo.webp";
import strawberrySwirl from "@/assets/quickserve-shake.webp";
import { quickserveMenu } from "@/content/quickserve";
import styles from "./quickserve.module.css";

const categories = ["All", "Value Menu", "Combos", "Burgers", "Sides", "Drinks"] as const;
const findItem = (id: (typeof quickserveMenu)[number]["id"]) => quickserveMenu.find((item) => item.id === id)!;
const signature = findItem("house-double");
const valueMelt = findItem("shift-melt");
const valueCombo = findItem("break-combo");
const featured = [
  { item: findItem("crunch-combo"), image: goldenCrunch },
  { item: findItem("strawberry-shake"), image: strawberrySwirl },
];
const price = (tokens: number) => `${tokens} ${tokens === 1 ? "Token" : "Tokens"}`;

export default function Menu() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const visible = quickserveMenu.filter((item) => category === "All" || item.category === category);
  const selected = quickserveMenu.filter(({ id }) => quantities[id] > 0);
  const total = selected.reduce((sum, { id, tokens }) => sum + tokens * quantities[id], 0);

  function adjust(id: string, change: number) {
    setQuantities((previous) => ({ ...previous, [id]: Math.max(0, (previous[id] ?? 0) + change) }));
  }

  function upgradeMelt() {
    setQuantities((previous) => {
      if (!previous[valueMelt.id]) return previous;
      return {
        ...previous,
        [valueMelt.id]: previous[valueMelt.id] - 1,
        [valueCombo.id]: (previous[valueCombo.id] ?? 0) + 1,
      };
    });
  }

  return (
    <div className={styles.ordering} id="menu">
      <section className={styles.signature} aria-labelledby="signature-heading">
        <Image src={houseDouble} alt="A double cheeseburger on coral checkered paper" sizes="(max-width: 800px) 96vw, 720px" />
        <div className={styles.signatureCopy}>
          <p className="label">The signature burger</p>
          <h2 id="signature-heading">{signature.name}</h2>
          <p>{signature.description}</p>
          <p className={styles.bigPrice}>{price(signature.tokens)}</p>
          <div className={styles.heroLinks}>
            <button type="button" className={styles.addSignature} onClick={() => adjust(signature.id, 1)}>Add the House Double +</button>
            <a href="#menu-board">See full menu ↓</a>
          </div>
        </div>
      </section>

      <section className={styles.specials} aria-labelledby="specials-heading">
        <h2 id="specials-heading">At the counter</h2>
        <div className={styles.specialsGrid}>
          {featured.map(({ item, image }) => (
            <article key={item.id} className={styles.special}>
              <Image src={image} alt="" sizes="(max-width: 650px) 96vw, 48vw" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className={styles.specialAction}>
                  <strong>{price(item.tokens)}</strong>
                  <button className={styles.add} type="button" aria-label={`Add ${item.name}`} onClick={() => adjust(item.id, 1)}>Add +</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.value} id="value-menu" aria-labelledby="value-heading">
        <div>
          <h2 id="value-heading">Value Menu</h2>
          <p>A little something for the drive back.</p>
        </div>
        <ul>
          {quickserveMenu.filter(({ category: group }) => group === "Value Menu").map(({ id, name, description, tokens }) => (
            <li key={id}>
              <strong>{price(tokens)}</strong>
              <h3>{name}</h3>
              <p>{description}</p>
              <button className={styles.add} type="button" aria-label={`Add ${name} from the Value Menu`} onClick={() => adjust(id, 1)}>Add +</button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.menu} id="menu-board" aria-labelledby="menu-heading">
        <div className={styles.menuBoard}>
          <header>
            <h2 id="menu-heading">The menu</h2>
            <div className={styles.filters} role="group" aria-label="Menu categories">
              {categories.map((name) => (
                <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>
              ))}
            </div>
          </header>
          <ul className={styles.items}>
            {visible.map(({ id, name, description, tokens }) => (
              <li key={id}>
                <div><h3>{name}</h3><p>{description}</p></div>
                <strong>{price(tokens)}</strong>
                <button className={styles.add} type="button" aria-label={`Add ${name}`} onClick={() => adjust(id, 1)}>Add +</button>
              </li>
            ))}
          </ul>
        </div>
        <aside className={styles.order} id="tray" aria-labelledby="tray-heading">
          <h3 id="tray-heading">Your tray</h3>
          {selected.length ? (
            <ul>
              {selected.map(({ id, name }) => (
                <li key={id}>
                  <span>{quantities[id]} × {name}</span>
                  <button className={styles.add} type="button" aria-label={`Remove one ${name}`} onClick={() => adjust(id, -1)}>−</button>
                </li>
              ))}
            </ul>
          ) : <p>Pick something from the menu to build your tray.</p>}
          {quantities[valueMelt.id] > 0 && (
            <button className={styles.add} type="button" onClick={upgradeMelt}>
              Make one melt a combo · +{price(valueCombo.tokens - valueMelt.tokens)}
            </button>
          )}
          <p className={styles.total} aria-live="polite">Menu total <strong>{price(total)}</strong></p>
        </aside>
      </section>
      <a className={styles.trayLink} href="#tray">Your tray <strong aria-live="polite">{price(total)}</strong></a>
    </div>
  );
}
