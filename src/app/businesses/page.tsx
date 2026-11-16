import { permanentRedirect } from "next/navigation";

export default function BusinessesPage() {
  permanentRedirect("/home#businesses");
}
