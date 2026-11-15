import type { Metadata } from "next";
import PolicyDocument from "@/components/PolicyDocument";
import { terms } from "@/content/portfolioTerms";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return <PolicyDocument title="Terms & Conditions" intro="Account access, payments, renewals, and use of member materials across the Portfolio." related={{ href: "/product-details", label: "Read the Product Details" }} sections={terms} />;
}
