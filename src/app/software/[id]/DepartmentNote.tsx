"use client";

import { useState } from "react";
import styles from "./software.module.css";

export default function DepartmentNote({ id, department, title, status }: {
  id: string;
  department: string;
  title: string;
  status: string;
}) {
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function generate() {
    setPending(true);
    setError(false);
    try {
      const response = await fetch("/api/software/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, department }),
      });
      if (!response.ok) throw new Error("Note unavailable");
      const result = await response.json();
      setNote(result.note);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className={styles.card}>
      <h2>{title}</h2>
      <p>{status}</p>
      <button type="button" onClick={generate} disabled={pending}>
        {pending ? "Preparing note…" : note ? "Regenerate note" : "Generate note"}
      </button>
      {error && <p role="status">This department couldn’t deliver its note. Try again.</p>}
      {note && <p className={styles.note} aria-live="polite">{note}</p>}
    </section>
  );
}
