import HomeExperience from "@/components/home/HomeExperience";
import CareersFeature from "@/components/home/CareersFeature";
import { businessGroups } from "@/content/homeBusinesses";

export default function Home() {
  return (
    <main>
      <HomeExperience careers={<CareersFeature />} businessGroups={businessGroups} />
    </main>
  );
}
