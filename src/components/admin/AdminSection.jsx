import React from "react";
import { Trash2, Edit2 } from "lucide-react";

const AdminSection = ({ 
  title, 
  products, 
  setEditProduct, 
  setDeleteProduct 
}) => {
  return (
    <section className="w-full">
      {/* Section Title */}
      <h2 className="text-xl font-bold tracking-wide text-stone-800 mb-6">
        {title} ({products.length})
      </h2>

      {/* Empty State */}
      {products.length === 0 ? (
        <p className="text-stone-400 italic">No products in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg overflow-hidden border border-stone-100"
            >
              {/* Product Image */}
              <div className="aspect-[3/4] bg-stone-100 overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
                  {product.title}
                </h3>

                <p className="text-xs text-stone-500 uppercase tracking-widest">
                  {product.category}
                </p>

                <p className="text-sm font-light text-stone-700 italic">
                  R{product.price.toLocaleString()}
                </p>

                <p className="text-xs text-stone-400">
                  Stock: {product.stock}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="flex-1 px-3 py-2 bg-yellow-400 text-white text-xs rounded flex items-center justify-center gap-1 hover:bg-yellow-500 transition"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>

                  <button
                    onClick={() => setDeleteProduct(product)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-xs rounded flex items-center justify-center gap-1 hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminSection;
