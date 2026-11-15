import type { Metadata } from "next";
import CancellationDetails from "@/components/CancellationDetails";
import WorkPlatform from "@/components/WorkPlatform";

export const metadata: Metadata = {
  title: "Brightside · Sell content",
  description: "Make sponsored clips for brands and earn Tokens with Brightside.",
};

export default function Page() {
  return <><WorkPlatform brand="brightside" /><CancellationDetails section="brightside">Accepted payouts stay in your Token balance. Submitted takes remain available for review and training under the applicable terms.</CancellationDetails></>;
}
