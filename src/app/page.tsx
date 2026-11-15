import WelcomeFlow from "./welcome/WelcomeFlow";
import { signInProfiles } from "@/content/memberAccount";

export default function LandingPage() {
  return <WelcomeFlow profiles={signInProfiles} />;
}
