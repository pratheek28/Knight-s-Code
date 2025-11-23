"use client";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Transition, motion } from "framer-motion";

const Page: React.FC = () => {
  const router = useRouter();

  const handleTeacher = (): void => {
    router.push("/teacher");
  };

  const handleStudent = () => {
    router.push("/student");
  };

  const bounceAnimationProps = {
    animate: { y: [0, -8, 0] },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

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
    <div className="relative flex h-screen items-center justify-center bg-gray-900 p-4">
      <div className="relative h-full w-full overflow-hidden border-4 border-yellow-700/50 shadow-2xl shadow-black/80">
        <Image
          src="/background/splash_screen_BG.png"
          alt="Mystical Cosmic Background"
          fill
          className="absolute top-0 left-0 z-0 object-cover"
          priority
        />

        <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center gap-10 p-8 text-center md:inset-0 md:p-12">
          <div className="mt-2">
            <Image
              src="/icons/KnightsCode_logo.png"
              alt="Knights Code Logo"
              width={200}
              height={200}
              className="object-contain drop-shadow-[0_0_10px_rgba(150,0,255,0.7)]"
              priority
            />
          </div>

          <h1 className={titleClasses}>Play Now!</h1>

          <div className="mt-4 flex w-full max-w-lg flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
            <motion.div
              className="flex items-center justify-center"
              {...bounceAnimationProps}
              transition={{
                ...(bounceAnimationProps.transition as Transition),
                delay: 0.1,
              }}
            >
              <Button
                text="SchoolMaster"
                onClick={handleTeacher}
                className={buttonCosmicTheme}
              />
            </motion.div>

            <motion.div
              className="flex items-center justify-center"
              {...bounceAnimationProps}
              transition={{
                ...(bounceAnimationProps.transition as Transition),
                delay: 0.3,
              }}
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
