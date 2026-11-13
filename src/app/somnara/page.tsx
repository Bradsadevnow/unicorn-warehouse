import type { Metadata } from "next";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "Dreamwell · Rest with a return",
  description:
    "Neural pods that turn your unconscious hours into measurable output.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="somnara" />
    </main>
  );
}
