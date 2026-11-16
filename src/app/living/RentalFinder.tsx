"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { leaseTerms, quoteRental, rentalPlans, rentals, type LeaseTerm, type Rental } from "@/content/living";
import s from "./living.module.css";

const commuteOptions = [...new Set(rentals.map((rental) => rental.commute))].sort();
const amenityOptions = [...new Set(rentals.flatMap((rental) => rental.amenities))].sort();
const budgets = [1_200, 1_600, 2_200, 3_200, 5_600];
const number = new Intl.NumberFormat("en-US");
const tokens = (value: number) => `${number.format(value)} Tokens`;

export default function RentalFinder() {
  const [budget, setBudget] = useState(0);
  const [size, setSize] = useState("");
  const [commute, setCommute] = useState("");
  const [amenity, setAmenity] = useState("");
  const [pets, setPets] = useState(false);
  const [selectedId, setSelectedId] = useState(rentals[0].id);
  const [term, setTerm] = useState<LeaseTerm>(12);
  const previewHeading = useRef<HTMLHeadingElement>(null);
  const matching = rentals.filter((rental) =>
    (!budget || rental.rent <= budget) && (!size || size === rental.plan)
    && (!commute || commute === rental.commute) && (!amenity || rental.amenities.includes(amenity))
    && (!pets || rental.pets),
  );
  const selected = matching.find(({ id }) => id === selectedId) ?? matching[0];

  function resetFilters() {
    setBudget(0);
    setSize("");
    setCommute("");
    setAmenity("");
    setPets(false);
    setSelectedId(rentals[0].id);
    setTerm(12);
  }

  return (
    <>
      <section id="rentals" className={s.finder} aria-labelledby="search-heading">
        <h2 id="search-heading">Find your next place</h2>
        <div className={s.filters}>
          <label>Monthly budget
            <select value={budget} onChange={(event) => setBudget(Number(event.target.value))}>
              <option value={0}>Any price</option>
              {budgets.map((amount) => <option key={amount} value={amount}>{tokens(amount)} or less</option>)}
            </select>
          </label>
          <label>Home size
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="">Any size</option>
              {Object.entries(rentalPlans).map(([id, plan]) => <option key={id} value={id}>{plan.label}</option>)}
            </select>
          </label>
          <label>Walk to
            <select value={commute} onChange={(event) => setCommute(event.target.value)}>
              <option value="">Any destination</option>
              {commuteOptions.map((place) => <option key={place}>{place}</option>)}
            </select>
          </label>
          <label>Amenities
            <select value={amenity} onChange={(event) => setAmenity(event.target.value)}>
              <option value="">Any amenity</option>
              {amenityOptions.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className={s.checkbox}><input type="checkbox" checked={pets} onChange={(event) => setPets(event.target.checked)} /> Pets welcome</label>
        </div>
        <div className={s.results}>
          <p role="status">{matching.length} {matching.length === 1 ? "home" : "homes"} found · 12-month rates</p>
          <button type="button" className={s.textButton} onClick={resetFilters}>Clear filters</button>
        </div>
        {matching.length === 0 && <p className={s.empty}>No listings match these filters. Try a different amenity or a wider budget.</p>}
        <div className={s.cards}>
          {matching.map((rental) => (
            <article className={s.card} id={`rental-${rental.id}`} key={rental.id}>
              <Image src={`/living/${rental.id}.webp`} alt="" width={640} height={420} sizes="(max-width: 575px) 94vw, (max-width: 940px) 45vw, 390px" />
              <div className={s.cardBody}>
                <p className={s.neighborhood}>{rental.neighborhood}</p>
                <h3>{rental.name}</h3>
                <p><strong>{tokens(rental.rent)}</strong> / month</p>
                <p>{rentalPlans[rental.plan].label} · {number.format(rental.area)} sq ft · {rental.minutes} min walk to {rental.commute}</p>
                <p>{rental.description}</p>
                <ul className={s.tags}>
                  {rental.amenities.map((tag) => <li key={tag}>{tag}</li>)}
                  {rental.pets && <li>Pets welcome</li>}
                </ul>
                <button type="button" className={s.textButton} onClick={() => {
                  setSelectedId(rental.id);
                  setTerm(12);
                  previewHeading.current?.focus();
                  previewHeading.current?.scrollIntoView({ block: "start" });
                }}>See floor plan &amp; rent <span aria-hidden="true">→</span><span className={s.srOnly}> for {rental.name}</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {selected && (
        <section className={s.preview} aria-labelledby="lease-heading">
          <h2 id="lease-heading" ref={previewHeading} tabIndex={-1}>Floor plan &amp; lease preview</h2>
          <div className={s.previewGrid}>
            <div className={s.planPanel}>
              <h3>{selected.name}</h3>
              <p>{rentalPlans[selected.plan].label} · {number.format(selected.area)} sq ft{rentalPlans[selected.plan].shared ? " private" : ""}</p>
              <ul className={s.plan} aria-label="Illustrative floor plan">
                {rentalPlans[selected.plan].rooms.map((room) => <li key={room}>{room}</li>)}
              </ul>
              <p className={s.note}>Illustrative layout · Not to scale</p>
            </div>
            <LeaseQuote rental={selected} term={term} setTerm={setTerm} />
          </div>
        </section>
      )}
    </>
  );
}

function LeaseQuote({ rental, term, setTerm }: { rental: Rental; term: LeaseTerm; setTerm: (term: LeaseTerm) => void }) {
  const quote = quoteRental(rental, term);
  return (
    <div className={s.quote}>
      <h3>Move-in estimate</h3>
      <label>Lease length
        <select value={term} onChange={(event) => setTerm(event.target.value === "6" ? 6 : 12)}>
          {leaseTerms.map((months) => <option key={months} value={months}>{months} months</option>)}
        </select>
      </label>
      <dl aria-live="polite">
        <div><dt>Monthly rent</dt><dd>{tokens(quote.monthlyRent)}</dd></div>
        <div><dt>Security deposit</dt><dd>{tokens(quote.securityDeposit)}</dd></div>
        <div><dt>First month + deposit</dt><dd>{tokens(quote.dueAtMoveIn)}</dd></div>
      </dl>
      <p className={s.note}>Standard maintenance is included. Utilities and optional services are billed separately.</p>
      <Link href="/product-details#living">See housing and lease details →</Link>
    </div>
  );
}
