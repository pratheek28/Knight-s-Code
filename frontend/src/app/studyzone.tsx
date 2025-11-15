"use client";
import IDE from "@/components/ide";
import MCQ from "@/components/mcq";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { p, s } from "framer-motion/client";

interface StudyZoneProps {
  chapno: int;
  qno: int;
  background: string;
}

const StudyZone = (props: StudyZoneProps) => {
  const [loading, setLoading] = useState(true);

  const [showWarning, setShowWarning] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    if (props.qno > 1) {
      // Logic to go to previous question FIXXMEEE
    } else {
      setShowWarning(
        "⚔ Thou art already at the beginning of thy chapter's quest, noble knight ⚔",
      );
      setTimeout(() => setShowWarning(""), 3000);
    }
  };

  const handleNext = () => {
    if (props.qno === 3) {
      setShowWarning(
        "⚔ Thou hast reached the end of thy chapter's quest. Proceed to the next chapter, mighty one! ⚔",
      );
      setTimeout(() => setShowWarning(""), 3000);
    } else {
      setShowWarning("⚔ Thou shall not pass, brave knight! ⚔");
      setTimeout(() => setShowWarning(""), 3000);
    }
  };

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${props.background})` }}
    >
      {/* Medieval warning popup at top */}
      {showWarning && (
        <div className="pointer-events-none fixed inset-x-0 top-8 z-50 flex justify-center">
          <div className="pointer-events-auto relative animate-pulse rounded-lg bg-yellow-800 p-4 text-center text-lg font-bold text-yellow-100 shadow-2xl">
            {showWarning}
          </div>
        </div>
      )}

      {!loading && (
        <>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handlePrev}
              className="cursor-pointer rounded-md border-2 border-yellow-500 bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900 px-3 py-1 text-lg font-bold text-yellow-300 shadow-[0_0_12px_rgba(255,215,0,0.8)] ring-1 ring-yellow-400 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_24px_rgba(255,255,180,0.9)]"
            >
              &lt;
            </button>
            <div className="flex items-center justify-center space-x-2 text-yellow-300 font-bold text-lg tracking-wider">
  <span className="bg-yellow-800 px-2 py-1 rounded shadow-md border-2 border-yellow-600">
    Chapter {props.chapno}
  </span>
  <span className="text-yellow-500 font-extrabold">/</span>
  <span className="bg-yellow-800 px-2 py-1 rounded shadow-md border-2 border-yellow-600">
    Mission {props.qno}
  </span>
</div>

            <button
              onClick={handleNext}
              className="cursor-pointer rounded-md border-2 border-yellow-500 bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900 px-3 py-1 text-lg font-bold text-yellow-300 shadow-[0_0_12px_rgba(255,215,0,0.8)] ring-1 ring-yellow-400 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_24px_rgba(255,255,180,0.9)]"
            >
              &gt;
            </button>
          </div>

          <div className="flex h-screen w-screen items-center justify-start px-10">
{props.qno !== 1 && (
  <IDE
    script={{
      content: `
#include <iostream>
using namespace std;

int add(int a, int b) {
    // TODO: fix this function
    return a - b; // wrong on purpose
}

int main() {
    cout << add(2, 3) << endl;
    return 0;
}
`,
    }}
    correctOutput={"5"}
  />
)}
{props.qno == 1 && (
<MCQ
  passage="Read the passage below and answer the questions.Read the passage below and answer the questions.Read the passage below and answer the questions.Read the passage below and answer the questions.Read the passage below and answer the questions.Read the passage below and answer the questions.Read the passage below and answer the questions.Read the passage below and answer the questions.Read the passage below and answer the questions."
  q1={{
    q: "What is the main idea?",
    c1: "Cats are amazing",
    c2: "Dogs are fast",
    c3: "Birds fly",
    a: "Cats are amazing",
  }}
  q2={{
    q: "Why is the author surprised?",
    c1: "The cat can jump high",
    c2: "The cat can code",
    c3: "The cat can talk",
    a: "The cat can code",
  }}
  q3={{
    q: "What does the cat represent?",
    c1: "Curiosity",
    c2: "Happiness",
    c3: "Fear",
    a: "Curiosity",
  }}
/>
)}
          </div>
        </>
      )}
      {loading && (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900/50 to-red-900/50">
          {/* Dragon */}
          <motion.div
            className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 transform bg-contain bg-no-repeat"
            style={{ backgroundImage: "url('/icons/loading.png')" }} // add your dragon sprite
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Fire animation */}
          <motion.div
            className="absolute bottom-32 left-1/2 h-32 w-32 -translate-x-1/2 transform"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <div className="h-full w-full rounded-full bg-orange-500 opacity-80 blur-xl" />
          </motion.div>

          {/* Loading Text */}
          <motion.h1
            className="z-10 text-3xl font-extrabold text-yellow-400 drop-shadow-lg"
            animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Forging Your Quest…
          </motion.h1>
        </div>
      )}
    </div>
  );
};

export default StudyZone;
