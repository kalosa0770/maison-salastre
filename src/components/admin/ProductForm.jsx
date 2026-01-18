import React, { useState } from "react";
import { ProductAPI } from "../../api/product.api.js";
import { X, Upload, PackagePlus, Star, Sparkles, Zap, TrendingUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../CartContext";


const categories = [
  "",
  "Signature Dresses",
  "Tailored Blouses",
  "Knit & Cashmere",
  "Structured Blazers",
  "Fluid Trousers",
  "Evening Gowns",
  "Coats & Trenches",
  "Intimates & Lounge"
];
const sizesList = ["XS", "S", "M", "L", "XL"];
const colorsList = [
  // Neutrals & Basics
  { name: "Black", hex: "#000000" },
  { name: "Pure White", hex: "#FFFFFF" },
  { name: "Ivory", hex: "#FDFCF0" },
  { name: "Cream", hex: "#FFFDD0" },
  
  // Earth & Stone
  { name: "Stone", hex: "#a8a29e" },
  { name: "Beige", hex: "#D4BE98" },
  { name: "Camel", hex: "#C19A6B" },
  { name: "Chocolate", hex: "#3E2723" },
  
  // Sophisticated Tones
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Slate", hex: "#708090" },
  { name: "Sage", hex: "#9CAF88" },
  { name: "Olive", hex: "#3f6212" },
  
  // High-End Accents
  { name: "Rose Water", hex: "#EBC8C1" },
  { name: "Burgundy", hex: "#4A0E0E" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Champagne", hex: "#F7E7CE" },
];

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [stock, setStock] = useState(0);
  
  // Visibility States
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setStock(0);
    setCategory(categories[0]);
    setSizes([]);
    setColors([]);
    setImages([]);
    setPreviews([]);
    setFeatured(false);
    setTrending(false);
    setSpotlight(false);
    setIsNewArrival(true); // Maintain default for efficiency
    setProgress(0);
  };

  const { triggerToast } = useCart();

  const curationOptions = [
    { id: 'spotlight', label: 'Maison Spotlight', state: spotlight, set: setSpotlight, icon: Star, desc: 'Hero position in "For You"' },
    { id: 'new', label: 'New Arrival', state: isNewArrival, set: setIsNewArrival, icon: Sparkles, desc: 'Latest collections feed' },
    { id: 'featured', label: 'Featured Product', state: featured, set: setFeatured, icon: Zap, desc: 'Curated Excellence grid' },
    { id: 'trending', label: 'Trending', state: trending, set: setTrending, icon: TrendingUp, desc: 'Highlight as popular' },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) return alert("Maximum 10 images allowed.");
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSelection = (arr, value, setFn) => {
    setFn(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length < 1) return triggerToast("Media Required", "Upload at least one image", "error");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category);
    formData.append("stock", stock.toString());
    
    // Checkbox values
    formData.append("isFeatured", featured.toString());
    formData.append("isTrending", trending.toString());
    formData.append("isSpotlight", spotlight.toString());
    formData.append("isNewArrival", isNewArrival.toString());

    sizes.forEach((s) => formData.append("sizes", s));
    colors.forEach((c) => formData.append("colors", c));
    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      await ProductAPI.create(formData, (val) => setProgress(val));
      triggerToast("Boutique Updated", `${title} is now live`, "admin");
      resetForm();
    } catch (err) {
      triggerToast("Sync Failed", "Check connection and try again", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-12">
      <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-stone-50 border-b border-stone-200 px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <PackagePlus className="w-5 h-5 text-stone-900" />
            <h2 className="text-xl font-serif text-stone-900 tracking-tight">Inventory Management</h2>
          </div>
          <span className="text-[10px] tracking-widest uppercase font-bold text-stone-400 bg-white px-3 py-1 border border-stone-200 rounded-full">
            Boutique Entry
          </span>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">
            <section className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400 border-b border-stone-100 pb-2">Product Details</h3>
              <input type="text" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-2xl font-serif bg-transparent border-b border-stone-100 focus:border-stone-900 outline-none py-2 transition-colors" required />
              <textarea rows="4" placeholder="Describe the silhouette and material..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-lg focus:bg-white focus:border-stone-900 outline-none transition resize-none text-sm leading-relaxed" required />
            </section>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Price (R)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 bg-stone-50 border border-stone-100 rounded outline-none focus:border-stone-900" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Stock</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-3 bg-stone-50 border border-stone-100 rounded outline-none focus:border-stone-900" />
              </div>
              <div className="space-y-1">
  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">
    Silhouette / Category
  </label>
  <div className="relative">
    <select 
      value={category} 
      onChange={(e) => setCategory(e.target.value)} 
      className="w-full p-3 bg-stone-50 border border-stone-100 rounded outline-none focus:border-stone-900 appearance-none cursor-pointer text-sm"
    >
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    {/* Custom arrow for the select box */}
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg className="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {sizesList.map(size => (
                    <button key={size} type="button" onClick={() => toggleSelection(sizes, size, setSizes)} className={`w-10 h-10 text-[10px] font-bold border rounded-full transition-all ${sizes.includes(size) ? "bg-stone-900 border-stone-900 text-white" : "bg-white border-stone-200 text-stone-400 hover:border-stone-900"}`}>{size}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Palette</label>
                <div className="flex flex-wrap gap-3">
                  {colorsList.map(color => (
                    <button key={color.name} type="button" onClick={() => toggleSelection(colors, color.name, setColors)} className={`w-6 h-6 rounded-full border-2 transition-all ${colors.includes(color.name) ? "ring-2 ring-stone-900 ring-offset-2 scale-110" : "border-stone-100"}`} style={{ backgroundColor: color.hex }} title={color.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visibility Checkboxes & Media */}
          <div className="lg:col-span-5 space-y-8">
            <section className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400 border-b border-stone-100 pb-2">Choose where the product will be</h3>
              <div className="grid grid-cols-1 gap-3">
                {curationOptions.map((opt) => (
                  <label 
                    key={opt.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${opt.state ? "bg-stone-900 border-stone-900 shadow-md" : "bg-white border-stone-100 hover:border-stone-200"}`}
                  >
                    <input type="checkbox" className="hidden" checked={opt.state} onChange={() => opt.set(!opt.state)} />
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${opt.state ? "bg-stone-800 text-white" : "bg-stone-50 text-stone-400"}`}>
                        <opt.icon className={`w-4 h-4 ${opt.state && opt.id === 'spotlight' ? "text-amber-400 fill-amber-400" : ""}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[10px] uppercase tracking-widest font-bold ${opt.state ? "text-white" : "text-stone-900"}`}>{opt.label}</span>
                        <span className={`text-[9px] ${opt.state ? "text-stone-400" : "text-stone-400"}`}>{opt.desc}</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${opt.state ? "bg-white border-white" : "bg-stone-50 border-stone-200"}`}>
                      {opt.state && <Check className="w-3 h-3 text-stone-900" strokeWidth={3} />}
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Media Upload */}
            <div className="space-y-4 pt-4">
              <div className="relative aspect-video border-2 border-dashed border-stone-200 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors group cursor-pointer overflow-hidden">
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 group-hover:text-stone-900 transition-colors">
                  <Upload className="w-10 h-10 mb-2 stroke-[1px]" />
                  <p className="text-[10px] uppercase tracking-widest font-bold">Upload Media</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square rounded-md overflow-hidden bg-stone-100 group">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-stone-50 p-8 border-t border-stone-200">
          {loading && (
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-400">
                <span>Cloud Synchronization</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[2px] w-full bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-stone-900 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full py-5 bg-stone-900 text-white text-xs uppercase tracking-[0.4em] font-bold hover:bg-black shadow-2xl transition-all disabled:bg-stone-200 disabled:text-stone-400">
            {loading ? "Processing..." : "Commit Product to Boutique"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;