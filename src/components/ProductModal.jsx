import React from "react";
import { X, ShoppingBag, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

const ProductModal = () => {
  const { selectedProduct, closeQuickView, addToCart } = useCart();

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-4 min-h-screen">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="relative w-full h-full md:h-auto md:max-w-5xl bg-white shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row md:max-h-[90vh] rounded-t-[20rem]"
        >
          {/* Close Button - Fixed on mobile for accessibility */}
          <button 
            onClick={closeQuickView} 
            className="fixed md:absolute top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-sm md:bg-transparent hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-stone-900" />
          </button>

          {/* Left Side: Image - Full width on mobile, half on desktop */}
          <div className="w-full md:w-1/2 min-h-[40vh] md:min-h-0 bg-stone-100">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Right Side: Content - Scrollable on mobile, centered on desktop */}
          <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center bg-white">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-bold block">
                {selectedProduct.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xl font-light text-stone-600 italic">
                {selectedProduct.price}
              </p>
            </div>
            
            <div className="w-12 h-px bg-stone-200 my-6 md:my-8" />

            <p className="text-stone-500 leading-relaxed font-light text-sm md:text-base italic">
              {selectedProduct.description || "A masterwork of sustainable luxury, designed for the intentional wardrobe."}
            </p>

            <div className="mt-8 md:mt-12 space-y-4">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="w-full bg-stone-900 text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>

            {/* Extra padding for mobile scroll-to-bottom room */}
            <div className="h-8 md:hidden" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;