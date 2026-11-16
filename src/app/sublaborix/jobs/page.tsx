import type { Metadata } from "next";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import PostingDetail from "./PostingDetail";

export const metadata: Metadata = {
  title: "Work near you · HelpingHand",
  description: "Browse HelpingHand shifts in retail, kitchens, warehouses, events, cleaning, and deliveries.",
};

export default function JobsIndex() {
  return <PostingDetail posting={helpingHandPostings[0]} />;
}
