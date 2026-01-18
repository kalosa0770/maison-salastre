import React from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";

const AdminDeleteModal = ({ open, onClose, onConfirm, product }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-md flex items-center justify-center z-[300] p-4">
      <div className="bg-white w-full max-w-md overflow-hidden rounded-sm shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200">
        
        {/* Decorative Alert Bar */}
        <div className="h-1 w-full bg-red-500" />

        <div className="p-8">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-stone-300 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Icon */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-light text-stone-900 tracking-tight">
              Deletion of Product
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">
              Permanent Delete Product
            </p>
          </div>

          {/* Content */}
          <div className="bg-stone-50 p-4 border border-stone-100 rounded-sm mb-8 text-center">
            <p className="text-sm text-stone-600 leading-relaxed">
              Are you sure you wish to permantly delete 
              <span className="block font-medium text-stone-900 italic mt-1 text-base">
                "{product?.title}"
              </span>
              from the active collection?
            </p>
            <p className="text-[11px] text-red-500/70 uppercase tracking-tighter mt-4 font-medium">
              Warning: This action is irreversible.
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={onConfirm}
              className="w-full bg-red-600 text-white py-3 text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-red-100"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Confirm Deletion
            </button>
            
            <button 
              onClick={onClose}
              className="w-full py-3 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all font-medium"
            >
              Return to Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModal;