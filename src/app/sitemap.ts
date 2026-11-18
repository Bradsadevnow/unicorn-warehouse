import type { MetadataRoute } from "next";
import { roles } from "@/content/careers";
import { tracks } from "@/content/careerTracks";
import { postings } from "@/content/goodshiftPostings";
import { executives } from "@/content/governance";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import { siteUrl } from "./siteUrl";

/** Pages with their own content. Routes that only redirect (/, /bank, /businesses, and others) are left out. */
const pages = [
  "/home", "/welcome", "/careers", "/tokens", "/redemption", "/market", "/funplex", "/terms", "/product-details", "/governance",
  "/aerovitalux", "/aerovitalux/lodge-collection", "/alpine-resort", "/alpine-resort/casino", "/somnara", "/comfortflow",
  "/demandeternal", "/demandeternal/hire", "/demandeternal/jobs", "/sublaborix", "/sublaborix/hire", "/sublaborix/jobs",
  "/termiflux", "/termiflux/buy", "/quickserve", "/fulfillment", "/dispatch", "/gatherings", "/construction", "/living",
  "/motorworks", "/wellness", "/school", "/public-works", "/flock",
  "/careers/brightside", "/careers/construction", "/careers/dispatch", "/careers/dreamwell", "/careers/everair",
  "/careers/fulfillment", "/careers/funplex", "/careers/gatherings", "/careers/living", "/careers/market",
  "/careers/motorworks", "/careers/public-works", "/careers/quickserve", "/careers/school", "/careers/wellness",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...pages,
    ...roles.map(({ slug }) => `/careers/${slug}`),
    ...tracks.map(({ id }) => `/careers/tracks/${id}`),
    ...executives.map(({ slug }) => `/governance/${slug}`),
    ...postings.map(({ slug }) => `/demandeternal/jobs/${slug}`),
    ...helpingHandPostings.map(({ slug }) => `/sublaborix/jobs/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path.includes("/jobs/") ? "weekly" : "monthly",
    priority: path === "/home" ? 1 : path.includes("/jobs/") ? 0.4 : 0.7,
  }));
}
