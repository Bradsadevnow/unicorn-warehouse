import "server-only";

import type { StaticImageData } from "next/image";
import resortArt from "@/assets/alpine-resort-hero.webp";
import casinoArt from "@/assets/alpine-casino-lounge.webp";
import lodgeArt from "@/assets/everair-alpine-hq.webp";
import bankArt from "@/assets/tokens-save.webp";
import flockArt from "@/assets/flock-hero.webp";
import orchardArt from "@/assets/gatherings-orchard.webp";
import goldArt from "@/assets/gatherings-gold.webp";
import yachtArt from "@/assets/gatherings-yacht.webp";
import { alpineResortName } from "./alpineResort";
import { businesses } from "./businesses";
import { venues } from "./gatherings";
import { businessGroups } from "./homeBusinesses";
import { getStarterHome, rentals } from "./living";
import { townLots, type Zone } from "./unicornopolis";
import { wellnessClinics } from "./wellness";

export type TownPreview = {
  id: string;
  name: string;
  description: string;
  address: string;
  district: string | undefined;
  zone: Zone;
  model?: string;
  rent?: number;
  href: string;
  openLabel: string;
  image?: StaticImageData | string;
  careersHref?: string;
  entrance: (typeof townLots)[number]["entrance"];
};

const rentFrom = (id: string) => `${getStarterHome(id)!.weeklyRent} Tokens a week.`;
const directoryByPath = new Map(businessGroups.flatMap(({ businesses: entries }) => [...entries]).map((entry) => [entry.href, entry]));
const businessByPath = new Map(businesses.flatMap((business) => business.href ? [[business.href, business] as const] : []));
const options: Record<string, { image?: StaticImageData; description: string; name?: string; openLabel?: string }> = {
  "alpine-lodge": { image: lodgeArt, name: "Everair Alpine Lodge", description: "Seasonal blends, premium oxygen, and dinner on a shelf above town." },
  "alpine-resort": { image: resortArt, name: alpineResortName, description: "Rooms, chairlifts, and the complimentary heated walkway between the hotel, casino, and spa." },
  "bank": { image: bankArt, description: "Everyday Tokens, Sparkle Savings, and financing for a new set of wheels. Your Tokens are already here." },
  "clover-cloud": { image: flockArt, description: "Clover Cloud runs Flock, the employee benefit that helps your people know you made it home." },
  "marina": { image: yachtArt, description: "A public waterfront path, a weekend bus stop, and The Vesting Period at Berth 01.", openLabel: "See town information" },
  "glass-orchard": { image: orchardArt, description: venues.find(({ id }) => id === "glass-orchard")!.description },
  "gold-room": { image: goldArt, description: venues.find(({ id }) => id === "gold-room")!.description },
  "depot-clinic": { description: `${wellnessClinics[1].name} offers routine check-ins, mobility reviews, and breathing support.` },
  "garden-pavilion": { description: `${wellnessClinics[2].name} offers digestive support, recovery, and care planning.` },
  "motorworks": { description: "Service bays for inspections, repairs, and everything the technician finds while you’re there." },
  "motors-showroom": { description: "Compare vehicles and take a look at what the Bank can do for your next monthly payment." },
  "town-hall": { description: "Find street closures, school concerts, marina notices, and lost cats on the town bulletin board.", openLabel: "See town information" },
  "clover-commons": { description: "A public lawn, a loop path, and shaded picnic tables between Market Square and Clover Lake.", openLabel: "See town information" },
  "starter-bunkhouse": { description: `Twelve bunks to a room, one washroom, and a lights-out schedule that follows the Goodshift calendar. ${rentFrom("bunkhouse")}`, openLabel: "View starter homes" },
  "starter-shed": { description: `A garden studio behind The Garden Residence, with a lawn view and morning hose access. ${rentFrom("potting-shed")}`, openLabel: "View starter homes" },
  "police": { description: "The little blue-roofed station with flowerpots and a counter for lost property." },
  "fire-rescue": { description: "Three apparatus bays and the fire and rescue crews, just past the water tower." },
};

export const townPreviews: readonly TownPreview[] = townLots.map((lot) => {
  const path = lot.href.split("#")[0];
  const entry = directoryByPath.get(path);
  const business = businessByPath.get(path);
  const rental = rentals.find(({ id }) => id === lot.model);
  const custom = options[lot.id];
  return {
    id: lot.id,
    name: custom?.name ?? lot.name,
    description: rental?.description ?? custom?.description ?? business?.summary ?? entry?.line ?? "View this address and its local services.",
    district: lot.district,
    zone: lot.zone,
    address: lot.address,
    entrance: lot.entrance,
    model: lot.model,
    rent: lot.rent,
    href: rental ? `/living#rental-${rental.id}` : lot.href,
    image: rental ? `/living/${rental.id}.webp` : custom?.image ?? entry?.still,
    openLabel: rental ? "View rental listing" : custom?.openLabel ?? `Visit ${custom?.name ?? lot.name}`,
    careersHref: rental ? undefined : business?.careersHref,
  };
});

const resort = townPreviews.find(({ id }) => id === "alpine-resort")!;

export const allTownPreviews = [
  ...townPreviews,
  {
    id: "alpine-casino",
    name: "The Gilded House",
    description: "Chips’ burgundy-and-brass gaming rooms, just off the Grand Hotel’s heated walkway.",
    district: "Grand Alpine Resort",
    zone: "shops",
    address: "Grand Alpine Resort · Casino wing",
    entrance: resort.entrance,
    href: "/alpine-resort/casino",
    image: casinoArt,
    openLabel: "Enter the casino",
  },
] satisfies readonly TownPreview[];
