import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UnHEIC | Convert HEIC to JPG Locally",
  description: "Instantly convert your iPhone HEIC photos to JPG or PNG securely in your browser. No server uploads, zero privacy risks.",
  keywords: ["heic to jpg", "heic converter", "convert heic locally", "apple photo converter"],
  openGraph: {
    title: "UnHEIC | Local HEIC Converter",
    description: "Instantly convert your iPhone HEIC photos to JPG securely in your browser. Zero privacy risks.",
    url: "https://unheic.vercel.app",
    siteName: "UnHEIC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UnHEIC | Local HEIC Converter",
    description: "Instantly convert your iPhone HEIC photos to JPG securely in your browser. Zero privacy risks.",
  },
};

import { ConsoleSilencer } from "@/components/console-silencer";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${cormorant.variable} antialiased min-h-screen bg-background text-foreground flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ConsoleSilencer />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
