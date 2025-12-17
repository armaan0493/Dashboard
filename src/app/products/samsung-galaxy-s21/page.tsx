import type { Metadata } from "next";
import { SamsungGalaxyS21Pdp } from "@/components/pdp/samsung-galaxy-s21-pdp";

export const metadata: Metadata = {
  title: "Samsung Galaxy S21 — Product Details",
  description:
    "Product detail page for Samsung Galaxy S21 with gallery, pricing, and key features.",
};

export default function SamsungGalaxyS21Page() {
  return <SamsungGalaxyS21Pdp />;
}
