import { getRole, type CareerRole } from "./careers";

type Location = {
  id: string;
  name: string;
  detail: string;
  clue?: { href: string; label: string };
};

type Condition = { flag: string } | { item: string } | { rank: string } | { qualifyingShifts: number };

export type QuestInteraction = {
  id: string;
  location: string;
  title: string;
  dialogue: string;
  action: string;
  requires: Condition[];
  choices?: { options: { id: string; label: string }[]; correct: string; rejected: string };
  grants?: string[];
  consumes?: string[];
  hotspot?: string;
  awardRank?: CareerRole["slug"];
};

type RecognitionQuest = {
  id: string;
  title: string;
  intro: string;
  completionInteraction: string;
  locations: Location[];
  items: string[];
  interactions: QuestInteraction[];
};

const junior = getRole("junior-unicorn-associate")!;
if (junior.promotion.by !== "qualification") throw new Error("The Horn Fitting requires a qualification rule.");

export const hornFitting: RecognitionQuest = {
  ...junior.promotion.quest,
  intro: "Your first horn comes with a little paperwork. Start at the Bank and ask how to borrow the pen.",
  completionInteraction: "file-fitting",
  locations: [
    { id: "bank", name: "Unicorn Warehouse Bank", detail: "The pen is available at the counter. Its key is currently available elsewhere." },
    { id: "lost-property", name: "Lost Property", detail: "The desk keeps one record for your inquiry and another for whatever you came to collect.",
      clue: { href: "/terms#lost-property-release", label: "Read the Lost Property release rules" } },
    { id: "dreamwell", name: "Dreamwell Rest Desk", detail: "A quiet counter for members who need something in writing before they can rest.",
      clue: { href: "/product-details#wake-verification", label: "Read Dreamwell's verification details" } },
    { id: "department", name: "Your department", detail: "Your manager is available to receive completed forms." },
  ],
  items: ["Pen chain tag LF-08", "Bank pen key", "Bank counter pen", "Wake Verification receipt", "Pen return receipt", "Horn Fitting certificate"],
  interactions: [
    { id: "inspect-chain", location: "bank", hotspot: "pen", title: "A pen on a chain",
      dialogue: "The brass tag reads LF-08. The teller says Lost Property has the key. The Bank has the pen. Both departments are pleased to report full custody of their portion.",
      action: "Copy the chain tag", requires: [], grants: ["Pen chain tag LF-08"] },
    { id: "claim-key", location: "lost-property", hotspot: "release", title: "The key in drawer LF-08",
      dialogue: "The clerk has located the key. They hand you a form with three ways to describe what you want to happen next.",
      action: "Submit request", requires: [{ item: "Pen chain tag LF-08" }],
      choices: { options: [
        { id: "status", label: "Request a status update" },
        { id: "close", label: "Request record closure" },
        { id: "release", label: "Request physical release" },
      ], correct: "release", rejected: "Your request has been filed. The key is still in the drawer. Check which procedure actually releases an item." },
      grants: ["Bank pen key"] },
    { id: "borrow-pen", location: "bank", hotspot: "pen", title: "A pen on loan",
      dialogue: "The lock opens. The teller holds out a tiny tray for the key and reminds you to return the pen in person. It is the Bank’s only pen.",
      action: "Hand over the key and borrow the pen", requires: [{ item: "Bank pen key" }],
      consumes: ["Bank pen key"], grants: ["Bank counter pen"] },
    { id: "file-verification", location: "dreamwell", hotspot: "verification", title: "Proof of wakefulness",
      dialogue: "The fitter needs a receipt that says you were awake while you signed. Dreamwell has several forms for acknowledging that you were present.",
      action: "Sign and submit", requires: [{ item: "Bank counter pen" }],
      choices: { options: [
        { id: "attendance", label: "Request a pod attendance receipt" },
        { id: "wake", label: "Request Wake Verification" },
        { id: "retention", label: "Request Dream Retention" },
      ], correct: "wake", rejected: "Dreamwell can issue that form, but it won’t establish that you were awake when you signed. Check the Product Details." },
      grants: ["Wake Verification receipt"] },
    { id: "return-pen", location: "bank", hotspot: "teller", title: "A fully reconciled pen",
      dialogue: "The teller sets the pen back in its cradle. The return receipt is printed on paper that says THANK YOU FOR KEEPING OUR PEN CIRCULATING.",
      action: "Return the pen and collect the receipt",
      requires: [{ item: "Bank counter pen" }, { item: "Wake Verification receipt" }],
      consumes: ["Bank counter pen"], grants: ["Pen return receipt"] },
    { id: "file-fitting", location: "department", hotspot: "fitting", title: "The fitting",
      dialogue: "Your manager measures the space above your forehead and files your two receipts. The form has a box for width and a box for willingness. Both are marked satisfactory.",
      action: "File the fitting paperwork",
      requires: [{ item: "Wake Verification receipt" }, { item: "Pen return receipt" }],
      grants: ["Horn Fitting certificate"] },
    { id: "issue-horn", location: "department", hotspot: "recognition", title: "Recognition review",
      dialogue: "Your manager checks the certificate and the accepted shifts on your current track. They open a little velvet box and ask you to hold very still.",
      action: "Ask your manager to approve and issue your horn",
      requires: [{ flag: "file-fitting" }, { rank: "unicorn-trainee" }, { qualifyingShifts: junior.promotion.qualifyingShifts }],
      awardRank: junior.slug },
  ],
};

export const recognitionQuests = [hornFitting];

export function questLocationPath(questId: string, location: string) {
  return `/quests/${questId}?stop=${location}#quest-counter`;
}
