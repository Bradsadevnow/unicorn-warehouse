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
  /** Work available to members here, by the board that lists it. */
  readonly gigs: readonly { title: string; tokens: number; board: "HelpingHand" | "Goodshift" | "Brightside" }[];
  /** The corporate role here and its rung on the careers ladder (1 to 5). */
  readonly role: { title: string; rung: number };
  readonly policy: string;
  /** How this business works with the rest of the Portfolio. */
  readonly connections: readonly string[];
};

export const businessBasePath = "/businesses";

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
    gigs: [
      { title: "Restock the front shelves", tokens: 24, board: "HelpingHand" },
      { title: "Set up a window display", tokens: 34, board: "HelpingHand" },
      { title: "Apply shelf labels", tokens: 14, board: "HelpingHand" },
      { title: "Pack online orders", tokens: 26, board: "HelpingHand" },
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
    gigs: [
      { title: "Refill canisters at the Lodge", tokens: 26, board: "HelpingHand" },
      { title: "Unbox the Lodge Collection", tokens: 60, board: "Brightside" },
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
    gigs: [
      { title: "Reset a sleep suite between sessions", tokens: 20, board: "HelpingHand" },
      { title: "Show us your morning face", tokens: 125, board: "Brightside" },
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
    gigs: [
      { title: "Make a lunch rush look easy", tokens: 90, board: "Brightside" },
      { title: "Stop the Scroll", tokens: 75, board: "Brightside" },
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
    name: "Unicorn Warehouse Quickserve",
    industry: "Quick-service restaurants",
    icon: "🍔",
    tone: "butter",
    tagline: "Every second counts.",
    summary: "Hot meals in under three minutes, served with the approved level of delight at every counter.",
    status: "Opening soon",
    gigs: [
      { title: "Bag orders during the lunch rush", tokens: 24, board: "HelpingHand" },
      { title: "Cover dinner rush pickup", tokens: 30, board: "HelpingHand" },
      { title: "Restock the condiment station", tokens: 10, board: "HelpingHand" },
      { title: "Reset the dining room", tokens: 18, board: "HelpingHand" },
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
    status: "Opening soon",
    gigs: [
      { title: "Unload a delivery", tokens: 12, board: "HelpingHand" },
      { title: "Sort incoming cartons", tokens: 22, board: "HelpingHand" },
      { title: "Stage pickup orders", tokens: 20, board: "HelpingHand" },
      { title: "Count one aisle of stock", tokens: 30, board: "HelpingHand" },
    ],
    role: { title: "Pick Rate Encouragement Lead", rung: 4 },
    policy: "Time away from your station is recorded as Time Off Task. Time Off Task is available during scheduled breaks.",
    connections: [
      "Supplies Market, Quickserve, and every Lodge Collection order.",
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
    status: "Opening soon",
    gigs: [
      { title: "Collect a local supply order", tokens: 24, board: "HelpingHand" },
      { title: "Run a parcel to the mailroom", tokens: 8, board: "HelpingHand" },
      { title: "Move boxes between departments", tokens: 18, board: "HelpingHand" },
      { title: "Stage outgoing shipments", tokens: 28, board: "HelpingHand" },
    ],
    role: { title: "Last Mile Gratitude Coordinator", rung: 2 },
    policy: "A delivery payout covers the delivery. Travel to the pickup and travel home are the courier’s own time.",
    connections: [
      "Carries orders from Fulfillment, Market, and Quickserve.",
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
    status: "Opening soon",
    gigs: [
      { title: "Set up tables", tokens: 36, board: "HelpingHand" },
      { title: "Arrange chairs", tokens: 24, board: "HelpingHand" },
      { title: "Staff the check-in desk", tokens: 42, board: "HelpingHand" },
      { title: "Clear the room after an event", tokens: 40, board: "HelpingHand" },
    ],
    role: { title: "Guest Delight Captain", rung: 3 },
    policy: "An event ends when the last guest leaves. An assignment ends at its scheduled time.",
    connections: [
      "Hosts the quarterly herd gathering. Attendance is required.",
      "Catering is provided by Quickserve.",
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
    status: "Opening soon",
    gigs: [
      { title: "Carry materials to the upper floors", tokens: 32, board: "HelpingHand" },
      { title: "Direct traffic at the site entrance", tokens: 20, board: "HelpingHand" },
      { title: "Sweep the site at close", tokens: 14, board: "HelpingHand" },
      { title: "Update the completion schedule", tokens: 75, board: "Goodshift" },
    ],
    role: { title: "Structural Optimism Foreman", rung: 4 },
    policy: "Safety equipment is available to rent at the site office. The rental is deducted from the day’s payout. A safety briefing is held before each shift, and attendance is recorded as understanding.",
    connections: [
      "Builds the homes rented by Unicorn Warehouse Living and valued by Unicorn Warehouse Homes.",
      "A completion date is an estimate. Shifts are scheduled to the estimate.",
    ],
  },
  {
    slug: "living",
    name: "Unicorn Warehouse Living",
    industry: "Rental homes",
    icon: "🏢",
    tone: "lilac",
    tagline: "Home, renewed monthly.",
    summary: "Comfortable rental homes close to the places members work, with everything billed to one account.",
    status: "Opening soon",
    gigs: [
      { title: "Prepare a unit for inspection", tokens: 28, board: "HelpingHand" },
      { title: "Clean a break room", tokens: 22, board: "HelpingHand" },
      { title: "Wipe down tables and counters", tokens: 16, board: "HelpingHand" },
      { title: "Sweep a storefront", tokens: 12, board: "HelpingHand" },
    ],
    role: { title: "Resident Retention Specialist", rung: 3 },
    policy: "Security deposits are returned as Portfolio Tokens following reconciliation.",
    connections: [
      "Rent is payable in Tokens from your Unicorn Warehouse Bank account.",
      "Homes are listed and valued by Unicorn Warehouse Homes.",
    ],
  },
  {
    slug: "homes",
    name: "Unicorn Warehouse Homes",
    industry: "Home listings and valuations",
    icon: "🏡",
    tone: "mint",
    tagline: "Every home has a number.",
    summary: "Browse homes near you, see what yours is worth today, and receive an offer whenever you’re ready.",
    status: "Opening soon",
    gigs: [
      { title: "Photograph a unit before move-out", tokens: 26, board: "HelpingHand" },
      { title: "Verify listing measurements", tokens: 18, board: "HelpingHand" },
      { title: "Review valuation appeals", tokens: 85, board: "Goodshift" },
    ],
    role: { title: "Valuation Confidence Analyst", rung: 3 },
    policy: "A home’s displayed value is an estimate. An offer from Unicorn Warehouse Homes is based on a separate estimate.",
    connections: [
      "Homes purchased by Unicorn Warehouse Homes are rented by Unicorn Warehouse Living.",
      "Valuations consider the household’s projected economic contribution.",
    ],
  },
  {
    slug: "bank",
    name: "Unicorn Warehouse Bank",
    industry: "Token banking",
    icon: "🏦",
    tone: "butter",
    tagline: "Your Tokens, safe with us.",
    summary: "Checking, savings, and advances for the Tokens you’ve earned, all in the account you already have.",
    status: "Opening soon",
    gigs: [
      { title: "Review overdraft appeals", tokens: 80, board: "Goodshift" },
      { title: "Reconcile held balances", tokens: 110, board: "Goodshift" },
    ],
    role: { title: "Balance Preservation Associate", rung: 2 },
    policy: "Savings earn interest in Sparkle. Sparkle reflects how much your Tokens are appreciated and is not redeemable.",
    connections: [
      "Payouts from Goodshift, HelpingHand, and Brightside are deposited here after acceptance.",
      "Advances settle against future earnings before those earnings are available.",
    ],
  },
  {
    slug: "motorworks",
    name: "Unicorn Warehouse Motorworks",
    industry: "Auto service and repair",
    icon: "🔧",
    tone: "peach",
    tagline: "Care for every mile.",
    summary: "Inspections, maintenance, and repairs from technicians who look at everything, every visit.",
    status: "Opening soon",
    gigs: [
      { title: "Sort incoming parts", tokens: 22, board: "HelpingHand" },
      { title: "Call customers about recommended services", tokens: 70, board: "Goodshift" },
    ],
    role: { title: "Preventive Revenue Technician", rung: 3 },
    policy: "A diagnostic fee confirms that a diagnosis was attempted.",
    connections: [
      "Services the vehicles Dispatch couriers supply.",
      "Repairs may be financed by Unicorn Warehouse Bank.",
    ],
  },
  {
    slug: "wellness",
    name: "Unicorn Warehouse Wellness",
    industry: "Clinics and coverage",
    icon: "🩺",
    tone: "sky",
    tagline: "Your health is our priority.",
    summary: "Neighborhood clinics and member coverage, coordinated with everything else we know about your day.",
    status: "Opening soon",
    gigs: [
      { title: "Reconcile appointment records", tokens: 30, board: "Goodshift" },
      { title: "Reset an exam room", tokens: 16, board: "HelpingHand" },
    ],
    role: { title: "Patient Journey Optimization Associate", rung: 2 },
    policy: "Patient satisfaction is measured after eligibility verification.",
    connections: [
      "Coverage decisions consider Everair breathing history and Dreamwell sleep activity.",
      "Former Tomorrowly policies are administered here.",
    ],
  },
];

export function getBusiness(slug: string) {
  return businesses.find((business) => business.slug === slug);
}

export function businessPath(business: Pick<Business, "slug">) {
  return `${businessBasePath}/${business.slug}`;
}
