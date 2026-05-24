import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Cpu, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "How HEIC to JPG Conversion Works — The Architecture of Privacy",
  description:
    "Learn how HEIC Studio converts your iPhone photos to JPG entirely in your browser using WebAssembly. No servers, no uploads — understand the technology behind truly private photo conversion.",
  keywords: [
    "how heic conversion works",
    "heic to jpg privacy",
    "webassembly image converter",
    "client side heic converter",
    "local heic to jpg",
    "what is heic format",
  ],
  alternates: {
    canonical: "https://heicstudio.vercel.app/learn-more",
  },
  openGraph: {
    title: "How It Works — HEIC Studio",
    description:
      "Understand how HEIC Studio converts photos entirely in your browser with zero server uploads.",
    url: "https://heicstudio.vercel.app/learn-more",
    type: "article",
  },
};

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full py-6">
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-sans tracking-widest uppercase text-muted-foreground hover:text-primary hover:-translate-x-1 transition-all duration-300">
            <ArrowLeft className="size-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        
        {/* Header */}
        <header className="mb-24 space-y-6">
          <h1 className="text-sm font-sans tracking-[0.2em] uppercase text-primary">The Architecture of Privacy</h1>
          <h2 className="text-5xl md:text-7xl font-heading font-medium leading-[1.1] tracking-tight">
            Local First.<br/>Zero Compromise.
          </h2>
        </header>

        {/* Editorial Content */}
        <article className="prose prose-lg md:prose-xl prose-stone max-w-none font-sans font-light text-muted-foreground leading-relaxed">
          <p className="text-2xl text-foreground font-medium mb-12">
            The traditional model of photo conversion is fundamentally flawed. It asks you to trade your personal privacy for computational convenience. We refused to make that trade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-20">
            <div className="space-y-4">
              <Shield className="size-8 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-heading text-foreground">Absolute Security</h3>
              <p className="text-sm">Your files never traverse the internet. There is no cloud storage, no temporary server directories, and zero risk of interception.</p>
            </div>
            <div className="space-y-4">
              <Cpu className="size-8 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-heading text-foreground">WebAssembly Engine</h3>
              <p className="text-sm">We compile native C++ image processing libraries into WebAssembly, running at near-native speeds directly inside your browser's V8 engine.</p>
            </div>
            <div className="space-y-4">
              <Lock className="size-8 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-heading text-foreground">Cryptographic Guarantees</h3>
              <p className="text-sm">Because the architecture physically prevents network egress during processing, your privacy is guaranteed by math, not just a privacy policy.</p>
            </div>
          </div>

          <h3 className="text-3xl font-heading text-foreground mt-16 mb-6">How It Works</h3>
          <p>
            When you drop a HEIC file into HEIC Studio, you aren't uploading it. Instead, your browser passes a memory reference to our embedded WebAssembly (Wasm) module. 
          </p>
          <p>
            This module contains the sophisticated libheif decoder, compiled to run locally. It decodes the high-efficiency container format bit-by-bit in your device's RAM. Once the raw pixel data is extracted, it is immediately encoded into a standard JPG format and offered back to your local file system as a download.
          </p>
          <p>
            The moment you close the tab, the memory is purged. No logs. No traces.
          </p>

          <blockquote className="border-l-2 border-primary pl-6 my-16 italic text-foreground text-2xl font-heading">
            "Privacy shouldn't be an opt-in feature or a premium subscription. It must be the foundational architecture of the software we use."
          </blockquote>

          <h3 className="text-3xl font-heading text-foreground mt-16 mb-6">The Environmental Impact</h3>
          <p>
            Server-side conversion requires massive data centers running 24/7, consuming significant electricity and water for cooling. By utilizing the highly capable processors already sitting in your pocket or on your desk, HEIC Studio operates with a negligible carbon footprint. We distribute the workload to the edge—your device.
          </p>
        </article>

      </main>
    </div>
  );
}
