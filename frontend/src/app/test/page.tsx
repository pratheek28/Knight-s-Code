"use client";
import { useEffect } from "react";

const Test = () => {
    useEffect(() => {
        const studentData = sessionStorage.getItem("studentData");
        console.log(studentData);
    })
    return (
        <div>

        </div>
    );
};
export default Test;