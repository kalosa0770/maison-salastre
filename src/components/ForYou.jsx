import React, { useEffect, useState } from "react";
import { ArrowRight, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext"; 
import { ProductAPI } from "../api/product.api.js";

const ForYou = () => {
  const { openQuickView } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const data = await ProductAPI.getSpotlight();
        setProduct(data);
      } catch (err) {
        console.error("Spotlight fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpotlight();
  }, []);

  if (loading) return <div className="py-24 text-center opacity-50">Loading Spotlight...</div>;
  if (!product) return null;

  return (
    <div className="w-full" id="for-you">
      <div className="flex items-center gap-6 mb-16 md:mb-24">
        <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase font-bold whitespace-nowrap">
          Personal Selection
        </span>
        <div className="h-px w-full bg-stone-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Image Composition */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative cursor-pointer"
          onClick={() => openQuickView(product)}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[300px] bg-stone-100 shadow-sm group border border-stone-100">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="bg-white/95 backdrop-blur-sm px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-2xl">
                 Explore Detail
               </div>
            </div>
          </div>

          {/* Secondary Detail Image (Texture/Material) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 w-40 md:w-64 aspect-[3/4] p-3 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] z-20"
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={product.images?.[1] || product.images?.[0]} 
                alt="Material Detail"
                className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Narrative Section */}
        <div className="lg:pl-16 space-y-10">
          <div>
            <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase font-bold mb-4 block">
              {product.category}
            </span>
            <h2 className="text-xl md:text-4xl font-serif leading-[1.1] text-stone-900">
              {product.title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="italic font-light text-stone-500">{product.title.split(' ').pop()}</span>
            </h2>
          </div>

          <p className="text-stone-600 leading-relaxed text-lg font-light max-w-md italic">
            "{product.description}"
          </p>

          <div className="flex items-baseline gap-6 border-b border-stone-100 pb-8">
            <span className="text-4xl font-light text-stone-900">R{product.price?.toLocaleString()}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => openQuickView(product)}
              className="flex-1 px-12 py-6 bg-stone-900 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all shadow-xl flex items-center justify-center gap-4 group"
            >
              <Eye className="w-4 h-4" /> 
              View Narrative
            </button>
            <button className="px-8 py-6 border border-stone-200 hover:bg-stone-50 transition-colors group">
              <Heart className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;