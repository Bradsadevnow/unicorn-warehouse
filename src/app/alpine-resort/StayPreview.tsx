"use client";

import { useState } from "react";
import { alpineRooms, estimateAlpineStay, skiAndStay } from "@/content/alpineResort";
import s from "./resort.module.css";

const format = new Intl.NumberFormat("en-US");

export default function StayPreview() {
  const [roomId, setRoom] = useState<string>(alpineRooms[0].id);
  const [nights, setNights] = useState(2);
  const [passes, setPasses] = useState(0);
  const [packageSelected, selectPackage] = useState(false);
  const room = alpineRooms.find(({ id }) => id === roomId) ?? alpineRooms[0];
  const quote = estimateAlpineStay(room.tokens, nights, passes);

  return (
    <section className={s.estimate} aria-labelledby="estimate-heading">
      <div>
        <h3 id="estimate-heading">Preview your stay</h3>
        <label>Stay type
          <select value={packageSelected ? "package" : "room"} onChange={(event) => selectPackage(event.target.value === "package")}>
            <option value="room">Build a stay</option><option value="package">{skiAndStay.name}</option>
          </select>
        </label>
        {!packageSelected && <div className={s.controls}>
          <label>Room
            <select value={roomId} onChange={(event) => setRoom(event.target.value)}>
              {alpineRooms.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label>Nights
            <select value={nights} onChange={(event) => setNights(Number(event.target.value))}>
              {[1, 2, 3, 4, 5].map((count) => <option key={count}>{count}</option>)}
            </select>
          </label>
          <label>Day lift passes
            <select value={passes} onChange={(event) => setPasses(Number(event.target.value))}>
              {[0, 1, 2, 3, 4].map((count) => <option key={count}>{count}</option>)}
            </select>
          </label>
        </div>}
      </div>
      <dl className={s.quote} aria-live="polite">
        {packageSelected ? <div><dt>{skiAndStay.name} · {skiAndStay.nights} nights, {skiAndStay.passes} passes</dt><dd>{format.format(skiAndStay.tokens)} Tokens</dd></div> : <>
          <div><dt>Lodging</dt><dd>{format.format(quote.lodging)} Tokens</dd></div>
          <div><dt>Lift passes</dt><dd>{format.format(quote.lifts)} Tokens</dd></div>
          <div><dt>Estimated total</dt><dd>{format.format(quote.total)} Tokens</dd></div>
        </>}
        <div><dt>Heated walkway</dt><dd>Complimentary with stay</dd></div>
      </dl>
    </section>
  );
}
