import type { Metadata } from "next";
import CancellationDetails from "@/components/CancellationDetails";
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
      <CancellationDetails section="everair">Scheduled deliveries end at your next billing boundary. Your remaining canisters stay paired to your account, and Everair Sync removal can be scheduled separately.</CancellationDetails>
    </main>
  );
}
