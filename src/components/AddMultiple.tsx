import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMultiple: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[75%] max-w-2xl h-[85vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-orange-600 font-bold">Add Multiple Employees</h2>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">&times;</button>
        </div>

        <div className="overflow-y-auto pr-2 flex-1">
          <div className="text-center py-8">
            <p className="text-gray-500">Multiple employee upload functionality coming soon...</p>
          </div>
        </div>

        <div className="flex justify-end mt-4 border-t pt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMultiple;