"use client";

import { useState } from "react";
import { refillExamples } from "@/content/wellnessPharmacy";
import s from "./wellness.module.css";

export default function RefillPreview() {
  const [exampleId, setExampleId] = useState<string>(refillExamples[0].id);
  const example = refillExamples.find(({ id }) => id === exampleId)!;

  return (
    <div className={s.visit}>
      <div>
        <h3>Track a refill</h3>
        <p>Preview the steps from request review to pickup.</p>
        <label>Example refill
          <select value={exampleId} onChange={(event) => setExampleId(event.target.value)}>
            {refillExamples.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
          </select>
        </label>
      </div>
      <dl className={s.checks} aria-live="polite">
        <div><dt>Request review</dt><dd>{example.review}</dd></div>
        <div><dt>Stock</dt><dd>{example.stock}</dd></div>
        <div><dt>Counter release</dt><dd>{example.release}</dd></div>
      </dl>
    </div>
  );
}
