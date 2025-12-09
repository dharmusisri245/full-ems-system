// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // ✅ no /api here
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token && config.headers) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;



// //============================UPDATED AXIOS INSTACE =======================================
// import axios, { AxiosError } from "axios";
// // ===== User Memory Store =====
// let currentUser: any = null;

// // ===== User Memory Store with LocalStorage =====

// export const setCurrentUser = (user: any) => {
//   localStorage.setItem("currentUser", JSON.stringify(user));
// };

// export const getCurrentUser = () => {
//   const user = localStorage.getItem("currentUser");
//   return user ? JSON.parse(user) : null;
// };

// export const clearCurrentUser = () => {
//   localStorage.removeItem("currentUser");
// };

// // export const setCurrentUser = (user: any) => {
// //   currentUser = user;
// // };

// // export const getCurrentUser = () => currentUser;

// // export const clearCurrentUser = () => {
// //   currentUser = null;
// // };

// let accessToken: string | null = null;
// // Memory Token Functions
// export const setAccessToken = (token: string) => {
//   accessToken = token;
// };

// export const clearAccessToken = () => {
//   accessToken = null;
// };

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
//   withCredentials: true, // REQUIRED for refresh token cookie
// });

// // Automatically attach access token
// axiosInstance.interceptors.request.use((config) => {
//   if (accessToken && config.headers) {
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// // Auto Refresh Token Handler
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest: any = error.config;

//     // If access token expired → try refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = refreshResponse.data.accessToken;
//         setAccessToken(newAccessToken);

//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         clearAccessToken();
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




import axios, { AxiosError } from "axios";

// ===== User store in localStorage (Optional) =====
export const setCurrentUser = (user: any) =>
  localStorage.setItem("currentUser", JSON.stringify(user));

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const clearCurrentUser = () => localStorage.removeItem("currentUser");

// ===== Access Token in memory (BEST PRACTICE) =====
let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // must for refreshToken cookie
});

// ==================
// Attach Token
// ==================
axiosInstance.interceptors.request.use((config) => {
  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// ==================
// Auto Refresh Flow
// ==================
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as any;

    // Only refresh once
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = refresh.data.accessToken;

        setAccessToken(newToken);
        original.headers["Authorization"] = `Bearer ${newToken}`;

        return axiosInstance(original);
      } catch (err) {
        clearAccessToken();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
