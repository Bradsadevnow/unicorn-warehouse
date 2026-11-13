import type { Metadata } from "next";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "Everair · Fresh air, on schedule",
  description:
    "Fresh alpine air, delivered on a schedule that suits you.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="aerovitalux" />
    </main>
  );
}
