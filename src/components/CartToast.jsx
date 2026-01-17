import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "./CartContext";

const CartToast = () => {
  const { showToast, lastAdded } = useCart();

  return (
    <AnimatePresence>
      {showToast && lastAdded && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
        >
          <div className="bg-stone-900 text-white p-4 shadow-2xl flex items-center gap-4 border border-stone-800">
            <div className="bg-white/10 p-2">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold">Added to Collection</p>
              <p className="text-[11px] text-stone-400 font-serif italic truncate">
                {lastAdded.title}
              </p>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;