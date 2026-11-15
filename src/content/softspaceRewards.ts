import warmer from "@/assets/softspace-warmer.webp";
import cooler from "@/assets/softspace-cooler.webp";
import heating from "@/assets/softspace-heating.webp";
import cooling from "@/assets/softspace-cooling.webp";
import daily from "@/assets/softspace-daily.webp";
import seasonal from "@/assets/softspace-seasonal.webp";
import reserve from "@/assets/softspace-reserve.webp";

export const softspaceRewards = [
  {
    id: "one-degree-warmer",
    image: warmer,
    name: "One Degree Warmer",
    tokens: 1,
    description: "Raise your Softspace temperature setting by 1°. Ideal when the office feels like the produce aisle.",
  },
  {
    id: "one-degree-cooler",
    image: cooler,
    name: "One Degree Cooler",
    tokens: 1,
    description: "Lower your Softspace temperature setting by 1°. A little relief, one degree at a time.",
  },
  {
    id: "heating-package",
    image: heating,
    name: "The Heating Package",
    tokens: 8,
    description: "Get ten 1° warming adjustments to use whenever you like. Keep a few degrees in reserve.",
  },
  {
    id: "summer-cooling",
    image: cooling,
    name: "The Cooling Package",
    tokens: 8,
    summerTokens: 16,
    description: "Get ten 1° cooling adjustments. The summer redemption rate applies from June through August.",
  },
] as const;

export function softspaceRewardPrice(reward: (typeof softspaceRewards)[number]) {
  const base = `${reward.tokens} ${reward.tokens === 1 ? "Token" : "Tokens"}`;
  return "summerTokens" in reward ? `${base} · ${reward.summerTokens} in summer` : base;
}

export const softspaceSubscriptions = [
  {
    name: "Softspace Daily Balance",
    image: daily,
    price: "12 Tokens / day",
    body: "Set a weekday and weekend temperature profile and adjust each one as your plans change.",
    benefits: [
      "Each day includes six 1° warming adjustments and six 1° cooling adjustments, issued in two equal batches at 6 a.m. and 6 p.m. local time.",
      "Unused morning adjustments roll into the evening. At midnight, up to two unused adjustments in each direction transfer to the same time window the next day. Transferred adjustments expire at the end of that window.",
      "A change that crosses your profile’s baseline uses one adjustment per degree of movement. Only the direction of travel determines which allowance applies.",
      "After the relevant allowance runs out, additional adjustments cost 1 Token per degree. Updating a profile’s baseline takes effect with the next morning’s batch.",
    ],
  },
  {
    name: "Softspace Seasonal Select",
    image: seasonal,
    price: "180 Tokens / 30-day cycle",
    body: "Choose a primary temperature direction for each billing cycle and build a reserve for changes in the forecast.",
    benefits: [
      "Each cycle includes 90 one-degree adjustments in your primary direction and 30 in the other. One third of each allowance becomes available on days 1, 11, and 21.",
      "From June through August, cooling uses two allowance units per degree between noon and 8 p.m. local time. Once your cooling allowance is depleted, additional degrees cost 1 Token each.",
      "At renewal, up to 15 unused primary-direction units carry forward in their original direction. They become available on day 11 and expire at the end of that cycle.",
      "You can change your primary direction at renewal. Units that carry forward keep their original direction and are used before new units in that direction.",
    ],
  },
  {
    name: "Softspace Climate Reserve",
    image: reserve,
    price: "480 Tokens / 30-day cycle",
    body: "Maintain separate Home, Work, and Travel profiles with a shared reserve for changes outside your usual schedule.",
    benefits: [
      "Each cycle includes 180 units. Home and Work each receive 30 warming and 30 cooling units. Travel receives 15 in each direction. The remaining 30 enter the shared reserve. Half of each allocation is released on day 1 and half on day 16.",
      "An adjustment draws from the active profile before the reserve. From June through August, cooling costs three units per degree on weekdays from noon to 8 p.m. and two units per degree on weekends during the same hours. All other adjustments cost one unit per degree.",
      "On days 10 and 20, you may transfer up to 12 released units into another profile. Every three units transferred become two units in the destination profile, in the original direction. Transfers requested after 6 p.m. post the next morning.",
      "A profile switch takes effect on the next half-hour. A scheduled adjustment uses the profile and local rate in effect when it runs. If the profile and reserve together cannot cover a full degree, that degree costs 1 Token and the remaining units stay in place.",
      "At renewal, up to 18 unused reserve units carry into the next cycle. They unlock on day 16, are used before new reserve units, and expire on day 30. Profile units expire at renewal.",
    ],
  },
];
