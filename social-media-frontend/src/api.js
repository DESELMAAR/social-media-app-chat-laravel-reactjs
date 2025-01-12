import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Base URL for all API requests
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Add interceptors for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token to the request headers
  }
  return config;
});

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with an error status code (4xx, 5xx)
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error); // Propagate the error
  }
);

export default api;