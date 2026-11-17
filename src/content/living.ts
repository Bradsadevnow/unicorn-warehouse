export const rentalPlans = {
  room: { label: "Private room", shared: true, rooms: ["Private bedroom", "Shared living room", "Shared kitchen", "Shared bath"] },
  studio: { label: "Studio", shared: false, rooms: ["Living / sleeping", "Kitchenette", "Bath"] },
  one: { label: "1 bedroom", shared: false, rooms: ["Bedroom", "Living room", "Kitchen", "Bath"] },
  two: { label: "2 bedrooms", shared: false, rooms: ["Primary bedroom", "Second bedroom", "Living room", "Kitchen", "Bath"] },
  three: { label: "3 bedrooms", shared: false, rooms: ["Primary bedroom", "Second bedroom", "Third bedroom", "Living room", "Kitchen", "Bath"] },
} as const;

export type Rental = {
  id: string;
  name: string;
  neighborhood: string;
  plan: keyof typeof rentalPlans;
  area: number;
  rent: number;
  pets: boolean;
  commute: string;
  minutes: number;
  amenities: readonly string[];
  description: string;
};

export const rentals: readonly Rental[] = [
  { id: "sunbeam", name: "Sunbeam House", neighborhood: "Ribbon Row", plan: "room", area: 155, rent: 825, pets: false, commute: "Market", minutes: 6, amenities: ["Transit nearby", "Furnished"], description: "A furnished room with morning light, a desk in the bay window, and a bus stop outside." },
  { id: "blue-hour", name: "Blue Hour Lofts", neighborhood: "Depot District", plan: "studio", area: 390, rent: 1_050, pets: false, commute: "Fulfillment", minutes: 5, amenities: ["Blackout shades", "In-unit laundry"], description: "Blackout shades, a surprisingly quiet courtyard, and five minutes on foot to the outbound gate." },
  { id: "clover", name: "Clover Court", neighborhood: "Wishing Lane", plan: "studio", area: 440, rent: 1_200, pets: true, commute: "Market", minutes: 10, amenities: ["Courtyard", "Transit nearby"], description: "An open-plan studio around a flower-filled courtyard with a bench that catches the afternoon sun." },
  { id: "poppy", name: "Poppy Run", neighborhood: "Meadow Loop", plan: "one", area: 610, rent: 1_425, pets: true, commute: "Funplex", minutes: 12, amenities: ["Dog run", "In-unit laundry"], description: "A one-bedroom with space for a real dining table and a walking loop for the member of the household who sets the pace." },
  { id: "basket", name: "Basketwalk Flats", neighborhood: "Market Square", plan: "one", area: 680, rent: 1_590, pets: false, commute: "Market", minutes: 2, amenities: ["Transit nearby", "Parcel lockers"], description: "Come home through the covered Market walkway. Your groceries can get here before you do." },
  { id: "peach", name: "Peach Porch", neighborhood: "Orchard Lane", plan: "two", area: 875, rent: 1_850, pets: true, commute: "Gatherings", minutes: 8, amenities: ["Private patio", "In-unit laundry"], description: "A two-bedroom rowhome with a little patio, room for herbs, and neighbors who trade cuttings." },
  { id: "stoop", name: "Little Stoop Townhomes", neighborhood: "Market Square", plan: "three", area: 1_170, rent: 2_200, pets: true, commute: "Market", minutes: 7, amenities: ["Playground", "In-unit laundry"], description: "Three proper bedrooms, a playground in sight of the front step, and room to put the stroller down." },
  { id: "glass", name: "Glasswing Corner", neighborhood: "Studio Quarter", plan: "two", area: 1_060, rent: 2_650, pets: false, commute: "Brightside", minutes: 4, amenities: ["Coworking lounge", "Parcel lockers"], description: "Corner windows and a downstairs coworking lounge for calls that need their own room." },
  { id: "terrace", name: "Glimmer Terrace", neighborhood: "Studio Quarter", plan: "two", area: 1_250, rent: 3_200, pets: true, commute: "Brightside", minutes: 11, amenities: ["Private patio", "Softspace profile"], description: "A top-floor terrace with sunset views and a dedicated Softspace profile for nights in." },
  { id: "garden", name: "The Garden Residence", neighborhood: "Crown Gardens", plan: "three", area: 1_780, rent: 4_800, pets: true, commute: "Gatherings", minutes: 13, amenities: ["Private patio", "Softspace profile"], description: "A detached cottage with a walled garden, a guest room, and a dining room worth setting the table for." },
  { id: "dlx", name: "DLX Flats", neighborhood: "Clover Lake", plan: "two", area: 1_480, rent: 5_600, pets: true, commute: "Market", minutes: 9, amenities: ["Lake-view balcony", "Shared roof terrace", "Softspace profile"], description: "Five lakeside stories with stacked balconies, a set-back top floor, and condo-style finishes. Lake views are included where visible." },
];

export const leaseTerms = [6, 12] as const;
export const shortLeasePremiumPercent = 8;
export type LeaseTerm = (typeof leaseTerms)[number];

export function quoteRental(rental: Rental, term: LeaseTerm) {
  const monthlyRent = term === 6
    ? Math.ceil(rental.rent * (100 + shortLeasePremiumPercent) / 100)
    : rental.rent;
  const securityDeposit = monthlyRent;
  return { monthlyRent, securityDeposit, dueAtMoveIn: monthlyRent + securityDeposit };
}

/** Starter homes offered at onboarding. Rent is billed weekly, starting one week after move-in. */
export type StarterHome = {
  id: string;
  name: string;
  /** Town map lot. The Fryer Loft shares the Horn & Fries lot. */
  lotId: string;
  unit: string;
  neighborhood: string;
  kind: string;
  area: number;
  weeklyRent: number;
  tagline: string;
  description: string;
  amenities: readonly string[];
  finePrint: string;
  /** Comfort the home settles toward, before any Softspace membership. */
  comfort: number;
  /** How much of a full night's energy recovery the bed delivers. */
  sleepQuality: number;
  /** Whether groceries that need cooking can be prepared here. */
  kitchen: boolean;
};

export const starterRentDays = 7;

export const starterHomes: readonly StarterHome[] = [
  {
    id: "bunkhouse",
    name: "Employee Bunkhouse",
    lotId: "starter-bunkhouse",
    unit: "Bunk C-14",
    neighborhood: "Depot District",
    kind: "Shared bunk",
    area: 21,
    weeklyRent: 280,
    tagline: "Steps from the outbound bay.",
    description: "A top bunk in a twelve-bunk room, a two-minute walk from Fulfillment and Dispatch. Wake up already at work.",
    amenities: ["Shared washroom", "Locker hook", "Lights-out schedule"],
    finePrint: "Lights-out follows the Goodshift shift calendar. Lockers are sold separately. Bunk assignments may be adjusted to support operational needs.",
    comfort: 30,
    sleepQuality: 0.8,
    kitchen: false,
  },
  {
    id: "fryer-loft",
    name: "The Fryer Loft",
    lotId: "quickserve",
    unit: "Unit B, upstairs",
    neighborhood: "Market Square",
    kind: "Loft room",
    area: 96,
    weeklyRent: 330,
    tagline: "Warm all winter. Warm all summer.",
    description: "A cozy room above Horn & Fries with radiant heat from the kitchen below and a view of the drive-thru line.",
    amenities: ["Heated by the dinner rush", "Hot plate", "Window over the drive-thru"],
    finePrint: "Heat is supplied during operating hours. The aroma is included with rent and is not a separate utility. Quiet hours begin when the last car clears the drive-thru.",
    comfort: 42,
    sleepQuality: 0.9,
    kitchen: true,
  },
  {
    id: "potting-shed",
    name: "The Potting Shed",
    lotId: "starter-shed",
    unit: "Behind The Garden Residence",
    neighborhood: "Crown Gardens",
    kind: "Garden studio",
    area: 64,
    weeklyRent: 300,
    tagline: "A Crown Gardens address at a Depot District price.",
    description: "A private studio with lawn views in one of Unicornopolis’s most exclusive neighborhoods. Formerly a potting shed. Still mostly a potting shed.",
    amenities: ["Lawn view", "Garden hose access 7–9 a.m.", "Neighborly landlord"],
    finePrint: "Plumbing is provided by the garden hose during posted hours. The landlord’s landscaping crew may require access at any time. Residents may not describe the shed as a shed in correspondence with the Residence.",
    comfort: 36,
    sleepQuality: 0.85,
    kitchen: false,
  },
];

export function getStarterHome(id: string | undefined) {
  return starterHomes.find((home) => home.id === id);
}
