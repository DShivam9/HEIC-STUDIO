"use client";

import { motion, Variants } from "framer-motion";

interface LensBlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function LensBlurText({ text, className = "", delay = 0 }: LensBlurTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, filter: "blur(12px)", scale: 1.1, y: 10 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Custom sophisticated easing
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
