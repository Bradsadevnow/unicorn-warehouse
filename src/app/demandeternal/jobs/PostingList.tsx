"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import s from "./jobs.module.css";

type Group = {
  category: string;
  postings: { slug: string; href: string; title: string; client: string; duration: string; payout: number; status: string; track?: string }[];
};

export default function PostingList({ groups }: { groups: Group[] }) {
  const selected = useSelectedLayoutSegment() ?? groups[0]?.postings[0]?.slug;
  return (
    <nav className={s.list} aria-label="Postings" data-lenis-prevent>
      {groups.map(({ category, postings }) => (
        <section key={category}>
          <h2>{category}</h2>
          <ul>
            {postings.map(({ slug, href, title, client, duration, payout, status, track }) => (
              <li key={slug}>
                <Link href={href} aria-current={slug === selected ? "page" : undefined}>
                  <b>{title}</b>
                  <span>{client}</span>
                  <span className={s.meta}>
                    <small>{payout} Tokens</small> · {duration}
                    {track && <span className={s.track} title={`Counts toward horn rank in the ${track} track`}>{track}</span>}
                    {status !== "Open" && <i data-status={status}>{status}</i>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
