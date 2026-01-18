import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Package } from "lucide-react";
import { useCart } from "./CartContext";

const BoutiqueToast = () => {
  const { showToast, lastAdded, toastConfig } = useCart();

  // Determine appearance based on toast type
  const isError = toastConfig?.type === 'error';
  const isAdminAction = toastConfig?.type === 'admin';

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm"
        >
          <div className={`
            p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 border 
            ${isError ? "bg-rose-950 border-rose-800 text-rose-100" : "bg-stone-900 text-white border-stone-800"}
          `}>
            {/* Dynamic Icon Box */}
            <div className={`${isError ? "bg-rose-500/20" : "bg-white/10"} p-2 rounded-sm`}>
              {isError ? (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              ) : isAdminAction ? (
                <Package className="w-4 h-4 text-stone-100" />
              ) : (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <p className={`text-[9px] tracking-[0.3em] uppercase font-bold ${isError ? "text-rose-400" : "text-stone-400"}`}>
                {toastConfig?.title || "Notification"}
              </p>
              <p className="text-[11px] font-serif italic truncate">
                {toastConfig?.message || lastAdded?.title}
              </p>
            </div>

            {/* Subtle Progress Bar */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-[2px] w-full origin-left ${isError ? "bg-rose-500" : "bg-stone-500"}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoutiqueToast;