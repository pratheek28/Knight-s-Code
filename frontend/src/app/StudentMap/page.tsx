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
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const StudentMap = () => {
  const [email, setEmail] = useState("");
  const [chapter, setChapter] = useState(-1);
  const [questionNum, setQuestion] = useState(-1);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const inventoryItems = [{ id: 1, name: "Scroll of Wisdom" }];

  const clues = [
    {
      id: 1,
      description: "A broken golden arrowhead beneath the Duke's throne.",
    },
    {
      id: 2,
      description: "The real vial of Night's Breath is missing entirely.",
    },
    {
      id: 3,
      description: "A will fragment: “…my heir shall receive nothing…” ",
    },
    {
      id: 4,
      description:
        "His practice log skips the exact window when the Duke died.",
    },
    {
      id: 5,
      description:
        "A coded note tucked in his gauntlet:“Change the guard at midnight. No witnesses.”",
    },
    {
      id: 6,
      description:
        "Wax seal fragment of House Blackthorne stuck to the vault hinge.",
    },
    {
      id: 7,
      description:
        "Archive ledger entry:“Updated Will — Removed by signet bearer.”",
    },
    {
      id: 8,
      description:
        "The same blue wax from the vault also stains the Prince's writing desk.",
    },
    {
      id: 9,
      description:
        "A single sheet of accounting: a massive payment to Commander Garran one week before the murder.",
    },
    {
      id: 10,
      description:
        "One noble had every attribute of guilt. Declare your suspect.",
    },
  ];

  const fetchData = async () => {
    const studentEmail = sessionStorage.getItem("studentEmail");
    setEmail(studentEmail ?? "");
    if (!studentEmail) return;

    try {
      console.log("Fetching student info for email:", studentEmail);
      const response = await fetch(
        "https://knight-s-code.onrender.com/getStudentInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: studentEmail }),
        },
      );

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
    const el = scrollRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTo({
        left: el.scrollWidth / 2 - el.clientWidth / 2,
        behavior: "smooth",
      });
    });
  }, []);

  const handleClick = (chap: number) => {
    let data;
    if (chap == chapter) {
      data = {
        email: email,
        chapter: chapter,
        questionNum: questionNum,
        background: `${chapter}.png`,
      };
    } else {
      data = {
        email: email,
        chapter: chap,
        questionNum: 1,
        background: `${chap}.png`,
      };
    }

    console.log("The Data that will be sent: " + JSON.stringify(data));
    sessionStorage.setItem("studentData", JSON.stringify(data));
    router.push("/scriptsanctum");
  };

  const handleFakeClick = () => {
    return;
  };

  return (
    // 1. Root Container
    <div className="relative flex h-screen w-screen items-center justify-center bg-gray-900">
      {/* 2. BACKGROUND IMAGE (z-0) */}
      <Image
        src="/background/newest_map.png"
        alt="Mystical Map Background"
        fill
        className="absolute top-0 left-0 z-0 object-cover"
        priority
      />

      <div
        ref={scrollRef}
        className="relative z-10 h-11/12 w-full flex-wrap justify-center overflow-x-auto md:flex"
      >
        {/* 3. Antique Frame Wrapper (16:9 Aspect Ratio Look) */}
        <div className="relative z-10 h-full w-[1200px] overflow-x-auto border-4 border-[#4b350f] md:aspect-video md:w-11/12 lg:border-8">
          {/* NEW PATHWAY IMAGE (z-35) - Placed below the chapter nodes (z-40) */}
          <Image
            src="/background/pathway-removebg-preview.png"
            alt="Map Pathway"
            fill
            className="z- absolute inset-0 object-cover"
            priority
          />

          {/* Title Header (z-20: Sits above frame/background) */}
          <header className="absolute top-4 right-0 left-0 z-20 mx-auto w-[calc(100%-2rem)] max-w-lg rounded-lg bg-gray-900/40 p-4 text-center shadow-xl backdrop-blur-sm">
            {/* ADDED TEXT BACK TO THE HEADER */}
            <h1 className="font-['Pirata_One'] text-2xl font-extrabold tracking-widest text-yellow-300 uppercase drop-shadow-[0_0_5px_rgba(255,200,0,0.8)] md:text-4xl">
              The Scholar's Journey 🗺️
            </h1>
            {/* Added current chapter progress info back as well */}
            <h2 className="font-large mt-0 text-base text-white">
              Who hath slain the king?
            </h2>
          </header>

          {/* 4. Main Grid Container for Chapter Nodes (Inner Content, z-20) */}
          <div className="absolute inset-0 z-20 flex h-full w-full flex-wrap pt-32 pb-4">
            {/* 1 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-1/2 items-end justify-start border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter1}
                    onClick={
                      chapter >= 1 ? () => handleClick(1) : handleFakeClick
                    }
                  />

                  {chapter < 1 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-1/2 items-start justify-center border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter3}
                    onClick={
                      chapter >= 3 ? () => handleClick(3) : handleFakeClick
                    }
                  />

                  {chapter < 3 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-1/2 items-end justify-center border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter4}
                    onClick={
                      chapter >= 4 ? () => handleClick(4) : handleFakeClick
                    }
                  />

                  {chapter < 4 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-1/2 items-end justify-start border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter9}
                    onClick={
                      chapter >= 9 ? () => handleClick(9) : handleFakeClick
                    }
                  />

                  {chapter < 9 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-1/2 items-start justify-end border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter10}
                    onClick={
                      chapter >= 10 ? () => handleClick(10) : handleFakeClick
                    }
                  />

                  {chapter < 10 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-full items-start justify-end border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter2}
                    onClick={
                      chapter >= 2 ? () => handleClick(2) : handleFakeClick
                    }
                  />

                  {chapter < 2 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 5 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-full items-end justify-center border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter5}
                    onClick={
                      chapter >= 5 ? () => handleClick(5) : handleFakeClick
                    }
                  />

                  {chapter < 5 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-full items-center justify-end border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter8}
                    onClick={
                      chapter >= 8 ? () => handleClick(8) : handleFakeClick
                    }
                  />

                  {chapter < 8 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-1/3 w-1/3 border-0"></div>

            {/* 8 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-full items-end justify-end border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter6}
                    onClick={
                      chapter >= 6 ? () => handleClick(6) : handleFakeClick
                    }
                  />

                  {chapter < 6 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 9 */}
            <div className="flex h-1/3 w-1/3 border-0">
              <div className="flex w-full items-start justify-start border-0 p-4">
                <div className="relative">
                  <ChapterNode
                    src={Chapter7}
                    onClick={
                      chapter >= 7 ? () => handleClick(7) : handleFakeClick
                    }
                  />

                  {chapter < 7 && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="flex h-30 w-30 transform cursor-not-allowed items-center justify-center rounded-full bg-black/70 shadow-lg transition-opacity duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 10V7a5 5 0 0110 0v3"
                          />
                          <rect
                            x="5"
                            y="10"
                            width="14"
                            height="11"
                            rx="2"
                            ry="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="15" r="2" />
                          <path
                            d="M12 17v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Inventory Button (fixed position relative to the 16:9 frame) */}
            <div className="absolute right-4 bottom-4 z-50">
              <Inventory
                onClick={() => setIsInventoryOpen(true)}
                className="h-16 w-16 cursor-pointer transition-transform hover:scale-110"
              />
            </div>
          </div>

          {/* Inventory Popup */}
          <InventoryPopup
            isOpen={isInventoryOpen}
            onClose={() => setIsInventoryOpen(false)}
          >
            <div className="space-y-4 p-4">
              <p className="mb-4 text-center text-6xl font-bold text-gray-800">
                Your Inventory
              </p>
              {inventoryItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {inventoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <p className="mb-8 text-center text-4xl font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <ol className="list-decimal">
                        {clues.slice(0, chapter - 1).map((clue) => (
                          <li
                            key={clue.id}
                            className="text-md mt-4 ml-4 font-normal text-gray-600"
                          >
                            {clue.description}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-2xl text-gray-600">
                  Your inventory is empty.
                </p>
              )}
            </div>
          </InventoryPopup>
        </div>
      </div>
    </div>
  );
};

export default StudentMap;
