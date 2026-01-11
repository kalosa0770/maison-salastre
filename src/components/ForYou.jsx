import React from "react";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";

const ForYou = () => {
  return (
    <section className="py-10 lg:py-22">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase font-pt-sans font-bold">For You</span>
          <div className="h-[1px] flex-1 bg-stone-200"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Editorial Image */}
          <div className="relative group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[20rem]">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
                alt="Selected Look for You"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Subtle architectural frame */}
              <div className="absolute inset-4 border border-white/20 pointer-events-none"></div>
            </div>
            
            {/* Detail Floating Image (Modern UI Trend) */}
            <div className="absolute -bottom-8 -right-8 hidden md:block w-48 h-64 border-[12px] border-stone-50 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=400&q=80"
                alt="Fabric Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Product Narrative */}
          <div className="space-y-8 lg:pl-10">
            <div>
              <h3 className="text-[11px] tracking-[0.3em] text-stone-500 uppercase font-bold mb-4 font-pt-sans">Maison Spotlight</h3>
              <h2 className="text-5xl md:text-6xl tracking-wide font-dancing leading-none text-stone-900">
                The Signature <br />
                Wool Wrap
              </h2>
            </div>

            <p className="text-stone-600 leading-relaxed text-lg font-light max-w-md italic">
              "Crafted for those who value fashion. A silhouette designed to move with the body, rendered in sustainably sourced Merino wool."
            </p>

            <div className="pt-6 flex flex-col gap-6">
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-serif text-stone-900">$1,250</span>
                <span className="text-xs tracking-widest text-stone-400 uppercase">Includes Bespoke Fitting</span>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex-1 lg:flex-none px-12 py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-3">
                  <ShoppingBag className="w-4 h-4" />
                  Acquire Piece
                </button>
                <button className="p-5 border border-stone-200 hover:bg-white transition-colors group">
                  <Heart className="w-4 h-4 text-stone-400 group-hover:text-red-400 transition-colors" />
                </button>
              </div>

              <a href="#" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-black transition-colors">
                View Material Provenance <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ForYou;