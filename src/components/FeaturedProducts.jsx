import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext"; // Import the hook

const featured = [
  {
    id: "f1",
    name: "Double-Breasted Wool Coat",
    price: "$1,200",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f2",
    name: "Silk Organza Blouse",
    price: "$380",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f3",
    name: "Tailored High-Waist Trouser",
    price: "$450",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f4",
    name: "Leather Envelope Bag",
    price: "$620",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
];

const FeaturedProducts = () => {
  const { addToCart } = useCart(); // Access the add function

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

      {/* GRID — 2 columns on mobile, 4 on desktop to match your array length */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-20">
        {featured.map((product, index) => (
          <motion.div 
            key={product.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group cursor-pointer"
          >
            {/* Image Container with Signature Arch */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-t-full transition-all duration-700 group-hover:shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale-[15%] group-hover:grayscale-0"
              />

              {/* Quick Add Overlay */}
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent trigger navigation if you add links later
                    addToCart(product);
                  }}
                  className="w-full bg-white/95 backdrop-blur-sm text-stone-900 py-3.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-stone-900 hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Quick Add
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-8 text-center">
              <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-2 font-semibold">
                {product.category}
              </p>
              <h3 className="text-[11px] md:text-[14px] font-medium text-stone-800 tracking-widest uppercase mb-1.5 leading-snug group-hover:text-stone-500 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs md:text-sm font-light text-stone-500 font-serif italic">
                {product.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
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