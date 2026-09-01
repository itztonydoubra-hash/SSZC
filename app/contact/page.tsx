import type { Metadata } from "next";
import { Colophon } from "@/components/contact/Colophon";

export const metadata: Metadata = {
  title: "Contact — LAWSAN South South",
  description:
    "Reach the South South Zone of the Law Students' Association of Nigeria — official contact channels and office.",
};

export default function ContactPage() {
  return <Colophon />;
}
