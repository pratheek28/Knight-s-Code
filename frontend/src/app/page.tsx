"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleTeacher = () => {
    router.push("/teacher");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-48">
      <div></div>
      <div className="flex w-full items-center justify-center">
        <div className="flex w-1/3 items-center justify-center">
          <Button text={"School Master"} onClick={handleTeacher} />
        </div>

        <div className="flex w-1/3 items-center justify-center border-0 text-4xl">
          <h1>Play Now!</h1>
        </div>

        <div className="flex w-1/3 items-center justify-center">
          <Button text={"Scholar"} onClick={handleTeacher} />
        </div>
      </div>
    </div>
  );
};

export default Home;
