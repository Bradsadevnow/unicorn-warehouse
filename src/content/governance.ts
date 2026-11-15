import roster from "./governance.generated.json";

export const executives = roster;

export const leadershipHighlights: Record<string, string> = {
  "vesper-caldera": "Consolidated every appeal into one inbox.",
  "morrow-vale": "Counts your work before he counts your pay.",
  "marigold-thistle": "Gave members eight whole seconds to decline.",
  "lumen-hush": "Moved the ads into dreams you’d remember.",
  "bramble-quill": "Records attendance as proof you understood.",
};

export const committees = [
  {
    id: "continuity",
    name: "Member Autonomy & Revenue Continuity",
    chair: "marigold-thistle",
    mandate: "Review continuity of service when members request changes to their participation.",
    minutes: "The committee considered whether a member could decline while retaining access to air. The item was referred to the Revenue Continuity working group. The committee thanked members for their patience.",
  },
  {
    id: "settlement",
    name: "Audit & Future Earnings",
    chair: "morrow-vale",
    mandate: "Oversee Token settlement and the recognition of future member activity.",
    minutes: "The committee recognized submitted assignments as an operating success. Finance will recognize the payout when the client does.",
  },
  {
    id: "product",
    name: "Product Standards & Rest",
    chair: "lumen-hush",
    mandate: "Review the quality and availability of rest across Dreamwell plans.",
    minutes: "The committee reviewed feedback on sponsored nightmares. Members who stopped using Dreamwell were removed from the sample. Unresolved complaints fell.",
  },
] as const;

export const appointmentNotes: Record<string, string> = {
  "vesper-caldera": "Vesper consolidated the Portfolio’s appeals channels into one inbox. The board commended the resulting reduction in places where a decision could be reversed.",
  "morrow-vale": "Morrow oversees the separation of recognized work from settled payouts. He presents the first number to the board and the second to members.",
  "marigold-thistle": "Marigold introduced the eight-second consent window after determining that most objections were already understood. She oversees the relationship between cancellation and continued access to member benefits.",
  "lumen-hush": "Lumen led the launch of an ad-free Dreamwell tier. For the comparison group, the research team moved the ads into a dream participants were more likely to remember.",
  "bramble-quill": "Bramble authored the member-understanding clause and chairs the annual review of whether members understood it. Attendance is taken as confirmation.",
};
