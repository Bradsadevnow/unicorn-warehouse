import HomeExperience from "@/components/home/HomeExperience";
import CareersFeature from "@/components/home/CareersFeature";
import TownNavigator from "@/components/town/TownNavigator";
import { featuredPlaces, townGroups, townPlaces, townPoster } from "@/content/townDirectory";

export default function Home() {
  return (
    <main>
      <HomeExperience
        careers={<CareersFeature />}
        town={<TownNavigator places={townPlaces} groups={townGroups} featured={featuredPlaces} poster={townPoster} />}
      />
    </main>
  );
}
