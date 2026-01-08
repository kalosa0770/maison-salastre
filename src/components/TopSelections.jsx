import React from "react";
import { ArrowRight, MoveUpRight } from "lucide-react";

const selections = [
  {
    id: 1,
    title: "The Sculpted Trench",
    subtitle: "Edition 001",
    image: "https://images.unsplash.com/photo-1585435465945-bef5a93f8849?auto=format&fit=crop&w=1000&q=80",
    size: "large", // Takes up more vertical space
  },
  {
    id: 2,
    title: "Minimalist Silk Slip",
    subtitle: "Pure Mulberry",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
  {
    id: 3,
    title: "Pleated Artisan Trousers",
    subtitle: "Hand-finished",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    size: "small",
  },
];

const TopSelections = () => {
  return (
    <section className="bg-white py-24 font-pt-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Block */}
        <div className="max-w-xl mb-20">
          <h2 className="text-[10px] tracking-[0.5em] text-stone-400 uppercase font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-stone-200"></span>
            An Elegantic look
          </h2>
          <h3 className="text-4xl md:text-5xl font-dancing leading-[1.1] text-stone-900">
            Top Selections
          </h3>
        </div>

        {/* Asymmetrical Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Main Feature - 7 Columns wide */}
          <div className="md:col-span-7 group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <img
                src={selections[0].image}
                alt={selections[0].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <MoveUpRight className="w-5 h-5 text-stone-900" />
              </div>
            </div>
            <div className="mt-8 flex justify-between items-end">
              <div>
                <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-2">{selections[0].subtitle}</p>
                <h4 className="text-2xl font-serif text-stone-900">{selections[0].title}</h4>
              </div>
              <button className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-stone-500 hover:border-stone-300 transition-all">
                Explore Piece
              </button>
            </div>
          </div>

          {/* Side Stack - 5 Columns wide */}
          <div className="md:col-span-5 flex flex-col gap-20 md:pt-24">
            {selections.slice(1).map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-stone-100 mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-2">{item.subtitle}</p>
                  <h4 className="text-lg font-medium text-stone-900 tracking-tight uppercase group-hover:text-stone-600 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}

            {/* View More Subtle Link */}
            <div className="pt-4">
              <button className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
                  <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
                  View Full Selections
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopSelections;