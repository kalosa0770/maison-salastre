import React, { useState } from "react";
import { ProductAPI } from "../../api/product.api.js";
import { X } from "lucide-react";

const categories = ["Outerwear", "Tops", "Bottoms", "Accessories"];
const sizesList = ["XS", "S", "M", "L", "XL"];
const colorsList = ["Black", "White", "Red", "Blue", "Beige"];

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [stock, setStock] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);

  const [images, setImages] = useState([]); // File objects
  const [previews, setPreviews] = useState([]); // Preview URLs

  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("isFeatured", featured);
    formData.append("isTrending", trending);


    sizes.forEach((size) => formData.append("sizes[]", size));
    colors.forEach((color) => formData.append("colors[]", color));

    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      await ProductAPI.create(formData);
      alert("Product added successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory(categories[0]);
      setSizes([]);
      setColors([]);
      setStock(0);
      setFeatured(false);
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (arr, value, setFn) => {
    setFn(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-2xl mb-10">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price (R)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Sizes */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Sizes:</label>
        <div className="flex flex-wrap gap-2">
          {sizesList.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSelection(sizes, size, setSizes)}
              className={`px-3 py-1 border rounded ${sizes.includes(size) ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Colors:</label>
        <div className="flex flex-wrap gap-2">
          {colorsList.map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => toggleSelection(colors, color, setColors)}
              className={`px-3 py-1 border rounded ${colors.includes(color) ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Stock */}
      <input
        type="number"
        placeholder="Stock Quantity"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Featured */}
      <div className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          id="featured"
          className="w-4 h-4"
        />
        <label htmlFor="featured">Featured Product</label>
      </div>

      {/* Trending */}
    <div className="mb-3 flex items-center gap-2">
    <input
        type="checkbox"
        checked={trending}
        onChange={(e) => setTrending(e.target.checked)}
        id="trending"
        className="w-4 h-4"
    />
    <label htmlFor="trending">Trending Product</label>
    </div>


      {/* Image Upload */}
      <label className="block mb-2 font-medium">Product Images (1–10):</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full mb-4"
      />

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {previews.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt="Preview"
                className="w-full h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white/80 p-1 rounded-full shadow hover:bg-white"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-stone-900 text-white rounded hover:bg-black transition"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
