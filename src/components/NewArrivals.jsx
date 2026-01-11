import React from "react";
import { Plus, ArrowRight, ArrowLeft } from "lucide-react";

const newItems = [
  {
    id: 1,
    name: "Architectural Cape",
    price: "$890",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    tag: "Limited Edition"
  },
  {
    id: 2,
    name: "Double-Breasted Vest",
    price: "$520",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tag: "New Silhouette"
  },
  {
    id: 3,
    name: "Pebbled Leather Clutch",
    price: "$410",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    tag: "Handcrafted"
  },
  {
    id: 4,
    name: "Merino Mock Neck",
    price: "$340",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    tag: "Essential"
  },
  {
    id: 5,
    name: "Ivory Wide-Leg Trouser",
    price: "$480",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    tag: "New Arrival"
  }
];

const NewArrivals = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.5em] text-stone-400 uppercase font-bold flex items-center gap-3">
              <span className="w-8 h-[1px] bg-stone-300"></span>
              The Latests
            </h2>
            <h3 className="text-4xl md:text-5xl font-dancing tracking-tight text-stone-900">
              New <span className="font-light">Arrivals</span>
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-4 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors group">
              <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:text-black" />
            </button>
            <button className="p-4 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors group">
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-black" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory">
          {newItems.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[300px] md:min-w-[380px] snap-start group cursor-pointer "
            >
              {/* Image Box */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-6 rounded-t-[20rem]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                

                {/* Quick Buy Interaction */}
                <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center translate-y-4 group-hover:translate-y-0">
                  <button className="bg-white py-4 px-8 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-black hover:text-white transition-colors duration-300 shadow-xl">
                    <Plus className="w-3 h-3" /> Quick Add
                  </button>
                </div>
              </div>

              {/* Text Meta */}
              <div className="flex justify-between items-start px-1">
                <div className="space-y-1">
                  <h4 className="text-[13px] uppercase tracking-widest font-medium text-stone-900 leading-none">
                    {item.name}
                  </h4>
                  <p className="text-[11px] font-serif italic text-stone-500">Maison Salastre Studio</p>
                </div>
                <span className="text-sm font-light text-stone-800">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Link */}
        <div className="mt-8 flex justify-center">
           <button className="px-10 py-4 border border-stone-200 text-[10px] uppercase tracking-[0.3em] font-bold hover:border-black transition-all duration-500">
             Explore All Arrivals
           </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;