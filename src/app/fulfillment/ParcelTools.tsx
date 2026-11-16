"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { sampleParcel } from "@/content/fulfillment";
import s from "./fulfillment.module.css";

export default function ParcelTools() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState<"preview" | "found" | "missing">("preview");
  const [receipt, setReceipt] = useState<{ reason: string; method: string }>();

  function track(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(tracking.trim().toUpperCase() === sampleParcel.id ? "found" : "missing");
  }

  function previewReturn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setReceipt({ reason: String(form.get("reason")), method: String(form.get("method")) });
  }

  return (
    <div className={s.tools}>
      <section className={s.panel} id="tracking" aria-labelledby="tracking-heading">
        <h2 id="tracking-heading">Track a parcel</h2>
        <form className={s.form} onSubmit={track}>
          <label htmlFor="tracking-number">Tracking number</label>
          <input id="tracking-number" value={tracking} onChange={(event) => setTracking(event.target.value)} required />
          <button className={s.button} type="submit">Track parcel</button>
          <button className={s.textButton} type="button" onClick={() => { setTracking(sampleParcel.id); setResult("found"); }}>Try {sampleParcel.id} →</button>
        </form>
        {result === "missing" && <p role="status">We couldn’t find that parcel in the preview. Try {sampleParcel.id}.</p>}
        {result !== "missing" && <article className={s.status}>
          <p className="label">{result === "preview" ? "Sample parcel" : sampleParcel.id} · {sampleParcel.item}</p>
          <h3 aria-live="polite">{sampleParcel.status} ✨</h3>
          <p>Dispatch has your parcel. The delivery window started at {sampleParcel.pickup.time}</p>
          <details>
            <summary>All updates</summary>
            <ol className={s.scans}>
              {[...sampleParcel.scans, sampleParcel.pickup].map(({ time, title, detail }) => <li key={title}><strong>{time} · {title}</strong><span>{detail}</span></li>)}
            </ol>
          </details>
          <Link href="/market#orders">See the whole Market order →</Link>
          <Link href="/dispatch#quote">See Dispatch delivery options →</Link>
        </article>}
      </section>

      <section className={s.panel} id="returns" aria-labelledby="returns-heading">
        <h2 id="returns-heading">Start a return</h2>
        <p>Pick a reason and a drop-off method to see what happens next.</p>
        <form className={s.form} onSubmit={previewReturn} onChange={() => setReceipt(undefined)}>
          <label htmlFor="return-item">Item</label>
          <select id="return-item"><option>Market · Ceramic mug (sample order)</option></select>
          <label htmlFor="return-reason">Reason for return</label>
          <select id="return-reason" name="reason"><option>Arrived damaged</option><option>Wrong item</option><option>Changed my mind</option></select>
          <label htmlFor="return-method">Drop-off method</label>
          <select id="return-method" name="method"><option>Counter · label-free</option><option>Locker · use the original box</option></select>
          <button className={s.button} type="submit">Preview return receipt</button>
        </form>
        {receipt && <div className={s.status} role="status">
          <h3>Return received! ✨</h3>
          <p>{receipt.method} · {receipt.reason}</p>
          <p>Sample drop-off scan complete. Your refund window starts when inspection accepts the item.</p>
          <p><strong>Inspection:</strong> Awaiting acceptance</p>
        </div>}
      </section>
    </div>
  );
}
