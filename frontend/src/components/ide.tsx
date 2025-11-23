"use client";
import React from "react";
// @ts-expect-error -- livecodes has no types ---
import LiveCodes, { Playground } from "livecodes/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

interface IDEProps {
  script: {
    content: string;
  };
  correctOutput: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  chapter: number;
  question: number;
}

const IDE = (props: IDEProps) => {
  const router = useRouter();

  const options = {
    params: {
      languages: "cpp-wasm",
      console: "full",
      autorun: "false",
    },
    config: {
      mode: "simple",
      layout: "vertical",
      activeEditor: "script",
      autoupdate: false,
      themeColor: "lightblue",
      editor: "monaco",
      tools: {
        enabled: ["console"],
        active: "console",
        status: "open",
      },
      script: {
        language: "cpp-wasm",
        content: props.script.content,
      },
    },
  };

  const [playground, setPlayground] = useState<Playground>();
  const [errors, setErrors] = useState("");

  const [showgenie, setgenie] = useState(false);
  const [hint, sethint] = useState("Consulting the Oracle...");

  const [correct, setcorrect] = useState("");
  function diffStrings(a: string, b: string) {
    const len = Math.max(a.length, b.length);
    const diffs = [];

    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        diffs.push({
          index: i,
          given: a[i] ?? "(none)",
          expected: b[i] ?? "(none)",
        });
      }
    }

    return diffs;
  }

  const onReady = (sdk: Playground) => {
    setPlayground(sdk);

    const consoleWatcher = sdk.watch(
      "console",
      async ({ method, args }: { method: string; args: string[] }) => {
        console.log(`Console ${method}:`, ...args);
        if (args[0].trim() === props.correctOutput.trim()) {
          setcorrect("true");
          props.setCount(props.count + 1);

          let question = props.question + 1;
          let chapter = props.chapter;
          if (question > 3) {
            // all questions in chapter done
            question = 1;
            chapter = chapter + 1;
          }
          try {
            const response = await fetch(
              "https://knight-s-code.onrender.com/updateChapDone",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: props.email,
                  chapter: chapter,
                  question: question,
                }),
              },
            );

            const data = await response.json();

            if (response.ok) {
              console.log(
                `Chapter updated! Current chapter: ${data.chapter}, question: ${data.questionNum}`,
              );
              setTimeout(() => {
                router.push("/StudentMap");
              }, 3000); // wait 1 second
            } else {
              console.log(`Error: ${data.message}`);
            }
          } catch (err) {
            console.error(err);
            console.log("Network or server error");
          }
        } else {
          const diffs = diffStrings(args[0], props.correctOutput);

          console.log("Total differences:", diffs.length);

          if (diffs.length > 0) {
            console.log("First difference:", diffs[0]);
            // setDiff(diffs);
          }
          console.log("❌ Try again!: ", args[0]);
          setErrors(args[0]);
          setcorrect("false");
        }
        // Clear the correct indicator after 1.5 seconds`
        setTimeout(() => setcorrect(""), 1500);
      },
    );

    // Optional cleanup when unmounted
    return () => {
      consoleWatcher.dispose();
    };
  };

  const run = async () => {
    playground.run().then(() => {
      console.log("Run finished");
    });
  };

  const ask = async () => {
    setgenie(true);
    sethint("Consulting the Oracle...");
    const codeData = await playground.getCode();
    const code = codeData.script.content;
    await playground.run();

    // Use errors from state or directly from the console watcher if needed
    const error = errors; // Make sure errors are updated before calling ask
    console.log("Asking Merlin with code:", code, "and error:", error);
    const response = await fetch("https://knight-s-code.onrender.com/merlin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code, error: error }),
    });

    const data = await response.json();
    console.log("Hint:", data.hint);
    sethint(data.hint);
  };

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <div className="relative mt-8 flex flex-col items-center justify-center md:mt-0 md:flex-row">
        <LiveCodes
          {...options}
          sdkReady={onReady}
          script={props.script}
          correctOutput={props.correctOutput}
          style={{
            width: window.innerWidth < 640 ? "90vw" : "50vw",
            height: "95vh",
          }}
        />

        {/* Buttons */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform space-x-3">
          {/* Cast Spell */}
          <button
            onClick={run}
            className="flex cursor-pointer items-center justify-center gap-1 rounded-md border-3 border-yellow-900 bg-gradient-to-br from-yellow-700 to-red-800 px-3 py-1 text-xs font-bold text-white uppercase shadow-[0_0_15px_rgba(255,215,0,0.7)] ring-1 ring-yellow-400 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,180,0.9)]"
          >
            ⚔ Cast Spell ⚔
          </button>

          {/* Merlin AI */}
          <button
            onClick={ask}
            className="flex cursor-pointer items-center justify-center gap-1 rounded-md border-3 border-blue-900 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 px-3 py-1 text-xs font-bold text-white uppercase shadow-[0_0_10px_rgba(100,200,255,0.6)] ring-1 ring-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(150,220,255,0.8)]"
          >
            ✨ Merlin AI ✨
          </button>
        </div>
      </div>

      {showgenie && (
        <div className="static z-50 mt-4 w-full md:absolute md:top-1/2 md:right-30 md:mt-0 md:w-80 md:-translate-y-1/2 md:transform">
          <div
            className={`relative overflow-hidden rounded-xl border-2 border-yellow-400 bg-yellow-100/90 p-4 shadow-xl backdrop-blur-sm ${
              hint === "Consulting the Oracle..." ? "animate-pulse" : ""
            }`}
          >
            <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-yellow-200 shadow-inner"></div>
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-yellow-200 shadow-inner"></div>
            <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-yellow-200 shadow-inner"></div>
            <div className="absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-yellow-200 shadow-inner"></div>

            {/* Title */}
            <h2
              className={`mb-2 text-lg font-extrabold tracking-wider text-yellow-800 ${
                hint === "Consulting the Oracle..." ? "animate-pulse" : ""
              }`}
            >
              📜 Merlin AI
            </h2>

            {/* Content with shimmer if hint matches */}
            <div className="relative mb-4 overflow-hidden text-sm text-yellow-900">
              {hint === "Consulting the Oracle..." ? (
                <span className="loading-text">{hint}</span>
              ) : (
                <span>
                  <ReactMarkdown>{hint}</ReactMarkdown>
                </span>
              )}
            </div>

            {/* Sparkles only if hint matches */}
            {hint === "Consulting the Oracle..." && (
              <div className="animate-bounce-slowest absolute bottom-4 left-10 h-1 w-1 rounded-full bg-white opacity-50"></div>
            )}

            {/* Close button */}
            <button
              onClick={() => setgenie(false)}
              className="rounded bg-yellow-800 px-3 py-1 text-xs font-semibold text-yellow-100 shadow-md transition-colors hover:bg-yellow-700"
            >
              ✖ Close
            </button>
          </div>

          {/* Tailwind keyframes for text shimmer and bouncing sparkles */}
          <style jsx>{`
            .loading-text {
              display: inline-block;
              position: relative;
              color: #b07c00;
            }
            .loading-text::after {
              content: "";
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.6),
                transparent
              );
              animation: shimmer 1.5s infinite;
            }

            @keyframes shimmer {
              0% {
                left: -100%;
              }
              100% {
                left: 100%;
              }
            }

            @keyframes bounce-slowest {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-1px);
              }
            }

            .animate-bounce-slowest {
              animation: bounce-slowest 2.5s infinite ease-in-out;
            }
          `}</style>
        </div>
      )}
      {correct && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className={`text-[6rem] font-extrabold ${
              correct === "true"
                ? "animate-checkmark text-green-500"
                : "animate-checkmark text-red-500"
            }`}
          >
            {correct === "true" ? "✔" : "✖"}
          </span>

          <style jsx>{`
            @keyframes checkmark {
              0% {
                transform: scale(0.3);
                opacity: 0;
              }
              50% {
                transform: scale(1.2);
                opacity: 1;
              }
              100% {
                transform: scale(1);
                opacity: 0;
              }
            }
            .animate-checkmark {
              animation: checkmark 1.2s ease forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default IDE;
