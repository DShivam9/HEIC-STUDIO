import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HEIC to PNG Converter — Free, Private, Lossless",
  description:
    "Convert HEIC files to PNG instantly in your browser. Lossless quality, no upload required. 100% private, free, and unlimited. Perfect for iPhone and iPad photos.",
  keywords: [
    "heic to png",
    "heic to png converter",
    "convert heic to png",
    "heic to png online",
    "heic to png free",
    "iphone heic to png",
  ],
  alternates: {
    canonical: "https://heicstudio.vercel.app/convert/heic-to-png",
  },
  openGraph: {
    title: "HEIC to PNG Converter — Free & Private | HEIC Studio",
    description:
      "Convert iPhone HEIC photos to lossless PNG instantly. No uploads, no servers — everything happens in your browser.",
    url: "https://heicstudio.vercel.app/convert/heic-to-png",
    type: "website",
  },
};

export default function HeicToPngPage() {
  redirect("/");
}
