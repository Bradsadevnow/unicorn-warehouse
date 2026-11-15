import type { Metadata } from "next";
import CancellationDetails from "@/components/CancellationDetails";
import HouseExperience from "@/components/house/HouseExperience";

export const metadata: Metadata = {
  title: "Softspace · Relief that renews",
  description: "Go a degree warmer or cooler with Softspace. Redeem Tokens for single adjustments or temperature bundles.",
};

export default function Page() {
  return (
    <main>
      <HouseExperience slug="comfortflow" />
      <CancellationDetails section="softspace">Your current setting stays in place. New adjustments require Tokens, and implant removal can be scheduled separately.</CancellationDetails>
    </main>
  );
}
