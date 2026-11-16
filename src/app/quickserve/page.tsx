import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import hero from "@/assets/quickserve-store.webp";
import { quickserveCareersPath } from "@/content/businesses";
import Menu from "./Menu";
import styles from "./quickserve.module.css";

export const metadata: Metadata = {
  title: "Horn & Fries · Unicorn Warehouse",
  description: "Burgers, waffle fries, shakes, and an express lane for the dinner rush.",
};

export default function QuickservePage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className="label">Horn & Fries</p>
          <h1>Good food.<br /><em>Right now.</em></h1>
          <p>Griddled burgers, golden waffle fries, and strawberry shakes. From the first lunch order to the last car in the dinner rush.</p>
          <div className={styles.heroLinks}>
            <a className={styles.cta} href="#menu">Build your tray ↓</a>
            <a href="#value-menu">Value Menu</a>
            <a href="#nutrition">Nutrition facts</a>
          </div>
        </div>
        <Image src={hero} alt="A cheeseburger, waffle fries, and a strawberry shake on a tray in a bright Horn & Fries dining room" sizes="(max-width: 800px) 96vw, 700px" preload />
      </header>
      <Menu />
      <section className={styles.nutrition} id="nutrition" aria-labelledby="nutrition-heading">
        <div className={styles.nutritionCopy}>
          <p className="label">The House Double</p>
          <h2 id="nutrition-heading">A little more in every bite.</h2>
          <p>Two griddled patties, melty cheese, and the full satisfaction of eating lunch during the time you set aside to eat lunch.</p>
          <p className={styles.nutritionPunch}>We count what goes into your burger. Your employer counts how long it takes you to eat it.</p>
        </div>
        <figure className={styles.facts}>
          <figcaption>Nutrition Facts</figcaption>
          <p>1 serving per wrapper</p>
          <p className={styles.serving}><strong>Serving size</strong><strong>1 House Double</strong></p>
          <p className={styles.calories}><strong>Calories</strong><strong>760</strong></p>
          <dl>
            <div><dt>Total fat</dt><dd>44 g</dd></div>
            <div><dt>Sodium</dt><dd>1,560 mg</dd></div>
            <div><dt>Protein</dt><dd>36 g</dd></div>
            <div><dt>Napkins included</dt><dd>1</dd></div>
            <div className={styles.breakTime}><dt>Protected lunch time included</dt><dd>0 min</dd></div>
          </dl>
          <p className={styles.labelNote}>Lunch time sold separately. A second napkin is available upon request and may be packed with your next order.</p>
        </figure>
      </section>
      <section className={styles.pickup} aria-labelledby="pickup-heading">
        <div>
          <h2 id="pickup-heading">Three minutes looks good on you.</h2>
          <p>Head inside or swing through the drive-thru. We’ll call your number as soon as your tray is ready. We’ve made the first call complimentary.</p>
        </div>
        <dl>
          <div><dt>Dining room</dt><dd>Take a seat and listen for your number. If you miss it, your meal keeps its original ready time.</dd></div>
          <div><dt>Drive-thru</dt><dd>Open for lunch and dinner rush. If we ask you to pull forward, you’ve finished the window portion of your visit.</dd></div>
          <div><dt>Express promise</dt><dd>Three minutes from kitchen acceptance. Time spent waiting for kitchen acceptance is recorded separately.</dd></div>
        </dl>
      </section>
      <footer className={styles.footer}>
        <Link href={quickserveCareersPath}>Work at Horn & Fries →</Link>
        <Link href="/product-details#quickserve">Horn & Fries Product Details →</Link>
      </footer>
    </main>
  );
}
