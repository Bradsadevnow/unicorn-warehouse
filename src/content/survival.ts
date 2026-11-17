/**
 * Member wellbeing. Five stats on a 0–100 scale, measured continuously on the game clock.
 * Rates and amounts are first-pass values for playtesting.
 */

export const statIds = ["oxygen", "satiety", "energy", "comfort", "morale"] as const;
export type StatId = typeof statIds[number];
export type Stats = Record<StatId, number>;

export const statInfo: Record<StatId, { name: string; icon: string; restoredBy: string }> = {
  oxygen: { name: "Oxygen", icon: "🌬️", restoredBy: "Everair AirLink or ambient air where available" },
  satiety: { name: "Satiety", icon: "🍟", restoredBy: "Meals at Horn & Fries and groceries from Market" },
  energy: { name: "Energy", icon: "💤", restoredBy: "A night at home or a Dreamwell nap" },
  comfort: { name: "Comfort", icon: "🌡️", restoredBy: "Your home and a Softspace membership" },
  morale: { name: "Morale", icon: "🎟️", restoredBy: "Fun Hours at the Funplex" },
};

/** Every new member starts here. */
export const startingStats: Stats = { oxygen: 88, satiety: 72, energy: 65, comfort: 55, morale: 62 };

/** Conditions follow from the stats. They are not tracked separately. */
export const conditions = [
  { id: "oxygen-deficient", stat: "oxygen", below: 20, name: "Oxygen Deficient", effect: "Assignments are unavailable until your oxygen recovers." },
  { id: "sleep-deprived", stat: "energy", below: 20, name: "Sleep Deprived", effect: "Your productivity score reflects your rest." },
  { id: "malnourished", stat: "satiety", below: 15, name: "Malnourished", effect: "You use energy half again as fast." },
  { id: "housing-distress", stat: "comfort", below: 20, name: "Housing Distress", effect: "Sleep restores less energy, and morale slips while you are home." },
  { id: "disengaged", stat: "morale", below: 25, name: "Disengaged", effect: "Goodshift recommends a Fun Hour." },
] as const satisfies readonly { id: string; stat: StatId; below: number; name: string; effect: string }[];
export type ConditionId = typeof conditions[number]["id"];

export function activeConditions(stats: Stats) {
  return conditions.filter(({ stat, below }) => stats[stat] < below);
}

/**
 * Goodshift's productivity score. Oxygen is a gate rather than a weight: a member in oxygen distress
 * cannot perform normally whatever the other stats say.
 */
export function productivityScore(stats: Stats) {
  const score = (0.30 * stats.energy + 0.25 * stats.satiety + 0.20 * stats.comfort + 0.15 * stats.morale) / 0.90;
  return Math.round(stats.oxygen < 20 ? Math.min(score, 19) : score);
}

export const productivityBands = [
  { min: 80, name: "Excellent performance" },
  { min: 60, name: "Standard performance" },
  { min: 40, name: "Reduced productivity · Coaching" },
  { min: 20, name: "Performance improvement plan" },
  { min: 0, name: "Temporarily ineligible for assignments" },
] as const;

export function productivityBand(score: number) {
  return productivityBands.find(({ min }) => score >= min)!;
}

/** Below this score, clients do not accept extra-shift work. */
export const acceptanceThreshold = 40;
/** Below this score, Goodshift does not offer assignments. */
export const eligibilityThreshold = 20;

/** Hourly change for each activity. Sleep recovery is scaled by the home. */
export const rates = {
  work: { satiety: -6, energy: -5.5, morale: -1, comfort: -1 },
  awake: { satiety: -3.5, energy: -3, morale: -0.5, comfort: 0 },
  nap: { satiety: -3, energy: 36, morale: 0.5, comfort: 0 },
  sleep: { satiety: -1, energy: 9, morale: 0.5, comfort: 0 },
} as const;
export type Activity = keyof typeof rates;

/** Members sleep from this time until the day starts, unless they are busy. */
export const bedtime = "22:00";
/** Comfort and oxygen move toward their current level at these hourly rates. */
export const comfortDrift = 2;
export const oxygenDrift = 8;
/** Members without a home on file sleep wherever they can. */
export const homelessComfort = 20;
export const homelessSleepQuality = 0.5;
export const softspaceComfort = 25;
/** Oxygen levels on ambient air, at rest and at work, and on an active AirLink plan. */
export const oxygenLevels = { ambient: 72, ambientWork: 60, everair: 96 } as const;
/** While Everair Sync is active and the plan is past due, ambient air is unavailable. */
export const lapsedOxygenPerHour = -6;
/** Each outstanding bill weighs on morale, per hour. */
export const unpaidMoralePerHour = -0.25;

/** What happens when a stat runs out. Neither ends the run. */
export const interventions = {
  nutrition: { label: "Wellness · Nutritional intervention", amount: 60, satiety: 40, energy: -10, morale: -5 },
  reconnect: { label: "Everair · Emergency Continuity Reconnect", amount: 250, oxygen: 35 },
} as const;

/** Dispatched to the home address when an AirLink renewal fails. Delivery marks the reserve benefit as used. */
export const reserveOrb = { item: "Everair reserve orb", oxygen: 70 } as const;

export const funHourMorale = 20;
export const mealMorale = 2;
export const eatMinutes = 15;
export const eatOutMinutes = 30;

/** Market groceries, by serving. Items that need cooking need a kitchen at home. */
export const groceries: Record<string, { servings: number; satiety: number; kitchen: boolean }> = {
  // Cooked at home: about 6 satiety per Token.
  "Large eggs": { servings: 4, satiety: 10, kitchen: true },
  "Long-grain rice": { servings: 5, satiety: 6, kitchen: true },
  "Pasta": { servings: 2, satiety: 9, kitchen: true },
  "Tomato soup": { servings: 1, satiety: 15, kitchen: true },
  "Frozen dinner": { servings: 1, satiety: 30, kitchen: true },
  "Rolled oats": { servings: 4, satiety: 6, kitchen: true },
  "Frozen mixed vegetables": { servings: 3, satiety: 6, kitchen: true },
  "Chicken thighs": { servings: 4, satiety: 15, kitchen: true },
  // Ready to eat anywhere: about 4 satiety per Token.
  "Banana": { servings: 1, satiety: 4, kitchen: false },
  "Sandwich bread": { servings: 8, satiety: 2, kitchen: false },
  "Black beans": { servings: 1, satiety: 8, kitchen: false },
  "Milk": { servings: 4, satiety: 4, kitchen: false },
  "Apples": { servings: 6, satiety: 5, kitchen: false },
  "Carrots": { servings: 4, satiety: 4, kitchen: false },
};

/** Horn & Fries menu items, by satiety. */
export const menuSatiety: Record<string, number> = {
  "house-double": 32, "little-classic": 20, "crunch-combo": 42, "double-combo": 48, "waffle-fries": 12,
  "extra-sauce": 1, "strawberry-shake": 14, "fountain-drink": 3, "shift-melt": 14, "snack-fries": 7, "break-combo": 26,
};
