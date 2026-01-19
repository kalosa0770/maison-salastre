import React, { useEffect, useState } from "react";
import { ArrowRight, Eye, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { ProductAPI } from "../api/product.api.js";

const FeaturedProducts = () => {
  const { openQuickView } = useCart();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await ProductAPI.getFeatured();
        setFeatured(data || []);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-t-2 border-stone-900 rounded-full animate-spin" />
    </div>
  );

  if (featured.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-6" id="featured-products">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-5 md:mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] tracking-[0.6em] text-stone-400 uppercase font-bold mb-6 block"
        >
          Selected Works
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tight leading-[1.1]"
        >
          Featured <span className="italic font-light text-stone-500">Curations</span>
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px bg-stone-300 mt-10" 
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-24">
        {featured.map((product, index) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="group relative"
            onClick={() => openQuickView(product)}
          >
            {/* The "Maison" House Card */}
            <div className="relative aspect-[4/6] overflow-hidden rounded-t-[250px] border border-stone-100 bg-stone-50 transition-all duration-700 ease-in-out group-hover:border-stone-200">
              
              {/* Image with subtle zoom and pan */}
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              />

              {/* Sophisticated Hover Overlay */}
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-700">
                <div className="absolute inset-x-0 bottom-10 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/90 backdrop-blur-md text-stone-900 py-4 px-8 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-3 shadow-2xl">
                    Quick View
                    <MoveRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="mt-10 px-4 text-start">
              <span className="text-[9px] tracking-[0.4em] text-stone-400 uppercase mb-3 block font-semibold">
                {product.category}
              </span>
              <h3 className="text-[9px] md:text-xl font-serif text-stone-800 tracking-wide mb-2">
                {product.title}
              </h3>
              <div className="flex gap-3">
                <span className="h-px w-4 bg-stone-200" />
                <p className="text-sm font-light text-stone-500 italic">
                  R {product.price.toLocaleString()}
                </p>
                <span className="h-px w-4 bg-stone-200" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-32 flex flex-col items-center"
      >
        <button className="group flex flex-col items-center gap-4 transition-all duration-300">
          <div className="relative p-6 rounded-full border border-stone-200 group-hover:border-stone-900 group-hover:bg-stone-900 transition-all duration-500">
            <ArrowRight className="w-6 h-6 text-stone-900 group-hover:text-white transition-colors" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-stone-400 group-hover:text-stone-900">
            View All Series
          </span>
        </button>
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;