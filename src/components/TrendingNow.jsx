import React, { useEffect, useState } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
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

  if (loading) return <div className="text-center py-16">Loading trending products...</div>;
  if (trending.length === 0) return <div className="text-center py-16">No trending products found.</div>;

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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-10 gap-y-20">
        {trending.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group cursor-pointer"
            onClick={() => openQuickView(product)}
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 rounded-t-full transition-all duration-[0.8s] ease-in-out group-hover:rounded-t-lg shadow-sm">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />

              {/* Trending Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 text-stone-900 font-bold border border-stone-200">
                  Popular
                </span>
              </div>

              {/* View Detail Overlay */}
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
                <button className="bg-white/95 backdrop-blur-sm py-4 px-6 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-xl">
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
                  R{product.price?.toLocaleString()}
                </span>
              </div>
              <h3 className="text-[11px] md:text-[13px] font-medium text-stone-900 tracking-widest uppercase leading-tight group-hover:text-stone-500 transition-colors">
                {product.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
