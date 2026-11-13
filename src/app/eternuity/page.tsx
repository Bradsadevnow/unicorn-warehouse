import type { Metadata } from "next";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "Tomorrowly · More time, renewed quarterly",
  description: "Keep the age you are today and share a little of your Token yield with the people you love.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="eternuity" />
    </main>
  );
}
