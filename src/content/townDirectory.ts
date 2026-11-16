import "server-only";

import type { TownGroup, TownPlace } from "@/components/town/TownNavigator";
import { allTownPreviews } from "./townPreviews";
import { zoneNames, type Zone } from "./unicornopolis";

/** Cards for every clickable place on the homepage town map. */
export const townPlaces: readonly TownPlace[] = allTownPreviews.map((preview) => ({
  id: preview.id,
  name: preview.name,
  description: preview.description,
  address: preview.address,
  district: preview.district,
  zone: zoneNames[preview.zone],
  rent: preview.rent,
  model: preview.model,
  href: preview.href,
  openLabel: preview.openLabel,
  image: preview.image,
  careersHref: "careersHref" in preview ? preview.careersHref : undefined,
}));

const groupOrder: readonly Zone[] = ["shops", "work", "industrial", "civic", "residential"];

/** List view groups. Homes of the same plan repeat, so the list shows one address per plan. */
export const townGroups: readonly TownGroup[] = groupOrder.map((zone) => {
  const seenPlans = new Set<string>();
  const places = allTownPreviews.filter((preview) => {
    if (preview.zone !== zone) return false;
    if (!preview.model) return true;
    if (seenPlans.has(preview.model)) return false;
    seenPlans.add(preview.model);
    return true;
  });
  return { id: zone, name: zone === "residential" ? "Homes for rent" : zoneNames[zone], places: places.map(({ id }) => id) };
});

/** Shortcuts on the card before anything is selected. */
export const featuredPlaces = ["market", "funplex", "living", "goodshift", "alpine-resort"] as const;

export const townPoster = "/unicornopolis/town-preview.webp";
