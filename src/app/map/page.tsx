import { permanentRedirect } from "next/navigation";

/** The town map now lives on the homepage. Links to a place use /home?lot=<id>#town. */
export default function MapPage() {
  permanentRedirect("/home#town");
}
