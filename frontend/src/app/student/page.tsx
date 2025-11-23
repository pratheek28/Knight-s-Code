"use client";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const Student = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStudent = async (credentialResponse: any) => {
    console.log("Raw Google response:", credentialResponse);

    if (credentialResponse.credential) {
      const user = jwtDecode<{ email: string }>(credentialResponse.credential);
      console.log("Decoded user:", user);
      const email = user.email;
      console.log("User email:", email);
      sessionStorage.setItem("studentEmail", email);

      try {
        const sendEmailToBackend = async () => {
          const response = await fetch(
            "https://knight-s-code.onrender.com/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email }),
            },
          );
          const data = await response.json();
          console.log("Response from backend:", data);
        };

        await sendEmailToBackend();
        router.push("/StudentMap");
      } catch (error) {
        console.error("Error sending email to backend:", error);
      }
      //FIXXMEEE use me
    } else {
      console.log("No JWT received!");
    }
  };
  // --- END OF UNCHANGED LOGIC ---

  return (
    // 1. Root Container: Sets up full screen, relative positioning
    <div
      className="relative flex h-screen w-screen items-center justify-center bg-gray-900" // Added relative and bg-gray-900
    >
      {/* 2. BACKGROUND IMAGE using Next.js Image (fills the entire viewport) */}
      <Image
        src="/background/map_screen_BG.png" // Correct source
        alt="Mystical Map Background"
        fill // Makes the image fill its parent (the root div)
        className="absolute top-0 left-0 z-0 object-cover" // Ensures it covers without distortion
        priority
      />

      {/* 3. Antique Frame Wrapper (16:9 Aspect Ratio Look) 
          This frame now floats above the background image.
      */}
      <div
        className="relative z-10 m-4 h-4/5 w-full overflow-hidden border-16 border-[#4b350f] bg-gray-900/50 shadow-2xl shadow-black/80 drop-shadow-[0_0_10px_rgba(200,150,50,0.5)] backdrop-blur-sm md:aspect-video md:max-h-[90vh] md:max-w-[90vw] lg:border-32" // Frame styling
      >
        {/* 4. Login Card Container (Centered within the frame) */}
        <div className="absolute inset-x-0 top-0 flex h-full w-full flex-col items-center justify-center p-4 md:inset-0">
          <div className="flex max-w-sm transform flex-col items-center gap-8 rounded-2xl border border-gray-300 bg-white/80 p-10 shadow-2xl backdrop-blur-md transition duration-300">
            {/* Title (Visual) */}
            <h1 className="text-center font-['Pirata_One'] text-4xl text-gray-800 uppercase drop-shadow-md">
              Enter the Citadel
            </h1>

            {/* Subtitle/Instruction (Visual) */}
            <p className="mb-4 text-center text-lg text-gray-600">
              Login with your Scholar's Account to continue.
            </p>

            {/* 5. The Google Login Component (LOGIC UNCHANGED) */}
            <GoogleLogin
              onSuccess={handleStudent}
              onError={() => console.log("Login failed")}
              theme="filled_blue"
              text="signin_with"
              shape="rectangular"
            />

            {/* Footer Note (Visual) */}
            <div className="mt-4 text-sm text-gray-500">
              <p>Protected by the Dragon's Seal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
