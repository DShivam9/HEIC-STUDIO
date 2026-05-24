import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WebglFluidAura } from "@/components/webgl-fluid-aura";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary flex flex-col items-center justify-center text-center p-6">
      <WebglFluidAura />
      
      <div className="relative z-10 space-y-6">
        <h1 className="text-8xl md:text-9xl font-heading font-bold text-primary opacity-80 mix-blend-multiply">404</h1>
        <h2 className="text-2xl md:text-4xl font-heading font-medium tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground font-sans max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-sans tracking-widest uppercase text-muted-foreground hover:text-primary hover:-translate-x-1 transition-all duration-300 mt-8">
          <ArrowLeft className="size-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
