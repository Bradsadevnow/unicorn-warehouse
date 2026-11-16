import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import resortArt from "@/assets/alpine-resort-hero.webp";
import casinoFloor from "@/assets/alpine-casino-floor.webp";
import lodgeArt from "@/assets/everair-alpine-hq.webp";
import { alpineLiftPass, alpineMembershipCycle, alpineMemberships, alpineResortName, alpineRooms, heatedWalkway, skiAndStay, skiLiftPolicy } from "@/content/alpineResort";
import StayPreview from "./StayPreview";
import s from "./resort.module.css";

export const metadata: Metadata = {
  title: alpineResortName,
  description: "Stay above Unicornopolis with skiing, spa time, Lodge dining, and a warm walk between them.",
};

export default function AlpineResortPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <Image src={resortArt} alt="A grand alpine hotel with a lit glass walkway and ski lifts above snowy pines" fill preload sizes="(max-width: 1400px) 100vw, 1320px" />
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>{alpineResortName}</p>
          <h1>Come up for air.</h1>
          <p>Snow outside, warm light inside, and the town a long way below.</p>
          <nav className={s.links} aria-label="Explore the resort">
            <a className={s.button} href="#stay">Explore stays ↓</a>
            <a href="#memberships">Memberships</a>
            <a href="#ski">Ski the mountain</a>
            <Link href="/alpine-resort/casino">Enter the casino</Link>
          </nav>
        </div>
      </header>

      <section id="walkway" className={s.walkway} aria-labelledby="walkway-heading">
        <h2 id="walkway-heading">Take the warm way.</h2>
        <p>{heatedWalkway}</p>
        <ol aria-label="Heated walkway stops"><li>Grand Hotel</li><li>Casino</li><li>Spa</li></ol>
      </section>

      <section id="stay" className={s.section} aria-labelledby="stay-heading">
        <h2 id="stay-heading">Wake up on the mountain.</h2>
        <div className={s.cards}>
          {alpineRooms.map(({ id, name, tokens, detail }) => (
            <article key={id}><h3>{name}</h3><p>{detail}</p><strong>{tokens.toLocaleString("en-US")} Tokens / night</strong></article>
          ))}
        </div>
        <article className={s.package}>
          <div><h3>{skiAndStay.name}</h3><p>{skiAndStay.nights} nights in a {skiAndStay.room.name} and {skiAndStay.passes} single-day lift passes. Plenty of room to make a weekend of it.</p></div>
          <strong>{skiAndStay.tokens.toLocaleString("en-US")} Tokens / package</strong>
        </article>
        <StayPreview />
      </section>

      <section id="memberships" className={s.section} aria-labelledby="memberships-heading">
        <p className={s.eyebrow}>Grand Alpine memberships</p>
        <h2 id="memberships-heading">Make it a regular thing.</h2>
        <p>A spa day, a first chair, or a night above town. Pick a reason to come back.</p>
        <div className={s.cards}>
          {alpineMemberships.map(({ id, name, price, benefit }) => (
            <article key={id}>
              <h3>{name}</h3>
              <strong>{price} Tokens / {alpineMembershipCycle} days</strong>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
        <Link href="/redemption#alpine-resort-subscriptions">Find Grand Alpine in Token Redemption →</Link>
      </section>

      <section id="ski" className={s.section} aria-labelledby="ski-heading">
        <h2 id="ski-heading">From the first chair down.</h2>
        <p>{skiLiftPolicy} {alpineLiftPass.label} · {alpineLiftPass.tokens} Tokens per person per day.</p>
        <figure className={s.trailMap}>
          <figcaption>Trail map · Summit to base</figcaption>
          <ol>
            <li><strong>Summit chair</strong><span data-trail="black">◆ Summit Drop</span></li>
            <li><strong>Lower junction</strong><span data-trail="blue">■ Pine Traverse</span></li>
            <li><strong>Lower chair</strong><span data-trail="green">● Clover Glide</span></li>
            <li><strong>Lift base</strong><span>Grand Hotel overlook</span></li>
          </ol>
        </figure>
        <div className={s.cards}>
          <article><p className="label">● Green</p><h3>Clover Glide</h3><p>A gentle run from the lower chair with a wide finish at the base.</p></article>
          <article><p className="label">■ Blue</p><h3>Pine Traverse</h3><p>A groomed ridge run that curves back toward the hotel overlook.</p></article>
          <article><p className="label">◆ Black</p><h3>Summit Drop</h3><p>A steep upper run from the summit chair to the lower junction.</p></article>
        </div>
        <Link href="/map?lot=alpine-resort">Find the mountain road →</Link>
      </section>

      <section id="casino" className={s.photoFeature} aria-labelledby="casino-heading">
        <Image src={casinoFloor} alt="The Gilded House gaming floor with marble arches, a fresco, and burgundy carpet" sizes="(max-width: 760px) 95vw, 700px" />
        <div>
          <p className={s.eyebrow}>The Gilded House</p>
          <h2 id="casino-heading">Warm up inside.</h2>
          <p>Walnut tables, burgundy velvet, and a chandelier Chips thought could be a little bigger. Come straight over from the hotel through the heated walkway.</p>
          <Link className={s.button} href="/alpine-resort/casino">Explore the casino floor →</Link>
        </div>
      </section>

      <section className={s.section} aria-labelledby="food-spa-heading">
        <h2 id="food-spa-heading">Dinner, then slippers.</h2>
        <div className={s.photoFeature}>
          <Image src={lodgeArt} alt="Everair Alpine Lodge in the snowy mountains" sizes="(max-width: 760px) 95vw, 700px" />
          <div>
            <h3>The Alpine Room</h3><p>Take the road down to the Lodge for a seasonal Everair flight and a table above the valley.</p><Link href="/aerovitalux/lodge-collection">Explore the Lodge Collection →</Link>
            <h3>The Spa</h3><p>Warm pools, a quiet room, and step-free access from the hotel.</p><a href="#walkway">See the heated walkway ↑</a>
          </div>
        </div>
      </section>

      <footer className={s.links}>
        <Link href="/terms#alpine-resort">Booking terms</Link>
        <Link href="/product-details#alpine-resort">Resort details</Link>
      </footer>
    </main>
  );
}
