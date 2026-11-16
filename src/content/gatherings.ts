import { parties } from "./funplex";

export const charterDepartureTokens = 4_200;

export const venues = [
  { id: "funplex-suite", name: parties.name, location: "Hosted at Funplex", occasion: "Birthdays", capacity: 16, tokens: parties.startingTokens, description: "A decorated room, a cake from Horn & Fries, and the arcade right outside.", detail: "90 minutes, including setup and cleanup." },
  { id: "confetti-hall", name: "Confetti Hall", location: "Gatherings Event Hall", occasion: "Celebrations", capacity: 50, tokens: 480, description: "A bright private room for showers, graduations, and a very good excuse for cake.", detail: "Two hours, including decorating and cleanup." },
  { id: "glass-orchard", name: "The Glass Orchard", location: "Gatherings Conservatory", occasion: "Private dining", capacity: 64, tokens: 1_200, description: "Long tables under glass, a terrace at sunset, and dinner among the citrus trees.", detail: "Private guest list and access to the terrace." },
  { id: "alpine-room", name: "The Alpine Room", location: "Everair Alpine Lodge", occasion: "Private dining", capacity: 24, tokens: 2_800, description: "An intimate Lodge dinner with a seasonal Everair blend paired to each course.", detail: "One shared flight of air for the table." },
  { id: "gold-room", name: "The Gold Room", location: "Gatherings Ballroom", occasion: "Weddings & galas", capacity: 180, tokens: 6_500, description: "A chandelier ballroom with full service and a separate entrance for the wedding party.", detail: "Ask about our No Announcements package." },
  { id: "private-yacht", name: "Private Yacht · The Vesting Period", location: "Gatherings Marina", occasion: "Charters", capacity: 32, tokens: 18_000, description: "A sunset charter with a private chef, an open lounge deck, and the evening to yourselves.", detail: "Marina charter included. Departure available as an add-on." },
] as const;

export type Venue = (typeof venues)[number];
