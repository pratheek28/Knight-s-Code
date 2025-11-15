"use client";
import IDE from "@/components/ide";
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
    📜 Chap {props.chapno}
  </span>
  <span className="text-yellow-500 font-extrabold">/</span>
  <span className="bg-yellow-800 px-2 py-1 rounded shadow-md border-2 border-yellow-600">
    🏰 Quest {props.qno}
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
            <IDE
              script={{
                content:
                  "#include <iostream>\n" +
                  "using namespace std;\n\n" +
                  "int add(int a, int b) {\n" +
                  "    // TODO: fix this function\n" +
                  "    return a - b; // wrong on purpose\n" +
                  "}\n\n" +
                  "int main() {\n" +
                  "    cout << add(2, 3) << endl;\n" +
                  "    return 0;\n" +
                  "}\n",
              }}
              correctOutput={"5"}
            />
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
