import Link from "next/link";
import styles from "./policy-document.module.css";

export default function CancellationDetails({ section, children }: { section: string; children: React.ReactNode }) {
  return (
    <details className={styles.cancellation}>
      <summary>What happens if I cancel?</summary>
      <p>{children}</p>
      <Link href={`/product-details#${section}`}>Read the Product Details →</Link>
    </details>
  );
}
