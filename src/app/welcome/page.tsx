import type { Metadata } from "next";
import WelcomeEntry from "./WelcomeEntry";

export const metadata: Metadata = { title: "Member sign-in" };

export default function WelcomePage() {
  return <WelcomeEntry />;
}
