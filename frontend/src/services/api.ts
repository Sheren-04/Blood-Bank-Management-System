import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    // If it's login request, don't auto redirect
    if (status === 401 && !requestUrl?.includes("/admin/login")) {
      sessionStorage.removeItem("token");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);


export default api;
