/** Fun Hours each member is scheduled for per calendar month. */
export const requiredFunHours = 2;
/** Tokens billed for one Fun Hour at check-in time. */
export const funHourRate = 30;

export const attractions = [
  {
    id: "lanes",
    name: "Lucky Lanes",
    kind: "Bowling",
    icon: "🎳",
    tone: "pink",
    price: "18 Tokens per game",
    line: "Thirty-two lanes of glow-in-the-dark fun.",
    extras: ["Shoe rental · Included", "Shoe return processing · 6 Tokens", "Bumpers · 4 Tokens per frame"],
    fine: "Shoe rental is included. Returning the shoes incurs a processing fee. Strikes are celebrated on the big screen, and so is every other ball.",
  },
  {
    id: "links",
    name: "Rainbow Links",
    kind: "Mini golf",
    icon: "⛳",
    tone: "mint",
    price: "14 Tokens per round",
    line: "Eighteen holes under one very big rainbow.",
    extras: ["Holes 13 to 18 · Adventure Plus", "Ball retrieval · 2 Tokens", "Scorecard pencil · 1 Token"],
    fine: "Eighteen holes are advertised. The final six require Adventure Plus. A round ended at hole twelve is scored against par for eighteen.",
  },
  {
    id: "cinema",
    name: "Starlight Cinema",
    kind: "Movie theater",
    icon: "🎬",
    tone: "lilac",
    price: "22 Tokens per feature",
    line: "Eight screens and the comfiest seats in the Portfolio.",
    extras: ["Recline · 1 Token per degree", "Armrest · 3 Tokens per side", "Preview skip · Not available"],
    fine: "Sponsored previews are part of the feature. Sleep during a feature is recorded by Dreamwell as a rest session and billed at the nap rate. The feature resumes after intermission when the audience has returned from concessions.",
  },
  {
    id: "arcade",
    name: "Token Arcade",
    kind: "Arcade",
    icon: "🕹️",
    tone: "butter",
    price: "From 2 Tokens per play",
    line: "Two hundred games. One Prize Counter.",
    extras: ["Game card · 5 Tokens", "Card balance inquiry · 1 Token", "Claw machine · 3 Tokens per attempt"],
    fine: "Games accept Tokens. Winning awards FunPoints, which cannot be converted back to Tokens. The claw’s grip is set each morning from Prize Counter inventory.",
  },
  {
    id: "arena",
    name: "Team Arena",
    kind: "Laser tag",
    icon: "🔫",
    tone: "sky",
    price: "16 Tokens per match",
    line: "Friendly competition for teams of every size.",
    extras: ["Ammunition · Unlimited", "Successful hit · 1 Token each", "Vest rental · 5 Tokens"],
    fine: "Ammunition is unlimited. Successful hits are billed individually to the member who made them. Teams are assigned by employer, and match results are shared with team leads.",
  },
  {
    id: "speedway",
    name: "Sparkle Speedway",
    kind: "Go-karts",
    icon: "🏎️",
    tone: "peach",
    price: "20 Tokens per race",
    line: "Feel the wind in your mane.",
    extras: ["Walking speed · Included", "Racing speed · Adventure Plus", "Helmet liner · 2 Tokens"],
    fine: "Karts are set to walking speed for your safety. Racing speed is available with Adventure Plus. A race ends when the first kart finishes, and every kart is billed for the full race.",
  },
  {
    id: "lounge",
    name: "Sing-Along Lounge",
    kind: "Karaoke",
    icon: "🎤",
    tone: "pink",
    price: "8 Tokens per song",
    line: "Your moment in the spotlight.",
    extras: ["Approved song list · Included", "Applause · Provided", "Second verse · 4 Tokens"],
    fine: "Songs are chosen from the approved list. Performances are recorded by Brightside and may be shared in sponsored previews at Starlight Cinema.",
  },
  {
    id: "cafe",
    name: "The Snack Stable",
    kind: "Dining",
    icon: "🍕",
    tone: "mint",
    price: "From 9 Tokens",
    line: "Pizza, pretzels, and fountain drinks by Horn & Fries.",
    extras: ["Refill · 3 Tokens", "Table time · 4 Tokens per 15 minutes", "Tap water · 2 Tokens"],
    fine: "Outside food and drink are not permitted. Table time is metered from the moment you are seated, including while you wait to order.",
  },
] as const;

/** Prize Counter. FunPoints are won in the Token Arcade and cannot be converted to Tokens. */
export const prizes = [
  ["Sparkle sticker", 150],
  ["Banana", 400],
  ["Toothbrush", 1_200],
  ["An item from Lost and Found", 2_500],
  ["Crew socks, one pair", 4_500],
  ["Plush unicorn", 25_000],
  ["One Fun Hour", 60_000],
  ["A Thought of Your Own", 500_000],
] as const;

export const adventurePlus = {
  name: "Adventure Plus",
  price: "45 Tokens per month",
  line: "Unlock the rest of the fun you’re already having.",
  includes: [
    "Holes 13 to 18 at Rainbow Links",
    "Racing speed at Sparkle Speedway",
    "Priority check-in for scheduled Fun Hours",
    "FunPoints that expire 10 minutes before closing",
  ],
  fine: "Adventure Plus renews monthly. Cancelling takes effect after your next scheduled Fun Hour. Fun Hours are scheduled monthly.",
} as const;

const partyStartingTokens = 240;

export const parties = {
  name: "Extravaganza Supreme Suite",
  startingTokens: partyStartingTokens,
  price: `From ${partyStartingTokens} Tokens`,
  line: "The whole family of businesses, celebrating you.",
  partners: [
    ["Gatherings", "handles the booking", "/gatherings#funplex-suite"],
    ["Horn & Fries", "supplies the cake", "/quickserve"],
    ["Brightside", "records the memories", "/termiflux"],
  ],
  details: [
    "A decorated party room for 90 minutes, including setup and cleanup.",
    "One cake, sliced for the number of guests on the booking.",
    "A recording of the party, yours to view anytime.",
  ],
  fine: "Party time includes setup and cleanup. Guests who are members may have the party recorded as a Fun Hour at the member rate. The recording belongs to Brightside and may be used under its terms. The birthday guest receives a complimentary copy of the first three seconds.",
} as const;

export const funSteps = [
  ["We schedule your fun", `Every member receives ${requiredFunHours} Fun Hours each month. Pick your times, or we’ll pick them for you in the final week.`],
  ["You check in", "Check in when you arrive. If you park in a registered vehicle, your Fun Hour starts when you enter the lot."],
  ["We measure the fun", "Tell us how delighted you were on the way out. Your answer helps us plan your next visit."],
] as const;
