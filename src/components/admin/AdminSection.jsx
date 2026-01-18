import React from "react";
import { Trash2, Edit2, Star, TrendingUp, Sparkles, Package } from "lucide-react";

const AdminSection = ({ 
  title, 
  products, 
  setEditProduct, 
  setDeleteProduct 
}) => {
  return (
    <section className="w-full py-8">
      {/* Header with Luxury Typography */}
      <div className="flex items-baseline gap-4 mb-8 border-b border-stone-100 pb-4">
        <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-stone-900">
          {title}
        </h2>
        <span className="text-[10px] text-stone-400 font-medium tabular-nums">
          ({products.length.toString().padStart(2, '0')})
        </span>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-stone-100 rounded-2xl">
          <p className="text-stone-300 font-serif italic text-sm">No pieces currently assigned to this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative flex flex-col bg-white"
            >
              {/* Image Container with Hover Overlay */}
              <div className="relative aspect-[3/4] bg-stone-50 overflow-hidden rounded-sm">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Curation Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 p-2">
                  {product.isSpotlight && (
                    <div className="bg-stone-900/90 backdrop-blur-md p-1.5 rounded-full" title="Maison Spotlight">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    </div>
                  )}
                  {product.isTrending && (
                    <div className="bg-stone-900/90 backdrop-blur-md p-1.5 rounded-full" title="Trending Now">
                      <TrendingUp className="w-3 h-3 text-blue-400" />
                    </div>
                  )}
                </div>

                {/* Quick Action Overlay (Desktop) */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 flex items-center justify-center gap-3">
                   <button
                    onClick={() => setEditProduct(product)}
                    className="p-3 bg-white text-stone-900 rounded-full hover:scale-110 transition-transform"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteProduct(product)}
                    className="p-3 bg-white text-rose-600 rounded-full hover:scale-110 transition-transform"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[11px] font-bold text-stone-900 uppercase tracking-widest">
                      {product.title}
                    </h3>
                    <p className="text-[9px] text-stone-400 uppercase tracking-tighter">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-[11px] font-medium text-stone-900">
                    R{product.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3 h-3 text-stone-300" />
                    <span className={`text-[10px] font-bold ${product.stock < 5 ? 'text-rose-500' : 'text-stone-400'}`}>
                      {product.stock}
                    </span>
                  </div>
                  
                  {product.isFeatured && (
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-stone-300" />
                      <span className="text-[8px] uppercase tracking-widest text-stone-300 font-bold">Featured</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Action Buttons (Visible only on small screens) */}
              <div className="flex gap-2 mt-4 md:hidden">
                <button
                  onClick={() => setEditProduct(product)}
                  className="flex-1 py-2 border border-stone-200 text-[10px] uppercase tracking-widest font-bold text-stone-600 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteProduct(product)}
                  className="flex-1 py-2 border border-rose-100 text-[10px] uppercase tracking-widest font-bold text-rose-400 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminSection;