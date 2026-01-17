import React, { useState } from "react";
import { HeroAPI } from "../../api/hero.api.js";

const HeroForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setTitle(""); setDescription(""); setImage(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Hero Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border px-3 py-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border px-3 py-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button
        type="submit"
        className="bg-stone-900 text-white py-2 px-4 rounded hover:bg-stone-700 transition"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Hero"}
      </button>
    </form>
  );
};

export default HeroForm;
