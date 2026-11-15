import { balances, memberAccount } from "./memberAccount";

// Authored chat messages and routing. Account values come from the fixed snapshot.
export const supportWelcome = "Hiii! 🦄💖 You made it to Unicorn Warehouse Support! I’ve got my headset on and my help hooves ready. What can we figure out together? 🌈✨";
export const supportFallback = "Ooh, a new one! 🌟 My little headset is working overtime. Try one of the suggested questions or take a peek at Product Details! 🦄📚✨";
export const supportFallbackSource = { label: "Product Details", href: "/product-details" };

const report = memberAccount.ledger.find(({ id }) => id === "report")!;
const air = memberAccount.subscriptions.find(({ id }) => id === "everair")!;
const appeal = memberAccount.requests.find(({ id }) => id === "appeal")!;
const quote = memberAccount.requests.find(({ id }) => id === "quote")!;
const estate = memberAccount.subscriptions.find(({ id }) => id === "estate")!;

export const supportAccountOpening = `Hi, ${memberAccount.name}!! 🦄💖 Your ${air.name} renewal is due today and your cancellation is still being verified. Are you checking when it takes effect, thinking about keeping AirLink Premium, or here for something else? 🌈✨`;

export const supportAnswers = [
  {
    id: "report-renewal",
    question: "Can my pending report payout cover my air renewal?",
    matches: [/\b(?:report|pending|140)\b.*\b(?:air|breath\w*|renewal)\b|\b(?:air|breath\w*|renewal)\b.*\b(?:report|pending|140)\b/i],
    answer: `Happy to check your statement, ${memberAccount.name}! 🦄💖 You have ${balances.available} Tokens available. The ${report.amount} Tokens for your report are ${report.status} and can’t be spent yet. Your ${air.name} renewal is due ${air.renewal}. Your status is “${air.status}.” 🌈✨`,
    source: { label: "Poppy’s pending report", href: "/account#report" },
    policy: { label: "Terms & Conditions · Renewal and continuity", href: "/terms#renewal" },
  },
  {
    id: "account-balance",
    question: "How many Tokens do I have?",
    matches: [/\bbalance\b|\bhow many tokens\b|\bavailable tokens\b|\bspendable\b|\bheld tokens\b/i],
    answer: `Let’s count those Tokens! 🦄✨ You have ${balances.available} available, ${balances.pending} pending, and ${balances.held} held. Your statement also shows ${balances.spent} spent. 💖`,
    source: { label: "Poppy’s Token statement", href: "/account#statement" },
    policy: { label: "Terms & Conditions · Tokens and settlement", href: "/terms#tokens" },
  },
  {
    id: "account-appeal",
    question: "Did my appeal make my sleep more expensive?",
    matches: [/\b(?:appeal|dispute|revised quote|unpaid report|rest pricing)\b/i],
    answer: `I found both updates! 🦄💖 Goodshift recorded your appeal on ${appeal.date} and it’s “${appeal.status}.” Dreamwell issued its revised quote on ${quote.date}. The account gives no reason for the revision. The terms allow eligibility changes in one service to affect pricing in another. 🌈✨`,
    source: { label: "Poppy’s open requests", href: "/account#requests" },
    policy: { label: "Terms & Conditions · 11.1", href: "/terms#interdependence" },
  },
  {
    id: "account-estate",
    question: "Why is Goodshift paying for my longevity?",
    matches: [/\b(?:tomorrowly|longevity|estate|employer.sponsored)\b/i],
    answer: `I found your benefit! 🦄💖 ${estate.note} Your next renewal is ${estate.renewal}. The estate schedule explains what happens when sponsorship ends. ✨`,
    source: { label: "Poppy’s employer benefit", href: "/account#estate" },
    policy: { label: "Product Details · Former Tomorrowly policies", href: "/product-details#estate" },
  },
  {
    id: "offline-breathing",
    question: "Can I breathe offline?",
    matches: [/\boffline\b|\bwi[ -]?fi\b|\bdownload(?:ed)? breaths?\b/i],
    answer: "Absolutely, happy breathing! 🦄💨 With AirLink Premium, download your offline breaths while you’re still connected. Pop those breaths in your travel plans! 🎒🌈 Any you haven’t used expire the moment you reconnect. ✨",
    source: { label: "Everair Product Details · 1.11", href: "/product-details#everair" },
  },
  {
    id: "rest-reconciliation",
    question: "Why did my nap affect my productivity score?",
    matches: [/\bnap\b|\bsleep(?:ing)? in\b|\bunplanned recovery\b|\brest reconciliation\b/i],
    answer: "A little extra snooze? I’ve got you! 💤💖 Dreamwell may record sleep past your allowance as unplanned recovery. Good news, there’s no Token charge! 🎉 Your productive capacity score may stay lower until you complete qualifying activity. One hoofstep at a time! 🦄✨",
    source: { label: "Terms & Conditions · 7.2", href: "/terms#benefit-accounting" },
  },
  {
    id: "cancellation",
    question: "What happens if I cancel?",
    matches: [/\bcancel(?:lation|led|ed|ing|ling)?\b|\bend (?:my )?(?:plan|membership|subscription)\b/i],
    answer: "Of course! Let’s get your next chapter sorted! 🦄🌈 Your cancellation takes effect at the first renewal after we verify it. Any bills due during verification still apply. Got installed equipment? Removal has its very own appointment! 📅💖",
    source: { label: "Terms & Conditions · Section 3", href: "/terms#renewal" },
  },
  {
    id: "human-review",
    question: "Can I speak to a human?",
    matches: [/\bhuman\b|\breal person\b|\blive agent\b/i],
    answer: "Yay, human review is an option! 🎉🦄 You can request it for an automated decision. Your human reviewer may use automated summaries, recommendations, and supporting records to help reach a decision. Teamwork! 🤝💖✨",
    source: { label: "Terms & Conditions · 10.2", href: "/terms#member-support" },
  },
] as const;
