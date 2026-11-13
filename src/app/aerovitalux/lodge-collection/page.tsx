import type { Metadata } from "next";
import Image from "next/image";
import lodge from "@/assets/everair-alpine-hq.webp";
import { TransitionLink } from "@/components/Veil";
import s from "./lodge.module.css";

export const metadata: Metadata = {
  title: "Everair Lodge Collection",
  description: "Explore seasonal air blends and signature premium oxygen from the Everair Alpine Lodge.",
};

const blends = [
  { name: "First Snow", season: "Winter", notes: "Snow-dusted pine and crisp morning air. Bottled just after the first snowfall." },
  { name: "Meadow Morning", season: "Spring", notes: "Alpine clover and cool morning dew. Collected before the lodge opens for breakfast." },
  { name: "Sun on the Ridge", season: "Summer", notes: "Wild thyme, warm stone, and the first breeze after a mountain rain." },
  { name: "Golden Hour", season: "Autumn", notes: "Golden larch and a trace of woodsmoke. Collected just before the sun slips behind the ridge." },
];

export default function LodgeCollectionPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div>
          <TransitionLink href="/aerovitalux">← Back to Everair</TransitionLink>
          <h1>The Lodge Collection</h1>
          <p>Some mornings are worth bottling. Explore seasonal blends and premium oxygen from the Everair Alpine Lodge.</p>
          <TransitionLink href="/redemption#lodge-collection-premium-blend">Find it in Token Redemption →</TransitionLink>
        </div>
        <Image src={lodge} alt="The Everair Alpine Lodge above the clouds" sizes="(max-width: 760px) 100vw, 55vw" />
      </header>
      <section aria-labelledby="seasonal-blends">
        <h2 id="seasonal-blends">Seasonal blends</h2>
        <ul className={s.blends}>
          {blends.map(({ name, season, notes }) => (
            <li key={name}>
              <p className="label">{season}</p>
              <h3>{name}</h3>
              <p>{notes}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={s.signature} aria-labelledby="premium-oxygen">
        <h2 id="premium-oxygen">Premium oxygen</h2>
        <h3>Summit Reserve</h3>
        <p>Our signature unscented oxygen, collected above the lodge at dawn. Clean and crisp, with a remarkably short list of tasting notes.</p>
      </section>
    </main>
  );
}
