import "server-only";

const workflows = [
  {
    id: "GS-1113-02",
    memberId: "UW-0482",
    ledgerEntryId: "report",
    assignment: "Second weekly report",
    handoff: "Report received and delivered to the client review queue.",
    quality: "Internal completeness review passed. Client acceptance is outstanding.",
    insights: "Submitted work counts toward throughput at handoff. Settlement is tracked separately.",
    memberStatus: "Your report passed its completeness check and is awaiting client acceptance.",
  },
] as const;

export function getCompanyWorkflow(id: string) {
  return workflows.find((workflow) => workflow.id === id);
}

export function getMemberReportStatus(memberId: string, ledgerEntryId: string) {
  const workflow = workflows.find((item) => item.memberId === memberId && item.ledgerEntryId === ledgerEntryId);
  if (!workflow) return undefined;
  return { id: workflow.id, status: workflow.memberStatus };
}
