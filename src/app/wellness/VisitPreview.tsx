"use client";

import { useState } from "react";
import { wellnessClinics, wellnessPlans } from "@/content/wellness";
import s from "./wellness.module.css";

export default function VisitPreview() {
  const [planId, setPlanId] = useState<string>("gut");
  const [clinicId, setClinicId] = useState<string>(wellnessClinics[0].id);
  const plan = wellnessPlans.find(({ id }) => id === planId)!;
  const clinic = wellnessClinics.find(({ id }) => id === clinicId)!;
  const hasSlot = clinic.slots.some((id) => id === plan.id);

  return (
    <section className={s.visit} aria-labelledby="visit-heading">
      <div>
        <h2 id="visit-heading">Plan a clinic visit.</h2>
        <p>See what the membership includes and where that appointment is currently offered.</p>
        <label>Membership
          <select value={planId} onChange={(event) => setPlanId(event.target.value)}>
            {wellnessPlans.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}
          </select>
        </label>
        <label>Clinic
          <select value={clinicId} onChange={(event) => setClinicId(event.target.value)}>
            {wellnessClinics.map(({ id, name, neighborhood }) => <option value={id} key={id}>{name} · {neighborhood}</option>)}
          </select>
        </label>
      </div>
      <dl className={s.checks} aria-live="polite">
        <div><dt>Plan benefit</dt><dd>{plan.appointment} included with an active membership</dd></div>
        <div><dt>Scheduling preview</dt><dd>{hasSlot ? "Example appointment available" : "No appointments for this visit type"}</dd></div>
        <div><dt>Clinic</dt><dd>{clinic.name}</dd></div>
      </dl>
    </section>
  );
}
