import React, { useEffect, useState } from "react";
import { MoveUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext"; 
import { ProductAPI } from "../api/product.api";

const TopSelections = () => {
  const { openQuickView } = useCart();
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Calls the new jumbo 'top-selections' controller
        const jumboData = await ProductAPI.getTopSelections();
        setSelections(jumboData || []);
      } catch (error) {
        console.error("Error fetching top selections:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="py-24 text-center">
      <div className="inline-block w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
    </div>
  );

  // If the admin hasn't highlighted any products yet, we hide the section
  if (selections.length === 0) return null;

  return (
    <section className="w-full px-6 py-24 md:py-32 bg-[#fafafa]" id="top-selections">
      {/* Header */}
      <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-4 block font-bold"
        >
          The Jumbo Edit
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-tight">
          Top <span className="italic font-light text-stone-500">Selections</span>
        </h2>
        <div className="w-12 h-px bg-stone-200 mt-8" />
      </div>

      {/* Grid - Staggered Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-12">
        {selections.map((item, index) => (
          <motion.div 
            key={item._id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            onClick={() => openQuickView(item)}
            // Stagger logic: pushes every second item down on desktop
            className={`group cursor-pointer ${index % 2 !== 0 ? 'lg:mt-20' : ''}`}
          >
            {/* The Arched Container */}
            <div className="relative aspect-[3/4.5] overflow-hidden rounded-t-full bg-white border border-stone-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
              />

              {/* Interaction Overlay */}
              <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <div 
                  className="w-full bg-white/95 backdrop-blur-sm text-stone-900 py-4 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-sm"
                >
                  View Details <MoveUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="mt-10 px-2 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-[8px] md:text-[9px] tracking-[0.4em] text-stone-400 uppercase font-bold">
                  {item.category}
                </p>
                {/* Visual indicator if it's the Spotlight piece */}
                {item.isSpotlight && <span className="w-1 h-1 rounded-full bg-amber-400" />}
              </div>
              <h3 className="text-xs md:text-[13px] font-medium text-stone-800 tracking-[0.15em] uppercase mb-2 leading-snug group-hover:text-stone-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm font-serif italic text-stone-900">
                R{item.price?.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation CTA */}
      <div className="mt-32 flex justify-center">
        <motion.button 
          whileHover={{ y: -2 }}
          className="group flex items-center gap-8 px-2 py-2 border-b border-stone-200 hover:border-stone-900 transition-all duration-500"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-stone-500 group-hover:text-stone-900 transition-colors">
            Explore Full Boutique
          </span>
          <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-2 transition-all" />
        </motion.button>
      </div>
    </section>
  );
};

export default TopSelections;