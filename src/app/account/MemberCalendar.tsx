"use client";

import { useState } from "react";
import s from "./calendar.module.css";

type Entry = {
  id: string; at: string; end?: string;
  kind: "block" | "bill" | "unpaid" | "payout" | "milestone" | "overdue";
  title: string; detail?: string; amount?: number;
};

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
const monthName = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
const clock = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
const time = (at: string) => clock.format(new Date(`${at}:00Z`));
const kindLabel: Record<Entry["kind"], string> = {
  block: "Booked", bill: "Charge", unpaid: "Can’t be covered", payout: "Payout", milestone: "Milestone", overdue: "Overdue",
};

function monthDays(month: string) {
  const first = new Date(`${month}-01T00:00:00Z`);
  const lead = first.getUTCDay();
  const count = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  return { lead, days: Array.from({ length: count }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`) };
}

function shiftMonth(month: string, by: number) {
  const date = new Date(`${month}-01T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + by);
  return date.toISOString().slice(0, 7);
}

export default function MemberCalendar({ today, from, until, entries }: {
  today: string; from: string; until: string; entries: Entry[];
}) {
  const [month, setMonth] = useState(today.slice(0, 7));
  const [selected, setSelected] = useState(today);
  const byDay = new Map<string, Entry[]>();
  for (const entry of entries) {
    const day = entry.at.slice(0, 10);
    byDay.set(day, [...(byDay.get(day) ?? []), entry]);
  }
  const { lead, days } = monthDays(month);
  const chosen = byDay.get(selected) ?? [];
  const firstMonth = from.slice(0, 7);
  const lastMonth = until.slice(0, 7);

  return (
    <div className={s.calendar}>
      <div className={s.monthBar}>
        <button type="button" onClick={() => setMonth(shiftMonth(month, -1))} disabled={month <= firstMonth} aria-label="Previous month">←</button>
        <h3>{monthName.format(new Date(`${month}-01T00:00:00Z`))}</h3>
        <button type="button" onClick={() => setMonth(shiftMonth(month, 1))} disabled={month >= lastMonth} aria-label="Next month">→</button>
      </div>
      <div className={s.grid} role="grid" aria-label={monthName.format(new Date(`${month}-01T00:00:00Z`))}>
        {weekdays.map((day, index) => <span key={index} className={s.weekday} aria-hidden="true">{day}</span>)}
        {Array.from({ length: lead }, (_, i) => <span key={`lead-${i}`} />)}
        {days.map((day) => {
          const list = byDay.get(day) ?? [];
          const kinds = new Set(list.map(({ kind }) => kind));
          return (
            <button
              type="button" key={day} className={s.day}
              aria-pressed={day === selected} data-today={day === today || undefined} data-past={day < today || undefined}
              data-alert={kinds.has("unpaid") || kinds.has("overdue") || undefined}
              onClick={() => setSelected(day)}
              aria-label={`${dayName.format(new Date(`${day}T00:00:00Z`))}${list.length ? `, ${list.length} item${list.length === 1 ? "" : "s"}` : ""}`}
            >
              <span className={s.number}>{Number(day.slice(8))}</span>
              {list.slice(0, 2).map((entry) => <span key={entry.id} className={s.chip} data-kind={entry.kind}>{entry.title}</span>)}
              {list.length > 2 && <span className={s.more}>+{list.length - 2} more</span>}
            </button>
          );
        })}
      </div>

      <section className={s.agenda} aria-live="polite" aria-labelledby="agenda-heading">
        <h3 id="agenda-heading">{selected === today ? "Today · " : ""}{dayName.format(new Date(`${selected}T00:00:00Z`))}</h3>
        {chosen.length === 0 && <p className={s.empty}>Nothing scheduled. Enjoy the open calendar while it lasts. ✨</p>}
        <ol>
          {chosen.map((entry) => (
            <li key={entry.id} data-kind={entry.kind}>
              <time dateTime={entry.at}>{entry.kind === "overdue" ? "Now" : entry.end ? `${time(entry.at)}–${time(entry.end)}` : time(entry.at)}</time>
              <div>
                <b>{entry.title}</b>
                <span>{kindLabel[entry.kind]}{entry.amount !== undefined ? ` · ${entry.amount > 0 ? "+" : "−"}${Math.abs(entry.amount).toLocaleString("en-US")} Tokens` : ""}</span>
                {entry.detail && <small>{entry.detail}</small>}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
