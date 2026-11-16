"use client";

import { useState, type FormEvent } from "react";
import { dispatchHandoffs, dispatchPlus, dispatchServices, dispatchTrips, priorityMatchingTokens } from "@/content/dispatch";
import s from "./dispatch.module.css";

export default function DeliveryPreview() {
  const [tripId, setTripId] = useState<string>(dispatchTrips[0].id);
  const [serviceId, setServiceId] = useState<string>(dispatchServices[0].id);
  const [handoffId, setHandoffId] = useState<string>(dispatchHandoffs[0].id);
  const [matching, setMatching] = useState(false);
  const [memberPreview, setMemberPreview] = useState(false);
  const [step, setStep] = useState(0);
  const trip = dispatchTrips.find(({ id }) => id === tripId)!;
  const service = dispatchServices.find(({ id }) => id === serviceId)!;
  const handoff = dispatchHandoffs.find(({ id }) => id === handoffId)!;
  const matchingCharge = matching && !memberPreview ? priorityMatchingTokens : 0;
  const [receipt, setReceipt] = useState({ origin: trip.origin, service, handoff, priority: false, total: service.tokens + handoff.tokens });
  const [started, setStarted] = useState(false);

  function preview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReceipt({ origin: trip.origin, service, handoff, priority: matching, total: service.tokens + handoff.tokens + matchingCharge });
    setStep(0);
    setStarted(true);
  }

  const milestones = [
    ["6:00 p.m.", "Order received"],
    [receipt.priority ? "6:02 p.m." : "6:07 p.m.", "Offer sent to couriers"],
    ["6:25 p.m.", "Picked up · delivery clock starts"],
    [receipt.service.deliveredAt, "Delivered · on time"],
  ];
  const status = ["Finding your courier ✨", "Offer sent to couriers", "On the way", "Delivered on time"][step];

  return (
    <section className={s.preview} id="quote" aria-label="Delivery quote and tracking preview">
      <form className={s.panel} onSubmit={preview}>
        <h2>Get a delivery quote</h2>
        <label>What are you sending?
          <select value={tripId} onChange={(event) => setTripId(event.target.value)}>
            {dispatchTrips.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
        <label>Delivery speed
          <select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
            {dispatchServices.map(({ id, name, tokens }) => <option key={id} value={id}>{name} · {tokens} Tokens</option>)}
          </select>
        </label>
        <label>At the door
          <select value={handoffId} onChange={(event) => setHandoffId(event.target.value)}>
            {dispatchHandoffs.map(({ id, name, tokens }) => <option key={id} value={id}>{name}{tokens ? ` · +${tokens} Tokens` : ""}</option>)}
          </select>
        </label>
        <label className={s.check}><input type="checkbox" checked={matching} onChange={(event) => setMatching(event.target.checked)} /> Priority Matching · {matching && memberPreview ? "Included with boost" : `+${priorityMatchingTokens} Tokens`}</label>
        {matching && <label className={s.check}><input type="checkbox" checked={memberPreview} onChange={(event) => setMemberPreview(event.target.checked)} /> Preview using an available {dispatchPlus.name} boost</label>}
        <p className={s.quote} aria-live="polite"><strong>{service.tokens + handoff.tokens + matchingCharge} Tokens</strong><span>{service.window}</span></p>
        <button className={s.button} type="submit">Preview this delivery →</button>
      </form>
      <div className={s.panel}>
        <h2>Track your delivery</h2>
        <div className={s.map} aria-hidden="true">
          <svg viewBox="0 0 360 150" preserveAspectRatio="xMidYMid meet">
            <path d="M25 40H335M25 85H335M25 125H335M65 12V140M140 12V140M225 12V140M300 12V140" stroke="#fff" strokeWidth="10" />
            <path d="M65 40H140V85H225V125H300" fill="none" stroke="#23746c" strokeDasharray={step < 2 ? "7 7" : undefined} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={step === 3 ? 300 : step === 2 ? 225 : 65} cy={step === 3 ? 125 : step === 2 ? 85 : 40} r="10" fill="#254d84" stroke="white" strokeWidth="4" />
            <circle cx="300" cy="125" r="5" fill="#254d84" />
          </svg>
        </div>
        {started ? <>
          <h3 aria-live="polite">{status}</h3>
          <p>{receipt.origin} → your door</p>
          <p>{step < 2 ? "Arrival estimate starts once your courier picks up." : receipt.service.window}</p>
          <ol className={s.timeline}>
            {milestones.slice(0, step + 1).map(([time, title]) => <li key={title}><strong>{time}</strong><span>{title}</span></li>)}
          </ol>
          {step < milestones.length - 1 ? <button className={s.button} type="button" onClick={() => setStep((current) => current + 1)}>Next tracking update →</button> :
            <p><strong>{receipt.total} Tokens quoted.</strong> {receipt.handoff.name} was selected.{receipt.handoff.id === "personal" && " If you miss the handoff window, we’ll leave a delivery photo."}</p>}
        </> : <p>Build a quote to preview the trip from pickup to your door.</p>}
      </div>
    </section>
  );
}
