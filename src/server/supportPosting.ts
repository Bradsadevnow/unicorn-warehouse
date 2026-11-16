import "server-only";

import { getPosting } from "@/content/goodshiftPostings";
import { getHelpingHandPosting } from "@/content/helpingHandPostings";

const helpingHandPrefix = "helpinghand:";

export function getSupportPosting(key: unknown) {
  if (typeof key !== "string") return undefined;
  if (key.startsWith(helpingHandPrefix)) {
    const posting = getHelpingHandPosting(key.slice(helpingHandPrefix.length));
    return posting && { brand: "HelpingHand", id: helpingHandPrefix + posting.slug, posting } as const;
  }
  const posting = getPosting(key);
  return posting && { brand: "Goodshift", id: posting.id, posting } as const;
}
