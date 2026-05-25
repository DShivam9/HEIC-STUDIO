import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | HEIC Studio",
  description:
    "Our privacy policy is simple: we don't collect, store, or process your data. HEIC Studio runs entirely on your local device.",
  alternates: {
    canonical: "https://heicstudio.vercel.app/privacy",
  },
};

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground font-sans font-light">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </header>

        {/* Content */}
        <article className="prose prose-lg md:prose-xl prose-stone max-w-none font-sans font-light text-muted-foreground leading-relaxed">
          <p className="text-2xl text-foreground font-medium mb-12">
            The shortest privacy policy you will ever read: We do not collect, process, or store your personal data, period.
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">1. Zero Data Collection</h2>
          <p>
            HEIC Studio was architected from the ground up to operate without needing your data. We do not use cookies, we do not employ tracking scripts (like Google Analytics or Facebook Pixel), and we do not monitor your usage of the application. 
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">2. Local Processing Guarantee</h2>
          <p>
            When you use HEIC Studio to convert images, the entire conversion process happens locally within your web browser using WebAssembly. 
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li><strong>No Uploads:</strong> Your images are never transmitted over the internet to any server.</li>
            <li><strong>No Cloud Storage:</strong> We do not have servers capable of storing your photos.</li>
            <li><strong>Absolute Privacy:</strong> Once you close the browser tab, all image data is immediately purged from your device's memory.</li>
          </ul>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">3. Third-Party Services</h2>
          <p>
            Our website is hosted on Vercel, which provides the infrastructure to serve the website's static files (HTML, CSS, JavaScript) to your browser. Vercel may collect basic, anonymized server logs (such as IP addresses and user agents) strictly for security and infrastructure reliability purposes, as is standard for all web hosting. We do not have access to this data for marketing or profiling.
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">4. Open Source Transparency</h2>
          <p>
            Because we believe privacy requires transparency, the entire source code for HEIC Studio is publicly available on GitHub. Anyone can audit the code to verify that no data is being exfiltrated or collected.
          </p>

          <h2 className="text-2xl font-heading text-foreground mt-12 mb-4">5. Contact</h2>
          <p>
            If you have any questions or concerns regarding this privacy policy or the technical architecture of HEIC Studio, please open an issue on our public GitHub repository.
          </p>
        </article>

      </main>
    </div>
  );
}
