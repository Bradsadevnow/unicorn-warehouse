import "server-only";

import { traineeEligibility } from "@/content/careers";
import { getPosting } from "@/content/goodshiftPostings";
import type { MemberAccount } from "@/content/memberAccount";

const acceptedStatuses = new Set(["Client accepted", "Completed"]);

/** Progress toward a Unicorn Trainee application. Only accepted assignments from herd-eligible postings count. */
export function getHerdEligibility(account: MemberAccount) {
  const counted: string[] = [];
  const awaitingAcceptance: string[] = [];
  const notEligible: string[] = [];
  for (const { id, status, postingId } of account.assignments) {
    const eligible = postingId ? getPosting(postingId)?.herdEligible === true : false;
    if (!eligible) notEligible.push(id);
    else if (acceptedStatuses.has(status)) counted.push(id);
    else awaitingAcceptance.push(id);
  }
  return {
    required: traineeEligibility,
    counted,
    awaitingAcceptance,
    notEligible,
    remaining: Math.max(0, traineeEligibility - counted.length),
  };
}
