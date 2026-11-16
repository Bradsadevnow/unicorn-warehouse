import type { StaticImageData } from "next/image";
import aeroStill from "@/assets/everair-unicorn.webp";
import somnaraStill from "@/assets/dreamwell-unicorn.webp";
import sublaborixStill from "@/assets/helpinghand-unicorn.webp";
import brightsideStill from "@/assets/brightside-creator.webp";
import undieflowStill from "@/assets/softspace-unicorn.webp";
import demandeternalStill from "@/assets/goodshift-unicorn.webp";
import funplexStill from "@/assets/funplex-home.webp";
import dispatchStill from "@/assets/dispatch-store.webp";
import quickserveStill from "@/assets/quickserve-home.webp";
import marketStill from "@/assets/market-unicorn.webp";

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

export const market = {
  slug: "market",
  name: "Unicorn Warehouse Market",
  category: "Groceries and household essentials",
  domain: "Market",
  line: "Everyday essentials, all payable in Tokens.",
  still: marketStill,
  open: true,
};

export const funplex = {
  slug: "funplex",
  name: "Unicorn Warehouse Funplex",
  category: "Arcade, games, and dining",
  domain: "Recreation",
  line: "A night out. All in one place.",
  still: funplexStill,
  open: true,
};

export const quickserve = {
  slug: "quickserve",
  name: "Horn & Fries",
  category: "Burgers, fries, and shakes",
  domain: "Dining",
  line: "Good food. Right now.",
  still: quickserveStill,
  open: true,
};

export const dispatch = {
  slug: "dispatch",
  name: "Unicorn Warehouse Dispatch",
  category: "Local delivery and errands",
  domain: "Delivery",
  line: "Right to your door.",
  still: dispatchStill,
  open: true,
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
    category: "The first three seconds count",
    domain: "Attention",
    line: "Make every moment count.",
    still: brightsideStill,
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
];
