"use client";
import { useState } from "react";

const Teacher = () => {
  const [fileData, setFileData] = useState<{ file: File | null }>({
    file: null,
  });

  const [fileNameNumber, setFileNameNumber] = useState(-1);

  const getUploadedFile = (fileName: string) => {
    let num = 0;
    for (let i = 0; i < fileName.length; i++) {
      num += fileName.charCodeAt(i);
    }
    console.log(num);
    setFileNameNumber(num);
  };

  const handleVarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setFileData({
      ...fileData,
      file,
    });

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result;
        console.log(arrayBuffer);
      };

      reader.readAsArrayBuffer(file);

      getUploadedFile(file.name);
    }

    if (file) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      try {
        fetch("https://127.0.0.1:8000/pdf", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <div>
        {fileNameNumber >= 0 && (
          <div>File Uploaded! Game Code is: {fileNameNumber}</div>
        )}
      </div>
      <form className="flex w-1/4 items-center justify-center gap-4 border-2">
        <input
          type="file"
          id="fileUpload"
          name="file"
          accept=".pdf"
          onChange={handleVarChange}
        />
      </form>
    </div>
  );
};

export default Teacher;
