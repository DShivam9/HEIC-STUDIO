import DropzoneArea from "@/components/dropzone-area";
import { Code2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-foreground rounded-md flex items-center justify-center text-background font-bold font-mono tracking-tighter">
              UH
            </div>
            <h1 className="text-xl font-bold tracking-tight">UnHEIC.</h1>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href="https://github.com/DShivam9/UnHEIC"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Code2 className="size-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-3xl flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl">
              Un-HEIC your photos.
            </h2>
            <p className="max-w-[42rem] mx-auto text-muted-foreground text-lg sm:text-xl leading-8">
              Fast, free, and <span className="text-foreground font-medium">100% private</span>. 
              Your photos are converted securely in your browser using WebAssembly. They never leave your device.
            </p>
          </div>

          <DropzoneArea />
        </div>
      </main>
    </div>
  );
}
