import type { Metadata } from "next";
import CancellationDetails from "@/components/CancellationDetails";
import WorkPlatform from "@/components/WorkPlatform";

export const metadata: Metadata = {
  title: "Goodshift · A little more shift in your day",
  description: "Find office shifts in administration, reporting, and customer support.",
};

export default function Page() {
  return <><WorkPlatform brand="goodshift" /><CancellationDetails section="goodshift">You can stop taking new assignments after your current handoff. Follow-up meetings remain separate orders.</CancellationDetails></>;
}
