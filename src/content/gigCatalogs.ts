export const helpingHandCatalog = [
  {
    category: "Public Works",
    jobs: [
      ["Log potholes along the Clover Loop", 24, "1 hour", 16],
      ["Set out lakeside cleanup supplies", 18, "45 minutes", 12],
      ["Restock the fire hall supply room", 20, "45 minutes", 13],
      ["Sort lost-property tags", 17, "30 minutes", 9],
    ],
  },
  {
    category: "Construction",
    jobs: [
      ["Carry materials to the upper floors", 29, "1 hour", 18],
      ["Direct traffic at the site entrance", 18, "30 minutes", 10],
      ["Sweep the site at close", 15, "30 minutes", 7],
    ],
  },
  {
    category: "Funplex",
    jobs: [
      ["Clear lanes between games", 16, "30 minutes", 8],
      ["Retrieve balls from the water hazard", 13, "30 minutes", 6],
      ["Sweep a theater between features", 11, "25 minutes", 5],
      ["Staff the Prize Counter", 24, "1 hour", 14],
    ],
  },
  {
    category: "Everair Alpine Lodge",
    jobs: [
      ["Refill canisters at the Lodge", 23, "1 hour", 14],
      ["Set out seasonal blend samples", 14, "30 minutes", 7],
    ],
  },
  {
    category: "Neighborhood clinics",
    jobs: [
      ["Set out clinic welcome packets", 15, "30 minutes", 7],
      ["Reset an exam room", 17, "30 minutes", 8],
    ],
  },
  {
    category: "Rental homes",
    jobs: [
      ["Set up a rental tour", 19, "45 minutes", 12],
      ["Prepare a unit for inspection", 24, "1 hour", 15],
      ["Photograph a unit before move-out", 23, "45 minutes", 14],
      ["Verify listing measurements", 18, "30 minutes", 10],
    ],
  },
  {
    category: "Auto dealership",
    jobs: [
      ["Prepare a showroom vehicle", 16, "30 minutes", 8],
      ["Photograph a trade-in", 22, "45 minutes", 12],
      ["Sort incoming parts", 20, "45 minutes", 12],
    ],
  },
  {
    category: "Fast food",
    jobs: [
      ["Bag orders during the lunch rush", 18, "30 minutes", 9],
      ["Cover dinner rush pickup", 22, "45 minutes", 15],
      ["Stage burger orders at the grill", 20, "45 minutes", 12],
      ["Restock the condiment station", 10, "15 minutes", 3],
      ["Reset the dining room", 15, "30 minutes", 7],
    ],
  },
  {
    category: "Warehouse",
    jobs: [
      ["Unload a delivery", 14, "15 minutes", 4],
      ["Sort incoming cartons", 18, "30 minutes", 8],
      ["Stage pickup orders", 16, "30 minutes", 8],
      ["Count one aisle of stock", 24, "1 hour", 16],
      ["Receive an inbound pallet", 22, "45 minutes", 12],
      ["Pack Market orders on the line", 20, "45 minutes", 12],
    ],
  },
  {
    category: "Retail",
    jobs: [
      ["Restock the front shelves", 16, "30 minutes", 7],
      ["Set up a window display", 26, "1 hour", 16],
      ["Apply shelf labels", 12, "30 minutes", 6],
      ["Pack online orders", 20, "45 minutes", 12],
    ],
  },
  {
    category: "Events",
    jobs: [
      ["Set up tables", 24, "45 minutes", 12],
      ["Arrange chairs", 20, "30 minutes", 7],
      ["Staff the check-in desk", 32, "1 hour", 16],
      ["Welcome evening guests at Dreamwell", 20, "45 minutes", 12],
      ["Clear the room after an event", 30, "1 hour", 18],
      ["Host arrivals at the Funplex suite", 26, "1 hour", 16],
      ["Welcome guests aboard the yacht", 36, "1 hour", 20],
    ],
  },
  {
    category: "Cleaning",
    jobs: [
      ["Sweep a storefront", 12, "30 minutes", 6],
      ["Wipe down tables and counters", 14, "30 minutes", 7],
      ["Clean a break room", 18, "45 minutes", 11],
      ["Reset a fitting room", 12, "30 minutes", 7],
      ["Reset a sleep suite between sessions", 22, "45 minutes", 12],
      ["Restock the Dreamwell linen station", 16, "30 minutes", 8],
    ],
  },
  {
    category: "Deliveries and errands",
    jobs: [
      ["Collect a local supply order", 18, "1 hour", 18],
      ["Run a parcel to the mailroom", 8, "15 minutes", 3],
      ["Move boxes between departments", 15, "45 minutes", 12],
      ["Stage outgoing shipments", 22, "1 hour", 16],
    ],
  },
] as const;

export const brightsideCatalog = [
  {
    category: "Product demos",
    jobs: [
      ["Unbox the Lodge Collection", 45, "One 15-second clip", 18, "Everair"],
      ["First Impression Pack", 65, "Two 15-second clips with different opening lines", 30],
      ["Casual Countertop Demo", 55, "One 30-second clip filmed at home", 24],
    ],
  },
  {
    category: "Before and after",
    jobs: [
      ["Show us your morning face", 90, "Two 20-second clips", 42, "Dreamwell"],
      ["The Day-One Glow-Up", 110, "Three clips showing the first day of use", 54],
      ["The Repeat Customer", 85, "Two clips with a follow-up one week later", 36],
    ],
  },
  {
    category: "Sponsored shorts",
    jobs: [
      ["Make a lunch rush look easy", 70, "One 30-second clip", 30, "HelpingHand"],
      ["Look delighted at the Funplex", 82, "One 30-second reaction clip", 36, "Funplex"],
      ["Stop the Scroll", 65, "Three alternate hooks for one sponsored short", 27],
      ["Launch Day Takeover", 140, "Three 30-second shorts for launch week", 72],
    ],
  },
] as const;

export function brightsideBriefId(title: string) {
  return "brief-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
}

export const brightsideBriefs = brightsideCatalog.flatMap(({ jobs }) =>
  jobs.map(([title, , duration, payout]) => ({ id: `brightside:${brightsideBriefId(title)}`, title, duration, payout })),
);

export function getBrightsideBrief(id: string) {
  return brightsideBriefs.find((brief) => brief.id === id);
}
