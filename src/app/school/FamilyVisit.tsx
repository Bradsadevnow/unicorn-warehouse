"use client";

import { useState } from "react";
import { gradeBands } from "@/content/school";
import s from "./school.module.css";

export default function FamilyVisit() {
  const [index, setIndex] = useState(0);
  const band = gradeBands[index];

  return (
    <section className={s.visit} id="family-visit" aria-labelledby="visit-heading">
      <div>
        <h2 id="visit-heading">Come see the school.</h2>
        <p>Choose a grade range to see what a family visit looks like. Children, siblings, and their grown-ups are welcome.</p>
        <label>Grade range
          <select value={index} onChange={(event) => setIndex(Number(event.target.value))}>
            {gradeBands.map(({ id, name, grades }, optionIndex) => <option key={id} value={optionIndex}>{name} · {grades}</option>)}
          </select>
        </label>
      </div>
      <div className={s.visitPlan} aria-live="polite">
        <h3>{band.name} visit</h3>
        <p>{band.visit}</p>
        <p>Allow about 45 minutes. You’re welcome to take a break, ask questions, or just look around.</p>
      </div>
    </section>
  );
}
