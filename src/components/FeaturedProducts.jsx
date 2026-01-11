import React from "react";
import { Plus, ShoppingBag, ArrowRight } from "lucide-react";

const featured = [
  {
    id: 1,
    name: "Double-Breasted Wool Coat",
    price: "$1,200",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Silk Organza Blouse",
    price: "$380",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Tailored High-Waist Trouser",
    price: "$450",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Leather Envelope Bag",
    price: "$620",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Minimalist Cashmere Scarf",
    price: "$210",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Structured Crepe Blazer",
    price: "$750",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-dancing text-stone-900 tracking-tight">
            Featured <span className="font-light">Products</span>
          </h2>
          <div className="w-12 h-[1px] bg-stone-200 mx-auto mt-6"></div>
        </div>

        {/* Wrapped Grid Layout */}
        <div className="md:flex md:flex-wrap grid grid-cols-2 -mx-4">
          {featured.map((product) => (
            <div 
              key={product.id} 
              className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-16 group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 rounded-t-[20rem]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-[1.2s]  ease-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
                />
                
                {/* Minimalist Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <button className="w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                    <ShoppingBag className="w-4 h-4" /> Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-8 text-start px-4">
                <p className="text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-2 font-medium">
                  {product.category}
                </p>
                <h3 className="text-[14px] font-medium text-stone-900 tracking-widest uppercase mb-2 leading-relaxed">
                  {product.name}
                </h3>
                <span className="text-sm font-light text-stone-500 tracking-tight italic font-serif">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-12 flex justify-center">
           <button className="px-12 py-4 bg-stone-900 text-white text-[10px] flex gap-2 items-center justify-center uppercase tracking-[0.4em] font-bold hover:bg-stone-700 transition-all duration-500">
             Explore All Products <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;