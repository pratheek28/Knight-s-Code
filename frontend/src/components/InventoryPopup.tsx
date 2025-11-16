import React from 'react';

type InventoryPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const InventoryPopup: React.FC<InventoryPopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
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
