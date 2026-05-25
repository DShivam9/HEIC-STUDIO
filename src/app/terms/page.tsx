import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | HEIC Studio",
  description:
    "Terms of Service for HEIC Studio, a free, client-side web application for converting image formats.",
  alternates: {
    canonical: "https://heicstudio.vercel.app/terms",
  },
};

export default function TermsOfService() {
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

      <main className="pt-32 pb-24 container mx-auto px-6 md:px-12 max-w-3xl relative z-10">
        
        {/* Header */}
        <header className="mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-medium leading-[1.1] tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-muted-foreground font-sans font-light">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </header>

        {/* Content */}
        <article className="prose prose-lg md:prose-xl prose-stone max-w-none font-sans font-light text-muted-foreground leading-relaxed">
          <p className="text-2xl text-foreground font-medium mb-12">
            By using HEIC Studio, you agree to these simple terms. This is a free, open-source utility provided "as-is".
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using HEIC Studio (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use the Service.
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">2. Description of Service</h2>
          <p>
            HEIC Studio is a client-side web application that allows users to convert HEIC image files into other standard formats (such as JPG, PNG, or WEBP). All processing is performed locally on your device's hardware via your web browser.
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">3. User Responsibilities</h2>
          <p>
            Because HEIC Studio operates entirely on your local device, you acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li>You are solely responsible for the images you choose to process using the Service.</li>
            <li>The speed and capability of the conversion depend entirely on your device's hardware and web browser limitations.</li>
            <li>We do not store backups of your original or converted files; you are responsible for maintaining your own copies.</li>
          </ul>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">4. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, completely error-free, or that it will meet your specific requirements. While we strive to provide high-quality image conversions, we cannot guarantee pixel-perfect accuracy or complete preservation of all metadata in every possible edge case.
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">5. Limitation of Liability</h2>
          <p>
            In no event shall HEIC Studio, its creators, or contributors be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of data, loss of profits, device overheating, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms of Service.
          </p>
        </article>

      </main>
    </div>
  );
}
