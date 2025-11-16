import React from "react";

type InventoryPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const InventoryPopup: React.FC<InventoryPopupProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4">
      <div className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Inventory</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {children || <p>Your inventory is empty.</p>}
        </div>
      </div>
    </div>
  );
};

export default InventoryPopup;

// components/InventoryPopup.tsx
// import React from 'react';

// type InventoryPopupProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   children?: React.ReactNode;
// };

// const InventoryPopup: React.FC<InventoryPopupProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4"
//       onClick={onClose} // Close when clicking the overlay
//     >
//       <div
//         className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[80vh] overflow-y-auto"
//         onClick={e => e.stopPropagation()} // Prevent click from closing when clicking inside
//       >
//         <div className="p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Inventory</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 text-2xl"
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>
//           <div className="space-y-3">
//             {children || <p className="text-gray-500">Your inventory is empty.</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryPopup;
