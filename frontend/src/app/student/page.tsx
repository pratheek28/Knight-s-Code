"use client";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Student = () => {
  const handleStudent = (credentialResponse: any) => {
    console.log("Raw Google response:", credentialResponse);

    if (credentialResponse.credential) {
      const user = jwtDecode(credentialResponse.credential);
      console.log("Decoded user:", user);
      const email=user.email;
      console.log("User email:", email);
      //FIXXMEEE use me
    } else {
      console.log("No JWT received!");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleStudent}
      onError={() => console.log("Login failed")}
      theme="filled_blue"
      text="signin_with"
      shape="rectangular"
    />
  );
};

export default Student;
