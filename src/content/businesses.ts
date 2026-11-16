import { brightsideCatalog, helpingHandCatalog } from "./gigCatalogs";
import { postings as goodshiftPostings } from "./goodshiftPostings";
import { schoolCareersPath, schoolName, schoolRoles } from "./school";

export type Business = {
  readonly slug: string;
  readonly name: string;
  readonly industry: string;
  readonly icon: string;
  readonly tone: "pink" | "mint" | "lilac" | "butter" | "sky" | "peach";
  readonly tagline: string;
  readonly summary: string;
  /** Open businesses have their own experience at `href`. The rest are outlines. */
  readonly status: "Open" | "Opening soon";
  readonly href?: string;
  readonly careersHref?: string;
  /** Work available to members here, by the board that lists it. */
  readonly gigs: readonly { title: string; tokens: number; board: "HelpingHand" | "Goodshift" | "Brightside" }[];
  /** The corporate role here and its rung on the careers ladder (1 to 5). */
  readonly role: { title: string; rung: number };
  readonly policy: string;
  /** How this business works with the rest of the Portfolio. */
  readonly connections: readonly string[];
};

export const businessBasePath = "/businesses";
export const marketCareersPath = "/careers/market";
export const funplexCareersPath = "/careers/funplex";
export const everairCareersPath = "/careers/everair";
export const dreamwellCareersPath = "/careers/dreamwell";
export const brightsideCareersPath = "/careers/brightside";
export const quickserveCareersPath = "/careers/quickserve";
export const dispatchCareersPath = "/careers/dispatch";
export const fulfillmentCareersPath = "/careers/fulfillment";
export const gatheringsCareersPath = "/careers/gatherings";
export const motorworksCareersPath = "/careers/motorworks";
export const livingCareersPath = "/careers/living";

const listedGigs = {
  Brightside: new Map<string, number>(brightsideCatalog.flatMap(({ jobs }) => jobs.map(([title, , , payout]) => [title, payout] as const))),
  HelpingHand: new Map<string, number>(helpingHandCatalog.flatMap(({ jobs }) => jobs.map(([title, , , payout]) => [title, payout] as const))),
  Goodshift: new Map<string, number>(goodshiftPostings.map(({ title, payout }) => [title, payout] as const)),
};

function listedGig(board: keyof typeof listedGigs, title: string) {
  const tokens = listedGigs[board].get(title);
  if (tokens === undefined) throw new Error(`Missing ${board} listing for ${title}`);
  return { title, tokens, board };
}

export const businesses: readonly Business[] = [
  {
    slug: "market",
    name: "Unicorn Warehouse Market",
    industry: "Groceries and household essentials",
    icon: "🛒",
    tone: "mint",
    tagline: "Everyday essentials, all payable in Tokens.",
    summary: "Groceries, clean socks, and everything on your list, stocked by members and shopped by members.",
    status: "Open",
    href: "/market",
    careersHref: marketCareersPath,
    gigs: [
      listedGig("HelpingHand", "Restock the front shelves"),
      listedGig("HelpingHand", "Set up a window display"),
      listedGig("HelpingHand", "Apply shelf labels"),
      listedGig("HelpingHand", "Pack online orders"),
      listedGig("HelpingHand", "Sweep a storefront"),
      listedGig("HelpingHand", "Wipe down tables and counters"),
      listedGig("HelpingHand", "Unload a delivery"),
      listedGig("HelpingHand", "Sort incoming cartons"),
    ],
    role: { title: "Shelf Abundance Associate", rung: 2 },
    policy: "A worker who stocks a product may purchase it on the same terms as any other member. Handling the product during a shift does not reserve it or count as a deposit.",
    connections: [
      "Stocked from Unicorn Warehouse Fulfillment.",
      "Household forecasts draw on Everair, Dreamwell, and Goodshift activity.",
    ],
  },
  {
    slug: "everair",
    name: "Everair",
    industry: "Fresh air memberships",
    icon: "🏔️",
    tone: "sky",
    tagline: "Every breath, a little better.",
    summary: "Seasonal air blends and Summit Reserve from the Alpine Lodge, delivered to your mask on schedule.",
    status: "Open",
    href: "/aerovitalux",
    careersHref: everairCareersPath,
    gigs: [
      listedGig("HelpingHand", "Refill canisters at the Lodge"),
      listedGig("HelpingHand", "Set out seasonal blend samples"),
      listedGig("Goodshift", "Reconcile AirLink pairing appointments"),
      listedGig("Brightside", "Unbox the Lodge Collection"),
    ],
    role: { title: "Respiratory Experience Associate", rung: 2 },
    policy: "Air breathed during a shift at the Lodge is metered to the account of the unicorn breathing it.",
    connections: [
      "Ideas formed on metered air are shared with Everair at 10%.",
      "Breathing data informs Market household forecasts.",
    ],
  },
  {
    slug: "dreamwell",
    name: "Dreamwell",
    industry: "Sleep by the hour",
    icon: "🌙",
    tone: "lilac",
    tagline: "Make room for a better night.",
    summary: "Rest sessions from a nap to a full night, in suites prepared fresh between every guest.",
    status: "Open",
    href: "/somnara",
    careersHref: dreamwellCareersPath,
    gigs: [
      listedGig("HelpingHand", "Reset a sleep suite between sessions"),
      listedGig("HelpingHand", "Restock the Dreamwell linen station"),
      listedGig("HelpingHand", "Welcome evening guests at Dreamwell"),
      listedGig("Brightside", "Show us your morning face"),
    ],
    role: { title: "Rest Yield Associate", rung: 2 },
    policy: "Suites are reset to guest standard between sessions. Staff who rest in a suite they have prepared are guests for the duration.",
    connections: [
      "Longer Goodshift hours may prompt a recommendation for additional sessions.",
      "Sleep activity informs Market household forecasts.",
    ],
  },
  {
    slug: "brightside",
    name: "Brightside",
    industry: "Sponsored content",
    icon: "🎬",
    tone: "pink",
    tagline: "Make every moment count.",
    summary: "Brands post briefs, creators make clips, and every Unicorn Warehouse business has a story to tell.",
    status: "Open",
    href: "/termiflux",
    careersHref: brightsideCareersPath,
    gigs: [
      listedGig("Brightside", "Make a lunch rush look easy"),
      listedGig("Brightside", "Stop the Scroll"),
      listedGig("Brightside", "Casual Countertop Demo"),
      listedGig("Brightside", "Launch Day Takeover"),
    ],
    role: { title: "Authenticity Standards Reviewer", rung: 3 },
    policy: "A reaction is considered authentic when it meets the buyer’s authenticity guidelines.",
    connections: [
      "Every Unicorn Warehouse business may commission briefs about working there.",
      "Creator Tokens post after the buyer accepts the clip.",
    ],
  },
  {
    slug: "quickserve",
    name: "Horn & Fries",
    industry: "Quick-service restaurants",
    icon: "🍔",
    tone: "butter",
    tagline: "Every second counts.",
    summary: "Hot meals in under three minutes, served with the approved level of delight at every counter.",
    status: "Open",
    href: "/quickserve",
    careersHref: quickserveCareersPath,
    gigs: [
      listedGig("HelpingHand", "Bag orders during the lunch rush"),
      listedGig("HelpingHand", "Cover dinner rush pickup"),
      listedGig("HelpingHand", "Stage burger orders at the grill"),
      listedGig("HelpingHand", "Restock the condiment station"),
      listedGig("HelpingHand", "Reset the dining room"),
    ],
    role: { title: "Assistant Shift Happiness Manager", rung: 2 },
    policy: "Breaks are available between rushes. Rushes are defined by management.",
    connections: [
      "Meals are payable in Tokens, including Tokens earned on the same shift.",
      "Ingredients arrive daily from Unicorn Warehouse Fulfillment.",
    ],
  },
  {
    slug: "fulfillment",
    name: "Unicorn Warehouse Fulfillment",
    industry: "Warehousing and delivery",
    icon: "📦",
    tone: "peach",
    tagline: "It’s on its way.",
    summary: "The warehouse behind the name. Everything a member orders passes through our floor on its way to their door.",
    status: "Open",
    href: "/fulfillment",
    careersHref: fulfillmentCareersPath,
    gigs: [
      listedGig("HelpingHand", "Receive an inbound pallet"),
      listedGig("HelpingHand", "Pack Market orders on the line"),
      listedGig("HelpingHand", "Stage pickup orders"),
      listedGig("HelpingHand", "Count one aisle of stock"),
    ],
    role: { title: "Pick Rate Encouragement Lead", rung: 4 },
    policy: "Time away from your station is recorded as Time Off Task. Time Off Task is available during scheduled breaks.",
    connections: [
      "Supplies Market, Horn & Fries, and every Lodge Collection order.",
      "The floor’s pick rate is set each week by its fastest unicorn.",
    ],
  },
  {
    slug: "dispatch",
    name: "Unicorn Warehouse Dispatch",
    industry: "Local delivery and errands",
    icon: "🛵",
    tone: "sky",
    tagline: "Right to your door.",
    summary: "Parcels, supply runs, and same-day errands carried by members in your neighborhood.",
    status: "Open",
    href: "/dispatch",
    careersHref: dispatchCareersPath,
    gigs: [
      listedGig("HelpingHand", "Collect a local supply order"),
      listedGig("HelpingHand", "Run a parcel to the mailroom"),
      listedGig("HelpingHand", "Move boxes between departments"),
      listedGig("HelpingHand", "Stage outgoing shipments"),
    ],
    role: { title: "Last Mile Gratitude Coordinator", rung: 2 },
    policy: "A delivery payout covers the delivery. Travel to the pickup and travel home are the courier’s own time.",
    connections: [
      "Carries orders from Fulfillment, Market, and Horn & Fries.",
      "Couriers supply their own vehicle, serviced at Unicorn Warehouse Motorworks.",
    ],
  },
  {
    slug: "gatherings",
    name: "Unicorn Warehouse Gatherings",
    industry: "Events and venues",
    icon: "🎪",
    tone: "pink",
    tagline: "Moments worth gathering for.",
    summary: "Venues, setup, and staff for celebrations of every size, including the quarterly herd gathering.",
    status: "Open",
    href: "/gatherings",
    careersHref: gatheringsCareersPath,
    gigs: [
      listedGig("HelpingHand", "Set up tables"),
      listedGig("HelpingHand", "Arrange chairs"),
      listedGig("HelpingHand", "Staff the check-in desk"),
      listedGig("HelpingHand", "Clear the room after an event"),
      listedGig("HelpingHand", "Host arrivals at the Funplex suite"),
      listedGig("HelpingHand", "Welcome guests aboard the yacht"),
    ],
    role: { title: "Guest Delight Captain", rung: 3 },
    policy: "An event ends when the last guest leaves. An assignment ends at its scheduled time.",
    connections: [
      "Hosts the quarterly herd gathering. Attendance is required.",
      "Catering is provided by Horn & Fries.",
    ],
  },
  {
    slug: "funplex",
    name: "Unicorn Warehouse Funplex",
    industry: "Recreation and entertainment",
    icon: "🎳",
    tone: "pink",
    tagline: "All your fun, in one place.",
    summary: "Bowling, mini golf, movies, go-karts, an arcade, and laser tag under one roof. The designated recreation venue for every member.",
    status: "Open",
    href: "/funplex",
    careersHref: funplexCareersPath,
    gigs: [
      listedGig("HelpingHand", "Clear lanes between games"),
      listedGig("HelpingHand", "Retrieve balls from the water hazard"),
      listedGig("HelpingHand", "Sweep a theater between features"),
      listedGig("HelpingHand", "Staff the Prize Counter"),
      listedGig("Brightside", "Look delighted at the Funplex"),
    ],
    role: { title: "Fun Compliance Host", rung: 2 },
    policy: "A scheduled Fun Hour is billed at its check-in time whether or not the member checks in.",
    connections: [
      "Sleep during a feature at Starlight Cinema is billed by Dreamwell as a rest session.",
      "The Snack Stable is catered by Horn & Fries, and party rooms are run by Gatherings.",
    ],
  },
  {
    slug: "construction",
    name: "Unicorn Warehouse Construction",
    industry: "Building and site work",
    icon: "🏗️",
    tone: "peach",
    tagline: "Building what comes next.",
    summary: "Homes, warehouses, and storefronts for the whole family of businesses, raised on schedule by members on site.",
    status: "Open",
    href: "/construction",
    careersHref: "/careers/construction",
    gigs: [
      listedGig("HelpingHand", "Carry materials to the upper floors"),
      listedGig("HelpingHand", "Direct traffic at the site entrance"),
      listedGig("HelpingHand", "Sweep the site at close"),
      listedGig("Goodshift", "Update the completion schedule"),
    ],
    role: { title: "Structural Optimism Foreman", rung: 4 },
    policy: "Safety equipment is available to rent at the site office. The rental is deducted from the day’s payout. A safety briefing is held before each shift, and attendance is recorded as understanding.",
    connections: [
      "Builds the homes rented by Unicorn Warehouse Living and valued by its Homes team.",
      "A completion date is an estimate. Shifts are scheduled to the estimate.",
    ],
  },
  {
    slug: "living",
    name: "Unicorn Warehouse Living",
    industry: "Rental homes",
    icon: "🏢",
    tone: "lilac",
    tagline: "Feel right at home.",
    summary: "Rental homes from sunny furnished rooms to garden residences, with rent paid in Tokens.",
    status: "Open",
    href: "/living",
    careersHref: livingCareersPath,
    gigs: [
      listedGig("HelpingHand", "Set up a rental tour"),
      listedGig("HelpingHand", "Prepare a unit for inspection"),
      listedGig("HelpingHand", "Photograph a unit before move-out"),
      listedGig("HelpingHand", "Verify listing measurements"),
      listedGig("Goodshift", "Review valuation appeals"),
    ],
    role: { title: "Resident Retention Specialist", rung: 3 },
    policy: "Security deposits are returned as Portfolio Tokens following reconciliation.",
    connections: [
      "Rent is payable in Tokens from your Unicorn Warehouse Bank account.",
      "Living’s Homes team acquires and values properties for the rental portfolio.",
      "Select residences support dedicated Softspace profiles.",
    ],
  },
  {
    slug: "motorworks",
    name: "Unicorn Warehouse Motors",
    industry: "Auto sales, financing, and service",
    icon: "🚗",
    tone: "peach",
    tagline: "Good things are down the road.",
    summary: "Find your next vehicle, arrange payments through the Bank, and bring it back to Motorworks for service.",
    status: "Open",
    href: "/motorworks",
    careersHref: motorworksCareersPath,
    gigs: [
      listedGig("HelpingHand", "Prepare a showroom vehicle"),
      listedGig("HelpingHand", "Photograph a trade-in"),
      listedGig("HelpingHand", "Sort incoming parts"),
      listedGig("Goodshift", "Call customers about recommended services"),
    ],
    role: { title: "Preventive Revenue Technician", rung: 3 },
    policy: "A diagnostic fee confirms that a diagnosis was attempted.",
    connections: [
      "Services the vehicles Dispatch couriers supply.",
      "Unicorn Warehouse Bank finances vehicle purchases and eligible repairs. Payments draw from Everyday Tokens.",
    ],
  },
  {
    slug: "wellness",
    name: "Unicorn Warehouse Wellness",
    industry: "Neighborhood clinics and subscriptions",
    icon: "🩺",
    tone: "sky",
    tagline: "Your health is our priority.",
    summary: "Neighborhood clinics, renewable care plans, and a familiar team for your next visit.",
    status: "Open",
    href: "/wellness",
    careersHref: "/careers/wellness",
    gigs: [
      listedGig("Goodshift", "Reconcile appointment records"),
      listedGig("HelpingHand", "Reset an exam room"),
      listedGig("HelpingHand", "Set out clinic welcome packets"),
    ],
    role: { title: "Patient Journey Optimization Associate", rung: 2 },
    policy: "Patient satisfaction is measured after eligibility verification.",
    connections: [
      "Coverage decisions consider Everair breathing history and Dreamwell sleep activity.",
      "Former Tomorrowly policies are administered here.",
    ],
  },
  {
    slug: "school",
    name: schoolName,
    industry: "K–12 education",
    icon: "🌱",
    tone: "mint",
    tagline: "A little room to grow.",
    summary: "A welcoming neighborhood school for kindergarten through grade twelve.",
    status: "Open",
    href: "/school",
    careersHref: schoolCareersPath,
    gigs: [],
    role: { title: schoolRoles[0].title, rung: 3 },
    policy: "Every student belongs here.",
    connections: [],
  },
  {
    slug: "public-works",
    name: "Unicornopolis Public Works",
    industry: "Town maintenance and civic memberships",
    icon: "🚧",
    tone: "butter",
    tagline: "We keep this town adorable.",
    summary: "Meet the road, shoreline, fire hall, and neighborhood police teams.",
    status: "Open",
    href: "/public-works",
    careersHref: "/careers/public-works",
    gigs: [
      listedGig("HelpingHand", "Log potholes along the Clover Loop"),
      listedGig("HelpingHand", "Set out lakeside cleanup supplies"),
      listedGig("HelpingHand", "Restock the fire hall supply room"),
      listedGig("HelpingHand", "Sort lost-property tags"),
    ],
    role: { title: "Neighborhood Readiness Coordinator", rung: 3 },
    policy: "The department that opens a record is responsible for maintaining its version of that record.",
    connections: ["Maintains the Clover Loop stops and the Clover Lake shoreline."],
  },
];

export function getBusiness(slug: string) {
  return businesses.find((business) => business.slug === slug);
}

export function businessPath(business: Pick<Business, "slug" | "careersHref">) {
  return business.careersHref ?? `${businessBasePath}/${business.slug}`;
}
