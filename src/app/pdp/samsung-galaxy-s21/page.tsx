import type { Metadata } from "next";
import { SamsungGalaxyS21Pdp } from "@/components/pdp/samsung-galaxy-s21-pdp";

export const metadata: Metadata = {
  title: "Samsung Galaxy S21 — Product Detail Page",
  description:
    "PDP demo for Samsung Galaxy S21 built with Tailwind CSS v4 and reusable components.",
};

export default function SamsungGalaxyS21PdpPage() {
  return <SamsungGalaxyS21Pdp />;
}
