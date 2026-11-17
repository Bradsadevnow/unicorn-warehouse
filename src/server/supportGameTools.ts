import "server-only";

import { hornFitting, questLocationPath } from "@/content/recognitionQuests";
import { townLots, townPath } from "@/content/unicornopolis";
import type { ModelTool } from "./model";
import { objectiveComplete } from "./gameState";
import { questInteractionComplete } from "./recognitionQuestEngine";
import { prepareSupportAction, supportedSupportActions, type SupportCard, type SupportSession } from "./supportActions";
import { getPolicyReference, type SupportReference } from "./supportPolicy";

const destinations: Record<string, { label: string; href: string }> = {
  account: { label: "My account", href: "/account" },
  wallet: { label: "Token wallet", href: "/account?tab=wallet#statement" },
  careers: { label: "Careers", href: "/careers" },
  town: { label: "Unicornopolis map", href: "/home#town" },
  records: { label: "Member Records", href: "/member-records" },
  "horn-fitting": { label: "The Horn Fitting", href: "/quests/horn-fitting" },
  "lost-property": { label: "Lost Property", href: questLocationPath("horn-fitting", "lost-property") },
  "rest-desk": { label: "Dreamwell Rest Desk", href: questLocationPath("horn-fitting", "dreamwell") },
  "recognition-office": { label: "Your department’s Recognition Office", href: questLocationPath("horn-fitting", "department") },
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function navigate(place: string, map: boolean): SupportCard | undefined {
  const id = normalize(place);
  const lotId = id === "lost-property" ? "police" : id === "rest-desk" ? "dreamwell" : id === "police-station" ? "police" : id;
  const lot = townLots.find(({ id, name }) => id === lotId || normalize(name) === lotId);
  if (lot && map) return { kind: "navigate", label: `Show ${lot.name} on the map`, href: townPath(lot.id) };
  if (Object.hasOwn(destinations, id)) return { kind: "navigate", ...destinations[id] };
  if (lot) return { kind: "navigate", label: lot.name, href: lot.href };
}

const hints: Record<string, string> = {
  "inspect-chain": "Look closely at the chained pen for something you could take to a different counter.",
  "claim-key": "Think about the difference between learning where an object is and leaving the desk with it.",
  "borrow-pen": "The Bank is responsible for the pen. See what the item from Lost Property lets you do there.",
  "file-verification": "The fitter needs proof of what happened while you signed. Compare what each Dreamwell record can establish.",
  "return-pen": "A borrowed object and proof that you returned it serve different purposes. Check back with the Bank.",
  "file-fitting": "Your own manager is waiting for evidence from two different desks.",
  "issue-horn": "Your Recognition record shows the accepted shifts your current manager can count.",
};

function questHint(session: SupportSession, currentStop?: string) {
  if (!objectiveComplete(session.game, "buy-kit")) {
    return { note: "Meet your manager and pick up your Pathway Kit to open your Recognition file.",
      card: { kind: "navigate", label: "Open your first steps", href: "/account#objectives" } as SupportCard };
  }
  const unfinished = hornFitting.interactions.filter((interaction) => !questInteractionComplete(session.game, hornFitting.id, interaction.id));
  const step = unfinished[0];
  if (!step) return { note: "The Horn Fitting is complete and your horn is on file." };
  const here = hornFitting.locations.find(({ id }) => id === currentStop);
  const next = hornFitting.locations.find(({ id }) => id === step.location);
  const clue = here?.id === next?.id ? here?.clue : next?.clue;
  const note = hints[step.id];
  const reference = clue && getPolicyReference(clue.href);
  const references = reference ? [{ ...reference, text: note, excerpt: "" }] : [];
  const card: SupportCard | undefined = clue
    ? { kind: "navigate", label: clue.label, href: clue.href }
    : next ? { kind: "navigate", label: next.name, href: questLocationPath(hornFitting.id, next.id) } : undefined;
  return { note: `Hint only: ${note}`, references, card };
}

function tool(name: string, description: string, properties: object, required: string[]): ModelTool {
  return { type: "function", function: { name, description,
    parameters: { type: "object", properties, required, additionalProperties: false } } };
}

export const supportGameTools = [
  tool("open_place", "Offer a link to a page or open a town location on the map. Use a place name or its short ID. Examples: bank, dreamwell, lost-property, market, account, wallet, careers, records, horn-fitting.",
    { place: { type: "string" }, map: { type: "boolean", description: "True to show the location on the town map." } }, ["place"]),
  tool("prepare_action", "Prepare one game action for the member to review. Only call after an explicit request to do the action. The member must press Confirm to carry it out.",
    { action: { type: "string", enum: supportedSupportActions }, product: { type: "string", description: "For buy, use the requested Market product name." } }, ["action"]),
  tool("quest_hint", "Look up a hint for the member’s next unfinished Horn Fitting step. Never select a form, solve a puzzle or perform the quest.",
    {}, []),
];

export function runSupportGameTool(
  name: string, input: unknown, session: SupportSession, currentStop: string | undefined, hasMemberRequest: boolean,
): { note: string; card?: SupportCard; references?: SupportReference[] } | undefined {
  if (name === "quest_hint") return questHint(session, currentStop);
  if (name === "open_place" && input && typeof input === "object" && "place" in input && typeof input.place === "string") {
    const card = navigate(input.place, "map" in input && input.map === true);
    return card ? { note: `Link offered: ${card.label}.`, card } : { note: "I couldn’t find that destination. Ask for its name." };
  }
  if (name === "prepare_action") {
    if (!hasMemberRequest) return { note: "Ask the member what they need before offering a confirmation." };
    if (input && typeof input === "object" && "action" in input) {
      return prepareSupportAction(session, input.action, "product" in input ? input.product : undefined);
    }
  }
}
