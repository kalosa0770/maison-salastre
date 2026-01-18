import api from "./axios.js";

export const ProductAPI = {
  create: async (formData, onProgress) => {
    const res = await api.post("/products", formData, {
      timeout: 120000, // 120 seconds for heavy uploads
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    return res.data;
  },

  getAll: async () => {
    const res = await api.get("/products");
    return res.data;
  },

  getFeatured: async () => {
    const res = await api.get("/products/featured");
    return res.data;
  },

  getTrending: async () => {
    const res = await api.get("/products/trending");
    return res.data;
  },

  getSpotlight: async () => {
    const res = await api.get("/products/spotlight");
    return res.data;
  },

  getTopSelections: async () => {
    const res = await api.get("/products/top-selections");
    return res.data;
  },

  /** Fetches the most recently created products for "New Arrivals" */
  getNewArrivals: async () => {
    const res = await api.get("/products/new-arrivals");
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};