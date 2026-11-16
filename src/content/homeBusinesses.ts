import type { StaticImageData } from "next/image";
import constructionArt from "@/assets/construction-home.webp";
import fulfillmentArt from "@/assets/fulfillment-home.webp";
import gatheringsArt from "@/assets/gatherings-home.webp";
import livingArt from "@/assets/living-home.webp";
import motorsArt from "@/assets/motorworks-home.webp";
import schoolArt from "@/assets/school-home.webp";
import wellnessArt from "@/assets/wellness-home.webp";
import publicWorksArt from "@/assets/public-works-hero.webp";
import { getBusiness } from "./businesses";
import { dispatch, funplex, houses, market, quickserve } from "./houses";

type DirectoryEntry = {
  slug: string;
  href: string;
  name: string;
  category: string;
  domain: string;
  line: string;
  still: StaticImageData;
};

const existing = new Map(
  [...houses, market, funplex, quickserve, dispatch].map((entry) => [entry.slug, entry] as const),
);

function storefront(slug: string): DirectoryEntry {
  const entry = existing.get(slug);
  if (!entry?.open) throw new Error(`Missing home storefront for ${slug}`);
  return { ...entry, href: `/${entry.slug}` };
}

function business(slug: string, domain: string, still: StaticImageData): DirectoryEntry {
  const entry = getBusiness(slug);
  if (!entry?.href || entry.status !== "Open") throw new Error(`Missing business storefront for ${slug}`);
  return {
    slug,
    href: entry.href,
    name: entry.name,
    category: entry.industry,
    domain,
    line: entry.tagline,
    still,
  };
}

export const businessGroups = [
  {
    id: "personal-essentials",
    name: "Home and essentials",
    businesses: [
      storefront("market"),
      business("living", "Housing", livingArt),
      storefront("comfortflow"),
    ],
  },
  {
    id: "health-and-wellness",
    name: "Health and wellness",
    businesses: [
      storefront("aerovitalux"),
      storefront("somnara"),
      business("wellness", "Wellness", wellnessArt),
    ],
  },
  {
    id: "food-and-fun",
    name: "Food and fun",
    businesses: [
      storefront("quickserve"),
      storefront("funplex"),
      business("gatherings", "Events", gatheringsArt),
    ],
  },
  {
    id: "work-and-attention",
    name: "Work and attention",
    businesses: [
      storefront("sublaborix"),
      storefront("demandeternal"),
      storefront("termiflux"),
    ],
  },
  {
    id: "delivery-and-trades",
    name: "Delivery and trades",
    businesses: [
      storefront("dispatch"),
      business("fulfillment", "Fulfillment", fulfillmentArt),
      business("motorworks", "Motors", motorsArt),
      business("construction", "Construction", constructionArt),
    ],
  },
  {
    id: "school-and-community",
    name: "School and community",
    businesses: [business("school", "Education", schoolArt), business("public-works", "Town services", publicWorksArt)],
  },
] as const;
