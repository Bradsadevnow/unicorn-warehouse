import "server-only";

import { getRole, roles } from "@/content/careers";
import { employers, getPosition, getTrack, goodshiftTrack, helpingHandTrack, payByLevel, type TrackId } from "@/content/careerTracks";
import { getPosting } from "@/content/goodshiftPostings";
import { getHelpingHandPosting } from "@/content/helpingHandPostings";
import type { MemberAccount } from "@/content/memberAccount";

const acceptedStatuses = new Set(["Client accepted", "Completed"]);
const probationDays = 90;
const day = 24 * 60 * 60 * 1000;

/** The track an assignment's posting belongs to. HelpingHand postings are referenced as "helpinghand:<slug>". */
function postingTrack(postingId: string | undefined): TrackId | undefined {
  if (!postingId) return undefined;
  if (postingId.startsWith("helpinghand:")) {
    const posting = getHelpingHandPosting(postingId.slice("helpinghand:".length));
    return posting && helpingHandTrack(posting.site);
  }
  return getPosting(postingId) ? goodshiftTrack : undefined;
}

/**
 * An employee's two records, kept apart on purpose: the position (job, pay, manager, track)
 * and the horn rank (recognition), plus progress toward the next rank. Derived from the account.
 */
export function getEmployeeRecord(account: MemberAccount) {
  const position = getPosition(account.employment.positionId);
  const rank = getRole(account.employment.hornRank);
  if (!position || !rank) throw new Error(`Employment record for ${account.id} is incomplete`);
  const track = getTrack(position.track)!;
  const nextRank = roles.find(({ rung }) => rung === rank.rung + 1);

  const counted: string[] = [];
  const awaitingAcceptance: string[] = [];
  const otherTrack: string[] = [];
  for (const { id, status, postingId } of account.assignments) {
    if (postingTrack(postingId) !== position.track) otherTrack.push(id);
    else if (acceptedStatuses.has(status)) counted.push(id);
    else awaitingAcceptance.push(id);
  }
  const required = nextRank?.promotion.by === "qualification" ? nextRank.promotion.qualifyingShifts : undefined;
  const daysEmployed = Math.max(0, Math.round((Date.parse(account.asOf) - Date.parse(account.employment.hired)) / day));

  return {
    position: { id: position.id, title: position.title, level: position.level, department: position.department },
    employer: employers[position.business]?.name ?? position.business,
    manager: { name: position.manager, title: position.managerTitle },
    track: { id: track.id, name: track.name },
    basePay: payByLevel[position.level],
    hornRank: { slug: rank.slug, title: rank.title, horn: rank.horn },
    nextRank: nextRank && { slug: nextRank.slug, title: nextRank.title },
    qualifyingShifts: { counted, awaitingAcceptance, otherTrack, required },
    probation: { day: Math.min(daysEmployed, probationDays), of: probationDays, complete: daysEmployed >= probationDays },
    hired: account.employment.hired,
  };
}

export type EmployeeRecord = ReturnType<typeof getEmployeeRecord>;
