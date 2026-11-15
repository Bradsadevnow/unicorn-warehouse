import type { Metadata } from "next";
import WorkPlatform from "@/components/WorkPlatform";

export const metadata: Metadata = {
  title: "Goodshift · Hire help",
  description: "Find office support for deadlines, reporting, and busy inboxes.",
};

export default function Page() {
  return <WorkPlatform brand="goodshift" hiring />;
}
