import type { Metadata } from "next";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "Goodshift · A little more shift in your day",
  description: "Clock in to simulated work. Earn Tokens. Keep humanity buying, forever.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="demandeternal" />
    </main>
  );
}
