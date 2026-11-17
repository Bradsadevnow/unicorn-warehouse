import { fees } from "./bank";

export type Interaction = { title: string; body: string; link?: { href: string; label: string } };

export type Interior = {
  id: string;
  name: string;
  /** What each hotspot shows when the player walks up to it, keyed by hotspot id from scene.json. */
  interactions: Record<string, Interaction>;
};

const feeLines = fees.slice(0, 4).map(([service, fee]) => `${service}: ${fee}.`).join(" ");

export const interiors: Record<string, Interior> = {
  "lost-property": {
    id: "lost-property", name: "Lost Property",
    interactions: {
      release: { title: "Tagged Property counter", body: "The clerk sets three forms on the counter. Collecting an object starts with the number on its tag." },
    },
  },
  dreamwell: {
    id: "dreamwell", name: "Dreamwell Rest Desk",
    interactions: {
      verification: { title: "Rest Desk", body: "The attendant keeps the handwriting forms beside the pillow request slips." },
    },
  },
  department: {
    id: "department", name: "Department Recognition Office",
    interactions: {
      fitting: { title: "Manager’s fitting desk", body: "A soft measuring tape and a stack of very firm eligibility forms." },
      recognition: { title: "Recognition review", body: "Horns are displayed in order of importance. The matching pay grades are displayed in a different department." },
    },
  },
  bank: {
    id: "bank",
    name: "Unicorn Warehouse Bank",
    interactions: {
      teller: {
        title: "Everyday Tokens counter",
        body: "A teller unicorn will be with you shortly. Balance inquiries are complimentary on the Tokens page and 1 Token at the counter.",
        link: { href: "/tokens#accounts", label: "See your accounts" },
      },
      pen: {
        title: "The chained pen",
        body: "The only pen in Unicornopolis, chained to the counter for your convenience. The padlock key was turned in to Lost Property at the police station.",
        link: { href: "/quests/horn-fitting?stop=bank#quest-counter", label: "Ask about the Horn Fitting" },
      },
      vault: {
        title: "Sparkle Savings",
        body: "Your Sparkle is in here, appreciating at 5.00% Annual Percentage Sparkle. Sparkle is not redeemable, transferable, or convertible to Tokens.",
        link: { href: "/tokens#sparkle", label: "About Sparkle Savings" },
      },
      kiosk: {
        title: "Early Payday",
        body: "Why wait for the client? Advance up to 70% of a pending payout. One simple fee, taken care of up front.",
        link: { href: "/tokens#early-payday", label: "About Early Payday" },
      },
      fees: {
        title: "Simple, transparent fees",
        body: `${feeLines} All fees are waived during your welcome period.`,
        link: { href: "/tokens#fees", label: "Full fee schedule" },
      },
    },
  },
};

export const interiorAssets = (id: string) => ({
  scene: `/interiors/${id}/scene.glb`,
  data: `/interiors/${id}/scene.json`,
  still: `/interiors/${id}/still.webp`,
});
