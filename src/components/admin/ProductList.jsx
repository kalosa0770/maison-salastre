import React, { useEffect, useState } from "react";
import { ProductAPI } from "../../api/product.api.js";
import { Trash2, Edit2 } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductAPI.getAll();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await ProductAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;

  if (products.length === 0)
    return <p className="text-center py-10 text-stone-500">No products uploaded yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-stone-100 text-left">
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price (R)</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="px-4 py-3">
                <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="px-4 py-3 font-medium">{product.title}</td>
              <td className="px-4 py-3">{product.category}</td>
              <td className="px-4 py-3">R{product.price.toLocaleString()}</td>
              <td className="px-4 py-3">{product.stock}</td>
              <td className="px-4 py-3">{product.isFeatured ? "Yes" : "No"}</td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => alert("Edit feature coming soon!")}
                  className="px-2 py-1 bg-yellow-400 text-white rounded flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
