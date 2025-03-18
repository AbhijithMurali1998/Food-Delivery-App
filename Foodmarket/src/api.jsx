import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // Change this to your deployed backend URL later
});

// Attach token to requests if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
