import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HEIC to WEBP Converter — Free, Private, Instant",
  description:
    "Convert HEIC files to WEBP instantly in your browser. No upload required. 100% private, free, and unlimited. Works on iPhone photos, iPad screenshots, and all Apple HEIC images.",
  keywords: [
    "heic to webp",
    "heic to webp converter",
    "convert heic to webp",
    "heic to webp online",
    "heic to webp free",
    "iphone heic to webp",
    "apple photo to webp",
  ],
  alternates: {
    canonical: "https://heicstudio.vercel.app/convert/heic-to-webp",
  },
  openGraph: {
    title: "HEIC to WEBP Converter — Free & Private | HEIC Studio",
    description:
      "Convert iPhone HEIC photos to WEBP instantly. No uploads, no servers — everything happens in your browser.",
    url: "https://heicstudio.vercel.app/convert/heic-to-webp",
    type: "website",
  },
};

export default function HeicToWebpPage() {
  redirect("/");
}
