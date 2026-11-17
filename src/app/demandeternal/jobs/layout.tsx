import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { postingCategories, postingPath, postings } from "@/content/goodshiftPostings";
import PostingList from "./PostingList";
import s from "./jobs.module.css";

const groups = postingCategories.map((category) => ({
  category,
  postings: postings
    .filter((posting) => posting.category === category)
    .map((posting) => ({
      slug: posting.slug,
      href: postingPath(posting),
      title: posting.title,
      client: posting.client,
      duration: posting.duration,
      payout: posting.payout,
      status: posting.status,
    })),
}));

export default function JobsLayout({ children }: { children: ReactNode }) {
  return (
    <main className={s.page}>
      <header className={s.bar}>
        <Link href="/demandeternal">← Goodshift</Link>
        <h1>Open office shifts</h1>
        <p>{postings.length} postings</p>
        <Link className={s.careers} href="/careers">Looking for something permanent? Become a Unicorn ✨</Link>
      </header>
      <div className={s.board}>
        <Suspense fallback={<nav className={s.list} aria-label="Postings" />}>
          <PostingList groups={groups} />
        </Suspense>
        <div className={s.pane}>{children}</div>
      </div>
    </main>
  );
}
