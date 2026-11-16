"use client";

import { useState } from "react";
import { flockCheckIns } from "@/content/flock";
import s from "./flock.module.css";

export default function CheckInPreview() {
  const [id, setId] = useState<string>(flockCheckIns[0].id);
  const example = flockCheckIns.find((checkIn) => checkIn.id === id) ?? flockCheckIns[0];

  return (
    <section className={s.preview} id="check-in" aria-labelledby="check-in-heading">
      <h2 id="check-in-heading">A little note from Flock.</h2>
      <label>Example check-in
        <select value={id} onChange={(event) => setId(event.target.value)}>
          {flockCheckIns.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
      </label>
      <div className={s.messages} aria-live="polite">
        <article><h3>Clover · Household contact</h3><p>{example.household}</p></article>
        <article><h3>Shift lead · Workplace update</h3><p>{example.workplace}</p></article>
      </div>
    </section>
  );
}
