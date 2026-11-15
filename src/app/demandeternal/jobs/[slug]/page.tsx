import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPosting, postings } from "@/content/goodshiftPostings";
import PostingDetail from "../PostingDetail";
import s from "./posting.module.css";

export function generateStaticParams() {
  return postings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/demandeternal/jobs/[slug]">): Promise<Metadata> {
  const posting = getPosting((await params).slug);
  if (!posting) return {};
  return {
    title: `${posting.title} · Goodshift`,
    description: posting.summary,
  };
}

export default function PostingPage({ params }: PageProps<"/demandeternal/jobs/[slug]">) {
  return <Suspense fallback={<article className={s.detail}>Opening posting…</article>}>
    <PostingDetails params={params} />
  </Suspense>;
}

async function PostingDetails({ params }: Pick<PageProps<"/demandeternal/jobs/[slug]">, "params">) {
  const posting = getPosting((await params).slug);
  if (!posting) notFound();
  return <PostingDetail posting={posting} />;
}
