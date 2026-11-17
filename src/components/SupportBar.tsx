"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import unicorn from "@/assets/support-unicorn.webp";
import SupportChat, { type Exchange } from "@/app/support/SupportChat";
import styles from "./support-bar.module.css";

export default function SupportBar({ sessionId }: { sessionId: string }) {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState<Exchange[]>();
  const panelId = useId();
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const storageKey = `uw-support-${sessionId}`;

  useEffect(() => {
    if (open) closeButton.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  function toggle() {
    if (open) return close();
    if (!initial) {
      let history: Exchange[] = [];
      try {
        const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(saved)) history = saved;
      } catch {}
      setInitial(history);
    }
    setOpen(true);
  }

  return (
    <div className={styles.dock} hidden={path === "/support"} onKeyDown={(event) => {
      if (event.key === "Escape" && open) close();
    }}>
      <section className={styles.panel} id={panelId} hidden={!open} aria-label="Support unicorn">
        <header className={styles.header}>
          <Image src={unicorn} alt="" width={36} height={36} />
          <h2>Support unicorn</h2>
          <button ref={closeButton} onClick={close} type="button" aria-label="Close support">×</button>
        </header>
        {initial && <SupportChat sessionId={sessionId} initialExchanges={initial} storageKey={storageKey}
          interactive autoStart={false} suggestions={[]} onNavigate={close} />}
      </section>
      <button ref={launcher} className={styles.launcher} type="button" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
        <Image src={unicorn} alt="" width={29} height={29} /> Support ✨
      </button>
    </div>
  );
}
