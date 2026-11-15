import type { HouseContent } from "./houseContent";
import eternuityStill from "@/assets/eternuity-chibi.webp";

export const everairTermsNotes = [
  ["Everair Sync", "An optional implant helps you settle into Everair. Once you're acclimated, ordinary air may feel a little less satisfying."],
  ["Pay as you breathe", "Your meter tracks each breath. A small share of your future earnings covers the air you use today."],
  ["A scent for your day", "Choose Focus, Creativity, or Zen. A little flutter when you switch scents is part of the experience."],
  ["A little backup", "If a payment doesn't go through, we'll send one backup air orb by drone while you update your details."],
  ["Your canister history", "See every canister you've used in one place. Your history stays on file after your membership ends."],
];

export const tomorrowlyTermsDraft: HouseContent = {
  slug: "eternuity",
  no: "07",
  name: "Tomorrowly",
  category: "More time, renewed quarterly",
  accent: "#e9c88a",
  object: "hourglass",
  pose: {
    fitWidth: 3.9,
    tilt: 0.04,
    roll: -0.17,
    baseYaw: -0.2,
    sway: true,
    yaw: [0.7, -0.7, 0.9, 1.2],
    heroScale: 1,
    side: [0.53, 0.7],
    sideScale: [0.78, 0.55],
    objectScale: [0.84, 0.68],
    apartScale: [0.67, 0.52],
  },
  hero: {
    lineA: "A brighter future",
    lineB: "starts today.",
    lede: "Keep the age you are today and share a little of your Token yield with the people you love.",
    tag: "Policy No. EN-0007",
  },
  manifesto: {
    lines: [
      "Good plans deserve a little more time.",
      "Keep the age you feel at home in.",
      "We'll check in with you every quarter.",
    ],
    body: "Tomorrowly keeps your biological age fixed at enrollment. We review your premium as your coverage continues, and you can share part of your Token yield with your heirs.",
  },
  dissection: {
    title: "The Policy Clock",
    callouts: [
      { title: "Age lock", body: "We freeze your biological age at enrollment. Your payment schedule continues to mature." },
      { title: "Quarterly sustainment", body: "Each tune-up renews your coverage for another quarter. A missed appointment returns you to the standard passage of time." },
      { title: "Wealth recapture", body: "We convert assets above your policy threshold into Tomorrowly Equity Tokens. Keep the equity and send 2% of the yield to your heirs in spendable Portfolio Tokens." },
      { title: "Heir participation", body: "Direct 2% of your Token yield to your heirs while you keep your Equity Tokens. They can finally profit from your continued presence at Thanksgiving." },
    ],
  },
  still: {
    image: eternuityStill,
    alt: "A small pink and gold hourglass with lavender sand.",
    line: "A brighter future starts today.",
    meta: "Gold finish · Quarterly renewal · Variable premium",
  },
  figures: [
    { value: 750, unit: "$M", text: "valuation before the first subscriber outlives the model" },
    { value: 4, unit: "/ yr", text: "sustainment appointments per year, for as many years as necessary" },
    { value: 2, unit: "%", text: "of your Token yield available to participating heirs" },
    { value: 150, unit: "%", text: "retention, once we include your outstanding obligations" },
  ],
  capabilities: {
    title: "Plan for a longer term.",
    items: [
      ["Eternal Youth Annuity", "Choose the age you'd like to keep. We'll decide what it costs to keep it next quarter."],
      ["Subscriber Voting Cap", "Your assets can compound indefinitely. Your voting rights have a ceiling."],
      ["Immortal Venture Fund", "We invest the equity we recapture from you. Management fees are calculated over your remaining lifetime."],
      ["Pre-Probate Arbitration", "Settle the estate now, while everyone is still available to argue about it."],
      ["Mortality Offset Dividends", "Qualifying years earn Tokens you can save or spend across the Portfolio. One day of air is a popular first redemption."],
      ["Employer Longevity Benefit", "Your employer can sponsor your next quarter as part of the wellness program. Tenure is now measured in eras."],
    ],
  },
  feature: {
    label: "Estate services",
    aside: "For you and your beneficiaries",
    title: "Leave them something eventually.",
    body: "Keep your Tomorrowly Equity Tokens and the head of the table. Your heirs receive a share of the Token yield they can save or spend across the Portfolio. Every year you defer the inheritance, we send them a statement.",
    facts: [
      ["Principal", "Equity Tokens"],
      ["Heir yield", "Portfolio Tokens"],
      ["Inheritance", "Pending"],
    ],
  },
  plans: [],
  notices: [
    "Update your plans as the years go by.",
    "Your heirs can enjoy a share of the yield along the way.",
    "We review your premium every quarter.",
  ],
  close: {
    title: "Renew your lifetime.",
    cta: "Extend my policy",
    done: "You're covered for another quarter. Your updated premium is ready to view.",
  },
};
