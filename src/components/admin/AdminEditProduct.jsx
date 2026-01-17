import React, { useState } from "react";
import { ProductAPI } from "../../api/product.api";

const AdminEditProduct = ({ product, onClose, onUpdated }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [isTrending, setIsTrending] = useState(product.isTrending);

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
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[200]">
      <form 
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-stone-900">Edit Product</h2>

        <input 
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea 
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input 
          className="w-full border p-2 rounded"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input 
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <input 
          className="w-full border p-2 rounded"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
            />
            Trending
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button 
            type="submit"
            className="px-4 py-2 bg-stone-900 text-white rounded"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
