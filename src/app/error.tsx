"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { WebglFluidAura } from "@/components/webgl-fluid-aura";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary flex flex-col items-center justify-center text-center p-6">
      <WebglFluidAura />
      
      <div className="relative z-10 space-y-6 max-w-md mx-auto">
        <h1 className="text-5xl font-heading font-bold text-destructive mix-blend-multiply mb-4">Oops!</h1>
        <h2 className="text-2xl font-heading font-medium tracking-tight">Something went wrong</h2>
        <p className="text-muted-foreground font-sans">
          We encountered an unexpected error. Please try again.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button onClick={reset} className="gap-2 w-full sm:w-auto">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
          <Link href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2 w-full sm:w-auto">
            <ArrowLeft className="size-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
