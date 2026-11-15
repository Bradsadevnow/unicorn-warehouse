"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./support.module.css";

type Exchange = {
  question: string;
  answer: string;
  sources: { label: string; href: string; kind: "account" | "policy"; excerpt?: string }[];
  mode: string;
};

const evidenceGroups = [
  { kind: "account", title: "Account evidence", description: "What Poppy’s records show happened or is pending." },
  { kind: "policy", title: "Policy evidence", description: "What the company is permitted or required to do." },
] as const;

export default function SupportChat({ suggestions }: { suggestions: { id: string; question: string }[] }) {
  const [draft, setDraft] = useState("");
  const [started, setStarted] = useState(false);
  const [showTrace, setShowTrace] = useState(false);
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [exchanges, pending]);

  async function ask(question: string) {
    const clean = question.trim();
    if (sending.current) return;
    sending.current = true;
    setPending(clean || "Opening chat…");
    setError("");
    setDraft("");
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [
          ...exchanges.flatMap(({ question, answer }) => [
            ...(question ? [{ role: "user", content: question }] : []),
            { role: "assistant", content: answer },
          ]),
          ...(clean ? [{ role: "user", content: clean }] : []),
        ] }),
      });
      if (!response.ok) throw new Error("Support request failed");
      const reply: Omit<Exchange, "question"> = await response.json();
      setExchanges((current) => [...current, { question: clean, ...reply }]);
    } catch {
      setDraft(clean);
      setError("My headset lost its connection! 🦄💖 Give it another try when you’re ready.");
    } finally {
      sending.current = false;
      setPending("");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.trim()) ask(draft);
  }

  if (!started) {
    return <section className={styles.chat} aria-label="Support chat">
      <button className={styles.start} type="button" onClick={() => { setStarted(true); ask(""); }}>✨ Start chat ✨</button>
    </section>;
  }

  return (
    <div className={styles.workspace} data-trace={showTrace}>
    <section className={styles.chat} aria-label="Support chat">
      <button type="button" className={styles.traceToggle} aria-expanded={showTrace} aria-controls="support-trace" onClick={() => setShowTrace(!showTrace)}>
        {showTrace ? "Hide answer trace" : "Show answer trace"} ✨
      </button>
      <div className={styles.log} ref={log} role="log" aria-label="Conversation" tabIndex={0}>
        {exchanges.map(({ question, answer, sources }, index) => (
          <div className={styles.exchange} key={index}>
            {question && <p className={styles.question}><strong>You</strong>{question}</p>}
            <p className={styles.reply}><strong>Support unicorn</strong>{answer}{sources.map(({ href, label }) => <Link key={label} href={href}>{label} →</Link>)}</p>
          </div>
        ))}
        {pending && <div className={styles.exchange}><p className={styles.reply}>{pending === "Opening chat…" ? "Getting my headset ready… ✨" : "Looking that up for you… ✨"}</p></div>}
        {error && <p className={styles.reply}>{error}</p>}
        {error && exchanges.length === 0 && !draft && <button type="button" className={styles.start} onClick={() => ask("")}>✨ Retry opening chat ✨</button>}
      </div>
      <div className={styles.suggestions} aria-label="Suggested questions" role="group">
        {suggestions.map(({ id, question }) => (
          <button type="button" key={id} disabled={!!pending} onClick={() => ask(question)}>{question}</button>
        ))}
      </div>
      <form className={styles.form} onSubmit={submit}>
        <label htmlFor="support-question">Ask a question</label>
        <input id="support-question" value={draft} onChange={(event) => setDraft(event.target.value)} disabled={!!pending} />
        <button type="submit" disabled={!!pending || !draft.trim()}>Send</button>
      </form>
    </section>
    <aside id="support-trace" className={styles.trace} hidden={!showTrace} aria-label="Answer trace">
      <h2>Answer trace</h2>
      <p>The account records and policy clauses cited in this chat.</p>
      {exchanges.map(({ question, sources, mode }, index) => (
        <details key={index} open={index === exchanges.length - 1}>
          <summary>{question || "Opening message"}</summary>
          <p>{mode}</p>
          {evidenceGroups.map(({ kind, title, description }) => {
            const evidence = sources.filter((source) => source.kind === kind);
            return (
              <section className={styles.evidence} key={kind} data-kind={kind} aria-label={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                {evidence.length === 0 && <p>None cited for this reply.</p>}
                {evidence.map(({ label, href, excerpt }) => (
                  <div key={label}>
                    <Link href={href}>{label} →</Link>
                    {excerpt && <blockquote>{excerpt}</blockquote>}
                  </div>
                ))}
              </section>
            );
          })}
        </details>
      ))}
    </aside>
    </div>
  );
}
