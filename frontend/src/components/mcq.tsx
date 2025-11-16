"use client";
import { constants } from "node:fs/promises";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface MCQProps {
  passage: string;
  q1: { q: string; c1: string; c2: string; c3: string; a: string };
  q2: { q: string; c1: string; c2: string; c3: string; a: string };
  q3: { q: string; c1: string; c2: string; c3: string; a: string };
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  chapter: number;
  question: number;
}

const MCQ = (props: MCQProps) => {
  const router = useRouter();

  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [result, setResult] = useState<null | string>(null);

  const handleSelect = (question: "q1" | "q2" | "q3", choice: string) => {
    setAnswers({ ...answers, [question]: choice });
  };
  const [correct, setcorrect] = useState("");

  const handleSubmit = async () => {
    const correct =
      (answers.q1 === props.q1[props.q1.a as keyof typeof props.q1] ? 1 : 0) +
      (answers.q2 === props.q2[props.q2.a as keyof typeof props.q2] ? 1 : 0) +
      (answers.q3 === props.q3[props.q3.a as keyof typeof props.q3] ? 1 : 0);

    setResult(`You scored ${correct}/3`);
    if (correct === 3) {
      setcorrect("true");
      props.setCount(props.count + 1);

      const question = props.question + 1;
      try {
        const response = await fetch("http://127.0.0.1:8000/updateChapDone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: props.email,
            chapter: props.chapter,
            question: question,
          }),
        });

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
      } finally {
      }
    } else {
      setcorrect("false");
    }
    setTimeout(() => setcorrect(""), 1500);
  };

  return (
    <div className="flex h-screen items-center justify-start">
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
      <div className="mx-auto w-full max-w-md">
        <div className="h-96 h-[90vh] w-[50vw] overflow-y-auto rounded-lg border-2 border-yellow-700 bg-yellow-100 p-4 shadow">
          {/* Passage */}
          <p className="mb-4 text-sm text-yellow-900">{props.passage}</p>

          {/* Questions */}
          {["q1", "q2", "q3"].map((qKey, i) => {
            const qObj = props[qKey as keyof MCQProps] as any;
            return (
              <div key={qKey} className="mb-4">
                <h3 className="mb-2 text-base font-semibold text-yellow-900">
                  {i + 1}. {qObj.q}
                </h3>

                <div className="space-y-1">
                  {[qObj.c1, qObj.c2, qObj.c3].map((c: string) => (
                    <button
                      key={c}
                      onClick={() => handleSelect(qKey as any, c)}
                      className={`w-full rounded border px-3 py-1 text-left text-sm ${
                        answers[qKey as keyof typeof answers] === c
                          ? "border-yellow-800 bg-yellow-600 text-white"
                          : "border-yellow-600 bg-yellow-200 text-yellow-900 hover:bg-yellow-300"
                      } `}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Submit */}
          <div className="mt-3 mb-4 text-center">
            <button
              onClick={handleSubmit}
              className="rounded border-2 border-red-900 bg-red-800 px-4 py-2 text-sm text-white hover:scale-105"
            >
              Submit
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="mb-4 rounded bg-yellow-700 p-2 text-center text-sm text-white">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQ;
