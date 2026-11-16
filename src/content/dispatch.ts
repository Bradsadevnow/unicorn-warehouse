export const dispatchPlus = {
  name: "Dispatch Plus",
  tokens: 14,
  interval: "30-day cycle",
  boosts: 4,
  description: "Get your next delivery in front of couriers a little sooner.",
  fine: "Priority Matching changes when the offer goes out. Your delivery window still begins at pickup. Unused boosts reset at renewal.",
} as const;

export const priorityMatchingTokens = 4;

export const dispatchServices = [
  { id: "standard", name: "Standard", tokens: 9, window: "25–40 minutes after pickup", deliveredAt: "6:52 p.m." },
  { id: "express", name: "Express", tokens: 16, window: "10–20 minutes after pickup", deliveredAt: "6:40 p.m." },
] as const;

export const dispatchTrips = [
  { id: "parcel", name: "Local parcel", origin: "Dispatch counter" },
  { id: "market", name: "Market groceries", origin: "Fulfillment pickup bay" },
  { id: "dinner", name: "Horn & Fries dinner", origin: "Horn & Fries" },
] as const;

export const dispatchHandoffs = [
  { id: "door", name: "Leave at the door", tokens: 0 },
  { id: "outside", name: "Meet outside", tokens: 0 },
  { id: "personal", name: "Hand it to me", tokens: 3 },
] as const;
