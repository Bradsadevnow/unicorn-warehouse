"use client";

import { Fragment, useEffect, useRef, useState, type ElementType } from "react";

type Props = {
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  className?: string;
  /** Seconds before the first word starts to rise. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
};

/** Sets a line of type word by word, each rising out of its own mask,
 *  the first time it scrolls into view. */
export default function Reveal({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.05,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  const Tag = as as ElementType;

  return (
    <Tag ref={ref} className={[className, shown ? "rv-in" : ""].filter(Boolean).join(" ")} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="rv-w" aria-hidden>
            <span style={{ transitionDelay: `${delay + i * stagger}s` }}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
