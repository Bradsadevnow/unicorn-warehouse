import { permanentRedirect } from "next/navigation";

export default function BankPage() {
  permanentRedirect("/tokens");
}
