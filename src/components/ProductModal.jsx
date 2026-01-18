import React, { useState, useEffect } from "react";
import { X, ShoppingBag, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

const ProductModal = () => {
  const { selectedProduct, closeQuickView, addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset index when product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const images = selectedProduct.images || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 min-h-screen">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="absolute inset-0 bg-stone-900/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full h-full md:h-auto md:max-w-6xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row md:rounded-2xl"
        >
          {/* Close Button - Desktop */}
          <button 
            onClick={closeQuickView} 
            className="absolute top-6 right-6 z-50 p-2 hover:rotate-90 transition-transform duration-300 hidden md:block"
          >
            <X className="w-6 h-6 text-stone-900" />
          </button>

          {/* LEFT: Enhanced Image Gallery */}
          <div className="w-full md:w-[60%] bg-stone-50 flex flex-row h-[60vh] md:h-[80vh]">
            
            {/* 1. Vertical Thumbnail Strip (Desktop Only) */}
            {images.length > 1 && (
              <div className="hidden md:flex flex-col w-24 border-r border-stone-100 p-3 gap-3 overflow-y-auto no-scrollbar bg-white">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex-shrink-0 aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                      activeIndex === index ? "border-stone-900 opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* 2. Main Image Display */}
            <div className="relative flex-1 bg-stone-100 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={images[activeIndex]}
                  alt={selectedProduct.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Mobile Swipe Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
                {images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all ${i === activeIndex ? "w-6 bg-stone-900" : "w-2 bg-stone-300"}`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="w-full md:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col bg-white overflow-y-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-bold">
                  {selectedProduct.category}
                </span>
                <button onClick={closeQuickView} className="md:hidden">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
                {selectedProduct.title}
              </h2>

              <p className="text-2xl font-light text-stone-800">
                R{selectedProduct.price?.toLocaleString()}
              </p>
            </div>

            <div className="w-full h-px bg-stone-100 my-8" />

            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-3">Description</h3>
                <p className="text-stone-600 leading-relaxed font-light italic">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Added Sizes and Colors display if they exist */}
              {selectedProduct.sizes?.length > 0 && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-3">Available Sizes</h3>
                  <div className="flex gap-2">
                    {selectedProduct.sizes.map(s => (
                      <span key={s} className="px-3 py-1 border border-stone-200 text-xs text-stone-600 uppercase">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="w-full bg-stone-900 text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>
              <p className="text-center text-[9px] text-stone-400 mt-4 uppercase tracking-tighter">
                Free shipping on orders over R1500
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;