import axios from 'axios';

const BASE_URL = 'https://xavics.pythonanywhere.com/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Changed from 'JWT' to 'Bearer' (standard for JWT)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401 errors and token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If 401 error and not already retried
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) {
//           throw new Error('No refresh token available');
//         }

//         // Request new access token
//         const response = await axios.post(`${BASE_URL}/auth/jwt/refresh/`, {
//           refresh: refreshToken
//         });

//         const newAccessToken = response.data.access;
//         localStorage.setItem('authToken', newAccessToken);
        
//         // Retry original request with new token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
        
//       } catch (refreshError) {
//         // If refresh fails, clear tokens and redirect to login
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('refreshToken');
        
//         // You might want to redirect to login page here
//         window.location.href = '/';
        
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

export default api;