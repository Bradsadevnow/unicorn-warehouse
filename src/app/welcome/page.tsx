import type { Metadata } from "next";
import WelcomeFlow from "./WelcomeFlow";
import { signInProfiles } from "@/content/memberAccount";

export const metadata: Metadata = { title: "Member sign-in" };

export default function WelcomePage() {
  return <WelcomeFlow profiles={signInProfiles} />;
}
