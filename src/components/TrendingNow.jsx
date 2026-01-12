import React from "react";
import { ShoppingBag, ArrowUpRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext"; 

const trendingProducts = [
  {
    id: "t1",
    name: "Asymmetric Wrap Dress",
    category: "Dresses",
    price: "$280",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    description: "A masterclass in effortless draping, this asymmetric piece creates a sculptural silhouette for the modern builder."
  },
  {
    id: "t2",
    name: "Leather Moto Jacket",
    category: "Outerwear",
    price: "$450",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "Hand-finished grain leather with polished hardware. A consequential layer designed to age with distinction."
  },
  {
    id: "t3",
    name: "Pleated Midi Skirt",
    category: "Skirts",
    price: "$150",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    description: "Fluid movement captured in precise pleats. A versatile foundation for an intentional wardrobe."
  },
  {
    id: "t4",
    name: "Chunky Knit Sweater",
    category: "Knitwear",
    price: "$200",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-gauge sustainable wool knit for thermal protection and architectural volume."
  },
];

const TrendingNow = () => {
  const { openQuickView } = useCart(); 

  return (
    <div className="w-full" id="trending-now">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 block font-bold">
            The Current Pulse
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-tight">
            Trending <span className="italic">Now</span>
          </h2>
        </div>

        <button className="text-[10px] uppercase tracking-[0.3em] text-stone-600 hover:text-black font-bold flex items-center gap-2 transition-all duration-300 border-b border-transparent hover:border-black pb-1 group">
          View Popular Products
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* GRID — 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
        {trendingProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group cursor-pointer"
            onClick={() => openQuickView(product)}
          >
            {/* Image Container with Dynamic Arch-to-Rectangle Hover */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 rounded-t-full transition-all duration-[0.8s] ease-in-out group-hover:rounded-t-lg shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />

              {/* Minimal "Trending" Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 text-stone-900 font-bold border border-stone-200">
                  Popular
                </span>
              </div>

              {/* View Detail Overlay */}
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
                <button 
                  className="bg-white/95 backdrop-blur-sm py-4 px-6 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-xl"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Detail
                </button>
              </div>
            </div>

            {/* Product Metadata */}
            <div className="mt-6">
              <div className="flex justify-between items-start mb-1.5">
                <p className="text-[8px] md:text-[9px] tracking-[0.2em] text-stone-400 uppercase font-bold">
                  {product.category}
                </p>
                <span className="text-[11px] md:text-sm font-light text-stone-800 font-serif italic">
                  {product.price}
                </span>
              </div>
              <h3 className="text-[11px] md:text-[13px] font-medium text-stone-900 tracking-widest uppercase leading-tight group-hover:text-stone-500 transition-colors">
                {product.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;