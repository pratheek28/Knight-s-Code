"use client";
import Image from "next/image";
import Button from "@/components/button";

import { useRouter } from "next/navigation";
import React from "react";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";
import StudyZone from "./studyzone";

const Page: React.FC = () => {
  const router = useRouter();

  const handleTeacher = (): void => {
    router.push("/teacher");
  };

  const handleStudent = () => {
    router.push("/student");
  };

  // 2. Define the spring/bouncing transition properties
  const bounceAnimationProps = {
    animate: { y: [0, -8, 0] }, // Move up 8px, then back down
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // --- Tailwind Theme Definitions (Mystical Cosmic) ---
  // (Styles remain unchanged)
  const buttonCosmicTheme: string = `
        bg-purple-900 
        text-black-200 
        border-teal-600 
        shadow-xl shadow-blue-500/70 /* Blue/Purple glow */
        tracking-[3px] font-pirataOne
        
        /* Cosmic Hover Effects */
        hover:bg-purple-800 
        hover:border-purple-400
        hover:shadow-2xl hover:shadow-blue-400
    `;

  const buttonEtherealTheme: string = `
        bg-teal-900 
        text-black-200 
        border-purple-500 
        shadow-xl shadow-blue-500/70 /* Blue/Purple glow */
        tracking-[3px] font-pirataOne 
        
        /* Ethereal Hover Effects */
        hover:bg-purple-800 
        hover:border-purple-400
        hover:shadow-2xl hover:shadow-blue-400
    `;

  const titleClasses: string = `
        text-5xl md:text-[56px] font-bold 
        text-black uppercase text-center 
        tracking-wider font-pirataOne
        /* Custom Glowing Text Shadow */
        [text-shadow:0_0_2px_rgba(255,255,255,0.8),2_0_0px_rgba(255,255,255,0.3)]
    `;

  return (
    // 1. Root Container: Ensures the container takes up the screen and centers the content
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-gray-900">
        
        {/* 2. Aspect Ratio Wrapper (16:9 Screen) */}
        <div 
            className="relative w-full aspect-video max-h-[90vh] max-w-[90vw] 
                       overflow-hidden shadow-2xl shadow-black/80 border-4 border-yellow-700/50"
        >
            
            {/* Background Image: Fills the entire 16:9 wrapper */}
            <Image
                src="/background/splash_screen_BG.png"
                alt="Mystical Cosmic Background"
                fill
                className="absolute top-0 left-0 z-0 object-cover"
                priority
            />

            {/* Content (relative z-index 10 is crucial to appear above Image) */}
            <div 
                className="absolute inset-0 z-10 flex flex-col items-center justify-center 
                           gap-10 p-8 md:p-12 text-center"
            >
                
                {/* --- LOGO ELEMENT --- */}
                <div className="mt-2">
                    <Image
                        src="/icons/KnightsCode_logo.png"
                        alt="Knights Code Logo"
                        // Set fixed sizes optimized for the small screen aspect ratio
                        width={200}
                        height={200}
                        className="object-contain drop-shadow-[0_0_10px_rgba(150,0,255,0.7)]"
                        priority
                    />
                </div>

                {/* 1. Title Element */}
                <h1 className={titleClasses}>Play Now!</h1>

                {/* 2. Button Row */}
                <div className="flex w-full max-w-lg items-center justify-center gap-6 md:gap-12 mt-4">
                    
                    {/* Left Button (School Master) */}
                    <motion.div 
                        className="flex items-center justify-center"
                        {...bounceAnimationProps} 
                        transition={{ ...bounceAnimationProps.transition, delay: 0.1 }}
                    >
                        <Button
                            text="SchoolMaster"
                            onClick={handleTeacher}
                            className={buttonCosmicTheme}
                        />
                    </motion.div>

                    {/* Right Button (Scholar) */}
                    <motion.div 
                        className="flex items-center justify-center"
                        {...bounceAnimationProps} 
                        transition={{ ...bounceAnimationProps.transition, delay: 0.3 }}
                    >
                        <Button
                            text="Scholar"
                            onClick={handleStudent}
                            className={buttonEtherealTheme}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Page;