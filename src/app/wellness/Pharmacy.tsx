import Image from "next/image";
import Link from "next/link";
import counter from "@/assets/wellness-pharmacy.webp";
import { wellnessCycleDays } from "@/content/wellness";
import { pharmacyPlans } from "@/content/wellnessPharmacy";
import RefillPreview from "./RefillPreview";
import s from "./wellness.module.css";

export default function Pharmacy() {
  return (
    <section id="pharmacy" className={s.section} aria-labelledby="pharmacy-heading">
      <header className={s.hero}>
        <div>
          <p className="label">Wellness Pharmacy</p>
          <h2 id="pharmacy-heading">Your refills, right where you need them.</h2>
          <p>Get a little heads-up when it’s time to refill. Pick up at a familiar counter or let Dispatch bring an eligible order to your door.</p>
          <Link href="/terms#wellness-pharmacy">Pharmacy terms →</Link>
        </div>
        <Image src={counter} alt="A unicorn pharmacist holds a paper pickup bag at a mint-green counter" sizes="(max-width: 700px) 94vw, 600px" />
      </header>
      <h3>Choose a refill membership</h3>
      <p>Membership covers refill services. Order contents are billed separately in Everyday Tokens.</p>
      <div className={s.pharmacyPlans}>
        {pharmacyPlans.map(({ id, name, price, benefit }) => (
          <article className={s.plan} key={id} data-tone="mint">
            <h3>{name}</h3>
            <p className={s.price}><strong>{price} Tokens</strong> / {wellnessCycleDays} days</p>
            <p>{benefit}</p>
          </article>
        ))}
      </div>
      <RefillPreview />
      <Link href="/product-details#wellness-pharmacy">See membership and pickup details →</Link>
    </section>
  );
}
