console.log(import.meta.env.VITE_API_BASE_URL);

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});




/**
 * Request Interceptor
 * (Auth-ready)
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
        console.error( "API Error:", error.response?.data?.message || error.response?.data?.error || error.response?.data || error.message );
    } else {
      console.error("Network Error");
    }
    return Promise.reject(error);
  }
);

export default api;
