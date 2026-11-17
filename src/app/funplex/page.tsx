import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heroArt from "@/assets/funplex-hero.webp";
import lanesArt from "@/assets/funplex-lanes.webp";
import linksArt from "@/assets/funplex-links.webp";
import cinemaArt from "@/assets/funplex-cinema.webp";
import arcadeArt from "@/assets/funplex-arcade.webp";
import arenaArt from "@/assets/funplex-arena.webp";
import speedwayArt from "@/assets/funplex-speedway.webp";
import loungeArt from "@/assets/funplex-lounge.webp";
import cafeArt from "@/assets/funplex-cafe.webp";
import partiesArt from "@/assets/funplex-parties.webp";
import { funplexCareersPath } from "@/content/businesses";
import { adventurePlus, attractions, parties, prizes } from "@/content/funplex";
import s from "./funplex.module.css";

export const metadata: Metadata = {
  title: "Unicorn Warehouse Funplex",
  description: "Bowling, mini golf, movies, go-karts, an arcade, and laser tag under one roof.",
};

const attractionArt = {
  lanes: lanesArt,
  links: linksArt,
  cinema: cinemaArt,
  arcade: arcadeArt,
  arena: arenaArt,
  speedway: speedwayArt,
  lounge: loungeArt,
  cafe: cafeArt,
} satisfies Record<(typeof attractions)[number]["id"], typeof lanesArt>;

type Attraction = (typeof attractions)[number];

const headliners = attractions.filter(({ id }) => id === "arcade" || id === "cafe");
const otherAttractions = attractions.filter((attraction) => !headliners.includes(attraction));

function AttractionDetails({ attraction, heading: Heading }: { attraction: Attraction; heading: "h2" | "h3" }) {
  const { id, name, kind, price, line } = attraction;
  return (
    <div className={s.attractionBody}>
      <p className={s.eyebrow}>{kind}</p>
      <Heading>{name}</Heading>
      <p>{line}</p>
      <p className={s.price}>{price}</p>
      {id === "arcade" && <a href="#prizes">See what’s at the Prize Counter →</a>}
      <Link href={`/product-details#funplex-${id}`}>Pricing &amp; attraction details →</Link>
    </div>
  );
}

export default function FunplexPage() {
  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div className={s.heroCopy}>
          <h1>A night out.<br /><em>All in one place.</em></h1>
          <p>Start with pizza. Pick a lane. Head to the arcade for one more game. Bring the whole table to Unicorn Warehouse Funplex.</p>
          <div className={s.actions}>
            <a className={s.primary} href="#arcade">Explore Funplex ↓</a>
            <a href="#visit">Plan your visit</a>
          </div>
        </div>
        <div className={s.wordmark}>
          <Image src={heroArt} alt="Funplex in rainbow glitter above a cheering crowd of unicorns" sizes="(max-width: 820px) 95vw, 630px" preload />
        </div>
      </header>

      <section className={s.headliners} aria-label="Arcade and dining">
        {headliners.map((attraction) => (
          <article className={s.headliner} key={attraction.id} id={attraction.id}>
            <Image className={s.attractionArt} src={attractionArt[attraction.id]} alt="" sizes="(max-width: 820px) 95vw, 660px" />
            <AttractionDetails attraction={attraction} heading="h2" />
          </article>
        ))}
      </section>

      <section className={s.section} id="attractions" aria-labelledby="attractions-heading">
        <div className={s.sectionIntro}>
          <h2 id="attractions-heading">Make a night of it.</h2>
          <p>Take a lap, pick a song, or settle in for a movie. There’s always something to do between rounds.</p>
        </div>
        <ul className={s.attractions}>
          {otherAttractions.map((attraction) => (
            <li key={attraction.id} id={attraction.id} data-tone={attraction.tone}>
              <Image className={s.attractionArt} src={attractionArt[attraction.id]} alt="" sizes="(max-width: 620px) 95vw, (max-width: 900px) 46vw, 360px" />
              <AttractionDetails attraction={attraction} heading="h3" />
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} id="more" aria-labelledby="more-heading">
        <h2 id="more-heading">An occasion for every night.</h2>
        <div className={s.duo}>
          <article className={s.feature} data-tone="lilac" id="adventure-plus">
            <p className={s.eyebrow}>Membership upgrade</p>
            <h3>{adventurePlus.name} ✨</h3>
            <p>{adventurePlus.line}</p>
            <p className={s.price}>{adventurePlus.price}</p>
            <ul>{adventurePlus.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className={s.fine}>{adventurePlus.fine}</p>
            <Link href="/redemption#funplex-subscriptions">Find Adventure Plus in Token Redemption →</Link>
          </article>
          <article className={s.feature} data-tone="butter" id="parties">
            <Image className={s.partyArt} src={partiesArt} alt="" sizes="(max-width: 660px) 95vw, 520px" />
            <p className={s.eyebrow}>Celebrations</p>
            <h3>{parties.name} 🎂</h3>
            <p>{parties.line}</p>
            <p className={s.price}>{parties.price}</p>
            <p>
              {parties.partners.map(([name, does, href], index) => (
                <span key={name}>{index > 0 && ", "}<Link href={href}>{name}</Link> {does}</span>
              ))}.
            </p>
            <ul>{parties.details.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className={s.fine}>{parties.fine}</p>
          </article>
        </div>
      </section>

      <section className={s.section} id="prizes" aria-labelledby="prizes-heading">
        <h2 id="prizes-heading">The Prize Counter</h2>
        <p>A few rounds can go a long way. Play with Tokens, earn FunPoints, and pick something to take home.</p>
        <ul className={s.prizes}>
          {prizes.map(([prize, tickets]) => (
            <li key={prize}><b>{prize}</b><span>{tickets.toLocaleString("en-US")} FunPoints</span></li>
          ))}
        </ul>
        <p className={s.fine}>FunPoints cannot be converted back to Tokens. Standard FunPoints expire 15 minutes before closing.</p>
      </section>

      <section className={s.section} id="visit" aria-labelledby="visit-heading">
        <h2 id="visit-heading">Plan your visit</h2>
        <p>Open daily from 6 a.m. to midnight.</p>
        <div className={s.actions}>
          <Link href="/terms#funplex-visit">Visit terms →</Link>
          <Link href="/terms#funplex-consent">Waivers and consent →</Link>
          <Link href="/product-details#funplex">Funplex product details →</Link>
        </div>
      </section>

      <footer><Link href={funplexCareersPath}>Work at Funplex →</Link></footer>
    </main>
  );
}

