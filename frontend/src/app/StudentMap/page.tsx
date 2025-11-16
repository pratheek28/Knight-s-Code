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
import Inventory from "@/components/inventory";
import InventoryPopup from "@/components/InventoryPopup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const StudentMap = () => {
  const [email, setEmail] = useState("");
  const [chapter, setChapter] = useState(-1);
  const [questionNum, setQuestion] = useState(-1);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const router = useRouter();

  // Sample inventory items - replace with your actual inventory data
  const inventoryItems = [
    { id: 1, name: "Scroll of Wisdom" }
  ];

  const clues = [
    { id: 1, description: "A broken golden arrowhead beneath the Duke’s throne." },
    { id: 2, description: "The real vial of Night’s Breath is missing entirely." },
    { id: 3, description: "A will fragment: “…my heir shall receive nothing…” " },
    { id: 4, description: "His practice log skips the exact window when the Duke died." },
    { id: 5, description: "A coded note tucked in his gauntlet:“Change the guard at midnight. No witnesses.”" },
    { id: 6, description: "Wax seal fragment of House Blackthorne stuck to the vault hinge." },
    { id: 7, description: "Archive ledger entry:“Updated Will — Removed by signet bearer.”" },
    { id: 8, description: "The same blue wax from the vault also stains the Prince’s writing desk." },
    { id: 9, description: "A single sheet of accounting: a massive payment to Commander Garran one week before the murder." },
    { id: 10, description: "One noble had every attribute of guilt. Declare your suspect." },
  ]

  const fetchData = async () => {
    const studentEmail = sessionStorage.getItem("studentEmail");
    setEmail(studentEmail ?? "");
    if (!studentEmail) return;

      try {
        console.log("Fetching student info for email:", studentEmail);
        const response = await fetch("http://127.0.0.1:8000/getStudentInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: studentEmail }),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        setChapter(result.chapter);
        setQuestion(result.question);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    console.log("chapter: ", chapter);
    console.log("questionNum: ", questionNum);

    const data = {
      email: email,
      chapter: chapter,
      questionNum: questionNum,
      background: `${chapter}.png`,
    };

    console.log("The Data that will be sent: " + JSON.stringify(data));
    sessionStorage.setItem("studentData", JSON.stringify(data));
    router.push("/test");
  };

  const handleFakeClick = () => {
    return;
  };

  return (
    <div className="relative flex h-screen w-screen flex-wrap">
      {/* 1 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-1/2 items-end justify-start border-0">
          {chapter >= 1 ? (
            <ChapterNode src={Chapter1} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-end justify-start rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
      </div>

      {/* 2 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-1/2 items-start justify-center border-0">
          {chapter >= 3 ? (
            <ChapterNode src={Chapter3} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-start justify-center rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
        <div className="flex w-1/2 items-end justify-center border-0">
          {chapter >= 4 ? (
            <ChapterNode src={Chapter4} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-end justify-center rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
      </div>

      {/* 3 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-1/2 items-end justify-start border-0">
          {chapter >= 9 ? (
            <ChapterNode src={Chapter9} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-end justify-start rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
        <div className="flex w-1/2 items-start justify-end border-0">
          {chapter >= 10 ? (
            <ChapterNode src={Chapter10} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-start justify-end rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
      </div>

      {/* 4 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-start justify-end border-0">
          {chapter >= 2 ? (
            <ChapterNode src={Chapter2} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-start justify-end rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
      </div>

      {/* 5 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-end justify-center border-0">
          {chapter >= 5 ? (
            <ChapterNode src={Chapter5} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-end justify-center rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
      </div>

      {/* 6 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-center justify-end border-0">
          {chapter >= 8 ? (
            <ChapterNode src={Chapter8} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-center justify-end rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
      </div>

      <div className="h-1/3 w-1/3 border-0"></div>

      {/* 8 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-end justify-end border-0">
          {chapter >= 6 ? (
            <ChapterNode src={Chapter6} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-end justify-end rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
      </div>

      {/* 9 */}
      <div className="flex h-1/3 w-1/3 border-0">
        <div className="flex w-full items-start justify-start border-0">
          {chapter >= 7 ? (
            <ChapterNode src={Chapter7} onClick={handleClick} />
          ) : (
            <div
              className="flex h-30 w-30 cursor-not-allowed items-start justify-start rounded-full bg-black"
              onClick={handleFakeClick}
            />
          )}
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <Inventory 
            onClick={() => setIsInventoryOpen(true)} 
            className="w-16 h-16 hover:scale-110 transition-transform cursor-pointer" 
          />
        </div>
      </div>

      {/* Inventory Popup */}
      <InventoryPopup 
        isOpen={isInventoryOpen} 
        onClose={() => setIsInventoryOpen(false)}
      >
        <div className="space-y-4 p-4">
          <p className="text-6xl text-center font-bold mb-4 text-gray-800">Your Inventory</p>
          {inventoryItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {inventoryItems.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-4xl text-center font-semibold mb-8 text-gray-800">{item.name}</p>
                    <ol 
                      className="list-decimal"
                    >
                      {clues.slice(0, chapter - 1).map((clue) => (
                        <li key={clue.id} className="ml-4 font-normal text-md text-gray-600 mt-4">{clue.description}</li>
                      ))}
                    </ol>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Your inventory is empty.</p>
          )}
        </div>
      </InventoryPopup>
    </div>
  );
};

export default StudentMap;