import type { StaticImageData } from "next/image";
import aeroStill from "@/assets/everair-unicorn.webp";
import somnaraStill from "@/assets/dreamwell-unicorn.webp";
import sublaborixStill from "@/assets/helpinghand-unicorn.webp";
import termifluxStill from "@/assets/brightside-unicorn.webp";
import undieflowStill from "@/assets/softspace-unicorn.webp";
import demandeternalStill from "@/assets/goodshift-unicorn.webp";
import eternuityStill from "@/assets/tomorrowly-unicorn.webp";

export const productGroups = [
  { id: "personal-essentials", name: "Personal essentials", products: ["aerovitalux", "somnara", "comfortflow"] },
  { id: "work-and-attention", name: "Work and attention", products: ["sublaborix", "termiflux", "demandeternal"] },
  { id: "longevity-and-estates", name: "Longevity and estates", products: ["eternuity"] },
];

export type House = {
  slug: string;
  no: string;
  name: string;
  category: string;
  /** What the house took over, in one word. */
  domain: string;
  line: string;
  still: StaticImageData;
  /** True once the house has its own page. */
  open: boolean;
};

export const houses: House[] = [
  {
    slug: "aerovitalux",
    no: "01",
    name: "Everair",
    category: "Fresh air, on schedule",
    domain: "Breath",
    line: "Every breath, a little better.",
    still: aeroStill,
    open: true,
  },
  {
    slug: "somnara",
    no: "02",
    name: "Dreamwell",
    category: "Rest with a return",
    domain: "Sleep",
    line: "Make room for a better night.",
    still: somnaraStill,
    open: true,
  },
  {
    slug: "sublaborix",
    no: "03",
    name: "HelpingHand",
    category: "Help by the minute",
    domain: "Labor",
    line: "A little help goes a long way.",
    still: sublaborixStill,
    open: true,
  },
  {
    slug: "termiflux",
    no: "04",
    name: "Brightside",
    category: "Make your waiting count",
    domain: "Attention",
    line: "Make every moment count.",
    still: termifluxStill,
    open: true,
  },
  {
    slug: "comfortflow",
    no: "05",
    name: "Softspace",
    category: "Relief that renews",
    domain: "Comfort",
    line: "Find your kind of comfortable.",
    still: undieflowStill,
    open: true,
  },
  {
    slug: "demandeternal",
    no: "06",
    name: "Goodshift",
    category: "A little more shift in your day",
    domain: "Demand",
    line: "Work that works for you.",
    still: demandeternalStill,
    open: true,
  },
  {
    slug: "eternuity",
    no: "07",
    name: "Tomorrowly",
    category: "More time, renewed quarterly",
    domain: "Mortality",
    line: "A brighter future starts today.",
    still: eternuityStill,
    open: true,
  },
];
