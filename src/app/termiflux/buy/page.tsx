import type { Metadata } from "next";
import WorkPlatform from "@/components/WorkPlatform";

export const metadata: Metadata = {
  title: "Brightside · Buy attention",
  description: "Book creators and commission sponsored clips with Brightside.",
};

export default function Page() {
  return <WorkPlatform brand="brightside" hiring />;
}
