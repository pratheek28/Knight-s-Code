import React from "react";
import closeScroll from "@/public/icons/closed_scroll.png";
import Image from "next/image";

type InventoryProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};  

const Inventory: React.FC<InventoryProps> = ({ onClick, className }) => {
    return (
        <button onClick={onClick} className={`relative ${className}`}>
            <Image 
                src={closeScroll} 
                alt="Close Scroll" 
                className="w-full h-full object-contain"
            />
        </button>
    );
};

export default Inventory;
