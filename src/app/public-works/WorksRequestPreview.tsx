"use client";

import { useState } from "react";
import { worksRequests } from "@/content/publicWorks";
import s from "./publicWorks.module.css";

export default function WorksRequestPreview() {
  const [kind, setKind] = useState<string>(worksRequests[0].id);
  const request = worksRequests.find(({ id }) => id === kind) ?? worksRequests[0];
  const [location, setLocation] = useState<string>(request.locations[0]);

  return (
    <section className={s.request} id="requests" aria-labelledby="works-request-heading">
      <div>
        <h2 id="works-request-heading">See something out of place?</h2>
        <p>Choose a non-emergency issue to see which crew would handle it and what happens next.</p>
        <label>Issue
          <select value={kind} onChange={(event) => {
            const next = worksRequests.find(({ id }) => id === event.target.value);
            if (!next) return;
            setKind(next.id);
            setLocation(next.locations[0]);
          }}>
            {worksRequests.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
        <label>Location
          <select value={location} onChange={(event) => setLocation(event.target.value)}>
            {request.locations.map((place) => <option key={place}>{place}</option>)}
          </select>
        </label>
      </div>
      <aside className={s.requestResult} aria-live="polite">
        <p className="label">Request preview</p>
        <h3>{request.team}</h3>
        <p><strong>{location}</strong> · {request.name}</p>
        <p>{request.next}</p>
      </aside>
    </section>
  );
}
