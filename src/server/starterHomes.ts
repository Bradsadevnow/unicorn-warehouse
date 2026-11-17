import "server-only";

import { starterHomes, type StarterHome } from "@/content/living";
import { blockMetres, streetRoute, townLots } from "@/content/unicornopolis";

/** Walking pace through town, in metres per minute. */
const walkingPace = 80;

const lotById = new Map(townLots.map((lot) => [lot.id, lot]));

/** Walking minutes between two town lots by road, or undefined when either lot is unknown. */
export function walkingMinutes(fromLot: string, toLot: string) {
  const from = lotById.get(fromLot);
  const to = lotById.get(toLot);
  if (!from || !to) return undefined;
  if (from.id === to.id) return 0;
  const route = streetRoute(from.entrance, to.entrance);
  return Math.max(1, Math.round((Math.max(1, route.length - 1) * blockMetres) / walkingPace));
}

/** A starter home with its street address. The Fryer Loft adds its unit to the Horn & Fries address. */
export function starterHomeAddress(home: StarterHome) {
  const lot = lotById.get(home.lotId);
  return lot ? `${lot.address}, ${home.unit}` : home.unit;
}

/** The starter homes as onboarding shows them, with the walk to each workplace. */
export function starterHomeOptions(workplaces: readonly string[]) {
  return starterHomes.map((home) => ({
    id: home.id, name: home.name, neighborhood: home.neighborhood, kind: home.kind, area: home.area,
    weeklyRent: home.weeklyRent, tagline: home.tagline, description: home.description,
    amenities: [...home.amenities], finePrint: home.finePrint, address: starterHomeAddress(home),
    walks: Object.fromEntries(workplaces.map((workplace) => [workplace, walkingMinutes(home.lotId, workplace) ?? null])),
  }));
}
