import React from "react";
type ButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  // Base button styles derived from your Dark Fantasy design requirements:
  const baseClasses = `
    /* Base Size & Text */
    py-3.5 px-8 
    text-lg font-bold uppercase 
    cursor-pointer 
    font-pirataOne /* *** FIXED: Using the correctly defined Google Font utility *** */
    
    /* Shape & Effects */
    transition-all duration-300 ease-in-out 
    border-2 
    transform 
    
    /* Custom oval/scroll shape (approximate with Tailwind's arbitrary value) */
    rounded-[12px] 
    
    /* Global Hover Effects (Lift and general shadow) */
    hover:translate-y-[-2px] 
    hover:shadow-2xl hover:shadow-black/50
  `;

  return (
    <button
      // Merging base classes with the theme classes
      className={`${baseClasses} ${className || ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Button;
