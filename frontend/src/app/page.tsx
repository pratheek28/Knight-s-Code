"use client";

import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import React from 'react';

const Page: React.FC = () => {
    const router = useRouter();

    const handleTeacher = (): void => {
        router.push("/teacher");
    };
    
    // --- Tailwind Theme Definitions (Mystical Cosmic) ---
    
    // THEME 1: COSMIC BLUE/PURPLE (Deep Space)
    const buttonCosmicTheme: string = `
        bg-purple-900 
        text-purple-200 
        border-teal-600 
        shadow-xl shadow-blue-500/70 /* Blue/Purple glow */
        tracking-[1px] font-serif /* Placeholder for custom mystical font */
        
        /* Cosmic Hover Effects */
        hover:bg-purple-800 
        hover:border-purple-400
        hover:shadow-2xl hover:shadow-blue-400
    `;

    // THEME 2: ETHEREAL TEAL/PINK (Nebula Hues)
    const buttonEtherealTheme: string = `
        bg-teal-900 
        text-teal-200 
        border-purple-500 
        shadow-xl shadow-blue-500/70 /* Blue/Purple glow */
        tracking-[1px] font-serif /* Placeholder for custom mystical font */

        
        /* Ethereal Hover Effects */
        hover:bg-purple-800 
        hover:border-purple-400
        hover:shadow-2xl hover:shadow-blue-400
    `;
    
    // TITLE THEME: White, glowing text (fits any mystical background)
    const titleClasses: string = `
        text-7xl md:text-[64px] font-bold 
        text-white uppercase text-center 
        tracking-wider 
        font-unifraktur  
        
        /* Custom Glowing Text Shadow */
        [text-shadow:0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(255,255,255,0.3)]
    `;

    return (
        <div className="relative h-screen w-screen flex flex-col items-center justify-center gap-6">
            
            {/* Background */}
            <Image
                src="/background/splash_screen_BG.png"
                alt="Mystical Cosmic Background"
                fill
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                priority
            />

            {/* Content (relative z-index 10 is crucial to appear above Image) */}
            {/* Changed gap-[90px] to gap-16 to better accommodate the new Logo element */}
            <div className="relative flex flex-col items-center justify h-full w-full max-w-8xl gap-10 z-10 p-4">
                
                {/* --- NEW LOGO ELEMENT --- */}
                <div className="mt-2">
                    <Image
                        src="/icons/KnightsCode_logo.png"
                        alt="Knights Code Logo"
                        width={250} 
                        height={250} 
                        className="object-contain drop-shadow-[0_0_10px_rgba(150,0,255,0.7)]" 
                        priority
                    />
                </div>
                
                {/* 1. Title Element (Now below the logo) */}
                <h1 className={titleClasses}>Play Now!</h1>

                {/* 2. Button Row */}
                <div className="flex w-full justify-center items-center gap-6 md:gap-12">
                    
                    {/* Left Button (School Master) - Cosmic Theme */}
                    <div className="flex justify-center items-center">
                        <Button 
                            text="SchoolMaster" 
                            onClick={handleTeacher} 
                            className={buttonCosmicTheme}
                        />
                    </div>
                    
                    {/* Right Button (Scholar) - Ethereal Theme */}
                    <div className="flex justify-center items-center">
                        <Button 
                            text="Scholar" 
                            onClick={handleTeacher} 
                            className={buttonEtherealTheme}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;