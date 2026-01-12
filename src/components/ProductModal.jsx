import React from "react";
import { X, ShoppingBag, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

const ProductModal = () => {
  const { selectedProduct, closeQuickView, addToCart } = useCart();

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <button onClick={closeQuickView} className="absolute top-6 right-6 z-10 p-2 hover:bg-stone-100 rounded-full">
            <X className="w-5 h-5" />
          </button>

          <div className="w-full md:w-1/2 bg-stone-100">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-bold">{selectedProduct.category}</span>
            <h2 className="text-4xl font-serif text-stone-900 mt-2">{selectedProduct.name}</h2>
            <p className="text-xl font-light text-stone-600 mt-4">{selectedProduct.price}</p>
            
            <p className="text-stone-500 leading-relaxed font-light mt-6 italic">
              {selectedProduct.description || "A masterwork of sustainable luxury."}
            </p>

            <div className="mt-10 space-y-4">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="w-full bg-stone-900 text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;