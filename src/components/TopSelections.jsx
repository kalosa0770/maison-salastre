import React from "react";
import { MoveUpRight, ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext"; 

const selections = [
  {
    id: "s1",
    name: "The Sculpted Trench",
    price: "$1,450",
    subtitle: "Edition 001",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1585435465945-bef5a93f8849?auto=format&fit=crop&w=1200&q=80",
    description: "A masterclass in tailoring. This trench features a heavy-weight twill that holds its architectural shape through every movement."
  },
  {
    id: "s2",
    name: "Minimalist Silk Slip",
    price: "$890",
    subtitle: "Pure Mulberry",
    category: "Evening Wear",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
    description: "Fluid silk that mirrors the body's silhouette. Double-lined for a seamless, opaque finish."
  },
  {
    id: "s3",
    name: "Pleated Artisan Trousers",
    price: "$520",
    subtitle: "Hand-Finished",
    category: "Tailoring",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
    description: "Relaxed yet refined. These trousers feature deep knife pleats and a hidden adjustable waistband for the perfect fit."
  },
  {
    id: "s4",
    name: "Structured Crepe Blazer",
    price: "$980",
    subtitle: "Limited Cut",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
    description: "Sharp shoulders and a nipped waist. This blazer is the cornerstone of the modern consequential wardrobe."
  },
];

const TopSelections = () => {
  const { openQuickView } = useCart(); // Access the view logic

  return (
    <section className="w-full" id="top-selections">
      <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
        <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-4 block font-bold">
          Curated Excellence
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight leading-tight">
          Top <span className="italic font-light">Selections</span>
        </h2>
        <div className="w-10 h-px bg-stone-300 mt-8" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
        {selections.map((item, index) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onClick={() => openQuickView(item)} // Open view on card click
            className={`group cursor-pointer ${index % 2 !== 0 ? 'lg:mt-12' : ''}`}
          >
            <div className="relative aspect-[2/3] md:aspect-[3/4] overflow-hidden rounded-t-full bg-stone-100 border border-stone-200/50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
              />

              {/* REFINED: View Details Overlay */}
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-8">
                <button 
                  className="w-full bg-white text-stone-900 py-3 md:py-4 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                >
                  View Details <MoveUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-8 px-1 text-center lg:text-left">
              <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-stone-400 uppercase mb-2 font-semibold">
                {item.subtitle}
              </p>
              <h3 className="text-xs md:text-[14px] font-medium text-stone-800 tracking-widest uppercase mb-1 leading-snug group-hover:text-stone-500 transition-colors">
                {item.name}
              </h3>
              <p className="text-[10px] md:text-xs font-serif italic text-stone-500">
                {item.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 md:mt-32 flex justify-center">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative px-12 py-5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.4em] font-bold overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            View All Selections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-stone-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.button>
      </div>
    </section>
  );
};

export default TopSelections;