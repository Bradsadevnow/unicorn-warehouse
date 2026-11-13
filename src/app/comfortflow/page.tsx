import type { Metadata } from "next";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "Softspace · Relief that renews",
  description: "A small implant that adjusts your comfort as your day changes.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="comfortflow" />
    </main>
  );
}
