import { brightsideBriefId } from "./gigCatalogs";
import { postingPath, postings } from "./goodshiftPostings";
import { helpingHandPostings } from "./helpingHandPostings";

export function getWorkListingPath(title: string, board: "HelpingHand" | "Goodshift" | "Brightside") {
  let path: string | undefined;
  switch (board) {
    case "HelpingHand":
      path = helpingHandPostings.find((posting) => posting.title === title)?.href;
      break;
    case "Goodshift": {
      const posting = postings.find((job) => job.title === title);
      path = posting && postingPath(posting);
      break;
    }
    case "Brightside":
      return `/termiflux#${brightsideBriefId(title)}`;
  }
  if (!path) throw new Error(`Missing ${board} listing for ${title}`);
  return path;
}
