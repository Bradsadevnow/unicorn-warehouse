import { rentals } from "./living";

export const townSize = 20;
export const blockMetres = 100;

const avenues = new Map([[1, "Horizon Avenue"], [6, "Clover Avenue"], [12, "Market Avenue"], [18, "Depot Avenue"]]);
const streets = new Map([[1, "Ribbon Street"], [6, "Orchard Street"], [12, "Lantern Street"], [18, "Crown Street"]]);

export type Point = { x: number; y: number };
export type Zone = "residential" | "shops" | "work" | "industrial" | "civic";

export const zoneNames: Record<Zone, string> = {
  residential: "Residential",
  shops: "Shops & recreation",
  work: "Offices & services",
  industrial: "Industrial",
  civic: "Civic",
};

export const cellKey = ({ x, y }: Point) => `${x},${y}`;
export const isRoad = ({ x, y }: Point) => avenues.has(x) || streets.has(y);
export const roadLabel = ({ x, y }: Point) => [streets.get(y), avenues.get(x)].filter(Boolean).join(" × ");

function neighbors({ x, y }: Point) {
  return [{ x, y: y - 1 }, { x: x - 1, y }, { x, y: y + 1 }, { x: x + 1, y }]
    .filter((point) => point.x >= 0 && point.y >= 0 && point.x < townSize && point.y < townSize);
}

type LotSeed = Point & { id: string; name: string; href: string; zone: Zone; icon: string; model?: string; rent?: number; district?: string };

function addressLot(lot: LotSeed) {
  const adjacent = neighbors(lot);
  const entrance = (lot.model && adjacent.find((point) => point.y !== lot.y && isRoad(point)))
    || adjacent.find(isRoad);
  if (!entrance || isRoad(lot)) throw new Error(`Lot ${lot.id} must be next to a road`);
  const horizontal = entrance.y !== lot.y;
  const street = horizontal ? streets.get(entrance.y) : avenues.get(entrance.x);
  const coordinate = horizontal ? lot.x : lot.y;
  const side = horizontal ? lot.y - entrance.y : lot.x - entrance.x;
  return { ...lot, entrance, address: `${(coordinate + 1) * 10 + (side > 0 ? 1 : 0)} ${street}` };
}

const storefronts: readonly LotSeed[] = [
  { id: "market", x: 11, y: 11, name: "Unicorn Warehouse Market", href: "/market", zone: "shops", icon: "🛒", district: "Market Square" },
  { id: "living", x: 11, y: 10, name: "Living Leasing Office", href: "/living", zone: "work", icon: "🔑", district: "Market Square" },
  { id: "softspace", x: 11, y: 9, name: "Softspace", href: "/comfortflow", zone: "work", icon: "🌡️" },
  { id: "everair", x: 2, y: 3, name: "Everair AirLink Counter", href: "/aerovitalux", zone: "work", icon: "☁️" },
  { id: "alpine-lodge", x: 5, y: 0, name: "Alpine Lodge Road", href: "/aerovitalux/lodge-collection", zone: "shops", icon: "🏔️", district: "North of Unicornopolis" },
  { id: "alpine-resort", x: 7, y: 0, name: "Grand Alpine Resort Access", href: "/alpine-resort", zone: "shops", icon: "🎿", district: "North of Unicornopolis" },
  { id: "dreamwell", x: 5, y: 4, name: "Dreamwell", href: "/somnara", zone: "work", icon: "🌙" },
  { id: "wellness", x: 2, y: 13, name: "Ribbon Row Clinic & Wellness Pharmacy", href: "/wellness#pharmacy", zone: "civic", icon: "💗", district: "Ribbon Row" },
  { id: "depot-clinic", x: 19, y: 9, name: "Depot District Clinic", href: "/wellness#visit-heading", zone: "civic", icon: "🩺", district: "Depot District" },
  { id: "garden-pavilion", x: 16, y: 17, name: "Garden Pavilion", href: "/wellness#visit-heading", zone: "civic", icon: "🌷", district: "Crown Gardens" },
  { id: "quickserve", x: 7, y: 11, name: "Horn & Fries", href: "/quickserve", zone: "shops", icon: "🍔" },
  { id: "funplex", x: 5, y: 11, name: "Funplex", href: "/funplex", zone: "shops", icon: "🎡" },
  { id: "gatherings", x: 5, y: 14, name: "Gatherings · Confetti Hall", href: "/gatherings", zone: "shops", icon: "🎈" },
  { id: "glass-orchard", x: 5, y: 17, name: "The Glass Orchard", href: "/gatherings", zone: "shops", icon: "🍊" },
  { id: "gold-room", x: 3, y: 17, name: "The Gold Room", href: "/gatherings", zone: "shops", icon: "✨" },
  { id: "helpinghand", x: 13, y: 10, name: "HelpingHand", href: "/sublaborix", zone: "work", icon: "🤝" },
  { id: "goodshift", x: 13, y: 11, name: "Goodshift", href: "/demandeternal", zone: "work", icon: "💼" },
  { id: "brightside", x: 13, y: 9, name: "Brightside", href: "/termiflux", zone: "work", icon: "🎬", district: "Studio Quarter" },
  { id: "dispatch", x: 17, y: 8, name: "Dispatch", href: "/dispatch", zone: "industrial", icon: "🛵", district: "Depot District" },
  { id: "clover-cloud", x: 17, y: 7, name: "Clover Cloud Data Center", href: "/flock", zone: "industrial", icon: "🐦", district: "Depot District" },
  { id: "fulfillment", x: 17, y: 9, name: "Fulfillment · Outbound Bay", href: "/fulfillment", zone: "industrial", icon: "📦", district: "Depot District" },
  { id: "bank", x: 11, y: 7, name: "Unicorn Warehouse Bank", href: "/tokens#bank", zone: "work", icon: "🏦", district: "Market Avenue" },
  { id: "motors-showroom", x: 13, y: 5, name: "Unicorn Warehouse Motors Showroom", href: "/motorworks#inventory", zone: "shops", icon: "🚗" },
  { id: "motorworks", x: 17, y: 10, name: "Motorworks Service", href: "/motorworks#service", zone: "industrial", icon: "🔧", district: "Depot District" },
  { id: "construction", x: 17, y: 11, name: "Construction Yard", href: "/construction", zone: "industrial", icon: "🏗️", district: "Depot District" },
  { id: "school", x: 4, y: 7, name: "Cloverfield School", href: "/school", zone: "civic", icon: "🌱" },
  { id: "town-hall", x: 7, y: 10, name: "Unicornopolis Town Hall", href: "/map#town-hall", zone: "civic", icon: "🏛️", district: "Market Square" },
  { id: "public-works", x: 17, y: 13, name: "Public Works Yard", href: "/public-works", zone: "civic", icon: "🚧", district: "Depot District" },
  { id: "police", x: 17, y: 14, name: "Unicornopolis Police Station", href: "/public-works#police", zone: "civic", icon: "🚓", district: "Public Works Campus" },
  { id: "fire-rescue", x: 17, y: 15, name: "Fire & Rescue", href: "/public-works#fire", zone: "civic", icon: "🚒", district: "Public Works Campus" },
  { id: "marina", x: 17, y: 19, name: "Clover Lake Marina", href: "/map#clover-loop", zone: "civic", icon: "⛵", district: "Clover Lake" },
  { id: "clover-commons", x: 11, y: 15, name: "Clover Commons Park", href: "/map#clover-commons", zone: "civic", icon: "🌳", district: "Market Square" },
];

const homeRows = [
  { model: "sunbeam", y: 2, start: 2, icon: "▰" },
  { model: "clover", y: 2, start: 8, icon: "▰" },
  { model: "blue-hour", y: 5, start: 15, icon: "▰" },
  { model: "poppy", y: 5, start: 2, icon: "▰" },
  { model: "basket", y: 11, start: 8, icon: "▥" },
  { model: "stoop", y: 13, start: 8, icon: "▥" },
  { model: "peach", y: 13, start: 3, icon: "▥" },
  { model: "glass", y: 7, start: 13, icon: "▥" },
  { model: "terrace", y: 13, start: 13, icon: "◆" },
  { model: "garden", y: 17, start: 13, icon: "◆" },
] as const;

const homes = homeRows.flatMap(({ model, y, start, icon }) => {
  const rental = rentals.find(({ id }) => id === model);
  if (!rental) throw new Error(`Missing Living model ${model}`);
  return Array.from({ length: 3 }, (_, offset): LotSeed => ({
    id: `home-${model}-${offset + 1}`,
    name: rental.name,
    x: start + offset,
    y,
    icon,
    model,
    rent: rental.rent,
    district: rental.neighborhood,
    zone: "residential",
    href: "/living#rentals",
  }));
});

const dlx = rentals.find(({ id }) => id === "dlx")!;
export const townLots = [...storefronts, ...homes, {
  id: "home-dlx", name: dlx.name, x: 11, y: 17, icon: "▥", model: dlx.id, rent: dlx.rent,
  district: dlx.neighborhood, zone: "residential" as const, href: "/living#rental-dlx",
}].map(addressLot);
export type TownLot = (typeof townLots)[number];
export const lotsByCell = new Map(townLots.map((lot) => [cellKey(lot), lot] as const));
if (lotsByCell.size !== townLots.length || new Set(townLots.map(({ address }) => address)).size !== townLots.length) {
  throw new Error("Unicornopolis lots must have unique coordinates and addresses");
}

export function streetRoute(from: Point, to: Point): Point[] {
  if (!isRoad(from) || !isRoad(to)) return [];
  const queue: Point[][] = [[from]];
  const visited = new Set([cellKey(from)]);
  for (let i = 0; i < queue.length; i++) {
    const route = queue[i];
    const current = route[route.length - 1];
    if (current.x === to.x && current.y === to.y) return route;
    for (const next of neighbors(current)) {
      const key = cellKey(next);
      if (!isRoad(next) || visited.has(key)) continue;
      visited.add(key);
      queue.push([...route, next]);
    }
  }
  return [];
}

export const cloverLoopStops = [
  { name: "Sunbeam Row", point: { x: 3, y: 1 } },
  { name: "Depot District", point: { x: 18, y: 9 } },
  { name: "Clover Lake Marina", point: { x: 17, y: 18 }, weekendOnly: true },
  { name: "Wellness & Pharmacy", point: { x: 2, y: 12 } },
  { name: "Market Square", point: { x: 11, y: 12 } },
  { name: "Cloverfield School", point: { x: 4, y: 6 } },
] as const;

const cloverLoopCorners = [
  { x: 1, y: 1 }, { x: 18, y: 1 }, { x: 18, y: 18 }, { x: 1, y: 18 },
  { x: 1, y: 12 }, { x: 12, y: 12 }, { x: 12, y: 6 }, { x: 1, y: 6 }, { x: 1, y: 1 },
];

export const cloverLoopRoute = cloverLoopCorners.slice(1)
  .flatMap((point, index) => streetRoute(cloverLoopCorners[index], point).slice(index === 0 ? 0 : 1));
