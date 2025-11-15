"use client";
import React, { useState } from "react";

interface MCQProps {
  passage: string;
  q1: { q: string; c1: string; c2: string; c3: string; a: string };
  q2: { q: string; c1: string; c2: string; c3: string; a: string };
  q3: { q: string; c1: string; c2: string; c3: string; a: string };
}

const MCQ = (props: MCQProps) => {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [result, setResult] = useState<null | string>(null);

  const handleSelect = (question: "q1" | "q2" | "q3", choice: string) => {
    setAnswers({ ...answers, [question]: choice });
  };

  const handleSubmit = () => {
    const correct =
      (answers.q1 === props.q1.a ? 1 : 0) +
      (answers.q2 === props.q2.a ? 1 : 0) +
      (answers.q3 === props.q3.a ? 1 : 0);

    setResult(`You scored ${correct}/3`);
  };

  return (
    <div className="flex items-center justify-start h-screen ">

    <div className="w-full max-w-md mx-auto">
      <div className="bg-yellow-100 rounded-lg border-2 border-yellow-700 shadow h-96 overflow-y-auto p-4 h-[90vh] w-[50vw]">
        {/* Passage */}
        <h2 className="text-lg font-bold mb-2 text-yellow-900 text-center">
          📜 Passage
        </h2>
        <p className="mb-4 text-sm text-yellow-900">{props.passage}</p>

        {/* Questions */}
        {["q1", "q2", "q3"].map((qKey, i) => {
          const qObj = props[qKey as keyof MCQProps] as any;
          return (
            <div key={qKey} className="mb-4">
              <h3 className="text-base font-semibold text-yellow-900 mb-2">
                {i + 1}. {qObj.q}
              </h3>

              <div className="space-y-1">
                {[qObj.c1, qObj.c2, qObj.c3].map((c: string) => (
                  <button
                    key={c}
                    onClick={() => handleSelect(qKey as any, c)}
                    className={`w-full text-left px-3 py-1 text-sm rounded border
                      ${
                        answers[qKey as keyof typeof answers] === c
                          ? "bg-yellow-600 text-white border-yellow-800"
                          : "bg-yellow-200 text-yellow-900 border-yellow-600 hover:bg-yellow-300"
                      }
                    `}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Submit */}
        <div className="text-center mt-3 mb-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-red-800 text-white rounded border-2 border-red-900 hover:scale-105"
          >
            Submit
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mb-4 p-2 bg-yellow-700 text-white text-center rounded text-sm">
            {result}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MCQ;
