"use client";
import { useEffect, useState } from "react";
import StudyZone from "../studyzone";

const Test = () => {
  const [chapter, setChapter] = useState(1);
  const [questionNum, setQuestionNum] = useState(1);
  const [email, setEmail] = useState("");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const studentData = sessionStorage.getItem("studentData");
    if (studentData) {
      const parsed = JSON.parse(studentData);
      setChapter(parsed.chapter);
      setQuestionNum(parsed.questionNum);
      setEmail(parsed.email || "");
    }
    setLoaded(true); // done loading session data
  }, []);

  return (
    <div>
      {loaded && (
        <StudyZone
          chapno={chapter}
          qno={questionNum}
          background={`../background/CH${chapter}_BG.png`}
          email={email}
        />
      )}
    </div>
  );
};

export default Test;
