"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";

const Teacher = () => {
  const [fileData, setFileData] = useState<{ file: File | null }>({
    file: null,
  });

  const [fileNameNumber, setFileNameNumber] = useState(-1);

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
        fetch("https://knight-s-code.onrender.com/pdf", {
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

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-gray-900">
      <Image
        src="/background/map_screen_BG.png"
        alt="Mystical Map Background"
        fill
        className="absolute top-0 left-0 z-0 object-cover"
        priority
      />

      <div className="relative z-10 flex h-4/5 w-5/6 items-center justify-center overflow-hidden border-16 border-[#4b350f] bg-gray-900/50 p-4 shadow-2xl shadow-black/80 drop-shadow-[0_0_10px_rgba(200,150,50,0.5)] backdrop-blur-sm md:inset-0 md:aspect-video lg:border-32">
        <div className="absolute flex h-3/4 w-11/12 flex-col items-center justify-center">
          <div className="flex w-full max-w-sm flex-col items-center gap-8 rounded-2xl border border-gray-300 bg-white/90 p-10 shadow-2xl backdrop-blur-md">
            <h1 className="text-center font-['Pirata_One'] text-4xl text-gray-800 uppercase drop-shadow-md">
              SchoolMaster Portal
            </h1>

            <div className="w-full text-center">
              {fileNameNumber >= 0 && (
                <div className="rounded-lg border-2 border-indigo-500 bg-indigo-100 p-3 text-xl text-indigo-700 shadow-md">
                  File Uploaded! Game Code is: **{fileNameNumber}**
                </div>
              )}
              {fileNameNumber < 0 && (
                <p className="p-2 text-lg text-gray-600">
                  Upload a PDF assignment to generate a unique Game Code.
                </p>
              )}
            </div>

            <form className="flex w-full items-center justify-center gap-4">
              <input
                type="file"
                id="fileUpload"
                name="file"
                accept=".pdf"
                onChange={handleVarChange}
                className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
            </form>

            <div className="mt-4 text-sm text-gray-500">
              <p>Manage assignments for your scholars.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
