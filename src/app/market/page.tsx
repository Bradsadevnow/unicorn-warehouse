import type { Metadata } from "next";
import CancellationDetails from "@/components/CancellationDetails";
import Image from "next/image";
import marketArt from "@/assets/unicorn-warehouse-market.webp";
import MarketCatalog from "./MarketCatalog";
import styles from "./market.module.css";

export const metadata: Metadata = {
  title: "Unicorn Warehouse Market",
  description: "Shop groceries, clothes, and household essentials with Tokens.",
};

export default function MarketPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <h1>Unicorn Warehouse Market</h1>
          <p>Groceries, clean socks, and everything on your list. All payable in Tokens.</p>
          <a href="#departments">Shop departments ↓</a>
        </div>
        <Image src={marketArt} alt="Unicorn shoppers push pastel carts through a market stocked with groceries and household essentials." sizes="(max-width: 760px) 100vw, 55vw" preload />
      </header>
      <MarketCatalog />
      <CancellationDetails section="market">You can stop shopping whenever you like. Orders already picked keep their place in fulfillment. Household forecasts remain available to the other services on your account.</CancellationDetails>
    </main>
  );
}
