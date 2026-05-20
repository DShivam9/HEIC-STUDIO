"use client";

import { useEffect, useState } from "react";
import DropzoneArea from "@/components/dropzone-area";
import { Code2, Zap, Shield, Sparkles } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <div className="flex-1 flex flex-col relative bg-background selection:bg-primary/20">
      
      {/* Structural Navbar - Solid, no glass blur */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
          scrolled ? "bg-background border-b border-border" : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-foreground rounded-none flex items-center justify-center text-background font-bold font-sans tracking-tighter">
              UH
            </div>
            <h1 className="text-xl font-heading font-bold tracking-tight">UnHEIC.</h1>
          </div>
          <nav className="flex items-center gap-8">
            {["About", "How it Works", "Privacy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="https://github.com/DShivam9/UnHEIC"
              target="_blank"
              rel="noreferrer"
              className="text-foreground transition-transform hover:-translate-y-0.5 flex items-center gap-2 text-sm font-medium bg-foreground/5 px-4 py-2 rounded-none border border-foreground/10"
            >
              <Code2 className="size-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </motion.header>

      <main className="flex-1 flex flex-col pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center justify-center min-h-[75vh]">
          <div className="w-full max-w-4xl flex flex-col items-center space-y-12 text-center">
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl font-heading font-bold tracking-tighter text-foreground leading-[1.1]"
              >
                Un-HEIC your photos.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[38rem] mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed font-sans"
              >
                Fast, free, and <strong className="text-foreground font-medium">100% private</strong>. 
                Converted securely inside your browser using WebAssembly.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <DropzoneArea />
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="border-y border-border bg-foreground/[0.02] py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center space-y-4 p-8 bg-background border border-border transition-shadow hover:shadow-lg"
              >
                <Shield className="size-8 text-foreground mb-2 stroke-[1.5]" />
                <h3 className="text-xl font-heading font-bold text-foreground">100% Local & Private</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your photos never touch a server. WebAssembly does all the heavy lifting right in your browser memory.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center space-y-4 p-8 bg-background border border-border transition-shadow hover:shadow-lg"
              >
                <Zap className="size-8 text-foreground mb-2 stroke-[1.5]" />
                <h3 className="text-xl font-heading font-bold text-foreground">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No waiting for uploads or downloads. Conversions happen instantly using your device's full power.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center space-y-4 p-8 bg-background border border-border transition-shadow hover:shadow-lg"
              >
                <Sparkles className="size-8 text-foreground mb-2 stroke-[1.5]" />
                <h3 className="text-xl font-heading font-bold text-foreground">Free Forever</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No paywalls, no file size limits, no accounts required. Just simple, unlimited conversions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section id="how-it-works" className="py-24 container mx-auto px-4 max-w-3xl">
          <div className="space-y-24">
            
            {/* How it Works */}
            <div className="space-y-8">
              <h2 className="text-4xl font-heading font-bold tracking-tight text-foreground">How it works.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-l border-border pl-6">
                <div className="space-y-3">
                  <div className="text-sm font-bold text-muted-foreground tracking-widest uppercase">01</div>
                  <h4 className="font-bold text-foreground">Select Files</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Drag and drop your iPhone HEIC photos into the zone.</p>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-bold text-muted-foreground tracking-widest uppercase">02</div>
                  <h4 className="font-bold text-foreground">Local Magic</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Your browser converts them instantly using WebAssembly.</p>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-bold text-muted-foreground tracking-widest uppercase">03</div>
                  <h4 className="font-bold text-foreground">Save JPGs</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Download your universally compatible JPG files immediately.</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div id="about" className="space-y-8 pt-12 border-t border-border">
              <h2 className="text-4xl font-heading font-bold tracking-tight text-foreground">What is a HEIC file?</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-serif">
                <p>
                  HEIC (High-Efficiency Image Container) is the default photo format used by Apple on modern iPhones and iPads. While it's fantastic for saving storage space without losing visual quality, it can be a nightmare when you try to share those photos with Windows PCs, Android devices, or older websites that only accept JPG or PNG formats.
                </p>
                <p>
                  UnHEIC solves this by acting as a bridge, instantly transforming your HEIC images into standard JPGs so you can use them everywhere, without the hassle of installing software.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div id="privacy" className="space-y-8 pt-12 border-t border-border">
              <h2 className="text-4xl font-heading font-bold tracking-tight text-foreground">Strict Privacy.</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-serif">
                <p>
                  <strong className="text-foreground">We do not collect, store, or see your photos. Period.</strong>
                </p>
                <p>
                  Traditional image converters force you to upload your personal photos to their remote servers, where they process them and make you download the result. This is a massive privacy risk and highly inefficient.
                </p>
                <p>
                  UnHEIC downloads the conversion engine (WebAssembly) directly to your browser once, and then processes all images entirely offline on your own device's CPU. Your images are never transmitted over the internet.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-foreground/[0.02] py-12">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-6 bg-foreground flex items-center justify-center text-background font-bold font-sans text-xs tracking-tighter">
              UH
            </div>
            <span className="font-heading font-bold tracking-tight text-foreground">UnHEIC</span>
          </div>
          
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} UnHEIC. 100% Client-Side Processing.
          </p>

          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="mailto:hello@unheic.com" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
