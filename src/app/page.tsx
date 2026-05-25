"use client";

import { useState, useRef } from "react";
import DropzoneArea from "@/components/dropzone-area";
import { Shield, Zap, Image as ImageIcon, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TiltCard } from "@/components/tilt-card";
import { HeroParallax } from "@/components/hero-parallax";
import { LensBlurText } from "@/components/lens-blur-text";
import { ElegantFooter } from "@/components/elegant-footer";
import { ThemeToggle } from "@/components/theme-toggle";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.5 3.3 6.65 6.5 7a4.8 4.8 0 0 0-1 3.02V22" />
    <path d="M9 20c-5 1.5-5-2.5-7-3" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-border/40 relative group overflow-hidden">
      {/* Soft background glow on hover */}
      <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] -z-10 rounded-xl" />
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-8 px-4"
      >
        <h3 className="font-heading text-2xl text-foreground group-hover:text-primary transform group-hover:translate-x-2 transition-all duration-500 ease-[0.16,1,0.3,1]">{question}</h3>
        
        {/* Animated Icon container */}
        <div className="relative size-10 flex items-center justify-center rounded-full border border-transparent group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-500 shrink-0 ml-4">
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronDown className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-8 text-muted-foreground leading-relaxed text-lg font-sans">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 20;
    if (scrolled !== isScrolled) {
      setScrolled(isScrolled);
    }
  });

  return (
    <div className="flex-1 flex flex-col relative bg-background text-foreground selection:bg-primary/10">
      
      {/* High-Fashion Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/40 py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-3xl font-heading font-semibold tracking-wide logo-shimmer" role="img" aria-label="HEIC Studio">HEIC Studio.</span>
          </div>
          <nav className="flex items-center gap-10">
            {["Approach", "Privacy", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" });
                }}
                data-text={item}
                className="nav-link text-sm font-sans tracking-[0.15em] uppercase hidden md:block relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <a
              href="https://github.com/DShivam9/HEIC-STUDIO"
              target="_blank"
              rel="noreferrer"
              className="text-foreground/70 hover:text-primary hover:-translate-y-1 transition-all duration-300 inline-block"
            >
              <GithubIcon className="size-5" />
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </motion.header>

      <main className="flex-1 flex flex-col relative">
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-[250vh] md:h-[400vh] w-full">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
            <motion.div
              initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            >
              <HeroParallax scrollProgress={heroScrollYProgress} />
            </motion.div>
            
            <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mt-12 md:mt-20">
            
            <div className="max-w-4xl mx-auto pb-4">
              <motion.h1 
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-[5.5rem] font-heading font-medium tracking-tight text-foreground leading-[1.1] mb-8 md:mb-10 relative"
              >
                <span>Your Photos,{" "}</span>
                <span className="alive-text-container italic font-light">
                  {/* Crisp, solid core text with sweeping liquid metallic gradient */}
                  <span className="alive-text-core">
                    Unchained.
                  </span>
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="max-w-xl mx-auto text-muted-foreground text-base md:text-xl leading-relaxed font-sans font-light mb-8 md:mb-10"
              >
                Transform your iPhone HEIC photos to JPG, PNG, or WEBP instantly. Zero server uploads. 100% uncompromising privacy.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(15px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl relative mt-0 md:mt-2"
            >
              <DropzoneArea />
            </motion.div>

          </div>
          </div>
        </section>

        {/* Elegant Cards Section */}
        <section id="approach" className="bg-background/40 backdrop-blur-sm relative z-10 py-20 md:py-32 scroll-mt-20 border-y border-border/20">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="text-center mb-16 md:mb-20 space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-sans text-sm tracking-[0.2em] uppercase text-primary"
              >
                Our Approach
              </motion.h2>
              <div className="font-heading text-4xl md:text-5xl text-center px-4 leading-tight">
                <LensBlurText text="The Standard for Privacy" className="justify-center" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Absolute Privacy", desc: "Your photos never leave your device. WebAssembly performs the conversion entirely within your browser's local memory." },
                { icon: Zap, title: "Instant Velocity", desc: "No upload queues or server processing times. Harness the full power of your own hardware for immediate results." },
                { icon: ImageIcon, title: "Pristine Quality", desc: "Our conversion engine maintains the exact color profiles and resolution of your original Apple photography." }
              ].map((feature, i) => (
                <TiltCard key={i}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className="flex flex-col items-center text-center space-y-6 p-10 bg-card/50 backdrop-blur-md border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(var(--primary),0.15)] group relative overflow-hidden h-full"
                  >
                    {/* Subtle reveal gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <feature.icon className="size-8 text-primary/60 group-hover:text-primary transition-colors duration-500 stroke-[1]" />
                    <div className="space-y-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h4 className="text-2xl font-heading font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm font-sans font-light text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Deep Dive */}
        <section id="privacy" className="py-20 md:py-32 container mx-auto px-6 md:px-12 max-w-5xl relative z-10 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-primary">Our Guarantee</h2>
              <h3 className="font-heading text-4xl md:text-5xl leading-tight">Your Photos,<br/>Your Device.</h3>
              <div className="space-y-6 text-muted-foreground font-sans font-light text-base md:text-lg leading-relaxed">
                <p>
                  Absolute privacy is engineered into the core of HEIC Studio. We believe your personal memories should remain entirely under your control.
                </p>
                <p>
                  Our tool brings a powerful conversion engine directly to your browser. Your files never leave your computer, ensuring uncompromising security and processing speeds that bypass the cloud entirely.
                </p>
                <Link href="/learn-more" className="pt-4 flex items-center gap-4 text-sm font-medium text-primary cursor-pointer inline-flex group/link relative">
                  <span className="uppercase tracking-widest group-hover/link:tracking-[0.3em] transition-all duration-500 ease-[0.16,1,0.3,1]">Learn More</span>
                  <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square md:aspect-auto md:h-[450px] w-full max-w-md mx-auto"
            >
              <TiltCard className="w-full h-full rounded-[2.5rem]">
                <div className="w-full h-full rounded-[2.5rem] border border-border/30 bg-card/30 backdrop-blur-3xl overflow-hidden relative flex flex-col items-center justify-center shadow-2xl group">
                  
                  {/* Subtle rotating gradient background */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(var(--primary),0.03)_0deg,transparent_60deg,transparent_300deg,rgba(var(--primary),0.03)_360deg)] pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
                  
                  {/* Shield / Lock Icon */}
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mb-12"
                  >
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
                    <div className="relative p-5 rounded-2xl bg-foreground/5 border border-border/50 backdrop-blur-md shadow-xl">
                      <Shield className="size-10 text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]" strokeWidth={1} />
                    </div>
                  </motion.div>

                  {/* Text */}
                  <div className="text-center space-y-4 relative z-10">
                    <div className="text-8xl md:text-9xl font-heading italic text-foreground tracking-tighter mix-blend-difference opacity-90">
                      0
                    </div>
                    <div className="text-sm font-sans font-medium tracking-[0.4em] uppercase text-primary/70">
                      Bytes Uploaded
                    </div>
                  </div>
                  
                  {/* Floating data particles contained inside */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute size-1.5 bg-primary/40 rounded-full"
                        initial={{
                          x: 100 + ((i * 37) % 200),
                          y: 100 + ((i * 53) % 200),
                          opacity: 0,
                        }}
                        animate={{
                          x: [
                            `${((i * 17) % 80) + 10}%`,
                            `${((i * 43) % 80) + 10}%`,
                            `${((i * 71) % 80) + 10}%`,
                          ],
                          y: [
                            `${((i * 23) % 80) + 10}%`,
                            `${((i * 47) % 80) + 10}%`,
                            `${((i * 83) % 80) + 10}%`,
                          ],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 10 + (i % 10),
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* Comprehensive FAQ */}
        <section id="faq" className="py-20 md:py-32 relative z-10 scroll-mt-20">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-primary">Inquiries</h2>
              <h3 className="font-heading text-4xl md:text-5xl">Frequently Asked.</h3>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="Are my photos uploaded to a server?" 
                answer="No. This is the core philosophy of HEIC Studio. Your photos never leave your device. The conversion script is downloaded to your browser, and all processing happens in your local RAM." 
              />
              <FAQItem 
                question="Is there a file size limit?" 
                answer="Because the processing happens on your device, the only limit is your device's available memory. Modern smartphones and laptops can easily handle 50MB+ photos without issue." 
              />
              <FAQItem 
                question="Does this work on mobile devices?" 
                answer="Yes. HEIC Studio is fully responsive and the WebAssembly engine runs seamlessly in mobile Safari, Chrome, and Firefox." 
              />
              <FAQItem 
                question="Why are my iPhone photos in HEIC anyway?" 
                answer="Apple adopted HEIC (High-Efficiency Image Container) because it offers significantly better compression than JPG and PNG, saving you iCloud and device storage space without sacrificing quality." 
              />
              <FAQItem 
                question="Is HEIC Studio really free?" 
                answer="Yes, HEIC Studio is completely free to use with no limits. Since everything runs in your browser, there are no server costs for us to pass on to you. No ads, no sign-ups, no catches." 
              />
              <FAQItem 
                question="What is HEIC format?" 
                answer="HEIC stands for High-Efficiency Image Container. It's the default photo format used by Apple iPhones since iOS 11 (2017). HEIC files are roughly 50% smaller than equivalent JPG files while maintaining the same visual quality — but they're not universally supported by older software, which is why you may need to convert them to JPG, PNG, or WEBP." 
              />
            </div>
          </div>
        </section>
      </main>

      <ElegantFooter />
    </div>
  );
}
