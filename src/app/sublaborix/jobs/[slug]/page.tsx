import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getHelpingHandPosting, helpingHandPostings } from "@/content/helpingHandPostings";
import PostingDetail from "../PostingDetail";

export function generateStaticParams() {
  return helpingHandPostings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/sublaborix/jobs/[slug]">): Promise<Metadata> {
  const posting = getHelpingHandPosting((await params).slug);
  return posting ? { title: `${posting.title} · HelpingHand`, description: posting.summary } : {};
}

export default function PostingPage({ params }: PageProps<"/sublaborix/jobs/[slug]">) {
  return <Suspense fallback={<p>Opening shift…</p>}><PostingDetails params={params} /></Suspense>;
}

async function PostingDetails({ params }: Pick<PageProps<"/sublaborix/jobs/[slug]">, "params">) {
  const posting = getHelpingHandPosting((await params).slug);
  if (!posting) notFound();
  return <PostingDetail posting={posting} />;
}
