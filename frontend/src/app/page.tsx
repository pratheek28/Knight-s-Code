"use client";
import Image from "next/image";
import Button from "@/components/button";

import { useRouter } from "next/navigation";
import React from "react";
import StudyZone from "./studyzone";

const Page: React.FC = () => {
  const router = useRouter();

  const handleTeacher = (): void => {
    router.push("/teacher");
  };

  const handleStudent = () => {
    router.push("/student");
  };



  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-6">
<StudyZone chapno={1} qno={1} background="/icons/testbg1.png" />
    </div>
  );
};

export default Page;
