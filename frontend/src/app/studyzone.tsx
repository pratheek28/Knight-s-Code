"use client";
import IDE from "@/components/ide";
import MCQ from "@/components/mcq";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StudyZoneProps {
  chapno: number;
  qno: number;
  background: string;
  email?: string;
}

const StudyZone = (props: StudyZoneProps) => {
  const [loading, setLoading] = useState(true);

  const [showWarning, setShowWarning] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mcqData, setMcqData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ideData, setIdeData] = useState<any>(null);

  const [check, setcheck] = useState(0);
  const didFetch = useRef(false);

  console.log("StudyZone Props:", props);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    setLoading(true);
    console.log(
      "Fetching question data for chapter:",
      props.chapno,
      "question:",
      props.qno,
    );
    const fetchData = async () => {
      const response = await fetch(
        "https://knight-s-code.onrender.com/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chapter: props.chapno, question: props.qno }),
        },
      );

      const data = await response.json();
      console.log("DATA:", data);
      if (props.qno === 1) {
        // MCQ type
        setMcqData({
          passage: data.passage,
          q1: {
            q: data.q1.q,
            c1: data.q1.c1,
            c2: data.q1.c2,
            c3: data.q1.c3,
            a: data.q1.a,
          },
          q2: {
            q: data.q2.q,
            c1: data.q2.c1,
            c2: data.q2.c2,
            c3: data.q2.c3,
            a: data.q2.a,
          },
          q3: {
            q: data.q3.q,
            c1: data.q3.c1,
            c2: data.q3.c2,
            c3: data.q3.c3,
            a: data.q3.a,
          },
        });
      } else {
        // IDE / Coding type
        setIdeData({
          script: {
            content: data.code, // your generated code
          },
          correctOutput: data.expect, // expected console output
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    //setQno(check);
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
    // if (props.qno != props.qno) {
    // }

    if (props.qno === 3) {
      setShowWarning(
        "⚔ Thou hast reached the end of thy chapter's quest. Proceed to the next chapter, mighty one! ⚔",
      );
      console.log(check);
      setTimeout(() => setShowWarning(""), 3000);
    } else {
      setShowWarning("⚔ Thou shall not pass, brave knight! ⚔");
      setTimeout(() => setShowWarning(""), 3000);
    }
  };

  return (
    <div
      className="relative flex h-screen w-screen justify-center gap-4 overflow-hidden bg-cover bg-center"
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
          <div className="absolute flex items-start justify-center gap-2 pt-1 md:top-4 md:right-4">
            <button
              onClick={handlePrev}
              className="cursor-pointer rounded-md border-2 border-yellow-500 bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900 px-3 py-1 text-lg font-bold text-yellow-300 shadow-[0_0_12px_rgba(255,215,0,0.8)] ring-1 ring-yellow-400 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_24px_rgba(255,255,180,0.9)]"
            >
              &lt;
            </button>
            <div className="text-md flex items-center justify-center space-x-2 font-bold tracking-wider text-yellow-300 md:text-lg">
              <span className="rounded border-2 border-yellow-600 bg-yellow-800 px-2 py-1 shadow-md">
                Chapter {props.chapno}
              </span>
              <span className="font-extrabold text-yellow-500">/</span>
              <span className="rounded border-2 border-yellow-600 bg-yellow-800 px-2 py-1 shadow-md">
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

          <div className="flex h-screen w-screen items-center justify-start overflow-y-scroll px-4 pt-8 md:px-10 md:pt-0">
            {props.qno !== 1 && (
              <IDE
                {...ideData}
                setCount={setcheck}
                count={props.qno}
                email={props.email}
                chapter={props.chapno}
                question={props.qno}
              />
            )}
            {props.qno == 1 && (
              <MCQ
                {...mcqData}
                setCount={setcheck}
                count={props.qno}
                email={props.email}
                chapter={props.chapno}
                question={props.qno}
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
