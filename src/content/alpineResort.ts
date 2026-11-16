export const alpineResortName = "Everair Grand Alpine Resort & Casino";
export const heatedWalkway = "The heated, step-free walkway connects the hotel, casino, and spa. It’s complimentary for every registered resort guest.";
export const skiLiftPolicy = "Ski lifts are operated separately. Lift access requires a valid pass.";

export const alpineRooms = [
  { id: "village", name: "Village King", tokens: 520, detail: "A quiet king room overlooking the lower village and the lights along the switchback." },
  { id: "ridge", name: "Ridge Double", tokens: 680, detail: "Two beds, a window seat, and room to hang up the day’s ski gear." },
  { id: "summit", name: "Summit Suite", tokens: 980, detail: "A private balcony, late checkout, and a seasonal Everair blend from the Lodge." },
] as const;

export const alpineLiftPass = { tokens: 125, label: "Day lift pass" } as const;
export const skiAndStay = { name: "Ski & Stay", room: alpineRooms[1], nights: 2, passes: 2, tokens: 1_495 } as const;

export const alpineMembershipCycle = 30;
export const alpineMemberships = [
  { id: "fireside", name: "Fireside Member", price: 165, benefit: "One spa day for the named member and priority access to Alpine Room reservations each cycle. Dinner is priced separately." },
  { id: "first-chair", name: "First Chair Club", price: 320, benefit: "Two single-day lift passes and one day of ski locker access each cycle. Issue the passes before heading to the lift." },
  { id: "summit-circle", name: "Summit Circle", price: 925, benefit: "One Summit Suite night, two single-day lift passes, and one spa day each cycle. The suite night is available for arrivals Sunday through Thursday, subject to availability." },
] as const;

export function estimateAlpineStay(roomTokens: number, nights: number, passes: number) {
  const lodging = roomTokens * nights;
  const lifts = alpineLiftPass.tokens * passes;
  return { lodging, lifts, total: lodging + lifts };
}
