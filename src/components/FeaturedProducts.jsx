import React, { useEffect, useState } from "react";
import { ArrowRight, Eye } from "lucide-react";
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

  if (loading) return <div className="text-center py-16">Loading featured products...</div>;
  if (featured.length === 0) return <div className="text-center py-16">No featured products found.</div>;

  return (
    <section className="w-full" id="featured-products">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
        <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase font-bold mb-4 block">
          The Essential List
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-tight">
          Featured <span className="italic font-light">Products</span>
        </h2>
        <div className="w-10 h-px bg-stone-300 mt-8" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-10 gap-y-20">
        {featured.map((product, index) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group cursor-pointer"
            onClick={() => openQuickView(product)}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-t-full transition-all duration-700 group-hover:shadow-lg">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale-[15%] group-hover:grayscale-0"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4 md:p-6">
                <div className="bg-white/95 backdrop-blur-sm text-stone-900 py-3.5 px-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Eye className="w-4 h-4" />
                  View Collection
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-8 text-center">
              <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-2 font-semibold">
                {product.category}
              </p>
              <h3 className="text-[11px] md:text-[14px] font-medium text-stone-800 tracking-widest uppercase mb-1.5 leading-snug group-hover:text-stone-500 transition-colors">
                {product.title}
              </h3>
              <p className="text-xs md:text-sm font-light text-stone-500 font-serif italic">
                R{product.price.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 flex justify-center">
        <button className="px-14 py-5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all duration-500 flex items-center gap-3 group">
          Explore All Products
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
