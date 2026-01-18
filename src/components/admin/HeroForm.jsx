import React, { useState, useRef } from "react";
import { HeroAPI } from "../../api/hero.api.js";
import { Upload, Image as ImageIcon, X, Sparkles } from "lucide-react";

const HeroForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image.");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      await HeroAPI.create(formData);
      alert("Hero uploaded!");
      setTitle(""); 
      setDescription(""); 
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 border-b border-stone-100 pb-6">
        <h1 className="text-2xl font-light text-stone-900 tracking-tight flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-stone-400" />
          Frontpage Editorial
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-2">
          Curate the Atelier's Primary Visual Identity
        </p>
      </div>

      <form 
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start" 
        onSubmit={handleSubmit}
      >
        {/* Left Column: Image Upload */}
        <div className="space-y-4">
          <label className="text-[11px] text-stone-400 uppercase tracking-widest font-medium">
            Hero Imagery
          </label>
          
          <div 
            onClick={() => !preview && fileInputRef.current.click()}
            className={`relative aspect-[4/5] border-2 border-dashed rounded-sm transition-all duration-500 overflow-hidden flex flex-col items-center justify-center cursor-pointer
              ${preview ? 'border-transparent' : 'border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300'}
            `}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover animate-in fade-in duration-500" />
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-stone-900 shadow-xl hover:bg-black hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-stone-100">
                  <Upload className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-sm text-stone-500 font-light">Drag high-res imagery here</p>
                <p className="text-[10px] text-stone-400 mt-2 italic">Recommended: 1920 x 1080px</p>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Right Column: Copywriting */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="group">
              <label className="text-[11px] text-stone-400 uppercase tracking-widest mb-2 block font-medium">Main Headline</label>
              <input
                type="text"
                placeholder="The New Season Lookbook..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-all text-stone-900 font-light text-xl placeholder:text-stone-300"
              />
            </div>

            <div className="group">
              <label className="text-[11px] text-stone-400 uppercase tracking-widest mb-2 block font-medium">Editorial Body</label>
              <textarea
                placeholder="Craft the narrative for this collection..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-100 p-4 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-all text-stone-600 text-sm min-h-[160px] leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-black transition-all flex items-center justify-center gap-3 disabled:bg-stone-300 shadow-xl shadow-stone-200"
          >
            {loading ? (
              <span className="animate-pulse">Publishing to Atelier...</span>
            ) : (
              <>
                <ImageIcon className="w-4 h-4" />
                Publish Hero Selection
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroForm;