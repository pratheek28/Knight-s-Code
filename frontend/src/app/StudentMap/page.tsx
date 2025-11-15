"use client";
import ChapterNode from "@/components/chapterNode";
import Chapter1 from "@/public/icons/Chapter_1.png";
import Chapter2 from "@/public/icons/Chapter_2.png";
import Chapter3 from "@/public/icons/Chapter_3.png";
import Chapter4 from "@/public/icons/Chapter_4.png";
import Chapter5 from "@/public/icons/Chapter_5.png";
import Chapter6 from "@/public/icons/Chapter_6.png";
import Chapter7 from "@/public/icons/Chapter_7.png";
import Chapter8 from "@/public/icons/Chapter_8.png";
import Chapter9 from "@/public/icons/Chapter_9.png";
import Chapter10 from "@/public/icons/Chapter_10.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const StudentMap = () => {
    const [chapter, setChapter] = useState(-1);
    const [questionNum, setQuestion] = useState(-1);
    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            // setChapter(1);
            // setQuestion(1);
            try {
                const response = await fetch("http://127.0.0.1:8000/getStudentInfo");
                if (!response.ok) {
                    throw new Error(`Http Error: status: ${response.status}`)
                }
                const result = await response.json();
                console.log(result);
                setChapter(result.chapter);
                setQuestion(result.question);
            }catch(e) {
                console.log(e);
            };
            
        };
        fetchData();
    }, []);


    const handleClick = () => {
        console.log("chapter: ", chapter);
        console.log("questionNum: ", questionNum);

        const data = {chapter: chapter, questionNum: questionNum, background: `${chapter}.png`};
        
        console.log("The Data that will be sent: " + JSON.stringify(data));

        sessionStorage.setItem("studentData", JSON.stringify(data));

        router.push("/test");
    };

  return (
    <div className="flex h-screen w-screen flex-wrap">
      {/* 1 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-1/2 items-end justify-start border-0">
          <ChapterNode src={Chapter1} onClick={handleClick}/>
        </div>
      </div>

      {/* 2 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-1/2 items-start justify-center border-0">
          <ChapterNode src={Chapter3} onClick={handleClick}/>
        </div>
        <div className="flex w-1/2 items-end justify-center border-0">
          <ChapterNode src={Chapter4} onClick={handleClick}/>
        </div>
      </div>

      {/* 3 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-1/2 items-end justify-start border-0">
          <ChapterNode src={Chapter9} onClick={handleClick} />
        </div>
        <div className="flex w-1/2 items-start justify-end border-0">
          <ChapterNode src={Chapter10} onClick={handleClick}/>
        </div>
      </div>

      {/* 4 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-start justify-end border-0">
          <ChapterNode src={Chapter2} onClick={handleClick}/>
        </div>
      </div>

      {/* 5 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-end justify-center border-0">
          <ChapterNode src={Chapter5} onClick={handleClick}/>
        </div>
      </div>

      {/* 6 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-center justify-end border-0">
          <ChapterNode src={Chapter8} onClick={handleClick}/>
        </div>
      </div>

      <div className="h-1/3 w-1/3 border-0"></div>

      {/* 8 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-end justify-end border-0">
          <ChapterNode src={Chapter6} onClick={handleClick}/>
        </div>
      </div>

      {/* 9 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-start justify-start border-0">
          <ChapterNode src={Chapter7} onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
};
export default StudentMap;
