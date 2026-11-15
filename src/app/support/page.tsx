import type { Metadata } from "next";
import Image from "next/image";
import unicorn from "@/assets/support-unicorn.webp";
import SupportChat from "./SupportChat";
import { supportAnswers } from "@/content/supportAnswers";
import styles from "./support.module.css";

export const metadata: Metadata = {
  title: "Customer Support",
  description: "Ask a Unicorn Warehouse support unicorn about memberships and benefits.",
};

export default function SupportPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Image src={unicorn} alt="" sizes="(max-width: 700px) 110px, 190px" />
        <div>
          <h1>Got questions?</h1>
          <p>Chat with one of our support unicorns!</p>
        </div>
      </header>
      <SupportChat suggestions={supportAnswers.map(({ id, question }) => ({ id, question }))} />
    </main>
  );
}
