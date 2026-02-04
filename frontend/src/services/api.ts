import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// auto attach token
api.interceptors.request.use((config) => {
  const token = process.env.AUTH_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
