import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // Increased global timeout to 60 seconds
  timeout: 60000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle specific timeout messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("The request took too long and was aborted.");
    }
    return Promise.reject(error);
  }
);

export default api;