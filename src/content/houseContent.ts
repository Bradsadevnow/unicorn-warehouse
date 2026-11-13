import type { StaticImageData } from "next/image";
import aeroStill from "@/assets/aero-chibi.webp";
import everairAlpineHq from "@/assets/everair-alpine-hq.webp";
import somnaraStill from "@/assets/somnara-chibi.webp";
import sublaborixStill from "@/assets/sublaborix-chibi.webp";
import termifluxStill from "@/assets/termiflux-chibi.webp";
import undieflowStill from "@/assets/undieflow-chibi.webp";
import demandeternalStill from "@/assets/demandeternal-chibi.webp";
import eternuityStill from "@/assets/eternuity-chibi.webp";

export type ObjectKind = "canister" | "pod" | "badge" | "terminal" | "implant" | "chain" | "hourglass";

/** How the 3D object is staged. Positions are fractions of half the viewport. */
export type Pose = {
  /** Object width in scene units, used to shrink it on narrow screens. */
  fitWidth: number;
  /** Widest the object ever appears, in scene units. Keeps it clear of the
   *  callouts during the dissection. Defaults to most of fitWidth. */
  span?: number;
  /** Constant forward tilt, radians. */
  tilt: number;
  /** Roll while resting beside the manifesto. */
  roll: number;
  /** Resting yaw, radians. 0 shows the object's front. */
  baseYaw: number;
  /** True for objects with a front: they sway instead of turning forever. */
  sway: boolean;
  /** Yaw added across each scroll phase: hero, return, dissection, exit. */
  yaw: [hero: number, enter: number, object: number, exit: number];
  heroScale: number;
  side: [wide: number, narrow: number];
  sideScale: [wide: number, narrow: number];
  objectScale: [wide: number, narrow: number];
  apartScale: [wide: number, narrow: number];
};

export type HouseContent = {
  slug: string;
  no: string;
  name: string;
  category: string;
  /** Accent colour for this house. */
  accent: string;
  object: ObjectKind;
  pose: Pose;
  hero: { lineA: string; lineB: string; lede: string; tag: string };
  manifesto: { lines: [string, string, string]; body: string };
  dissection: { title: string; callouts: { title: string; body: string }[] };
  still: { image: StaticImageData; alt: string; line: string; meta: string; position?: string };
  figures: { value: number; unit: string; text: string }[];
  capabilities: { title: string; items: [string, string][] };
  feature: {
    label: string;
    aside: string;
    title: string;
    body: string;
    facts: [string, string][];
    image?: StaticImageData;
    alt?: string;
    position?: string;
    link?: { href: string; label: string };
  };
  plans: { name: string; price: string; body: string }[];
  notices: string[];
  close: { title: string; cta: string; done: string };
};

const aerovitalux: HouseContent = {
  slug: "aerovitalux",
  no: "01",
  name: "Everair",
  category: "Fresh air, on schedule",
  accent: "#b4d8e7",
  object: "canister",
  pose: {
    fitWidth: 3.8,
    tilt: 0.22,
    roll: -0.08,
    baseYaw: 0,
    sway: false,
    yaw: [0.6, -0.6, 0.9, 0.6],
    heroScale: 0.85,
    side: [0.5, 0.5],
    sideScale: [0.7, 0.7],
    objectScale: [0.84, 0.86],
    apartScale: [0.7, 0.72],
  },
  hero: {
    lineA: "Every breath,",
    lineB: "a little better.",
    lede: "Fresh alpine air, delivered on a schedule that suits you.",
    tag: "Canister No. 0X7-884219",
  },
  manifesto: {
    lines: [
      "Fresh air makes a difference.",
      "Especially on days you can't get away.",
      "We'll bring the mountains to you.",
    ],
    body: "Fresh alpine air arrives on your schedule. Each canister pairs with your Everair mask, so every breath appears in the same account.",
  },
  dissection: {
    title: "The Canister",
    callouts: [
      {
        title: "A perfect fit",
        body: "The valve is designed for your Everair mask. Your mask accepts Everair canisters exclusively.",
      },
      {
        title: "Ready for the next delivery",
        body: "Each canister deactivates when empty. Your next one arrives on your usual delivery day.",
      },
      {
        title: "Adaptive Purity Protocol",
        body: "Purity is quietly reduced once you acclimatise, then restored. Your appreciation resets every fourteen days.",
      },
      {
        title: "The Isotopic Elite Blend",
        body: "A core formulated beyond the limits of human saturation. Standard atmosphere will feel different afterwards.",
      },
    ],
  },
  still: {
    image: aeroStill,
    alt: "A miniature pink air canister with a mint valve.",
    line: "Serialised. Metered. Yours, for as long as you remain current.",
    meta: "Sourced above 6,000 metres · Brushed titanium · Single use",
    position: "50% 42%",
  },
  figures: [
    { value: 45, unit: "%", text: "oxygen concentration, held safe by nano-oxygen chaperones" },
    { value: 72, unit: "hrs", text: "of continuous focus in trials, without a single seizure" },
    { value: 14, unit: "days", text: "between purity resets, for as long as you subscribe" },
    { value: 10, unit: "%", text: "of everything you invent while breathing our air, retained" },
  ],
  capabilities: {
    title: "A little more with your membership.",
    items: [
      ["Everair Sync", "An optional implant helps you settle into Everair. Once you're acclimated, ordinary air may feel a little less satisfying."],
      ["Pay as you breathe", "Your meter tracks each breath. A small share of your future earnings covers the air you use today."],
      ["A share in good ideas", "Have a bright idea while using Everair? We'll keep a 10% share of what it earns. You can put Tokens toward your next canister."],
      ["A scent for your day", "Choose Focus, Creativity, or Zen. A little flutter when you switch scents is part of the experience."],
      ["A little backup", "If a payment doesn't go through, we'll send one backup air orb by drone while you update your details."],
      ["Your canister history", "See every canister you've used in one place. Your history stays on file after your membership ends."],
    ],
  },
  feature: {
    label: "The Everair Alpine Lodge",
    aside: "6,240 metres above sea level",
    title: "A little closer to the clouds.",
    body: "Every Everair canister starts high in the mountains. We bottle that crisp, clear alpine air at our lodge and deliver it to your door. Open one whenever you could use a little mountain morning.",
    facts: [
      ["Source", "High alpine air"],
      ["Scents", "Focus, Creativity & Zen"],
      ["Delivery", "On your schedule"],
    ],
    image: everairAlpineHq,
    alt: "A pastel alpine resort with unicorn visitors, hot-air balloons, and a glass air bottling pavilion.",
    position: "56% 50%",
  },
  plans: [
    {
      name: "First Breath",
      price: "Complimentary",
      body: "Try a little alpine air at a sampling station near you and find the scent you’d like to take home.",
    },
    {
      name: "Everyday Everair",
      price: "Regular delivery",
      body: "Pick your favorite scent or rotate through all three. Set a delivery schedule that fits your routine.",
    },
    {
      name: "Lodge Collection",
      price: "Seasonal membership",
      body: "Get seasonal blends from the lodge and early access to new scents as they’re released.",
    },
  ],
  notices: [
    "Focus for a busy morning, Creativity for a fresh start, and Zen when it’s time to wind down.",
    "Change your scent or delivery schedule as your routine changes.",
    "Put Tokens toward your next canister at Token Redemption.",
  ],
  close: {
    title: "Bring the mountains home.",
    cta: "Reserve my first canister",
    done: "Your first canister is reserved. We’ll be in touch to set up your delivery.",
  },
};

const somnara: HouseContent = {
  slug: "somnara",
  no: "02",
  name: "Dreamwell",
  category: "Rest with a return",
  accent: "#c3b0ff",
  object: "pod",
  pose: {
    fitWidth: 4.6,
    span: 3.6,
    tilt: 0.3,
    roll: -0.07,
    baseYaw: -0.45,
    sway: true,
    yaw: [0.75, -0.75, 0.9, 0.6],
    heroScale: 0.82,
    side: [0.5, 0.5],
    sideScale: [0.7, 0.7],
    objectScale: [0.84, 0.86],
    apartScale: [0.7, 0.72],
  },
  hero: {
    lineA: "Make room for",
    lineB: "a better night.",
    lede: "Make time for a full night of rest in a private sleep pod.",
    tag: "Pod No. S-0412",
  },
  manifesto: {
    lines: [
      "A good night makes for a better morning.",
      "Settle in and leave the details to us.",
      "There's a lot a little rest can do.",
    ],
    body: "Your pod sets aside time for rest and records your dreams. Anything you make while dreaming is credited to the account that booked the pod.",
  },
  dissection: {
    title: "The Pod",
    callouts: [
      {
        title: "Micro-REM Sharding",
        body: "Sleep is divided into countless brief shards, taken throughout the day. You will be visiting the pod often.",
      },
      {
        title: "The Neural Covenant",
        body: "Ideas you make while dreaming are credited to the company that pays for your pod.",
      },
      {
        title: "Wake-Interrupt Protocol",
        body: "Consent is confirmed by subconscious ping, in real time, even in the deepest delta sleep.",
      },
      {
        title: "Eternal Vigilance Mode",
        body: "Optimised members ascend to a perpetual half-sleep. To date, nobody has fully graduated.",
      },
    ],
  },
  still: {
    image: somnaraStill,
    alt: "A tiny lavender sleep pod with a blue glass canopy.",
    line: "Rest is the new compute layer.",
    meta: "Bone ceramic · Smoked glass · Occupancy: one",
    position: "50% 62%",
  },
  figures: [
    { value: 300, unit: "%", text: "return in a Fortune 100 pilot, without a whisper of liability" },
    { value: 100, unit: "%", text: "of dream-forged intellectual property, assigned on waking" },
    { value: 5, unit: "$bn", text: "projected valuation by the third quarter" },
    { value: 0, unit: "hrs", text: "of unmonitored sleep per member, per night" },
  ],
  capabilities: {
    title: "Nothing is lost overnight.",
    items: [
      ["Burnout Bonuses", "Spend Tokens earned at HelpingHand or Goodshift on a session. Neglecting sleep unlocks higher tiers. Deprivation is the high score."],
      ["Dream Syndication", "Employers pool their people's dreams into collective skill hives that compute through the night."],
      ["Panopticon Dream Vault", "Leaks are auctioned in advance as competitive intelligence. Betrayal, monetised."],
      ["Somno-Sabotage Accord", "Colleagues who disturb one another's rest are rewarded in Tokens."],
      ["Dream Debt", "Each optimisation creates a deficit, repayable only in deeper sleep. Tradable on SomniDEX."],
      ["Neural Annexation", "Should a member default, their consciousness is diplomatically integrated into the Collective."],
    ],
  },
  feature: {
    label: "Sovereign Neural Nations",
    aside: "Recognised under the 2035 Accord",
    title: "Your pod is a country.",
    body: "Each pod is reclassified as a sovereign neural nation. Members sleep beyond the reach of labour law, of audit, and of extradition. You are its only citizen and its principal export.",
    link: { href: "/demandeternal", label: "A few Tokens short of a good night’s sleep? Pick up a shift" },
    facts: [
      ["Jurisdiction", "Its own"],
      ["Full night", "500 Tokens"],
      ["Labour law", "Not applicable"],
    ],
  },
  plans: [
    {
      name: "REM Royalty",
      price: "By streak",
      body: "A badge tier for individuals. Wear your sleep debt as standing among your peers.",
    },
    {
      name: "Dreamwell Sovereign",
      price: "By accord",
      body: "Your own pod, your own flag, and a seat at the table of nations that are also beds.",
    },
    {
      name: "Enterprise Hive",
      price: "By fleet",
      body: "Neural Colony Hives for organisations. Your people compute your intellectual property while they rest.",
    },
  ],
  notices: [
    "A quiet space to end the day.",
    "Your employer can take care of the booking.",
    "Dream credits appear on the subscriber's statement.",
  ],
  close: {
    title: "Sleep on it.",
    cta: "Reserve a pod",
    done: "Your pod is reserved. Your wake time is set by the account holder.",
  },
};

const sublaborix: HouseContent = {
  slug: "sublaborix",
  no: "03",
  name: "HelpingHand",
  category: "Help by the minute",
  accent: "#e5bd79",
  object: "badge",
  pose: {
    fitWidth: 3.8,
    tilt: -0.08,
    roll: -0.14,
    baseYaw: -0.18,
    sway: true,
    yaw: [0.55, -0.55, 0.62, 1.1],
    heroScale: 0.95,
    side: [0.52, 0.68],
    sideScale: [0.76, 0.52],
    objectScale: [0.84, 0.69],
    apartScale: [0.72, 0.55],
  },
  hero: {
    lineA: "A little help",
    lineB: "goes a long way.",
    lede: "Find help for a busy day, or pick up a task when you have time.",
    tag: "Credential No. SLX-0003",
  },
  manifesto: {
    lines: [
      "Some days need an extra pair of hands.",
      "Tell us what's on your list.",
      "We'll find someone with time to spare.",
    ],
    body: "Bring in help for a deadline and scale back when things quiet down. Each task is billed separately, including time spent reading the instructions.",
  },
  dissection: {
    title: "The Credential",
    callouts: [
      { title: "Worker identity", body: "Each credential identifies a single worker. The number stays the same when the worker is replaced." },
      { title: "Effort metering", body: "The chip settles each micro-task as a separate contract. Reading the terms is metered separately." },
      { title: "Multiversal Labor Forking", body: "When a worker calls out, the system routes the shift to a parallel self who hasn't yet." },
      { title: "Burnout Badges", body: "Accumulated fatigue earns Tokens you can spend at Dreamwell. Rest is available once the queue is clear." },
    ],
  },
  still: {
    image: sublaborixStill,
    alt: "A mint-green worker badge with a lavender portrait icon.",
    line: "A little help goes a long way.",
    meta: "Brushed alloy · Non-transferable · Worker replaceable",
  },
  figures: [
    { value: 500, unit: "$M", text: "pre-money valuation" },
    { value: 100, unit: "%", text: "contract uptime across parallel selves" },
    { value: 1, unit: "unit", text: "of effort per billable event" },
    { value: 0, unit: "min", text: "of idle time exempt from task allocation" },
  ],
  capabilities: {
    title: "Every minute finds work.",
    items: [
      ["Stability Illusion Engine", "A predictable stream of rewards gives workers a familiar routine while their assignments change underneath it."],
      ["Precarity Paradise", "The engine schedules nano-vacations in the gaps between tasks. Most workers are back before they notice they left."],
      ["ChronoLabor Oracle", "Missed a deadline? Add worker capacity to the quarter in which you needed it."],
      ["Subconscious shifts", "Idle workers earn Tokens by completing subconscious micro-tasks. Spend them on rest from Dreamwell or an adjustment from Softspace before your next shift."],
      ["Volitional Micro-Contracts", "Each interaction creates a new agreement. Consent is confirmed by continuing to work."],
      ["Catastrophe Capital Fund", "Disputes are converted into case studies. Participants may qualify for a share of the publicity."],
    ],
  },
  feature: {
    label: "The SubLiminal Merge",
    aside: "Executive access",
    title: "Become the workflow.",
    body: "Merge an entire worker collective into your enterprise systems. Staff expertise becomes a company capability. From that point forward, an exit interview is an internal conversation.",
    facts: [
      ["Capacity", "Collective"],
      ["Deployment", "Permanent"],
      ["Churn", "Zero"],
    ],
  },
  plans: [
    { name: "Grunt Work", price: "Per effort unit", body: "Draw on the global pool for routine work. Your queue gets the next available person." },
    { name: "Hyper-Specific", price: "Per expertise unit", body: "Rent precisely the skill you need. The system clones it across the pool so one specialist can cover every shift." },
    { name: "Executive Decision-Making", price: "By arrangement", body: "Lease a worker collective as an extension of your own mind. The decisions arrive already agreed upon." },
  ],
  notices: [
    "There's always someone available for the next task.",
    "Coverage carries over when your team changes.",
    "Assignment review appears on your statement.",
  ],
  close: {
    title: "Start a shift.",
    cta: "Provision a workforce",
    done: "Your team is ready. The first task is already in the queue.",
  },
};

const termiflux: HouseContent = {
  slug: "termiflux",
  no: "04",
  name: "Brightside",
  category: "Make your waiting count",
  accent: "#a8ff78",
  object: "terminal",
  pose: {
    fitWidth: 4.2,
    tilt: -0.1,
    roll: -0.13,
    baseYaw: -0.23,
    sway: true,
    yaw: [0.55, -0.55, 0.65, 1.15],
    heroScale: 0.93,
    side: [0.54, 0.72],
    sideScale: [0.74, 0.53],
    objectScale: [0.85, 0.66],
    apartScale: [0.71, 0.52],
  },
  hero: {
    lineA: "Make every",
    lineB: "moment count.",
    lede: "Watch a short ad to earn Tokens, or use your balance to get back to work sooner.",
    tag: "Session No. TFX-0004",
  },
  manifesto: {
    lines: [
      "A build takes a moment.",
      "That's enough time to earn something.",
      "We'll be right back with your results.",
    ],
    body: "Earn Tokens by watching a short sponsor message while your command runs. You can also spend 5 Tokens to see your results sooner.",
  },
  dissection: {
    title: "The Sponsored Prompt",
    callouts: [
      { title: "Sponsored input", body: "The moment you press Enter, the terminal knows you intend to wait." },
      { title: "Token-gated skipping", body: "Spend 5 Tokens to dismiss the ad. Watching the ad would have earned you one. We also accept Tokens earned at HelpingHand." },
      { title: "Sub-quantum delivery", body: "Our beta users report that the terminal feels faster. Our stopwatch has been moved to a different team." },
      { title: "Monetized stderr", body: "Errors are especially valuable. That's when we know you're reading every line." },
    ],
  },
  still: {
    image: termifluxStill,
    alt: "A rounded lavender computer with a pink terminal cursor.",
    line: "Make every moment count.",
    meta: "Black glass · Green phosphor · Ad supported",
  },
  figures: [
    { value: 500, unit: "$M", text: "pre-money valuation" },
    { value: 25, unit: "%", text: "efficiency lift claimed by our beta oracles" },
    { value: 73, unit: "%", text: "faster builds with Chrono-Boost enabled" },
    { value: 0, unit: "ms", text: "of unmonetized hesitation, our long-term target" },
  ],
  capabilities: {
    title: "Every keystroke counts.",
    items: [
      ["Cognitive Priming", "Your train of thought will resume after a brief word from our sponsors."],
      ["Chronal Ad Retrojection", "We can now place an ad in a terminal session you closed last Tuesday."],
      ["Neural Terminal Implant", "Earn Tokens by absorbing ads in the background. Blinking no longer interrupts an impression."],
      ["Chrono-Boost Pulses", "Your build completes sooner, leaving more time for the sponsor message."],
      ["Inheritable Digital Estates", "Convert Tokens to skips and leave them to your children. They'll start their first jobs with three ads already skipped."],
      ["ApocaLux Compliance", "Your implant prepares a compliance report after each impression. Reading the report is a sponsored activity."],
    ],
  },
  feature: {
    label: "The Brightside economy",
    aside: "Cross-session settlement",
    title: "Earn back your time.",
    body: "Ads fund agents. Agents speed up builds. Faster builds create more time for ads. Every improvement returns a little more of your day to the marketplace.",
    facts: [
      ["Asset", "Attention"],
      ["Settlement", "Tokens"],
      ["Maturity", "Perpetual"],
    ],
  },
  plans: [
    { name: "Unpaid", price: "Paid in attention", body: "Full access to your shell. Results are presented after a message selected for the task at hand." },
    { name: "Token Holder", price: "Per interruption", body: "Skip sponsored messages across shells and put unused Tokens toward agent upgrades." },
    { name: "Token Vault", price: "By invitation", body: "Unlock Chrono-Boost and transfer unused skips to your heirs. Your workflow can outlive you." },
  ],
  notices: [
    "Sponsored moments add to the same balance.",
    "Tokens from other memberships work here, too.",
    "Your results will be ready after the message.",
  ],
  close: {
    title: "Run your first ad.",
    cta: "Open a terminal",
    done: "Your terminal is ready. First, a short message from a partner.",
  },
};

const comfortflow: HouseContent = {
  slug: "comfortflow",
  no: "05",
  name: "Softspace",
  category: "Relief that renews",
  accent: "#91dccb",
  object: "implant",
  pose: {
    fitWidth: 4.25,
    tilt: -0.09,
    roll: -0.12,
    baseYaw: -0.19,
    sway: true,
    yaw: [0.52, -0.52, 0.46, 1.1],
    heroScale: 0.92,
    side: [0.53, 0.72],
    sideScale: [0.72, 0.52],
    objectScale: [0.83, 0.66],
    apartScale: [0.68, 0.52],
  },
  hero: {
    lineA: "Find your kind",
    lineB: "of comfortable.",
    lede: "A small implant that adjusts your comfort as your day changes.",
    tag: "Implant No. CFL-0005",
  },
  manifesto: {
    lines: [
      "Busy days feel easier with the right support.",
      "Softspace adjusts as your calendar fills up.",
      "Your rate adjusts right along with it.",
    ],
    body: "A small implant makes comfort adjustments throughout your day. Each adjustment appears on your Token statement.",
  },
  dissection: {
    title: "The Implant",
    callouts: [
      { title: "Predictive relief", body: "FluxAlgo predicts when you'll need an adjustment with 94% accuracy. We've reserved the other 6% for urgency." },
      { title: "Consent-Matrix chip", body: "Your consent preferences are stored locally. Access requires an appointment." },
      { title: "Surge mode", body: "A calendar full of meetings tells us you're under pressure. Your comfort adjusts. So does your rate." },
      { title: "Continuity mode", body: "If your payment fails, the implant stays in place. Relief resumes when your account does." },
    ],
  },
  still: {
    image: undieflowStill,
    alt: "A mint and pink implant with a heart indicator.",
    line: "Find your kind of comfortable.",
    meta: "Brushed titanium · Mint status light · Subscription required",
  },
  figures: [
    { value: 150, unit: "$M", text: "valuation for the business of metering comfort" },
    { value: 94, unit: "%", text: "adjustment prediction accuracy claimed by FluxAlgo" },
    { value: 0, unit: "min", text: "of comfort available in arrears" },
    { value: 270, unit: "sec", text: "of each break reclassified as available time" },
  ],
  capabilities: {
    title: "Your day, under the skin.",
    items: [
      ["Flow-State Insurance", "When focus drops, the implant offers a brief burst of relief. The offer expires in four minutes."],
      ["Automatic Renewal", "Renewal is automatic so there is never a gap between billing periods."],
      ["Calendar Integration", "An all-hands can trigger a company-wide adjustment. The invitation includes the surcharge."],
      ["Break Recovery", "HelpingHand can assign a micro-task during each adjustment. What used to be a break now clears an invoice."],
      ["Consent-Matrix SDK", "Each opt-in is written to the implant ledger. A change of employer transfers the account."],
      ["Removal Coverage", "Removal is covered on the Enterprise plan. Former employees can request a quote."],
    ],
  },
  feature: {
    label: "Softspace Enterprise",
    aside: "Employee wellness",
    title: "Relief by the billable hour.",
    body: "Connect comfort adjustments to billable time. Managers can review department-level relief alongside utilization, then export both metrics to the same spreadsheet.",
    facts: [
      ["Billing", "Per seat"],
      ["Reporting", "Per adjustment"],
      ["Delivery", "Subdermal"],
    ],
  },
  plans: [
    { name: "Base", price: "$29 / month", body: "Scheduled relief during standard office hours." },
    { name: "Surge", price: "Calendar rate", body: "Relief scales with meetings. A last-minute reschedule may trigger a second charge." },
    { name: "Enterprise", price: "Per occupied seat", body: "A company-wide implant program with billable-hour reporting and a dedicated removal desk." },
  ],
  notices: [
    "A little relief between meetings goes a long way.",
    "Your comfort schedule moves with your calendar.",
    "Our removal desk can help when your membership ends.",
  ],
  close: {
    title: "Make yourself comfortable.",
    cta: "Activate my implant",
    done: "Softspace is ready. Your first adjustment is on your Token statement.",
  },
};

const demandeternal: HouseContent = {
  slug: "demandeternal",
  no: "06",
  name: "Goodshift",
  category: "A little more shift in your day",
  accent: "#e6bd67",
  object: "chain",
  pose: {
    fitWidth: 4.8,
    tilt: 0.14,
    roll: -0.22,
    baseYaw: -0.21,
    sway: true,
    yaw: [0.57, -0.57, 0.68, 1.18],
    heroScale: 0.9,
    side: [0.54, 0.68],
    sideScale: [0.66, 0.46],
    objectScale: [0.79, 0.63],
    apartScale: [0.61, 0.48],
  },
  hero: {
    lineA: "Work that works",
    lineB: "for you.",
    lede: "Pick up a simulated shift when it suits you. Save the Tokens or spend them across Unicorn Warehouse.",
    tag: "Shift No. DE-0006",
  },
  manifesto: {
    lines: [
      "A free hour can go a long way.",
      "Pick a shift that fits your day.",
      "Save for something you're looking forward to.",
    ],
    body: "Choose a simulated shift and earn Tokens for completing it. Your payout is the same whether or not your work has a customer.",
  },
  dissection: {
    title: "The Golden Chain",
    callouts: [
      { title: "Matched to your skills", body: "We pick assignments that suit your skills and leave just enough room to improve." },
      { title: "Tokens", body: "Your Tokens roll over between shifts and never expire. A few shifts might buy an ad skip. Keep saving and you could take home a whole night of sleep." },
      { title: "Automation oversight", body: "If an AI can do your fake job, we charge you to make it harder. You're welcome to expense the charge in Tokens." },
      { title: "Backlash Bonds", body: "When you quit, a partner receives a payout. For reporting purposes, you have completed your final task." },
    ],
  },
  still: {
    image: demandeternalStill,
    alt: "Three chunky pastel gold chain links.",
    line: "Work that works for you.",
    meta: "Gold finish · Closed circulation · No cash value",
  },
  figures: [
    { value: 0, unit: "days", text: "required between earning Tokens and redeeming them" },
    { value: 0, unit: "units", text: "of output required to complete a shift" },
    { value: 100, unit: "%", text: "of unspent Tokens carried into your next shift" },
    { value: 2500, unit: "$M", text: "pre-money valuation in every timeline" },
  ],
  capabilities: {
    title: "Room for advancement.",
    items: [
      ["Drudgery Prestige", "Get promoted to Senior Associate. The work stays the same, but you now approve someone else's work before they approve yours."],
      ["Malaise Mastery", "Receive a collectible that proves you were unhappy at work. Transfer of the collectible does not transfer the experience."],
      ["Effort Mirage", "An extra progress bar helps make the wait feel like something you accomplished."],
      ["Transparency Blackouts", "Your dashboard occasionally hides the purpose of your assignment. We count the time spent looking for it as professional development."],
      ["Lifetime Futures", "Partners can trade contracts based on how long you are expected to keep clocking in."],
      ["Infinite Task Fractalizer", "When the queue is empty, review how it became empty. Findings are assigned as subtasks."],
    ],
  },
  feature: {
    label: "The closed-loop economy",
    aside: "Participating retailers only",
    title: "Make every shift count.",
    body: "Your Tokens roll over between shifts. Spend them whenever you like, or keep saving until something catches your eye.",
    link: { href: "/somnara", label: "Saving for a full night? See Dreamwell" },
    facts: [
      ["Earn", "By assignment"],
      ["Spend", "With partners"],
      ["Save", "Across shifts"],
    ],
  },
  plans: [],
  notices: [
    "Fit a shift between the things you already do.",
    "Your Tokens carry over between shifts.",
    "A full night at Dreamwell is a popular savings goal.",
  ],
  close: {
    title: "Clock in.",
    cta: "Start my shift",
    done: "You're clocked in. Your first task is to confirm you've arrived.",
  },
};

const eternuity: HouseContent = {
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

export const houseContent: Record<string, HouseContent> = {
  aerovitalux, somnara, sublaborix, termiflux, comfortflow, demandeternal, eternuity,
};
