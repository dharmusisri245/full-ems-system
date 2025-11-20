// // src/api/axiosInstance.ts
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     // global error handling, e.g., redirect on 401
//     if (err.response?.status === 401) {
//       localStorage.removeItem("token");
//       // optional: window.location.href = '/auth/login';
//     }
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;

// src/api/axiosInstance.ts



import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // ✅ no /api here
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

