"use client";

import { useState } from "react";
import s from "./posting.module.css";

export default function ApplyButton({ applicants, openings }: { applicants: number; openings: number } | { applicants?: never; openings?: never }) {
  const [applied, setApplied] = useState(false);
  return (
    <div className={s.apply}>
      <button type="button" disabled={applied} onClick={() => setApplied(true)}>
        {applicants === undefined ? (applied ? "Shift requested ✓" : "Request this shift") : (applied ? "Application received ✓" : "Apply now")}
      </button>
      <p aria-live="polite">
        {applicants === undefined
          ? (applied ? "Your request is recorded for this visit. The site lead confirms the shift." : null)
          : applied
          ? `You’re applicant ${applicants + 1} for ${openings} ${openings === 1 ? "opening" : "openings"}. We’ll be in touch if the client selects you.`
          : `${applicants} applicants · ${openings} ${openings === 1 ? "opening" : "openings"}`}
      </p>
    </div>
  );
}
