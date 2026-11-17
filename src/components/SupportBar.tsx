"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import unicorn from "@/assets/support-unicorn.webp";
import SupportChat, { type Exchange } from "@/app/support/SupportChat";
import { statIds, statInfo } from "@/content/survival";
import type { MemberPanelData } from "@/server/memberPanel";
import StatBars from "./StatBars";
import styles from "./support-bar.module.css";

const tabs = [
  ["today", "✨ Today"],
  ["home", "🏠 Home"],
  ["wallet", "🪙 Wallet"],
  ["support", "🦄 Support"],
] as const;
type Tab = typeof tabs[number][0];

/**
 * The member panel: today's stats and schedule, home, wallet, and the Support unicorn, available on
 * every page. The server renders it from the signed save, so it is current after every action.
 */
export default function SupportBar({ sessionId, panel }: { sessionId: string; panel: MemberPanelData }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("today");
  const [initial, setInitial] = useState<Exchange[]>();
  const panelId = useId();
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const router = useRouter();
  const storageKey = `uw-support-${sessionId}`;
  const tabKey = `uw-panel-tab-${sessionId}`;
  // The full Support page already shows the conversation.
  const visibleTabs = path === "/support" ? tabs.filter(([id]) => id !== "support") : tabs;
  const current = visibleTabs.some(([id]) => id === tab) ? tab : "today";

  useEffect(() => {
    if (open) closeButton.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  function loadChat() {
    if (initial) return;
    let history: Exchange[] = [];
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(saved)) history = saved;
    } catch {}
    setInitial(history);
  }

  function select(next: Tab) {
    // Support can change the account, so leaving the conversation refreshes the other tabs.
    if (current === "support" && next !== "support") router.refresh();
    if (next === "support") loadChat();
    setTab(next);
    try { sessionStorage.setItem(tabKey, next); } catch {}
  }

  function toggle() {
    if (open) return close();
    let saved: string | null = null;
    try { saved = sessionStorage.getItem(tabKey); } catch {}
    const restored = visibleTabs.find(([id]) => id === saved)?.[0] ?? current;
    if (restored === "support") loadChat();
    setTab(restored);
    setOpen(true);
  }

  const { stats } = panel;
  return (
    <div className={styles.dock} onKeyDown={(event) => {
      if (event.key === "Escape" && open) close();
    }}>
      <section className={styles.panel} id={panelId} hidden={!open} aria-label="Member panel">
        <header className={styles.header}>
          <Image src={unicorn} alt="" width={36} height={36} />
          <div>
            <h2>{panel.name}</h2>
            <p>{panel.clock} · {panel.date}</p>
          </div>
          <button ref={closeButton} onClick={close} type="button" aria-label="Close member panel">×</button>
        </header>
        <nav className={styles.tabs} aria-label="Member panel">
          {visibleTabs.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={current === id} onClick={() => select(id)}>{label}</button>
          ))}
        </nav>

        {current === "today" && <div className={styles.body}>
          <StatBars stats={stats} compact />
          <h3>🗓️ Schedule</h3>
          {panel.schedule.length === 0 ? <p className={styles.muted}>Nothing booked yet today.</p> : <ol className={styles.list}>
            {panel.schedule.map(({ id, label, time, done }) => <li key={id} data-done={done || undefined}><span>{time}</span> {label}</li>)}
          </ol>}
          {panel.unpaid.length > 0 && <>
            <h3>Outstanding bills</h3>
            <ul className={styles.list}>{panel.unpaid.map(({ id, label, amount, due }) => <li key={id}><span>{due}</span> {label} · {amount} Tokens</li>)}</ul>
          </>}
          <Link className={styles.action} href="/account#member-day" onClick={close}>Plan your day →</Link>
        </div>}

        {current === "home" && <div className={styles.body}>
          {panel.home ? <>
            <h3>{panel.home.name}</h3>
            <dl className={styles.facts}>
              <div><dt>Address</dt><dd>{panel.home.address}</dd></div>
              <div><dt>Rent</dt><dd>{panel.home.weeklyRent} Tokens a week</dd></div>
              {panel.home.nextRent && <div><dt>Next rent</dt><dd>{panel.home.nextRent}</dd></div>}
              <div><dt>Kitchen</dt><dd>{panel.home.kitchen ? "Hot plate" : "None"}</dd></div>
            </dl>
            <h3>🥫 Pantry</h3>
            {panel.pantry.length === 0 ? <p className={styles.muted}>Your pantry is empty. Market stocks groceries by the serving.</p>
              : <ul className={styles.list}>{panel.pantry.map(({ item, servings }) => <li key={item}>{item} · {servings} serving{servings === 1 ? "" : "s"}</li>)}</ul>}
            <Link className={styles.action} href={panel.home.mapHref} onClick={close}>Go home →</Link>
          </> : <>
            <p>Your account does not have a home address on file.</p>
            <Link className={styles.action} href="/account#home" onClick={close}>Choose a starter home →</Link>
          </>}
        </div>}

        {current === "wallet" && <div className={styles.body}>
          <dl className={styles.balances}>
            <div><dt>Available</dt><dd>{panel.balances.available}</dd></div>
            <div><dt>Pending</dt><dd>{panel.balances.pending}</dd></div>
            <div><dt>Held</dt><dd>{panel.balances.held}</dd></div>
          </dl>
          <h3>Recent activity</h3>
          <ul className={styles.list}>
            {panel.recent.map(({ id, label, amount, status, date }) => (
              <li key={id}><span>{date}</span> {label} · <strong>{status === "spent" ? "−" : status === "posted" ? "+" : ""}{amount}</strong> {status === "pending" ? "pending" : ""}</li>
            ))}
          </ul>
          <Link className={styles.action} href="/account?tab=wallet#statement" onClick={close}>Full statement →</Link>
        </div>}

        {current === "support" && initial && <SupportChat sessionId={sessionId} initialExchanges={initial} storageKey={storageKey}
          interactive autoStart={false} suggestions={[]} onNavigate={close} />}
      </section>
      <button ref={launcher} className={styles.launcher} type="button" aria-expanded={open} aria-controls={panelId} onClick={toggle}
        aria-label={`Member panel · ${statIds.map((id) => `${statInfo[id].name} ${Math.round(stats[id])}`).join(", ")}`}>
        <Image src={unicorn} alt="" width={29} height={29} />
        <span className={styles.mini} aria-hidden>
          {statIds.map((id) => <span key={id} title={statInfo[id].name} data-low={stats[id] < 20 || undefined}>
            <span style={{ height: `${Math.max(6, Math.round(stats[id]))}%` }} />
          </span>)}
        </span>
        My day ✨
      </button>
    </div>
  );
}
