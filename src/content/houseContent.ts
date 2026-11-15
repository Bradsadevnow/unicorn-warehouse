import type { StaticImageData } from "next/image";
import { dreamwellBenefits } from "./dreamwellBenefits";
import { softspaceRewards, softspaceSubscriptions } from "./softspaceRewards";
import aeroStill from "@/assets/aero-chibi.webp";
import everairAlpineHq from "@/assets/everair-alpine-hq.webp";
import somnaraStill from "@/assets/somnara-chibi.webp";
import dreamwellRetreat from "@/assets/dreamwell-retreat.webp";
import sublaborixStill from "@/assets/sublaborix-chibi.webp";
import termifluxStill from "@/assets/termiflux-chibi.webp";
import undieflowStill from "@/assets/undieflow-chibi.webp";
import demandeternalStill from "@/assets/demandeternal-chibi.webp";

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
  plans: { name: string; price: string; body: string; benefits?: string[]; image?: StaticImageData }[];
  notices: string[];
  close: { title: string; cta: string } & ({ href: string } | { done: string });
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
        body: "The canister clicks into your Everair mask with a gentle twist.",
      },
      {
        title: "Ready for the next delivery",
        body: "Pick a delivery day that fits your routine and we’ll bring the next canister to your door.",
      },
      {
        title: "Fresh from the lodge",
        body: "We seal each canister at the Alpine Lodge to keep that crisp first breath fresh until you open it.",
      },
      {
        title: "Find your favorite",
        body: "Choose Focus, Creativity, or Zen, or try a seasonal blend from the Lodge Collection.",
      },
    ],
  },
  still: {
    image: aeroStill,
    alt: "A miniature pink air canister with a mint valve.",
    line: "A little mountain morning, whenever you need one.",
    meta: "Bottled at the Everair Alpine Lodge",
    position: "50% 42%",
  },
  figures: [
    { value: 6240, unit: "m", text: "above sea level, where the Alpine Lodge bottles your air" },
    { value: 3, unit: "scents", text: "to suit your day: Focus, Creativity, and Zen" },
    { value: 4, unit: "blends", text: "from the Lodge Collection, one for each season" },
    { value: 60, unit: "Tokens", text: "for a premium Lodge Collection canister at Token Redemption" },
  ],
  capabilities: {
    title: "A little more with your membership.",
    items: [
      ["First Breath", "Your first breath is complimentary. Try it at an Everair sampling station."],
      ["Put your Tokens to use", "Save your Tokens for a seasonal blend from the Lodge Collection or put them toward a fresh canister."],
      ["A scent for your day", "Choose Focus, Creativity, or Zen."],
    ],
  },
  feature: {
    label: "The Everair Alpine Lodge",
    aside: "6,240 metres above sea level",
    title: "A little closer to the clouds.",
    link: { href: "/aerovitalux/lodge-collection", label: "Explore the Lodge Collection" },
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
    body: "Dim the lights and settle into a private pod. Pick a membership with the hours and comforts you’d like.",
  },
  dissection: {
    title: "The Pod",
    callouts: [
      {
        title: "A softer light",
        body: "Ease into bedtime with warm lighting that fades at your pace.",
      },
      {
        title: "Just the right temperature",
        body: "Dreamwell Plus and above can request a cooler or warmer pod before tucking in.",
      },
      {
        title: "A quieter room",
        body: "Close the canopy to soften the sounds outside. Choose gentle rain or settle into the quiet.",
      },
      {
        title: "An easier wake-up",
        body: "Pick your wake time and let the lights brighten slowly, like a little sunrise.",
      },
    ],
  },
  still: {
    image: somnaraStill,
    alt: "A tiny lavender sleep pod with a blue glass canopy.",
    line: "A quiet little room, all to yourself.",
    meta: "Private sleep pod · Adjustable light and temperature",
    position: "50% 62%",
  },
  figures: [
    { value: 8, unit: "hrs", text: "set aside for a full night of rest" },
    { value: 1, unit: "guest", text: "per private sleep pod" },
    { value: 2, unit: "settings", text: "for sound: gentle rain or quiet" },
    { value: 500, unit: "Tokens/day", text: "for Dreamwell Complete at Token Redemption" },
  ],
  capabilities: {
    title: "Make yourself at home.",
    items: [
      ["A fresh quilt", "Find a fresh quilt waiting in your pod. Pillow Privileges start with Dreamwell Essential."],
      ["Room for your things", "Keep your shoes, bag, and phone tucked away beside you."],
      ["Your usual settings", "Save your preferred lighting and any temperature preference your tier includes."],
      ["A place to wind down", "Come a little early and settle in with a cup of tea in the lounge."],
      ["Book for someone", "Send a booking to someone who could use a good night’s sleep."],
      ["Put your Tokens toward a stay", "Use Tokens you’ve saved from Goodshift or HelpingHand toward a full night."],
    ],
  },
  feature: {
    label: "The Dreamwell Retreat",
    aside: "Evening check-in",
    title: "Somewhere to call it a night.",
    body: "Leave the day at the door. Have a cup of tea in the lounge, then settle into your own pod for eight quiet hours. In the morning, take your time getting back to the world.",
    link: { href: "/redemption#sleep-subscriptions", label: "Compare Dreamwell subscriptions" },
    image: dreamwellRetreat,
    alt: "A softly lit Dreamwell retreat with sleepy unicorns and lavender sleep pods.",
    position: "50% 50%",
    facts: [
      ["Pod", "Private"],
      ["Full night", "500 Tokens / day"],
      ["Wake-up", "Varies by membership"],
    ],
  },
  plans: [
    {
      name: "Dreamwell Hello",
      benefits: dreamwellBenefits.hello,
      price: "20-minute nap",
      body: "A little moment, just for you.",
    },
    {
      name: "Dreamwell Essential",
      benefits: dreamwellBenefits.essential,
      price: "2 hours",
      body: "Just enough to feel like yourself again.",
    },
    {
      name: "Dreamwell Plus",
      benefits: dreamwellBenefits.plus,
      price: "4 hours",
      body: "Make more room for the moments that matter.",
    },
    {
      name: "Dreamwell Premium",
      benefits: dreamwellBenefits.premium,
      price: "6 hours",
      body: "Because you deserve a little extra.",
    },
    {
      name: "Dreamwell Complete",
      benefits: dreamwellBenefits.complete,
      price: "8 hours",
      body: "Your whole night, beautifully taken care of.",
    },
    {
      name: "Dreamwell Unlimited",
      benefits: dreamwellBenefits.unlimited,
      price: "8 hours + flexible wake-up",
      body: "Rest without watching the clock.",
    },
  ],
  notices: [
    "A quiet space to end the day.",
    "Your employer can take care of the booking.",
    "You can save your favorite pod settings for your next visit.",
  ],
  close: {
    title: "Sleep on it.",
    cta: "Reserve a pod",
    done: "Your pod is reserved. We’ll have it ready when you arrive.",
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
    lede: "A little warmer. A little cooler. Fine-tune how your day feels with the Softspace implant.",
    tag: "Implant No. CFL-0005",
  },
  manifesto: {
    lines: [
      "Some days call for a little warmth.",
      "Some days you could use a cool minute.",
      "Start with one degree.",
    ],
    body: "Use Tokens to move your personal temperature setting up or down. Buy one adjustment or keep a bundle ready for whatever the forecast brings.",
  },
  dissection: {
    title: "The Implant",
    callouts: [
      { title: "A little warmer", body: softspaceRewards[0].description },
      { title: "A little cooler", body: softspaceRewards[1].description },
      { title: "Warmth in reserve", body: softspaceRewards[2].description },
      { title: "Summer cooling", body: softspaceRewards[3].description },
    ],
  },
  still: {
    image: undieflowStill,
    alt: "A mint and pink implant with a heart indicator.",
    line: "Find your kind of comfortable.",
    meta: "Brushed titanium · Mint status light · Personal temperature control",
  },
  figures: [
    { value: 1, unit: "°", text: "per adjustment, warmer or cooler" },
    { value: 1, unit: "Token", text: "for a single adjustment in either direction" },
    { value: 10, unit: "", text: "adjustments per heating or cooling package" },
    { value: 3, unit: "mo", text: "of peak-season cooling package rates" },
  ],
  capabilities: {
    title: "Comfort on your schedule.",
    items: [
      ["Your comfort profile", "Save a favorite setting for the office, the commute, or a quiet evening in."],
      ["Degrees in reserve", "Use bundle adjustments one at a time. A warm afternoon can wait until it happens."],
      ["Seasonal rates", "Check the summer price before buying a Cooling Package. Single adjustments stay at 1 Token."],
    ],
  },
  feature: {
    label: "Token Redemption",
    aside: "Temperature rewards",
    title: "A few degrees for later.",
    body: "Redeem a single adjustment when you need it, or stock up before the season changes.",
    link: { href: "/redemption#one-degree-warmer", label: "Browse Softspace rewards" },
    facts: [
      ["Single adjustments", "1 Token"],
      ["Bundles", "10 adjustments"],
      ["Summer rates", "June through August"],
    ],
  },
  plans: softspaceSubscriptions,
  notices: [
    "Summer is our busiest season for a reason.",
  ],
  close: {
    title: "Make yourself comfortable.",
    cta: "Explore Softspace subscriptions",
    href: "/redemption#softspace-subscriptions",
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
    lede: "Find hands-on shifts near you. Earn Tokens loading trucks, stocking shelves, or getting a space ready for the next crew.",
    tag: "Shift No. DE-0006",
  },
  manifesto: {
    lines: [
      "A free hour can go a long way.",
      "Pick a shift that fits your day.",
      "Save for something you're looking forward to.",
    ],
    body: "Browse open shifts at warehouses, shops, and venues. See the hours, duties, and Token payout before you pick one.",
  },
  dissection: {
    title: "The Golden Chain",
    callouts: [
      { title: "Matched to your skills", body: "We pick assignments that suit your skills and leave just enough room to improve." },
      { title: "Tokens", body: "Your Tokens roll over between shifts and never expire. A few shifts might buy an ad skip. Keep saving and you could take home a whole night of sleep." },
      { title: "Know before you go", body: "Your shift listing tells you what to bring, where to check in, and who’s meeting you there." },
      { title: "Find a regular shift", body: "Like working with a crew? Look for their next opening once you clock out." },
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
    { value: 3, unit: "types", text: "of shifts to browse: loading, stocking, and setup" },
    { value: 100, unit: "%", text: "of unspent Tokens carried into your next shift" },
    { value: 1, unit: "balance", text: "for Tokens from every shift you work" },
  ],
  capabilities: {
    title: "Room for advancement.",
    items: [
      ["Loading and receiving", "Unload deliveries, sort boxes, and stage orders for pickup."],
      ["Stocking and inventory", "Fill shelves, count stock, and get the shop ready to open."],
      ["Setup and teardown", "Set out tables, arrange seating, and help clear the room after an event."],
      ["Lead a crew", "Once you know the site, look for shifts helping new workers get oriented."],
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
    done: "You're clocked in. Check in with your crew lead when you arrive.",
  },
};

export const houseContent: Record<string, HouseContent> = {
  aerovitalux, somnara, sublaborix, termiflux, comfortflow, demandeternal,
};
