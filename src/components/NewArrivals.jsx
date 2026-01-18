import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { ProductAPI } from "../api/product.api"; // Ensure this path is correct

const NewArrivals = () => {
  const { openQuickView } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        // You can add this method to your ProductAPI service
        const data = await ProductAPI.getNewArrivals(); 
        setItems(data);
      } catch (err) {
        console.error("Error loading new arrivals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (loading) return <div className="py-20 text-center text-stone-400 italic">Unveiling new pieces...</div>;

  return (
    <div className="w-full py-24" id="new-arrivals">
      <div className="text-center mb-16 md:mb-24">
        <h3 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight">
          New <span className="italic font-light">Arrivals</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {items.map((item, index) => (
          <motion.div 
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => openQuickView(item)}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-stone-50 border border-stone-100 shadow-sm transition-shadow hover:shadow-md">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm py-3 px-6 text-[9px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-3.5 h-3.5" /> View Piece
                </div>
              </div>
            </div>

            <div className="mt-8 text-center px-2">
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-900 truncate">
                {item.title}
              </h4>
              <p className="text-[10px] italic font-serif text-stone-400 mt-1 uppercase tracking-tighter">
                {item.category}
              </p>
              <span className="text-sm font-light text-stone-800 block mt-2">
                R{item.price?.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;