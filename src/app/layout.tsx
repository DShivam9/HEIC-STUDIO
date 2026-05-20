import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UnHEIC | Convert HEIC to JPG Locally",
  description: "Instantly convert your iPhone HEIC photos to JPG or PNG securely in your browser. No server uploads, zero privacy risks.",
  keywords: ["heic to jpg", "heic converter", "convert heic locally", "apple photo converter"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
