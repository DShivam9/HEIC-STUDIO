"use client";

import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

export function HeroParallax({ scrollProgress }: { scrollProgress?: MotionValue<number> }) {
  // Fallback if not passed (though it will be passed now)
  const dummyProgress = useTransform(() => 0);
  const progress = scrollProgress || dummyProgress;
  
  // Add physics-based smoothing for buttery scroll feel
  const smoothProgress = useSpring(progress, {
    stiffness: 40,
    damping: 20,
    mass: 0.8
  });

  // --- GROUP 1 (Initial scroll: 0 to 0.3) ---
  const g1Opacity = useTransform(smoothProgress, [0, 0.15, 0.3, 1], [1, 1, 0, 0]);
  const g1Y = useTransform(smoothProgress, [0, 0.3, 1], [0, -800, -800]);
  const g1Scale = useTransform(smoothProgress, [0, 0.3, 1], [1, 0.8, 0.8]);

  // --- GROUP 2 (Mid scroll: 0.15 to 0.65) ---
  const g2Opacity = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.65, 1], [0, 0, 1, 1, 0, 0]);
  const g2Y = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.65, 1], [800, 800, 0, -50, -800, -800]);
  const g2Scale = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.65, 1], [0.8, 0.8, 1, 1, 0.8, 0.8]);

  // --- GROUP 3 (Final scroll: 0.5 to 0.95) ---
  const g3Opacity = useTransform(smoothProgress, [0, 0.5, 0.65, 0.85, 0.95, 1], [0, 0, 1, 1, 0, 0]);
  const g3Y = useTransform(smoothProgress, [0, 0.5, 0.65, 0.85, 0.95, 1], [800, 800, 0, -50, -800, -800]);
  const g3Scale = useTransform(smoothProgress, [0, 0.5, 0.65, 0.85, 0.95, 1], [0.8, 0.8, 1, 1, 0.8, 0.8]);

  // Group 4 (Optional, last set to leave empty by 1.0)
  // At 1.0, everything is opacity 0 so the dropzone is perfectly clear.

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* ================= GROUP 1 ================= */}
      {/* Photo 1: Mid Left */}
      <motion.div
        style={{ opacity: g1Opacity, y: g1Y, scale: g1Scale }}
        className="absolute top-[20%] -left-[10%] md:left-[5%] w-48 md:w-64 aspect-[3/4] will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [-6, -4, -6] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>

      {/* Photo 2: Mid Right */}
      <motion.div
        style={{ opacity: g1Opacity, y: g1Y, scale: g1Scale }}
        className="absolute top-[25%] -right-[15%] md:right-[2%] w-56 md:w-72 aspect-[4/5] will-change-transform"
      >
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [8, 6, 8] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>

      {/* Photo 3: Bottom Left */}
      <motion.div
        style={{ opacity: g1Opacity, y: g1Y, scale: g1Scale }}
        className="absolute -bottom-[5%] left-[20%] w-40 aspect-square will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [12, 14, 12] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>


      {/* ================= GROUP 2 ================= */}
      {/* Photo 4: Top Left */}
      <motion.div
        style={{ opacity: g2Opacity, y: g2Y, scale: g2Scale }}
        className="absolute top-[10%] left-[15%] w-52 md:w-72 aspect-[4/3] will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [-3, -1, -3] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>

      {/* Photo 5: Bottom Right */}
      <motion.div
        style={{ opacity: g2Opacity, y: g2Y, scale: g2Scale }}
        className="absolute bottom-[10%] right-[10%] w-48 md:w-60 aspect-square will-change-transform"
      >
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [5, 3, 5] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 1.5 }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>


      {/* ================= GROUP 3 ================= */}
      {/* Photo 6: Left side */}
      <motion.div
        style={{ opacity: g3Opacity, y: g3Y, scale: g3Scale }}
        className="absolute top-[15%] left-[3%] w-56 md:w-72 aspect-[3/4] will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-8, -6, -8] }}
          transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1 }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1509305717900-84f40e786d82?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>

      {/* Photo 7: Right side */}
      <motion.div
        style={{ opacity: g3Opacity, y: g3Y, scale: g3Scale }}
        className="absolute top-[10%] -right-[5%] md:right-[3%] w-60 md:w-72 aspect-[4/5] will-change-transform"
      >
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [10, 12, 10] }}
          transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 0.2 }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>

      {/* Photo 8: Bottom center-left */}
      <motion.div
        style={{ opacity: g3Opacity, y: g3Y, scale: g3Scale }}
        className="absolute bottom-[8%] left-[25%] w-44 md:w-56 aspect-square will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [4, 6, 4] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.8 }}
          className="w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
      </motion.div>

    </div>
  );
}
