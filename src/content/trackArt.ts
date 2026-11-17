import type { StaticImageData } from "next/image";
import brightsideTeam from "@/assets/brightside-careers.webp";
import constructionTeam from "@/assets/construction-site.webp";
import dreamwellTeam from "@/assets/dreamwell-careers.webp";
import fulfillmentTeam from "@/assets/fulfillment-careers.webp";
import funplexTeam from "@/assets/funplex-careers.webp";
import livingTeam from "@/assets/living-careers.webp";
import type { TrackId } from "./careerTracks";

/** Team art for each career track, reused from the department careers pages. */
export const trackArt: Record<TrackId, StaticImageData> = {
  "food-and-fun": funplexTeam,
  logistics: fulfillmentTeam,
  "office-and-money": livingTeam,
  "care-and-rest": dreamwellTeam,
  "trades-and-town": constructionTeam,
  creator: brightsideTeam,
};
