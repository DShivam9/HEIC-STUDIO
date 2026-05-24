import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter — Free, Private, Instant",
  description:
    "Convert HEIC files to JPG instantly in your browser. No upload required. 100% private, free, and unlimited. Works on iPhone photos, iPad screenshots, and all Apple HEIC images.",
  keywords: [
    "heic to jpg",
    "heic to jpg converter",
    "convert heic to jpg",
    "heic to jpg online",
    "heic to jpg free",
    "iphone heic to jpg",
    "apple photo to jpg",
  ],
  alternates: {
    canonical: "https://heicstudio.vercel.app/convert/heic-to-jpg",
  },
  openGraph: {
    title: "HEIC to JPG Converter — Free & Private | HEIC Studio",
    description:
      "Convert iPhone HEIC photos to JPG instantly. No uploads, no servers — everything happens in your browser.",
    url: "https://heicstudio.vercel.app/convert/heic-to-jpg",
    type: "website",
  },
};

export default function HeicToJpgPage() {
  redirect("/");
}
