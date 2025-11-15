import React, { ReactNode } from "react";

type BackgroundBoxProps = {
  image: string; // path to image in public folder
  className?: string;
  children?: ReactNode;
};

export default function BackgroundBox({
  image,
  className,
  children,
}: BackgroundBoxProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
