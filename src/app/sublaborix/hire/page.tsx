import type { Metadata } from "next";
import WorkPlatform from "@/components/WorkPlatform";

export const metadata: Metadata = {
  title: "HelpingHand · Hire help",
  description: "Book local hands-on help for loading, stocking, and setup.",
};

export default function Page() {
  return <WorkPlatform brand="helpinghand" hiring />;
}
