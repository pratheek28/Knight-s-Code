// src/app/teacher/page.tsx

"use client";
import { useState } from "react";
import Image from 'next/image'; // Image component is correctly imported
import React from 'react';

const Teacher = () => {
  const [fileData, setFileData] = useState<{ file: File | null }>({
    file: null,
  });

  const [fileNameNumber, setFileNameNumber] = useState(-1);

  // --- ORIGINAL TEACHER LOGIC (UNCHANGED) ---
  const getUploadedFile = (fileName: string) => {
    let num = 0;
    for (let i = 0; i < fileName.length; i++) {
      num += fileName.charCodeAt(i);
    }
    console.log(num);
    setFileNameNumber(num);
  };

  const handleVarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setFileData({
      ...fileData,
      file,
    });

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result;
        console.log(arrayBuffer);
      };

      reader.readAsArrayBuffer(file);

      getUploadedFile(file.name);
    }

    if (file) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      try {
        fetch("http://127.0.0.1:8000/pdf", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };
  // --- END OF ORIGINAL TEACHER LOGIC ---

  return (
    // 1. Root Container: (No background style prop here)
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center relative bg-gray-900"
    >
      
      {/* 2. BACKGROUND IMAGE: Correctly using Next.js Image Component */}
      <Image
        src="/background/map_screen_BG.png" // Source is correct
        alt="Mystical Map Background"
        fill // Fills the root container
        className="absolute top-0 left-0 z-0 object-cover" // Ensures cover behavior
        priority
      />

      {/* 3. Antique Frame Wrapper (16:9 Aspect Ratio Look) */}
      <div 
        className="relative w-full aspect-video max-h-[90vh] max-w-[90vw] 
                   overflow-hidden shadow-2xl shadow-black/80 
                   border-[16px] border-[#4b350f] lg:border-[32px] 
                   drop-shadow-[0_0_10px_rgba(200,150,50,0.5)] 
                   bg-gray-900/50 backdrop-blur-sm z-10" // Frame styling
      >
        
        {/* 4. Content Container (Centered within the frame) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          
          <div className="bg-white/90 p-10 rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-sm flex flex-col items-center gap-8 border border-gray-300">
            
            {/* Title (Visual) */}
            <h1 className="text-4xl text-gray-800 text-center font-['Pirata_One'] drop-shadow-md uppercase">
              SchoolMaster Portal
            </h1>

            {/* Game Code Display */}
            <div className="text-center w-full">
              {fileNameNumber >= 0 && (
                <div className="text-xl text-indigo-700 p-3 bg-indigo-100 rounded-lg border-2 border-indigo-500 shadow-md">
                  File Uploaded! Game Code is: **{fileNameNumber}**
                </div>
              )}
              {fileNameNumber < 0 && (
                <p className="text-lg text-gray-600 p-2">
                  Upload a PDF assignment to generate a unique Game Code.
                </p>
              )}
            </div>
            
            {/* File Upload Form */}
            <form className="flex w-full items-center justify-center gap-4">
              <input
                type="file"
                id="fileUpload"
                name="file"
                accept=".pdf"
                onChange={handleVarChange}
                className="w-full text-sm text-gray-900 
                          border border-gray-300 rounded-lg cursor-pointer 
                          bg-gray-50 p-2.5 
                          file:mr-4 file:py-2 file:px-4 
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
              />
            </form>
            
            {/* Footer Note (Visual) */}
            <div className="text-sm text-gray-500 mt-4">
                <p>Manage assignments for your scholars.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;