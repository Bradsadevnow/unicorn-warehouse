export type CareerRole = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly rung: number;
  /** Tokens per hour. Undefined where compensation is confidential. */
  readonly rate?: number;
  readonly rateNote: string;
  readonly horn: string;
  readonly tagline: string;
  readonly summary: string;
  readonly applicants: number;
  readonly openings: number;
  readonly status: "Open" | "Filling fast" | "By invitation";
  readonly schedule: string;
  readonly responsibilities: readonly string[];
  readonly requirements: readonly string[];
  readonly benefits: readonly string[];
  readonly advancement: readonly string[];
};

export const careersBasePath = "/careers";

/** Accepted Goodshift or HelpingHand assignments required before applying for Unicorn Trainee. */
export const traineeEligibility = 40;

export const roles: readonly CareerRole[] = [
  {
    id: "UW-C-01",
    slug: "unicorn-trainee",
    title: "Unicorn Trainee",
    rung: 1,
    rate: 12,
    rateNote: "12 Tokens per hour",
    horn: "Horn pending",
    tagline: "Every unicorn starts somewhere. You start here.",
    summary: "Begin your journey with the herd. Trainees learn the Unicorn Warehouse way on the warehouse floor, in the support queue, and wherever the day needs them.",
    applicants: 4812,
    openings: 6,
    status: "Filling fast",
    schedule: "Shifts assigned weekly · Availability required daily",
    responsibilities: [
      "Complete the shifts assigned to you across the Portfolio.",
      "Attend Sparkle Orientation. Orientation is held before your first paid shift.",
      "Bring your own sparkle. Sparkle is supplied by the trainee.",
      "Greet members with the approved greeting and the approved level of delight.",
    ],
    requirements: [
      `${traineeEligibility} accepted assignments at Goodshift or HelpingHand. Assignments awaiting client acceptance are not counted.`,
      "An active Unicorn Warehouse membership in good standing.",
      "A positive attitude, demonstrated continuously.",
    ],
    benefits: [
      "A place in the herd.",
      "A horn fitting, scheduled when probation is complete.",
      "Member pricing on memberships you already hold.",
    ],
    advancement: [
      "Complete 90 days of probation. Probation restarts when you change supervisor, team, or shift pattern.",
      "Trainees who complete probation are considered for Junior Unicorn Associate at the next review. Reviews are held when a position opens.",
    ],
  },
  {
    id: "UW-C-02",
    slug: "junior-unicorn-associate",
    title: "Junior Unicorn Associate",
    rung: 2,
    rate: 18,
    rateNote: "18 Tokens per hour",
    horn: "Horn issued",
    tagline: "Your first horn. Your first glitter.",
    summary: "Associates are the heart of the herd. You’ll wear your horn with pride and take on the work that keeps every membership feeling magical.",
    applicants: 1260,
    openings: 3,
    status: "Open",
    schedule: "Full time · Shift pattern set by your team lead",
    responsibilities: [
      "Work your assigned shifts and the shifts of associates who are unavailable.",
      "Apply glitter under supervision. Associates are eligible for supervised glitter.",
      "Keep your horn clean, visible, and upright during working hours.",
      "Welcome trainees and show them how to supply their own sparkle.",
    ],
    requirements: [
      "Completed probation as a Unicorn Trainee.",
      "A signed horn custody agreement.",
      "No open appeals against the Portfolio.",
    ],
    benefits: [
      "A horn, issued for the duration of your employment.",
      "Supervised glitter.",
      "Standard happiness, included during working hours.",
    ],
    advancement: [
      "Associates are considered for Senior Unicorn after three consecutive reviews at Exceeds Sparkle.",
      "A review missed by your supervisor is recorded as Meets Sparkle.",
    ],
  },
  {
    id: "UW-C-03",
    slug: "senior-unicorn",
    title: "Senior Unicorn",
    rung: 3,
    rate: 35,
    rateNote: "35 Tokens per hour",
    horn: "Horn issued · Polished quarterly",
    tagline: "Experience shines.",
    summary: "Senior Unicorns set the standard. You’ll handle the moments that matter most to members and decide, within policy, when a rainbow is warranted.",
    applicants: 310,
    openings: 1,
    status: "Open",
    schedule: "Full time · On call for member moments",
    responsibilities: [
      "Resolve the member moments escalated to you by associates.",
      "Authorize one rainbow per quarter. Unused rainbows do not carry over.",
      "Model the approved level of delight for the herd.",
      "Document any associate whose sparkle falls below quota.",
    ],
    requirements: [
      "Three consecutive reviews at Exceeds Sparkle as a Junior Unicorn Associate.",
      "Sound judgment about rainbows.",
      "Willingness to remain on call.",
    ],
    benefits: [
      "Rainbow authority, one per quarter.",
      "Quarterly horn polishing.",
      "Eligibility for Premium Employee Happiness through payroll deduction.",
    ],
    advancement: [
      "Senior Unicorns are considered for Unicorn Team Lead when a team lead position opens.",
      "A team lead position opens when a team lead leaves the herd.",
    ],
  },
  {
    id: "UW-C-04",
    slug: "unicorn-team-lead",
    title: "Unicorn Team Lead",
    rung: 4,
    rate: 42,
    rateNote: "42 Tokens per hour",
    horn: "Horn issued · Ribbon authorized",
    tagline: "Help your herd shine brighter.",
    summary: "Team Leads bring out the best in every unicorn. You’ll set shift patterns, track sparkle, and make sure your team meets its quota together.",
    applicants: 96,
    openings: 1,
    status: "Open",
    schedule: "Full time · Present for every shift your team works",
    responsibilities: [
      "Ensure every unicorn on your team meets their sparkle quota.",
      "Make up any shortfall in your team’s sparkle from your own.",
      "Set shift patterns. A change of shift pattern restarts probation for trainees on your team.",
      "Conduct reviews when a position opens.",
    ],
    requirements: [
      "Experience as a Senior Unicorn.",
      "A record of teams that met quota.",
      "Comfort delivering feedback with the approved level of delight.",
    ],
    benefits: [
      "A ribbon for your horn.",
      "A reserved space in the break room.",
      "Recognition at the quarterly herd gathering, attendance required.",
    ],
    advancement: [
      "Team Leads who meet quota for eight consecutive quarters may be nominated for the Executive Unicorn program.",
      "Nominations are made by Executive Unicorns.",
    ],
  },
  {
    id: "UW-C-05",
    slug: "executive-unicorn",
    title: "Executive Unicorn",
    rung: 5,
    rateNote: "Compensation confidential",
    horn: "Horn of solid gold",
    tagline: "Lead the herd into what comes next.",
    summary: "Executive Unicorns steward the vision of Unicorn Warehouse. The role carries responsibility for the future of the herd and is exempt from shift scheduling.",
    applicants: 0,
    openings: 0,
    status: "By invitation",
    schedule: "Exempt from shift scheduling",
    responsibilities: [
      "Set the sparkle quota for the coming year.",
      "Approve the number of rainbows available to the herd.",
      "Speak at the quarterly herd gathering.",
      "Nominate future Executive Unicorns.",
    ],
    requirements: [
      "Nomination by an Executive Unicorn.",
      "Alignment with the vision.",
      "Shift experience is not required.",
    ],
    benefits: [
      "A horn of solid gold. The horn is the property of the Executive Unicorn.",
      "Unmetered rainbows.",
      "Premium Employee Happiness, included.",
    ],
    advancement: [
      "Executive Unicorns have reached the top of the herd.",
    ],
  },
];

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
