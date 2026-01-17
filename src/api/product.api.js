import api from "./axios.js";

export const ProductAPI = {
  create: async (formData) => {
    const res = await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
  

  delete: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
