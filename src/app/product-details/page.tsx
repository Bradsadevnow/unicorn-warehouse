import type { Metadata } from "next";
import PolicyDocument from "@/components/PolicyDocument";
import { productDetails } from "@/content/portfolioTerms";

export const metadata: Metadata = { title: "Product Details" };

export default function ProductDetailsPage() {
  return <PolicyDocument title="Product Details" intro="Service schedules and conditions for Portfolio memberships, assignments, and redemptions." related={{ href: "/terms", label: "Read the Terms & Conditions" }} sections={productDetails} />;
}
