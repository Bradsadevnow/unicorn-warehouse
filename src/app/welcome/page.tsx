import type { Metadata } from "next";
import WelcomeFlow from "./WelcomeFlow";

export const metadata: Metadata = { title: "Member sign-in" };

export default function WelcomePage() {
  return <WelcomeFlow />;
}
