import type { Metadata } from "next";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "HelpingHand · Help by the minute",
  description: "Find help for a busy day, or pick up a task when you have time.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="sublaborix" />
    </main>
  );
}
