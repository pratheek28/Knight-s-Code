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
import Image from "next/image"; 

const StudentMap = () => {
  // --- EXISTING LOGIC (UNCHANGED) ---
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
    router.push("/scriptsanctum");
  };

  const handleFakeClick = () => {
    return;
  };
  // --- END OF EXISTING LOGIC ---

  return (
    // 1. Root Container
    <div className="min-h-screen w-screen flex items-center justify-center relative bg-gray-900">
      
      {/* 2. BACKGROUND IMAGE (z-0) */}
      <Image
        src="/background/newest_map.png" 
        alt="Mystical Map Background"
        fill
        className="absolute top-0 left-0 z-0 object-cover" 
        priority
      />

      {/* 3. Antique Frame Wrapper (16:9 Aspect Ratio Look) */}
      <div 
        className="relative w-full aspect-video max-h-[90vh] max-w-[90vw] 
                   border-4 border-[#4b350f] lg:border-8 
                   z-10 "
      >
        
        {/* Title Header (z-20: Sits above frame/background) */}
        <header className="absolute top-4 left-0 right-0 p-4 text-center z-20 bg-gray-900/40 backdrop-blur-sm shadow-xl mx-auto w-[calc(100%-2rem)] max-w-lg rounded-lg">
            {/* ADDED TEXT BACK TO THE HEADER */}
            <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-[0_0_5px_rgba(255,200,0,0.8)] font-['Pirata_One'] uppercase tracking-widest">
                The Scholar's Journey 🗺️

            </h1>
            {/* Added current chapter progress info back as well */}
            <h2 className="mt-0 text-base text-white font-large">
                Who hath slain the king?
            </h2>
        </header>

        {/* 4. Main Grid Container for Chapter Nodes (Inner Content, z-20) */}
        <div className="absolute inset-0 flex h-full w-full flex-wrap pt-32 pb-4 z-20"> 
          
          {/* 1 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-1/2 items-end justify-start border-0 p-4">
              {chapter >= 1 ? (
                <ChapterNode src={Chapter1} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-end justify-start rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          {/* 2 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-1/2 items-start justify-center border-0 p-4">
              {chapter >= 3 ? (
                <ChapterNode src={Chapter3} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-start justify-center rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
            <div className="flex w-1/2 items-end justify-center border-0 p-4">
              {chapter >= 4 ? (
                <ChapterNode src={Chapter4} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-end justify-center rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          {/* 3 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-1/2 items-end justify-start border-0 p-4">
              {chapter >= 9 ? (
                <ChapterNode src={Chapter9} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-end justify-start rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
            <div className="flex w-1/2 items-start justify-end border-0 p-4">
              {chapter >= 10 ? (
                <ChapterNode src={Chapter10} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-start justify-end rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          {/* 4 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-full items-start justify-end border-0 p-4">
              {chapter >= 2 ? (
                <ChapterNode src={Chapter2} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-start justify-end rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          {/* 5 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-full items-end justify-center border-0 p-4">
              {chapter >= 5 ? (
                <ChapterNode src={Chapter5} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-end justify-center rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          {/* 6 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-full items-center justify-end border-0 p-4">
              {chapter >= 8 ? (
                <ChapterNode src={Chapter8} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-center justify-end rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          <div className="h-1/3 w-1/3 border-0">
             
          </div>

          {/* 8 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-full items-end justify-end border-0 p-4">
              {chapter >= 6 ? (
                <ChapterNode src={Chapter6} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-end justify-end rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          {/* 9 */}
          <div className="flex h-1/3 w-1/3 border-0">
            <div className="flex w-full items-start justify-start border-0 p-4">
              {chapter >= 7 ? (
                <ChapterNode src={Chapter7} onClick={handleClick} />
              ) : (
                <div
                  className="flex h-30 w-30 cursor-not-allowed items-start justify-start rounded-full bg-black/50"
                  onClick={handleFakeClick}
                />
              )}
            </div>
          </div>

          {/* Inventory Button (fixed position relative to the 16:9 frame) */}
          <div className="absolute bottom-4 right-4 z-50">
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
            <p className="text-2xl text-center text-gray-600">Your inventory is empty.</p>
          )}
          </div>
        </InventoryPopup>
      </div>
    </div>
  );
};

export default StudentMap;