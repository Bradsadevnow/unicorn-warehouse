import type { Metadata } from "next";
import Link from "next/link";
import { dreamwellCareersPath } from "@/content/businesses";
import CancellationDetails from "@/components/CancellationDetails";
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
      <CancellationDetails section="dreamwell">You can use booked sessions through the end of your billing period. Dream Retention access ends with your membership. Your final productivity briefing stays in your account.</CancellationDetails>
      <footer style={{ padding: "24px var(--gutter)" }}>
        <p><Link href="/quests/horn-fitting?stop=dreamwell#quest-counter">Visit the Rest Desk →</Link></p>
        <p><Link href={dreamwellCareersPath}>Work at Dreamwell →</Link></p>
      </footer>
    </main>
  );
}
