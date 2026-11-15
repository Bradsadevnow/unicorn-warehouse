import type { Metadata } from "next";
import CancellationDetails from "@/components/CancellationDetails";
import WorkPlatform from "@/components/WorkPlatform";

export const metadata: Metadata = {
  title: "HelpingHand · Help by the minute",
  description: "Find hands-on loading, stocking, and setup work in 15-minute blocks.",
};

export default function Page() {
  return <><WorkPlatform brand="helpinghand" /><CancellationDetails section="work">New offers stop after your end of shift is recorded. Accepted assignments remain on your schedule until handoff.</CancellationDetails></>;
}
