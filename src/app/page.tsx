import { redirect } from "next/navigation";

/** The site opens on the homepage while member enrollment is closed. */
export default function LandingPage() {
  redirect("/home");
}
