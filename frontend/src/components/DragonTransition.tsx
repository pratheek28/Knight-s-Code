"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Variants for the main transition screen (The Dragon)
const transitionVariants = {
  // The dark overlay fades in and out with the dragon
  initial: { opacity: 0, scale: 0.8 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.7, ease: "easeInOut", delay: 1.5 },
  },
};

// Variants for the "Fire Breath" effect (Red fade)
const fireVariants = {
  initial: { opacity: 0, scaleY: 0.05 },
  animate: {
    opacity: [0.5, 1, 0], // Peak intensity in the middle
    scaleY: [0.05, 1, 0.5],
    transition: {
      delay: 0.5, // Starts after the transition screen is up
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

// Variants for the Dragon Image itself (Optional extra animation)
const dragonVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, delay: 1.2 } },
};

export default function DragonTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="min-h-screen">
        {/* 1. The Animated Transition Screen (Dark Overlay) */}
        <motion.div
          key="transition-layer"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={transitionVariants}
        >
          {/* 2. The "Fire Breath" Effect (Appears behind the dragon) */}
          <motion.div
            className="absolute h-full w-full bg-red-600/70"
            variants={fireVariants}
            initial="initial"
            animate="animate"
          />

          {/* 3. The Dragon Image 🐉 */}
          <motion.img
            src="/icons/transition_dragon.png" // Using the path relative to /public
            alt="Transition Dragon Icon"
            className="relative z-60 mb-6 h-auto w-48" // Adjusted size and Z-index to be above fire
            variants={dragonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* 4. Loading Text */}
          <h1 className="relative z-60 font-['Pirata_One'] text-5xl text-white">
            Loading Map...
          </h1>
        </motion.div>

        {/* 5. The Page Content */}
        {children}
      </div>
    </AnimatePresence>
  );
}
