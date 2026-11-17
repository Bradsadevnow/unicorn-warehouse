import type { Metadata } from "next";
import { Suspense } from "react";
import { Fredoka, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Veil from "@/components/Veil";
import Footer from "@/components/Footer";
import SupportBar from "@/components/SupportBar";
import { getMemberPanel } from "@/server/memberPanel";
import { getMemberSession } from "@/server/memberSession";

const display = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Unicorn Warehouse",
    template: "%s · Unicorn Warehouse",
  },
  description:
    "Seven subscription companies across breath, sleep, labor, attention, comfort, demand and mortality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll />
        <div className="grain" aria-hidden />
        <Veil />
        <Nav />
        {children}
        <Footer />
        <Suspense fallback={null}><MemberSupportBar /></Suspense>
      </body>
    </html>
  );
}

async function MemberSupportBar() {
  const session = await getMemberSession();
  return session ? <SupportBar key={session.sessionId} sessionId={session.sessionId} panel={getMemberPanel(session)} /> : null;
}
