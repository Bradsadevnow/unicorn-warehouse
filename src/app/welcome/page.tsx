import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./welcome.module.css";

export const metadata: Metadata = {
  title: "Member enrollment",
  description: "Member enrollment in Unicornopolis opens soon.",
};

export default function WelcomePage() {
  return (
    <main className={styles.splash}>
      <div className={styles.card}>
        <p className={styles.brand}>✦ Unicorn Warehouse</p>
        <Image className={styles.mascot} src="/sign-in-unicorn.png" alt="" width={240} height={240} priority />
        <h1>Enrollment opens soon!</h1>
        <p>Unicornopolis is getting ready for you. Your position, your starter home, and your welcome credit are being prepared. ✨</p>
        <p>Until then, look around. Every business in town is already open, and every one of them is hiring.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/careers">Explore careers ✨</Link>
          <Link className={styles.secondary} href="/home#businesses">Browse the businesses</Link>
        </div>
        <p className={styles.note}>Your Social Security number is already on file. We’ll be in touch. 💖</p>
      </div>
    </main>
  );
}
