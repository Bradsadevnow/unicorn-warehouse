/**
 * Career tracks: what employees do and what they are paid.
 *
 * Every member is a Unicorn Warehouse employee with two separate records:
 * a position in one career track, which sets pay and has a manager, and a
 * horn rank (see careers.ts), which is company-wide recognition and never pay.
 * A position above entry level requires a minimum horn rank and an open vacancy.
 */

export type TrackId = "food-and-fun" | "logistics" | "office-and-money" | "care-and-rest" | "trades-and-town" | "creator";
export type PositionLevel = 1 | 2 | 3 | 4;
/** Horn rank slugs from careers.ts, lowest to highest. */
export type HornRankSlug = "unicorn-trainee" | "junior-unicorn-associate" | "senior-unicorn" | "unicorn-team-lead" | "executive-unicorn";

/** Base pay in Tokens per hour. Pay follows the position level. Horn rank does not affect pay. */
export const payByLevel: Record<PositionLevel, number> = { 1: 12, 2: 18, 3: 28, 4: 42 };

export const levelNames: Record<PositionLevel, string> = {
  1: "Entry",
  2: "Experienced",
  3: "Supervisory",
  4: "Leadership",
};

export type Position = {
  readonly id: string;
  readonly title: string;
  readonly track: TrackId;
  readonly level: PositionLevel;
  /** Business slug from businesses.ts. */
  readonly business: string;
  readonly department: string;
  readonly manager: string;
  readonly managerTitle: string;
  readonly summary: string;
  /** Lowest horn rank that may be considered for this position. */
  readonly minRank: HornRankSlug;
  /** Open seats. Most positions above entry have none, and candidates join the consideration list. */
  readonly vacancies: number;
};

export type Track = {
  readonly id: TrackId;
  readonly name: string;
  readonly tagline: string;
  readonly summary: string;
  readonly businesses: readonly string[];
  /** Mandatory day-one equipment, sold at Market. */
  readonly pathwayKit: { readonly name: string; readonly tokens: number; readonly items: readonly string[] };
  /** Business names as they appear at the start of a HelpingHand posting's site, for example "Horn & Fries · Lunch rush". */
  readonly shiftSites: readonly string[];
  /** Goodshift postings count toward this track. */
  readonly goodshift: boolean;
  /** Brightside briefs count toward this track. */
  readonly brightside: boolean;
};

export const tracks: readonly Track[] = [
  {
    id: "food-and-fun",
    name: "Food & Fun",
    tagline: "Serve the moments people remember.",
    summary: "Run the grill, the lanes, and the party rooms that keep Unicornopolis smiling, from the lunch rush to the last song of the night.",
    businesses: ["quickserve", "funplex", "gatherings"],
    pathwayKit: { name: "Food & Fun Pathway Kit", tokens: 64, items: ["Non-slip shoes", "Shift headset", "Enthusiasm lanyard"] },
    shiftSites: ["Horn & Fries", "Funplex", "Gatherings"],
    goodshift: false,
    brightside: false,
  },
  {
    id: "logistics",
    name: "Logistics",
    tagline: "Everything you need, right where it should be.",
    summary: "Receive it, stock it, pick it, pack it, and carry it the last mile. Every order in town passes through your hands.",
    businesses: ["fulfillment", "dispatch", "market"],
    pathwayKit: { name: "Logistics Pathway Kit", tokens: 72, items: ["Steel-toe sneakers", "Scanner holster", "Reflective sash"] },
    shiftSites: ["Fulfillment", "Dispatch", "Market", "Retail partner"],
    goodshift: false,
    brightside: false,
  },
  {
    id: "office-and-money",
    name: "Office & Money",
    tagline: "Keep the numbers kind.",
    summary: "Reports, balances, and leases. The work that keeps every account accurate and every home occupied.",
    businesses: ["goodshift", "bank", "living"],
    pathwayKit: { name: "Office & Money Pathway Kit", tokens: 58, items: ["Ergonomic wrist rest", "Headset with mute light", "Business-casual horn cover"] },
    shiftSites: ["Living"],
    goodshift: true,
    brightside: false,
  },
  {
    id: "care-and-rest",
    name: "Care & Rest",
    tagline: "Help every member feel their best.",
    summary: "Air, sleep, care, and learning. Look after members at the moments they need it most.",
    businesses: ["wellness", "dreamwell", "everair", "school"],
    pathwayKit: { name: "Care & Rest Pathway Kit", tokens: 66, items: ["Soft-soled clogs", "Lanyard thermometer", "Calm Voice training module"] },
    shiftSites: ["Wellness", "Dreamwell", "Everair Alpine Lodge"],
    goodshift: false,
    brightside: false,
  },
  {
    id: "trades-and-town",
    name: "Trades & Town",
    tagline: "Build it. Fix it. Keep it adorable.",
    summary: "Raise the homes, service the cars, and patch the roads that hold Unicornopolis together.",
    businesses: ["construction", "motorworks", "public-works"],
    pathwayKit: { name: "Trades & Town Pathway Kit", tokens: 88, items: ["Hard hat deposit", "High-visibility vest", "Work gloves"] },
    shiftSites: ["Construction", "Motors", "Motorworks", "Public Works"],
    goodshift: false,
    brightside: false,
  },
  {
    id: "creator",
    name: "Creator",
    tagline: "Make every second count.",
    summary: "Turn real moments into sponsored ones. Shoot, script, and launch the clips that tell the Unicorn Warehouse story.",
    businesses: ["brightside"],
    pathwayKit: { name: "Creator Pathway Kit", tokens: 96, items: ["Ring light", "Phone tripod", "Authenticity Coach, first month"] },
    shiftSites: [],
    goodshift: false,
    brightside: true,
  },
];

export const positions: readonly Position[] = [
  // Food & Fun
  { id: "line-unicorn", title: "Line Unicorn", track: "food-and-fun", level: 1, business: "quickserve", department: "Lunch Rush Crew", manager: "Pippa Pickle", managerTitle: "Lunch Shift Manager", summary: "Bag orders, call numbers, and keep the lunch line moving at Horn & Fries.", minRank: "unicorn-trainee", vacancies: 6 },
  { id: "lane-attendant", title: "Lane Attendant", track: "food-and-fun", level: 1, business: "funplex", department: "Games & Attractions", manager: "Bumper Bloom", managerTitle: "Attractions Operations Manager", summary: "Clear lanes between games, fit shoes, and keep the glow on at Lucky Lanes.", minRank: "unicorn-trainee", vacancies: 4 },
  { id: "event-setup-crew", title: "Event Setup Crew", track: "food-and-fun", level: 1, business: "gatherings", department: "Room Turnover", manager: "Tansy Tinsel", managerTitle: "Venue Turnover Lead", summary: "Set tables, arrange chairs, and reset Confetti Hall between celebrations.", minRank: "unicorn-trainee", vacancies: 5 },
  { id: "drive-thru-timing-specialist", title: "Drive-Thru Timing Specialist", track: "food-and-fun", level: 2, business: "quickserve", department: "Drive-Thru Dynamos", manager: "Dottie Dash", managerTitle: "Drive-Thru Manager", summary: "Greet every car and keep its timer on target. Cars are counted from the second they arrive.", minRank: "junior-unicorn-associate", vacancies: 0 },
  { id: "fun-compliance-host", title: "Fun Compliance Host", track: "food-and-fun", level: 2, business: "funplex", department: "Games & Attractions", manager: "Bumper Bloom", managerTitle: "Attractions Operations Manager", summary: "Check guests in for scheduled Fun Hours and record their delight at exit.", minRank: "junior-unicorn-associate", vacancies: 1 },
  { id: "assistant-shift-happiness-manager", title: "Assistant Shift Happiness Manager", track: "food-and-fun", level: 3, business: "quickserve", department: "Lunch Rush Crew", manager: "Pippa Pickle", managerTitle: "Lunch Shift Manager", summary: "Schedule the rush, approve breaks between rushes, and define when a rush is happening.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "guest-delight-captain", title: "Guest Delight Captain", track: "food-and-fun", level: 3, business: "gatherings", department: "Private Events", manager: "Olive Placecard", managerTitle: "Private Events Manager", summary: "Lead private events from first guest to last, including the time after the last guest leaves.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "venue-delight-director", title: "Venue Delight Director", track: "food-and-fun", level: 4, business: "funplex", department: "Funplex Leadership", manager: "Bumper Bloom", managerTitle: "Attractions Operations Manager", summary: "Set delight targets for every venue in the track and report them to the Executive Unicorns.", minRank: "unicorn-team-lead", vacancies: 0 },

  // Logistics
  { id: "warehouse-picker", title: "Warehouse Picker", track: "logistics", level: 1, business: "fulfillment", department: "Pick & Pack", manager: "Piper Pick", managerTitle: "Packing Floor Manager", summary: "Turn pick lists into parcels at the pace set by the floor’s fastest unicorn.", minRank: "unicorn-trainee", vacancies: 9 },
  { id: "neighborhood-courier", title: "Neighborhood Courier", track: "logistics", level: 1, business: "dispatch", department: "Neighborhood Couriers", manager: "Pippa Pin", managerTitle: "Local Routes Manager", summary: "Carry orders from Fulfillment, Market, and Horn & Fries to doors across town.", minRank: "unicorn-trainee", vacancies: 7 },
  { id: "shelf-stocker", title: "Shelf Stocker", track: "logistics", level: 1, business: "market", department: "Grocery & Stock", manager: "Clementine Crate", managerTitle: "Grocery Floor Manager", summary: "Keep the front shelves full of the groceries you will buy on the same terms as any other member.", minRank: "unicorn-trainee", vacancies: 6 },
  { id: "last-mile-gratitude-coordinator", title: "Last Mile Gratitude Coordinator", track: "logistics", level: 2, business: "dispatch", department: "Dispatch Coordination", manager: "Milo Mile", managerTitle: "Dispatch Center Manager", summary: "Assign routes and thank couriers for the travel time their payouts do not cover.", minRank: "junior-unicorn-associate", vacancies: 0 },
  { id: "shelf-abundance-associate", title: "Shelf Abundance Associate", track: "logistics", level: 2, business: "market", department: "Displays & Merchandising", manager: "Taffy Window", managerTitle: "Visual Merchandising Manager", summary: "Build displays that make every shelf look fuller than the warehouse behind it.", minRank: "junior-unicorn-associate", vacancies: 1 },
  { id: "inventory-truth-specialist", title: "Inventory Truth Specialist", track: "logistics", level: 3, business: "fulfillment", department: "Inventory", manager: "Tess Tally", managerTitle: "Inventory Accuracy Lead", summary: "Resolve mismatches between the count and the system. The system is the record.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "pickup-promise-supervisor", title: "Pickup Promise Supervisor", track: "logistics", level: 3, business: "market", department: "Online Orders & Pickup", manager: "Pip Parcel", managerTitle: "Pickup Operations Manager", summary: "Keep every pickup window on schedule by the clock that keeps it on schedule.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "pick-rate-encouragement-lead", title: "Pick Rate Encouragement Lead", track: "logistics", level: 4, business: "fulfillment", department: "Pick & Pack", manager: "Piper Pick", managerTitle: "Packing Floor Manager", summary: "Set the weekly pick rate and encourage the floor to meet it.", minRank: "unicorn-team-lead", vacancies: 0 },

  // Office & Money
  { id: "reporting-associate", title: "Reporting Associate", track: "office-and-money", level: 1, business: "goodshift", department: "Reporting Desk", manager: "Margin Bloom", managerTitle: "Reporting Desk Manager", summary: "Reconcile the weekly numbers and deliver them to a client review queue.", minRank: "unicorn-trainee", vacancies: 5 },
  { id: "teller-unicorn", title: "Teller Unicorn", track: "office-and-money", level: 1, business: "bank", department: "Everyday Tokens Counter", manager: "Ducat Daisy", managerTitle: "Teller Line Manager", summary: "Welcome members at the counter and explain balances they can see but not yet spend.", minRank: "unicorn-trainee", vacancies: 3 },
  { id: "leasing-assistant", title: "Leasing Assistant", track: "office-and-money", level: 1, business: "living", department: "Leasing", manager: "Maple Keyring", managerTitle: "Leasing Manager", summary: "Set up tours, prepare model homes, and walk future residents through their lease estimate.", minRank: "unicorn-trainee", vacancies: 3 },
  { id: "balance-preservation-associate", title: "Balance Preservation Associate", track: "office-and-money", level: 2, business: "bank", department: "Everyday Tokens Counter", manager: "Ducat Daisy", managerTitle: "Teller Line Manager", summary: "Review overdraft appeals and reconcile held balances so they stay held.", minRank: "junior-unicorn-associate", vacancies: 0 },
  { id: "resident-retention-specialist", title: "Resident Retention Specialist", track: "office-and-money", level: 3, business: "living", department: "Resident Services", manager: "Clover Bell", managerTitle: "Resident Services Manager", summary: "Keep residents renewing, and return their deposits as Portfolio Tokens after reconciliation.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "valuation-confidence-analyst", title: "Valuation Confidence Analyst", track: "office-and-money", level: 3, business: "living", department: "Homes", manager: "Pearl Plotline", managerTitle: "Acquisitions & Valuation Director", summary: "Estimate what every home is worth, and separately, what we would offer for it.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "client-acceptance-manager", title: "Client Acceptance Manager", track: "office-and-money", level: 4, business: "goodshift", department: "Reporting Desk", manager: "Margin Bloom", managerTitle: "Reporting Desk Manager", summary: "Own the acceptance window for every reporting client. The window has no fixed close.", minRank: "unicorn-team-lead", vacancies: 0 },

  // Care & Rest
  { id: "suite-turnover-attendant", title: "Suite Turnover Attendant", track: "care-and-rest", level: 1, business: "dreamwell", department: "Guest Suites", manager: "Clover Quilt", managerTitle: "Suite Turnover Manager", summary: "Reset sleep suites to guest standard between sessions.", minRank: "unicorn-trainee", vacancies: 5 },
  { id: "canister-refill-associate", title: "Canister Refill Associate", track: "care-and-rest", level: 1, business: "everair", department: "Bottling & Dispatch", manager: "Alba Drift", managerTitle: "Bottling Floor Manager", summary: "Refill Lodge canisters on metered air, breathed to your own account.", minRank: "unicorn-trainee", vacancies: 4 },
  { id: "exam-room-reset-associate", title: "Exam Room Reset Associate", track: "care-and-rest", level: 1, business: "wellness", department: "Clinic Operations", manager: "Hazel Gauze", managerTitle: "Clinic Operations Manager", summary: "Reset exam rooms and set out welcome packets at the neighborhood clinics.", minRank: "unicorn-trainee", vacancies: 3 },
  { id: "classroom-aide", title: "Classroom Aide", track: "care-and-rest", level: 1, business: "school", department: "Teaching & Learning", manager: "Maple Primer", managerTitle: "Lower School Coordinator", summary: "Support small groups at Cloverfield School and keep the reading corner tidy.", minRank: "unicorn-trainee", vacancies: 2 },
  { id: "rest-yield-associate", title: "Rest Yield Associate", track: "care-and-rest", level: 2, business: "dreamwell", department: "Evening Reception", manager: "Della Dusk", managerTitle: "Guest Arrivals Manager", summary: "Welcome evening guests and match each one to the session that fits their plan.", minRank: "junior-unicorn-associate", vacancies: 0 },
  { id: "respiratory-experience-associate", title: "Respiratory Experience Associate", track: "care-and-rest", level: 2, business: "everair", department: "AirLink Member Experience", manager: "Cirrus Bell", managerTitle: "AirLink Service Manager", summary: "Help members with AirLink, including the difference between cancellation and Sync release.", minRank: "junior-unicorn-associate", vacancies: 1 },
  { id: "patient-journey-optimization-associate", title: "Patient Journey Optimization Associate", track: "care-and-rest", level: 2, business: "wellness", department: "Clinic Operations", manager: "Hazel Gauze", managerTitle: "Clinic Operations Manager", summary: "Guide patients from arrival to eligibility verification, and then to satisfaction.", minRank: "junior-unicorn-associate", vacancies: 0 },
  { id: "elementary-classroom-teacher", title: "Elementary Classroom Teacher", track: "care-and-rest", level: 3, business: "school", department: "Teaching & Learning", manager: "Maple Primer", managerTitle: "Lower School Coordinator", summary: "Lead a welcoming elementary classroom with a reading specialist nearby.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "coverage-clarity-specialist", title: "Coverage Clarity Specialist", track: "care-and-rest", level: 3, business: "wellness", department: "Coverage", manager: "Prudence Preauth", managerTitle: "Coverage Review Manager", summary: "Explain coverage decisions that consider breathing history and sleep activity.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "restorative-capacity-director", title: "Restorative Capacity Director", track: "care-and-rest", level: 4, business: "dreamwell", department: "Dreamwell Leadership", manager: "Della Dusk", managerTitle: "Guest Arrivals Manager", summary: "Plan how much rest the town can be offered each night, and at what price.", minRank: "unicorn-team-lead", vacancies: 0 },

  // Trades & Town
  { id: "site-crew-unicorn", title: "Site Crew Unicorn", track: "trades-and-town", level: 1, business: "construction", department: "Site Logistics", manager: "Dusty Plumb", managerTitle: "Site Logistics Lead", summary: "Carry materials, direct deliveries, and sweep the site at close.", minRank: "unicorn-trainee", vacancies: 6 },
  { id: "parts-runner", title: "Parts Runner", track: "trades-and-town", level: 1, business: "motorworks", department: "Parts", manager: "Bitsy Socket", managerTitle: "Parts Counter Lead", summary: "Match incoming parts to the technicians who ordered them.", minRank: "unicorn-trainee", vacancies: 3 },
  { id: "roads-crew-unicorn", title: "Roads Crew Unicorn", track: "trades-and-town", level: 1, business: "public-works", department: "Roads & Transit", manager: "Cobble Mae", managerTitle: "Roads Crew Lead", summary: "Log potholes, set out cones, and keep the Clover Loop shelters readable.", minRank: "unicorn-trainee", vacancies: 4 },
  { id: "service-advisor", title: "Service Advisor", track: "trades-and-town", level: 2, business: "motorworks", department: "Motorworks Service", manager: "Torque Tinsel", managerTitle: "Service Manager", summary: "Walk members through their color-coded inspection report and everything it found.", minRank: "junior-unicorn-associate", vacancies: 1 },
  { id: "preventive-revenue-technician", title: "Preventive Revenue Technician", track: "trades-and-town", level: 3, business: "motorworks", department: "Motorworks Service", manager: "Torque Tinsel", managerTitle: "Service Manager", summary: "Diagnose vehicles. A diagnostic fee confirms that a diagnosis was attempted.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "neighborhood-readiness-coordinator", title: "Neighborhood Readiness Coordinator", track: "trades-and-town", level: 3, business: "public-works", department: "Roads & Transit", manager: "Cobble Mae", managerTitle: "Roads Crew Lead", summary: "Keep each household’s civic profile ready for the incident that has not happened yet.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "structural-optimism-foreman", title: "Structural Optimism Foreman", track: "trades-and-town", level: 4, business: "construction", department: "Site Logistics", manager: "Dusty Plumb", managerTitle: "Site Logistics Lead", summary: "Hold every crew to the completion estimate, which is an estimate.", minRank: "unicorn-team-lead", vacancies: 0 },

  // Creator
  { id: "content-unicorn", title: "Content Unicorn", track: "creator", level: 1, business: "brightside", department: "On-Location Production", manager: "Sunny Slate", managerTitle: "Field Producer", summary: "Film sponsored clips on location across the Portfolio.", minRank: "unicorn-trainee", vacancies: 5 },
  { id: "reaction-talent", title: "Reaction Talent", track: "creator", level: 1, business: "brightside", department: "Product Studio", manager: "Mika Softbox", managerTitle: "Studio Production Manager", summary: "Reproduce spontaneous reactions from approved reference footage.", minRank: "unicorn-trainee", vacancies: 4 },
  { id: "hook-writer", title: "Hook Writer", track: "creator", level: 2, business: "brightside", department: "Creative Development", manager: "Poppy Cutaway", managerTitle: "Head of Opening Seconds", summary: "Write the first three seconds. The rest of the clip is someone else’s.", minRank: "junior-unicorn-associate", vacancies: 1 },
  { id: "authenticity-standards-reviewer", title: "Authenticity Standards Reviewer", track: "creator", level: 3, business: "brightside", department: "Creative Development", manager: "Poppy Cutaway", managerTitle: "Head of Opening Seconds", summary: "Decide whether a reaction meets the buyer’s authenticity guidelines.", minRank: "senior-unicorn", vacancies: 0 },
  { id: "campaign-launch-producer", title: "Campaign Launch Producer", track: "creator", level: 4, business: "brightside", department: "Campaign Launches", manager: "Cleo Countdown", managerTitle: "Launch Producer", summary: "Plan launch week takeovers across every screen in town.", minRank: "unicorn-team-lead", vacancies: 0 },
];

/** Employers named in positions. Most are businesses in businesses.ts. Goodshift and the Bank live inside other pages. */
export const employers: Record<string, { name: string; href: string; careersHref?: string }> = {
  quickserve: { name: "Horn & Fries", href: "/quickserve", careersHref: "/careers/quickserve" },
  funplex: { name: "Funplex", href: "/funplex", careersHref: "/careers/funplex" },
  gatherings: { name: "Gatherings", href: "/gatherings", careersHref: "/careers/gatherings" },
  fulfillment: { name: "Fulfillment", href: "/fulfillment", careersHref: "/careers/fulfillment" },
  dispatch: { name: "Dispatch", href: "/dispatch", careersHref: "/careers/dispatch" },
  market: { name: "Market", href: "/market", careersHref: "/careers/market" },
  goodshift: { name: "Goodshift", href: "/demandeternal" },
  bank: { name: "Unicorn Warehouse Bank", href: "/tokens#bank" },
  living: { name: "Living", href: "/living", careersHref: "/careers/living" },
  wellness: { name: "Wellness", href: "/wellness", careersHref: "/careers/wellness" },
  dreamwell: { name: "Dreamwell", href: "/somnara", careersHref: "/careers/dreamwell" },
  everair: { name: "Everair Alpine Lodge", href: "/aerovitalux", careersHref: "/careers/everair" },
  school: { name: "Cloverfield School", href: "/school", careersHref: "/careers/school" },
  construction: { name: "Construction", href: "/construction", careersHref: "/careers/construction" },
  motorworks: { name: "Motors & Motorworks", href: "/motorworks", careersHref: "/careers/motorworks" },
  "public-works": { name: "Public Works", href: "/public-works", careersHref: "/careers/public-works" },
  brightside: { name: "Brightside", href: "/termiflux", careersHref: "/careers/brightside" },
};

export function getTrack(id: string) {
  return tracks.find((track) => track.id === id);
}

export function getPosition(id: string) {
  return positions.find((position) => position.id === id);
}

export function trackPositions(track: TrackId) {
  return positions.filter((position) => position.track === track).sort((a, b) => a.level - b.level);
}

export function entryPositions(track: TrackId) {
  return trackPositions(track).filter(({ level }) => level === 1);
}

export function isOpenEntryPosition(position: Position) {
  return position.level === 1 && position.vacancies > 0 && position.minRank === "unicorn-trainee";
}

export function trackPath(track: Pick<Track, "id">) {
  return `/careers/tracks/${track.id}`;
}

/** The track a HelpingHand posting counts toward, from the business named at the start of its site. */
export function helpingHandTrack(site: string) {
  const business = site.split(" · ")[0];
  return tracks.find(({ shiftSites }) => shiftSites.includes(business))?.id;
}

export const goodshiftTrack = tracks.find(({ goodshift }) => goodshift)!.id;
export const brightsideTrack = tracks.find(({ brightside }) => brightside)!.id;
