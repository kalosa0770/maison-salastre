import api from "./axios.js";

export const HeroAPI = {
  create: async (formData) => {
    // Correct path: /hero
    const res = await api.post("/hero", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getActive: async () => {
    // Correct path: /hero/active
    const res = await api.get("/hero/active");
    return res.data;
  },
};
