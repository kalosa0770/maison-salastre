import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroAPI } from "../api/hero.api.js"; // Ensure this is a named export

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await HeroAPI.getActive();
        setHero(data || null); // fallback to null if empty
      } catch (err) {
        console.error("Failed to fetch hero:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!hero) return null;

  // Safe splitting
  const headline = hero.title || "";
  const words = headline.split(" ");
  const firstWord = words.slice(0, 1).join(" ");
  const restWords = words.slice(1).join(" ");

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center bg-stone-200">
      
      {/* Background Image with zoom effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={hero.image || "https://images.unsplash.com/photo-1483985988355-763728e1935b"} // fallback
          alt={hero.title || "Hero Image"}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-8 tracking-tight"
            >
              {firstWord} <br />
              <span className="italic font-light">{restWords}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-stone-200 text-sm md:text-lg font-light mb-12 max-w-md leading-relaxed"
            >
              {hero.description || "Explore our curated collection of essential garments designed for the discerning eye."}
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
              </button>

              <button className="px-10 py-4 border border-white/30 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-all duration-500">
                Explore For You
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
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
