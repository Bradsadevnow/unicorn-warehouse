"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import suite from "@/assets/funplex-parties.webp";
import alpine from "@/assets/everair-alpine-hq.webp";
import confetti from "@/assets/gatherings-confetti.webp";
import orchard from "@/assets/gatherings-orchard.webp";
import gold from "@/assets/gatherings-gold.webp";
import yacht from "@/assets/gatherings-yacht.webp";
import { charterDepartureTokens, venues, type Venue } from "@/content/gatherings";
import s from "./gatherings.module.css";

const art = {
  "funplex-suite": suite,
  "confetti-hall": confetti,
  "glass-orchard": orchard,
  "alpine-room": alpine,
  "gold-room": gold,
  "private-yacht": yacht,
} satisfies Record<Venue["id"], typeof suite>;

const occasions = [...new Set(venues.map(({ occasion }) => occasion))];
const tokens = (amount: number) => `${amount.toLocaleString("en-US")} Tokens`;

export default function VenueCatalog() {
  const [occasion, setOccasion] = useState("");
  const [guests, setGuests] = useState("12");
  const [budget, setBudget] = useState("");
  const [booking, setBooking] = useState<{ venue: Venue; guests: number; departure: boolean }>();
  const guestCount = Number(guests);
  const validGuestCount = Number.isInteger(guestCount) && guestCount > 0;
  const results = validGuestCount ? venues.filter((venue) =>
    (!occasion || venue.occasion === occasion) && venue.capacity >= guestCount && (!budget || venue.tokens <= Number(budget))) : [];

  return (
    <section className={s.catalog} id="venues" aria-labelledby="venue-heading">
      <h2 id="venue-heading">Find your venue</h2>
      <div className={s.filters}>
        <label>Occasion
          <select value={occasion} onChange={(event) => setOccasion(event.target.value)}>
            <option value="">All occasions</option>
            {occasions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>Guests
          <input type="number" min="1" step="1" value={guests} onChange={(event) => setGuests(event.target.value)} />
        </label>
        <label>Starting price
          <select value={budget} onChange={(event) => setBudget(event.target.value)}>
            <option value="">Any budget</option>
            <option value="500">Up to 500 Tokens</option>
            <option value="3000">Up to 3,000 Tokens</option>
            <option value="10000">Up to 10,000 Tokens</option>
          </select>
        </label>
      </div>
      <p aria-live="polite">{validGuestCount ? `${results.length} ${results.length === 1 ? "venue" : "venues"}` : "Enter a guest count of at least one."}</p>
      {validGuestCount && !results.length && <p>Try a different occasion, guest count, or budget.</p>}
      <div className={s.venues}>
        {results.map((venue) => (
          <article className={s.venue} id={venue.id} key={venue.id}>
            <Image src={art[venue.id]} alt="" sizes="(max-width: 690px) 94vw, 48vw" />
            <div className={s.venueCopy}>
              <p className="label">{venue.location}</p>
              <h3>{venue.name}</h3>
              <p>{venue.description}</p>
              <p className={s.detail}>{venue.detail}</p>
              <p><strong>From {tokens(venue.tokens)}</strong> · Up to {venue.capacity} guests</p>
              <div className={s.links}>
                <a href="#booking" className={s.button} onClick={() => setBooking({ venue, guests: guestCount, departure: false })}>Preview booking →</a>
                {venue.id === "funplex-suite" && <Link href="/funplex#parties">See the Funplex package</Link>}
                {venue.id === "alpine-room" && <Link href="/aerovitalux/lodge-collection">Explore the air pairings</Link>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside id="booking" className={s.booking} aria-labelledby="booking-heading">
        <h2 id="booking-heading">Booking preview</h2>
        {booking ? <>
          <h3>{booking.venue.name}</h3>
          <dl>
            <div><dt>Guests</dt><dd>{booking.guests}</dd></div>
            <div><dt>Venue starting price</dt><dd>{tokens(booking.venue.tokens)}</dd></div>
          </dl>
          {booking.venue.id === "private-yacht" && <label>
            <input type="checkbox" checked={booking.departure} onChange={(event) => setBooking({ ...booking, departure: event.target.checked })} />
            {" "}Depart the marina · +{tokens(charterDepartureTokens)}
          </label>}
          <p aria-live="polite"><strong>Starting estimate: {tokens(booking.venue.tokens + (booking.departure ? charterDepartureTokens : 0))}</strong></p>
          <p>{booking.departure ? "Marina departure selected." : booking.venue.detail}</p>
        </> : <p>Choose a venue to see the starting estimate for your guest count.</p>}
      </aside>
    </section>
  );
}
