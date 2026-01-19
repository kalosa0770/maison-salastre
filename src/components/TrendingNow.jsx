import React, { useEffect, useState } from "react";
import { ArrowUpRight, Eye, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { ProductAPI } from "../api/product.api";

const TrendingNow = () => {
  const { openQuickView } = useCart();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await ProductAPI.getTrending();
        setTrending(data || []);
      } catch (err) {
        console.error("Failed to fetch trending products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center">
       <div className="w-6 h-6 border-t border-stone-900 rounded-full animate-spin" />
    </div>
  );
  
  if (trending.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-6" id="trending-now">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-stone-100 pb-12">
        <div className="space-y-4">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] tracking-[0.5em] uppercase text-stone-400 block font-bold"
          >
            The Current Pulse
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight">
            Trending <span className="italic font-light text-stone-500">Now</span>
          </h2>
        </div>

        <motion.button 
          whileHover={{ x: 5 }}
          className="text-[10px] uppercase tracking-[0.4em] text-stone-800 font-bold flex items-center gap-3 transition-all duration-300 group"
        >
          View Popular Series
          <MoveRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 transition-colors" />
        </motion.button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
        {trending.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            className="group cursor-pointer"
            onClick={() => openQuickView(product)}
          >
            {/* Morphing House Container */}
            <div className="relative aspect-[3/4.5] overflow-hidden bg-stone-50 transition-all duration-[1s] ease-in-out rounded-t-[180px] group-hover:rounded-t-[40px] shadow-sm group-hover:shadow-xl">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
              />

              {/* Status Badge */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <span className="bg-white/80 backdrop-blur-sm text-[8px] tracking-[0.3em] uppercase px-4 py-2 text-stone-900 font-bold border border-stone-100 whitespace-nowrap">
                  Most Coveted
                </span>
              </div>

              {/* Sophisticated Action Overlay */}
              <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-end p-10">
                <div className="bg-white text-stone-900 w-full py-4 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                  <Eye className="w-3.5 h-3.5" />
                  Quick View
                </div>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="mt-8 space-y-3 px-2">
              <div className="flex flex-col justify-between">
                <p className="text-[9px] tracking-[0.3em] text-stone-400 uppercase font-bold">
                  {product.category}
                </p>
                <div className="h-px flex-1 mx-4 bg-stone-100" />
              </div>
              
              <div className="flex flex-col text-start gap-4">
                <h3 className="text-[9px] md:text-sm font-medium text-stone-800 tracking-widest uppercase transition-colors group-hover:text-stone-400">
                  {product.title}
                </h3>
                <span className="text-sm font-light text-stone-900">
                  R {product.price?.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingNow;