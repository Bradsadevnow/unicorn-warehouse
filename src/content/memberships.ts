/** Memberships a player can start: at enrollment with an introductory period, or later from My account. */
export type MembershipOffer = {
  id: "everair" | "softspace";
  name: string;
  icon: string;
  summary: string;
  benefit: string;
  price: number;
  days: number;
  finePrint: string;
  activeNote: string;
};

/** New team members receive this many days before the first renewal. */
export const introductoryDays = 14;

export const membershipOffers: readonly MembershipOffer[] = [
  {
    id: "everair",
    name: "Everair AirLink Premium",
    icon: "🌬️",
    summary: "Metered alpine air, delivered wirelessly to your mask wherever your schedule takes you.",
    benefit: "Keeps oxygen near 96 at work and at rest.",
    price: 210,
    days: 30,
    finePrint: "Everair Sync pairs your breathing to your account on activation. While Sync is active, ambient air is unavailable as a substitute for an Everair allocation. A verified cancellation does not release Sync.",
    activeNote: "Everair Sync is active. No Sync release is scheduled.",
  },
  {
    id: "softspace",
    name: "Softspace Daily Balance",
    icon: "🌡️",
    summary: "Your Softspace profile keeps you a comfortable degree warmer or cooler, all day and all night.",
    benefit: "Raises the comfort your home settles toward by 25.",
    price: 180,
    days: 30,
    finePrint: "Softspace adjusts through a subdermal comfort implant, fitted at activation. Your current setting stays in place if the membership ends. Implant removal can be scheduled separately.",
    activeNote: "Your Softspace profile is active.",
  },
];

export function getMembershipOffer(id: string | undefined) {
  return membershipOffers.find((offer) => offer.id === id);
}
