import React from "react";
import { ShoppingCart, ArrowUpRight } from "lucide-react";

// Swap these back to your local assets:
// import trending1 from "../assets/trending1.webp";

const trendingProducts = [
  {
    id: 1,
    name: "Asymmetric Wrap Dress",
    category: "DRESSES",
    price: "$280",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Leather Moto Jacket",
    category: "OUTERWEAR",
    price: "$450",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Pleated Midi Skirt",
    category: "SKIRTS",
    price: "$150",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Chunky Knit Sweater",
    category: "KNITWEAR",
    price: "$200",
    image: "https://images.unsplash.com/photo-1610734523746-35233fc221ee?auto=format&fit=crop&w=800&q=80",
  },
];

const TrendingNow = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-dancing tracking-tight text-stone-900">
              Trending <span className="font-light text-stone-500">Now</span>
            </h2>
          </div>
          
          <div className="h-[1px] flex-1 bg-stone-100 hidden md:block mx-10 mb-4"></div>
          
          <button className="text-[11px] uppercase tracking-[0.2em] text-stone-600 hover:text-black font-bold flex items-center gap-2 transition-colors group">
            View Popular Products
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {trendingProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[2/3] overflow-hidden bg-stone-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
                />

                {/* Refined Overlay */}
                <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <button className="w-full bg-white/90 backdrop-blur-md py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-sm hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
                    <ShoppingCart className="w-4 h-4" /> 
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info - Centered for Boutique Feel */}
              <div className="mt-8 text-center flex flex-col items-center">
                <span className="text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-2">
                  {product.category}
                </span>
                <h3 className="text-[13px] font-medium text-stone-900 tracking-widest uppercase mb-1 px-4 leading-relaxed">
                  {product.name}
                </h3>
                <div className="w-4 h-[1px] bg-stone-200 my-2"></div>
                <span className="text-sm font-light text-stone-500 italic font-serif">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;