import React from "react";
import { Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const newItems = [
  {
    id: 1,
    name: "Architectural Cape",
    price: "$890",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    tag: "Limited Edition"
  },
  {
    id: 2,
    name: "Double-Breasted Vest",
    price: "$520",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tag: "New Silhouette"
  },
  {
    id: 3,
    name: "Pebbled Leather Clutch",
    price: "$410",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    tag: "Handcrafted"
  },
  {
    id: 4,
    name: "Merino Mock Neck",
    price: "$340",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    tag: "Essential"
  },
];

const NewArrivals = () => {
  return (
    <div className="w-full">
      {/* Header - Minimalist & Centered */}
      <div className="text-center mb-16 md:mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.6em] text-stone-400 uppercase font-medium mb-4 block"
        >
          Fresh Perspective
        </motion.span>
        <h3 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-tight">
          New <span className="italic font-light">Arrivals</span>
        </h3>
        <div className="w-12 h-px bg-stone-300 mx-auto mt-8" />
      </div>

      {/* Grid Layout - 2 columns on mobile, 4 (with wrap) on large screens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-20">
        {newItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            {/* Image Container with the Brand's Arched Aesthetic */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-stone-100 shadow-sm transition-all duration-700 group-hover:shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[15%] group-hover:grayscale-0"
              />

              {/* Centered Hover Quick Add - Very Boutique feel */}
              <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4">
                <button className="bg-white/95 backdrop-blur-sm py-3 px-6 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 hover:bg-stone-900 hover:text-white transition-all duration-500 shadow-xl transform scale-95 group-hover:scale-100">
                  <Plus className="w-3.5 h-3.5" /> Quick Add
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 text-center px-2">
              <h4 className="text-[11px] md:text-[13px] font-medium uppercase tracking-[0.15em] text-stone-900 mb-1.5 leading-tight group-hover:text-stone-500 transition-colors">
                {item.name}
              </h4>
              <p className="text-[9px] md:text-[10px] italic font-serif text-stone-400 mb-2 tracking-wide">
                {item.tag}
              </p>
              <span className="text-xs md:text-sm font-light text-stone-800 tracking-wider">
                {item.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 md:mt-28 flex justify-center">
        <button className="px-14 py-5 border border-stone-200 text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-500 flex items-center gap-3 group">
          Explore All Arrivals
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;