"use client";

import { useEffect, useEffectEvent, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SupportCard } from "@/server/supportActions";
import styles from "./support.module.css";

export type Exchange = {
  question: string;
  answer: string;
  sources: { label: string; href: string; kind: "account" | "posting" | "policy"; excerpt?: string }[];
  mode: string;
  cards?: SupportCard[];
  retrieval?: {
    calls: { tool: string; query?: string; ids: string[] }[];
    usage: { inputTokens?: number; outputTokens?: number; reasoningTokens?: number }[];
  };
};

const evidenceGroups = [
  { kind: "account", title: "Account evidence", description: "What your records show happened or is pending." },
  { kind: "posting", title: "Posting evidence", description: "What the listing offers and requires." },
  { kind: "policy", title: "Policy evidence", description: "What the company is permitted or required to do." },
] as const;

export default function SupportChat({ sessionId, transaction, posting, role, suggestions, autoStart, interactive, initialExchanges, storageKey, onNavigate }: {
  sessionId: string;
  autoStart: boolean;
  transaction?: { id: string; label: string };
  posting?: { id: string; label: string };
  role?: { id: string; label: string };
  suggestions: { id: string; question: string }[];
  interactive?: boolean;
  initialExchanges?: Exchange[];
  storageKey?: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const questionId = useId();
  const traceId = useId();
  const [draft, setDraft] = useState("");
  const [started, setStarted] = useState(autoStart || !!initialExchanges?.length);
  const [showTrace, setShowTrace] = useState(false);
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const [exchanges, setExchanges] = useState<Exchange[]>(initialExchanges ?? []);
  const [confirmations, setConfirmations] = useState<Record<string, { message: string; disabled: boolean }>>({});
  const [confirmingAction, setConfirmingAction] = useState(false);
  const confirming = useRef(false);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [exchanges, pending]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(exchanges.map((exchange) => ({
        ...exchange, cards: exchange.cards?.filter(({ kind }) => kind === "navigate"),
      }))));
    } catch {}
  }, [exchanges, storageKey]);

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
        body: JSON.stringify({ sessionId, transaction: transaction?.id, posting: posting?.id, role: role?.id,
          interactive, stop: window.location.pathname === "/quests/horn-fitting" ? new URLSearchParams(window.location.search).get("stop") ?? "bank" : undefined, messages: [
          ...exchanges.flatMap(({ question, answer }) => [
            ...(question ? [{ role: "user", content: question }] : []),
            { role: "assistant", content: answer },
          ]),
          ...(clean ? [{ role: "user", content: clean }] : []),
        ] }),
      });
      if (response.status === 401 || response.status === 409) {
        window.location.reload();
        return;
      }
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

  async function confirm(token: string) {
    if (confirming.current || confirmations[token]?.disabled) return;
    confirming.current = true;
    setConfirmingAction(true);
    setConfirmations((current) => ({ ...current, [token]: { message: "Confirming…", disabled: true } }));
    try {
      const response = await fetch("/api/support/confirm", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }),
      });
      const result = await response.json();
      setConfirmations((current) => ({
        ...current, [token]: { message: response.ok ? "Confirmed and saved to your account. ✨" : result.error, disabled: true },
      }));
      if (response.ok) router.refresh();
    } catch {
      setConfirmations((current) => ({ ...current, [token]: { message: "Couldn’t confirm. Try again when you’re ready.", disabled: false } }));
    } finally {
      confirming.current = false;
      setConfirmingAction(false);
    }
  }

  const startPostingChat = useEffectEvent(() => { void ask(""); });
  const autoOpened = useRef(false);

  useEffect(() => {
    if (!autoStart || autoOpened.current) return;
    autoOpened.current = true;
    startPostingChat();
  }, [autoStart]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.trim()) ask(draft);
  }

  if (!started) {
    return <section className={styles.chat} aria-label="Support chat">
      {transaction && <p>Chatting about {transaction.label}</p>}
      {posting && <p>Chatting about {posting.label}</p>}
      {role && <p>Chatting about {role.label}</p>}
      <button className={styles.start} type="button" onClick={() => { setStarted(true); ask(""); }}>✨ Start chat ✨</button>
    </section>;
  }

  return (
    <div className={styles.workspace} data-trace={showTrace} data-dock={interactive}>
    <section className={styles.chat} aria-label="Support chat">
      {posting && <p>Chatting about {posting.label}</p>}
      <button type="button" className={styles.traceToggle} aria-expanded={showTrace} aria-controls={traceId} onClick={() => setShowTrace(!showTrace)}>
        {showTrace ? "Hide answer trace" : "Show answer trace"} ✨
      </button>
      <div className={styles.log} ref={log} role="log" aria-label="Conversation" tabIndex={0}>
        {exchanges.map(({ question, answer, sources, cards }, index) => (
          <div className={styles.exchange} key={index}>
            {question && <p className={styles.question}><strong>You</strong>{question}</p>}
            <p className={styles.reply}><strong>Support unicorn</strong>{answer}{sources.filter(({ href }) =>
              !cards?.some((card) => card.kind === "navigate" && card.href === href)
            ).map(({ href, label }) => <Link key={label} href={href} onClick={onNavigate}>{label} →</Link>)}</p>
            {cards?.map((card) => card.kind === "navigate"
              ? <Link className={styles.gameLink} href={card.href} key={card.href} onClick={onNavigate}>{card.label} →</Link>
              : <div className={styles.confirmation} key={card.token}>
                <strong>{card.label}</strong>
                <p>{card.detail}</p>
                <button type="button" disabled={confirmingAction || confirmations[card.token]?.disabled} onClick={() => confirm(card.token)}>Confirm</button>
                {confirmations[card.token] && <p role="status">{confirmations[card.token].message}</p>}
              </div>)}
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
        <label htmlFor={questionId}>Ask a question</label>
        <input id={questionId} value={draft} onChange={(event) => setDraft(event.target.value)} disabled={!!pending} />
        <button type="submit" disabled={!!pending || !draft.trim()}>Send</button>
      </form>
    </section>
    <aside id={traceId} className={styles.trace} hidden={!showTrace} aria-label="Answer trace">
      <h2>Answer trace</h2>
      <p>The account records, postings, and policy clauses cited in this chat.</p>
      {exchanges.map(({ question, sources, mode, retrieval }, index) => (
        <details key={index} open={index === exchanges.length - 1}>
          <summary>{question || "Opening message"}</summary>
          <p>{mode}</p>
          {retrieval && (
            <details>
              <summary>Tool calls and token usage</summary>
              {retrieval.calls.map(({ tool, query, ids }, callIndex) => (
                <p key={callIndex}>
                  <strong>{({ search_policy: "Policy search", read_records: "Read records", open_place: "Open a place", prepare_action: "Prepare confirmation", quest_hint: "Quest hint" } as Record<string, string>)[tool] ?? tool}</strong>
                  {query && <> · {query}</>}
                  <> · {ids.join(", ") || "No matches"}</>
                </p>
              ))}
              {retrieval.usage.map(({ inputTokens, outputTokens, reasoningTokens }, callIndex) => (
                <p key={callIndex}>
                  Model call {callIndex + 1}
                  {inputTokens !== undefined && <> · {inputTokens.toLocaleString()} input</>}
                  {outputTokens !== undefined && <> · {outputTokens.toLocaleString()} output</>}
                  {reasoningTokens !== undefined && <> · {reasoningTokens.toLocaleString()} reasoning</>}
                </p>
              ))}
            </details>
          )}
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
