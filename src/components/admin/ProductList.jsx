import React, { useEffect, useState } from "react";
import { ProductAPI } from "../../api/product.api.js";
import { Trash2, Edit2, Package, Star, TrendingUp, Sparkles } from "lucide-react";
import { useCart } from "../CartContext"; // Using our universal toast system

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { triggerToast } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductAPI.getAll();
      setProducts(data);
    } catch (err) {
      triggerToast("System Error", "Failed to retrieve boutique inventory", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Permanently remove ${title} from boutique?`)) return;

    try {
      await ProductAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      triggerToast("Inventory Updated", `${title} has been removed`, "admin");
    } catch (err) {
      triggerToast("Deletion Failed", "Server synchronization error", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
      <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">Scanning Atelier...</p>
    </div>
  );

  if (products.length === 0) return (
    <div className="text-center py-32 bg-white rounded-2xl border border-stone-100 shadow-sm">
      <Package className="w-12 h-12 text-stone-200 mx-auto mb-4 stroke-[1px]" />
      <p className="text-stone-500 font-serif italic">Your boutique is currently empty.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Mobile Card View (Visible only on small screens) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex gap-4">
              <img src={product.images?.[0]} className="w-20 h-24 object-cover rounded-lg bg-stone-50" alt="" />
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">{product.category}</p>
                <h3 className="text-sm font-medium text-stone-900 truncate">{product.title}</h3>
                <p className="text-sm font-serif mt-1">R{product.price?.toLocaleString()}</p>
                <div className="flex gap-2 mt-3">
                  <button className="p-2 bg-stone-100 rounded-md text-stone-600"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(product._id, product.title)} className="p-2 bg-rose-50 rounded-md text-rose-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden md:block bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold">Piece</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold">Curation</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold">Stock</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold text-right">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((product) => (
              <tr key={product._id} className="group hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img src={product.images?.[0]} className="w-12 h-16 object-cover rounded-md bg-stone-50" alt="" />
                    <div>
                      <p className="text-[11px] font-medium text-stone-900">{product.title}</p>
                      <p className="text-[9px] text-stone-400 uppercase tracking-tighter mt-1">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    {product.isSpotlight && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    {product.isTrending && <TrendingUp className="w-3.5 h-3.5 text-blue-400" />}
                    {product.isFeatured && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                    {!product.isSpotlight && !product.isTrending && !product.isFeatured && <span className="text-[9px] text-stone-300">—</span>}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[11px] px-2 py-1 rounded ${product.stock < 5 ? 'bg-rose-50 text-rose-600' : 'text-stone-600'}`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-serif text-sm">
                  R{product.price?.toLocaleString()}
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button className="text-stone-400 hover:text-stone-900 transition-colors">
                      <Edit2 className="w-4 h-4 stroke-[1.5px]" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id, product.title)}
                      className="text-stone-300 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;