"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className="group relative flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-500 py-2 font-sans font-medium text-lg md:text-xl"
    >
      <span>{children}</span>
      <ArrowUpRight className="size-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]" />
      
      {/* Sliding Liquid Underline */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground/20 origin-right transition-transform duration-500 ease-[0.16,1,0.3,1] scale-x-0 group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
};

function ScrollLetter({ char, index, progress, total }: { char: string, index: number, progress: any, total: number }) {
  const start = 0.3 + (index * 0.04);
  const end = Math.min(start + 0.25, 1);
  
  // Explicitly clamp progress to prevent macOS elastic overscroll issues
  const clampedProgress = useTransform(progress, (v: number) => Math.min(Math.max(v, 0), 1));
  
  const y = useTransform(clampedProgress, [start, end], ["120%", "0%"]);
  const opacity = useTransform(clampedProgress, [start, end], [0, 1]);
  const rotateX = useTransform(clampedProgress, [start, end], [-80, 0]);
  const blurRaw = useTransform(clampedProgress, [start, end], [20, 0]);
  const filter = useTransform(blurRaw, (v: number) => `blur(${Math.max(0, v)}px)`);

  // Handle space characters — inline-block collapses whitespace
  const isSpace = char === " ";

  return (
    <motion.span style={{ y, opacity, rotateX, filter }} className="inline-block">
      <motion.span
        animate={{
          filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          // Tight wave: letters close together breathe almost in sync
          delay: index * 0.15,
        }}
        className="inline-block text-foreground cursor-default"
      >
        {isSpace ? "\u00A0" : char}
      </motion.span>
    </motion.span>
  );
}

export function ElegantFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);

  return (
    <footer 
      ref={containerRef}
      className="relative overflow-hidden pt-32 pb-8 px-6 md:px-12 flex flex-col justify-between min-h-[70vh] bg-background text-foreground"
    >
      {/* Top Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-32 z-10 relative">
        <div className="space-y-8 max-w-md">
          <h3 className="font-heading text-3xl md:text-4xl text-foreground leading-tight">
            The standard for secure<br/>image conversion.
          </h3>
          <p className="font-sans text-foreground/50 leading-relaxed font-light">
            Uncompromising Privacy • Zero Uploads • Instant Velocity. Designed to give you complete control over your memories.
          </p>
        </div>

        <div className="flex flex-col md:items-end space-y-4">
          <nav className="flex flex-col space-y-2">
            <FooterLink href="#approach">Approach</FooterLink>
            <FooterLink href="#privacy">Privacy</FooterLink>
            <FooterLink href="#faq">FAQ</FooterLink>
            <FooterLink href="https://github.com/DShivam9/HEIC Studio">Source Code</FooterLink>
          </nav>
        </div>
      </div>

      {/* Massive Elegant Text */}
      <div className="container mx-auto flex flex-col items-center justify-center relative z-10 mt-12">
        <motion.div 
          style={{ perspective: "1000px" }}
          className="w-full text-center relative group pb-4"
        >
          <h2 className="text-[15vw] leading-none font-heading font-medium tracking-[-0.04em] cursor-default relative flex justify-center">
            {"HEIC Studio.".split("").map((char, i, arr) => (
              <ScrollLetter key={i} char={char} index={i} progress={scrollYProgress} total={arr.length} />
            ))}
          </h2>
        </motion.div>
      </div>

      {/* Very Bottom Bar */}
      <div className="container mx-auto mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-sans text-muted-foreground z-10 relative">
        <p>© {new Date().getFullYear()} HEIC Studio. All rights reserved.</p>
        <p className="flex gap-4">
          <span>Local Processed</span>
          <span>Open Source</span>
        </p>
      </div>

      {/* Subtle glowing orb in background */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}
