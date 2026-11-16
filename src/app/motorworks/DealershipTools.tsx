"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import city from "@/assets/motors-showroom.webp";
import cargo from "@/assets/motors-cargo.webp";
import grand from "@/assets/motors-grand.webp";
import { bankAutoFinancing, quoteAutoFinancing, type AutoFinancingKind } from "@/content/autoFinancing";
import { inspection, motorServices, sampleRepairTotal, tradeEstimates, vehicles } from "@/content/motorworks";
import s from "./motorworks.module.css";

const images = { "mint-mile": city, "parcel-plus": cargo, "grand-glimmer": grand };
const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const precise = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const tokens = (value: number) => `${whole.format(value)} Tokens`;

export default function DealershipTools() {
  const [vehicleId, setVehicleId] = useState<string>(vehicles[0].id);
  const [tradeId, setTradeId] = useState<string>(tradeEstimates[0].id);
  const [vehicleTerm, setVehicleTerm] = useState<number>(60);
  const [repairTerm, setRepairTerm] = useState<number>(12);
  const [serviceId, setServiceId] = useState<string>(motorServices[0].id);
  const [window, setWindow] = useState("Morning");
  const [appointment, setAppointment] = useState<{ name: string; price: number; window: string }>();
  const vehicle = vehicles.find(({ id }) => id === vehicleId)!;
  const trade = tradeEstimates.find(({ id }) => id === tradeId)!;
  const service = motorServices.find(({ id }) => id === serviceId)!;

  function previewService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppointment({ name: service.name, price: service.price, window });
  }

  return (
    <>
      <section className={s.section} id="inventory" aria-labelledby="inventory-heading">
        <h2 id="inventory-heading">Find your next ride</h2>
        <div className={s.inventory}>
          {vehicles.map((item) => (
            <article className={s.vehicle} key={item.id}>
              <Image src={images[item.id]} alt="" sizes="(max-width: 720px) 94vw, 360px" />
              <div className={s.vehicleCopy}>
                <p className="label">{item.trim} trim</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className={s.payment}>≈ {whole.format(quoteAutoFinancing("vehicle", item.price, 0, 60).monthly)} Tokens/mo</p>
                <p>{tokens(item.price)} sticker price · 60 months at {bankAutoFinancing.vehicle.apr}% APR</p>
                <a className={s.cta} href="#financing" onClick={() => { setVehicleId(item.id); setTradeId("none"); setVehicleTerm(60); }}>See payment options →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={s.split} id="financing" aria-labelledby="financing-heading">
        <div className={s.panel}>
          <p className="label">Unicorn Warehouse Bank</p>
          <h2 id="financing-heading">Make the payment fit.</h2>
          <label>Vehicle
            <select value={vehicleId} onChange={(event) => setVehicleId(event.target.value)}>
              {vehicles.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
          </label>
          <label>Trade-in condition
            <select value={tradeId} onChange={(event) => setTradeId(event.target.value)}>
              {tradeEstimates.map(({ id, label, credit }) => <option key={id} value={id}>{label} · {tokens(credit)}</option>)}
            </select>
          </label>
          <TermPicker kind="vehicle" term={vehicleTerm} setTerm={setVehicleTerm} />
          <p>A longer term lowers the estimated monthly payment and increases the total paid.</p>
          <Link href="/tokens#auto-financing">See how financing fits your Token account →</Link>
        </div>
        <Quote kind="vehicle" price={vehicle.price} credit={trade.credit} months={vehicleTerm} />
      </section>

      <section id="service" className={s.section} aria-labelledby="service-heading">
        <div className={s.sectionIntro}>
          <p className="label">Service &amp; Parts</p>
          <h2 id="service-heading">Motorworks</h2>
          <p>Care for every mile. Bring it in for a little upkeep and leave with a clearer picture of what it needs next.</p>
        </div>
        <div className={s.split}>
          <form className={s.panel} onSubmit={previewService} onChange={() => setAppointment(undefined)}>
            <h3>Plan a service visit</h3>
            <label>Service
              <select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
                {motorServices.map(({ id, name, price }) => <option key={id} value={id}>{name} · {tokens(price)}</option>)}
              </select>
            </label>
            <label>Preferred window
              <select value={window} onChange={(event) => setWindow(event.target.value)}>
                <option>Morning</option><option>Midday</option><option>Evening</option>
              </select>
            </label>
            <button className={s.cta} type="submit">Preview appointment →</button>
            {appointment && <p role="status"><strong>{appointment.name}</strong> · {appointment.window} window · {tokens(appointment.price)}</p>}
          </form>
          <div className={s.panel}>
            <h3>Sample inspection report</h3>
            <ul className={s.inspection}>
              {inspection.map((item) => (
                <li key={item.item}>
                  <span className={s.flag} data-status={item.status}>{item.status}</span>
                  <strong>{item.item}</strong>
                  <p>{item.note}</p>
                  {"service" in item && <p>{tokens(item.service.price)}</p>}
                </li>
              ))}
            </ul>
            <a href="#repair-financing">See repair payment options ↓</a>
            <a href="#financing">Explore vehicle payments ↑</a>
          </div>
        </div>
      </section>

      <section className={s.split} id="repair-financing" aria-labelledby="repair-heading">
        <div className={s.panel}>
          <p className="label">Unicorn Warehouse Bank</p>
          <h2 id="repair-heading">Get back on the road.</h2>
          <p>Preview financing for the {tokens(sampleRepairTotal)} service estimate from the sample inspection.</p>
          <TermPicker kind="repair" term={repairTerm} setTerm={setRepairTerm} />
          <Link href="/tokens#auto-financing">Explore Bank auto financing →</Link>
        </div>
        <Quote kind="repair" price={sampleRepairTotal} credit={0} months={repairTerm} />
      </section>
    </>
  );
}

function TermPicker({ kind, term, setTerm }: { kind: AutoFinancingKind; term: number; setTerm: (term: number) => void }) {
  return <label>Repayment term
    <select value={term} onChange={(event) => setTerm(Number(event.target.value))}>
      {bankAutoFinancing[kind].terms.map((months) => <option key={months} value={months}>{months} months</option>)}
    </select>
  </label>;
}

function Quote({ kind, price, credit, months }: { kind: AutoFinancingKind; price: number; credit: number; months: number }) {
  const quote = quoteAutoFinancing(kind, price, credit, months);
  return (
    <div className={`${s.panel} ${s.quote}`} aria-live="polite">
      <h3>Bank financing preview</h3>
      <p className={s.payment}>{precise.format(quote.monthly)} Tokens/month</p>
      <dl>
        <div><dt>Amount financed</dt><dd>{tokens(quote.principal)}</dd></div>
        <div><dt>APR</dt><dd>{quote.apr}%</dd></div>
        <div><dt>Term</dt><dd>{months} months</dd></div>
        <div><dt>Estimated loan payments</dt><dd>{precise.format(quote.totalPayments)} Tokens</dd></div>
      </dl>
      <p>Illustrative fixed-rate estimate, before any additional fees.</p>
    </div>
  );
}
