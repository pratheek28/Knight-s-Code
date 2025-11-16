import React from "react";
import closeScroll from "@/public/icons/closed_scroll.png";
import Image from "next/image";

type InventoryProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};  

const Inventory: React.FC<InventoryProps> = ({ onClick, className }) => {
    return (
        <button onClick={onClick} className={`relative ${className} group
                transition-all duration-300
                hover:drop-shadow-[0_0_15px_rgba(245, 158, 11, 0.7)]
                hover:brightness-125
                transform hover:scale-105`}>
            <Image 
                src={closeScroll} 
                alt="Close Scroll" 
                className="w-full h-full object-contain"
            />
        </button>
    );
};

export default Inventory;
