import React from "react";
import { ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";

const newItems = [
  {
    id: "n1",
    name: "Architectural Cape",
    price: "$890",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    tag: "Limited Edition"
  },
  {
    id: "n2",
    name: "Double-Breasted Vest",
    price: "$520",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tag: "New Silhouette"
  },
  {
    id: "n3",
    name: "Pebbled Leather Clutch",
    price: "$410",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    tag: "Handcrafted"
  },
  {
    id: "n4",
    name: "Merino Mock Neck",
    price: "$340",
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    tag: "Essential"
  },
];

const NewArrivals = () => {
  const { openQuickView } = useCart();

  return (
    <div className="w-full" id="new-arrivals">
      <div className="text-center mb-16 md:mb-24">
        <h3 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight">
          New <span className="italic font-light">Arrivals</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {newItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => openQuickView(item)}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-stone-100 shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />

              {/* REPLACED: View Piece Overlay */}
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm py-3 px-6 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 shadow-xl">
                  <Eye className="w-3.5 h-3.5" /> View Piece
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-stone-900">{item.name}</h4>
              <p className="text-[10px] italic font-serif text-stone-400 mt-1">{item.tag}</p>
              <span className="text-sm font-light text-stone-800 block mt-2">{item.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;