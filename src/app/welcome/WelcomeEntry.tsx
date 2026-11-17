import { employers, entryPositions, isOpenEntryPosition, payByLevel, tracks } from "@/content/careerTracks";
import { trackArt } from "@/content/trackArt";
import WelcomeFlow from "./WelcomeFlow";

const careerOptions = tracks.flatMap((track) => {
  const jobs = entryPositions(track.id).filter(isOpenEntryPosition).map((position) => ({
    id: position.id, title: position.title, business: employers[position.business]?.name ?? position.business,
    department: position.department, summary: position.summary, pay: payByLevel[position.level],
  }));
  return jobs.length ? [{ id: track.id, name: track.name, tagline: track.tagline, image: trackArt[track.id], jobs }] : [];
});

export default function WelcomeEntry() {
  return <WelcomeFlow tracks={careerOptions} />;
}
