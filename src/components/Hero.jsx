import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center bg-stone-200">
      {/* Background Image with subtle zoom effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
          alt="Maison Salastre Editorial"
          className="w-full h-full object-cover object-center"
        />
        {/* Sophisticated Gradient Overlay: Darker at bottom/left for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            {/* Minimalist Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/80 text-[10px] md:text-[12px] uppercase tracking-[0.4em] mb-4"
            >
              Collection 2026
            </motion.p>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-8 tracking-tight"
            >
              Discover <br />
              <span className="italic font-light">Timeless</span> Pieces
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-stone-200 text-sm md:text-lg font-light mb-12 max-w-md leading-relaxed"
            >
              Exquisite tailoring meets modern silhouettes. Explore our latest 
              curation of essential garments designed for the discerning eye.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-10 py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-stone-100 transition-all duration-300 flex items-center justify-center gap-3 group">
                New Arrivals
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-10 py-4 border border-white/30 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-all duration-500">
                Explore For You
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;