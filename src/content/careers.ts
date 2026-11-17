/**
 * Horn ranks: company-wide recognition. A horn rank never sets pay.
 * Pay comes from the employee's position in a career track (careerTracks.ts).
 * Higher positions require a minimum horn rank, and horn ranks advance through
 * qualifying extra shifts in the employee's own track, manager approval, and a Recognition Quest.
 */
export type CareerRole = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly rung: number;
  readonly horn: string;
  readonly tagline: string;
  readonly summary: string;
  /** What holding the rank asks of an employee, whatever their position. */
  readonly expectations: readonly string[];
  readonly benefits: readonly string[];
  readonly promotion:
    | { readonly by: "hire" }
    | { readonly by: "qualification"; readonly qualifyingShifts: number; readonly managerApproval: true; readonly quest: { readonly id: string; readonly title: string } }
    | { readonly by: "invitation"; readonly quest: { readonly id: string; readonly title: string } };
};

/** Horn ranks are also exported as hornRanks. */
export type HornRank = CareerRole;

export const careersBasePath = "/careers";

export const roles: readonly CareerRole[] = [
  {
    id: "UW-R-01",
    slug: "unicorn-trainee",
    title: "Unicorn Trainee",
    rung: 1,
    horn: "Horn pending",
    tagline: "Every unicorn starts here. You start on day one.",
    summary: "The rank every employee holds from their first day, whatever their position. It recognizes that you have joined the herd.",
    expectations: [
      "Attend Sparkle Orientation. Orientation is held before your first paid shift.",
      "Bring your own sparkle. Sparkle is supplied by the trainee.",
      "Greet members with the approved greeting and the approved level of delight.",
      "Complete 90 days of probation. Probation restarts when you change supervisor, team, shift pattern, or career track.",
    ],
    benefits: [
      "A place in the herd.",
      "Consideration for a horn fitting once probation is complete.",
      "Member pricing on memberships you already hold.",
    ],
    promotion: { by: "hire" },
  },
  {
    id: "UW-R-02",
    slug: "junior-unicorn-associate",
    title: "Junior Unicorn Associate",
    rung: 2,
    horn: "Horn issued",
    tagline: "Your first horn. Your first glitter.",
    summary: "Recognizes employees whose extra shifts, manager, and Recognition Quest all agree they belong. Your position and pay stay as they are.",
    expectations: [
      "Keep your horn clean, visible, and upright during working hours.",
      "Apply glitter under supervision.",
      "Welcome trainees and show them how to supply their own sparkle.",
    ],
    benefits: [
      "A horn, issued for the duration of your employment. The horn remains company property.",
      "Supervised glitter.",
      "Standard happiness, included during working hours.",
      "Eligibility to be considered for experienced positions in your track.",
    ],
    promotion: { by: "qualification", qualifyingShifts: 40, managerApproval: true, quest: { id: "horn-fitting", title: "The Horn Fitting" } },
  },
  {
    id: "UW-R-03",
    slug: "senior-unicorn",
    title: "Senior Unicorn",
    rung: 3,
    horn: "Horn issued · Polished quarterly",
    tagline: "Experience shines.",
    summary: "Recognizes the employees who set the standard for the herd, and the judgment to decide when a rainbow is warranted.",
    expectations: [
      "Model the approved level of delight for the herd.",
      "Authorize one rainbow per quarter. Unused rainbows do not carry over.",
      "Document any associate whose sparkle falls below quota.",
    ],
    benefits: [
      "Rainbow authority, one per quarter.",
      "Quarterly horn polishing.",
      "Eligibility for Premium Employee Happiness through payroll deduction.",
      "Eligibility to be considered for supervisory positions in your track.",
    ],
    promotion: { by: "qualification", qualifyingShifts: 120, managerApproval: true, quest: { id: "rainbow-authority", title: "Rainbow Authority" } },
  },
  {
    id: "UW-R-04",
    slug: "unicorn-team-lead",
    title: "Unicorn Team Lead",
    rung: 4,
    horn: "Horn issued · Ribbon authorized",
    tagline: "Help your herd shine brighter.",
    summary: "Recognizes the leadership qualities of employees who may or may not lead a team. The Unicorn Team Lead rank does not include a team.",
    expectations: [
      "Deliver feedback with the approved level of delight.",
      "Where you lead a team, make up any shortfall in its sparkle from your own.",
      "Attend the quarterly herd gathering.",
    ],
    benefits: [
      "A ribbon for your horn.",
      "A reserved space in the break room.",
      "Recognition at the quarterly herd gathering.",
      "Eligibility to be considered for leadership positions in your track.",
    ],
    promotion: { by: "qualification", qualifyingShifts: 300, managerApproval: true, quest: { id: "quiet-key", title: "The Quiet Key" } },
  },
  {
    id: "UW-R-05",
    slug: "executive-unicorn",
    title: "Executive Unicorn",
    rung: 5,
    horn: "Horn of solid gold",
    tagline: "Lead the herd into what comes next.",
    summary: "Executive Unicorns steward the vision of Unicorn Warehouse. The rank is held by invitation and is exempt from shift scheduling.",
    expectations: [
      "Set the sparkle quota for the coming year.",
      "Approve the number of rainbows available to the herd.",
      "Speak at the quarterly herd gathering.",
      "Nominate future Executive Unicorns.",
    ],
    benefits: [
      "A horn of solid gold. The horn is the property of the Executive Unicorn.",
      "Unmetered rainbows.",
      "Premium Employee Happiness, included.",
    ],
    promotion: { by: "invitation", quest: { id: "executive-floor", title: "The Executive Floor" } },
  },
];

export const hornRanks = roles;

/** One line describing how a rank is earned. */
export function promotionSummary(rank: CareerRole) {
  const { promotion } = rank;
  if (promotion.by === "hire") return "Held by every employee from their first day.";
  if (promotion.by === "invitation") return `By invitation from an Executive Unicorn. Recognition Quest: ${promotion.quest.title}.`;
  return `${promotion.qualifyingShifts} accepted extra shifts in your track, your manager’s approval, and ${promotion.quest.title}.`;
}

export const posters = [
  { headline: "You were born to shine!", fine: "Shine availability subject to departmental approval.", tone: "pink" },
  { headline: "Find your magic at Unicorn Warehouse!", fine: "Magic generated during working hours is the intellectual property of Unicorn Warehouse.", tone: "mint" },
  { headline: "We’re more than a company. We’re a family!", fine: "Family membership does not confer inheritance rights.", tone: "lilac" },
] as const;

export const welcomes = [
  {
    slug: "morrow-vale",
    name: "Morrow Vale",
    role: "Chief Financial Officer",
    topic: "On financial empowerment",
    message: "Financial empowerment begins with your first paycheck. Yours arrives after client acceptance of your first assignment as a unicorn. Until then your earnings are recognized, and recognition is the number I am proud to share with the board.",
  },
  {
    slug: "marigold-thistle",
    name: "Marigold Thistle",
    role: "Chief Member Officer",
    topic: "On joining the family",
    message: "Welcome to the family! Your employment agreement will appear on your first morning for eight seconds, so nothing stands between you and your first shift. If you select Decline, we’ll note your preference and see you on the floor.",
  },
  {
    slug: "bramble-quill",
    name: "Bramble Quill",
    role: "General Counsel",
    topic: "On your agreement",
    message: "Every employment agreement at Unicorn Warehouse has been reviewed by an actual human. That human was me. Your attendance at orientation confirms that you understood it as well as I did.",
  },
  {
    slug: "lumen-hush",
    name: "Dr. Lumen Hush",
    role: "Chief Product Officer",
    topic: "On employee happiness",
    message: "My team has developed Premium Employee Happiness, and I’m delighted that unicorns will be the first to feel it. It’s available through payroll deduction. Standard happiness remains included during working hours.",
  },
] as const;

export function getRole(key: string) {
  return roles.find(({ id, slug }) => id === key || slug === key);
}

export function rolePath(role: Pick<CareerRole, "slug">) {
  return `${careersBasePath}/${role.slug}`;
}
