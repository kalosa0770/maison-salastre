import React from "react";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";

const ForYou = () => {
  return (
    <div className="w-full">
      {/* Section Label / Divider */}
      <div className="flex items-center gap-6 mb-16 md:mb-24">
        <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase font-bold whitespace-nowrap">
          Personal Selection
        </span>
        <div className="h-px w-full bg-stone-200" />
      </div>

      {/* Main Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Editorial Image Composition */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Primary Arched Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-stone-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
              alt="Selected Look for You"
              className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
            />
            {/* Subtle Inner Frame Overlay */}
            <div className="absolute inset-6 border border-white/10 pointer-events-none" />
          </div>

          {/* Floating Detail Card - Hidden on small mobile, beautiful on tablet+ */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 w-40 md:w-56 aspect-[3/4] p-2 bg-white shadow-2xl z-20"
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=80"
                alt="Fabric Detail"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Narrative / Copy */}
        <div className="space-y-8 md:space-y-12 lg:pl-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-semibold mb-4">
              Maison Spotlight
            </p>
            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] text-stone-900">
              The Signature <br />
              <span className="italic font-light text-stone-500">Wool Wrap</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-stone-600 leading-relaxed text-base md:text-lg font-light max-w-md"
          >
            A silhouette designed to harmonize with the body. Expertly rendered in sustainably sourced Merino wool, this piece represents our commitment to longevity and form.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-light text-stone-900">$1,250</span>
              <span className="text-[9px] tracking-[0.2em] text-stone-400 uppercase font-medium">
                Complimentary Tailoring
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex-1 md:flex-none px-10 py-5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all duration-300 flex items-center justify-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                Acquire Piece
              </button>

              <button className="p-5 border border-stone-200 text-stone-400 hover:text-red-400 hover:border-red-100 hover:bg-red-50/30 transition-all duration-300 group">
                <Heart className="w-4 h-4 stroke-[1.5px] group-hover:fill-current" />
              </button>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 hover:text-stone-900 transition-all group"
            >
              View Material Provenance
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ForYou;