import type { Metadata } from "next";
import { postings } from "@/content/goodshiftPostings";
import PostingDetail from "./PostingDetail";

export const metadata: Metadata = {
  title: "Open office shifts · Goodshift",
  description: "Browse open Goodshift postings in customer support, reporting, administration, and operations.",
};

export default function JobsIndex() {
  return <PostingDetail posting={postings[0]} />;
}
