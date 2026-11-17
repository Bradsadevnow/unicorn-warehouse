import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { getTrack, helpingHandTrack } from "@/content/careerTracks";
import { helpingHandPostingGroups, helpingHandPostings } from "@/content/helpingHandPostings";
import PostingList from "../../demandeternal/jobs/PostingList";
import s from "../../demandeternal/jobs/jobs.module.css";

const groups = helpingHandPostingGroups.map(({ category, postings }) => ({
  category,
  postings: postings.map(({ slug, href, title, site, duration, payout }) => ({
    slug, href, title, client: site, duration, payout, status: "Open", track: getTrack(helpingHandTrack(site) ?? "")?.name,
  })),
}));

export default function JobsLayout({ children }: { children: ReactNode }) {
  return (
    <main className={s.page} data-brand="helpinghand">
      <header className={s.bar}>
        <Link href="/sublaborix">← HelpingHand</Link>
        <h1>Work near you</h1>
        <p>{helpingHandPostings.length} postings</p>
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
