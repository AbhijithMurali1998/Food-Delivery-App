import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // Backend base URL
});

API.interceptors.request.use(
  (req) => {
    // First check for admin token, then user token fallback
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");

    const token = adminToken || userToken;

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
