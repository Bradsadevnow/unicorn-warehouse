"use client";

import { useEffect, useRef, type ComponentProps, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const EVENT = "veil:cover";
const COVER_MS = 300;

/** A black sheet that rises over the outgoing page. The incoming page opens
 *  on its own curtain, so the cut between the two is never seen. */
export default function Veil() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cover = () => el.classList.add("veil-on");
    window.addEventListener(EVENT, cover);
    return () => window.removeEventListener(EVENT, cover);
  }, []);

  // The new page has mounted behind the sheet: drop it without animating.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("veil-reset");
    el.classList.remove("veil-on");
    const id = requestAnimationFrame(() => el.classList.remove("veil-reset"));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <div ref={ref} className="veil" aria-hidden />;
}

/** A link that lets the veil cover the page before navigating. */
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const pathname = usePathname();

  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const target = String(href);
    if (target.split("#")[0] === pathname) return; // same page: let the browser handle it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    window.dispatchEvent(new Event(EVENT));
    window.setTimeout(() => router.push(target), COVER_MS);
  };

  return <Link href={href} onClick={go} {...rest} />;
}
