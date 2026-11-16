import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import lounge from "@/assets/alpine-casino-lounge.webp";
import chips from "@/assets/alpine-casino-chips.webp";
import cabinet from "@/assets/alpine-casino-cabinet.webp";
import dice from "@/assets/alpine-casino-dice.webp";
import { heatedWalkway } from "@/content/alpineResort";
import s from "../resort.module.css";

export const metadata: Metadata = {
  title: "The Gilded House · Grand Alpine Casino",
  description: "Explore Chips’ gaming rooms, the cashier, and the route from the Grand Alpine Hotel.",
};

export default function AlpineCasinoPage() {
  return (
    <main className={s.page}>
      <header className={`${s.hero} ${s.loungeHero}`}>
        <Image src={lounge} alt="The casino lounge with burgundy velvet, aged brass, and a ceiling fresco commissioned by Chips" fill preload sizes="100vw" />
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>Grand Alpine Casino</p>
          <h1>The Gilded House.</h1>
          <p>Private games. Public losses.</p>
          <nav className={s.links} aria-label="Explore the casino">
            <a className={s.button} href="#gaming-rooms">See the gaming rooms ↓</a>
            <a href="#cashier">Cashier</a>
            <Link href="/alpine-resort">Back to the resort</Link>
          </nav>
        </div>
      </header>

      <section className={`${s.photoFeature} ${s.portraitFeature}`} aria-labelledby="chips-heading">
        <Image src={chips} alt="Chips in a burgundy suit with a small crown and a casino Token bearing his portrait" sizes="(max-width: 760px) 95vw, 430px" />
        <div>
          <p className={s.eyebrow}>Your proprietor</p>
          <h2 id="chips-heading">Chips.</h2>
          <p>He commissioned the fresco, the portrait, and the portrait on the chips. He’ll be at the tables.</p>
          <p className={s.quoteLine}>“Make yourself comfortable. Within reason.”</p>
        </div>
      </section>

      <section id="gaming-rooms" className={s.section} aria-labelledby="gaming-heading">
        <h2 id="gaming-heading">The gaming rooms</h2>
        <div className={s.gameGallery}>
          <article>
            <Image src={cabinet} alt="Four-in-a-Row cabinet with an ornate brass frame and blue counter holder" sizes="(max-width: 760px) 95vw, 640px" />
            <div><h3>Four-in-a-Row</h3><p>A velvet-lined cabinet in the lounge. Chips had his counters made first. Yours are in the blue holder on the side.</p></div>
          </article>
          <article>
            <Image src={dice} alt="Six ivory dice faces with burgundy pips, including one bearing Chips’ portrait" sizes="(max-width: 760px) 95vw, 640px" />
            <div><h3>Liar’s Dice</h3><p>Take a seat at the walnut table. House dice are ivory and brass. Ask the attendant for the blue set.</p></div>
          </article>
        </div>
      </section>

      <section id="cashier" className={s.splitDetails} aria-labelledby="cashier-heading">
        <div>
          <h2 id="cashier-heading">The cashier</h2>
          <p>Exchange available Tokens for Alpine Chips one for one. Unplayed chips can be exchanged back at the cashier.</p>
          <Link href="/tokens#sparkle">Find Sparkle Savings at the hotel →</Link>
        </div>
        <div>
          <h3>From the Grand Hotel</h3>
          <p>{heatedWalkway}</p>
          <Link href="/alpine-resort#walkway">See the walkway →</Link>
        </div>
      </section>
      <footer className={s.links}>
        <Link href="/terms#alpine-resort">Resort and casino terms</Link>
        <Link href="/alpine-resort#stay">Preview a stay</Link>
      </footer>
    </main>
  );
}
