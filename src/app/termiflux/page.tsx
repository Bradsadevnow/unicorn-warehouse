import type { Metadata } from "next";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "Brightside · Make your waiting count",
  description: "Ads in your terminal. Skip them with Tokens.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="termiflux" />
    </main>
  );
}
