import React from "react";
import { X, Trash2 } from "lucide-react";

const AdminDeleteModal = ({ open, onClose, onConfirm, product }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-stone-900 mb-4">
          Delete Product
        </h2>

        <p className="text-stone-600 mb-6">
          Are you sure you want to delete 
          <span className="font-semibold"> {product?.title}</span>?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm border border-stone-300 rounded hover:bg-stone-100"
          >
            Cancel
          </button>

          <button 
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded flex items-center gap-2 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModal;
