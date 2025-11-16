import React from "react";
import closeScroll from "@/public/icons/closed_scroll.png";
import Image from "next/image";

type InventoryProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Inventory: React.FC<InventoryProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`relative ${className} group hover:drop-shadow-[0_0_15px_rgba(245, 158, 11, 0.7)] transform transition-all duration-300 hover:scale-105 hover:brightness-125`}
    >
      <Image
        src={closeScroll}
        alt="Close Scroll"
        className="h-full w-full object-contain"
      />
    </button>
  );
};

export default Inventory;
