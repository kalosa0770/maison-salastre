import React, { useState } from "react";
import { ProductAPI } from "../../api/product.api";
import { X, Save, Package, Tag, Info } from "lucide-react";

const AdminEditProduct = ({ product, onClose, onUpdated }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [isTrending, setIsTrending] = useState(product.isTrending);
  const [isNewArrival, setIsNewArrival] = useState(product.isNewArrival || false); // Fixing your empty section

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updated = {
        title,
        description,
        price,
        category,
        stock,
        isFeatured,
        isTrending,
        isNewArrival,
      };
      await ProductAPI.update(product._id, updated);
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md flex items-center justify-center z-[250] p-4">
      <form 
        onSubmit={handleUpdate}
        className="bg-white w-full max-w-2xl overflow-hidden rounded-sm shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
          <div>
            <h2 className="text-xl font-light text-stone-900 tracking-tight">Edit Product Details</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">Refining Product Details</p>
          </div>
          <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400 mb-2">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-widest font-medium">Details</span>
            </div>
            <div className="group">
              <label className="text-[11px] text-stone-400 uppercase tracking-wider mb-1 block font-medium">Title of Product</label>
              <input 
                className="w-full bg-stone-50 border-b border-stone-200 p-3 outline-none focus:border-stone-900 focus:bg-white transition-all text-stone-800 text-sm italic placeholder:text-stone-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Vintage Silk Blazer"
              />
            </div>

            <div>
              <label className="text-[11px] text-stone-400 uppercase tracking-wider mb-1 block font-medium">Description</label>
              <textarea 
                className="w-full bg-stone-50 border border-stone-100 p-3 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-all text-stone-600 text-sm min-h-[120px] leading-relaxed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the silhouette, fabric, and fit..."
              />
            </div>
          </div>

          {/* Section: Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-50">
            <div className="group">
              <label className="text-[11px] text-stone-400 uppercase tracking-wider mb-1 block font-medium">Price (RAND)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">R</span>
                <input 
                  type="number"
                  className="w-full bg-stone-50 border-b border-stone-200 p-3 pl-7 outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-stone-400 uppercase tracking-wider mb-1 block font-medium">Inventory Count</label>
              <input 
                type="number"
                className="w-full bg-stone-50 border-b border-stone-200 p-3 outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[11px] text-stone-400 uppercase tracking-wider mb-1 block font-medium">Category</label>
              <input 
                className="w-full bg-stone-50 border-b border-stone-200 p-3 outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          {/* Section: Storefront Role */}
          <div className="pt-6 border-t border-stone-50">
             <div className="flex items-center gap-2 text-stone-400 mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-widest font-medium">Storefront Placement</span>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { label: "Featured Archive", state: isFeatured, setter: setIsFeatured },
                { label: "Trending Piece", state: isTrending, setter: setIsTrending },
                { label: "New Arrival", state: isNewArrival, setter: setIsNewArrival },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox"
                      className="peer appearance-none w-4 h-4 border border-stone-300 rounded-sm checked:bg-stone-900 checked:border-stone-900 transition-all"
                      checked={item.state}
                      onChange={(e) => item.setter(e.target.checked)}
                    />
                    <div className="absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                    </div>
                  </div>
                  <span className="text-xs text-stone-500 group-hover:text-stone-900 transition-colors uppercase tracking-widest">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex justify-end gap-4">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all font-medium"
          >
            Discard
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="bg-stone-900 text-white px-8 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center gap-3 disabled:bg-stone-300 font-medium shadow-lg shadow-stone-200"
          >
            {loading ? (
              <span className="animate-pulse">Saving Changes...</span>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Finalize Edit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;