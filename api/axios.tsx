import axios from "axios";

const api = axios.create({
  // REPLACE THIS with your actual base URL (e.g., https://api.uniedu.com)
  //   baseURL: "http://localhost:3001/api",
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// This automatically adds the token to every request if it exists in storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // Ensure token is not null, undefined, or the string "null"
  if (token && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
